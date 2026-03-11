import express from 'express';
import { userController } from '../controller/user.controller';
import { commentController } from '../controller/comment.controller';


const router = express.Router();
//User Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/createUser", userController.createUser);
router.get("/getUsers", userController.getUsers);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

 // Comment Routes
  app.post("/api/createComment",  authenticate, commentController.createComment);
  app.get("/api/getComments/:id", commentController.getComments);
  app.put("/api/editComment/:id", authenticate, commentController.editComment);
  app.delete("/api/deleteComment/:id", commentController.deleteComment);


export default router;