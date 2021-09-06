const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added!'
  });
});

app.get( '/api/posts', (req,res,next) => {
  const posts = [
    { id: 'asdf123', title: 'First', content: 'first content' },
    { id: 'asdf125', title: 'Second', content: 'second content' },
    { id: 'asdf126', title: 'Third', content: 'third content' }
  ];
  res.status(200).json({
    message: 'Posts Success!',
    posts: posts
  });
});

module.exports = app;
