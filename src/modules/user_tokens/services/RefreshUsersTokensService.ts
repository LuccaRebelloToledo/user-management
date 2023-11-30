import { delay, inject, injectable } from "tsyringe";

import IUsersRepository from "../../user/repositories/IUsersRepository";
import IUsersTokensRepository from "../repositories/IUsersTokensRepository";

import UsersRepository from "../../user/infra/typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../infra/typeorm/repositories/UsersTokensRepository";

import AppError from "../../../shared/infra/errors/AppError";
import { AppErrorType } from "../../../shared/infra/errors/AppErrorType";

import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth";

interface IRefreshUsersTokensServiceDTO {
  userId: string;
  refreshToken: string;
}

@injectable()
class RefreshUsersTokensService {
  constructor(
    @inject(delay(() => UsersRepository))
    public usersRepository: IUsersRepository,

    @inject(delay(() => UsersTokensRepository))
    public usersTokensRepository: IUsersTokensRepository
  ) {}

  public async execute({
    userId,
    refreshToken,
  }: IRefreshUsersTokensServiceDTO) {
    const user = await this.usersRepository.findById({ id: userId });

    if (!user) {
      throw new AppError(AppErrorType.users.notFound, 404);
    }

    const checkRefreshToken = await this.usersTokensRepository.findByToken({
      token: refreshToken,
    });

    if (!checkRefreshToken || checkRefreshToken.userId !== userId) {
      throw new AppError(AppErrorType.sessions.invalidRefreshToken, 400);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    await this.usersTokensRepository.deleteByToken({ token: refreshToken });

    const { token: newRefreshToken } =
      await this.usersTokensRepository.generate({ userId: user.id });

    return {
      token,
      refreshToken: newRefreshToken,
    };
  }
}

export default RefreshUsersTokensService;
