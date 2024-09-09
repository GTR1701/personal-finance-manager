import * as z from 'zod';

export const LoginSchema = z.object({
    username: z.string().min(1, {message: 'Username is required'}).max(50),
    password: z.string().min(1, {message: 'Password is required'})
})

export const FetchExpensesFormSchema = z.object({
    name: z.string(),
    type: z.string(),
    date: z.object({
        from: z.date(),
        to: z.date()
    }, {message: 'Podaj przedział dat'})
})

export const TransactionDataTableSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    amount: z.number(),
    date: z.date()
})