import { expense } from "../types/expense";

class ExpenseService {
    static baseUrl: string = process.env.REACT_APP_BASE_URL || 'http://localhost:81/api';

    static async getAllExpenses(searchTerm: string, page: number) {
        const res = await fetch(`${ExpenseService.baseUrl}/expense?page=${page}&q=${searchTerm}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        return data;
    }

    static async deleteExpense(id: number | null) {
        const res = await fetch(`${ExpenseService.baseUrl}/expense/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })

        const data = await res.json();

        return data;
    }

    static async createExpense(expense: expense) {
        const res = await fetch(`${ExpenseService.baseUrl}/expense`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense)
        })

        const data = await res.json();

        return data;
    }

    static async updateExpense({ expense, id }: { expense: expense, id: null | number }) {
        const res = await fetch(`${ExpenseService.baseUrl}/expense/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense)
        })

        const data = await res.json();

        return data;
    }
}

export default ExpenseService;
