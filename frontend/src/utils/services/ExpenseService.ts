
class ExpenseService {
    static baseUrl: string = 'http://localhost:81/api';

    static async getAllExpenses() {
        const res = await fetch(`${ExpenseService.baseUrl}/expense`, {
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
}

export default ExpenseService;
