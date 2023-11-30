import { Request, Response } from "express";

import { container } from "tsyringe";

import AuthenticateUserService from "../../../services/AuthenticateUserService";

export default class CreateUsersTokensController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);
    const { user, token, refreshToken } = await authenticateUserService.execute(
      {
        email,
        password,
      }
    );
    return response.json({ user, token, refreshToken });
  }
}
