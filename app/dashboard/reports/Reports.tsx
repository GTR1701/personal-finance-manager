"use client";
import getUserCreationDate from "@/data/getUserCreationDate";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Reports() {
	const user = getCookie("currentUser");
	const [startingDate, setStartingDate] = useState<Date>();
    const [currentDate] = useState(new Date());
	const [monthYearArray, setMonthYearArray] = useState<
		{ year: number; month: number }[]
	>([]);

	useEffect(() => {
		const getUser = async () => {
			setStartingDate(
                // @ts-ignore
				new Date(await getUserCreationDate(user?.valueOf() as string))
			);
		};
		if (user) {
			getUser();
		}
	}, []);

	const startingDateYear = startingDate?.getFullYear();
	const startingDateMonth = startingDate?.getMonth();
	const currentDateYear = currentDate.getFullYear();
	const currentDateMonth = currentDate.getMonth();

	function createMonthYearObjectArray() {
		const monthYearArray = [];
		let year = startingDateYear || currentDateYear;
		let month = startingDateMonth || currentDateMonth;
		while (
			year < currentDateYear ||
			(year === currentDateYear && month < currentDateMonth)
		) {
			monthYearArray.push({ year, month });
			month++;
			if (month === 12) {
				month = 0;
				year++;
			}
		}
		return monthYearArray;
	}

	useEffect(() => {
		if (startingDate) {
			setMonthYearArray(createMonthYearObjectArray());
		}
	}, [startingDate]);

	return (
		<>
			<h1 className="m-20 text-4xl font-bold">Raporty</h1>
			<div>
				{monthYearArray.map((monthYear, index) => {
					const date = new Date(
						monthYear.year,
						monthYear.month,
						1
					);
					const monthName = date.toLocaleString("default", {
						month: "long",
					});
					return (
						<Link
							key={index}
							href={`/dashboard/reports/${monthYear.year}-${monthYear.month + 1}`}
						>
							<div className="bg-[#282c34] w-[90%] mx-auto my-10 p-8 rounded-3xl">
								<h1 className="text-3xl font-bold">
									Raport na Miesiąc {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
								</h1>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}
