"use client"

import React, { useState, useEffect } from 'react';

const sounds = [
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound1.mp3",
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound2.mp3",
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound3.mp3",
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound4.mp3"
];

export default function OurComp() {
    const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [shadowColor, setShadowColor] = useState("shadow-black"); // Initial shadow color

    console.log("shadowColor", shadowColor);

    const shadowColors = ["shadow-red-500", "shadow-blue-500", "shadow-green-500", "shadow-yellow-500"];

    useEffect(() => {
        const audioElems = sounds.map((sound) => new Audio(sound));
        setAudioElements(audioElems);
    }, []);

    const handleClick = (index: number) => {
        console.log(index);
        setActiveIndex(index);

        // Update shadow color
        const newShadowColor = shadowColors[index];
        setShadowColor(newShadowColor);

        if (audioElements[index]) {
            audioElements[index].play();
        }
        setTimeout(() => {
            setActiveIndex(null);
            setShadowColor("shadow-black");
        }, 300); // reset after 300ms
    }

    const getColor = (index: number) => {
        const colors = ["bg-red-700", "bg-blue-700", "bg-green-700", "bg-yellow-700"];
        const activeColors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
        return activeIndex === index ? activeColors[index] : colors[index];
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className={`relative w-96 h-96 rounded-full bg-gray-900 shadow-2xl overflow-hidden ${shadowColor}`}>
                <div
                    className={`absolute w-40 h-40 ${getColor(0)} top-2 left-2 transform hover:scale-110 transition-transform duration-300 shadow-lg
                    shadow-red-500
                    rounded-lg
                    `}
                    onClick={() => handleClick(0)}
                ></div>
                <div
                    className={`absolute w-40 h-40 ${getColor(1)} top-2 right-2 transform hover:scale-110 transition-transform duration-300 shadow-lg
                    shadow-blue-500
                    rounded-lg
                    `}
                    onClick={() => handleClick(1)}
                ></div>
                <div className="absolute w-28 h-28 rounded-full bg-gray-400 shadow-2xl shadow-gray-950 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                </div>
                <div
                    className={`absolute w-40 h-40 ${getColor(2)} bottom-2 left-2 transform hover:scale-110 transition-transform duration-300 shadow-lg
                    shadow-green-500
                    rounded-lg
                    `}
                    onClick={() => handleClick(2)}
                ></div>
                <div
                    className={`absolute w-40 h-40 ${getColor(3)} bottom-2 right-2 transform hover:scale-110 transition-transform duration-300 shadow-lg
                    shadow-yellow-500
                    rounded-lg
                    `}
                    onClick={() => handleClick(3)}
                ></div>
            </div>
        </div>
    );
}
