import React from 'react';
import { useMediaQuery } from 'react-responsive';
interface Props {
    color: string
}
const VideoInputIcon: React.FC<Props> = ({
    color
}) => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
    return (
        <>

            {
                isDesktopOrLaptop ? (
                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1199 5.75959V1.79261C16.1199 1.16922 15.6099 0.65918 14.9865 0.65918H1.38538C0.761995 0.65918 0.251953 1.16922 0.251953 1.79261V13.1269C0.251953 13.7502 0.761995 14.2603 1.38538 14.2603H14.9865C15.6099 14.2603 16.1199 13.7502 16.1199 13.1269V9.15987L20.6536 13.6936V1.22589L16.1199 5.75959Z" fill={color} />
                    </svg>


                ) : isTabletOrMobile ? (
                    <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.3333 7.5V1.66667C23.3333 0.75 22.5833 0 21.6667 0H1.66667C0.75 0 0 0.75 0 1.66667V18.3333C0 19.25 0.75 20 1.66667 20H21.6667C22.5833 20 23.3333 19.25 23.3333 18.3333V12.5L30 19.1667V0.833333L23.3333 7.5Z" fill={color} />
                    </svg>
                ) : ''
            }

        </>
    )
}
export default VideoInputIcon
