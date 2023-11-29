import "dotenv";

const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = [`${__dirname}/**/shared/infra/http/routers/*.{ts, js}`];

const doc = {
  info: {
    version: "1.0.0",
    title: "User Management",
    description: "Rest API for user management!",
  },
  host: "localhost:4000",
};

swaggerAutogen(outputFile, endpointsFiles, doc);
