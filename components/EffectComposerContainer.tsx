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
            <Suspense fallback={null}>
                <EffectComposer autoClear={false}>
                    <Outline
                        selection={highlightList}
                        selectionLayer={1}
                        edgeStrength={10}
                        pulseSpeed={0}
                        visibleEdgeColor={0xfb5607}
                        hiddenEdgeColor={0xfb5607}
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
