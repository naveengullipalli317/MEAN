const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require ("path");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user")

const app = express();

const connectUrl = "mongodb+srv://Naveen:$Mongo123.@cluster0.6mugj.mongodb.net/node-angular";

const connectConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(connectUrl, connectConfig)
.then(() => {
  console.log('connected to MongoDB');
})
.catch(() => {
  console.log('connection failed');
})
;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/images")));

//setting header to avoid the CORS error -Cross Origin Resource Sharing

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();

});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
