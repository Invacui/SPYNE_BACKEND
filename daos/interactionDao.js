const Comment = require('../models/Comment');
const Discussion = require('../models/Discussion');
const Like = require('../models/Like');
const User = require('../models/User');
const Follow = require('../models/Follow');

module.exports = {
  async createComment(commentData) {
    const newComment = new Comment(commentData);
    await newComment.save();
    return newComment;
  },

  async likePost(postId, userId) {
    try {
      const like = await Like.findOneAndUpdate(
        { discussionId: postId, userId: userId },
        { discussionId: postId, userId: userId },
        { new: true, upsert: true }
      );
      return like;
    } catch (err) {
      console.error('Error liking post:', err);
      throw err;
    }
  },

  async likeComment(commentId, userId) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $addToSet: { likes: userId } }, // Add userId to likes array if not already present
        { new: true }
      );
      if (!updatedComment) {
        throw new Error('Comment not found');
      }
      return updatedComment;
    } catch (err) {
      console.error('Error liking comment:', err);
      throw err;
    }
  },

  async  followUser(followerId, followeeId) {
    try {
      let follow = await Follow.findOne({ userId: followerId });
  
      if (!follow) {
        follow = new Follow({
          userId: followerId,
          followers: [],
          following: [followeeId],
        });
      } else {
        if (!follow.following.includes(followeeId)) {
          follow.following.push(followeeId);
        }
      }
  
      await follow.save();
  
      return follow;
    } catch (error) {
      console.error('Error in followUser DAO:', error);
      throw error;
    }
  },
  

  async getPostViewCount(postId) {
    const post = await Discussion.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    return post.viewCount;
  },
};
