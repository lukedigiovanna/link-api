import { Request, Response, NextFunction } from "express";
import postService from "../../services/posts";

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
            // const post = await postService.core.createPost(req.body);
            // return res.send(post);
        }
        catch (error) {
            return next(error);
        }
    }
}

export default PostController;