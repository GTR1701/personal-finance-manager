"use server"

import { getTransactionIdTypeByName } from "@/data/getTransactionTypes";
import { prisma } from "@/prisma/prisma";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

type FilterIncomes = {
    name: string;
    type: string;
    date: {
        from: Date;
        to: Date;
    };
}

export async function FilterIncomes({ name, type, date}: FilterIncomes) {
    const queryFilters = {
        name,
        type
    }
    const dateFrom = date.from;
    const dateTo = date.to;

    const dateFilter = date.from === date.to ? date.from : {
        gte: dateFrom,
        lte: dateTo
    }

    const typeId = await getTransactionIdTypeByName(type);

    const filteredData = await prisma.income.findMany({
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

    const normalisedFilteredData = filteredData.map((income) => {
        const formattedDate = format(income.date, "dd-MM-yyyy");

        return {
            id: income.id,
            name: income.name,
            type: income.types.name,
            amount: income.amount,
            date: formattedDate
        }
    })

    revalidatePath("/dashboard/incomes");

    return normalisedFilteredData;
}