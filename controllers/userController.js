const User = require("../models/userModel");
const moment = require("moment");
const today = moment().startOf("day");

exports.register = async (req, res) => {
  const { etherAddress, phantomAddress, discordUserName, email, score } =
    req.fields;
  try {
    // set date with existing user
    const userDateExists = await User.findOne({
      discordUserName: discordUserName,
    });
    //console.log(userDateExists);
    if (userDateExists && !userDateExists.date) {
      await User.findOneAndUpdate(
        { discordUserName: discordUserName },
        {
          $set: {
            etherAddress: etherAddress,
            phantomAddress: phantomAddress,
            email: email,
            date: moment().format("Do MMM YY"),
            //timeStamp: moment().format("HH:mm:ss"),
          },
        }
      );
      return res.status(200).json({ message: "User date updated" });

      // const rectrUser = new User({
      //   etherAddress,
      //   phantomAddress,
      //   discordUserName,
      //   email,
      //   score,
      //   date: moment().format("Do MMM YY"),
      //   attempts: [],
      // });
      // await rectrUser.save();
    }

    //
    const userExists = await User.findOne({ discordUserName: discordUserName });
    if (userExists) {
      if (userExists.attempts[0].date !== moment().format("Do MMM YY")) {
        const rectrUser = new User({
          etherAddress,
          phantomAddress,
          discordUserName,
          email,
          score,
          date: moment().format("Do MMM YY"),
          timeStamp: moment().format("HH:mm:ss"),
          attempts: [],
        });
        await rectrUser.save();
      }
      console.log();
      await User.findOneAndUpdate(
        { discordUserName: discordUserName },
        {
          $set: {
            etherAddress: etherAddress,
            phantomAddress: phantomAddress,
            email: email,
            //date: moment().format("Do MMM YY"),
          },
        }
      );
      return res.status(200).json({ message: "User info updated" });
    }
    const rectrUser = new User({
      etherAddress,
      phantomAddress,
      discordUserName,
      email,
      score,
      date: moment().format("Do MMM YY"),
      timeStamp: moment().format("HH:mm:ss"),
      attempts: [],
    });
    await rectrUser.save();
    return res.status(200).json({ message: "User registered succesfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "error in saving" });
  }
};

exports.findAndUpdate = async (req, res) => {
  let name = req.fields.discordUserName;
  let score = req.fields.score;
  //console.log(name, score, "test");
  const date = moment().format("Do MMM YY");
  try {
    const userExists = await User.findOne({
      discordUserName: name,
      date: date,
    });
    //console.log(userExists, "test");
    if (userExists) {
      if (userExists.score < score) {
        const result = await User.findOneAndUpdate(
          {
            discordUserName: name,
            date: moment().format("Do MMM YY"),
          },
          { $set: { score: score } }
        );
        if (!result) res.send({ message: "User not found" });
        // return res.status(200).send({ message: "score updated" });
      }
      let attempts = 0;
      attempts = userExists.attempts.length + 1;
      let arrayOfAttempts = [...userExists.attempts];
      let timeStamp = moment().format("HH:mm:ss");
      let date = moment().format("Do MMM YY");
      if (attempts < 6) {
        arrayOfAttempts.push({
          attempts: attempts,
          score: score,
          timeStamp: moment().format("HH:mm:ss"),
        });
        console.log(arrayOfAttempts);
        let newUser = await User.findOneAndUpdate(
          { discordUserName: userExists.discordUserName, date: date },
          {
            $set: { attempts: arrayOfAttempts },
          },
          { new: true }
        );
        res.send(newUser);
      } else {
        return res.send({
          message: "your attempts are over, but high score updated",
        });
      }
    } else {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "score updated" });
  } catch (error) {
    console.log(error);
  }
};

exports.findAll = (req, res) => {
  console.log("working");
  User.find({}, null, { sort: { score: -1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.send({ message: "error in finding" });
    });
};

exports.findByDate = async (req, res) => {
  const date = req.fields.date;
  User.find({ date: date }, null, { sort: { score: -1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.send({ message: "error in finding" });
    });
};

//get user by name

exports.findByName = async (req, res) => {
  try {
    const discordUserName = req.fields.discordUserName;
    const userRecordExists = await User.findOne({
      discordUserName: discordUserName,
    });
    if (userRecordExists) {
      res.send(userRecordExists);
    } else {
      res.send("user does not exists");
    }
  } catch (error) {
    console.log(error, "error occure");
  }
};
