import React, { useMemo } from 'react';
import { Pagination as PaginationItem } from 'react-bootstrap';
import classes from './Pagination.module.css';

interface PaginationProps {
    page: number;
    data: {
        next_page_url: null | string
    };

    onNext: () => void;
    onPrev: () => void;
}

const Pagination = ({
    page,
    data,
    onNext,
    onPrev,
}: PaginationProps) => {
    // Computed
    const shouldDisableNextBtn = useMemo(() => {
        return data && !Boolean(data.next_page_url);
    }, [data]);

    const shouldDisablePrevBtn = useMemo(() => page === 1, [page]);

    return (
        <PaginationItem>
            <PaginationItem.Prev
                onClick={onPrev}
                disabled={shouldDisablePrevBtn}
                {...(shouldDisablePrevBtn && { className: classes.disabled })}
            />
            <PaginationItem.Next
                onClick={onNext}
                disabled={shouldDisableNextBtn}
                {...(shouldDisableNextBtn && { className: classes.disabled })}
            />
        </PaginationItem>
    );
};

export default Pagination;
