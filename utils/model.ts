import * as THREE from "three";
const hiddenAllChildMesh = ({
    node,
    visible,
}: {
    node: THREE.Mesh;
    visible: boolean;
}) => {
    const hiddenMesh = (node: THREE.Mesh, visible: boolean) => {
        node.visible = visible;
        node.children.forEach((child) =>
            hiddenMesh(child as THREE.Mesh, visible)
        );
    };
    hiddenMesh(node, visible);
};

export { hiddenAllChildMesh };
