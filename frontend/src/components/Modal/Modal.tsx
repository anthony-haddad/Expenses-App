import React from 'react';
import { Modal as ModalItem } from 'react-bootstrap';
import { useModalStore } from '../../utils/store/store';
import CreateExpenseForm from '../Forms/CreateExpenseForm';
import DeleteExpenseForm from '../Forms/DeleteExpenseForm';
import UpdateExpenseForm from '../Forms/UpdateExpenseForm';

// interface ModalProps {
//     children: React.ReactNode;
// }

const Modal = () => {
    const { action, isOpen, setIsOpen } = useModalStore();

    const getModalContent = () => {
        if (action === 'delete expense') return <DeleteExpenseForm />
        if (action === 'create expense') return <CreateExpenseForm />
        if (action === 'edit expense') return <UpdateExpenseForm />

        return null;
    }

    return (
        <ModalItem show={isOpen} onHide={() => setIsOpen(false)}>
            <ModalItem.Header closeButton>
                <ModalItem.Title>{action.toUpperCase()}</ModalItem.Title>
            </ModalItem.Header>
            {getModalContent()}
        </ModalItem>
    )
};

export default Modal;
