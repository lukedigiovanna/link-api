import { Request, Response, NextFunction } from "express";
import usersService from '../../services/users';
import { CreateUserPayload, UserData } from "../../types/user.type";

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
            const userData: CreateUserPayload = req.body;
            // if using zod, we could ensure that the given userData follows the correct schema
            // CreateUserPayload.parse(userData); 
            // UserPayloadSchema.parse(...)
            await usersService.core.createUser(userData);
            return res.send({"message": "User created successfully"}); // send the UID as proof of new user.
        }
        catch (error) {
            return next(error);
        }
    }

    public async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            // handle request to get a user by ID
            const userId = req.params.userId;
            // const byId = req.query.byId === 'true';
            // const user: UserData = await (byId ? usersService.core.getUserById : usersService.core.getUserByUsername)(username);
            const user: UserData = await usersService.core.getUserById(userId);
            return res.send(user);
        }
        catch (error) {
            return next(error);
        }
    }
}

export default UserController;