import { inject, injectable } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/hash-provider/models/IHashProvider";
import AppError from "../../../shared/infra/errors/AppError";
import { AppErrorType } from "../../../shared/infra/errors/AppErrorType";

interface ICreateUsersServiceDTO {
    email: string,
    password: string,
    name: string
}

@injectable()
class CreateUsersService {

    constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ) {}

    public async execute({
        email,
        password,
        name
      }: ICreateUsersServiceDTO): Promise<User> {

        let existingUsers = await this.usersRepository.findByEmail({email});

        if(existingUsers){
            throw new AppError(AppErrorType.users.emailAlreadyInUse, 302);
        }

        let hashedPassword = await this.hashProvider.generateHash(password);

        let user = await this.usersRepository.create({
            email: String(email).toLowerCase(),
            password: hashedPassword,
            name
        });

        return user;
    }
}

export default CreateUsersService;