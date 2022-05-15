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
    }
}

export default ReactionsRouter;