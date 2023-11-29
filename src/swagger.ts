import "dotenv";

const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./swagger_output.json";
const endpointsFiles = [`${__dirname}/**/shared/infra/http/routers/*.{ts, js}`];

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
    schemas: {
      GetAllUserRequest: {
        id: "uuid",
        email: "E-mail",
        name: "Name",
      },
      CreateUserRequest: {
        $email: "E-mail",
        $password: "Password",
        $name: "Name",
      },
      CreateUserResponse: {
        id: "uuid",
        email: "E-mail",
        name: "Name",
      },
      GlobalError: {
        status: "Status Code Message",
        message: "Message Error",
      },
    },
    examples: {
      GetAllUserResponse: {
        id: "ccc36944-e633-41c0-a119-2616cb70968d",
        email: "johndoe@gmail.com",
        name: "John Doe",
      },
      CreateUserRequest: {
        $email: "johndoe@gmail.com",
        $password: "123456JohnDoe",
        $name: "John Doe",
      },
      CreateUserResponse: {
        id: "ccc36944-e633-41c0-a119-2616cb70968d",
        email: "johndoe@gmail.com",
        name: "John Doe",
      },
      InternalServerError: {
        status: "Internal Server Error",
        message: "internal-server-error",
      },
      EmailAlreadyInUse: {
        status: "Founded",
        message: "email-already-in-use",
      },
      NotFound: {
        status: "Not Found",
        message: "user-not-found",
      },
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
