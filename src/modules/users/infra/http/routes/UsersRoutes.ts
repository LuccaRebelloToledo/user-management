import { Router } from "express";
import CreateUsersControllers from "../controllers/CreateUsersControllers";

const usersRoutes = Router();
const createUsersController = new CreateUsersControllers();

usersRoutes.post('/', createUsersController.handle);

export default usersRoutes;