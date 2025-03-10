"use client";
import TransactionSummary from "@/components/TransactionSummary";
import { getBalance } from "@/data/getBalance";
import {
	getCurrentMonthExpenses,
	getCurrentYearExpensesByMonth,
	getCurrentMonthExpensesByType,
	getAllMonthlyExpenses,
} from "@/data/getExpenses";
import { getCurrentMonthIncomes } from "@/data/getIncomes";
import { useUserStore } from "@/store/userStore";
import { getCookie } from "cookies-next";
import {
	Bar,
	BarChart,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useEffect, useState } from "react";

const Dashboard = () => {
	const user = getCookie("currentUser");
	const zustandUpdate = useUserStore((state) => state.setLoggedInUser);
	zustandUpdate(user);

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
	const [expenseByDay, setExpenseByDay] = useState<
		{ name: string; Wydatki: number }[]
	>([]);

	useEffect(() => {
		const getTransactionSummaries = async () => {
			setBalance(await getBalance(user?.valueOf() as string));
			setExpense(
				await getCurrentMonthExpenses(user?.valueOf() as string)
			);
			setIncome(await getCurrentMonthIncomes(user?.valueOf() as string));
			setExpenseByType(
				await getCurrentMonthExpensesByType(user?.valueOf() as string)
			);
			setExpenseByDay(
				await getAllMonthlyExpenses(user?.valueOf() as string)
			);
		};
		getTransactionSummaries();
	}, []);

	return (
		user && (
			<div className="">
				<h1 className="m-20 text-4xl font-bold">Podsumowanie</h1>
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
								{/* <LabelList dataKey={"name"} offset={5} position="outside" className="font-extralight" /> */}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</div>
					<div>
						<h1 className="mx-auto mb-5 text-4xl font-bold w-fit">
							Wydatki Według Miesiąca
						</h1>
						<ResponsiveContainer width="90%" height={500} className="mx-auto">
							<BarChart
								data={expenseByDay}
								className="mx-auto"
							>
								<XAxis dataKey="name" />
								<YAxis dataKey="Wydatki" />
								<Bar dataKey="Wydatki" fill="#1825ac" />
								<Tooltip />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		)
	);
};

export default Dashboard;
