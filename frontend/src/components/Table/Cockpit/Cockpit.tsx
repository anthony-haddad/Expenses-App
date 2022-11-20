import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useModalStore, useTableStore } from '../../../utils/store/store';
import Loop from '../../Icons/Loop';
import Plus from '../../Icons/Plus';
import classes from './Cockpit.module.css';

const Search = () => {
    const { setSearchTerm } = useTableStore();
    const [input, setInput] = useState('');

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(input);
    }

    return (
        <Form className='d-flex' onSubmit={onSubmitHandler}>
            <Form.Group>
                <Form.Control
                    type='text'
                    value={input}
                    placeholder='Search here...'
                    onChange={(e) => setInput(e.target.value)}
                />
            </Form.Group>
            <Button className={classes.submitBtn} type={'submit'}>
                <Loop className={classes.searchIcon} />
            </Button>
        </Form>
    )
}

const Cockpit = () => {
    const { setIsOpen, setAction } = useModalStore();

    const onAddExpenseHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setAction('create expense');
        setIsOpen(true);
    }

    return (
        <div className='mb-3 d-flex justify-content-between align-items-center'>
            <Search />
            <Button onClick={onAddExpenseHandler}>
                <Plus />
                <span className='ms-2'>Add Expense</span>
            </Button>
        </div>
    )
};

export default Cockpit;
