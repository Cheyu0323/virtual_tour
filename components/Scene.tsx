"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, Stats } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import Model from "./Model";
import EffectComposerContainer from "./EffectComposerContainer";
import OrbitControl from "./OrbitControl";

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
                <EffectComposerContainer />
                <OrbitControl />
                <Environment preset="sunset" environmentIntensity={0.7} />
            </Canvas>
        </>
    );
};

export default Scene;
