const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  path: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Notes = mongoose.model("notes", notesSchema);
