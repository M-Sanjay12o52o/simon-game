import React from 'react';

const SimpleSimonLayout = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="relative w-64 h-64">
                {/* Outer circle */}
                <div className="absolute inset-0 border-4 border-black rounded-full"></div>

                {/* Quadrant lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-red-500"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-full bg-blue-500"></div>
                </div>

                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-black rounded-full"></div>
            </div>
        </div>
    );
};

export default SimpleSimonLayout;