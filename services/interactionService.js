const interactionDao = require('../daos/interactionDao');
const CommentDto = require('../dtos/commentDto');

module.exports = {
  async postComment(commentData) {
    const newComment = await interactionDao.createComment(commentData);
    return new CommentDto(newComment);
  },

  async likePost(postId, userId) {
    console.log("postID:"+postId+"userID"+userId)
    const likedPost = await interactionDao.likePost(postId, userId);
    return likedPost;
  },

  async likeComment(commentId, userId) {
    const likedComment = await interactionDao.likeComment(commentId, userId);
    return likedComment;
  },

  async followUser(followerId, followeeId) {
    try {
      const followResult = await interactionDao.followUser(followerId, followeeId);
      return followResult;
    } catch (error) {
      console.error('Error in followUser service:', error);
      throw error;
    }
  },
  async getPostViewCount(postId) {
    try {
      const post = await interactionDao.getPostViewCount(postId);
      return post;
    } catch (err) {
      throw err;
    }
  },
};
 