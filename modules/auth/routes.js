const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("@model/User");
const Responder = require("@service/ResponderService");

const router = express.Router();

// SIGNUP (Temporary - used to create first admin)
// router.post("/signup", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existingUser = await User.findOne({ username });
//     if (existingUser) return Responder.respondWithError(req, res, "User already exists");

//     const newUser = new User({ username, password });
//     await newUser.save();

//     return Responder.respondWithSuccess(req, res, { username: newUser.username }, "Account created successfully!");
//   } catch (error) {
//     return Responder.respondWithError(req, res, error);
//   }
// });

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return Responder.respondWithUnauthorized(req, res, "Invalid credentials");

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return Responder.respondWithUnauthorized(req, res, "Invalid credentials");

    // Create JWT
    const payload = { id: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'supersecretkey123!', { expiresIn: "7d" });

    return Responder.respondWithSuccess(req, res, {
      token,
      user: { id: user.id, username: user.username, role: user.role }
    }, "Login successful");
  } catch (error) {
    return Responder.respondWithError(req, res, error);
  }
});

module.exports = router;
