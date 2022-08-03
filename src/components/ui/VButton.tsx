import React from 'react';
import { CircularLoader } from '../loaders';

const VButton = (props:any) => {
    let className = '';

    if (props.isLoading) {
        className += 'bg-slate-500 flex items-center justify-center'
    }

    if (props.full) {
        className += ' w-100'
    }
    return (
        <button 
            {...props}
            className={`${props?.className ?? ''} ${className} v-ui-button`}
        >
            {props.isLoading ? (
                <>
                    <CircularLoader />
                    {props.loadingText}
                </>
            ) : (
                props.children
            )}
        </button>
    )
};

export default VButton;