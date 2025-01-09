import useLightStore from "@/store/useLightStore";
import { Zap, LampCeiling } from "lucide-react";
import React from "react";
import modalInfo from "@/public/data.json";
import useSceneStore from "@/store/useSceneStore";

const LightbulbIcon: React.FC<{ wireMesh: string }> = ({ wireMesh }) => {
    const highlightList = useLightStore().highlightList;
    const toggleHightLight = useLightStore().handleToggleHightLight;
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
                    isHightLight ? "fill-yellow-300" : ""
                }`}
            />
        </div>
    );
};

const FloorInfoPanel = () => {
    const currentFloor = useSceneStore().currentFloor;
    if (currentFloor == "Sky") return <></>;
    return (
        <div className="absolute right-0 bottom-16 bg-white p-3 w-60 rounded flex flex-col text-black">
            <div className="flex items-center gap-x-1">
                <Zap className="w-5 h-5 fill-yellow-500" />
                管線
            </div>
            <div className="flex items-center gap-x-1">
                <Zap className="w-5 h-5 fill-yellow-500" />
                電力
            </div>
            <div className="grid grid-cols-[80px_120px] pl-6 items-center">
                {modalInfo
                    .filter((item) => item.floor == currentFloor)
                    .map((item) =>
                        item.electricity.map((_electricity, index) => {
                            return (
                                <React.Fragment
                                    key={`${_electricity}_${index}`}
                                >
                                    <div className="col-span-1">
                                        {_electricity.place}
                                    </div>
                                    <div className="col-span-1 flex flex-row items-center">
                                        {_electricity.pipeline.map((mesh) => (
                                            <React.Fragment key={`${mesh}`}>
                                                <LightbulbIcon
                                                    wireMesh={mesh}
                                                />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </React.Fragment>
                            );
                        })
                    )}

                {/* <div className="col-span-1">房間</div>
                <div className="col-span-1 flex flex-row items-center">
                    <LightbulbIcon wireMesh="1F_Light_Wire_FrontRoom" />
                    <LightbulbIcon wireMesh="1F_Light_Wire_FrontRoom_Main" />
                </div> */}
            </div>
        </div>
    );
};

export default FloorInfoPanel;
