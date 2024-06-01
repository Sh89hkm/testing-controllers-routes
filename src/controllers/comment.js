const PostModel = require('../models/post');
const CommentModel = require('../models/comment');

module.exports = {
  getSingleComment: async (req, res) => {
    const { commentid } = req.params;
    try {
      const comment = await CommentModel.findById(commentid).populate('post');
      if (!comment) {
        res.status(422).json({ message: `comment ${commentid} not found` });
      } else {
        res.json(comment);
      }
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  },
  addCommentOnPost: async (req, res) => {
    const newCommentData = {
      userName: req.body.userName,
      commentText: req.body.commentText,
      post: req.params.id,
    };
    try {
      const post = await PostModel.findById(req.params.id);
      const newComment = await CommentModel.create(newCommentData);
      post.comments.push(newComment.id);
      await post.save();
      res.status(201).json(newComment);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  },
};
