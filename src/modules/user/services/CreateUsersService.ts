import { delay, inject, injectable } from "tsyringe";

import IHashProvider from "../providers/hash-provider/models/IHashProvider";
import BCryptHashProvider from "../providers/hash-provider/implementations/BCryptHashProvider";

import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";

import AppError from "../../../shared/infra/errors/AppError";
import { AppErrorType } from "../../../shared/infra/errors/AppErrorType";

import IListUserResponseDTO from "../dtos/IListUserResponseDTO";

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
  }: ICreateUsersServiceDTO): Promise<IListUserResponseDTO> {
    const existingUser = await this.usersRepository.findByEmail({ email });

    if (existingUser) {
      throw new AppError(AppErrorType.users.emailAlreadyInUse, 302);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email: String(email).toLowerCase(),
      password: hashedPassword,
      name,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}

export default CreateUsersService;
