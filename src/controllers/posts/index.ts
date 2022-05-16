import { Request, Response, NextFunction } from "express";
import postService from "../../services/posts";
import userService from '../../services/users';
import { PostPayload } from "../../types/post.type";

class PostController {
    public async allPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const getAll = Boolean(req.query.all);
            const posts = await postService.core.getAllPosts(getAll);
            return res.send(posts);
        }
        catch (error) {
            return next(error);
        }
    }

    public async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: PostPayload = req.body;
            // validate the existence of the user
            const userId = payload.userId;
            userService.core.validateUser(userId);

            console.log(payload);

            if (payload.isReply) {
                await postService.core.createReply(payload);
            }
            else {
                await postService.core.createPost(payload);
            }

            return res.sendStatus(201);
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