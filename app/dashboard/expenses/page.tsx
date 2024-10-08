"use server";
import { getAllExpenses } from "@/data/getExpenses";
import Expenses from "./Expenses";
import { getAllTransactionTypes } from "@/data/getTransactionTypes";

const Page = async () => {
	const expenses = await getAllExpenses();
	const types = await getAllTransactionTypes();

	return <Expenses data={expenses} types={types} />;
};

export default Page;
