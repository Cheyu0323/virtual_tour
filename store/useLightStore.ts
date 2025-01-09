import { create } from "zustand";
import * as THREE from "three";
import useGLTFStore from "./useGLTFStore";

type LightStoreType = {
    highlightList: Array<THREE.Mesh>;
    handleToggleHightLight: (meshName: string) => void;
    handleRestList: () => void;
};
const useLightStore = create<LightStoreType>((set, get) => ({
    highlightList: [],
    handleToggleHightLight: (meshName) =>
        set((state) => {
            const gltf = useGLTFStore.getState().gltf;
            if (gltf == null) return { ...state };
            const nodes = gltf.nodes;
            const highlightList = state.highlightList;
            const isActive = highlightList.find(
                (item) => item.name == meshName
            );
            if (isActive) {
                return {
                    highlightList: state.highlightList.filter(
                        (item) => item.name != meshName
                    ),
                };
            }
            if (nodes[meshName as keyof typeof nodes] != null) {
                return {
                    highlightList: [
                        ...state.highlightList,
                        nodes[meshName as keyof typeof nodes],
                    ],
                };
            }
            return { ...state };
        }),
    handleRestList: () =>
        set(() => {
            return { highlightList: [] };
        }),
}));

export default useLightStore;
