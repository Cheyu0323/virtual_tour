import useLightStore from "@/store/useLightStore";
import { Zap, LampCeiling } from "lucide-react";
import React from "react";

const LightbulbIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    onClick,
}) => {
    return (
        <div
            className="w-8 h-8 bg-white rounded-full hover:bg-gray-100 duration-150 p-1 cursor-pointer"
            onClick={onClick}
        >
            <LampCeiling className="w-5 h-6 m-auto" />
        </div>
    );
};

const FloorInfoPanel = () => {
    const addHightLight = useLightStore().handleAddHightLight;
    return (
        <div className="absolute right-0 bottom-16 bg-white p-3 w-60 rounded flex flex-col">
            {/* <div className="flex gap-x-2">
        <div className="flex gap-x-2 items-center">
            <span>熱水管</span>
            <div className="w-4 h-4 bg-[#E70504]"></div>
        </div>
        <span>冷水管</span>
        <span>汙水管</span>
    </div> */}
            <div className="flex items-center gap-x-1">
                <Zap className="w-5 h-5 fill-yellow-500" />
                電力
            </div>
            <div className="grid grid-cols-[50px_120px] pl-6 items-center">
                <div className="col-span-1">客廳</div>
                <div className="col-span-1 flex flex-row items-center">
                    <LightbulbIcon
                        onClick={() =>
                            addHightLight("2F_Light_Wire_LivingRoom")
                        }
                    />
                    <LightbulbIcon
                        onClick={() =>
                            addHightLight("1F_Light_Wire_LivingRoom")
                        }
                    />
                </div>
                <div className="col-span-1">房間</div>
                <div className="col-span-1 flex flex-row items-center">
                    <LightbulbIcon />
                    <LightbulbIcon />
                </div>
                <div className="col-span-1">餐廳</div>
                <div className="col-span-1 flex flex-row items-center">
                    <LightbulbIcon />
                    <LightbulbIcon />
                </div>
                <div className="col-span-1">廚房</div>
                <div className="col-span-1 flex flex-row items-center">
                    <LightbulbIcon />
                </div>
                <div className="col-span-1">廁所</div>
                <div className="col-span-1 flex flex-row items-center">
                    <LightbulbIcon />
                </div>
                <div className="col-span-1">玄關</div>
                <div className="col-span-1 flex flex-row items-center">
                    <LightbulbIcon />
                </div>
                <div className="col-span-1">走道</div>
                <div className="col-span-1 flex flex-row items-center">
                    <LightbulbIcon />
                    <LightbulbIcon />
                </div>
            </div>
        </div>
    );
};

export default FloorInfoPanel;
