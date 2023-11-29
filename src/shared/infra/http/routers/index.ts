import { Router } from "express";
import usersRoutes from "../../../../modules/users/infra/http/routes/UsersRoutes";

const routers = Router();

routers.get("/", () => {
  "Hello World";
});

routers.use("/users", usersRoutes);

export default routers;
