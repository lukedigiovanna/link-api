import {Request, Response, NextFunction } from "express";
import reactionsService from "../../services/reactions";
import userService from '../../services/users';
import { ErrorCode, ErrorException } from "../../types/error.type";
import { ReactionPayload } from "../../types/reaction.type";

class ReactionController {
    public async allReactions(req: Request, res: Response, next: NextFunction) {
        // try {
        //     const reactions = await reactionsService.core.getAllReactions();
        //     return res.send(reactions);
        // }
        // catch (error) {
        //     return next(error);
        // }
        try {
            // extract the user ID from authorization
            if (!req.headers.authorization) {
                throw new ErrorException(ErrorCode.Unauthorized, 'Authorization header is missing.');
            }
            const authorization = req.headers.authorization;
            const userId: string = await userService.core.getUserIdFromAuthorization(authorization);
            console.log(userId);
            const reactions = await reactionsService.core.getAllUserReactions(userId);
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
            if (!req.headers.authorization) {
                throw new ErrorException(ErrorCode.Unauthorized, 'Authorization header is missing.');
            }

            const authorization = req.headers.authorization;
            const userId = await userService.core.getUserIdFromAuthorization(authorization);
            const payload: ReactionPayload = {...req.body, userId};
            const postId: number = Number(req.params.post_id);

            // need to determine if the given user has already created a reaction on this same post of the same type
            // TODO: implement this
            const existingReaction = await reactionsService.core.hasReacted(postId, userId, payload.reaction);
            if (existingReaction) {
                throw new ErrorException(ErrorCode.BadRequest, `User ${userId} has already reacted to post ${postId} with ${payload.reaction}`);
            }

            const reaction = await reactionsService.core.createReaction(payload, postId);
            return res.send(reaction); // correctly created.
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