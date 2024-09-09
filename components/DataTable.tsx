"use client"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { NormalisedTransaction } from "@/types/types";

type Props = {
	data: NormalisedTransaction[];
};

const DataTable = ({ data }: Readonly<Props>) => {
	return (
		<Table className="w-[95%] mx-auto">
			<TableHeader>
				<TableRow>
					<TableHead>Tytuł</TableHead>
					<TableHead>Typ</TableHead>
					<TableHead>Kwota</TableHead>
					<TableHead>Data</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((transaction) => (
					<TableRow key={transaction.id}>
						<TableCell>{transaction.name}</TableCell>
						<TableCell>{transaction.type}</TableCell>
						<TableCell>{transaction.amount}</TableCell>
						<TableCell>{transaction.date}</TableCell>
					</TableRow>
				))}
				<TableRow>
					<TableCell></TableCell>
					<TableCell></TableCell>
					<TableCell></TableCell>
					<TableCell></TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

export default DataTable;
