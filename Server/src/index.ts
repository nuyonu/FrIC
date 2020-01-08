import { ApiSever } from "./server/apiServer";
import { DatabaseProvider } from "./database/databaseProvider";

DatabaseProvider.configure({
    type: process.env.DATABASE_TYPE as any || 'postgres',
    database: process.env.DATABASE_NAME || 'fricserver',
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || '1234',
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    ssl: !!process.env.USE_SSL
});

const server = new ApiSever();
server.start(+process.env.PORT || 8080);