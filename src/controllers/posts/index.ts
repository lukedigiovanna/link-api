import { Request, Response, NextFunction } from "express";
import postService from "../../services/posts";
import userService from '../../services/users';
import { ErrorCode, ErrorException } from "../../types/error.type";
import { PostPayload } from "../../types/post.type";

class PostController {
    public async allPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const getAll = req.query.all === 'true';
            const offset = req.query.offset ? Number(req.query.offset) : 0;
            const amount = req.query.amount ? Number(req.query.amount) : 10;
            const parent = req.query.replyTo ? Number(req.query.replyTo) : 0;

            console.log(offset, amount);

            if (parent > 0) {
                const postIds = await postService.core.getReplyIdsTo(parent);
                const posts = await postService.core.getPosts(postIds);
                return res.send(posts);
            }
            else {
                const posts = await postService.core.getAllPosts(getAll, offset, amount);
                return res.send(posts);
            }
        }
        catch (error) { 
            return next(error);
        }
    }

    public async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            // validate the existence of the user
            // const userId = payload.userId;
            // userService.core.doesUserExist(userId);
            
            // validate the authorization of the user via the authorization header
            if (!req.headers.authorization) {
                throw new ErrorException(ErrorCode.Unauthorized, 'Authorization header is missing.');
            }
            const authorization = req.headers.authorization;
            const userId = await userService.core.getUserIdFromAuthorization(authorization);
            // attach the authorized userId to the post payload.
            // this way only a request with proper authorization will translate into a post.
            const payload: PostPayload = {...req.body, userId}; 

            let result;

            if (payload.isReply) {
                result = await postService.core.createReply(payload);
            }
            else {
                result = await postService.core.createPost(payload);
            }

            return res.send(result);
        }
        catch (error) {
            return next(error);
        }
    }

    public async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = Number(req.params.post_id);
            await postService.core.deletePost(postId);
            return res.sendStatus(200);
        }
        catch (error) {
            return next(error);
        }
    }

    public async getUserPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.params.username;
            const posts = await postService.core.getUserPosts(username);
            return res.send(posts);
        }
        catch (error) {
            return next(error);
        }
    }
}

export default PostController;