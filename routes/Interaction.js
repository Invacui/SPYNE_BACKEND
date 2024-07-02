const express = require('express');
const interaction = express.Router();
const interactionController = require('../controller/interactionController');
const  IsLoggedIn= require('../middleware/IsLoggedIn');
const {validateUser} = require('../middleware/userValidator')


interaction.post('/comments', IsLoggedIn, validateUser, interactionController.postComment);
interaction.post('/:postId/like', IsLoggedIn, validateUser, interactionController.likePost);
interaction.post('/comments/:commentId/like', IsLoggedIn, validateUser, interactionController.likeComment);
interaction.post('/users/:userId/follow', IsLoggedIn, validateUser, interactionController.followUser);
interaction.get('/posts/:postId/viewcount', interactionController.getPostViewCount);



module.exports = interaction;
 