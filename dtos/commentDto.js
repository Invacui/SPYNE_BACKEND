class CommentDto {
    constructor(comment) {
      this.id = comment._id;
      this.discussionId = comment.discussionId;
      this.userId = comment.userId;
      this.text = comment.text;
      this.createdAt = comment.createdAt;
      this.updatedAt = comment.updatedAt;
    }
  }
  
  module.exports = CommentDto;
  