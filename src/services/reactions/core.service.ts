import { PrismaClient, Reaction, Prisma, Emotion } from "@prisma/client";
import { ErrorException, ErrorCode } from '../../types/error.type';
import { DefaultReactionCounts, ReactionCounts, ReactionPayload } from "../../types/reaction.type";

class CoreReactionService {
    private prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllReactions(): Promise<Reaction[]> {
        const reactions = await this.prisma.reaction.findMany({
            // all 
        });

        return reactions;
    }

    async createReaction(reaction: ReactionPayload, postId: number): Promise<number> {
        // check that the reaction is an actual emotion and not something random
        if (!Object.values(Emotion).includes(reaction.reaction)) {
            throw new ErrorException(ErrorCode.BadRequest, "Invalid reaction");
        }

        const createdReaction = await this.prisma.reaction.create({
            data: {
                Post: {
                    connect: {id: postId}
                },
                User: {
                    connect: {id: reaction.userId}
                },
                reaction: reaction.reaction
            }
        });

        return createdReaction.id;
    }

    async getPostReactions(postId: number): Promise<Reaction[]> {
        const reactions = await this.prisma.reaction.findMany({
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
        //     reactionCounts[emotion] = await this.prisma.reaction.count({
        //         where: {
        //             post_id: postId,
        //             reaction: emotion
        //         }          
        //     });
        //     console.log(emotion, reactionCounts)
        // })

        // count all reactions for each type
        const reactionCounts: ReactionCounts = DefaultReactionCounts();
        const reactions = await this.prisma.reaction.findMany({
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
}

export default new CoreReactionService();