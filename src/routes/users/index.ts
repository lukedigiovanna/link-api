import { Router } from "express";
import RouteSource from '../../types/route-source.type';
import UserController from "../../controllers/users";

class UsersRouter implements RouteSource {
    public path = '/users';
    public router = Router({ mergeParams: true });
    public controller = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get("/", this.controller.allUsers);
        this.router.post("/", this.controller.createUser);
    }
}

export default UsersRouter;