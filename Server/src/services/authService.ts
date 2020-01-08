import { LoginResponseDTO } from './../viewModels/loginResponseDTO';
import { LoginDTO } from "../viewModels/loginDTO";
import { DatabaseProvider } from "../database/databaseProvider";
import { User } from "../models/user";
import * as bcrypt from 'bcrypt';
import { config } from '../config/config';
import * as rjwt from 'restify-jwt-community';
import * as jwt from 'jsonwebtoken';

export class AuthService {
    public async authenticate(loginDTO: LoginDTO): Promise<LoginResponseDTO> {
        const connection = await DatabaseProvider.getConnection();
        const userRepository = connection.getRepository(User);
        const user = await userRepository.findOne({ where: { username: loginDTO.username}});
        if(user == undefined || !bcrypt.compareSync(loginDTO.password, user.password))
            throw new Error("Username or password invalid.");
        const token = jwt.sign({id: user.id, username: user.username}, config.JWT.SECRET, {
                expiresIn: '60m'
        });
        let loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.id = user.id;
        loginResponseDTO.token = token;
        return loginResponseDTO;
    }
}

export const authService = new AuthService();