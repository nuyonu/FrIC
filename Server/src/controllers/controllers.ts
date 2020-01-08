import { SiteController } from './siteController';
import { Controller } from './controller';
import { UsersController } from './usersController';
import { AuthController } from './authController';

export const CONTROLLERS: Controller[] = [
    new UsersController(),
    new AuthController(),
    new SiteController()
];