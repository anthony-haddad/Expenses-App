import React from 'react';
import { Table as TableItem } from 'react-bootstrap'; 
import Layout from '../Layout/Layout';
import Cockpit from './Cockpit';
import TableBody from './TableBody';
import TableHead from './TableHead';

const Table = () => {
    return (
        <Layout>
            <Cockpit />
            <TableItem striped>
                <TableHead />
                <TableBody />
            </TableItem>
        </Layout>
    )
};

export default Table;
