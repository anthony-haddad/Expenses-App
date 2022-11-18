import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQueryClient } from 'react-query';
import ExpenseService from '../../utils/services/ExpenseService';
import { useModalStore, useTableStore } from '../../utils/store/store';

const DeleteExpenseForm = () => {
    const { selectedExpenseId } = useTableStore();
    const { setIsOpen } = useModalStore();
    const queryClient = useQueryClient();
    const deleteExpenseMutation = useMutation(ExpenseService.deleteExpense, {
        onSuccess: (res) => {
            console.log(res);
            setIsOpen(false);
            queryClient.invalidateQueries('getAllExpenses');
        }
    })

    const onDeleteHandler = () => {
       deleteExpenseMutation.mutate(selectedExpenseId); 
    }

    return (
        <>
            <Modal.Body>
                <p>Are you sure you want to delete this expense?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary'>Close</Button>
                <Button variant='danger' onClick={onDeleteHandler}>Delete</Button>
            </Modal.Footer>
        </>
    )
}

export default DeleteExpenseForm;
