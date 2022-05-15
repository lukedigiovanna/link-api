export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatarURL: string;
    createdAt: Date;
}