import {Request, Response, NextFunction } from "express";
import reactionsService from "../../services/reactions";
import userService from '../../services/users';

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
            const postId: number = Number(req.params.post_id);
            // make sure the user making the request is real
            userService.core.validateUser(reaction.userId);
            // need to determine if the given user has already created a reaction on this same post of the same type
            // TODO: implement this
            await reactionsService.core.createReaction(reaction, postId);
            return res.sendStatus(201); // correctly created.
        }
        catch (error) {
            return next(error);
        }
    }

    public async getPostReactionsCount(req: Request, res: Response, next: NextFunction) {
        try {
            const postId = Number(req.params.post_id);
            const counts = await reactionsService.core.getPostReactionCounts(postId);
            return res.send(counts);
        }
        catch (error) {
            return next(error);
        }
    }
}

export default ReactionController;