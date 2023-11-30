import { Request, Response } from "express";
import { container } from "tsyringe";

import FindByEmailUsersService from "../../../services/FindByEmailUsersService";

export default class FindByEmailUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const findByEmailUsersService = container.resolve(FindByEmailUsersService);
    const user = await findByEmailUsersService.execute({
      email,
    });

    return response.json(user);
  }
}
