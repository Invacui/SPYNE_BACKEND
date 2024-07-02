const discussionDao = require('../daos/discussionDao');
const discussionDto = require('../dtos/discussionDto');

module.exports = {
  async createDiscussion(discussionData) {
    const newDiscussion = await discussionDao.createDiscussion(discussionData);
    return new discussionDto(newDiscussion);
  },

  async updateDiscussion(discussionId, discussionData) {
    const updatedDiscussion = await discussionDao.updateDiscussion(discussionId, discussionData);
    return new discussionDto(updatedDiscussion);
  },

  async deleteDiscussion(discussionId) {
    await discussionDao.deleteDiscussion(discussionId);
  },

  async getDiscussionsByTag(tag) {
    const discussions = await discussionDao.getDiscussionsByTag(tag);
    return discussions.map(discussion => new discussionDto(discussion));
  },

  async getDiscussionsByText(text) {
    const discussions = await discussionDao.getDiscussionsByText(text);
    return discussions.map(discussion => new discussionDto(discussion));
  },
  async getDiscussionsById(Id) {
    const discussions = await discussionDao.getDiscussionsById(Id);
    return discussions.map(discussion => new discussionDto(discussion));
  },
};
