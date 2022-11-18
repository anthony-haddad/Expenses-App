import React from 'react';
import classes from './Layout.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
    <div className={classes.container}>{children}</div>
);

export default Layout;
