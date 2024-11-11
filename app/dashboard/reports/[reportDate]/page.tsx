import Reports from "./MonthlyReport";

type Props = {
	params: { reportDate: string };
};

export default function Page({ params }: Props) {
	const reportDate = params.reportDate;
	const date = new Date(reportDate);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;

	return <Reports year={year} month={month} />;
}
