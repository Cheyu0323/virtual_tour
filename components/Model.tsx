"use client";
import React, { useEffect } from "react";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import useSceneStore from "@/store/useSceneStore";
import { updateMaterialOpacity } from "@/utils/material";
import * as THREE from "three";
import useGLTFStore, { GLTFResultType } from "@/store/useGLTFStore";
import useCameraStore from "@/store/useCameraStore";

const handlePerspectiveModel = ({
    meshs,
    isPerspective,
}: {
    meshs: Array<THREE.Mesh>;
    isPerspective: boolean;
}) => {
    meshs.map((mesh) => {
        updateMaterialOpacity({
            node: mesh,
            display: isPerspective,
        });
    });
};

const Model: React.FC = () => {
    const gltf = useLoader(GLTFLoader, "/ori_build.gltf") as GLTFResultType;
    const isPerspective = useSceneStore().isPerspective;
    const currentFloor = useSceneStore().currentFloor;
    const saveGLTF = useGLTFStore((state) => state.handleSaveGLTF);

    const updateCameraPosition = useCameraStore().handleUpdateCameraPosition;
    const isPanoramic = useCameraStore((state) => state.isPanoramic);
    const togglePanoramic = useCameraStore(
        (state) => state.handletogglePanoramic
    );

    useEffect(() => {
        saveGLTF(gltf);
    }, [saveGLTF, gltf]);

    // 玻璃反射
    const classMaterial = gltf.materials[
        "Class_Material"
    ] as THREE.MeshPhysicalMaterial;
    classMaterial.transparent = true;
    classMaterial.roughness = 0;
    classMaterial.metalness = 1;
    classMaterial.opacity = 0.6;
    classMaterial.reflectivity = 1;

    const lightBulbMaterial = gltf.materials["Light_Socket_Material"];
    lightBulbMaterial.emissiveIntensity = 0;

    Object.entries(gltf.nodes)
        .filter(([key]) => key.includes("AreaBox") || key.includes("Text"))
        .map(([, value]) => {
            value.visible = false;
            updateMaterialOpacity({
                node: value,
                display: false,
            });
        });

    useEffect(() => {
        const nodes = gltf.nodes;

        handlePerspectiveModel({
            meshs: [
                nodes["1F_Ceiling" as keyof typeof nodes] as THREE.Mesh,
                nodes["1F_Wall" as keyof typeof nodes] as THREE.Mesh,
                nodes["1F_Floor" as keyof typeof nodes] as THREE.Mesh,
                nodes["2F_Ceiling" as keyof typeof nodes] as THREE.Mesh,
                nodes["2F_Wall" as keyof typeof nodes] as THREE.Mesh,
                nodes["2F_Floor" as keyof typeof nodes] as THREE.Mesh,
                nodes["2F_Balcony" as keyof typeof nodes] as THREE.Mesh,
                nodes["3F_Ceiling" as keyof typeof nodes] as THREE.Mesh,
                nodes["3F_Wall" as keyof typeof nodes] as THREE.Mesh,
                nodes["3F_Floor" as keyof typeof nodes] as THREE.Mesh,
            ],
            isPerspective: !isPerspective,
        });
        if (currentFloor != "Sky") {
            gltf.scene.children.map((mesh) => {
                if (!mesh.name.includes(currentFloor)) {
                    mesh.visible = false;
                } else {
                    mesh.visible = true;
                    if (
                        mesh.name == `${currentFloor}_Ceiling` &&
                        !isPanoramic
                    ) {
                        mesh.visible = false;
                    }
                }
            });
            return;
        } else {
            gltf.scene.children.map((mesh) =>
                mesh.name.includes("AreaBox") || mesh.name.includes("Text")
                    ? (mesh.visible = false)
                    : (mesh.visible = true)
            );
        }
    }, [currentFloor, isPerspective, gltf, isPanoramic]);

    const handleClickModel = (e: ThreeEvent<MouseEvent>) => {
        const floorGap = 17;
        if (e.object.name.includes("AreaBox")) {
            togglePanoramic(true);
            updateCameraPosition({
                x: 0,
                y: 7 + floorGap * (parseInt(currentFloor) - 1),
                z: 0,
            });
        }

        if (!isPanoramic) return;
        if (!e.object.name.includes("Floor")) return;
        const intersections = e.intersections.every((item) =>
            item.object.name.includes("Floor")
        );
        if (!intersections) return;
        const floorMesh = e.intersections.find((item) =>
            item.object.name.includes("Floor")
        );
        if (floorMesh == null || floorMesh.face == null) return;
        updateCameraPosition({
            x: floorMesh.point.x + floorMesh.face.normal.x,
            y: 7 + floorGap * (parseInt(currentFloor) - 1),
            z: floorMesh.point.z + floorMesh.face.normal.z,
        });
    };
    const handlePointerEnter = (e: ThreeEvent<MouseEvent>) => {
        if (e.object.name.includes("AreaBox")) {
            updateMaterialOpacity({
                node: e.object as THREE.Mesh,
                display: false,
                opacity: 0.75,
            });
        }
    };
    const handlePointerLeave = (e: ThreeEvent<MouseEvent>) => {
        if (e.object.name.includes("AreaBox")) {
            updateMaterialOpacity({
                node: e.object as THREE.Mesh,
                display: false,
            });
        }
    };
    gltf.scene.scale.setScalar(5);

    return (
        <>
            <primitive
                object={gltf.scene}
                onClick={handleClickModel}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            />
        </>
    );
};

export default Model;
