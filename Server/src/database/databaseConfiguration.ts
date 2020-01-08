export interface DatabaseConfiguration {
    type: "postgres";
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl ?: boolean;
}