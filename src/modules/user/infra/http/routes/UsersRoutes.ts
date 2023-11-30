import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";

import ensureAuthenticated from "../../../../user_tokens/infra/http/middlewares/ensureAuthenticated";

import CreateUsersController from "../controllers/CreateUsersController";
import FindAllUsersController from "../controllers/FindAllUsersController";
import FindByIdUsersController from "../controllers/FindByIdUsersController";
import DeleteUsersController from "../controllers/DeleteUsersController";
import UpdateUsersController from "../controllers/UpdateUsersController";

const usersRoutes = Router();

const createUsersController = new CreateUsersController();
const findAllUsersController = new FindAllUsersController();
const findByIdUsersController = new FindByIdUsersController();
const deleteUsersController = new DeleteUsersController();
const updateUsersController = new UpdateUsersController();

usersRoutes.get(
  // #swagger.tags = ['User']
  /* #swagger.security = [{
            "bearerAuth": []
    }] 
  */
  /*
    #swagger.responses[200] = {
            description: "Ok",
            content: {
                "application/json": {
                    schema: { "type": "array", $ref: "#/components/schemas/GetAllUserRequest" },
                    examples: { 
                        1: { "type": "array", $ref: "#/components/examples/GetAllUserResponse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[404] = {
            description: "Not Found",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/GlobalError" },
                    examples: { 
                        1: { $ref: "#/components/examples/NotFound" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[500] = {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/GlobalError" },
                    examples: { 
                        1: { $ref: "#/components/examples/InternalServerError" }
                      }
                    }
                }           
            } 
  */
  "/",
  ensureAuthenticated,
  findAllUsersController.handle
);

usersRoutes.get(
  // #swagger.tags = ['User']
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      userId: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  findByIdUsersController.handle
);

usersRoutes.post(
  // #swagger.tags = ['User']
  /* 
    #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/CreateUserRequest" },
                      examples: { 
                          1: { $ref: "#/components/examples/CreateUserRequest" }
                      }
                  }
              }
          }
  */
  /*
    #swagger.responses[201] = {
            description: "Created",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/CreateUserResponse" },
                    examples: { 
                        1: { $ref: "#/components/examples/CreateUserResponse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[302] = {
            description: "Email already in use",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/GlobalError" },
                    examples: { 
                        1: { $ref: "#/components/examples/EmailAlreadyInUse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[500] = {
            description: "Internal Server Error",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/GlobalError" },
                    examples: { 
                        1: { $ref: "#/components/examples/InternalServerError" }
                      }
                    }
                }           
            } 
  */
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
  // #swagger.tags = ['User']
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
  ensureAuthenticated,
  updateUsersController.handle
);

usersRoutes.delete(
  // #swagger.tags = ['User']
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      userId: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  deleteUsersController.handle
);

export default usersRoutes;
