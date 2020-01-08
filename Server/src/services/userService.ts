import { TokenService } from './tokenService';
import { DatabaseProvider } from "../database/databaseProvider";
import { User } from '../models/user';
import * as bcrypt from 'bcrypt';
import { GetUserDTO } from '../viewModels/getUserDTO';
import 'automapper-ts';

export class UserService {
    public async getById(id: string): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const user = await connection.getRepository(User).findOne(id);
        
        automapper.createMap('user', 'userDTO')
                .forSourceMember('password', function (opts) { opts.ignore(); })
        const getUserDTO = automapper.map('user', 'userDTO', user);

        return getUserDTO;
    }

    public async create(user: User): Promise<GetUserDTO> {
        console.log(user);
        if(await this.usernameAlreadyInDatabase(user.username))
            throw new Error('Username already in database');
        
        const connection = await DatabaseProvider.getConnection();
        const userRepository = connection.getRepository(User);
        const token = await TokenService.generate();
        const saltRounds = 10;
        const hashesPassword = bcrypt.hashSync(user.password, saltRounds);
        const userToSave = new User(user.username, hashesPassword, user.firstName, user.lastName, user.email, token);

        await userRepository.save(userToSave);

        automapper.createMap('user', 'userDTO')
                .forSourceMember('password', function (opts) { opts.ignore(); })
        const getUserDTO = automapper.map('user', 'userDTO', userToSave);

        return getUserDTO;
    }

    public async list(): Promise<User[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(User).find();
    }
    
    public async update(user: User): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const userRepository = connection.getRepository(User);
        const entity = await userRepository.findOne(user.id);
        entity.firstName = user.firstName;
        entity.lastName = user.lastName;
        entity.password = user.password;
        return await userRepository.save(entity);
    }

    public async delete(id: string): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const userRepository = connection.getRepository(User);
        let userToRemove = await userRepository.findOne(id);
        return await userRepository.remove(userToRemove);
    }

    public async usernameAlreadyInDatabase(username: string): Promise<boolean> {
        const connection = await DatabaseProvider.getConnection();
        const userRepository = connection.getRepository(User);
        const user = await userRepository.findOne({ where: { username: username}});
        return user != undefined;
    }
}

export const userService = new UserService();