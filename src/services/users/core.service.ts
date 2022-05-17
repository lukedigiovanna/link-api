import { PrismaClient, User } from "@prisma/client";
import { CreateUserPayload, UserData } from '../../types/user.type';    
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import { ErrorException, ErrorCode } from '../../types/error.type';

class CoreUserService {
    private prisma: PrismaClient;
    private firestore: Firestore;
    private auth: Auth;

    constructor() {
        this.prisma = new PrismaClient();
        this.firestore = getFirestore();
        this.auth = getAuth();
    }



    async getUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            // all
        });

        return users;
    }

    async createUser(user: CreateUserPayload): Promise<string> {
        // first check if username already exists
        // query all users for a username.
        const users = await this.prisma.user.findFirst({
            where: {
                username: user.name
            }
        });

        if (users) {
            throw new ErrorException(ErrorCode.Conflict, `User ${user.name} already exists`);
        }

        // first create a user in firebase
        const firebaseUser = await this.auth.createUser({
            email: user.email,
            emailVerified: false,
            password: user.password
        });

        // add the user data to the firestore database
        const firestoreUser = await this.firestore.collection('users').doc(firebaseUser.uid).set({
            name: user.name,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatarURL: user.avatarURL,
            createdAt: new Date()
        });

        const newUser = await this.prisma.user.create({
            data: {
                id: firebaseUser.uid,
                username: user.name
            }
        });

        return newUser.id;
    }

    async doesUserExist(userId: string): Promise<string> {
        // get the user id of the username
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        if (!user) { 
            throw new ErrorException(ErrorCode.NotFound, `User ${userId} does not exist`);
        }
        
        return user.id;
    }

    async getUserIdFromAuthorization(authorization: string): Promise<string> {
        // remove Bearer from authorization string
        const token = authorization.replace("Bearer ", "");
        try {
            const user = await this.auth.verifyIdToken(token);
            return user.uid;
        } catch (error) {
            throw new ErrorException(ErrorCode.Unauthorized, "Invalid authorization");
        }
    }

    async getUser(username: string): Promise<UserData> {
        // get the user id of the username
        const user = await this.prisma.user.findFirst({
            where: {
                username: username
            }
        });
        
        if (!user) { 
            throw new ErrorException(ErrorCode.NotFound, `User ${username} does not exist`);
        }
        
        const userId = user.id;
        const userDoc = this.firestore.collection("users").doc(userId);
        const info = await userDoc.get();
        const infoData = info.data();

        if (!infoData) { // will not receive this data if there is no user associated with the ID
            throw new ErrorException(ErrorCode.NotFound, `User ${userId} not found`);
        }
        
        // convert firestore data to user data
        if (infoData.createdAt) {
            infoData.createdAt = infoData.createdAt.toDate();
        }
        else {
            const newDate = new Date();
            userDoc.update({ createdAt: newDate });
            infoData.createdAt = new Date();
        }

        return {
            name: infoData.name,
            email: infoData.email,
            firstName: infoData.firstName,
            lastName: infoData.lastName,
            avatarURL: infoData.avatarURL,
            createdAt: infoData.createdAt 
        };
    }
}

export default new CoreUserService();