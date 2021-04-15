const express = require('express');
const bodyParser = require("body-parser");

const Post = require ('./models/post')
const app = express();


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
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();

});

app.post("/api/posts", (req, res, next)=>{
  const post = new Post({
    tittle: req.body.tittle,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message:'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'qweqwheqlwkehq',
     tittle: 'first server-side post',
     content:'this is coming from the server'
    },
    { id: 'aafsdfsdf',
     tittle: 'second server-side post',
     content:'this is coming from the server#'
    },
    { id: 'gregfdggsad',
     tittle: 'third server-side post',
     content:'this is coming from the server!'
    }



  ];
  res.status(200).json({
    message:'Post fetched succesfully',
    posts: posts
  });

});


module.exports = app;
