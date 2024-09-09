"use client";

import DataTable from "@/components/DataTable";
import { NormalisedTransaction } from "@/types/types";
import { getCookie } from "cookies-next";
import { types } from "@prisma/client";
import { useDataTableStore } from "@/store/useDataTableStore";
import { useEffect } from "react";
import FetchIncomesForm from "@/components/FetchIncomesForm";
import AddExpenseForm from "@/components/AddExpenseForm";

type Props = {
	types: types[];
};

const AddExpense = ({ types }: Readonly<Props>) => {
	const user = getCookie("currentUser");
	const { dataTableData, setDataTableStore } = useDataTableStore();

	return (
		user && (
			<div className="">
				<h1 className="m-20 text-4xl font-bold">Dodaj Wydatek</h1>
				<div id="wykresy"></div>
				<div className="mx-auto h-fit">
                    <AddExpenseForm transactionTypes={types} />
				</div>
			</div>
		)
	);
};

export default AddExpense;
