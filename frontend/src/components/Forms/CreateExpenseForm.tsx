import React, { useMemo, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm<expense>();
    const queryClient = useQueryClient();

    // Methods
    const createExpenseMutation = useMutation(ExpenseService.createExpense, {
        onSuccess: (res) => {
            queryClient.invalidateQueries('getAllExpenses');
            setIsOpen(false);
            toast.success(res.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        },
        onSettled: () => setIsLoading(false)
    });

    const onSubmitHandler = handleSubmit((val) => {
        setIsLoading(true);
        createExpenseMutation.mutate(val);
    })

    // Computed
    const valueError = useMemo(() => {
        console.log(errors);
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
                           {valueError}
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

export default CreateExpenseForm;
