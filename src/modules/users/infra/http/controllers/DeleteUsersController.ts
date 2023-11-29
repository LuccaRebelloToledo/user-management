import { Request, Response } from "express";
import { container } from "tsyringe";

import DeleteUsersService from "../../../services/DeleteUsersService";

export default class DeleteUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    const deleteUsersService = container.resolve(DeleteUsersService);
    await deleteUsersService.execute({ id: userId });

    return response.status(204).json();
  }
}
