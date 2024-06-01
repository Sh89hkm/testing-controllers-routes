const PostModel = require('../models/post');

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const allPosts = await PostModel.find().populate('comments');
      res.json(allPosts);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  },
  getSinglePost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await PostModel.findById(id).populate('comments');
      if (!post) {
        res.status(422).json({ message: `post ${id} not found` });
      } else {
        res.json(post);
      }
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  },
  addNewPost: async (req, res) => {
    const newPostData = req.body;
    try {
      const newPost = await PostModel.create(newPostData);
      res.status(201).json(newPost);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
  },
};
