import { AppDataSource } from "./data-source";
import "express-async-errors";
import express from "express";
import routers from "./shared/infra/http/routers/index";
import globalErrorHandler from "./shared/infra/http/middlewares/GlobalErrorHandle";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json";

void AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(routers);
  app.use(globalErrorHandler);

  app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.listen(process.env.PORT ?? 4000, () => {
    console.log("Server is running: " + process.env.PORT || 4000);
  });
});
