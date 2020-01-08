import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsInt, Length, IsEmail, IsDate, Min, Max } from "class-validator";

@Entity()
export class User {

    constructor(username: string, password: string, firstName: string, lastName: string, email: string, token: string)
    {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.plan = 1;
        this.createDate = new Date();
        this.token = token;
    }

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(5, 50)
    username: string;

    @Column()
    password: string;

    @Column()
    @Length(5, 100)
    firstName: string;

    @Column()
    @Length(5, 100)
    lastName: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    token: string;

    @Column()
    @IsInt()
    @Min(1)
    @Max(3)
    plan: number;

    @Column()
    @IsDate()
    createDate: Date;
}
