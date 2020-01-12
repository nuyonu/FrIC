import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { config } from '../config/config';
import * as restify from 'restify';
import * as fs from 'fs';

const serveStatic = require('serve-static-restify');

export class SiteController implements Controller {
    initialize(httpServer: HttpServer): void {
        httpServer.get("/favicon.ico", this.favIcon.bind(this));
        httpServer.get("/", this.index.bind(this));
        httpServer.get("/home", this.home.bind(this));
        httpServer.get("/demo", this.demo.bind(this));
        httpServer.get('/public/*', restify.plugins.serveStatic({
            directory : config.SRC
        }));
    }

    private async favIcon(req: Request, res: Response): Promise<void> {
        const data = fs.readFileSync(config.FAVICON);
        res.writeHead(200, {
                        'Content-Length': Buffer.byteLength(data),
                        'Content-Type': 'image/png'
                        });
        res.write(data);
        res.end();
    }

    private async index(req: Request, res: Response): Promise<void> {
        this.returnPage(req, res, '/index.html');
    }

    private async home(req: Request, res: Response): Promise<void> {
        this.returnPage(req, res, '/home.html');
    }

    private async demo(req: Request, res: Response): Promise<void> {
        this.returnPage(req, res, '/demo.html');
    }

    private async returnPage(req: Request, res: Response, view: string): Promise<void> {
        const data = fs.readFileSync(config.PUBLIC.VIEWS + view);
        res.writeHead(200, {
                        'Content-Length': Buffer.byteLength(data),
                        'Content-Type': 'text/html'
                        });
        res.write(data);
        res.end();
    }
}