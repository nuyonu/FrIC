import { userService } from './../services/userService';
import { HttpServer } from './../server/httpServer';
import { Controller } from './controller';
import { Request, Response} from "restify";
import { config } from "../config/config";
import { validate } from 'class-validator';
import { User } from '../models/user';
import * as rjwt from 'restify-jwt-community';

export class UsersController implements Controller {
    initialize(httpServer: HttpServer): void {
        const controllerName = "/" + this.constructor.name.substring(0, this.constructor.name.indexOf("Controller")).toLowerCase();
        httpServer.get(config.API.ROOT + controllerName, this.list.bind(this));
        httpServer.get(config.API.ROOT + controllerName + config.API.ID, this.getById.bind(this));
        httpServer.post(config.API.ROOT + controllerName, this.create.bind(this));
        // httpServer.put('/users/:id', this.update.bind(this))
        // httpServer.delete('/users/:id', this.delete.bind(this))
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await userService.list());
    }

    
    private async getById(req: Request, res: Response): Promise<void> {
        const user = await userService.getById(req.params.id);
        res.send(user ? 200 : 404, user);
    }

    
    private async create(req: Request, res: Response): Promise<void> {
        try {
            let response = await userService.create(req.body);
            res.send(response);
        }
        catch(e) {
            res.send(400, {message: e.message})
        }
        
    }
    
    private async update(req: Request, res: Response): Promise<void> {
        //TODO IF IS NECESSARY
    }

    
    private async delete(req: Request, res: Response): Promise<void> {
        //TODO IF IS NECESSARY
    }
}