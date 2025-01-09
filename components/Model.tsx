"use client";
import React, { useEffect } from "react";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import useSceneStore from "@/store/useSceneStore";
import { updateMaterialOpacity } from "@/utils/material";
import * as THREE from "three";

const Model: React.FC = () => {
    const gltf = useLoader(GLTFLoader, "/ori_build.gltf");
    const isPerspective = useSceneStore().isPerspective;
    const currentFloor = useSceneStore().currentFloor;
    const handleClickModel = (e: ThreeEvent<MouseEvent>) => {
        console.log("- click mesh:", e.object.name);
    };

    console.log("-materials", gltf.materials);

    // 玻璃反射
    const classMaterial = gltf.materials[
        "Class_Material"
    ] as THREE.MeshPhysicalMaterial;
    classMaterial.transparent = true;
    classMaterial.roughness = 0;
    classMaterial.metalness = 1;
    classMaterial.opacity = 0.6;
    classMaterial.reflectivity = 1;

    useEffect(() => {
        const nodes = gltf.nodes;
        updateMaterialOpacity({
            node: nodes["1F_Ceiling" as keyof typeof nodes] as THREE.Mesh,
            display: !isPerspective,
        });
        updateMaterialOpacity({
            node: nodes["1F_Wall" as keyof typeof nodes] as THREE.Mesh,
            display: !isPerspective,
        });
        updateMaterialOpacity({
            node: nodes["1F_Floor" as keyof typeof nodes] as THREE.Mesh,
            display: !isPerspective,
        });
        updateMaterialOpacity({
            node: nodes["2F_Ceiling" as keyof typeof nodes] as THREE.Mesh,
            display: !isPerspective,
        });
        updateMaterialOpacity({
            node: nodes["2F_Wall" as keyof typeof nodes] as THREE.Mesh,
            display: !isPerspective,
        });
        updateMaterialOpacity({
            node: nodes["2F_Floor" as keyof typeof nodes] as THREE.Mesh,
            display: !isPerspective,
        });
        updateMaterialOpacity({
            node: nodes["2F_Balcony" as keyof typeof nodes] as THREE.Mesh,
            display: !isPerspective,
        });
        updateMaterialOpacity({
            node: nodes["3F_Ceiling" as keyof typeof nodes] as THREE.Mesh,
            display: !isPerspective,
        });
        updateMaterialOpacity({
            node: nodes["3F_Wall" as keyof typeof nodes] as THREE.Mesh,
            display: !isPerspective,
        });
        updateMaterialOpacity({
            node: nodes["3F_Floor" as keyof typeof nodes] as THREE.Mesh,
            display: !isPerspective,
        });
        if (currentFloor != "Sky") {
            gltf.scene.children.map((mesh) =>
                !mesh.name.includes(currentFloor)
                    ? (mesh.visible = false)
                    : (mesh.visible = true)
            );
        } else {
            gltf.scene.children.map((mesh) => (mesh.visible = true));
        }
    }, [currentFloor, isPerspective, gltf]);

    return <primitive onClick={handleClickModel} object={gltf.scene} />;
};

export default Model;
