export interface PostPayload {
    userId: string;
    parentId?: number;
    body: string;
    isReply: boolean;
}