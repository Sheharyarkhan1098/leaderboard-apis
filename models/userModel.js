const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  etherAddress: {
    type: String,
  },
  phantomAddress: {
    type: String,
  },
  discordUserName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  score: {
    type: Number,
  },
  attempts: {
    type: Array,
  },
  timeStamp: {
    type: String,
  },
  date: {
    type: String,
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
