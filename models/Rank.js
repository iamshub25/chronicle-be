const mongoose = require("mongoose");

const RankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  color: { type: String, required: true },
  perks: [{ type: String }],
  isPopular: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Rank", RankSchema);
