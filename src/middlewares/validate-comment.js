import Post from "../post/post.model.js";
import Comment from "../comment/comment.model.js";

export const validateComment = async (req, res, next) => {
  const { content, post } = req.body;

  if (!content || !post) {
    return res.status(400).json({
      message: "Content and post are required",
    });
  }

  try {
    const postExists = await Post.findById(post);
    if (!postExists) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error validating post",
      error: error.message,
    });
  }

  next();
}