export class GetUserDTO {
    id: number;
    username: string;
    email: string;
    token: string;
    plan: number;
    currentRequests: number;
    maximumRequests: number;
    createDate: Date;
}