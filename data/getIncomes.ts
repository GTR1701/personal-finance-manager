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