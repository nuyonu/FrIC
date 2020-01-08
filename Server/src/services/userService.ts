import { TokenService } from './tokenService';
import { DatabaseProvider } from "../database/databaseProvider";
import { User } from '../models/user';
import * as bcrypt from 'bcrypt';
import { GetUserDTO } from '../viewModels/getUserDTO';
import 'automapper-ts';
import { validate } from 'class-validator';

export class UserService {
    public async getById(id: string): Promise<GetUserDTO> {
        const connection = await DatabaseProvider.getConnection();
        const user = await connection.getRepository(User).findOne(id);
        
        automapper.createMap('user', 'userDTO')
                .forSourceMember('password', function (opts) { opts.ignore(); })
        const getUserDTO: GetUserDTO = automapper.map('user', 'userDTO', user);

        return getUserDTO;
    }

    public async create(user: User): Promise<GetUserDTO> {
        if(await this.usernameAlreadyInDatabase(user.username))
            throw new Error('Username already used');
        
        const connection = await DatabaseProvider.getConnection();
        const userRepository = connection.getRepository(User);
        const token = await TokenService.generate();
        const saltRounds = 10;
        const hashesPassword = bcrypt.hashSync(user.password, saltRounds);
        const userToSave = new User(user.username, user.password, user.email, token);

        let errorsUser: string = "";

        await validate(userToSave).then(errors => {
            if (errors.length > 0) {
                errors.forEach(error => {
                    if(error.constraints.length != undefined)
                        errorsUser += (error.constraints.length) + "#";
                    else if(error.constraints.isEmail != undefined)
                            errorsUser += (error.constraints.isEmail);
                });
            }
        });

        if(errorsUser.length != 0)
            throw new Error(errorsUser);

        userToSave.password = hashesPassword;
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