
import React, { useState } from 'react';

import {
    Modal,
    ModalBody,
    ModalHeader,
  } from 'amazon-chime-sdk-component-library-react'
  import { VInput, VSelect, VRichTextEditor, VLabel, VButton, VModal } from '../ui';

import breakout  from '../../api/breakout';


const CreateBreakoutModal = (props:any) => {

    const [numRooms, setNumRooms] = useState(0);
    if (!props.showModal) return <></>

    const createBreakoutRooms = async () => {
        const request = {
            meetingId: props.meetingId,
            numRooms: numRooms,
            type: "create"
        }
        await breakout(request)
        props.setShowModal(!props.showModal)
    };

    const onNumRoomsChange = (value:any) => {
        setNumRooms(value);
    };

    return (
        <div>
            <Modal size="lg" onClose={() => props.setShowModal(!props.showModal)}>
                <ModalHeader title="Create Breakout Room" />
                <ModalBody className="overflow-y-auto h-310px">
                <div className="meeting-form">
                    <div className="mb-5">
                        <VLabel htmlFor="topic">Number of Rooms</VLabel>
                        <VInput id="numrooms" value={numRooms} onChange={(e:any) => onNumRoomsChange(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <VButton 
                            className="w-[200px]"
                            onClick={(e:any) => createBreakoutRooms()}
                        >
                            Create Breakout Rooms
                        </VButton>
                    </div>
                </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default CreateBreakoutModal;