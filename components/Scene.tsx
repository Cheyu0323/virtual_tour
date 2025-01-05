"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import Model from "./Model";

const Scene = () => {
    return (
        <>
            <Canvas
                shadows={false}
                gl={{
                    toneMapping: THREE.CineonToneMapping,
                    toneMappingExposure: 0.5,
                    sortObjects: false,
                }}
                camera={{
                    fov: 70,
                    near: 0.1,
                    far: 1000,
                    position: [20, 10, 0],
                }}
                id="scene"
                className="opacity-0"
                onCreated={(gl) => {
                    console.log("gl", gl);
                    // gl.gl.sortObjects=false
                    // initCamera(gl.camera);
                }}
            >
                <Stats />
                <Model />
                <OrbitControls />
                <Environment preset="sunset" environmentIntensity={1} />
            </Canvas>
        </>
    );
};

export default Scene;
