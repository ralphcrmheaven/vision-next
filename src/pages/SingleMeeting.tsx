import React, { FC } from 'react'
import Meeting from '../components/Meeting'

const SingleMeeting: FC = () => {
    return (
        <>
            <div className="relative w-full h-full">
                <Meeting/>
            </div>
        </>
    )
};

export default SingleMeeting;