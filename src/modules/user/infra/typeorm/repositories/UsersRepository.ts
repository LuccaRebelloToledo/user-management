import { AppDataSource } from "../../../../../data-source";
import { Repository } from "typeorm";
import { singleton } from "tsyringe";

import User from "../entities/User";

import IUsersRepository from "../../../repositories/IUsersRepository";

import IFindUserByIdDTO from "../../../dtos/IFindUserByIdDTO";
import IFindUserByEmailDTO from "../../../dtos/IFindUserByEmailDTO";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import IDeleteUserByIdDTO from "../../../dtos/IDeleteUserByIdDTO";

@singleton()
class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = AppDataSource.getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }

  public async findById(userId: IFindUserByIdDTO): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id: userId.id },
    });

    if (user) {
      return user;
    }

    return null;
  }

  public async findByEmail(
    userEmail: IFindUserByEmailDTO
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { email: userEmail.email },
    });

    if (user) {
      return user;
    }

    return null;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  public async delete(userId: IDeleteUserByIdDTO): Promise<void> {
    await this.usersRepository.delete(userId);
  }
}

export default UsersRepository;
