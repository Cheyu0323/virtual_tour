import { create } from "zustand";

export type FloorType =
    | "Outdoors"
    | "1F"
    | "2F"
    | "3F"
    | "4F"
    | "Top Floor"
    | "Sky";

type SceneStoreType = {
    isPerspective: boolean;
    currentFloor: FloorType;
    handleTogglePerspective: () => void;
    handleSwitchFloor: (floor: FloorType) => void;
};

const useSceneStore = create<SceneStoreType>((set) => ({
    isPerspective: false,
    currentFloor: "Sky",
    handleTogglePerspective: () =>
        set((state) => {
            return { ...state, isPerspective: !state.isPerspective };
        }),
    handleSwitchFloor: (floor: FloorType) =>
        set((state) => {
            return { ...state, currentFloor: floor };
        }),
}));

export default useSceneStore;
