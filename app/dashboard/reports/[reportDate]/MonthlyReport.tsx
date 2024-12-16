"use client";
import TransactionSummary from "@/components/TransactionSummary";
import { useUserStore } from "@/store/userStore";
import { getCookie } from "cookies-next";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { getMonthlyIncome, getMonthlyExpenses, getMonthlyExpensesByType, getMonthlyBalance } from "@/data/getMonthlyReport";

type Props = {
    year: number;
    month: number;
}

const MonthlyReport = ({year, month}: Readonly<Props>) => {
	const user = getCookie("currentUser");
	const zustandUpdate = useUserStore((state) => state.setLoggedInUser);
	zustandUpdate(user);

    const date = new Date(year, month - 1, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });

	const COLORS = [
		"#0088FE",
		"#00C49F",
		"#FFBB28",
		"#FF8042",
		"#32a852",
		"#d42f2f",
		"#7932a8",
		"#32a8a8",
		"#a83232",
		"#a832a8",
		"#a8a832",
		"#32a832",
	];

	const [balance, setBalance] = useState(0);
	const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);
	const [expenseByType, setExpenseByType] = useState<
		{ name: string; value: number }[]
	>([]);

	useEffect(() => {
		const getTransactionSummaries = async () => {
			setExpense(await getMonthlyExpenses(user?.valueOf() as string, year, month));
			setIncome(await getMonthlyIncome(user?.valueOf() as string, year, month));
			setExpenseByType(
				await getMonthlyExpensesByType(user?.valueOf() as string, year, month)
			);
			setBalance(await getMonthlyBalance(user?.valueOf() as string, year, month));
		};
		getTransactionSummaries();
	}, []);

	return (
		user && (
			<div className="">
				<h1 className="mt-5 ml-20 mb-0 text-4xl font-bold">Raport na Miesiąc {monthName.charAt(0).toUpperCase() + monthName.slice(1)}</h1>
				<div id="wykresy">
					<TransactionSummary
						balance={balance}
						expenses={expense}
						income={income}
					/>
				</div>
				<div className="mx-auto h-fit grid auto-rows-auto">
					<div>
						<h1 className="mx-auto mb-5 text-4xl font-bold w-fit">
							Wydatki według typu
						</h1>
						<PieChart width={1200} height={900} className="mx-auto">
							<Pie
								dataKey="value"
								data={expenseByType}
								cx="50%"
								cy="50%"
								innerRadius={200}
								outerRadius={400}
								label
								legendType="circle"
							>
								{expenseByType.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</div>
				</div>
			</div>
		)
	);
};

export default MonthlyReport;