"use client";
import { useProgress } from "@react-three/drei";
import React from "react";

const Progress = () => {
    const { progress } = useProgress();
    return (
        <div
            id="progress"
            className="text-8xl tracking-wider font-extrabold text-white/70 pointer-events-none"
        >
            {Math.round(progress)}%
        </div>
    );
};

export default Progress;
