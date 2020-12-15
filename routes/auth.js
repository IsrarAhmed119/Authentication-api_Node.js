const Joi = require("joi");
const { User ,validateSignin} = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// login route
router.post("/", async (req, res) => {
  console.log("login_call------->>", req.body);

  const { error } = validateSignin(req.body);
  let errorMsg = null, success = true;
  
  if (error) {
    errorMsg = error.details[0].message;
    success = false;
    return res.json({
              token: null,
              success,
              errorMsg
            });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    errorMsg = "Invalid email or password.";
    success = false;
    return res.json({
            token: null,
            success,
            errorMsg
          });
  }

  if (user.password === req.body.password) {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        password: user.password,
      },
      "jwtPrivatekey"
    );
    // console.log("token------->>", token);
    let userData = {
      email: user.email,
      name: user.name,
    }
    return res.json({
          userData,
          token: token,
          success,
          errorMsg
        });
  } else {
    errorMsg = "Invalid email or password.";
    success = false
    return res.json({
            token: null,
            success,
            errorMsg
          });
  }
});

module.exports = router;
