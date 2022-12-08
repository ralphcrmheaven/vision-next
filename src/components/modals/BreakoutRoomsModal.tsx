
import React, { useEffect, useState }  from 'react';
import { Card, Image, Collection, Badge, View, Flex,Button, Divider, Heading } from '@aws-amplify/ui-react';
import {
    Modal,
    ModalBody,
    ModalHeader,
  } from 'amazon-chime-sdk-component-library-react'
import {
useMeetings
} from '../../providers/MeetingsProvider';

import BreakoutRoom from '../breakouts/BreakoutRoom';


import { VInput, VSelect, VRichTextEditor, VLabel, VButton, VModal } from '../ui';
import createBreakoutRoom  from '../../api/breakout';
import '@aws-amplify/ui-react/styles.css';
import breakout  from '../../api/breakout';


const BreakoutRoomsModal = (props:any) => {

    const items = {
        Meeting: ""
    };
      

    const [rooms, setRooms] = useState<any>([])

    const {
        setShowJoinMeetingModal,
        setTheCurrentMeetingId,
        setTheMeeting
    } = useMeetings();

    const [numRooms, setNumRooms] = useState(0);

    const toggleCreateBreakoutRoom = async () => {
        props.setShowCreateBreakout(true)
    }

    const createBreakoutRooms = async () => {
        // for (let i=1; i<=numRooms; i++) {
        //     await createBreakoutRoom()
        // }
    };

    const getBreakoutRooms = async () => {
        const request = {
            meetingId: props.meetingId,
            type: "get"
        }
       const rooms_result = await breakout(request);
        let rooms = rooms_result.map(function(element:any){
            return element.Meeting
        });
        
       setRooms(rooms);

       console.log("getting breakout rooms")
       console.log(rooms)
    };

    const onNumRoomsChange = (value:any) => {
        setNumRooms(value);
    };

    useEffect(() => {
        getBreakoutRooms();
    }, props.meetingId);

    if (!props.showModal) return <></>

    return (
        <div>
            <Modal size="lg" onClose={() => props.setShowModal(!props.showModal)}>
                <ModalHeader title="Breakout Rooms" >
                </ModalHeader>
                <ModalBody className="overflow-y-auto h-310px mb-8">
                <div className="meeting-form">
                    <div className="mb-5  items-center	">
                        <VButton 
                            className="w-[200px]"
                            onClick={(e:any) => toggleCreateBreakoutRoom()}
                        >
                            Create Breakout Room
                        </VButton>
                    </div>
                    <BreakoutRoom rooms={rooms}/>
                </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default BreakoutRoomsModal;