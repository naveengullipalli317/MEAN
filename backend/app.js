const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");

const app = express();

const connectUrl = "mongodb+srv://Naveen:$India123.@cluster0.6mugj.mongodb.net/node-angular?retryWrites=true&w=majority";

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

//setting header to avoid the CORS error -Cross Origin Resource Sharing

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();

});

app.use("/api/posts", postsRoutes);

module.exports = app;
