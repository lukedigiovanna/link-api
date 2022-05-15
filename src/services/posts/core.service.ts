import { PrismaClient, Posts } from "@prisma/client";

class CorePostService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllPosts(): Promise<Posts[]> {
        const posts = await this.prisma.posts.findMany({
            // all
        });

        return posts;
    }
}

export default new CorePostService();