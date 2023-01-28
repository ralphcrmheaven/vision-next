import React, { FC, useState, useEffect } from 'react'
import { useLocalVideo, useRosterState, useToggleLocalMute, useMeetingManager } from "amazon-chime-sdk-component-library-react";
import { useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate, useParams } from "react-router-dom";
import { BackIcon, OnlineIcon } from "../components/icons";
import JoinMeetingControl from "../components/JoinMeetingControl";
import Logo from "../components/Logo";
import { IUser, selectUser } from "../redux/features/userSlice";
import meetingAPI from '../api/meeting';
import { useMeetings } from '../providers/MeetingsProvider';
import { spawn } from 'child_process';
import { endMeeting, getMeetingFromDB } from '../utils/api';

interface Attendee {
    Name: string;
    UserName: string;
    isHost: boolean;
}
const JoinMeeting: FC = () => {

    const user: IUser = useSelector(selectUser)
    const initials = user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
    const fullname = user.given_name + ' ' + user.family_name

    const { isVideoEnabled, toggleVideo } = useLocalVideo();
    const { muted, toggleMute } = useToggleLocalMute()
    const meetingManager = useMeetingManager();
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [attendees, setAttendees] = useState([] as Attendee[]);
    const [title, setTitle] = useState('');

    console.log('meetingManager', meetingManager);

    useEffect(() => {
        console.log('audioInputs', muted);
    }, [muted]);

    const { mId, ePass } = useParams();

    const { username, given_name } = useSelector(selectUser);

    const {
        initializeJoinMeeting,
      } = useMeetings();


    const doActionsOnLoad = async () => {
       
        setLoading(true);

        try { 
            const res = await meetingAPI().validateMeeting(mId, { password: ePass, ie: false });
            
            if (res.success) {
                const attendees = res.data.Attendees;
                const attendee = attendees.find((a:any) => a.isHost == true);

                if (attendee) {
                    const meetings = await meetingAPI().read(attendee.UserName, {});
                    if (meetings && meetings.length >  0) {
                        const meeting = meetings.find((item: any) => item.MeetingId == mId)
                        if (meeting) {
                            setTitle(meeting.Topic);
                            setAttendees(meeting.Attendees.filter((a:any) => a.UserName != username) as Attendee[]);
                        }
                    }
                   
                }
                

                await initializeJoinMeeting?.(mId);
                
                setLoading(false)
            }
        } catch (error) {
            
        }
       
    }

    const clickedEndMeeting = async () => {
        const meetingId = meetingManager.meetingId
        if (meetingId) {
          await endMeeting(meetingId)
          await meetingManager.leave()
            navigate('/')
        }
    }

    const joinMeeting = async() => {
        const meetingId = meetingManager.meetingId
        if (meetingId) {
          await endMeeting(meetingId)
          await meetingManager.leave()
          navigate(`/meeting/${mId}/${ePass}?muted=${muted}&isVideoEnabled=${isVideoEnabled}`)
        }
        
    }

    useEffect(() => {
        doActionsOnLoad();
    }, []);
    


    return (
        <div className="join-meeting">
            <div className="w-full relative">
                <div className="grid grid-cols-3 gap-4 h-24 w-full">
                    <div className="h-24 ">
                        <NavLink
                            to="/">
                            <button className="absolute left-[28px] top-[34px] back-to-home" onClick={clickedEndMeeting}><BackIcon /> Back to Dashboard</button>
                        </NavLink>
                    </div>
                    <div className="h-24 m-auto topbar-logo"><Logo /></div>
                    <div className=" h-24 ml-auto">
                        <div className="w-full ">
                            {initials && fullname && (
                                <div className="profile-topbar flex flex-row items-center space-x-4">
                                    <span className="p-2 text-white bg-gray-900 rounded-lg">
                                        {initials}
                                    </span>
                                    <span>{fullname}</span>
                                    <span className="online-icon"><OnlineIcon /></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="px-5">
                    <div className="grid grid-cols-1 smgrid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-5">
                        <div className="col-span-1 sm:col-span-1 md:col-span-8 lg:col-span-8">
                            <JoinMeetingControl
                                muted={muted}
                                isVideoEnabled={isVideoEnabled}
                                toggleVideo={toggleVideo}
                                toggleMute={toggleMute}

                            />
                        </div>
                        <div className="mt-0 sm:mt-0 md:mt-24 lg:mt-24 col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4">
                            <div className="flex justify-center">
                                <div className="w-[250px]">
                                    <div className="text-center flex flex-col justify-center items-center">
                                        <h2 className="join-meeting__title">{title ? title : 'Join meeting'}</h2>
                                        
                                        {loading ? (
                                            <span className='px-1 my-5 text-gray-600 home-time-card'>
                                                <svg
                                                className="w-6 h-6 mr-3 -ml-1 text-gray-600 animate-spin"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                                </svg>
                                            </span>
                                        ) : (
                                            <div>
                                                {attendees.length > 0 ? (
                                                    <div>
                                                        <div className="my-5">
                                                            <div className="join-meeting__attendee">
                                                                {attendees.map((item, i) => (
                                                                <div>
                                                                    {i <= 1 && (
                                                                        <div className="join-meeting__attendee--item uppercase">{item.Name?.charAt(0)}</div>
                                                                    )}
                                                                    
                                                                </div> 
                                                                ))}

                                                                {attendees.length > 2 && (
                                                                    <div className="join-meeting__attendee--item-num">+{attendees.length - 2}</div>
                                                                )}
                                                            </div>   
                                                        </div>
                                                        {attendees.length > 0 && (
                                                            <p className="join-meeting__attendee--text mb-5">
                                                                {attendees.length > 2 ? (
                                                                    <span>
                                                                        {attendees.map((item, i) => (i <= 1 && (i == 1 ? `${item.Name}` : `${item.Name}, `)))} and others are in this call
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                    {attendees.map((item, i) => (i <= 1 && (i == 1 ? `${item.Name}` : `${item.Name}, `)))} are in this call
                                                                    </span>
                                                                )}

                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="join-meeting__attendee--text mb-5 mt-5">
                                                        <span>No Attendees</span>
                                                    </p>
                                                
                                                )}
                                                
                                            </div>
                                        )}
                                        {!loading && (
                                            <a href="#" onClick={joinMeeting} className="join-meeting__btn">
                                             Join Meeting
                                            </a>
                                        )}
                                       
                                        
                                        
                                       
                                    </div>    
                                </div>
                            </div>
                           
                            
                        </div>             
                    </div>    
                </div>         
            </div>
        </div>
    );
}


export default JoinMeeting;