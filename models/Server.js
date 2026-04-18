const mongoose = require("mongoose");

const ServerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  mapSize: { type: String },
  maxPlayers: { type: Number },
  wipeDate: { type: String },
  ip: { type: String },
  battlemetricsId: { type: String } // Used to fetch external API data if provided
}, { timestamps: true });

module.exports = mongoose.model("Server", ServerSchema);
