const express = require('express');
const discussions = express.Router();
const discussionController = require('../controller/discussionController');
const  IsLoggedIn= require('../middleware/IsLoggedIn');
const {validateUser} = require('../middleware/userValidator')




discussions.post('/', IsLoggedIn, validateUser, discussionController.createDiscussion);
discussions.put('/updatepost/:id', IsLoggedIn, validateUser, discussionController.updateDiscussion);
discussions.delete('/deletepost/:id', IsLoggedIn, validateUser, discussionController.deleteDiscussion);
discussions.get('/tag/:tag', discussionController.getDiscussionsByTag);
discussions.get('/text/:text', discussionController.getDiscussionsByText);
discussions.get('/:id', discussionController.getDiscussionById);



module.exports = discussions;
 