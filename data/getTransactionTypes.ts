import { prisma } from "@/prisma/prisma";

export async function getAllTransactionTypes() {
    const types = await prisma.types.findMany({
        orderBy: {
            name: "asc"
        }
    });

    return types;
}

export async function getTransactionIdTypeByName(name: string) {
    const type = await prisma.types.findFirst({
        where: {
            name: name
        }
    });

    return type?.id;
}