import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Pagination from '../Pagination/Pagination';
import { useQuery } from 'react-query';
import ExpenseService from '../../utils/services/ExpenseService';
import { useModalStore, useTableStore } from '../../utils/store/store';
import { ExpenseModel } from '../../utils/types/expense';
import classes from './Table.module.css';
import TableLoading from './TableLoading';

const TableBody = () => {
    const [page, setPage] = useState(1);
    const { setAction, setIsOpen } = useModalStore();
    const { setSelectedExpenseId, setExpense, searchTerm } = useTableStore();
    const { data, refetch, isLoading } = useQuery(
        'getAllExpenses',
        () => ExpenseService.getAllExpenses(searchTerm, page)
    );
    const expensesData = data?.data || [];

    // Computed
    const shouldShowExpenses = !isLoading && !!expensesData.length

    const expenseList = expensesData.map((expense: ExpenseModel) => (
        <tr key={expense.id} className={classes.tableRow}>
            <td className='fw-bold'>{expense.value}$</td>           
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
    ));

    
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

    const onSelectPrevPage = () => {
        if (page === 1) return;
        setPage(page - 1);
    }

    const onSelectNextPage = () => {
        if (!data.next_page_url) return;
        setPage(page + 1);
    }

    useEffect(() => {
        if (!!searchTerm && !data?.next_page_url) {
            setPage(1);
        }
        refetch();
    }, [refetch, searchTerm, page, setPage, data]);

    return (
        <tbody className={classes.tableBody}>
            {isLoading && <TableLoading />}
            {shouldShowExpenses ? expenseList : null} 
            {!!expensesData?.length && (
                <Pagination
                    page={page}
                    data={data}
                    onNext={onSelectNextPage}
                    onPrev={onSelectPrevPage}
                />
            )}
        </tbody>
    )
};

export default TableBody;
