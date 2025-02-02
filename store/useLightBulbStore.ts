import { create } from "zustand";
import * as THREE from "three";
import useGLTFStore from "./useGLTFStore";
import lightBulbData from "@/public/lightBulbData.json";
import { updateMaterialEmissiveIntensity } from "@/utils/material";

type LightBulbStoreType = {
    lightBulbList: Array<THREE.Mesh>;
    handleToggleLightBulb: ({
        wireName,
        display,
    }: {
        wireName: string;
        display: boolean;
    }) => void;
    handleRestList: () => void;
};

const useLightBulbStore = create<LightBulbStoreType>((set) => ({
    lightBulbList: [],
    handleToggleLightBulb: ({
        wireName,
        display,
    }: {
        wireName: string;
        display: boolean;
    }) =>
        set((state) => {
            const gltf = useGLTFStore.getState().gltf;
            if (gltf == null) return { ...state };
            const nodes = gltf.nodes;
            const findBulb = lightBulbData.find(
                (bulb) => bulb.wire == wireName
            );
            if (findBulb == null) return { ...state };
            let bulbMeshList = [...state.lightBulbList] as Array<THREE.Mesh>;
            findBulb.bulb.map((bulb) => {
                if (nodes[bulb as keyof typeof nodes] != null) {
                    if (display) {
                        bulbMeshList.push(nodes[bulb as keyof typeof nodes]);
                        updateMaterialEmissiveIntensity({
                            node: nodes[bulb as keyof typeof nodes]
                                .children[0] as THREE.Mesh,
                            display: true,
                        });
                    } else {
                        updateMaterialEmissiveIntensity({
                            node: nodes[bulb as keyof typeof nodes]
                                .children[0] as THREE.Mesh,
                            display: false,
                        });
                        const filter = bulbMeshList.filter(
                            (item) => item.name != bulb
                        );
                        bulbMeshList = [...filter];
                    }
                }
            });

            return { ...state, lightBulbList: bulbMeshList };
        }),
    handleRestList: () =>
        set((state) => {
            state.lightBulbList.map((bulb) =>
                updateMaterialEmissiveIntensity({
                    node: bulb.children[0] as THREE.Mesh,
                    display: false,
                })
            );
            return { lightBulbList: [] };
        }),
}));

export default useLightBulbStore;
