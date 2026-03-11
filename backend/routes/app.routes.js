import express from 'express';
import { userController } from '../controller/user.controller';
import { commentController } from '../controller/comment.controller';
import { videoController } from '../controller/video.controller';
import { channelController } from '../controller/channel.controller';


const router = express.Router();
//User Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/createUser", userController.createUser);
router.get("/getUsers", userController.getUsers);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

// Video Routes
  app.post("/api/createVideo", authenticate, videoController.createVideo);
  app.get("/api/getVideos", videoController.getVideos);
  app.get('/api/getvideos/:channelId', authenticate, videoController.getVideosByChannelId);
  app.put("/api/updateVideo/:id", videoController.updateVideo);
  app.delete("/api/deleteVideo/:videoId", authenticate, videoController.deleteVideo);

 // Comment Routes
  app.post("/api/createComment",  authenticate, commentController.createComment);
  app.get("/api/getComments/:id", commentController.getComments);
  app.put("/api/editComment/:id", authenticate, commentController.editComment);
  app.delete("/api/deleteComment/:id", commentController.deleteComment);



  // Channel Routes
  app.post("/api/createChannel", authenticate, channelController.createChannel);
  app.get("/api/getChannels",authenticate, channelController.getChannels); 
  app.get("/api/getChannels/:id", authenticate, channelController.getChannelById);
  app.put("/api/updateChannel/:id", authenticate, channelController.updateChannel);
  app.delete("/api/deleteChannel/:id", authenticate, channelController.deleteChannel);


export default router;