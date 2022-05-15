import { PrismaClient, Post } from "@prisma/client";
import { PostPayload } from "../../types/post.type";

class CorePostService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllPosts(): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({
            // all
        });

        return posts;
    }

    async createPost(post: PostPayload): Promise<number> {
        const newPost = await this.prisma.post.create({
            data: {
                body: post.body,
                user_id: post.userId,
                created_at: new Date(),
                is_reply: post.isReply
            }
        });

        return newPost.id;
    }
}

export default new CorePostService();