"use server"

import AddExpenseForm from "@/components/AddExpenseForm";
import { getAllTransactionTypes } from "@/data/getTransactionTypes";
import { getCookie } from "cookies-next";
import AddExpense from "./AddExpense";

const Page = async () => {
	const types = await getAllTransactionTypes();

	return <AddExpense types={types} />
}
 
export default Page;