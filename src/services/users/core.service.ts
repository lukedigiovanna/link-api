import { PrismaClient, Users } from "@prisma/client";
import { CreateUserPayload } from '../../types/user.type';    
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

class CoreUserService {
    private prisma: PrismaClient;
    private firestore: Firestore;
    private auth: Auth;

    constructor() {
        this.prisma = new PrismaClient();
        this.firestore = getFirestore();
        this.auth = getAuth();
    }

    async getUsers(): Promise<Users[]> {
        const users = await this.prisma.users.findMany({
            // all
        });

        return users;
    }

    async createUser(user: CreateUserPayload): Promise<string> {
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

        const newUser = await this.prisma.users.create({
            data: {
                id: firebaseUser.uid
            }
        });

        return newUser.id;
    }
}

export default new CoreUserService();