import React from 'react'
import { Placeholder } from '@aws-amplify/ui-react';
import { ClockIcon, UnionIcon, CameraRecordIcon } from '../icons';
import '../../assets/styles/styles.css';
const MeetingCardLoader = () => {
    return (
        <div className="v-card meeting-card text-sm rounded-[30px]">
            <div className="flex mb-2">
                <h1 className="w-3/4 text-xl font-bold text-vision-blue"><Placeholder className="h-[28px] " /></h1>
                <div className="grid w-1/4 justify-items-end">
                    <Placeholder className='rounded-[12px]' height="27px" width="54px" />
                </div>
            </div>
            <div className="flex">
                <Placeholder />
            </div>

            <div className="flex items-center mt-10">
                <div className="self-center w-3/4 p-1">
                    <Placeholder height="50px" width="50px" />
                </div>
                <div className="flex space-x-1">
                    <Placeholder className='rounded-[12px]' height="50px" width="190px" />
                    <Placeholder className='rounded-[12px]' height="50px" width="170px" />
                </div>
            </div>
        </div>
    )
}

export default MeetingCardLoader