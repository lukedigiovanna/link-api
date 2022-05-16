import {Request, Response, NextFunction } from "express";
import reactionsService from "../../services/reactions";

class ReactionController {
    public async allReactions(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("Reactions");
            const reactions = await reactionsService.core.getAllReactions();
            return res.send(reactions);
        }
        catch (error) {
            return next(error);
        }
    }

    public async getPostReactions(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = Number(req.params.post_id);
            const reactions = await reactionsService.core.getPostReactions(postId);
            return res.send(reactions);
        }
        catch (error) {
            return next(error);
        }
    }

    public async createReaction(req: Request, res: Response, next: NextFunction) {
        try {
            const reaction = req.body;
            const createdReaction = await reactionsService.core.createReaction(reaction);
            return res.send(createdReaction);
        }
        catch (error) {
            return next(error);
        }
    }
}

export default ReactionController;