import { HttpServer } from '../server/httpServer';

export interface Controller {
    initialize(HttpServer: HttpServer): void;
}