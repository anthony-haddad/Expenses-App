import create from 'zustand';
import { actions } from '../types/actions';
import { expense } from '../types/expense';

interface TableStore {
    expense: expense;
    selectedExpenseId: null | number;
    setExpense: (val: expense) => void;
    setSelectedExpenseId: (val: null | number) => void;
}

interface ModalStore {
    action: actions;
    isOpen: boolean;
    setAction: (val: actions) => void;
    setIsOpen: (val: boolean) => void;
}

export const useTableStore = create<TableStore>((set) => ({
    expense: {
        value: '',
        description: '',
    },
    setExpense: (val) => set(() => ({ expense: val })),
    selectedExpenseId: null,
    setSelectedExpenseId: (val) => set(() => ({ selectedExpenseId: val })),
}));

export const useModalStore = create<ModalStore>((set) => ({
    action: '',
    setAction: (val) => set(() => ({ action: val })),
    isOpen: false,
    setIsOpen: (val) => set(() => ({ isOpen: val })),
}));
