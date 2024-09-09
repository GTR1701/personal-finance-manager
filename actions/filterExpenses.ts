"use server"

import { getTransactionIdTypeByName } from "@/data/getTransactionTypes";
import { prisma } from "@/prisma/prisma";
import { format } from "date-fns";

type FilterExpenses = {
    name: string;
    type: string;
    date: {
        from: Date;
        to: Date;
    };
}

export async function filterExpenses({ name, type, date}: FilterExpenses) {
    const queryFilters = {
        name,
        type
    }
    // format(date.from, "yyyy-MM-dd")
    // format(date.to, "yyyy-MM-dd")
    const dateFrom = date.from;
    const dateTo = date.to;

    const dateFilter = date.from === date.to ? date.from : {
        gte: dateFrom,
        lte: dateTo
    }

    const typeId = await getTransactionIdTypeByName(type);

    const filteredData = await prisma.expenses.findMany({
        where: {
            name: {
                contains: queryFilters.name
            },
            typeId: {
                equals: typeId
            },
            date: dateFilter
        },
        include: {
            types: true
        }
    })

    const normalisedFilteredData = filteredData.map((expense) => {
        const formattedDate = format(expense.date, "dd-MM-yyyy");

        return {
            id: expense.id,
            name: expense.name,
            type: expense.types.name,
            amount: expense.amount,
            date: formattedDate
        }
    })

    console.log(normalisedFilteredData);

    return normalisedFilteredData;
}