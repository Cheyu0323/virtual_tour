import useCameraStore from "@/store/useCameraStore";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
// import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import gsap from "gsap";

const OrbitControl = () => {
    const controls = useRef<OrbitControlsImpl>(null);
    const cameraRef = useRef<gsap.core.Tween>();
    // const initOrbitControl = useCameraStore(
    //     (state) => state.handleInitOrbitControl
    // );
    // const isPanoramic = useCameraStore((state) => state.isPanoramic);

    // useEffect(() => {
    //     if (controls.current == null) return;
    //     initOrbitControl(controls.current);
    // }, [controls, initOrbitControl]);

    // useFrame(({ camera }) => {
    //     if (!isPanoramic) return;
    //     if (controls.current == null) return;
    //     const forward = new THREE.Vector3();
    //     camera.getWorldDirection(forward);
    //     controls.current.target.copy(camera.position).add(forward);
    // });

    const { camera } = useThree();
    const cameraPosition = useCameraStore().cameraPosition;
    const orbitTarget = useCameraStore().orbitTarget;

    const updateCameraOrbit = () => {
        if (controls.current == null) return;
        controls.current.target.set(
            orbitTarget.x,
            orbitTarget.y,
            orbitTarget.z
        );
    };

    useFrame(() => {
        if (controls.current == null) return;
        controls.current.update();
    });

    useEffect(() => {
        if (controls.current == null) return;
        updateCameraOrbit();
        console.log("-cameraPosition", cameraPosition);
        const tl = gsap.to(camera.position, {
            x: cameraPosition.x,
            y: cameraPosition.y,
            z: cameraPosition.z,
            duration: 1,
            ease: "power4.out",
            onUpdate: () => updateCameraOrbit(),
            onComplete: () => updateCameraOrbit(),
        });
        cameraRef.current = tl;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cameraPosition]);

    // useEffect(() => {
    //     window.addEventListener("click", () => {
    //         console.log("___");
    //         cameraRef.current?.kill();
    //     });
    // }, [window]);

    return (
        <OrbitControls
            ref={controls}
            enablePan={false}
            dampingFactor={0.5}
            target={[0, 0, 0]}
            onEnd={() => updateCameraOrbit()}
        />
    );
};

export default OrbitControl;
