import express from 'express';
import { userController } from '../controller/user.controller';


const router = express.Router();
//User Routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/createUser", userController.createUser);
router.get("/getUsers", userController.getUsers);
router.put("/updateUser/:id", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);


export default router;