import { Router } from "express";

import { Joi, Segments, celebrate } from "celebrate";

import identifyUserRequest from "../middlewares/identifyUserRequest";

import CreateUsersTokensController from "../controllers/CreateUsersTokensController";
import RefreshUsersTokensController from "../controllers/RefreshUsersTokensController";

const sessionsRouter = Router();

const createUsersTokensController = new CreateUsersTokensController();
const refreshUsersTokensController = new RefreshUsersTokensController();

sessionsRouter.post(
  // #swagger.tags = ['Authentication']
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  createUsersTokensController.handle
);

sessionsRouter.put(
  // #swagger.tags = ['Authentication']
  "/refresh",
  celebrate({
    [Segments.BODY]: {
      refreshToken: Joi.string().uuid().required(),
    },
  }),
  identifyUserRequest,
  refreshUsersTokensController.handle
);

export default sessionsRouter;
