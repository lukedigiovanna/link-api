import { PrismaClient, Reaction, Prisma, Emotion } from "@prisma/client";
import { ErrorException, ErrorCode } from '../../types/error.type';
import { DefaultReactionCounts, ReactionCounts, ReactionPayload } from "../../types/reaction.type";
import prisma from '../../config/prisma';

class CoreReactionService {
    
    constructor() {

    }

    async getAllReactions(): Promise<Reaction[]> {
        const reactions = await prisma.reaction.findMany({
            // all 
        });

        return reactions;
    }

    async getAllUserReactions(userId: string): Promise<Reaction[]> {
        const reactions = await prisma.reaction.findMany({
            where: {
                user_id: userId
            }
        });
        return reactions;
    }

    async createReaction(reaction: ReactionPayload, postId: number): Promise<Reaction> {
        // check that the reaction is an actual emotion and not something random
        if (!Object.values(Emotion).includes(reaction.reaction)) {
            throw new ErrorException(ErrorCode.BadRequest, "Invalid reaction");
        }

        const createdReaction = await prisma.reaction.create({
            data: {
                posts: {
                    connect: {id: postId}
                },
                users: {
                    connect: {id: reaction.userId}
                },
                reaction: reaction.reaction
            }
        });

        return createdReaction;
    }

    async getPostReactions(postId: number): Promise<Reaction[]> {
        const reactions = await prisma.reaction.findMany({
            where: {
                post_id: postId
            }
        });

        return reactions;
    }

    async getPostReactionCounts(postId: number): Promise<ReactionCounts> {
        // count all reactions for each type
        // const reactionCounts: ReactionCounts = DefaultReactionCounts();
        
        // Object.values(Emotion).forEach(async emotion => {
        //     reactionCounts[emotion] = await prisma.reaction.count({
        //         where: {
        //             post_id: postId,
        //             reaction: emotion
        //         }          
        //     });
        //     console.log(emotion, reactionCounts)
        // })

        // count all reactions for each type
        const reactionCounts: ReactionCounts = DefaultReactionCounts();
        const reactions = await prisma.reaction.findMany({
            where: {
                post_id: postId // get them from the given post.
            },
            select: {
                reaction: true // we only care about the reaction field
            }
        });

        Object.values(Emotion).forEach(reaction => {
            reactionCounts[reaction] = reactions.filter(r => r.reaction === reaction).length;
        });

        
        return reactionCounts;
    }

    async hasReacted(postId: number, userId: string, reaction: Emotion): Promise<boolean> {
        // see if there are any reactions that match the given 
        const hasReacted = await prisma.reaction.findFirst({
            where: {
                post_id: postId,
                user_id: userId,
                reaction: reaction
            }
        });

        return hasReacted !== null;
    }
}

export default new CoreReactionService();