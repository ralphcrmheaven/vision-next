import React from 'react';

const VNotification = (props:any) => {
    const { type, message } = props;

    let className = 'rounded-md border-1 p-2 text-white text-center';
    
    switch(type){
        case 'success':
            className += ' border-green-500 bg-green-500';
            break;
        case 'error':
            className += ' border-red-500 bg-red-500';
            break;
    }

    return <div className={className}>{message}</div>
};

export default VNotification;