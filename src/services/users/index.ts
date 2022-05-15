import { PrismaClient, Users } from "@prisma/client";

class CoreUserService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getUsers(): Promise<Users[]> {
        const users = await this.prisma.users.findMany({
            // all
        });

        return users;
    }
}

export default new CoreUserService();