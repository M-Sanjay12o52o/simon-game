"use client"

import { simonLevels } from '@/pattern/pattern';
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
    const [shadowColor, setShadowColor] = useState("shadow-black");
    const [sequence, setSequence] = useState<Object[]>([simonLevels]);
    const [automatic, setAutomatic] = useState(false);
    const [currentLevel, setCurrentLevel] = useState<Number | undefined>();

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

    const automate = () => {
        setAutomatic(!automatic);
    }

    useEffect(() => {
        if (automatic) {
            let levelIndex = 0;
            const playSequence = () => {
                const currentLevel = simonLevels[levelIndex];
                if (currentLevel) {
                    setCurrentLevel(currentLevel.level);
                    currentLevel.pattern.forEach((color, index) => {
                        setTimeout(() => {
                            handleClick(color === 'red' ? 0 : color === 'blue' ? 1 : color === 'green' ? 2 : 3);
                        }, index * 1000); // Play each color after 1 second
                    });
                    levelIndex++;
                    if (levelIndex < simonLevels.length) {
                        setTimeout(playSequence, currentLevel.pattern.length * 1000); // Move to the next level after the current sequence
                    }
                }
            };
            playSequence();
        }
    }, [automatic]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <button className='absolute top-0
             w-36 h-12 rounded-md bg-red-700' onClick={automate}>{automatic ? "Automatic" : "SetAutomatic"}
            </button>
            <div className='absolute top-0 left-0 text-white'>
                Current Level: {currentLevel?.toString()}
            </div>
            <div className={`relative w-96 h-96 rounded-full bg-gray-9000 shadow-2xl overflow-hidden ${shadowColor}`}>
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
            <div className="bg-red-700 flex flex-row justify-around w-full absolute bottom-0">
                <div>QUIT</div>
                <div>
                    Your Score <span>1</span>
                </div>
                <div>
                    Highest Score <span>1</span>
                </div>
            </div>
        </div>
    );
}
