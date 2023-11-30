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
  // #swagger.tags = ['User']
  /* 
    #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/CreateUserRequest" },
                      examples: { 
                          "CreateUserRequest": { $ref: "#/components/examples/CreateUserRequest" }
                      }
                  }
              }
          }
  */
  /*
    #swagger.responses[201] = {
            description: "User created successfully",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/CreateUserResponse" },
                    examples: { 
                        "UserCreatedSuccessfully": { $ref: "#/components/examples/CreateUserResponse" }
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
                        "EmailAlreadyInUse": { $ref: "#/components/examples/EmailAlreadyInUse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[400] = {
            description: "Celebrate Errors",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/CelebrateErrors" },
                    examples: { 
                        "CelebrateBodyEmailRequired": { $ref: "#/components/examples/CelebrateUserEmailRequiredErrorResponse" },
                        "CelebrateUserPasswordRequired": { $ref: "#/components/examples/CelebrateUserPasswordRequiredErrorResponse" },
                        "CelebrateBodyNameRequired": { $ref: "#/components/examples/CelebrateUserNameRequiredErrorResponse" },
                        "CelebrateBodyPassword": { $ref: "#/components/examples/CelebrateUserPasswordErrorResponse" },
                        "CelebrateBodyName": { $ref: "#/components/examples/CelebrateUserNameErrorResponse" }
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
                        "InternalServerError": { $ref: "#/components/examples/InternalServerError" }
                      }
                    }
                }           
            } 
  */
);

usersRoutes.get(
  "/",
  ensureAuthenticated,
  findAllUsersController.handle
  // #swagger.tags = ['User']
  /* #swagger.security = [{
            "bearerAuth": []
    }] 
  */
  /*
    #swagger.responses[200] = {
            description: "User(s) found successfully",
            content: {
                "application/json": {
                    schema: { "type": "array", $ref: "#/components/schemas/GetAllUserRequest" },
                    examples: { 
                        "User(s)FoundSuccessfully": { "type": "array", $ref: "#/components/examples/GetAllUserResponse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[401] = {
            description: "Auth Tokens Errors",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/GlobalError" },
                    examples: { 
                        "AuthTokenNotFound": { $ref: "#/components/examples/AuthTokenNotFound" },
                        "InvalidTokenFormat": { $ref: "#/components/examples/InvalidTokenFormat" },
                        "InvalidToken": { $ref: "#/components/examples/InvalidToken" },
                        "JwtMalformed": { $ref: "#/components/examples/JwtMalformed" }
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
                        "NotFound": { $ref: "#/components/examples/NotFound" }
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
                        "InternalServerError": { $ref: "#/components/examples/InternalServerError" }
                      }
                    }
                }           
            } 
  */
);

usersRoutes.get(
  "/:userId",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      userId: Joi.string().uuid().required(),
    }),
  }),
  ensureAuthenticated,
  findByIdUsersController.handle
  // #swagger.tags = ['User']
  /* #swagger.security = [{
            "bearerAuth": []
    }] 
  */
  /*
    #swagger.responses[200] = {
            description: "User found successfully",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/GetUserRequest" },
                    examples: { 
                        "UserFoundSuccessfully": { $ref: "#/components/examples/GetUserResponse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[400] = {
            description: "Celebrate Params Error",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/CelebrateErrors" },
                    examples: { 
                        "CelebrateParamsError": { $ref: "#/components/examples/CelebrateParamsErrorResponse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[401] = {
            description: "Auth Tokens Errors",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/GlobalError" },
                    examples: { 
                        "AuthTokenNotFound": { $ref: "#/components/examples/AuthTokenNotFound" },
                        "InvalidTokenFormat": { $ref: "#/components/examples/InvalidTokenFormat" },
                        "InvalidToken": { $ref: "#/components/examples/InvalidToken" },
                        "JwtMalformed": { $ref: "#/components/examples/JwtMalformed" }
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
                        "NotFound": { $ref: "#/components/examples/NotFound" }
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
                        "InternalServerError": { $ref: "#/components/examples/InternalServerError" }
                      }
                    }
                }           
            } 
  */
);

usersRoutes.put(
  // #swagger.tags = ['User']
  /* #swagger.security = [{
            "bearerAuth": []
    }] 
  */
  /* 
    #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/UpdateUserRequest" },
                      examples: { 
                          "UpdateUserRequest": { $ref: "#/components/examples/UpdateUserRequest" }
                      }
                  }
              }
          }
  */
  /*
    #swagger.responses[200] = {
            description: "User updated successfully",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/UpdateUserResponse" },
                    examples: { 
                        "UserUpdatedSuccessfully": { $ref: "#/components/examples/UpdateUserResponse" }
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
                        "EmailAlreadyInUse": { $ref: "#/components/examples/EmailAlreadyInUse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[400] = {
            description: "Celebrate Errors",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/CelebrateErrors" },
                    examples: { 
                        "CelebrateParams": { $ref: "#/components/examples/CelebrateParamsErrorResponse" },
                        "CelebrateBodyEmailRequired": { $ref: "#/components/examples/CelebrateUserEmailRequiredErrorResponse" },
                        "CelebrateBodyNameRequired": { $ref: "#/components/examples/CelebrateUserNameRequiredErrorResponse" },
                        "CelebrateBodyPassword": { $ref: "#/components/examples/CelebrateUserPasswordErrorResponse" },
                        "CelebrateBodyName": { $ref: "#/components/examples/CelebrateUserNameErrorResponse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[401] = {
            description: "Auth Tokens Errors",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/GlobalError" },
                    examples: { 
                        "AuthTokenNotFound": { $ref: "#/components/examples/AuthTokenNotFound" },
                        "InvalidTokenFormat": { $ref: "#/components/examples/InvalidTokenFormat" },
                        "InvalidToken": { $ref: "#/components/examples/InvalidToken" },
                        "JwtMalformed": { $ref: "#/components/examples/JwtMalformed" }
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
                        "InternalServerError": { $ref: "#/components/examples/InternalServerError" }
                      }
                    }
                }           
            } 
  */
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
  /* #swagger.security = [{
            "bearerAuth": []
    }] 
  */
  /*
    #swagger.responses[200] = {
            description: "User deleted successfully",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/GetUserRequest" },
                    examples: { 
                        "UserDeletedSuccessfully": { $ref: "#/components/examples/GetUserResponse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[400] = {
            description: "Celebrate Errors",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/CelebrateErrors" },
                    examples: { 
                        "CelebrateParams": { $ref: "#/components/examples/CelebrateParamsErrorResponse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[401] = {
            description: "Auth Tokens Errors",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/GlobalError" },
                    examples: { 
                        "AuthTokenNotFound": { $ref: "#/components/examples/AuthTokenNotFound" },
                        "InvalidTokenFormat": { $ref: "#/components/examples/InvalidTokenFormat" },
                        "InvalidToken": { $ref: "#/components/examples/InvalidToken" },
                        "JwtMalformed": { $ref: "#/components/examples/JwtMalformed" }
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
                        "NotFound": { $ref: "#/components/examples/NotFound" }
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
                        "InternalServerError": { $ref: "#/components/examples/InternalServerError" }
                      }
                    }
                }           
            } 
  */
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
