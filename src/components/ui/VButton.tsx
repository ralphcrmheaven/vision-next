import React from 'react';

const VButton = (props:any) => {
    return (
        <button 
            {...props}
            className={`${props?.className} v-ui-button`}
        >
            {props.children}
        </button>
    )
};

export default VButton;