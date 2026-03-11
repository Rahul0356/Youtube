import express from 'express';
import { userController } from '../controller/user.controller.js';
import { commentController } from '../controller/comment.controller.js';
import { videoController } from '../controller/video.controller.js';
import { channelController } from '../controller/channel.controller.js';
import { authenticate } from '../middleware/authmiddleware.js';


const router = express.Router();
//User Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/createUser", userController.createUser);
router.get("/getUsers", userController.getUsers);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

// Video Routes
router.post("/api/createVideo", authenticate, videoController.createVideo);
router.get("/api/getVideos", videoController.getVideos);
router.get('/api/getvideos/:channelId', authenticate, videoController.getVideosByChannelId);
router.put("/api/updateVideo/:id", videoController.updateVideo);
router.delete("/api/deleteVideo/:videoId", authenticate, videoController.deleteVideo);

// Comment Routes
router.post("/api/createComment",  authenticate, commentController.createComment);
router.get("/api/getComments/:id", commentController.getComments);
router.put("/api/editComment/:id", authenticate, commentController.editComment);
router.delete("/api/deleteComment/:id", commentController.deleteComment);


// Channel Routes
router.post("/api/createChannel", authenticate, channelController.createChannel);
router.get("/api/getChannels",authenticate, channelController.getChannels); 
router.get("/api/getChannels/:id", authenticate, channelController.getChannelById);
router.put("/api/updateChannel/:id", authenticate, channelController.updateChannel);
router.delete("/api/deleteChannel/:id", authenticate, channelController.deleteChannel);


export default router;