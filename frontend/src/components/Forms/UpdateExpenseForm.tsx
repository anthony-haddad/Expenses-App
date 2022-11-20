import React, { useEffect, useMemo } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ExpenseService from '../../utils/services/ExpenseService';
import { useModalStore, useTableStore } from '../../utils/store/store';
import { expense } from '../../utils/types/expense';
import classes from './Forms.module.css';
import 'react-toastify/dist/ReactToastify.css';

const UpdateExpenseForm = () => {
    const { expense, selectedExpenseId } = useTableStore();
    const { setIsOpen } = useModalStore();
    const { handleSubmit, register, formState: { isSubmitted, errors }, setValue } = useForm<expense>();
    const queryClient = useQueryClient();

    const updateExpenseMutation = useMutation(ExpenseService.updateExpense, {
        onSuccess: async (res) => {
            await queryClient.invalidateQueries('getAllExpenses');
            setIsOpen(false);
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        },
    });

    const onSubmitHandler = handleSubmit((val) => {
        updateExpenseMutation.mutate({expense: val, id: selectedExpenseId});
    })

    const valueError = useMemo(() => {
        if (errors?.value?.type === 'required') {
            return 'required'; 
        }

        return '';
    }, [errors.value]);

    const descriptionError = useMemo(() => {
        if (errors?.description?.type === 'required') {
            return 'required';
        }

        if (errors?.description?.type === 'maxLength') {
            return 'Max length should be less than 100 chars';
        }

        return '';

    }, [errors.description]);

    useEffect(() => {
        setValue('value', expense.value);
        setValue('description', expense.description);
    }, [expense, setValue]);

    return (
        <Modal.Body>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className='mb-2'>
                    <Form.Label>Value</Form.Label>
                    <Form.Control
                        className={errors.value && 'border border-danger'}
                        type='number'
                        {...register('value', { required: true })}
                    />
                    {!!valueError && (
                        <span className={classes.error}>
                           required
                        </span>
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        className={errors.description && 'border border-danger'}
                        as={'textarea'}
                        {...register('description', { required: true, maxLength: 100 })} />
                    {!!descriptionError && (
                        <span className={classes.error}>
                            {descriptionError}
                        </span>
                    )}
                </Form.Group>
                <Button
                    type='submit'
                    disabled={isSubmitted}
                    className='mt-2'
                >
                    Save
                </Button>
            </Form>
        </Modal.Body>
    );
};

export default UpdateExpenseForm;