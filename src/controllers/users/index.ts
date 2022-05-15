import { Request, Response, NextFunction } from "express";

// this is where we will set up logic for when client reaches a particular endpoint related to the users

class UserController {
    public async allUsers(req: Request, res: Response, next: NextFunction) {
        try {
            // handle request to get list of all users and their IDs
            
        }
        catch (error) {
            return next(error);
        }
    }
}

export default UserController;