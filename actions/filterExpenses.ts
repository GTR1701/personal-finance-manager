"use server"

import { getTransactionIdTypeByName } from "@/data/getTransactionTypes";
import { prisma } from "@/prisma/prisma";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

type FilterExpenses = {
    name: string;
    type: string;
    date: {
        from: Date;
        to: Date;
    };
}

export async function filterExpenses({ name, type, date }: FilterExpenses) {
    console.log(name, type, date);
    const queryFilters: any = {};
    
    if (name) {
        queryFilters.name = {
            contains: name
        };
    }

    if (type) {
        const typeId = await getTransactionIdTypeByName(type);
        queryFilters.typeId = {
            equals: typeId
        };
    }

    if (date) {
        const dateFrom = date.from;
        const dateTo = date.to;
        queryFilters.date = dateFrom === dateTo ? dateFrom : {
            gte: new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate(), 2),
            lte: new Date(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate() + 1, 2)
        };
    }

    console.log(queryFilters);

    const filteredData = await prisma.expenses.findMany({
        where: queryFilters,
        include: {
            types: true
        },
        orderBy: {
            date: 'desc'
        }
    });

    const normalisedFilteredData = filteredData.map((expense) => {
        const formattedDate = format(expense.date, "dd-MM-yyyy");

        return {
            id: expense.id,
            name: expense.name,
            type: expense.types.name,
            amount: expense.amount,
            date: formattedDate
        };
    });

    revalidatePath("/dashboard/expenses");

    return normalisedFilteredData;
}