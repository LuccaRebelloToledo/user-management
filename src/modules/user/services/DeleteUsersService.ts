import { container, delay, inject, injectable } from "tsyringe";

import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "../repositories/IUsersRepository";

import IDeleteUserByIdDTO from "../dtos/IDeleteUserByIdDTO";

import FindByIdUsersService from "./FindByIdUsersService";

@injectable()
class DeleteUsersService {
  constructor(
    @inject(delay(() => UsersRepository))
    public usersRepository: IUsersRepository
  ) {}

  public async execute({ id }: IDeleteUserByIdDTO): Promise<void> {
    const findByIdUsersService = container.resolve(FindByIdUsersService);
    const user = await findByIdUsersService.execute({ id });

    if (user) {
      await this.usersRepository.delete({ id: user.id });
    }
  }
}

export default DeleteUsersService;
