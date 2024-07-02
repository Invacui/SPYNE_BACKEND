class discussionDto {
    constructor(discussion) {
      this.id = discussion._id;
      this.userId = discussion.userId;
      this.text = discussion.text;
      this.image = discussion.image;
      this.hashtags = discussion.hashtags;
      this.createdOn = discussion.createdOn;
      this.updatedAt = discussion.updatedAt;
    }
  }
  
  module.exports = discussionDto; 
  