"use client";

import DataTable from "@/components/DataTable";
import FetchExpensesForm from "@/components/FetchExpensesForm";
import { NormalisedTransaction } from "@/types/types";
import { getCookie } from "cookies-next";
import { types } from "@prisma/client";
import { useDataTableStore } from "../../../store/useDataTableStore";
import { useEffect } from "react";

type Props = {
	data: NormalisedTransaction[];
	types: types[];
};

const Expenses = ({ data, types }: Readonly<Props>) => {
	const user = getCookie("currentUser");
	const { dataTableData, setDataTableStore } = useDataTableStore();

	useEffect(() => {
		setDataTableStore(data);
	}, []);

	return (
		user && (
			<div className="">
				<h1 className="m-20 text-4xl font-bold">Wydatki</h1>
				<div id="wykresy"></div>
				<div className="mx-auto h-fit">
					<h1 className="text-2xl font-semibold mx-20">Filtry</h1>
					<FetchExpensesForm transactionTypes={types} />
					<DataTable data={dataTableData} />
				</div>
			</div>
		)
	);
};

export default Expenses;
