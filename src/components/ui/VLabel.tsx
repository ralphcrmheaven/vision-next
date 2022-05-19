import React from 'react';

const CxLabel = (props:any) => {
    return <label 
                {...props}
                className={`${props?.className ?? ''} w-full mb-4`}
                style={{display: 'block'}}
            >
                {props.children}
            </label>;
};

export default CxLabel;