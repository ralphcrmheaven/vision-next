import React, { FC, ReactNode } from 'react';
import {
    MeetingStatus,
    useMeetingStatus,
    useMeetingManager
  } from 'amazon-chime-sdk-component-library-react';

import loading from '../assets/images/loading5.gif'
 

interface IProps {
    children: ReactNode,
    className?: string
}

const  MeetingWrapper: FC<IProps>  = ({children, ...others}) => {
    const meetingStatus = useMeetingStatus();
    const meetingManager = useMeetingManager();
    const meetingId = meetingManager.meetingId;
	return (
		<>
			<div {...others} className={[others.className, 'test'].join(' ')}>
                {(meetingId && meetingStatus === MeetingStatus.Loading) ?
                    <>
                        <div className="flex flex-row h-screen">
                            <img src={loading} alt="loading" />
                        </div>
                    </>
				: 
                    <>
                    {children}
                    </>
                }
			</div>
		</>
	)
}

export default MeetingWrapper
