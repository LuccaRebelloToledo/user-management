import "dotenv";

const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = `../swagger_output.json`;
const endpointsFiles = [`../shared/infra/http/routers/*.{ts, js}`];

const doc = {
  info: {
    version: "1.0.0",
    title: "User Management",
    description: "Rest API for user management!",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Web API Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      GetAllUserRequest: {
        id: "uuid",
        email: "E-mail",
        name: "Name",
      },
      GetUserRequest: {
        id: "uuid",
        email: "E-mail",
        name: "Name",
      },
      CreateUserRequest: {
        $email: "E-mail",
        $password: "Password",
        $name: "Name",
      },
      UpdateUserRequest: {
        $email: "E-mail",
        password: "Password",
        $name: "Name",
      },
      CreateUserResponse: {
        id: "uuid",
        email: "E-mail",
        name: "Name",
      },
      UpdateUserResponse: {
        id: "uuid",
        email: "E-mail",
        name: "Name",
      },
      SessionUserResponse: {
        user: { id: "uuid", email: "E-mail", name: "Name" },
        token: "token",
        refreshToken: "refreshToken",
      },
      CelebrateErrors: {
        statusCode: "Status Code",
        error: "Message error",
        message: "Message",
        validation: {
          params: {
            source: "source",
            keys: '["keys"]',
            message: '"keys" message',
          },
        },
      },
      GlobalError: {
        status: "Status Code Message",
        message: "Message Error",
      },
      SessionUserRequest: {
        $email: "Email",
        $password: "Password",
      },
      RefreshUserTokenRequest: {
        $refreshToken: "Refresh Token",
      },
      RefreshUserTokenResponse: {
        token: "Token",
        refreshToken: "Refresh Token",
      },
    },
    examples: {
      GetAllUserResponse: {
        id: "ccc36944-e633-41c0-a119-2616cb70968d",
        email: "johndoe@gmail.com",
        name: "John Doe",
      },
      GetUserResponse: {
        id: "ccc36944-e633-41c0-a119-2616cb70968d",
        email: "johndoe@gmail.com",
        name: "John Doe",
      },
      CreateUserRequest: {
        $email: "johndoe@gmail.com",
        $password: "123456JohnDoe",
        $name: "John Doe",
      },
      UpdateUserRequest: {
        $email: "johndoe2@gmail.com",
        password: "JohnDoe123456",
        $name: "John Doe 2.0",
      },
      CreateUserResponse: {
        id: "ccc36944-e633-41c0-a119-2616cb70968d",
        email: "johndoe@gmail.com",
        name: "John Doe",
      },
      UpdateUserResponse: {
        id: "ccc36944-e633-41c0-a119-2616cb70968d",
        email: "johndoe2@gmail.com",
        name: "John Doe 2.0",
      },
      InternalServerError: {
        status: "Internal Server Error",
        message: "internal-server-error",
      },
      EmailAlreadyInUse: {
        status: "Founded",
        message: "email-already-in-use",
      },
      AuthTokenNotFound: {
        status: "Unauthorized",
        message: "auth-token-not-found",
      },
      InvalidToken: {
        status: "Unauthorized",
        message: "invalid token",
      },
      JwtMalformed: {
        status: "Unauthorized",
        message: "jwt malformed",
      },
      InvalidTokenFormat: {
        status: "Unauthorized",
        message: "invalid-token-format",
      },
      NotFound: {
        status: "Not Found",
        message: "user-not-found",
      },
      CelebrateParamsErrorResponse: {
        statusCode: 400,
        error: "Bad Request",
        message: "Validation failed",
        validation: {
          params: {
            source: "params",
            keys: '["userId"]',
            message: '"userId" must be a valid GUID',
          },
        },
      },
      CelebrateUserEmailRequiredErrorResponse: {
        statusCode: 400,
        error: "Bad Request",
        message: "Validation failed",
        validation: {
          params: {
            source: "body",
            keys: '["email"]',
            message: '"email" is required',
          },
        },
      },
      CelebrateRefreshTokenRequiredErrorResponse: {
        statusCode: 400,
        error: "Bad Request",
        message: "Validation failed",
        validation: {
          params: {
            source: "body",
            keys: '["refreshToken"]',
            message: '"refreshToken" is required',
          },
        },
      },
      CelebrateUserPasswordRequiredErrorResponse: {
        statusCode: 400,
        error: "Bad Request",
        message: "Validation failed",
        validation: {
          params: {
            source: "body",
            keys: '["password"]',
            message: '"password" is required',
          },
        },
      },
      CelebrateUserNameRequiredErrorResponse: {
        statusCode: 400,
        error: "Bad Request",
        message: "Validation failed",
        validation: {
          params: {
            source: "body",
            keys: '["name"]',
            message: '"name" is required',
          },
        },
      },
      CelebrateUserPasswordErrorResponse: {
        statusCode: 400,
        error: "Bad Request",
        message: "Validation failed",
        validation: {
          params: {
            source: "body",
            keys: '["password"]',
            message: '"password" length must be at least 8 characters long',
          },
        },
      },
      CelebrateUserNameErrorResponse: {
        statusCode: 400,
        error: "Bad Request",
        message: "Validation failed",
        validation: {
          params: {
            source: "body",
            keys: '["name"]',
            message:
              '"name" length must be less than or equal to 30 characters long',
          },
        },
      },
      CredentialsInvalid: {
        status: "Bad Request",
        message: "invalid-credentials",
      },
      SessionUserRequest: {
        $email: "johndoe@gmail.com",
        $password: "Johndoe356",
      },
      SessionUserResponse: {
        user: {
          id: "ccc36944-e633-41c0-a119-2616cb70968d",
          email: "johndoe@gmail.com",
          name: "John Doe",
        },
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDEzNjExMDAsImV4cCI6MTcwMTQ0NzUwMCwic3ViIjoiYjg5MjBlZDQtZjgzZi00NjUzLTgzYmUtNzRkODVjYTA3NTQ5In0.lkROMDwg8CQ5dqprfFSjqW8E-XtextkDeuVQyRglwmU",
        refreshToken: "4faaab56-b640-42c4-9fcd-1d31cd89b991",
      },
      RefreshUserTokenRequest: {
        $refreshToken: "4faaab56-b640-42c4-9fcd-1d31cd89b991",
      },
      RefreshUserTokenResponse: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDEzNjA3MTUsImV4cCI6MTcwMTQ0NzExNSwic3ViIjoiYjg5MjBlZDQtZjgzZi00NjUzLTgzYmUtNzRkODVjYTA3NTQ5In0.ODiPSE6b2ZNpzDyeuIl3GKhs_i8uDWtdKo6kj3SwwVI",
        refreshToken: "545714d4-e0ea-42b2-ab54-7fddd261f061",
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
