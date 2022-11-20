import React, { useMemo } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ExpenseService from '../../utils/services/ExpenseService';
import { useModalStore } from '../../utils/store/store';
import { expense } from '../../utils/types/expense';
import classes from './Forms.module.css';
import 'react-toastify/dist/ReactToastify.css';

const CreateExpenseForm = () => {
    const { setIsOpen } = useModalStore();
    const { handleSubmit, register, formState: { isSubmitted, errors } } = useForm<expense>();
    const queryClient = useQueryClient();

    const createExpenseMutation = useMutation(ExpenseService.createExpense, {
        onSuccess: (res) => {
            queryClient.invalidateQueries('getAllExpenses');
            setIsOpen(false);
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        },
    });

    const onSubmitHandler = handleSubmit((val) => {
        createExpenseMutation.mutate(val);
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

export default CreateExpenseForm;
