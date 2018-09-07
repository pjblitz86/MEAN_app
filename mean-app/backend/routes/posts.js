const express = require('express');
const multer = require('multer');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const PostController = require('../controllers/posts');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', checkAuth, multer({ storage: storage }).single('image'), PostController.createPost);

router.put(
  '/:id',
  checkAuth,
  multer({ storage: storage }).single('image'),
  PostController.updatePost
);

router.get('', PostController.getPosts);

router.get('/:id', PostController.getPost);

router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;
