const Joi = require("joi");
const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  acceptedTerms: {
    type: Boolean,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const userInfo = mongoose.model("userInfo", userInfoSchema);

function Validate(data) {
  console.log("validatedata------->>", data);

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.number().required(),
    acceptedTerms: Joi.boolean().required(),
    jobType: Joi.string().required(),
    // img: Joi.string().required(),
  });

  return schema.validate(data);
}



exports.userInfo = userInfo;
exports.Validate = Validate;
