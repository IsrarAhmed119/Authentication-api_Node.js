const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  // console.log("validateUser------->>", user);

  const schema = Joi.object({ name: Joi.string() .required(),
    email: Joi.string() .required() .email(),
    password: Joi.string().required()
  });

  return schema.validate(user); 
}

function validateUserSignIn(user) {
  // console.log("validateUser------->>", user);

  const schema = Joi.object({
    email: Joi.string() .required() .email(),
    password: Joi.string().required()
  });

  return schema.validate(user); 
}

function validateUserPwd(user) {
  console.log("validateUserPwd------->>", user);
  const schema = Joi.object({
    password: Joi.string().required()
  });

  return schema.validate(user); 
}

exports.User = User;
exports.validate = validateUser;
exports.validateSignin = validateUserSignIn;
exports.validatePwd = validateUserPwd;

