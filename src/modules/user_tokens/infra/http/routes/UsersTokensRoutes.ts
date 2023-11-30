import { Router } from "express";

import { Joi, Segments, celebrate } from "celebrate";

import identifyUserRequest from "../middlewares/identifyUserRequest";

import CreateUsersTokensController from "../controllers/CreateUsersTokensController";
import RefreshUsersTokensController from "../controllers/RefreshUsersTokensController";

const sessionsRouter = Router();

const createUsersTokensController = new CreateUsersTokensController();
const refreshUsersTokensController = new RefreshUsersTokensController();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  createUsersTokensController.handle
  // #swagger.tags = ['Authentication']
  /* 
    #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/SessionUserRequest" },
                      examples: { 
                          "UpdateUserRequest": { $ref: "#/components/examples/SessionUserRequest" }
                      }
                  }
              }
          }
  */
  /*
    #swagger.responses[200] = {
            description: "User session successfully",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/SessionUserResponse" },
                    examples: { 
                        "UserSessionSuccessfully": { $ref: "#/components/examples/SessionUserResponse" }
                      }
                    }
                }           
            } 
  */
  /*
    #swagger.responses[400] = {
            description: "Celebrate Errors And Credentials Invalid",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/CelebrateErrors" },
                    examples: { 
                        "CelebrateBodyEmailRequired": { $ref: "#/components/examples/CelebrateUserEmailRequiredErrorResponse" },
                        "CelebrateBodyNameRequired": { $ref: "#/components/examples/CelebrateUserNameRequiredErrorResponse" },
                        "CredentialsInvalid": { $ref: "#/components/examples/CredentialsInvalid" }
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

sessionsRouter.put(
  "/refresh",
  celebrate({
    [Segments.BODY]: {
      refreshToken: Joi.string().uuid().required(),
    },
  }),
  identifyUserRequest,
  refreshUsersTokensController.handle
  // #swagger.tags = ['Authentication']
  /* #swagger.security = [{
            "bearerAuth": []
    }] 
  */
  /* 
    #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/RefreshUserTokenRequest" },
                      examples: { 
                          "RefreshUserTokenRequest": { $ref: "#/components/examples/RefreshUserTokenRequest" }
                      }
                  }
              }
          }
  */
  /*
    #swagger.responses[200] = {
            description: "Token User refreshed successfully",
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/RefreshUserTokenResponse" },
                    examples: { 
                        "TokenUserRefreshedSuccessfully": { $ref: "#/components/examples/RefreshUserTokenResponse" }
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
                        "CelebrateBodyRefreshToken": { $ref: "#/components/examples/CelebrateRefreshTokenRequiredErrorResponse" }
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
);

export default sessionsRouter;
