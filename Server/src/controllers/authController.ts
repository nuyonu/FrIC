import { LoginResponseDTO } from './../viewModels/loginResponseDTO';
import { authService } from './../services/authService';
import { Controller } from './controller';
import { config } from "../config/config";
import { Request, Response} from "restify";
import { HttpServer } from '../server/httpServer';

export class AuthController implements Controller {
    initialize(httpServer: HttpServer): void {
        const controllerName = "/" + this.constructor.name.substring(0, this.constructor.name.indexOf("Controller")).toLowerCase();
        httpServer.post(config.API.ROOT + controllerName, this.auth.bind(this));
    }

    private async auth(req: Request, res: Response): Promise<void> {
        try {
            const loginResponseDTO: LoginResponseDTO = await authService.authenticate(req.body);
            res.send(200, loginResponseDTO);
        }
        catch(e)
        {
            res.send(400, {message: e.message});
        }
    }

}