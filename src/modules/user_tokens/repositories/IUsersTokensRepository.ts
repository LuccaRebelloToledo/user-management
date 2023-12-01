import UserToken from "../infra/typeorm/entities/UserToken";

import IGenerateUserTokenDTO from "../dtos/IGenerateUserTokenDTO";
import IFindUserTokenByTokenDTO from "../dtos/IFindUserTokenByTokenDTO";
import IDeleteUserTokenByTokenDTO from "../dtos/IDeleteUserTokenByTokenDTO";
import IDeleteUserTokenByUserIdDTO from "../dtos/IDeleteUserTokenByUserIdDTO";
import IFindUserTokenByIdDTO from "../dtos/IFindUserTokenByIdDTO";

export default interface IUserTokensRepository {
  generate(userId: IGenerateUserTokenDTO): Promise<UserToken>;
  findByToken(token: IFindUserTokenByTokenDTO): Promise<UserToken | undefined>;
  findByTokenByID(
    userId: IFindUserTokenByIdDTO
  ): Promise<UserToken | undefined>;
  deleteByToken(token: IDeleteUserTokenByTokenDTO): Promise<void>;
  deleteByUserId(userId: IDeleteUserTokenByUserIdDTO): Promise<void>;
}
