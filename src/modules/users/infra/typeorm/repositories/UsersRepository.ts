import { singleton } from "tsyringe";

import User from "../entities/User";
import IUsersRepository from "../../../repositories/IUsersRepository";

import IListUserDTO from "../../../dtos/IListUserDTO";
import IListUserResponseDTO from "../../../dtos/IListUserResponseDTO";
import IFindUserByIdDTO from "../../../dtos/IFindUserByIdDTO";
import IFindUserByEmailDTO from "../../../dtos/IFindUserByEmailDTO";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import IUpdateUserDTO from "../../../dtos/IUpdateUserDTO";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../data-source";


@singleton()
class UsersRepository implements IUsersRepository {

    private usersRepository : Repository<User>;
    
    constructor(){
        this.usersRepository = AppDataSource.getRepository(User);
    }

    public async findAll(userData: IListUserDTO): Promise<IListUserResponseDTO> {
        throw new Error("Method not implemented.");
    }
    
    public async findById(userId: IFindUserByIdDTO): Promise<User | null> {
        let user = await this.usersRepository.findOne({ where: { id: userId.id } });
        
        return user;
    }

    public async findByEmail(userEmail: IFindUserByEmailDTO): Promise<User | null> {
        let user = await this.usersRepository.findOne({ where: { email: userEmail.email } });
        
        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        let user = this.usersRepository.create(userData);
        await this.usersRepository.save(userData);
    
        return user;
    }

    public async update(userData: IUpdateUserDTO): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public async delete(userId: string): Promise<void> {
        await this.usersRepository.delete(userId);
    }
    
}

export default UsersRepository;