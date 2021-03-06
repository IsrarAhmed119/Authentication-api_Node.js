const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const user = require("./routes/users");
const auth = require("./routes/auth");
const bodyParser = require("body-parser");
const userInfo = require('./routes/userInfos')

const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));


app.use(bodyParser.json());

mongoose.connect(
  "mongodb://localhost/Authentication-api",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(err);
      console.error("Could not connect to MongoDB...");
    } else console.log("Connected to MongoDB...");
  }
);

app.use(express.json());

app.use("/api/user", user);
app.use("/api/signin", auth);
app.use("/api/userInfo", userInfo);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
