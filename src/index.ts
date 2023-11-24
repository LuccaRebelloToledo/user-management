import { AppDataSource } from './data-source';
import express from 'express';
import routers from './shared/infra/http/routers/index';

AppDataSource.initialize().then(() => {
  let app = express();

  app.use(express.json());
  app.use(routers);

  app.listen(process.env.PORT || 3333, () => {
    console.log('Server is running: ' + process.env.PORT || 3333);
  });

});
