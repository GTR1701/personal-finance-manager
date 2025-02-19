"use server"

import { prisma } from "@/prisma/prisma"
import { revalidatePath } from "next/cache"

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

    let thisMonthBalance = await prisma.monthlyBalance.findFirst({
        where: {
            userId: user,
            month: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 2),
                lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 999)
            }
        }
    })

    console.log(thisMonthBalance)

    if (!balance) {
        throw new Error("User not found")
    }

    if (!thisMonthBalance) {
        thisMonthBalance = await prisma.monthlyBalance.create({
            data: {
                balance: balance.balance,
                month: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 2),
                userId: user
            }
        })
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

            await prisma.monthlyBalance.update({
                where: {
                    id: thisMonthBalance.id
                },
                data: {
                    balance: thisMonthBalance.balance + transaction
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

            await prisma.monthlyBalance.update({
                where: {
                    id: thisMonthBalance.id
                },
                data: {
                    balance: thisMonthBalance.balance - transaction
                }
            })
            break;
        default:
            break;
    }

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/expenses")
    revalidatePath("/dashboard/expenses/new")
    revalidatePath("/dashboard/incomes")
    revalidatePath("/dashboard/incomes/new")
}