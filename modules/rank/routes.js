const express = require("express");
const Rank = require("../../models/Rank");
const Responder = require("../../services/ResponderService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const ranks = await Rank.find();
    return Responder.respondWithSuccess(req, res, ranks);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = new Rank(req.body);
    await obj.save();
    return Responder.respondWithSuccess(req, res, obj);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const obj = await Rank.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return Responder.respondWithSuccess(req, res, obj);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Rank.findByIdAndDelete(req.params.id);
    return Responder.respondWithSuccess(req, res, { deleted: true });
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

module.exports = router;
