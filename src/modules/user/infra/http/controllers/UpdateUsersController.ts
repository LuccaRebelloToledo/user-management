import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUsersService from "../../../services/UpdateUsersService";

export default class UpdateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { email, password, name } = request.body;

    const updateUsersService = container.resolve(UpdateUsersService);
    const user = await updateUsersService.execute({
      id,
      email: String(email).toLowerCase(),
      password,
      name,
    });

    return response.json(user);
  }
}
