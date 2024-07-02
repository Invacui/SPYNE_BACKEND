const InteractionService = require('../services/interactionService');

module.exports = {
  async postComment(req, res, next) {
    try {
      const newComment = await InteractionService.postComment(req.body);
      res.status(201).json(newComment);
    } catch (err) {
      console.error('Error posting comment:', err);
      res.status(500).json({ message: 'Failed to post comment' });
    }
  },

  async likePost(req, res, next) {
    try {
        console.log("likedOperations called with userId:", req.user._id); // Adjust accordingly
        const likedPost = await InteractionService.likePost(req.params.postId, req.user.userId);
        res.status(200).json(likedPost);
    } catch (err) {
        console.error('Error liking post:', err);
        res.status(500).json({ message: 'Failed to like post' });
    }
},

  async likeComment(req, res, next) {
    try {
      const likedComment = await InteractionService.likeComment(req.params.commentId, req.user.userId);
      res.status(200).json(likedComment);
    } catch (err) {
      console.error('Error liking comment:', err);
      res.status(500).json({ message: 'Failed to like comment' });
    }
  },

  async followUser(req, res, next) {
    try {
      const followResult = await InteractionService.followUser(req.user.userId, req.params.userId);
      res.status(200).json(followResult);
    } catch (err) {
      console.error('Error following user:', err);
      res.status(500).json({ message: 'Failed to follow user' });
    }
  },

  async getPostViewCount(req, res, next) {
    try {
      const viewCount = await InteractionService.getPostViewCount(req.params.postId);
      res.status(200).json({ viewCount: viewCount });
    } catch (err) {
      console.error('Error retrieving post view count:', err);
      res.status(500).json({ message: 'Failed to retrieve post view count' });
    }
  },
};
