import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalBody,
    ModalHeader,
    Add,
    Button,
    Clear,
    Rooms,
    CheckRound,
} from 'amazon-chime-sdk-component-library-react';
import { VInput, VSelect, VButton } from '../ui';

const PermissionMeetingModal = (props:any) => {

    return (
        <div>
            <Modal size='lg' onClose={() => props.setUserJoin(false)} rootId="modal-root">
                <ModalHeader title="Security Protocol" />

                <ModalBody className=''>
                    <div className='flex flex-row justify-end mb-[20px]'>
                        <h3>{props.data ? props.data.data.name : ""} wants to join the meeting.</h3>
                    </div>

                    <div className='flex flex-row justify-end mb-[20px]'>
                        <Button label="Allow" variant={'primary'}  onClick={() => props.handleConfirm("approved")}/>
                        <Button label="Disallow" variant={'default'} onClick={() => props.handleConfirm("disapproved")} />
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default PermissionMeetingModal;