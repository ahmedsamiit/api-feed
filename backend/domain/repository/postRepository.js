const Post = require('../models/post');

exports.findAll = ( page, perPage ) => {
  return Post.find().sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage);
};

exports.count = () => {
  return Post.countDocuments();
};

exports.create = (postData) => {
  const post = new Post(postData);
  return post.save();
};

exports.findOne = (query) => {
  return Post.findOne(query);
};

exports.update = (postId, postData) => {
  return Post.findByIdAndUpdate(postId, postData, { new: true, runValidators: true });
};

exports.delete = (postId) => {
  return Post.findByIdAndDelete(postId);
};