import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ExpenseService from '../../utils/services/ExpenseService';
import { useModalStore, useTableStore } from '../../utils/store/store';
import 'react-toastify/dist/ReactToastify.css';

const DeleteExpenseForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { selectedExpenseId } = useTableStore();
    const { setIsOpen } = useModalStore();
    const queryClient = useQueryClient();
    const deleteExpenseMutation = useMutation(ExpenseService.deleteExpense, {
        onSuccess: async (res) => {
            await queryClient.invalidateQueries('getAllExpenses');
            setIsOpen(false);
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        },
        onSettled: () => setIsLoading(false),
    })

    const onDeleteHandler = () => {
        setIsLoading(true); 
        deleteExpenseMutation.mutate(selectedExpenseId); 
    }

    return (
        <>
            <Modal.Body>
                <p>Are you sure you want to delete this expense?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary'>Close</Button>
                <Button
                    variant='danger'
                    onClick={onDeleteHandler}
                    disabled={isLoading}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </>
    )
}

export default DeleteExpenseForm;
