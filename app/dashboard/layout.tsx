import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	ArrowRight,
	Calculator,
	Euro,
	LayoutDashboard,
	Sigma,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { BounceLoader } from "react-spinners";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="grid auto-cols-max grid-flow-col gap-2 h-[100vh]">
			<div className="bg-[#282c34] w-[300px] h-[100vh] overflow-y-auto">
				<div className="flex flex-row gap-2 w-fit mx-auto cursor-default selection:bg-none">
					<Calculator className="my-4 w-8 h-8 antialiased" />
					<h1 className="text-xl font-bold text-white w-fit pt-5">
						Finance Manager
					</h1>
				</div>
				<Link href="/dashboard">
					<div className="flex flex-row gap-2 w-fit ml-8 selection:bg-none hover:text-primary transition">
						<LayoutDashboard className="my-4 w-8 h-8 antialiased" />
						<h1 className="text-xl font-bold w-fit pt-5">
							Podsumowanie
						</h1>
						<ArrowRight className="my-4 w-8 h-8 antialiased" />
					</div>
				</Link>
				<Accordion type="multiple" className="w-4/5 mx-auto">
					<AccordionItem value="Expenses" className="border-b-0">
						<AccordionTrigger className="text-xl font-bold">
							Wydatki
						</AccordionTrigger>
						<AccordionContent>
							<Link href="/dashboard/expenses">
								<div className="flex flex-row gap-2 w-fit ml-8 selection:bg-none hover:text-primary transition">
									<Sigma className="my-4 w-5 h-5 antialiased" />
									<h1 className="text-md font-bold w-fit pt-4">
										Wszystkie wydatki
									</h1>
									<ArrowRight className="my-4 w-5 h-5 antialiased" />
								</div>
							</Link>
							<Link href="/dashboard/expenses/add">
								<div className="flex flex-row gap-2 w-fit ml-8 selection:bg-none hover:text-primary transition">
									<Euro className="my-4 w-5 h-5 antialiased" />
									<h1 className="text-md font-bold w-fit pt-4">
										Nowy wydatek
									</h1>
									<ArrowRight className="my-4 w-5 h-5 antialiased" />
								</div>
							</Link>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
			<div className="w-[calc(100vw-308px)]">
				<Suspense
					fallback={<BounceLoader color="#0d0df2" size={150} />}
				>
					{children}
				</Suspense>
			</div>
		</div>
	);
}
