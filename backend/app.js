const express = require('express');

const app = express();

app.use( '/api/posts', (req,res,next) => {
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
