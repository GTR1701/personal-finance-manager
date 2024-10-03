"use client";
import { round } from '../lib/math';

type Props = {
	balance: number;
	expenses: number;
	income: number;
};

const TransactionSummary = async ({
	balance,
	expenses,
	income,
}: Readonly<Props>) => {
	return (
		<div className="m-20 grid grid-cols-3">
			<div className="mx-auto w-1/2 h-32 rounded-2xl p-5 text-xl font-semibold bg-[#282c34] shadow-lg">
				Wydatki: <br />
				<p className="pt-5 text-rose-500">{round(expenses, "up", 2)} zł</p>
			</div>
			<div className="mx-auto w-1/2 h-32 rounded-2xl p-5 text-xl font-semibold bg-[#282c34] shadow-lg">
				Aktywa:
				<p className="pt-5 text-blue-500">{round(balance, "up", 2)} zł</p>
			</div>
			<div className="mx-auto w-1/2 h-32 rounded-2xl p-5 text-xl font-semibold bg-[#282c34] shadow-lg">
				Przychód:
				<p className="pt-5 text-green-500">{round(income, "up", 2)} zł</p>
			</div>
		</div>
	);
};

export default TransactionSummary;
