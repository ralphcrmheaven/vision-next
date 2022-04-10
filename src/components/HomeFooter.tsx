import React from 'react';

export default function HomeFooter() {
    return (
        <>
            <img src="images/cham1.png" alt="Cham" className="absolute inset-x-0 bottom-0 z-10 scale-75 translate-x-20" />
            <div className="absolute inset-x-0 bottom-0">
                <div className="flex flex-row flex-wrap-reverse translate-x-24 translate-y-1/3">
                    <img src="images/cloud.png" alt="Clouds" className='w-1/3 scale-125 blur-sm'/>
                    <img src="images/cloud.png" alt="Clouds" className='w-1/3 scale-125 translate-y-20 blur-md'/>
                    <img src="images/cloud.png" alt="Clouds" className='w-1/3 scale-75 translate-y-10 blur-sm'/>
                </div>
            </div>
        </>
    )
}
