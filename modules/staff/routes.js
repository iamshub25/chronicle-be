const express = require("express");
const Staff = require("@model/Staff");
const Responder = require("@service/ResponderService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();
    return Responder.respondWithSuccess(req, res, staff);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = new Staff(req.body);
    await obj.save();
    return Responder.respondWithSuccess(req, res, obj);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const obj = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return Responder.respondWithSuccess(req, res, obj);
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    return Responder.respondWithSuccess(req, res, { deleted: true });
  } catch (error) {
    return Responder.respondWithError(req, res, error.message);
  }
});

module.exports = router;
