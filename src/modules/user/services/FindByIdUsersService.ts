import { delay, inject, injectable } from "tsyringe";

import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";

import IFindUserByIdDTO from "../dtos/IFindUserByIdDTO";
import IListUserResponseDTO from "../dtos/IListUserResponseDTO";

import AppError from "../../../shared/infra/errors/AppError";
import { AppErrorType } from "../../../shared/infra/errors/AppErrorType";

@injectable()
class FindByIdUsersService {
  constructor(
    @inject(delay(() => UsersRepository))
    public usersRepository: IUsersRepository
  ) {}

  public async execute({
    id,
  }: IFindUserByIdDTO): Promise<IListUserResponseDTO> {
    const user = await this.usersRepository.findById({
      id,
    });

    if (user) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    }

    throw new AppError(AppErrorType.users.notFound, 404);
  }
}

export default FindByIdUsersService;
