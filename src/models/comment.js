const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: process.env.POST_MODEL_NAME,
  },
});

const modelName = process.env.COMMENT_MODEL_NAME;
module.exports = mongoose.model(modelName, commentSchema);
