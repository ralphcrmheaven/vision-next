import React from 'react';
interface Props {
    color: string
}
const ShareScreenIcon: React.FC<Props> = ({
    color
}) => {
    return (
        <>
            <svg width="40" height="26" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M33.3333 22.75C35.1667 22.75 36.65 21.2875 36.65 19.5L36.6667 3.25C36.6667 1.44625 35.1667 0 33.3333 0H6.66667C4.81667 0 3.33333 1.44625 3.33333 3.25V19.5C3.33333 21.2875 4.81667 22.75 6.66667 22.75H0V26H40V22.75H33.3333ZM21.6667 17.0138V13.455C17.0333 13.455 13.9833 14.8363 11.6667 17.875C12.6 13.5363 15.1833 9.21375 21.6667 8.33625V4.875L28.3333 10.9362L21.6667 17.0138Z" fill={color} />
            </svg>

        </>
    )
}
export default ShareScreenIcon
