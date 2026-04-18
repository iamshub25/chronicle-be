const express = require("express");
const Rule = require("@model/Rule");
const Responder = require("@service/ResponderService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rules = await Rule.find().sort({ orderIndex: 1 });
    return Responder.respondWithSuccess(req, res, rules);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = new Rule(req.body);
    await obj.save();
    return Responder.respondWithSuccess(req, res, obj);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const obj = await Rule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return Responder.respondWithSuccess(req, res, obj);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Rule.findByIdAndDelete(req.params.id);
    return Responder.respondWithSuccess(req, res, { deleted: true });
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

module.exports = router;
