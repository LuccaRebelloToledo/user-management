import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUsersService from "../../../services/CreateUsersService";

export default class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    const createUsersService = container.resolve(CreateUsersService);
    const user = await createUsersService.execute({ email, password, name });

    return response.json(user);
  }
}
