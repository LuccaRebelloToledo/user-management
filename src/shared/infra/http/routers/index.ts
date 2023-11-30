import { Router } from "express";

import usersRoutes from "../../../../modules/user/infra/http/routes/UsersRoutes";
import sessionsRouter from "../../../../modules/user_tokens/infra/http/routes/UsersTokensRoutes";

const routers = Router();

routers.use("/sessions", sessionsRouter);
routers.use("/users", usersRoutes);

export default routers;
