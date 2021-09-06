const express = require('express');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

console.log('Start to connect');

mongoose.connect("mongodb+srv://aditya:testingpassword2@cluster0.almrq.mongodb.net/mean-test?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected!');
  })
  .catch(() => {
    console.log('Connection Failed!');
  });

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added!',
      postId: result._id
    });
  });
});

app.get("/api/posts", (req,res,next) => {
  Post.find()
    .then(documents=>{
      res.status(200).json({
        message: 'Posts Success!',
        posts: documents
      });
    });

});

app.delete("/api/posts/:id", (req,res,next)=>{
  Post.deleteOne({_id: req.params.id}).
    then(result => {
      console.log(result);
      res.status(200).json({message: "Post deleted!"});
    });
});

module.exports = app;
