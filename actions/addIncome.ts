"use server"
import { getTransactionIdTypeByName } from "@/data/getTransactionTypes";
import { prisma } from "@/prisma/prisma";
import { CreateTransaction, NormalisedTransaction } from "@/types/types";

export default async function createIncome(newIncome: CreateTransaction) {
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
}