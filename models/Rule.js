const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  orderIndex: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Rule", RuleSchema);
