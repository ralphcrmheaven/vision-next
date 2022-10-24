import React from 'react';
interface Props {
    color: string
}
const VideoInputIcon: React.FC<Props> = ({
    color
}) => {
    return (
        <>
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.3333 7.5V1.66667C23.3333 0.75 22.5833 0 21.6667 0H1.66667C0.75 0 0 0.75 0 1.66667V18.3333C0 19.25 0.75 20 1.66667 20H21.6667C22.5833 20 23.3333 19.25 23.3333 18.3333V12.5L30 19.1667V0.833333L23.3333 7.5Z" fill={color} />
            </svg>

        </>
    )
}
export default VideoInputIcon