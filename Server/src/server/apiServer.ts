import { CONTROLLERS } from './../controllers/controllers';
import { HttpServer } from './httpServer';
import * as restify from "restify";
import { Server, RequestHandler } from "restify";
import * as rjwt from 'restify-jwt-community';
import { config } from '../config/config';

export class ApiSever implements HttpServer {
    public get(url: string, requestHandler: restify.RequestHandler): void {
        this.addRoute("get", url, requestHandler);
    }
    public post(url: string, requestHandler: restify.RequestHandler): void {
        this.addRoute("post", url, requestHandler);
    }
    public put(url: string, requestHandler: restify.RequestHandler): void {
        this.addRoute("put", url, requestHandler);
    }
    public delete(url: string, requestHandler: restify.RequestHandler): void {
        this.addRoute("delete", url, requestHandler);
    }

    public start(port: number): void {
        this.restify = restify.createServer();
        this.restify.use(restify.plugins.bodyParser());
        this.restify.use(restify.plugins.queryParser());
        // this.restify.use(rjwt({secret: config.JWT.SECRET}).unless({
        //     path: ['/api/auth', '/api/users', "/", "/home", '/public/*']
        // }));
        // this.restify.use(rjwt({secret: config.JWT.SECRET}).unless({
        //     path: ['/api/auth', '/api/users', "/", "/home", '/public/*']
        // }));
        
        CONTROLLERS.forEach(controller => controller.initialize(this));

        this.restify.listen(port, () => console.log(`Server is up and running on port ${port}`));
    }

    private addRoute(method: "get" | "post" | "put" | "delete", url: string, requestHandler: RequestHandler): void {
        this.restify[method](url, async (req, res, next) => {
            try {
                await requestHandler(req, res, next);
            }
            catch(e) {
                res.send(500, e);
            }
        });

        console.log(`Added route ${method.toUpperCase()}: ${url}`);
    }

    private restify: Server;
}