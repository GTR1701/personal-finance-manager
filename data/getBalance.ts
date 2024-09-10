"use server"

import { prisma } from '@/prisma/prisma';
import { cache } from 'react';

export const getBalance = cache(async (user: string) => {
    const balance = await prisma.user.findFirst({
        where: {
            id: user
        },
        select: {
            balance: true
        }
    })

    if(!balance) {
        return 0
    }

    return balance.balance
})