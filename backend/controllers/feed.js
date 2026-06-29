const postService = require('../domain/service/postService');

exports.getPosts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 2;
    const posts = await postService.getPosts(page, perPage);
    const totalItems = await postService.getTotalPosts();

    res.status(200).json({ posts, totalItems });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost({
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.file.path
    });

    res.status(201).json({
      message: 'Post created successfully!',
      post
    });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await postService.getPost(postId);
    if (post == null) {
      const error = new Error('Post not found.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    let postData = {};
    if (req.file) {
      postData = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.file.path
      };
    } else {
      postData = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl
      };
    }
    const post = await postService.updatePost(postId, postData);
    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    await postService.deletePost(postId);
    res.status(200).json({ message: 'Post deleted successfully!' });
  } catch (error) {
    next(error);
  }
};