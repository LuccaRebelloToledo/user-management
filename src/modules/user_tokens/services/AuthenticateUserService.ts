import { delay, inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";

import AppError from "../../../shared/infra/errors/AppError";
import { AppErrorType } from "../../../shared/infra/errors/AppErrorType";

import IListUserTokenResponseDTO from "../dtos/IListUserTokenResponseDTO";
import authConfig from "../../../config/auth";

import IUsersRepository from "../../user/repositories/IUsersRepository";
import IUsersTokensRepository from "../repositories/IUsersTokensRepository";
import IHashProvider from "../../user/providers/hash-provider/models/IHashProvider";

import UsersRepository from "../../user/infra/typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../infra/typeorm/repositories/UsersTokensRepository";
import BCryptHashProvider from "../../user/providers/hash-provider/implementations/BCryptHashProvider";

interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject(delay(() => UsersRepository))
    public usersRepository: IUsersRepository,

    @inject(delay(() => UsersTokensRepository))
    public usersTokensRepository: IUsersTokensRepository,

    @inject(delay(() => BCryptHashProvider))
    public hashProvider: IHashProvider
  ) {}
  public async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IListUserTokenResponseDTO> {
    const user = await this.usersRepository.findByEmail({ email });

    if (!user) {
      throw new AppError(AppErrorType.sessions.invalidCredentials, 400);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError(AppErrorType.sessions.invalidCredentials, 400);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    await this.usersTokensRepository.deleteByUserId({ userId: user.id });

    const { token: refreshToken } = await this.usersTokensRepository.generate({
      userId: user.id,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  }
}

export default AuthenticateUserService;
