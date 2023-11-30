import { AppDataSource } from "../../../../../data-source";

import { singleton } from "tsyringe";

import { Repository } from "typeorm";

import IUsersTokensRepository from "../../../repositories/IUsersTokensRepository";

import UserToken from "../entities/UserToken";

import IGenerateUserTokenDTO from "../../../dtos/IGenerateUserTokenDTO";
import IFindUserTokenByTokenDTO from "../../../dtos/IFindUserTokenByTokenDTO";
import IDeleteUserTokenByTokenDTO from "../../../dtos/IDeleteUserTokenByTokenDTO";
import IDeleteUserTokenByUserIdDTO from "../../../dtos/IDeleteUserTokenByUserIdDTO";

@singleton()
class UsersTokensRepository implements IUsersTokensRepository {
  private usersTokensRepository: Repository<UserToken>;

  constructor() {
    this.usersTokensRepository = AppDataSource.getRepository(UserToken);
  }

  public async generate(userId: IGenerateUserTokenDTO): Promise<UserToken> {
    const userToken = this.usersTokensRepository.create(userId);

    await this.usersTokensRepository.save(userToken);

    return userToken;
  }

  public async findByToken(
    token: IFindUserTokenByTokenDTO
  ): Promise<UserToken | undefined> {
    const userToken = await this.usersTokensRepository.findOne({
      where: token,
    });

    if (userToken) {
      return userToken;
    }
  }

  public async deleteByToken(token: IDeleteUserTokenByTokenDTO): Promise<void> {
    await this.usersTokensRepository.delete(token);
  }

  public async deleteByUserId(
    userId: IDeleteUserTokenByUserIdDTO
  ): Promise<void> {
    const existingTokens = await this.usersTokensRepository.find({
      where: userId,
    });

    if (existingTokens) {
      const existingTokensIds = existingTokens.map((token) => token.id);

      if (existingTokensIds && existingTokensIds.length > 0) {
        await this.usersTokensRepository.delete(existingTokensIds);
      }
    }
  }
}

export default UsersTokensRepository;
