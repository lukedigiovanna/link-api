import { Request, Response, NextFunction } from "express";
import postService from "../../services/posts";
import { PostPayload } from "../../types/post.type";

class PostController {
    public async allPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await postService.core.getAllPosts();
            return res.send(posts);
        }
        catch (error) {
            return next(error);
        }
    }

    public async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: PostPayload = req.body;
            await postService.core.createPost(payload);
            return res.sendStatus(201);
        }
        catch (error) {
            return next(error);
        }
    }
}

export default PostController;