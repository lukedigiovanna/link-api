import { Emotion } from "@prisma/client";

export interface ReactionPayload {
    userId: string,
    reaction: Emotion
}

export interface ReactionCounts {
    like: number,
    dislike: number,
    love: number,
    haha: number,
    wow: number,
    sad: number,
    angry: number
}

// defaults all reaction counts to 0
export const DefaultReactionCounts: () => ReactionCounts = (): ReactionCounts => {
    return {
        like: 0,
        dislike: 0,
        love: 0,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0
    }
}