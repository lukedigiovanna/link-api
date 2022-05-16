import { Emotion } from "@prisma/client";

export interface ReactionPayload {
    postId: number,
    userId: string,
    reaction: Emotion
}