"use client";
import React, { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import useSceneStore, { FloorType } from "@/store/useSceneStore";
import * as THREE from "three";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

type HotspotDomType = {
    title: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

type HotspotType = {
    floor: FloorType;
    position: [number, number, number];
};

const HotspotDom: React.FC<
    HotspotDomType & React.HTMLAttributes<HTMLDivElement>
> = ({ title, onClick }) => {
    const hotspot = useRef<HTMLDivElement>(null);
    const hotspotTween = useRef<GSAPTimeline>();

    useEffect(() => {
        if (hotspot.current == null) return;
        hotspotTween.current = gsap
            .timeline({
                paused: true,
                ease: "power1.in",
            })
            .to(hotspot.current.children[0], {
                duration: 0.1,
                opacity: 0,
            })
            .to(hotspot.current, {
                duration: 0.2,
                width: "auto",
            })
            .to(hotspot.current.children[1], {
                duration: 0.3,
                opacity: 1,
            });
    }, []);

    const onMouseEnterHandler = () => {
        if (hotspotTween.current == null) return;
        hotspotTween.current.play();
    };
    const onMouseLeaveHandler = () => {
        if (hotspotTween.current == null) return;
        hotspotTween.current.reverse();
    };

    return (
        <div
            className="group cursor-pointer relative w-7 h-7"
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={onClick}
        >
            <div
                ref={hotspot}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 overflow-hidden  rounded-full px-3 bg-white"
            >
                <Plus className="h-6 w-6 stroke-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black " />
                <div className="opacity-0 text-center font-bold leading-7 tracking-wide px-2 text-[#5D5D5D] text-nowrap">
                    {title}
                </div>
            </div>
        </div>
    );
};

const RoomAreaHotSpot: React.FC<HotspotType & HotspotDomType> = ({
    position,
    title,
    floor,
    onClick,
}) => {
    const ref = useRef<THREE.Group>(null);
    const [isOccluded, setOccluded] = useState<boolean>();
    const [isInRange, setInRange] = useState<boolean>();
    const { currentFloor } = useSceneStore();

    const isVisible =  isInRange && !isOccluded && currentFloor == floor;
    // const isVisible = true;

    // Test distance
    const vec = new THREE.Vector3();
    useFrame((state) => {
        if (ref.current == null) return;
        const range =
            state.camera.position.distanceTo(
                ref.current.getWorldPosition(vec)
            ) <= 150;

        if (range !== isInRange) setInRange(range);
    });

    console.log("isOccluded", isOccluded);

    return (
        <group ref={ref}>
            <Html
                occlude
                onOcclude={setOccluded}
                style={{
                    transition: "all 0.2s",
                    opacity: isVisible ? 1 : 0,
                    transform: `scale(${isVisible ? 1 : 0.25})`,
                }}
                position={position}
            >
                <HotspotDom title={title} onClick={onClick} />
            </Html>
        </group>
    );
};

export default RoomAreaHotSpot;
