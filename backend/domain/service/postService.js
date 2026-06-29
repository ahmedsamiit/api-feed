const postRepository = require('../repository/postRepository');

exports.getPosts = (page, perPage) => {
  return postRepository.findAll(page, perPage);
};

exports.getTotalPosts = () => {
  return postRepository.count();
};

exports.createPost = ({ title, content, imageUrl }) => {
  return postRepository.create({
    title,
    content,
    imageUrl: imageUrl || 'images/images.jpeg',
    creator: { name: 'Max' }
  });
};

exports.getPost = (postId) => {
  return postRepository.findOne({ _id: postId });
};

exports.updatePost = (postId, { title, content, imageUrl }) => {
  return postRepository.update(postId, { title, content, imageUrl });
};

exports.deletePost = (postId) => {
  return postRepository.delete(postId);
};