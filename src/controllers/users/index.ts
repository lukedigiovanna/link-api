import { Request, Response, NextFunction } from "express";
import usersService from '../../services/users';

// this is where we will set up logic for when client reaches a particular endpoint related to the users

class UserController {
    public async allUsers(req: Request, res: Response, next: NextFunction) {
        try {
            // handle request to get list of all users and their IDs
            const users = await usersService.core.getUsers();
            return res.send(users);
        }
        catch (error) {
            return next(error);
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            // handle request to create a new user
            const user = await usersService.core.createUser(req.body);
            return res.send(user);
        }
        catch (error) {
            return next(error);
        }
    }
    
}

export default UserController;