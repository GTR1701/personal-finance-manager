"use server"

import { prisma } from "@/prisma/prisma"
import { format } from "date-fns"
import { cache } from "react"

export const getAllIncomes = cache(async () => {
    const incomes = await prisma.income.findMany({
        orderBy: {
            date: 'desc'
        },
        include: {
            types: true
        },
    })

    const normalisedIncomes = incomes.map((income) => {
        const formattedDate = format(income.date, "dd-MM-yyyy");
        
        return {
            id: income.id,
            name: income.name,
            type: income.types.name,
            amount: income.amount,
            date: formattedDate
        }
    })

    return normalisedIncomes
})

export const getCurrentMonthIncomes = cache(async (user: string) => {
    const incomes = await prisma.income.findMany({
        where: {
            userId: user,
            date: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            }
        }
    })

    const sum = incomes.reduce((acc, income) => acc + income.amount, 0)

    return sum
})