import useHightLightStore from "@/store/useHightLightStore";
import { Zap, Droplets, Droplet, LampCeiling, Minus } from "lucide-react";
import React, { useState } from "react";
import pipeline from "@/public/pipelineData.json";
import useSceneStore from "@/store/useSceneStore";
import ButtonIcon from "./ButtonIcon";

const LightbulbIcon: React.FC<{ wireMesh: string }> = ({ wireMesh }) => {
    const highlightList = useHightLightStore().highlightList;
    const toggleHightLight = useHightLightStore().handleToggleHightLight;
    const handleClickIcon = () => {
        toggleHightLight(wireMesh);
    };

    const isHightLight = highlightList.find((item) => item.name == wireMesh);

    return (
        <div
            className="w-8 h-8 bg-white rounded-full hover:bg-gray-100 duration-150 p-1 cursor-pointer"
            onClick={handleClickIcon}
        >
            <LampCeiling
                className={`w-5 h-6 m-auto ${
                    isHightLight ? "fill-[#FCBF49]" : ""
                }`}
            />
        </div>
    );
};

const WaterIcon: React.FC<{ tube: string; type: "cold" | "hot" | "drain" }> = ({
    tube,
    type,
}) => {
    const highlightList = useHightLightStore().highlightList;
    const toggleHightLight = useHightLightStore().handleToggleHightLight;
    const handleClickIcon = () => {
        toggleHightLight(tube);
    };

    const isHightLight = highlightList.find((item) => item.name == tube);

    const styleMap = {
        cold: "fill-[#348CE7]",
        hot: "fill-[#E70504]",
        drain: "fill-[#E77730]",
    };

    return (
        <div
            className="w-8 h-8 bg-white rounded-full hover:bg-gray-100 duration-150 p-1 cursor-pointer"
            onClick={handleClickIcon}
        >
            <Droplet
                className={`w-5 h-6 m-auto ${
                    isHightLight ? `${styleMap[type]}` : ""
                }`}
            />
        </div>
    );
};

const FloorInfoPanel = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const currentFloor = useSceneStore().currentFloor;

    const modalIndex = pipeline.findIndex(
        (item) => item.floor == currentFloor
    );
    if (modalIndex == -1) return <></>;
    const info = pipeline[modalIndex];

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <ButtonIcon
                icon="Row"
                tooltip={{ txt: "資訊", position: "right" }}
                className="bg-white hover:border-gray-300 pointer-events-auto"
                onClick={handleToggle}
            />
            {isVisible && (
                <div className="absolute right-0 bottom-1 bg-white p-3 w-full md:w-60 rounded flex flex-col text-black max-h-[calc(100svh_-_3rem)] overflow-x-hidden overflow-y-auto pointer-events-auto">
                    <div className="text-lg pb-1 border-b border-gray-300">
                        {currentFloor}
                        <div
                            className="w-8 h-8 float-end p-1 bg-white hover:bg-gray-300 rounded duration-150"
                            onClick={handleToggle}
                        >
                            <Minus className="w-5 h-6 m-auto text-center" />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Droplets className="w-5 h-5 fill-[#8ECAE6]" />
                        管線
                    </div>
                    <div className="grid grid-cols-[80px_120px] pl-6 items-center">
                        <div className="col-span-1">冷水管</div>
                        <div className="col-span-1 flex flex-row items-center">
                            {info.cold_tube.map((item) => (
                                <WaterIcon key={item} tube={item} type="cold" />
                            ))}
                        </div>
                        <div className="col-span-1">熱水管</div>
                        <div className="col-span-1 flex flex-row items-center">
                            {info.hot_tube.map((item) => (
                                <WaterIcon key={item} tube={item} type="hot" />
                            ))}
                        </div>
                        <div className="col-span-1">污水管</div>
                        <div className="col-span-1 flex flex-row items-center">
                            {info.drain_tube.map((item) => (
                                <WaterIcon
                                    key={item}
                                    tube={item}
                                    type="drain"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Zap className="w-5 h-5 fill-[#FCBF49]" />
                        電力
                    </div>
                    <div className="grid grid-cols-[80px_120px] pl-6 items-center">
                        {info.electricity.map((item, index) => (
                            <React.Fragment key={`${item}_${index}`}>
                                <div className="col-span-1">{item.place}</div>
                                <div className="col-span-1 flex flex-row items-center">
                                    {item.pipeline.map((mesh) => (
                                        <React.Fragment key={`${mesh}`}>
                                            <LightbulbIcon wireMesh={mesh} />
                                        </React.Fragment>
                                    ))}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default FloorInfoPanel;
