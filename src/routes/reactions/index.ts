import { Router } from "express";
import RouteSource from '../../types/route-source.type';
import ReactionController from "../../controllers/reactions";

class ReactionsRouter implements RouteSource {
    public path = '/reactions';
    public router = Router({ mergeParams: true });
    public controller = new ReactionController();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get("/", this.controller.allReactions);
        this.router.post("/:post_id", this.controller.createReaction);
        this.router.get("/:post_id", this.controller.getPostReactions);
        this.router.get("/count/:post_id", this.controller.getPostReactionsCount);
    }
}

export default ReactionsRouter;