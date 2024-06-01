const express = require('express');
const router = express.Router();

const postController = require('../controllers/post');
const commentController = require('../controllers/comment');

// GET and POST routes for /posts
router
  .route('/posts')
  .get(postController.getAllPosts)
  .post(postController.addNewPost);

// GET route for /posts/:id
router.get('/posts/:id', postController.getSinglePost);

// GET route for /posts/:postid/comment/:commentid
router.get(
  '/posts/:postid/comment/:commentid',
  commentController.getSingleComment
);

// POST route for /posts/:id/comment
router.post('/posts/:id/comments', commentController.addCommentOnPost);

module.exports = router;
