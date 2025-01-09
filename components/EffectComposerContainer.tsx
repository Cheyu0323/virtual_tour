import useLightStore from "@/store/useLightStore";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";

const EffectComposerContainer = () => {
    const meshRef = useRef<THREE.Mesh>(new THREE.Mesh());
    const highlightList = useLightStore().highlightList;

    console.log("meshRef", meshRef);
    return (
        <>
            <mesh ref={meshRef} position={[0, -10, 0]}>
                <boxGeometry args={[10, 10, 10]} />
                <meshStandardMaterial
                    color="orange"
                    emissiveIntensity={0}
                    toneMapped={false}
                    emissive="orange"
                />
            </mesh>
            <Suspense fallback={null}>
                <EffectComposer autoClear={false}>
                    <Outline
                        selection={[...highlightList, meshRef.current]}
                        selectionLayer={1}
                        edgeStrength={100}
                        pulseSpeed={0}
                        kernelSize={0}
                        blur={false}
                    />

                    {/* <Bloom
                        intensity={1}
                        luminanceThreshold={0.8}
                        luminanceSmoothing={0.5}
                        mipmapBlur={false}
                    /> */}
                </EffectComposer>
            </Suspense>
        </>
    );
};

export default EffectComposerContainer;
