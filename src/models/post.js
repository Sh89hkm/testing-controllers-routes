const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  comments: {
    type: [
      { type: Schema.Types.ObjectId, ref: process.env.COMMENT_MODEL_NAME },
    ],
    default: [],
  },
});

const modelName = process.env.POST_MODEL_NAME;
module.exports = mongoose.model(modelName, postSchema);
