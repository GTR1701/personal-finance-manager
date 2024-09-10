"use client";

import DataTable from "@/components/DataTable";
import FetchExpensesForm from "@/components/FetchExpensesForm";
import { NormalisedTransaction } from "@/types/types";
import { getCookie } from "cookies-next";
import { types } from "@prisma/client";
import { useDataTableStore } from "../../../store/useDataTableStore";
import { useEffect, useState } from "react";
import TransactionSummary from "@/components/TransactionSummary";
import { getBalance } from "@/data/getBalance";
import { getCurrentMonthExpenses } from "@/data/getExpenses";
import { getCurrentMonthIncomes } from "@/data/getIncomes";

type Props = {
	data: NormalisedTransaction[];
	types: types[];
};

const Expenses = ({ data, types }: Readonly<Props>) => {
	const user = getCookie("currentUser");
	const { dataTableData, setDataTableStore } = useDataTableStore();

	const [balance, setBalance] = useState(0)
	const [income, setIncome] = useState(0)
	const [expense, setExpense] = useState(0)

	useEffect(() => {
		setDataTableStore(data);
		const getTransactionSummaries = async () => {
			setBalance(await getBalance(user?.valueOf() as string))
			setExpense(await getCurrentMonthExpenses(user?.valueOf() as string))
			setIncome(await getCurrentMonthIncomes(user?.valueOf() as string))
		}
		getTransactionSummaries()
	}, []);

	return (
		user && (
			<div className="">
				<h1 className="m-20 text-4xl font-bold">Wydatki</h1>
				<div id="wykresy">
				<TransactionSummary balance={balance} expenses={expense} income={income} />
				</div>
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
