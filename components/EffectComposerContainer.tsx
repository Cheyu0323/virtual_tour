// import { Bloom, EffectComposer } from "@react-three/postprocessing";
import React, { useRef } from "react";
import * as THREE from "three";

const EffectComposerContainer = () => {
    const meshRef = useRef<THREE.Mesh>(new THREE.Mesh());
    console.log("meshRef", meshRef);
    return (
        <>
            {/* <mesh ref={meshRef} position={[0, -10, 0]}>
                <boxGeometry args={[10, 10, 10]} />
                <meshStandardMaterial
                    color="orange"
                    emissiveIntensity={0}
                    toneMapped={false}
                    emissive="orange"
                />
            </mesh> */}
            {/* <Suspense fallback={null}>
                <EffectComposer autoClear={false}>
                    <Outline
                        selection={meshRef}
                        selectionLayer={100}
                        edgeStrength={100}
                        pulseSpeed={0}
                        kernelSize={100}
                        blur={false}
                    />
                    <Bloom
                        intensity={1}
                        luminanceThreshold={0.8}
                        luminanceSmoothing={0.5}
                        mipmapBlur={false}
                    />
                </EffectComposer>
            </Suspense> */}
        </>
    );
};

export default EffectComposerContainer;
