import { AppDataSource } from "../../../../../data-source";
import { Repository } from "typeorm/repository/Repository";

import IUsersRepository from "../../../repositories/IUsersRepository";
import User from "../entities/User";

import IListUserDTO from "../../../dtos/IListUserDTO";
import IListUserResponseDTO from "../../../dtos/IListUserResponseDTO";
import IFindUserByIdDTO from "../../../dtos/IFindUserByIdDTO";
import IFindUserByEmailDTO from "../../../dtos/IFindUserByEmailDTO";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    public async findAll(userData: IListUserDTO): Promise<IListUserResponseDTO> {
        throw new Error("Method not implemented.");
    }
    
    public async findById(userId: IFindUserByIdDTO): Promise<User | null> {
        let user = await this.userRepository.findOne({ where: { id: userId.id } });
        
        return user;
    }

    public async findByEmail(userEmail: IFindUserByEmailDTO): Promise<User | null> {
        let user = await this.userRepository.findOne({ where: { email: userEmail.email } });
        
        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        let user = this.userRepository.create(userData);
        await this.userRepository.save(userData);
    
        return user;
    }

    public async delete(userId: string): Promise<void> {
        await this.userRepository.delete(userId);
    }
    
}

export default UsersRepository;