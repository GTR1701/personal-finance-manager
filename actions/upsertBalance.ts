"use server"

import { prisma } from "@/prisma/prisma"

type UpsertBalanceArgs = {
    transaction: number,
    type: number,
    user: string,
}

export const upsertBalance = async ({ transaction, type, user }: UpsertBalanceArgs) => {
    const balance = await prisma.user.findFirst({
        where: {
            id: user
        },
        select: {
            balance: true
        }
    })


    if (!balance) {
        throw new Error("User not found")
    }

    switch (type) {
        case 1:
            await prisma.user.update({
                where: {
                    id: user
                },
                data: {
                    balance: balance.balance + transaction
                }
            })
            break;
        case 2:
            await prisma.user.update({
                where: {
                    id: user
                },
                data: {
                    balance: balance.balance - transaction
                }
            })
            break;
        default:
            break;
    }
}