"use client"

import { simonLevels } from '@/pattern/pattern';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const sounds = [
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound1.mp3",
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound2.mp3",
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound3.mp3",
    "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound4.mp3"
];

export default function Game() {
    const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [shadowColor, setShadowColor] = useState("shadow-black");
    const [sequence, setSequence] = useState<Object[]>([simonLevels]);
    const [automatic, setAutomatic] = useState(false);
    const [currentLevel, setCurrentLevel] = useState<Number | undefined>();
    const [score, setScore] = useState<number>(0);
    const [highestScore, setHighestScore] = useState<Number | undefined>(0);
    const [start, setStart] = useState(false);
    const [userInput, setUserInput] = useState<number[]>([]);

    console.log("userInput", userInput);

    const shadowColors = ["shadow-red-500", "shadow-blue-500", "shadow-green-500", "shadow-yellow-500"];

    useEffect(() => {
        const audioElems = sounds.map((sound) => new Audio(sound));
        setAudioElements(audioElems);
    }, []);

    const handleClick = (index: number) => {
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

        if (start) {
            setUserInput(prevInput => [...prevInput, index]);;
        }
    }

    const getColor = (index: number) => {
        const colors = ["bg-red-700", "bg-blue-700", "bg-green-700", "bg-yellow-700"];
        const activeColors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
        return activeIndex === index ? activeColors[index] : colors[index];
    }

    const automate = () => {
        setAutomatic(!automatic);
    }

    const startGame = () => {
        setStart(!start);
    }

    const playLevel = (levelIndex: number) => {
        const currentLevel = simonLevels[levelIndex];

        if (currentLevel) {
            setCurrentLevel(currentLevel.level);
            currentLevel.pattern.forEach((color, index) => {
                const timeoutId = setTimeout(() => {
                    handleClick(color === 'red' ? 0 : color === 'blue' ? 1 : color === 'green' ? 2 : 3);
                }, index * 1000)
            })
        }
    }

    useEffect(() => {
        let levelIndex = 0;
        let timeoutIds: any = [];

        const playSequence = () => {
            if (!automatic) return; // Stop the sequence if automatic is false
            const currentLevel = simonLevels[levelIndex];

            if (currentLevel) {
                setCurrentLevel(currentLevel.level);
                currentLevel.pattern.forEach((color, index) => {
                    const timeoutId = setTimeout(() => {
                        handleClick(color === 'red' ? 0 : color === 'blue' ? 1 : color === 'green' ? 2 : 3);
                    }, index * 1000); // Play each color after 1 second
                    timeoutIds.push(timeoutId); // Store the timeoutId to clear later
                });
                levelIndex++;
                if (levelIndex < simonLevels.length) {
                    const timeoutId = setTimeout(playSequence, currentLevel.pattern.length * 1000); // Move to the next level after the current sequence
                    timeoutIds.push(timeoutId); // Store the timeoutId to clear later
                }
            }
        };

        if (automatic) {
            playSequence();
        }

        return () => {
            timeoutIds.forEach((timeoutId: any) => clearTimeout(timeoutId)); // Clear all timeouts when the effect is cleaned up
        };
    }, [automatic]);

    useEffect(() => {
        if (start) {
            playLevel(0);;
        }
    }, [start])

    useEffect(() => {
        if (start && userInput.length === simonLevels[0].pattern.length) {
            compareUserInput();
        }
    }, [userInput])

    const compareUserInput = () => {
        const currentLevelPattern = simonLevels[0].pattern.map(color =>
            color === 'red' ? 0 : color === 'blue' ? 1 : color === 'green' ? 2 : 3
        )

        const isMatch = userInput.every((input, index) => input === currentLevelPattern[index]);

        if (isMatch) {
            setScore(prevScore => prevScore + 1);
        } else {
            console.log("User input does not match the pattern");
        }

        setUserInput([]);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className='flex flex-row'>
                {/* <button className='absolute top-0
             w-36 h-12 rounded-md bg-red-700' onClick={automate}>{automatic ? "Automatic" : "SetAutomatic"}
                </button> */}
                <button className='absolute top-0
            w-36 h-12 rounded-md bg-red-700' onClick={startGame}>
                    {start ? "Stop" : "Start"}
                </button>
            </div>
            <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-3 shadow-lg border-2 border-yellow-400 transform hover:scale-105 transition-all duration-300">
                <div className="text-yellow-300 text-xs uppercase tracking-wide font-bold mb-1">Current Level</div>
                <div className="text-white text-3xl font-extrabold">{currentLevel?.toString()}</div>
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
                <div>
                    <Link href={"/"}>QUIT</Link>
                </div>
                <div>
                    Your Score <span>{score?.toString()}</span>
                </div>
                <div>
                    Highest Score <span>{highestScore?.toString()}</span>
                </div>
            </div>
        </div>
    );
}
