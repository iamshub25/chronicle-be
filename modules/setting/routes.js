const express = require("express");
const Setting = require("../../models/Setting");
const Responder = require("../../services/ResponderService");

const router = express.Router();

// GET all settings
router.get("/", async (req, res) => {
  try {
    const settings = await Setting.find();
    // Return as a simple object { key: value } for easier frontend use
    const settingsObj = {};
    settings.forEach(s => settingsObj[s.key] = s.value);
    
    return Responder.respondWithSuccess(req, res, { 
      list: settings, 
      map: settingsObj 
    });
  } catch (error) {
    return Responder.respondWithError(req, res, error);
  }
});

// UPDATE a setting
router.put("/:key", async (req, res) => {
  try {
    const { value } = req.body;
    const setting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { value },
      { new: true }
    );
    
    if (!setting) return Responder.respondWithNotFound(req, res, "Setting not found");
    
    return Responder.respondWithSuccess(req, res, setting, "Setting updated successfully");
  } catch (error) {
    return Responder.respondWithError(req, res, error);
  }
});

module.exports = router;
