import React from 'react';
import chamicon from '../../assets/images/chamicon.png'


const ChamResponse = (props:any) => {
    const { data } = props;
    return (
            <div className="flex items-center mb-4">
                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                    <img className="rounded-full w-10 h-10"
                    src={chamicon} />
                    <a href="#" className="block text-xs hover:underline">Cham the Chameleon</a>
                </div>
                <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
                    <div className="display-linebreak"><span>{data.body ? data.body : 'No response.'}</span></div>
                    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
                </div>
            </div>

    );
};

export default ChamResponse;