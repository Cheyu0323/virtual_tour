import useCameraStore from "@/store/useCameraStore";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const MoveHotspot = () => {
    const hotspotRef = useRef<THREE.Mesh>(null);

    const isPanoramic = useCameraStore((state) => state.isPanoramic);
    // const scene = useThree((state) => state.scene);

    useFrame(({ scene, raycaster }) => {
        if (!isPanoramic) return;
        if (hotspotRef.current == null) return;
        const floorMesh = scene.children[0].children.filter((item) =>
            item.name.includes("Floor")
        );
        const intersects = raycaster.intersectObjects(floorMesh);
        if (intersects[0]) {
            if (hotspotRef.current == null) return;
            const p = intersects[0].point;
            hotspotRef.current.position.copy({
                x: p.x,
                y: p.y + 0.2,
                z: p.z,
            });
            hotspotRef.current.scale.setScalar(0.5);
            return;
        }
        hotspotRef.current.scale.setScalar(0);
    });

    // const handleMoveCamera = (e: ThreeEvent<MouseEvent>) => {
    //     console.log("e", e);
    //     if (hotspotRef.current == null) return;
    //     if (e == null || e.face == null) return;
    //     updateCameraPosition({
    //         x: e.point.x + e.face.normal.x,
    //         y: 7,
    //         z: e.point.z + e.face.normal.z,
    //     });
    //     updateOrbitTarget({
    //         x: e.point.x + e.face.normal.x,
    //         y: 7,
    //         z: e.point.z + e.face.normal.z,
    //     });
    // };

    // useEffect(() => {
    //     if (isPanoramic) return;
    //     if (hotspotRef.current == null) return;
    //     hotspotRef.current.scale.setScalar(0);
    // }, [isPanoramic]);
    // useFrame(({ mouse, raycaster }) => {
    //     console.log("mouse", mouse);

    //     if (hotspotRef.current) {
    //         const intersects = raycaster.intersectObjects([
    //             scene.children.filter((item) => item.name.includes("Floor")),
    //         ]);
    //         if (intersects[0]) {
    //             const p = intersects[0].point;
    //             if (hotspotRef.current) {
    //                 hotspotRef.current.position.copy(p);
    //             }
    //         }
    //     }
    // });

    if (!isPanoramic) return <></>;
    return (
        <mesh
            ref={hotspotRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.1, 0]}
            scale={1}
        >
            <ringGeometry args={[0.8, 1.2, 32]} />
            <meshStandardMaterial transparent color="black" opacity={1} />
        </mesh>
    );
};

export default MoveHotspot;
