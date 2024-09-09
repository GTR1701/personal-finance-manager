"use server";

import { getAllTransactionTypes } from "@/data/getTransactionTypes";
import AddIncome from "./addIncome";

const Page = async () => {
	const types = await getAllTransactionTypes();

	return <AddIncome types={types} />;
};

export default Page;
