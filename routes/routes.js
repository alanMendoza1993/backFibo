const express = require("express");

const app = express();
const User = require("../models/user");
const Models = require("../models/models");

app.post("/user", async (req, res) => {
  let newUser = new User({
    name: req.body[0].value,
    lastName: req.body[1].value,
    time: req.body[2].value,
    location: req.body[3].value,
    picture: req.body[4].value,
    password: "12345",
  });
  //console.log(newUser);

  try {
    const resp = await newUser.save();
    return res.send(resp);
  } catch (e) {
    console.log(e);
    return res.json({
      message: "No se logro registrar el usuario",
      code: e.code,
    });
  }
});
app.post("/validate", async (req, res) => {
  const user = await User.find({
    name: req.body.name,
    password: req.body.password,
  });
  if (!user) return res.status(401).json({ message: "no authorizado" });

  return res.status(200).send({ user });
});

module.exports = app;
