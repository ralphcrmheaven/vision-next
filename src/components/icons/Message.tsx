import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface Props {
    color: string
}
const MessageIcon: React.FC<Props> = ({
    color
}) => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
    return (
        <>

            {
                isDesktopOrLaptop ? (
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5085 0.938965H2.18714C1.06505 0.938965 0.146973 1.85704 0.146973 2.97913V21.3406L4.22731 17.2603H18.5085C19.6306 17.2603 20.5486 16.3422 20.5486 15.2201V2.97913C20.5486 1.85704 19.6306 0.938965 18.5085 0.938965Z" fill={color} />
                    </svg>



                ) : isTabletOrMobile ? (
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26.1 0H2.9C1.305 0 0 1.305 0 2.9V29L5.8 23.2H26.1C27.695 23.2 29 21.895 29 20.3V2.9C29 1.305 27.695 0 26.1 0Z" fill={color} />
                    </svg>
                ) : ''
            }

        </>
    )
}
export default MessageIcon
