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

    const filteredData = await prisma.income.findMany({
        where: queryFilters,
        include: {
            types: true
        },
        orderBy: {
            date: 'desc'
        }
    });

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