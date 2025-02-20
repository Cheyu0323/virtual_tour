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
    currentRoom: string | null;
    handleTogglePerspective: () => void;
    handleSwitchFloor: (floor: FloorType) => void;
    handleSwitchRoom: (room: string | null) => void;
};

const useSceneStore = create<SceneStoreType>((set) => ({
    isPerspective: false,
    currentFloor: "Sky",
    currentRoom: null,
    handleTogglePerspective: () =>
        set((state) => {
            return { ...state, isPerspective: !state.isPerspective };
        }),
    handleSwitchFloor: (floor: FloorType) =>
        set((state) => {
            return { ...state, currentFloor: floor };
        }),
    handleSwitchRoom: (room: string | null) =>
        set((state) => {
            return { ...state, currentRoom: room };
        }),
}));

export default useSceneStore;
