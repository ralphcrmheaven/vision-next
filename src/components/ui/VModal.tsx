import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalButtonGroup,
    ModalButton
} from 'amazon-chime-sdk-component-library-react';
import './VModal.css';

const VModal = (props:any) => {
    const { size, dismissible, displayClose, title, body, setIsOpen } = props;
    return (
        <Modal className="v-modal" size={size} dismissible={dismissible} onClose={() => setIsOpen()}>
            <ModalHeader title={title} displayClose={displayClose} className="text-center mb-5 font-bold text-sky-900"/>
            <ModalBody>
                {body}    
            </ModalBody>
        </Modal>
    )
};

export default VModal;