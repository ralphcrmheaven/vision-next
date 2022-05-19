import React from 'react';

const CxInput = (props:any) => {
    return (
        <input 
            {...props}
            className={`${props?.className ?? ''} v-ui-element`}
        />
    );
};

export default CxInput;