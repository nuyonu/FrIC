import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsInt, Length, IsEmail, IsDate, Min, Max, IsIn } from "class-validator";
import { config } from "../config/config";

@Entity()
export class User {

    constructor(username: string, password: string, email: string, token: string)
    {
        this.username = username;
        this.password = password;
        this.email = email;
        this.plan = 1;
        this.createDate = new Date();
        this.currentRequests = 0;
        this.maximumRequests = config.USER.REQUESTS.FREE;
        this.token = token;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(5, 50, {message : "Username must be between 5 and 50 characters"})
    username: string;

    @Column()
    @Length(5, 128, {message : "Password must be between 5 and 128 characters"})
    password: string;

    @Column()
    @IsEmail({}, {message : "Email must be a valid"})
    email: string;

    @Column()
    token: string;

    @Column()
    @IsInt()
    @Min(1)
    @Max(3)
    plan: number;

    @Column()
    @IsInt()
    currentRequests: number;

    @Column()
    @IsInt()
    maximumRequests: number;

    @Column()
    @IsDate()
    createDate: Date;
}
