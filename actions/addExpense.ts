"use server"
import { getTransactionIdTypeByName } from "@/data/getTransactionTypes";
import { prisma } from "@/prisma/prisma";
import { CreateTransaction } from "@/types/types";

export default async function createExpense(newExpense: CreateTransaction) {
    const typeId = await getTransactionIdTypeByName(newExpense.type)

    await prisma.expenses.create({
        data: {
            name: newExpense.name,
            amount: newExpense.amount,
            typeId,
            date: newExpense.date,
            userId: newExpense.userId
        },
    });
}