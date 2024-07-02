const Discussion = require('../models/Discussion');

module.exports = {
  async createDiscussion(discussionData) {
    const newDiscussion = new Discussion(discussionData);
    await newDiscussion.save();
    return newDiscussion;
  },

  async updateDiscussion(discussionId, discussionData) {
    const updatedDiscussion = await Discussion.findByIdAndUpdate(discussionId, discussionData, { new: true });
    return updatedDiscussion;
  },

  async deleteDiscussion(discussionId) {
    await Discussion.findByIdAndDelete(discussionId);
  },

  async getDiscussionsByTag(tag) {
    const discussions = await Discussion.find({ hashtags: tag });
    return discussions;
  },

  async getDiscussionsByText(text) {
    const discussions = await Discussion.find({ text: { $regex: text, $options: 'i' } });
    return discussions;
  },
  
  async getDiscussionsById(Id) {
    try {
      const discussion = await Discussion.findById(Id);
      if (!discussion) {
        throw new Error('Discussion not found');
      }
  
      // Increment view count
      discussion.viewCount += 1;
      await discussion.save();
  
      return [discussion]; // Return discussion as an array
    } catch (err) {
      throw err;
    }
    
  },
};
