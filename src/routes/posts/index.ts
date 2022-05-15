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
        this.router.post("/", this.controller.createPost);
        this.router.delete("/:post_id", this.controller.deletePost);
        this.router.get("/:username", this.controller.getUserPosts);
    }
}

export default PostsRouter;