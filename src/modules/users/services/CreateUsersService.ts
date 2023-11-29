import { delay, inject, injectable } from "tsyringe";

import IHashProvider from "../providers/hash-provider/models/IHashProvider";
import BCryptHashProvider from "../providers/hash-provider/implementations/BCryptHashProvider";

import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";

import AppError from "../../../shared/infra/errors/AppError";
import { AppErrorType } from "../../../shared/infra/errors/AppErrorType";

interface ICreateUsersServiceDTO {
  email: string;
  password: string;
  name: string;
}

@injectable()
class CreateUsersService {
  constructor(
    @inject(delay(() => UsersRepository))
    public usersRepository: IUsersRepository,

    @inject(delay(() => BCryptHashProvider))
    public hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
    name,
  }: ICreateUsersServiceDTO): Promise<User> {
    let existingUsers = await this.usersRepository.findByEmail({ email });

    if (existingUsers) {
      throw new AppError(AppErrorType.users.emailAlreadyInUse, 302);
    }

    let hashedPassword = await this.hashProvider.generateHash(password);

    let user = await this.usersRepository.create({
      email: String(email).toLowerCase(),
      password: hashedPassword,
      name,
    });

    return user;
  }
}

export default CreateUsersService;
