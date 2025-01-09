import { create } from "zustand";
import * as THREE from "three";
import useGLTFStore from "./useGLTFStore";

type LightStoreType = {
    highlightList: Array<THREE.Mesh>;
    handleAddHightLight: (meshName: string) => void;
};
const useLightStore = create<LightStoreType>((set) => ({
    highlightList: [],
    handleAddHightLight: (meshName) =>
        set((state) => {
            const gltf = useGLTFStore.getState().gltf;
            if (gltf == null) return { ...state };
            const nodes = gltf.nodes;
            if (nodes[meshName as keyof typeof nodes] != null) {
                return {
                    ...state,
                    highlightList: [
                        ...state.highlightList,
                        nodes[meshName as keyof typeof nodes],
                    ],
                };
            }
            console.log(nodes[meshName as keyof typeof nodes]);

            return { ...state };
        }),
}));

export default useLightStore;
