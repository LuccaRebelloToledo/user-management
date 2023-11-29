import { Router } from "express";
import CreateUsersControllers from "../controllers/CreateUsersControllers";
import { Joi, Segments, celebrate } from "celebrate";

const usersRoutes = Router();
const createUsersController = new CreateUsersControllers();

usersRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(8).required(),
      name: Joi.string().max(30).required(),
    }),
  }),
  createUsersController.handle
);

export default usersRoutes;
