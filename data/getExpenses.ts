"use server"

import { round } from "@/lib/math"
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

export const getCurrentMonthExpenses = cache(async (user: string) => {
    const expenses = await prisma.expenses.findMany({
        where: {
            userId: user,
            date: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            }
        }
    })

    const sum = expenses.reduce((acc, expense) => acc + expense.amount, 0)

    return sum
})

export const getCurrentMonthExpensesByType = cache(async (user: string) => {
    const expenses = await prisma.expenses.findMany({
        where: {
            userId: user,
            date: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            }
        },
        include: {
            types: true
        }
    })

    if (!expenses) {
        return []
    }

    const sum = Object.entries(
        expenses.reduce((acc, expense) => {
            if (!acc[expense.types.name]) {
                acc[expense.types.name] = 0;
            }
            acc[expense.types.name] += expense.amount;
            return acc;
        }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));

    return sum
})

export const getCurrentMonthExpensesByDay = cache(async (user: string) => {
    const expenses = await prisma.expenses.findMany({
        where: {
            userId: user,
            date: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            }
        }
    })

    const sum = Object.entries(
        expenses.reduce((acc, expense) => {
            if (!acc[expense.date.getDate()]) {
                acc[expense.date.getDate()] = 0;
            }
            acc[expense.date.getDate()] += expense.amount;
            return acc;
        }, {} as Record<number, number>)
    ).map(([name, Wydatki]) => ({ name, 'Wydatki': round(Wydatki, "up", 2) }));

    return sum
})