const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

console.log('Start to connect');

mongoose.connect("mongodb+srv://aditya:" + process.env.MONGO_ATLAS_PW + "@cluster0.almrq.mongodb.net/mean-test?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected!');
  })
  .catch(() => {
    console.log('Connection Failed!');
  });

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

// first parameter is default starting route path
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
