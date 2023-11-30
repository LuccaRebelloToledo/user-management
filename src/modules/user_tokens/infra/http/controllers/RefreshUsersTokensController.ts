import { Request, Response } from "express";

import { container } from "tsyringe";

import RefreshUsersTokensService from "../../../services/RefreshUsersTokensService";

export default class RefreshUsersTokensController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { refreshToken } = request.body;

    const refreshUsersTokensService = container.resolve(
      RefreshUsersTokensService
    );
    const { token, refreshToken: newRefreshToken } =
      await refreshUsersTokensService.execute({
        userId: id,
        refreshToken,
      });

    return response.json({
      token,
      refreshToken: newRefreshToken,
    });
  }
}
