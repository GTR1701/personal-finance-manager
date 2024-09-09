import { NormalisedTransaction } from "@/types/types";
import { create } from "zustand";

type Store = {
    dataTableData: NormalisedTransaction[]
    setDataTableStore: (data: NormalisedTransaction[]) => void;
}

export const useDataTableStore = create<Store>((set) => ({
    dataTableData: [],
    setDataTableStore: (data: NormalisedTransaction[]) => set({ dataTableData: data }),
}));