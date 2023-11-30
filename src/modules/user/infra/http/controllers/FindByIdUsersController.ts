import { Request, Response } from "express";
import { container } from "tsyringe";

import FindByIdUsersService from "../../../services/FindByIdUsersService";

export default class FindByIdUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findByIdUsersService = container.resolve(FindByIdUsersService);
    const user = await findByIdUsersService.execute({
      id,
    });

    return response.json(user);
  }
}
