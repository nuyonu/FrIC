import { DatabaseProvider } from "../database/databaseProvider";
import { User } from "../models/user";


export class TokenService {
    public static async generate(): Promise<string> {
        const connection = await DatabaseProvider.getConnection();
        const userRepository = connection.getRepository(User);
        const tokenLength = 128;
        let generatedToken = TokenService.randomString(tokenLength);
        while(await userRepository.findOne({where: {token : generatedToken}}) != undefined)
        {
            generatedToken = TokenService.randomString(tokenLength);
        }
        return generatedToken;
    }

    private static randomString(length: number): string {
        let result = "";
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
}