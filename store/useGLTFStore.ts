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
