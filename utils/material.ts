import * as THREE from "three";
import gsap from "gsap";

const updateMaterialOpacity = ({
    node,
    display,
    opacity = 0.5,
    duration = 0.4,
}: {
    node: THREE.Mesh;
    display: boolean;
    opacity?: number;
    duration?: number;
}) => {
    const oriMaterial = (node.material as THREE.MeshStandardMaterial).clone();
    oriMaterial.transparent = true;
    gsap.to(oriMaterial, {
        opacity: display ? 1 : opacity,
        duration: duration,
        ease: "power1.out",
        onComplete: () => {
            oriMaterial.needsUpdate = true;
        },
    });
    node.material = oriMaterial;
};

const updateMaterialDepthTest = ({ node }: { node: THREE.Mesh }) => {
    const oriMaterial = (node.material as THREE.MeshStandardMaterial).clone();
    oriMaterial.transparent = true;
    oriMaterial.opacity = 1;
    oriMaterial.depthTest = false;
    node.material = oriMaterial;
};

const updateMaterialEmissiveIntensity = ({
    node,
    display,
}: {
    node: THREE.Mesh;
    display: boolean;
}) => {
    const oriMaterial = (node.material as THREE.MeshStandardMaterial).clone();
    oriMaterial.emissiveIntensity = display ? 1 : 0;
    node.material = oriMaterial;
};

export {
    updateMaterialOpacity,
    updateMaterialDepthTest,
    updateMaterialEmissiveIntensity,
};
