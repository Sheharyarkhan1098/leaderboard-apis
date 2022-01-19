const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  etherAddress: {
    type: String,
    required: true,
  },
  phantomAddress: {
    type: String,
    required: true,
  },
  discordUserName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
