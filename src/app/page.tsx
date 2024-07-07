"use client";

import OurComp from "@/components/OurComp";
import SimpleSimonLayout from "@/components/Quadrant";
import { useState, useEffect } from "react";
import { simonLevels } from "../pattern/pattern";

const sounds = [
  "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound1.mp3",
  "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound2.mp3",
  "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound3.mp3",
  "https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound4.mp3",
];

export default function Home() {

  return (
    // <SimpleSimonLayout />
    <div className="w-screen h-screen">
      <OurComp />
    </div>
  );
}
