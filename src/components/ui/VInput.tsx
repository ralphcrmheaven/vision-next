import React from 'react';

const VInput = (props:any) => {
    return (
        <input 
            {...props}
            className={`${props?.className ?? ''} v-ui-element`}
        />
    );
};

export default VInput;