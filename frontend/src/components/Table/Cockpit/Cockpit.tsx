import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useModalStore } from '../../../utils/store/store';
import Loop from '../../Icons/Loop';
import Plus from '../../Icons/Plus';
import classes from './Cockpit.module.css';

const Search = () => {
    return (
        <Form className='d-flex'>
            <Form.Group>
                <Form.Control type='text' placeholder='Search here...'></Form.Control>
            </Form.Group>
            <Loop className={classes.searchIcon} />
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
