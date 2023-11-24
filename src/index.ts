import { AppDataSource } from './data-source';
import 'express-async-errors';
import express from 'express';
import routers from './shared/infra/http/routers/index';
import globalErrorHandler from './shared/infra/http/middlewares/GlobalErrorHandle';

AppDataSource.initialize().then(() => {
  let app = express();

  app.use(express.json());
  app.use(routers);
  app.use(globalErrorHandler);

  app.listen(process.env.PORT || 3333, () => {
    console.log('Server is running: ' + process.env.PORT || 3333);
  });

});
