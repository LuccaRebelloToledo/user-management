import { Request, Response } from "express";
import { container } from "tsyringe";

import FindAllUsersService from "../../../services/FindAllUsersService";

export default class FindAllUsersController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const findAllUsersService = container.resolve(FindAllUsersService);
    const users = await findAllUsersService.execute();

    return response.json(users);
  }
}
