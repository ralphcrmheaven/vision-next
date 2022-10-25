import React from 'react';
import { useMediaQuery } from 'react-responsive';
interface Props {
    color: string
}
const ShareScreenIcon: React.FC<Props> = ({
    color
}) => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
    return (
        <>

            {
                isDesktopOrLaptop ? (
                    <svg width="28" height="19" viewBox="0 0 28 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.1146 16.4468C24.3613 16.4468 25.3701 15.4267 25.3701 14.18L25.3814 2.84571C25.3814 1.58761 24.3613 0.578857 23.1146 0.578857H4.97975C3.72164 0.578857 2.7129 1.58761 2.7129 2.84571V14.18C2.7129 15.4267 3.72164 16.4468 4.97975 16.4468H0.446045V18.7137H27.6483V16.4468H23.1146ZM15.1806 12.4458V9.96362C12.0297 9.96362 9.95549 10.927 8.38002 13.0465C9.01474 10.0203 10.7716 7.00538 15.1806 6.39333V3.97913L19.7143 8.20681L15.1806 12.4458Z" fill={color} />
                    </svg>


                ) : isTabletOrMobile ? (
                    <svg width="40" height="26" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="Vector" d="M33.3333 22.75C35.1667 22.75 36.65 21.2875 36.65 19.5L36.6667 3.25C36.6667 1.44625 35.1667 0 33.3333 0H6.66667C4.81667 0 3.33333 1.44625 3.33333 3.25V19.5C3.33333 21.2875 4.81667 22.75 6.66667 22.75H0V26H40V22.75H33.3333ZM21.6667 17.0138V13.455C17.0333 13.455 13.9833 14.8363 11.6667 17.875C12.6 13.5363 15.1833 9.21375 21.6667 8.33625V4.875L28.3333 10.9362L21.6667 17.0138Z" fill={color} />
                    </svg>
                ) : ''
            }

        </>
    )
}
export default ShareScreenIcon
