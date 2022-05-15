import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const posts = await prisma.posts.findMany({
        where: {
            Users: {
                id: "1"
            }
        },
        select: {
            Users: true
        }
    });

    console.log(posts);
}

main();