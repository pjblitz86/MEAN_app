const express = require('express');
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose
  .connect(
    'mongodb+srv://pjblitz86:pjblitz86@cluster0-c1rev.mongodb.net/node-angular?retryWrites=true',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to db');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));

// allow access to img files stored on backend/images
app.use('/images', express.static(path.join('backend/images')));

// CORS allow setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
