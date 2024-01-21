import { Router } from "express";
import UserController from "../modules/user/User.controller";
import middlewares from '../modules/middlewares/'
import PrivatePerson from "../modules/privatePerson/PrivatePerson.controller";

const userRouter = Router();

const userController = new UserController();
const privatePerson = new PrivatePerson();

userRouter.post(
  "/login",
  userController.login
);

userRouter.post(
  "/create",
  middlewares.validateEmail,
  middlewares.validateName,
  middlewares.validatePassword,
  middlewares.validateTelephone,
  middlewares.validateProfileImage,
  userController.create
);

userRouter.get(
  "/user",
  middlewares.validateToken,
  userController.getUser
);

userRouter.post('/pj', privatePerson.create)
userRouter.get('/pj', privatePerson.getAllPrivatePerson)
userRouter.get('/pj/:id', privatePerson.getPrivatePersonById)
userRouter.delete('/user/:id', privatePerson.deletePrivatePerson)
userRouter.put('/pj/:id', privatePerson.updatePrivatePerson)

export default userRouter;
