"use server";
import { getAllTransactionTypes } from "@/data/getTransactionTypes";
import Incomes from "./Incomes";
import { getAllIncomes } from "@/data/getIncomes";

const Dashboard = async () => {
	const incomes = await getAllIncomes();
	const types = await getAllTransactionTypes();

	return <Incomes data={incomes} types={types} />;
};

export default Dashboard;
