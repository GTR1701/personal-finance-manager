export type NormalisedTransaction = {
    id: number;
    name: string;
    type: string;
    amount: number;
    date: string;
}

export type CreateTransaction = {
    name: string;
    type: string;
    amount: number;
    date: Date;
    userId: string;
}