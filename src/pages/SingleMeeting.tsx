import React, { FC } from 'react'
import Meeting from '../components/Meeting'
import { useMediaQuery } from 'react-responsive';

const SingleMeeting: FC = () => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
    return (
        <>
            {
                isDesktopOrLaptop ? (
                    <div className="relative w-full h-full">
                        <Meeting />
                    </div>
                ) : isTabletOrMobile ? (
                    <div className="">
                        <Meeting />
                    </div>
                ) : ''
            }


        </>
    )
};

export default SingleMeeting;