const express = require("express");
const axios = require("axios");
const Server = require("@model/Server");
const Responder = require("@service/ResponderService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const servers = await Server.find();
    
    // Enrich with external API (Battlemetrics)
    const enrichedServers = await Promise.all(servers.map(async (server) => {
      let livePlayers = 0;
      let status = "offline";
      let actualMaxPlayers = server.maxPlayers;
      
      if (server.battlemetricsId) {
        try {
          const response = await axios.get(`https://api.battlemetrics.com/servers/${server.battlemetricsId}`);
          if (response.data && response.data.data) {
            livePlayers = response.data.data.attributes.players;
            actualMaxPlayers = response.data.data.attributes.maxPlayers;
            status = response.data.data.attributes.status;
          }
        } catch (err) {
          console.error("Failed to fetch battlemetrics for", server.battlemetricsId);
        }
      }
      return {
        ...server.toObject(),
        players: livePlayers,
        maxPlayers: actualMaxPlayers,
        status: status
      };
    }));
    
    return Responder.respondWithSuccess(req, res, enrichedServers);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const server = new Server(req.body);
    await server.save();
    return Responder.respondWithSuccess(req, res, server);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const server = await Server.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return Responder.respondWithSuccess(req, res, server);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Server.findByIdAndDelete(req.params.id);
    return Responder.respondWithSuccess(req, res, { deleted: true });
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

module.exports = router;
