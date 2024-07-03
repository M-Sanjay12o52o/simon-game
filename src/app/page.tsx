"use client"

import OurComp from '@/components/OurComp';
import SimpleSimonLayout from '@/components/Quadrant';
import { useState, useEffect } from 'react';

const sounds = [
  "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound1.mp3",
  "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound2.mp3",
  "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound3.mp3",
  "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound4.mp3"
];

export default function Home() {
  const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const audioElems = sounds.map((sound) => new Audio(sound));
    setAudioElements(audioElems);
  }, []);

  const handleClick = (index: number) => {
    console.log(index);
    setActiveIndex(index);
    if (audioElements[index]) {
      audioElements[index].play();
    }
    setTimeout(() => setActiveIndex(null), 300); // reset after 300ms
  }

  const getColor = (index: number) => {
    const colors = ["bg-red-700", "bg-blue-700", "bg-green-700", "bg-yellow-700"];
    const activeColors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
    return activeIndex === index ? activeColors[index] : colors[index];
  }

  return (
    // <SimpleSimonLayout />
    <OurComp />
  );
}
