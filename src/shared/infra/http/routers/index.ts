import { Router } from "express";
import usersRoutes from "../../../../modules/users/infra/http/routes/UsersRoutes";

const routers = Router();

routers.use("/users", usersRoutes);

export default routers;
