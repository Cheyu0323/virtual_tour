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
                    position: [120, 40, 0],
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
                {/* <RoomAreaHotSpot
                    floor="1F"
                    position={[20, 35, -10]}
                    title="廁所"
                    onClick={() => {
                        console.log("_");
                    }}
                /> */}

                {/* <RoomAreaHotSpot
                    floor="2F"
                    position={[-3, 40, -14]}
                    title="廁所"
                    onClick={() => {
                        console.log("_");
                    }}
                /> */}
                <Environment preset="sunset" environmentIntensity={0.5} />
            </Canvas>
        </>
    );
};

export default Scene;
