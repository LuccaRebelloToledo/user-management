import { AppDataSource } from "./data-source";
import "express-async-errors";
import express from "express";
import routers from "./shared/infra/http/routers/index";
import globalErrorHandler from "./shared/infra/http/middlewares/GlobalErrorHandle";

void AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());
  app.use(routers);
  app.use(globalErrorHandler);

  app.listen(process.env.PORT ?? 4000, () => {
    console.log(("Server is running: " + process.env.PORT).length > 0 || 4000);
  });
});
