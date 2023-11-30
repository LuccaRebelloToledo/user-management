import { delay, inject, injectable } from "tsyringe";

import IUsersRepository from "../repositories/IUsersRepository";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

import IListUserResponseDTO from "../dtos/IListUserResponseDTO";

import AppError from "../../../shared/infra/errors/AppError";
import { AppErrorType } from "../../../shared/infra/errors/AppErrorType";

@injectable()
class FindAllUsersService {
  constructor(
    @inject(delay(() => UsersRepository))
    public usersRepository: IUsersRepository
  ) {}

  public async execute(): Promise<IListUserResponseDTO[]> {
    const users = await this.usersRepository.findAll();

    if (users && users.length > 0) {
      const listUsers: IListUserResponseDTO[] = users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
      }));

      return listUsers;
    }

    throw new AppError(AppErrorType.users.notFound, 404);
  }
}

export default FindAllUsersService;
