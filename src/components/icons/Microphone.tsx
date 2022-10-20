import React from 'react';
interface Props{
    color:string
}
const MicrophoneIcon:React.FC<Props> =({
    color
}) => {
    return (
        <>
            <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15.7895C12.3714 15.7895 14.2714 14.0263 14.2714 11.8421L14.2857 3.94737C14.2857 1.76316 12.3714 0 10 0C7.62857 0 5.71429 1.76316 5.71429 3.94737V11.8421C5.71429 14.0263 7.62857 15.7895 10 15.7895ZM17.5714 11.8421C17.5714 15.7895 13.9429 18.5526 10 18.5526C6.05714 18.5526 2.42857 15.7895 2.42857 11.8421H0C0 16.3289 3.88571 20.0395 8.57143 20.6842V25H11.4286V20.6842C16.1143 20.0526 20 16.3421 20 11.8421H17.5714Z" fill={color} />
            </svg>

        </>
    )
}
export default MicrophoneIcon
