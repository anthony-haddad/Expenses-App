import React, { useEffect, useMemo, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const { setIsOpen } = useModalStore();
    const { handleSubmit, register, formState: { errors }, setValue } = useForm<expense>();
    const queryClient = useQueryClient();

    const updateExpenseMutation = useMutation(ExpenseService.updateExpense, {
        onSuccess: async (res) => {
            await queryClient.invalidateQueries('getAllExpenses');
            setIsOpen(false);
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        },
        onSettled: () => setIsLoading(false),
    });

    const onSubmitHandler = handleSubmit((val) => {
        setIsLoading(true);
        updateExpenseMutation.mutate({expense: val, id: selectedExpenseId});
    })

    const valueError = useMemo(() => {
        if (errors?.value?.type === 'required') {
            return 'required'; 
        }

        if (errors?.value?.type === 'maxLength') {
            return 'max digits allowed is 8';
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

    const shouldDisableSubmit = () => {
        if (!!Object.values(errors).length) return true;
        if (isLoading) return true;

        return false;
    };

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
                        {...register('value', { required: true, maxLength: 8 })}
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
                    disabled={shouldDisableSubmit()}
                    className='mt-2'
                >
                    Save
                </Button>
            </Form>
        </Modal.Body>
    );
};

export default UpdateExpenseForm;