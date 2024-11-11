"use server"

import { prisma } from "@/prisma/prisma";

export default async function getUserCreationDate(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
        id: userId,
        },
        select: {
            createdAt: true
        }
    });

    return user?.createdAt.toDateString();
}