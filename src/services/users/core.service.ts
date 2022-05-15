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
            throw new ErrorException(ErrorCode.Conflict, {"message": `User ${user.name} already exists`});
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

    async getUser(username: string): Promise<UserData> {
        // get the user id of the username
        const user = await this.prisma.user.findFirst({
            where: {
                username: username
            }
        });
        
        if (!user) { 
            throw new ErrorException(ErrorCode.NotFound, {"message": `User ${username} does not exist`});
        }
        
        const userId = user.id;
        const userDoc = this.firestore.collection("users").doc(userId);
        const info = await userDoc.get();
        const infoData = info.data();

        if (!infoData) { // will not receive this data if there is no user associated with the ID
            throw new ErrorException(ErrorCode.NotFound, {"message": `User ${userId} not found`});
        }

        console.log("Info Data", infoData);

        // convert firestore data to user data
        if (infoData.createdAt) {
            infoData.createdAt = infoData.createdAt.toDate();
        }
        else {
            const newDate = new Date();
            userDoc.update({ createdAt: newDate });
            infoData.createdAt = new Date();
        }

        return {...infoData};
    }
}

export default new CoreUserService();