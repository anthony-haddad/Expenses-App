import React from 'react';
import { Spinner } from 'react-bootstrap';
import classes from './Table.module.css';

const TableLoading = () => (
    <tr className={classes.tableLoading}>
        <td colSpan={3}>
            <p>Loading expenses...</p>
            <Spinner animation='grow' />
        </td>
    </tr>
);

export default TableLoading;
