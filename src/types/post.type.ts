import { ReactionCounts } from "./reaction.type";
import { UserData } from "./user.type";

export interface PostPayload {
    userId?: string; // the user ID will be passed via authorization token from the request
    parentId?: number;
    body: string;
    isReply: boolean;
    author: UserData;
}

export interface PostData {
    id: number;
    body: string;
    createdAt: Date;
    isReply: boolean;
    replyCount: number;
    author: UserData;
    reactionCounts: ReactionCounts;
}