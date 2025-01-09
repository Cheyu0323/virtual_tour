import { create } from "zustand";
import * as THREE from "three";
// import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type CameraStoreType = {
    camera: THREE.Camera | null;
    // orbit: OrbitControlsImpl | null;
    orbitTarget: THREE.Vector3Like;
    cameraPosition: THREE.Vector3Like;
    isPanoramic: boolean;
    // handleInitCamera: (camera: THREE.Camera) => void;
    // handleInitOrbitControl: (orbit: OrbitControlsImpl) => void;
    handleUpdateCameraPosition: (position: THREE.Vector3Like) => void;
    handleUpdateOrbitTarget: (position: THREE.Vector3Like) => void;
    handletogglePanoramic: (isPanoramic?: boolean) => void;
};

const useCameraStore = create<CameraStoreType>((set) => ({
    camera: null,
    // orbit: null,
    orbitTarget: { x: 0, y: 0, z: 0 },
    cameraPosition: { x: 20, y: 10, z: 0 },
    isPanoramic: false,
    // handleInitCamera: (camera: THREE.Camera) =>
    //     set((state) => {
    //         return { ...state, camera };
    //     }),
    // handleInitOrbitControl: (orbit: OrbitControlsImpl) =>
    //     set((state) => {
    //         return { ...state, orbit };
    //     }),
    handleUpdateCameraPosition: (position: THREE.Vector3Like) =>
        set(() => {
            // if (state.camera == null) return { camera: state.camera };
            // gsap.to(state.camera?.position, {
            //     x: position.x,
            //     y: position.y,
            //     z: position.z,
            //     duration: 1,
            //     ease: "power1.out",
            //     onUpdate: () => state.handleUpdateOrbitTarget(),
            //     onComplete: () => state.handleUpdateOrbitTarget(),
            // });

            return { cameraPosition: position };
        }),
    handleUpdateOrbitTarget: (position: THREE.Vector3Like) =>
        set((state) => {
            return { ...state, orbitTarget: position };
        }),
    handletogglePanoramic: (isPanoramic) =>
        set((state) => {
            if (isPanoramic != null) {
                if (isPanoramic) return { ...state, isPanoramic: isPanoramic };
                return {
                    ...state,
                    isPanoramic: false,
                    orbitTarget: { x: 0, y: 0, z: 0 },
                };
            }
            if (state.isPanoramic)
                return { ...state, isPanoramic: !state.isPanoramic };
            return {
                ...state,
                isPanoramic: !state.isPanoramic,
                orbitTarget: { x: 0, y: 0, z: 0 },
            };
        }),
}));

export default useCameraStore;
