const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));

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

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
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
