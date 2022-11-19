import React from 'react';
import { Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import ExpenseService from '../../utils/services/ExpenseService';
import { useModalStore, useTableStore } from '../../utils/store/store';
import { ExpenseModel } from '../../utils/types/expense';

const TableBody = () => {
    const { setAction, setIsOpen } = useModalStore();
    const { setSelectedExpenseId, setExpense } = useTableStore();
    const { data } = useQuery('getAllExpenses', () => ExpenseService.getAllExpenses());
    const expensesData = data?.data || [];

    // Methods
    const onDeleteHandler = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        setSelectedExpenseId(id);
        setAction('delete expense');
        setIsOpen(true);
    }

    const onUpdateHandler = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        setSelectedExpenseId(id);
        setExpense(expensesData.find((el: ExpenseModel) => el.id === id))
        setAction('edit expense');
        setIsOpen(true);
    }

    return (
        <tbody>
            {expensesData.map((expense: ExpenseModel) => (
                <tr key={expense.id}>
                    <td>{expense.value}$</td>           
                    <td>{expense.description}</td>
                    <td colSpan={2}>
                        <Button
                            variant='primary'
                            onClick={(e) => onUpdateHandler(e, expense.id)}
                        >
                            Edit
                        </Button>
                        <Button
                            className='ms-2'
                            variant='danger'
                            onClick={(e) => onDeleteHandler(e, expense.id)}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
};

export default TableBody;
