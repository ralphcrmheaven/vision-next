import React from 'react';

const VNotification = (props:any) => {
    const { className, type, message } = props;

    let addClassName = 'rounded-md border border-1 p-2 text-white text-center';
    
    switch(type){
        case 'success':
            addClassName += ' border-green-500 bg-green-500';
            break;
        case 'error':
            addClassName += ' border-red-500 bg-red-400';
            break;
    }

    return <div className={`${addClassName} ${className ?? ''}`}>{message}</div>
};

export default VNotification;