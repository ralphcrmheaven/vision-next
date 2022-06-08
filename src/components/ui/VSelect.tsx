import React from 'react';

const VSelect = (props:any) => {
    return (
        <select
            {...props}
            className={`${props?.className ?? ''} v-ui-element`}
        >
            {props?.options?.map((option:any, index:any) => {
                return  <option 
                            value={option?.value}
                            key={index}
                            // selected={(option?.value === props.value)? true : false}
                        >
                            {option?.label}
                        </option>
            })}
        </select>
    );
};

export default VSelect;