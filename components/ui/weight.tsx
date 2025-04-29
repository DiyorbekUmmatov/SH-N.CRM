import React from 'react';


export default function Weight() { 

    return (
        <div className="flex flex-col h-[550px] justify-center items-center p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Weight Management</h1>
            <div>
                <span className="font-bold">`Total Weight: 458,290 kg`</span>
            </div>
            <div>
                <input className="w-[400px]" id='num1' type="range" />
            </div>
        </div>
    )
}