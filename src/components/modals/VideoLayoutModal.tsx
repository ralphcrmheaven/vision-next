import React, { useEffect } from 'react'
import {
    Modal,
    ModalBody,
    RadioGroup,
    ModalHeader
} from 'amazon-chime-sdk-component-library-react';
const VideoLayoutModal = (props: any) => {
    useEffect(() => {
        console.log(props.videoLayout)
    }, [props.videoLayout])

    const updateVideoLayout = (e: any) => {
        props.setVideoLayout(e.currentTarget.value)
    }
    return (
        <div>
            <Modal size='md' onClose={() => props.setModalVisibility(false)} rootId="modal-root">


                <ModalHeader title='Video Layout' />

                <ModalBody className='mb-[50px] flex flex-row gap-[10px] justify-center'>
                    <RadioGroup
                        options={[
                            // { value: 'featured', label: 'Featured' },
                            { value: 'standard', label: 'Standard' },
                        ]}
                        value={props.videoLayout}
                        onChange={(e) => { updateVideoLayout(e) }}
                    />
                </ModalBody>

            </Modal>
        </div>
    );
}

export default VideoLayoutModal;