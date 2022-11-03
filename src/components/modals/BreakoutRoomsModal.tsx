
import React, { useState } from 'react';
import { Card, Image, Collection, Badge, View, Flex,Button, Divider, Heading } from '@aws-amplify/ui-react';
import {
    Modal,
    ModalBody,
    ModalHeader,
  } from 'amazon-chime-sdk-component-library-react'

  import { VInput, VSelect, VRichTextEditor, VLabel, VButton, VModal } from '../ui';
import createBreakoutRoom  from '../../api/breakout';
import '@aws-amplify/ui-react/styles.css';


const BreakoutRoomsModal = (props:any) => {

    const items = [
        {
            title: 'Milford - Room #1',
            badges: ['Waterfront'],
        },
        {
            title: 'Milford - Room #2',
            badges: ['Mountain'],
        },
    ];

    const [numRooms, setNumRooms] = useState(0);
    if (!props.showModal) return <></>

    const toggleCreateBreakoutRoom = async () => {
        props.setShowCreateBreakout(true)
    }

    const createBreakoutRooms = async () => {
        // for (let i=1; i<=numRooms; i++) {
        //     await createBreakoutRoom()
        // }
    };

    const onNumRoomsChange = (value:any) => {
        setNumRooms(value);
    };

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

                <Collection
                items={items}
                type="list"
                direction="row"
                gap="20px"
                wrap="nowrap"
                >
                {(item, index) => (
                    <Card
                    key={index}
                    borderRadius="medium"
                    maxWidth="20rem"
                    variation="outlined"
                    >
                    <Image
                        className="amplify-image-vision"
                        src="/images/BGRectangle1474.png"
                        alt="Glittering stream with old log, snowy mountain peaks tower over a green field."
                    />
                    <View padding="xs">
                        <Heading className="amplify-heading-vision" padding="medium">
                            <Badge
                                key={item.title}>
                                    {item.title}
                                </Badge>
                            </Heading>
                        <Button className="amplify-button-vision" variation="primary" isFullWidth>
                                Enter Room
                        </Button>
                    </View>
                    </Card>
                )}
                </Collection>
                    
                </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default BreakoutRoomsModal;