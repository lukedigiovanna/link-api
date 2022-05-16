export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatarURL: string;
}

export interface UserData {
    name: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarURL: string;
    createdAt: Date;
}