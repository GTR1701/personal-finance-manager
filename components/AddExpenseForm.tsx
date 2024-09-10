"use client";

import { AddExpenseFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { PlusCircle } from "lucide-react";
import { types } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import createExpense from "@/actions/addExpense";
import { upsertBalance } from "@/actions/upsertBalance";

type AddExpenseFormProps = {
	transactionTypes: types[];
};

const AddExpenseForm = ({
	transactionTypes,
}: Readonly<AddExpenseFormProps>) => {
	const form = useForm<z.infer<typeof AddExpenseFormSchema>>({
		resolver: zodResolver(AddExpenseFormSchema),
		defaultValues: {
			name: "",
			type: "",
			amount: 0,
		},
	});

	const [open, setOpen] = useState(false);
	const router = useRouter();
	const user = getCookie("currentUser");

	const onSubmit = async (data: z.infer<typeof AddExpenseFormSchema>) => {
		console.log(data);
		const createdAt = new Date();
		const payload = {
			name: data.name,
			amount: data.amount,
			type: data.type,
			date: createdAt,
			userId: user.valueOf(),
		};
		await createExpense(payload);
		await upsertBalance({
			transaction: data.amount,
			type: 2,
			user: user.valueOf(),
		}).then((e) => router.push("/dashboard/expenses"));
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
										className=" mr-10"
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
													{transactionTypes.map(
														(transactionType) => (
															<CommandItem
																value={
																	transactionType.name
																}
																key={
																	transactionType.id
																}
																onSelect={() => {
																	form.setValue(
																		"type",
																		transactionType.name
																	);
																	setOpen(
																		false
																	);
																}}
															>
																{
																	transactionType.name
																}
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
														)
													)}
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
						name="amount"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Kwota"
										type="number"
										className=" mx-10 arrow-none"
										{...field}
										onChange={(event) =>
											field.onChange(
												parseFloat(event.target.value)
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					type="submit"
					className="mx-auto flex w-[80%] mt-8 mb-20 text-lg font-semibold py-6"
				>
					<PlusCircle className="w-6 h-6 antialiased font-semibold mr-2" />{" "}
					Dodaj
				</Button>
			</form>
		</Form>
	);
};

export default AddExpenseForm;
