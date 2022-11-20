import React from 'react';

const TableHead = () => (
    <thead className='bg-primary text-white rounded-start rounded-end'>
        <tr className=''>
            <th className='rounded-start'>Value</th>
            <th>Description</th>
            <th className='rounded-end'>Actions</th>
        </tr>
    </thead>
);

export default TableHead;
