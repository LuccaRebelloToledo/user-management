import { delay, inject, injectable } from "tsyringe";

import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";

import BCryptHashProvider from "../providers/hash-provider/implementations/BCryptHashProvider";
import IHashProvider from "../providers/hash-provider/models/IHashProvider";

import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import IListUserResponseDTO from "../dtos/IListUserResponseDTO";

import AppError from "../../../shared/infra/errors/AppError";
import { AppErrorType } from "../../../shared/infra/errors/AppErrorType";

@injectable()
class UpdateUsersService {
  constructor(
    @inject(delay(() => UsersRepository))
    public usersRepository: IUsersRepository,

    @inject(delay(() => BCryptHashProvider))
    public hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    email,
    password,
    name,
  }: IUpdateUserDTO): Promise<IListUserResponseDTO> {
    const userById = await this.usersRepository.findById({ id });

    if (!userById) {
      throw new AppError(AppErrorType.users.notFound, 404);
    }

    if (email) {
      const userByEmail = await this.usersRepository.findByEmail({ email });

      if (userByEmail) {
        throw new AppError(AppErrorType.users.emailAlreadyInUse, 400);
      }

      userById.email = email;
    }

    if (password) {
      const hashedPassword = await this.hashProvider.generateHash(password);

      userById.password = hashedPassword;
    }

    userById.name = name;

    const updatedUser = await this.usersRepository.save(userById);

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
    };
  }
}

export default UpdateUsersService;
