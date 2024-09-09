"use server"

import { prisma } from "@/prisma/prisma"
import { cache } from "react"

export const getAllExpenses = cache(async () => {
    const expenses = await prisma.expenses.findMany({
        orderBy: {
            date: 'desc'
        },
        include: {
            types: true
        },
    })

    const normalisedExpenses = expenses.map((expense) => {
        const month = expense.date.getMonth() + 1;
        const year = expense.date.getFullYear();
        const date = expense.date.getDate();
        const formattedDate = `${date}-${month}-${year}`
        return {
            id: expense.id,
            name: expense.name,
            type: expense.types.name,
            amount: expense.amount,
            date: formattedDate
        }
    })

    return normalisedExpenses
})