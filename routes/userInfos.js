const { userInfo, Validate } = require("../models/userInfo");

const express = require("express");
const router = express.Router();
const multer = require("multer");



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,new Date().toISOString().replace(/:/g, "-") +file.originalname
    );
  },
});


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});



router.post("/data", upload.single("myFile"), async (req, res) => {
  // console.log("file---->>", req.file);

   const { error } = Validate(req.body);   

   let errorMsg = null, success = true;
   if (error) {
     errorMsg = error.details[0].message;
     success = false;
     return res.json({ success, errorMsg });
   }


   userinfo = new userInfo({
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     email: req.body.email,
     phoneNumber: req.body.phoneNumber,
     acceptedTerms: req.body.acceptedTerms,
     jobType: req.body.jobType,
     img: req.file.path,
   });
  await userinfo.save();
  
  res.json({
    userinfo:userinfo,
    error: null,
    success: true,
  });
});




module.exports = router;