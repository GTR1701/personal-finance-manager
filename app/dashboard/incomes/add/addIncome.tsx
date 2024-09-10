"use client";

import { getCookie } from "cookies-next";
import { types } from "@prisma/client";
import AddIncomeForm from "@/components/AddIncomeForm";

type Props = {
	types: types[];
};

const addIncome = ({ types }: Readonly<Props>) => {
	const user = getCookie("currentUser");

	return (
		user && (
			<div className="">
				<h1 className="m-20 text-4xl font-bold">Dodaj Przychód</h1>
				<div id="wykresy"></div>
				<div className="mx-auto h-fit">
					<AddIncomeForm transactionTypes={types} />
				</div>
			</div>
		)
	);
};

export default addIncome;
