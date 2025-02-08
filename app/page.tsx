"use client";
import Progress from "@/components/Progress";
import Scene from "@/components/Scene";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useProgress } from "@react-three/drei";
import ButtonIcon from "@/components/ButtonIcon";
import useSceneStore from "@/store/useSceneStore";
import FloorList from "@/components/FloorList";
import FloorInfoPanel from "@/components/FloorInfoPanel";
import { GoogleAnalytics } from "@next/third-parties/google";
gsap.registerPlugin(useGSAP);

const Home = () => {
    const container = useRef<HTMLDivElement>(null);
    const { progress } = useProgress();
    const togglePerspective = useSceneStore().handleTogglePerspective;
    const isPerspective = useSceneStore().isPerspective;

    useGSAP(
        () => {
            if (progress != 100) return;
            gsap.timeline()
                .to("#progress", {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power1.out",
                })
                .to("#scene", {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                })
                .to("#controlBar", {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.out",
                });
        },
        { scope: container, dependencies: [progress] }
    );

    const handleClickPerspective = () => {
        togglePerspective();
        window.gtag("event", "點擊透視", {
            category: "UI",
            label: "點擊透視",
        });
    };

    return (
        <div
            ref={container}
            className="w-full h-svh bg-gradient-to-b from-[#CFC6C7] from-0% via-[#C0B2B4] via-70% to-[#B19EA2] to-100%  relative overflow-hidden"
        >
            <Scene />
            <GoogleAnalytics gaId="G-CYM58TSPLC" />
            <div className="absolute bottom-5 right-5">
                <Progress />
            </div>
            <div
                id="controlBar"
                className="absolute z-50 bottom-5 left-1/2 -translate-x-1/2 w-11/12 h-16 flex items-center justify-between opacity-0 pointer-events-none"
            >
                <div className="pointer-events-auto">
                    <ButtonIcon
                        icon="View"
                        tooltip={{ txt: "透視", position: "left" }}
                        className={`${
                            isPerspective
                                ? "bg-[#3D3D3D] [&>*]:text-white"
                                : "bg-white"
                        }`}
                        onClick={handleClickPerspective}
                    />
                </div>
                <FloorList />
                <div>
                    <FloorInfoPanel />
                </div>
            </div>
        </div>
    );
};

export default Home;
