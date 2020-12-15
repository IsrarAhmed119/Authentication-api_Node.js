const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// current User data route
router.get("/me", auth, async (req, res) => {
  // console.log("getme------->>");

  const user = await User.findById(req.user._id);
  // console.log("getme__user------->>", user);
  let errorMsg=null, success =true;
  if (!user) {
    errorMsg = "The user with the given ID was not found.";
    success = false;
  }

  let obj = {
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    status: true,
  };
  res.send(obj);

  res.json({
  user: obj,
  success,
  errorMsg
  });
});

// Signup route
router.post("/signup", async (req, res) => {
  console.log("signup------->>", req.body);
  const { error } = validate(req.body);

  let errorMsg=null,success =true;
  if (error) {
    errorMsg = error.details[0].message;
    success = false;
    return res.json({success,errorMsg});
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    errorMsg = "user already Exists!";
    success = false;
    return res.json({success,errorMsg});
  } 

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();
  
  let obj = {
    name: req.body.name,
    email:req.body.email,
  };

  res.json({
    user: obj,
    success,
    errorMsg
  });
});

// chnage password
router.put("/:id", auth, async (req, res) => {
  // console.log("change_pwd------->>", req.body); 
  let user = await User.findOne({ _id: req.params.id });
  let errorMsg=null, success =true;
  if (!user) {
    errorMsg = "The user with the given ID was not found.";
    success = false;
    return  res.json({success,errorMsg});
  }
   
  const updateUser = await User.update(
    { _id: req.params.id },
    {
      $set: {
        password: req.body.password,
      },
    }
  );

  res.json({
    success,
    errorMsg
  });
});


module.exports = router;
