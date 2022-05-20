import { Post, Reaction } from "@prisma/client";
import { ErrorCode, ErrorException } from "../../types/error.type";
import { PostData, PostPayload } from "../../types/post.type";
import userService from "../users";
import reactionService from '../reactions';
import { DefaultReactionCounts, ReactionCounts } from "../../types/reaction.type";
import { UserData } from "../../types/user.type";
import prisma from '../../config/prisma';

class CorePostService {

    constructor() {

    }

    // get's either all posts or all posts and replies
    async getAllPosts(getAll: boolean): Promise<PostData[]> {
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    {is_reply: false}, // don't include replies, we only want original posts.
                    {is_reply: getAll} // include replies if getAll is true.
                ]
            },
            orderBy: {
                created_at: "desc"
            }
        });

        const postIds = posts.map(post => post.id);

        return await this.getPosts(postIds);
    }

    async getPosts(postIds: number[]): Promise<PostData[]> {
        const posts = await prisma.post.findMany({
            where: {
                id: {
                    in: postIds
                }
            },
            orderBy: {
                created_at: "desc"
            }
        });

        // now make a request to get all the reaction counts for each post.
        const reactionCounts = await prisma.reaction.findMany({
            where: {
                post_id: {
                    in: postIds
                }
            },
            select: {
                post_id: true,
                reaction: true
            }        
        });

        // sum up the reaction counts for each post.
        const reactionCountsByPostId = reactionCounts.reduce((acc: {[key: number]: ReactionCounts}, reaction) => {
            const id = reaction.post_id ? reaction.post_id : 0;
            if (!acc[id]) {
                acc[id] = DefaultReactionCounts();
            }
            acc[id][reaction.reaction ? reaction.reaction : "like"]++;
            return acc;
        }, {} as {[key: number]: ReactionCounts});

        // fetch each necessary user, once
        const userIds = posts.map(post => post.user_id ? post.user_id : "");
        const users = await Promise.all(userIds.map(userId => userService.core.getUserById(userId)));
        const userData = {} as {[key: string]: UserData};
        for (let i = 0; i < users.length; i++) {
            userData[userIds[i]] = users[i];
        }

        // count how many posts are replied to these posts
        // first get all reply data
        const replies = await prisma.replies.findMany({
            where: {
                parent_id: {
                    in: postIds
                }                
            },
            select: {
                parent_id: true
            }
        });
        // count num replies to each
        const replyCountsByPostId = replies.reduce((acc: {[key: number]: number}, reply) => {
            const id = reply.parent_id ? reply.parent_id : 0;
            if (!acc[id]) {
                acc[id] = 0;
            }
            acc[id]++;
            return acc;
        }, {} as {[key: number]: number});

        // build the full post objects
        const builtPosts: PostData[] = posts.map(post => {
            return {
                id: post.id,
                body: post.body ? post.body : "",
                createdAt: post.created_at,
                isReply: post.is_reply ? post.is_reply : false,
                replyCount: replyCountsByPostId[post.id] ? replyCountsByPostId[post.id] : 0,

                // work in progress...
                author: {
                    ...userData[post.user_id ? post.user_id : ""]
                },
                reactionCounts: {
                    ...reactionCountsByPostId[post.id]
                }
            }
        });

        return builtPosts;
    }

    async getReplyIdsTo(postId: number): Promise<(number)[]> {
        // find all replies to a post
        const replies = await prisma.replies.findMany({
            where: {
                parent_id: postId
            },
            select: {
                post_id: true,
            }
        });
        const postIds = [postId, ...replies.map(reply => reply.post_id ? reply.post_id : 0)];

        return postIds;
    }

    async createPost(post: PostPayload): Promise<number> {
        const newPost = await prisma.post.create({
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

        // make sure we don't reply to itself
        if (thisPostID == post.parentId) {
            throw new ErrorException(ErrorCode.BadRequest, "parentId cannot be the same as the postId");
        }
        
        const newReply = await prisma.replies.create({
            data: {
                post_id: thisPostID,
                parent_id: post.parentId
            }
        });

        return newReply.id;
    }

    async deletePost(postId: number): Promise<number> {
        const post = await prisma.post.delete({
            where: {
                id: postId
            }
        });

        return post.id;
    }

    async getUserPosts(username: string): Promise<PostData[]> {
        const posts = await prisma.post.findMany({
            where: {
                users: {
                    username: username
                },
                is_reply: false // don't include replies, we only want original posts.
            },
            orderBy: {
                created_at: "desc"
            }
        }); 

        const postIds = posts.map(post => post.id);

        return await this.getPosts(postIds);
    }
}

export default new CorePostService();