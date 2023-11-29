import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import CreateUsersController from "../controllers/CreateUsersController";
import FindAllUsersController from "../controllers/FindAllUsersController";
import FindByEmailUsersController from "../controllers/FindByEmailUsersController";
import FindByIdUsersController from "../controllers/FindByIdUsersController";
import DeleteUsersController from "../controllers/DeleteUsersController";
import UpdateUsersController from "../controllers/UpdateUsersController";

const usersRoutes = Router();

const createUsersController = new CreateUsersController();
const findAllUsersController = new FindAllUsersController();
const findByEmailUsersController = new FindByEmailUsersController();
const findByIdUsersController = new FindByIdUsersController();
const deleteUsersController = new DeleteUsersController();
const updateUsersController = new UpdateUsersController();

usersRoutes.get("/", findAllUsersController.handle);

usersRoutes.get(
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      userId: Joi.string().uuid().required(),
    }),
  }),
  findByIdUsersController.handle
);

usersRoutes.get(
  "/email",
  celebrate({
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().lowercase().required(),
    }),
  }),
  findByEmailUsersController.handle
);

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

usersRoutes.put(
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      userId: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(8),
      name: Joi.string().max(30).required(),
    }),
  }),
  updateUsersController.handle
);

usersRoutes.delete(
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      userId: Joi.string().uuid().required(),
    }),
  }),
  deleteUsersController.handle
);

export default usersRoutes;
