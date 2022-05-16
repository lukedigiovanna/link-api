import { PrismaClient, Post } from "@prisma/client";
import { ErrorCode, ErrorException } from "../../types/error.type";
import { PostPayload } from "../../types/post.type";

class CorePostService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllPosts(getAll: boolean): Promise<Post[]> {
        console.log(getAll);
        const posts = await this.prisma.post.findMany({
            where: {
                OR: [
                    {is_reply: false}, // don't include replies, we only want original posts.
                    {is_reply: getAll} // include replies if getAll is true.
                ]
            }
        });

        return posts;
    }

    async createPost(post: PostPayload): Promise<number> {
        const newPost = await this.prisma.post.create({
            data: {
                body: post.body,
                user_id: post.userId,
                is_reply: post.isReply
            }
        });

        return newPost.id;
    }

    async createReply(post: PostPayload): Promise<number> {
        if (!post.parentId) {
            throw new ErrorException(ErrorCode.BadRequest, "parentId is required for replies");
        }

        const thisPostID = await this.createPost(post);

        console.log(thisPostID);
        
        const newReply = await this.prisma.replies.create({
            data: {
                post_id: thisPostID,
                parent_id: post.parentId
            }
        });

        return newReply.id;
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