import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindUserByEmailDTO from "../dtos/IFindUserByEmailDTO";
import IListUserResponseDTO from "../dtos/IListUserResponseDTO";
import IFindUserByIdDTO from "../dtos/IFindUserByIdDTO";
import IDeleteUserByIdDTO from "../dtos/IDeleteUserByIdDTO";

import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(userId: IFindUserByIdDTO): Promise<User | undefined>;
  findByEmail(userEmail: IFindUserByEmailDTO): Promise<User | undefined>;
  create(userData: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(userId: IDeleteUserByIdDTO): Promise<void>;
}
