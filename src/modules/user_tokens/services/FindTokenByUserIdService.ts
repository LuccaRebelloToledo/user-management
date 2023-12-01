import { injectable, inject, delay } from "tsyringe";

import UsersTokensRepository from "../infra/typeorm/repositories/UsersTokensRepository";
import IUsersTokensRepository from "../repositories/IUsersTokensRepository";

import IFindUserTokenByIdDTO from "../dtos/IFindUserTokenByIdDTO";

import UserToken from "../infra/typeorm/entities/UserToken";

@injectable()
class VerifyTokenService {
  constructor(
    @inject(delay(() => UsersTokensRepository))
    public usersTokensRepository: IUsersTokensRepository
  ) {}
  public async execute({
    userId,
  }: IFindUserTokenByIdDTO): Promise<UserToken | undefined> {
    const userToken = await this.usersTokensRepository.findByTokenByID({
      userId,
    });
    if (userToken) {
      return userToken;
    }
  }
}

export default VerifyTokenService;
