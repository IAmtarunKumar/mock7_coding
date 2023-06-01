const express = require("express");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

const { UserModel } = require("../model/user.model");
const { auth } = require("../config/middleware/auth.middleware");

const userRouter = express.Router();

//register
userRouter.post("/api/register", async (req, res) => {
  let { name, email, password, address } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      let user = new UserModel({ name, email, password: hash, address });
      await user.save();
      res.status(201).send({ msg: "User Register Successfully" });
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//login
userRouter.post("/api/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.send(err);
          console.log(err);
        } else {
          var token = jwt.sign({ name: "tarun" }, "masai");
          res
            .status(201)
            .send({ msg: "User login succsessfully", token: token });
        }
      });
    } else {
      res.status(400).send("something went wrong");
    }
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

//reset password
userRouter.patch("/api/user/:id/reset", auth, async (req, res) => {
  let { password } = req.body;
  let id = req.params.id;
  console.log(password, id);

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      let user = await UserModel.findByIdAndUpdate(
        { _id: id },
        { password: hash }
      );
      res.send({ msg: "Your password is update " });
    });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = {
  userRouter,
};
