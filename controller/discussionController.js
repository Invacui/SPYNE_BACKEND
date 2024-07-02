const DiscussionService = require('../services/discussionService');

module.exports = {
  async createDiscussion(req, res) {
    try {
      const newDiscussion = await DiscussionService.createDiscussion(req.body);
      res.status(201).json(newDiscussion);
    } catch (err) {
      console.error('Error creating discussion:', err);
      res.status(500).json({ message: 'Failed to create discussion' });
    }
  },

  async updateDiscussion(req, res) {
    try {
      const updatedDiscussion = await DiscussionService.updateDiscussion(req.params.id, req.body);
      res.status(200).json(updatedDiscussion);
    } catch (err) {
      console.error('Error updating discussion:', err);
      res.status(500).json({ message: 'Failed to update discussion' });
    }
  },

  async deleteDiscussion(req, res) {
    try {
      await DiscussionService.deleteDiscussion(req.params.id);
      res.status(200).json({ message: 'Discussion deleted successfully' });
    } catch (err) {
      console.error('Error deleting discussion:', err);
      res.status(500).json({ message: 'Failed to delete discussion' });
    }
  },

  async getDiscussionsByTag(req, res) {
    try {
      const discussions = await DiscussionService.getDiscussionsByTag(req.params.tag);
      res.status(200).json(discussions);
    } catch (err) {
      console.error('Error fetching discussions by tag:', err);
      res.status(500).json({ message: 'Failed to fetch discussions by tag' });
    }
  },

  async getDiscussionsByText(req, res) {
    try {
      const discussions = await DiscussionService.getDiscussionsByText(req.params.text);
      res.status(200).json(discussions);
    } catch (err) {
      console.error('Error fetching discussions by text:', err);
      res.status(500).json({ message: 'Failed to fetch discussions by text' });
    }
  },
  async getDiscussionById(req, res) {
    try {
      const discussion = await DiscussionService.getDiscussionsById(req.params.id);
      if (!discussion || discussion.length === 0) {
        throw new Error('Discussion not found');
      }
      return res.status(200).json(discussion[0]); // Assuming you want to return the first (and only) discussion in the array
    } catch (err) {
      console.error('Error fetching discussion:', err);
      return res.status(404).json({ message: err.message }); // Adjust status code and error handling as per your application's needs
    }
  }
  
};
