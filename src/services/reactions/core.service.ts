import { PrismaClient, Reaction } from "@prisma/client";
import { ErrorException, ErrorCode } from '../../types/error.type';

class CoreReactionService {
    private prisma: PrismaClient;
    
    constructor() {
        this.prisma = new PrismaClient();
    }

    public async getAllReactions(): Promise<Reaction[]> {
        const reactions = await this.prisma.reaction.findMany({
            // all
        });

        return reactions;
    }
}

export default new CoreReactionService();