"use server"
import { round } from "@/lib/math";
import { prisma } from "@/prisma/prisma";


export async function getMonthlyExpenses(user: string, year: number, month: number) {
    const expenses = await prisma.expenses.findMany({
        where: {
            userId: user,
            AND: {
                date: {
                    gte: new Date(year, month - 1, 1, 2),
                    lt: new Date(year, month, 1, 0, 59, 59, 999)
                }
            }
        },
        select: {
            amount: true
        }
    })

    if(!expenses) {
        return 0
    }

    return expenses.reduce((acc, curr) => acc + curr.amount, 0)
}

export async function getMonthlyIncome(user: string, year: number, month: number) {
    const incomes = await prisma.income.findMany({
        where: {
            userId: user,
            AND: {
                date: {
                    gte: new Date(year, month - 1, 1, 2),
                    lt: new Date(year, month, 1, 0, 59, 59, 999)
                }
            }
        },
        select: {
            amount: true
        }
    })

    if(!incomes) {
        return 0
    }

    return incomes.reduce((acc, curr) => acc + curr.amount, 0)
}

export async function getMonthlyExpensesByType(user: string, year: number, month: number) {
    const expenses = await prisma.expenses.findMany({
        where: {
            userId: user,
            AND: {
                date: {
                    gte: new Date(year, month - 1, 1, 2),
                    lt: new Date(year, month, 1, 0, 59, 59, 999)
                }
            }
        },
        select: {
            amount: true,
            types: true
        }
    })

    if(!expenses) {
        return []
    }

    // console.log(new Date(year, month - 1, 1, 2), new Date(year, month, 1, 0, 59, 59, 999))

    const expensesByType = Object.entries(
        expenses.reduce((acc, expense) => {
            if (!acc[expense.types.name]) {
                acc[expense.types.name] = 0;
            }
            acc[expense.types.name] += expense.amount;
            return acc;
        }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, 'value': round(value, "up", 2) }));

    return expensesByType
}

export async function getMonthlyBalance(user: string, year: number, month: number) {
    const balance = await prisma.monthlyBalance.findFirst({
        where: {
            userId: user,
            AND: {
                month: {
                    gte: new Date(year, month - 1, 1, 2),
                    lt: new Date(year, month, 1, 0, 59, 59, 999)
                }
            }
        },
        select: {
            balance: true
        }
    })

    if(!balance) {
        return 0
    }

    return balance.balance
}