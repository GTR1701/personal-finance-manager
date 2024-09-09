"use client";

import { FetchExpensesFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { Filter } from "lucide-react";
import { types } from "@prisma/client";
import { filterExpenses } from "@/actions/filterExpenses";
import { useDataTableStore } from "@/store/useDataTableStore";
import { useState } from "react";

type FetchExpensesFormProps = {
	transactionTypes: types[];
};

const FetchExpensesForm = ({transactionTypes}: Readonly<FetchExpensesFormProps>) => {
	const form = useForm<z.infer<typeof FetchExpensesFormSchema>>({
		resolver: zodResolver(FetchExpensesFormSchema),
		defaultValues: {
			name: "",
			type: "",
			date: {
                from: undefined,
                to: undefined
            },
		},
	});

	const [open, setOpen] = useState(false)

	const { setDataTableStore } = useDataTableStore();

	const onSubmit = async (data: z.infer<typeof FetchExpensesFormSchema>) => {
		const filteredResponse = await filterExpenses(data);
		setDataTableStore(filteredResponse);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				method="post"
				className="mt-8"
			>
				<div className="flex flex-row gap-2 justify-center">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="w-1/3">
							<FormControl>
								<Input
									placeholder="Tytuł"
									type="text"
									className=" mx-10"
									{...field}
								/>
							</FormControl>
							<FormMessage className="w-[80%] mx-auto" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-[200px] justify-between ml-28",
												!field.value &&
													"text-muted-foreground"
											)}
										>
											{field.value
												? transactionTypes.find(
														(framework) =>
															framework.name ===
															field.value
												  )?.name
												: "Typ transakcji"}
											<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput
											placeholder="Wyszukaj typ..."
											className="h-9"
										/>
										<CommandList>
											<CommandEmpty>
												Nie znaleziono typu.
											</CommandEmpty>
											<CommandGroup>
												{transactionTypes.map((transactionType) => (
													<CommandItem
														value={transactionType.name}
														key={transactionType.id}
														onSelect={() => {
															form.setValue(
																"type",
																transactionType.name
															);
															setOpen(false)
														}}
													>
														{transactionType.name}
														<CheckIcon
															className={cn(
																"ml-auto h-4 w-4",
																transactionType.name ===
																	field.value
																	? "opacity-100"
																	: "opacity-0"
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											id="date"
											variant={"outline"}
											className={cn(
												"w-[300px] justify-start text-left font-normal ml-20",
												!field.value && "text-muted-foreground"
											)}
										>
											<CalendarIcon className="mr-2 h-4 w-4" />
											{field.value.from ? (
												field.value.to ? (
													<>
														{format(
															field.value.from,
															"dd-MM-y"
														)}{" "}
														-{" "}
														{format(
															field.value.to,
															"dd-MM-y"
														)}
													</>
												) : (
													format(
														field.value.from,
														"dd-MM-y"
													)
												)
											) : (
												<span>Wybierz przedział dat</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											initialFocus
											mode="range"
											defaultMonth={field.value.from}
											selected={field.value}
											onSelect={field.onChange}
											numberOfMonths={2}
										/>
									</PopoverContent>
								</Popover>
							</FormControl>
							<FormMessage className="w-[80%] mx-auto" />
						</FormItem>
					)}
				/>
				</div>
				<Button type="submit" className="mx-auto flex w-[80%] mt-8 mb-20 text-lg font-semibold py-6">
					<Filter className="w-6 h-6 antialiased font-semibold mr-2" /> Filtruj
				</Button>
			</form>
		</Form>
	);
};

export default FetchExpensesForm;
