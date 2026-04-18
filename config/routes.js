const express = require("express");
const Responder = require("@service/ResponderService");

const serverRouter = require("@module/server/routes");
const ruleRouter = require("@module/rule/routes");
const rankRouter = require("@module/rank/routes");
const staffRouter = require("@module/staff/routes");
const authRouter = require("@module/auth/routes");
const settingRouter = require("@module/setting/routes");
const passport = require("passport");

const router = express.Router();

// Middleware to protect routes (GET calls are public, everything else requires JWT)
const protectCMS = (req, res, next) => {
  if (req.method === "GET") return next();
  return passport.authenticate("jwt", { session: false })(req, res, next);
};

router.get("/health", (req, res) => {
  return Responder.respondWithSuccess(req, res, { status: "OK" });
});

// AUTH (Public)
router.use("/auth", authRouter);

// CMS MODULES (Conditional Auth)
router.use("/servers", protectCMS, serverRouter);
router.use("/rules", protectCMS, ruleRouter);
router.use("/ranks", protectCMS, rankRouter);
router.use("/staff", protectCMS, staffRouter);
router.use("/settings", protectCMS, settingRouter);

router.use((req, res, next) => {
  return Responder.respondWithNotFound(req, res, "Route not found");
});

module.exports = router;
