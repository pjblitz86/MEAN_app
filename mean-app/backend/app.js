const express = require('express');

const app = express();

// CORS allow setup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'dfdfdfdf11',
      title: 'First server-side post',
      content: "This is coming from a server"
    },
    {
      id: 'dfd545fdf11',
      title: 'Second server-side post',
      content: "This is coming from a server again"
    }
  ];

  res.status(200).json({
    message: 'Post fetched successfully',
    posts: posts
  });
});

module.exports = app;
