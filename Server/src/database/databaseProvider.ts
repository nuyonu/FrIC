import { DatabaseConfiguration } from './databaseConfiguration';
import { Connection, createConnection } from "typeorm";
import { User } from '../models/user';

export class DatabaseProvider {
    private static connection: Connection;
    private static configuration: DatabaseConfiguration;

    public static configure(config: DatabaseConfiguration): void {
        DatabaseProvider.configuration = config;
    }

    public static async getConnection(): Promise<Connection> {
        if(DatabaseProvider.connection) 
        {
            return DatabaseProvider.connection;
        }

        const { type, host, port, username, password, database, ssl } = DatabaseProvider.configuration;

        DatabaseProvider.connection = await createConnection({
            type, host, port, username, password, database,
            extra: {
                ssl
            },
            entities: [ User ],
            synchronize: true // A NU SE FOLOSI IN PRODUCTION
        });

        return DatabaseProvider.connection;
    }
}