import React, { FC, ReactNode } from 'react';
import {
    MeetingStatus,
    useMeetingStatus,
    useMeetingManager
  } from 'amazon-chime-sdk-component-library-react';
 

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
			<div {...others} className={others.className}>
                {(meetingId && meetingStatus === MeetingStatus.Loading) ?
                    <>
                        <img src='./images/loading.gif' alt="loading" />
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
