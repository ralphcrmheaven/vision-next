import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface Props {
    color: string
}
const MicrophoneIcon: React.FC<Props> = ({
    color
}) => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
    return (
        <>
            {
                isDesktopOrLaptop ? (
                    <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.12184 12.1062C8.73455 12.1062 10.0267 10.8592 10.0267 9.31438L10.0364 3.73077C10.0364 2.18597 8.73455 0.938965 7.12184 0.938965C5.50914 0.938965 4.20732 2.18597 4.20732 3.73077V9.31438C4.20732 10.8592 5.50914 12.1062 7.12184 12.1062ZM12.2708 9.31438C12.2708 12.1062 9.8032 14.0605 7.12184 14.0605C4.44048 14.0605 1.97285 12.1062 1.97285 9.31438H0.321289C0.321289 12.4877 2.96379 15.112 6.15034 15.568V18.6204H8.09335V15.568C11.2799 15.1213 13.9224 12.497 13.9224 9.31438H12.2708Z" fill={color} />
                    </svg>

                ) : isTabletOrMobile ? (
                    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 15.7895C12.3714 15.7895 14.2714 14.0263 14.2714 11.8421L14.2857 3.94737C14.2857 1.76316 12.3714 0 10 0C7.62857 0 5.71429 1.76316 5.71429 3.94737V11.8421C5.71429 14.0263 7.62857 15.7895 10 15.7895ZM17.5714 11.8421C17.5714 15.7895 13.9429 18.5526 10 18.5526C6.05714 18.5526 2.42857 15.7895 2.42857 11.8421H0C0 16.3289 3.88571 20.0395 8.57143 20.6842V25H11.4286V20.6842C16.1143 20.0526 20 16.3421 20 11.8421H17.5714Z" fill={color} />
                    </svg>
                ) : ''
            }
        </>
    )
}
export default MicrophoneIcon
