"use client";
import React, { useEffect } from "react";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import useSceneStore from "@/store/useSceneStore";
import { updateMaterialOpacity } from "@/utils/material";
import * as THREE from "three";
import useGLTFStore, { GLTFResultType } from "@/store/useGLTFStore";

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
                    updateMaterialOpacity({
                        node: nodes[
                            `${currentFloor}_Ceiling` as keyof typeof nodes
                        ] as THREE.Mesh,
                        display: false,
                        opacity: 0.15,
                    });
                }
            });
        } else {
            gltf.scene.children.map((mesh) => (mesh.visible = true));
        }
    }, [currentFloor, isPerspective, gltf]);

    const handleClickModel = (e: ThreeEvent<MouseEvent>) => {
        console.log("- click mesh:", e.object.name);
    };
    const handleHoverModel = (e: ThreeEvent<MouseEvent>) => {
        console.log("- hover mesh:", e.object.name);
    };
    gltf.scene.scale.setScalar(5);
    return (
        <primitive
            object={gltf.scene}
            onClick={handleClickModel}
            onPointerOver={handleHoverModel}
        />
    );
};

export default Model;
