export interface PostPayload {
    userId?: string; // the user ID will be passed via authorization token from the request
    parentId?: number;
    body: string;
    isReply: boolean;
}