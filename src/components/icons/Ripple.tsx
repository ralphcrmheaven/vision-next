import React from 'react';
import { useMediaQuery } from 'react-responsive';

export default function RippleIcon() {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 821 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 821 })
    return (
        <>
            {
                isDesktopOrLaptop ? (
                    <img src="/images/ripple-red.svg" className="back-ripple" alt="ripple" />
                ) : isTabletOrMobile ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <circle cx="50" cy="50" r="0" fill="none" stroke="#eb321b" stroke-width="7">
                            <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;29" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
                            <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
                        </circle><circle cx="50" cy="50" r="0" fill="none" stroke="#eb321b" stroke-width="7">
                            <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;29" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                            <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate>
                        </circle>
                    </svg>
                ) : ''
            }
        </>
    )
}
