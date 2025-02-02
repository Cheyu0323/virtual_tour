import { create } from "zustand";
import * as THREE from "three";

type CameraStoreType = {
    camera: THREE.Camera | null;
    orbitTarget: THREE.Vector3Like;
    cameraPosition: THREE.Vector3Like;
    isPanoramic: boolean;
    handleUpdateCameraPosition: (position: THREE.Vector3Like) => void;
    handleUpdateOrbitTarget: (position: THREE.Vector3Like) => void;
    handletogglePanoramic: (isPanoramic?: boolean) => void;
};

const useCameraStore = create<CameraStoreType>((set) => ({
    camera: null,
    orbitTarget: { x: 0, y: 20, z: 0 },
    cameraPosition: { x: 120, y: 40, z: 0 },
    isPanoramic: false,
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
                return {
                    ...state,
                    isPanoramic: isPanoramic,
                };
            }
            return { ...state, isPanoramic: !state.isPanoramic };
        }),
}));

export default useCameraStore;
