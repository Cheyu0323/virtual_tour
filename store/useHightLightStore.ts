import { create } from "zustand";
import * as THREE from "three";
import useGLTFStore from "./useGLTFStore";
import useLightBulbStore from "./useLightBulbStore";

type HightLightStoreType = {
    highlightList: Array<THREE.Mesh>;
    handleToggleHightLight: (meshName: string) => void;
    handleRestList: () => void;
};
const useHightLightStore = create<HightLightStoreType>((set) => ({
    highlightList: [],
    handleToggleHightLight: (meshName) =>
        set((state) => {
            const gltf = useGLTFStore.getState().gltf;
            const toggleLightBulb =
                useLightBulbStore.getState().handleToggleLightBulb;
            if (gltf == null) return { ...state };
            const nodes = gltf.nodes;
            const highlightList = state.highlightList;
            const isActive = highlightList.find(
                (item) => item.name == meshName
            );
            if (isActive) {
                toggleLightBulb({ wireName: meshName, display: false });
                return {
                    highlightList: state.highlightList.filter(
                        (item) => item.name != meshName
                    ),
                };
            }
            toggleLightBulb({ wireName: meshName, display: true });
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

export default useHightLightStore;
