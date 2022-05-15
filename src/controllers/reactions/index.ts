import {Request, Response, NextFunction } from "express";
import reactionsService from "../../services/reactions";

class ReactionController {
    public async allReactions(req: Request, res: Response, next: NextFunction) {
        try {
            const reactions = await reactionsService.core.getAllReactions();
            return res.send(reactions);
        }
        catch (error) {
            return next(error);
        }
    }
}

export default ReactionController;