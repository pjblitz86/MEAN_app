const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://pjblitz86:pjblitz86@cluster0-c1rev.mongodb.net/node-angular?retryWrites=true', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to db');
  })
  .catch(() => {
    console.log('Connection failed');
  });

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
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Post fetched successfully',
        posts: documents
      });
      console.log(documents);
    });
});

module.exports = app;
