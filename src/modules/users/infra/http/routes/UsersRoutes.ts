import { Router } from "express";
import CreateUsersControllers from "../controllers/CreateUsersControllers";

const userRouter = Router();
const createUsersController = new CreateUsersControllers();

userRouter.post('/', createUsersController.handle);

export default userRouter;