import { PrismaClient, Reaction, Prisma } from "@prisma/client";
import { ErrorException, ErrorCode } from '../../types/error.type';
import { ReactionPayload } from "../../types/reaction.type";

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

    async createReaction(reaction: ReactionPayload): Promise<number> {
        console.log(reaction);
        // const uncheckedInput: Prisma.ReactionUncheckedCreateInput = {
        //     post_id: reaction.postId, 
        //     user_id: reaction.userId,
        //     reaction: reaction.reaction
        // }
        // const createdReaction = await this.prisma.reaction.create({
        //     data: uncheckedInput
        // });
        const createdReaction = await this.prisma.reaction.create({
            data: {
                Post: {
                    connect: {id: reaction.postId}
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
}

export default new CoreReactionService();