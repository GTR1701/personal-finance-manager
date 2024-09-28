"use server"
import { getTransactionIdTypeByName } from "@/data/getTransactionTypes";
import { prisma } from "@/prisma/prisma";
import { CreateTransaction } from "@/types/types";
import { upsertBalance } from "./upsertBalance";
import { revalidatePath } from "next/cache";

export default async function createIncome(newIncome: CreateTransaction, user: string) {
    const typeId = await getTransactionIdTypeByName(newIncome.type)

    await prisma.income.create({
        data: {
            name: newIncome.name,
            amount: newIncome.amount,
            typeId,
            date: newIncome.date,
            userId: newIncome.userId
        },
    });

    await upsertBalance({
        transaction: newIncome.amount,
        type: 1,
        user: user,
    })

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/expenses")
    revalidatePath("/dashboard/expenses/new")
    revalidatePath("/dashboard/incomes")
    revalidatePath("/dashboard/incomes/new")

}