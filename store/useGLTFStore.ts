import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { create } from "zustand";
import * as THREE from "three";

export type GLTFResultType = GLTF & {
    nodes: {
        Pyramid: THREE.Mesh;
    };
    materials: {
        ["default"]: THREE.MeshStandardMaterial;
        ["Class_Material"]: THREE.MeshPhysicalMaterial;
        ["Wall_Material"]: THREE.MeshStandardMaterial;
        ["AreaBox_1_Material"]: THREE.MeshStandardMaterial;
        ["AreaBox_2_Material"]: THREE.MeshStandardMaterial;
        ["AreaBox_3_Material"]: THREE.MeshStandardMaterial;
        ["AreaBox_4_Material"]: THREE.MeshStandardMaterial;
        ["AreaBox_5_Material"]: THREE.MeshStandardMaterial;
        ["AreaBox_6_Material"]: THREE.MeshStandardMaterial;
        ["AreaBox_7_Material"]: THREE.MeshStandardMaterial;
        ["Light_Socket_Material"]: THREE.MeshStandardMaterial;
    };
};
type GLTFStoreType = {
    gltf: GLTFResultType | null;
    handleSaveGLTF: (gltf: GLTFResultType) => void;
};
const useGLTFStore = create<GLTFStoreType>((set) => ({
    gltf: null,
    handleSaveGLTF: (gltf: GLTFResultType) =>
        set(() => {
            return { gltf: gltf };
        }),
}));
export default useGLTFStore;
