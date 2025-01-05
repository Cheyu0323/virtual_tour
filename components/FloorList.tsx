import React from "react";
import ButtonIcon from "./ButtonIcon";
import useSceneStore, { FloorType } from "@/store/useSceneStore";

const FloorList = () => {
    const { currentFloor, handleSwitchFloor } = useSceneStore();

    const handleClickHome = () => {
        handleSwitchFloor("Sky");
    };
    const handleClickFloor = (floor: FloorType) => {
        handleSwitchFloor(floor);
    };

    return (
        <div className="border border-white/70 bg-transparent p-2 rounded flex gap-x-3 relative">
            <ButtonIcon
                icon="Home"
                className="bg-[#D9D9D9]/40 hover:bg-[#D9D9D9]/70"
                onClick={handleClickHome}
            />
            <div className="bg-[#D9D9D9]/40 px-3 rounded flex items-center gap-x-2 *:font-semibold *:tracking-widest *:text-md *:px-3 *:rounded *:duration-150 *:cursor-pointer *:relative *:before:content-[''] *:before:absolute *:before:-top-4 *:before:left-1 *:before:bg-white *:before:w-9 *:before:h-1 *:before:rounded *:before:duration-150">
                <span
                    className={`hover:text-black ${
                        currentFloor == "1F"
                            ? "text-black before:opacity-100"
                            : "text-[#5D5D5D] before:opacity-0"
                    }`}
                    onClick={() => handleClickFloor("1F")}
                >
                    1F
                </span>
                <span
                    className={`hover:text-black ${
                        currentFloor == "2F"
                            ? "text-black before:opacity-100"
                            : "text-[#5D5D5D] before:opacity-0"
                    }`}
                    onClick={() => handleClickFloor("2F")}
                >
                    2F
                </span>
                <span
                    className={`hover:text-black ${
                        currentFloor == "3F"
                            ? "text-black before:opacity-100"
                            : "text-[#5D5D5D] before:opacity-0"
                    }`}
                    onClick={() => handleClickFloor("3F")}
                >
                    3F
                </span>
            </div>
        </div>
    );
};

export default FloorList;
