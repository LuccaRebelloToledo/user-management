import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IListUserDTO from '../dtos/IListUserDTO';
import IFindUserByEmailDTO from '../dtos/IFindUserByEmailDTO';
import IListUserResponseDTO from '../dtos/IListUserResponseDTO';
import IFindUserByIdDTO from '../dtos/IFindUserByIdDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUsersRepository {
  findAll(userData: IListUserDTO): Promise<IListUserResponseDTO>;
  findById(userId: IFindUserByIdDTO): Promise<User | null>;
  findByEmail(userEmail: IFindUserByEmailDTO): Promise<User | null>;
  create(userData: ICreateUserDTO): Promise<User>;
  update(userData: IUpdateUserDTO): Promise<User>;
  delete(userId: string): Promise<void>;
}
