const User = require("../models/userModel");
exports.register = async (req, res) => {
  console.log(req.body, "body")
  console.log(req.fields, "fields register")
  let { etherAddress, phantomAddress, discordUserName, email, score } =
  req.fields;
  try {
    const userExists = await User.findOne({ discordUserName: discordUserName });
    if (userExists) {
      console.log(userExists);
      return res.status(401).json({ error: "discordUserName already exists" });
    }

   score = parseInt(score);
    const rectrUser = new User({
      etherAddress,
      phantomAddress,
      discordUserName,
      email,
      score,
    });
    await rectrUser.save();
    
    res.status(200).json({ message: "User registered succesfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "error in saving" });
  }
};
exports.findAll = (req, res) => {
  User.find({}, null, {sort: {score: -1}})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send({ message: "error in finding" });
    });
};
exports.findAndUpdate = async (req, res) => {
  console.log(req.body, "body")
  console.log(req.fields, "fields findandupdate")
  let name = req.fields.discordUserName;
  let score = parseInt(req.fields.score);
  const result = await User.findOneAndUpdate(
    { discordUserName: name },
    { $set: { score: score } }
  );
  if (!result) res.send({ message: "User not found" });
  res.send(result);
};
