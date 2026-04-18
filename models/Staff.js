const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String } // URL or local path
}, { timestamps: true });

module.exports = mongoose.model("Staff", StaffSchema);
