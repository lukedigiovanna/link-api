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

    async deletePost(postId: number): Promise<number> {
        const post = await this.prisma.post.delete({
            where: {
                id: postId
            }
        });

        return post.id;
    }

    async getUserPosts(username: string): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({
            where: {
                User: {
                    username: username
                },
                is_reply: false // don't include replies, we only want original posts.
            }
        });

        return posts;
    }
}

export default new CorePostService();