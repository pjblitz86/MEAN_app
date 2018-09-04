const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash // careful with this - must be hashed, not raw
    });
    user
      .save()
      .then(result => {
        res.status(200).json({
          message: 'User created',
          result: result
        });
      })
      .catch(err => {
        res.status(201).json({
          error: err
        });
      });
  });
});

module.exports = router;
