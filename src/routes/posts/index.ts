import { Router } from "express";
import RouteSource from "../../types/route-source.type";
import PostController from "../../controllers/posts";

class PostsRouter implements RouteSource {
    public path = '/posts';
    public router = Router({ mergeParams: true });
    public controller = new PostController();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get("/", this.controller.allPosts);
    }
}

export default PostsRouter;