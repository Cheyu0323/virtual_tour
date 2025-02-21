"use client";

import { useEffect, useState } from "react";
import ButtonIcon from "./ButtonIcon";
import Image from "next/image";
import { Droplet, LampCeiling, MapPin, X } from "lucide-react";
import useSceneStore from "@/store/useSceneStore";
import useHightLightStore from "@/store/useHightLightStore";
import pipeline from "@/public/pipelineData.json";
import enterPosition from "@/public/areaCenterData.json";
import useCameraStore from "@/store/useCameraStore";

const PinIcon: React.FC<
    { isRightHere: boolean } & React.HTMLAttributes<SVGAElement>
> = ({ isRightHere = false, className = "" }) => {
    return (
        <MapPin
            className={`absolute w-5 h-4 animate-bounce z-50 fill-white duration-150 pointer-events-none ${
                isRightHere ? "opacity-100" : "opacity-0"
            } ${className}`}
        />
    );
};

const WaterIcon: React.FC<{ tube: string; type: "cold" | "hot" | "drain" }> = ({
    tube,
    type,
}) => {
    const highlightList = useHightLightStore().highlightList;
    const toggleHightLight = useHightLightStore().handleToggleHightLight;
    const { currentFloor } = useSceneStore();
    const handleClickIcon = () => {
        toggleHightLight(tube);
        window.gtag("event", `點擊管線_${tube}`, {
            category: "UI",
            floor: currentFloor,
            label: `點擊管線_${tube}`,
        });
    };

    const isHightLight = highlightList.find((item) => item.name == tube);

    const styleMap = {
        cold: "fill-[#348CE7]",
        hot: "fill-[#E70504]",
        drain: "fill-[#E77730]",
    };

    return (
        <div
            className="rounded-full duration-150 p-0.5 cursor-pointer"
            onClick={handleClickIcon}
        >
            <Droplet
                className={`w-3.5 h-3.5  m-auto ${
                    isHightLight ? `${styleMap[type]}` : ""
                }`}
            />
        </div>
    );
};

const LightbulbIcon: React.FC<
    { wireMesh: string } & React.HTMLAttributes<SVGAElement>
> = ({ wireMesh, className = "" }) => {
    const highlightList = useHightLightStore().highlightList;
    const toggleHightLight = useHightLightStore().handleToggleHightLight;
    const { currentFloor } = useSceneStore();
    const handleClickIcon = () => {
        toggleHightLight(wireMesh);
        window.gtag("event", `點擊燈泡_${wireMesh}`, {
            category: "UI",
            floor: currentFloor,
            label: `點擊燈泡_${wireMesh}`,
        });
    };

    const isHightLight = highlightList.find((item) => item.name == wireMesh);

    return (
        <div
            className={`bg-white rounded-full p-0.5 z-50 absolute cursor-pointer ${className} `}
        >
            <LampCeiling
                className={`w-3.5 h-3.5 m-auto ${
                    isHightLight ? "fill-[#FCBF49]" : ""
                }`}
                onClick={handleClickIcon}
            />
        </div>
    );
};
const floorGap = 17;
const FloorMap: React.FC = () => {
    const [isOpenMap, setIsOpenMap] = useState<boolean>(true);
    const [floor, setFloor] = useState<"1F" | "2F" | "3F">("1F");
    const { currentRoom, currentFloor, handleSwitchFloor } = useSceneStore();
    const updateCameraPosition = useCameraStore().handleUpdateCameraPosition;
    const switchRoom = useSceneStore().handleSwitchRoom;
    const togglePanoramic = useCameraStore(
        (state) => state.handletogglePanoramic
    );

    const handleToggleMap = () => {
        setIsOpenMap(!isOpenMap);
    };

    const handleSwithFloor = (floor: "1F" | "2F" | "3F") => {
        setFloor(floor);
    };

    const handleEnterRoom = (room: string) => {
        togglePanoramic(true);
        handleSwitchFloor(floor);
        window.gtag("event", `點擊 FloorMap 進入區域_${room}`, {
            category: "UI",
            floor: floor,
            label: `點擊 FloorMap 進入區域_${room}`,
        });
        const findEnterPosition = enterPosition.find(
            (item) => item.floor == room
        );
        if (findEnterPosition == null) {
            updateCameraPosition({
                x: 0,
                y: 7 + floorGap * (parseInt(floor) - 1),
                z: 0,
            });
            return;
        }
        switchRoom(room.replace("AreaBox", "FloorBox"));
        updateCameraPosition({
            x: findEnterPosition.position.x,
            y: 7 + floorGap * (parseInt(floor) - 1),
            z: findEnterPosition.position.z,
        });
    };

    useEffect(() => {
        if (
            currentFloor == "1F" ||
            currentFloor == "2F" ||
            currentFloor == "3F"
        )
            setFloor(currentFloor);
    }, [currentFloor]);

    const modalIndex = pipeline.findIndex((item) => item.floor == floor);
    if (modalIndex == -1) return <></>;
    const info = pipeline[modalIndex];

    return (
        <div className="relative">
            <ButtonIcon
                icon="Map"
                tooltip={{ txt: "地圖", position: "right" }}
                className={`${
                    isOpenMap ? "bg-[#3D3D3D] [&>*]:text-white" : "bg-white"
                }`}
                onClick={handleToggleMap}
            />
            <div
                className={`absolute bottom-full right-0 w-60 p-3 bg-white rounded mb-2.5 md:mb-1 shadow-lg flex flex-col gap-y-3 duration-150 ${
                    isOpenMap
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex gap-x-2.5 items-center tracking-wider pb-3 border-b border-gray-300">
                    <span
                        className={`cursor-pointer px-2 py-1 rounded ${
                            floor == "1F"
                                ? "bg-[#D9D9D9]/40 font-semibold"
                                : "bg-white"
                        }`}
                        onClick={() => handleSwithFloor("1F")}
                    >
                        1F
                    </span>
                    <span
                        className={`cursor-pointer px-2 py-1 rounded ${
                            floor == "2F"
                                ? "bg-[#D9D9D9]/40 font-semibold"
                                : "bg-white"
                        }`}
                        onClick={() => handleSwithFloor("2F")}
                    >
                        2F
                    </span>
                    <span
                        className={`cursor-pointer px-2 py-1 rounded ${
                            floor == "3F"
                                ? "bg-[#D9D9D9]/40 font-semibold"
                                : "bg-white"
                        }`}
                        onClick={() => handleSwithFloor("3F")}
                    >
                        3F
                    </span>
                    <div
                        className="w-8 h-8 ml-auto p-1 bg-white hover:bg-gray-300 rounded duration-150"
                        onClick={handleToggleMap}
                    >
                        <X className="w-5 h-6 m-auto text-center" />
                    </div>
                </div>
                <div className="flex justify-between text-sm">
                    <div className="flex flex-row items-center">
                        <div>冷水管</div>
                        {info.cold_tube.map((item) => (
                            <WaterIcon key={item} tube={item} type="cold" />
                        ))}
                    </div>
                    <div className="flex flex-row items-center">
                        <div>熱水管</div>
                        {info.hot_tube.map((item) => (
                            <WaterIcon key={item} tube={item} type="hot" />
                        ))}
                    </div>
                    <div className="flex flex-row items-center">
                        <div>污水管</div>
                        {info.drain_tube.map((item) => (
                            <WaterIcon key={item} tube={item} type="drain" />
                        ))}
                    </div>
                </div>
                <div className="p-2 rounded relative w-full h-[310px]">
                    <div
                        className={`absolute top-0 left-0 w-full duration-300 ${
                            floor == "1F" && isOpenMap
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <Image
                            src="/floormap/Floor1_1.png"
                            alt={"FloorMap_Floor1"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            className="relative z-30 pointer-events-none"
                        />
                        <Image
                            src="/floormap/1F_AreaBox_Entrance.png"
                            alt={"1F_AreaBox_Entrance"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            className="absolute bottom-7 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() =>
                                handleEnterRoom("1F_AreaBox_Entrance")
                            }
                        />
                        <Image
                            src="/floormap/1F_AreaBox_FrontRoom.png"
                            alt={"1F_AreaBox_FrontRoom"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "39%", height: "auto" }}
                            className="absolute bottom-12 left-0 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() =>
                                handleEnterRoom("1F_AreaBox_FrontRoom")
                            }
                        />
                        <Image
                            src="/floormap/1F_AreaBox_LivingRoom.png"
                            alt={"1F_AreaBox_LivingRoom"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "46%", height: "auto" }}
                            className="absolute bottom-12 right-0 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() =>
                                handleEnterRoom("1F_AreaBox_LivingRoom")
                            }
                        />
                        <Image
                            src="/floormap/1F_AreaBox_Stairs.png"
                            alt={"1F_AreaBox_Stairs"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            className="absolute bottom-[2.9rem] right-0 z-10 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("1F_AreaBox_Stairs")}
                        />
                        <Image
                            src="/floormap/1F_AreaBox_DiningRoom.png"
                            alt={"1F_AreaBox_DiningRoom"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "39%", height: "auto" }}
                            className="absolute top-[6.85rem] left-0 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() =>
                                handleEnterRoom("1F_AreaBox_DiningRoom")
                            }
                        />
                        <Image
                            src="/floormap/1F_AreaBox_Kicken.png"
                            alt={"1F_AreaBox_Kicken"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "26%", height: "auto" }}
                            className="absolute top-[4rem] left-0 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("1F_AreaBox_Kicken")}
                        />
                        <Image
                            src="/floormap/1F_AreaBox_RestRoom.png"
                            alt={"1F_AreaBox_RestRoom"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "39%", height: "auto" }}
                            className="absolute top-[4.2rem] right-0 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() =>
                                handleEnterRoom("1F_AreaBox_RestRoom")
                            }
                        />
                        {/** 客廳  */}
                        <PinIcon
                            className="bottom-[5.5rem] right-10"
                            isRightHere={
                                currentRoom == "1F_FloorBox_LivingRoom"
                            }
                        />
                        {/** 開放空間  */}
                        <PinIcon
                            className="bottom-[5.5rem] left-8"
                            isRightHere={currentRoom == "1F_FloorBox_FrontRoom"}
                        />
                        {/** 廚房  */}
                        <PinIcon
                            className="top-[5rem] left-5"
                            isRightHere={currentRoom == "1F_FloorBox_Kicken"}
                        />
                        {/** 餐廳  */}
                        <PinIcon
                            className="top-[8.5rem] left-8"
                            isRightHere={
                                currentRoom == "1F_FloorBox_DiningRoom"
                            }
                        />
                        {/** 廁所  */}
                        <PinIcon
                            className="top-[5.3rem] right-8"
                            isRightHere={currentRoom == "1F_FloorBox_RestRoom"}
                        />
                        {/** 玄關  */}
                        <PinIcon
                            className="bottom-[2rem] right-28"
                            isRightHere={currentRoom == "1F_FloorBox_Entrance"}
                        />
                        {/** 走道  */}
                        <PinIcon
                            className="top-[8rem] right-24"
                            isRightHere={currentRoom == "1F_FloorBox_Stairs"}
                        />

                        <LightbulbIcon
                            className="bottom-[3rem] right-24"
                            wireMesh="1F_Light_Wire_Restroom"
                        />
                        <LightbulbIcon
                            className="bottom-[3rem] right-20"
                            wireMesh="1F_Light_Wire_Stairs"
                        />
                        <LightbulbIcon
                            className="bottom-[4rem] right-24"
                            wireMesh="1F_Light_Wire_LivingRoom"
                        />
                        <LightbulbIcon
                            className="bottom-[4rem] right-20"
                            wireMesh="1F_Light_Wire_LivingRoom_Main"
                        />
                        <LightbulbIcon
                            className="bottom-[3rem] left-12"
                            wireMesh="1F_Light_Wire_DiningRoom"
                        />
                        <LightbulbIcon
                            className="bottom-[3rem] left-16"
                            wireMesh="1F_Light_Wire_DiningRoom_Main"
                        />
                        <LightbulbIcon
                            className="bottom-[4rem] left-12"
                            wireMesh="1F_Light_Wire_FrontRoom"
                        />
                        <LightbulbIcon
                            className="bottom-[4rem] left-16"
                            wireMesh="1F_Light_Wire_FrontRoom_Main"
                        />
                        <LightbulbIcon
                            className="bottom-[2rem] left-12"
                            wireMesh="1F_Light_Wire_Entrance"
                        />
                        <LightbulbIcon
                            className="bottom-[2rem] left-16"
                            wireMesh="1F_Light_Wire_Entrance_Outdoor"
                        />
                        <LightbulbIcon
                            className="top-[6rem] right-20"
                            wireMesh="1F_Light_Wire_Toilet"
                        />
                        <LightbulbIcon
                            className="top-[4.5rem] left-14"
                            wireMesh="1F_Light_Wire_Kitchen"
                        />
                        <LightbulbIcon
                            className="top-[8rem] right-1"
                            wireMesh="1F_Light_Wire_Stairs"
                        />
                    </div>
                    <div
                        className={`absolute top-0 left-0 w-full h-full duration-300 ${
                            floor == "2F" && isOpenMap
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <Image
                            src="/floormap/Floor2_1.png"
                            alt={"FloorMap_Floor2"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            className="relative z-30 pointer-events-none"
                        />
                        <Image
                            src="/floormap/2F_AreaBox_Room1.png"
                            alt={"2F_AreaBox_Room1"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "62.5%", height: "auto" }}
                            className="absolute bottom-5 right-0 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("2F_AreaBox_Room1")}
                        />
                        <Image
                            src="/floormap/2F_AreaBox_Room2.png"
                            alt={"2F_AreaBox_Room2"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "35%", height: "auto" }}
                            className="absolute bottom-5 left-1 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("2F_AreaBox_Room2")}
                        />
                        <Image
                            src="/floormap/2F_AreaBox_Room3.png"
                            alt={"2F_AreaBox_Room3"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "36%", height: "auto" }}
                            className="absolute bottom-[7.1rem] left-1 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("2F_AreaBox_Room3")}
                        />
                        <Image
                            src="/floormap/2F_AreaBox_Room4.png"
                            alt={"2F_AreaBox_Room4"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "57%", height: "auto" }}
                            className="absolute top-1 right-1 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("2F_AreaBox_Room4")}
                        />
                        <Image
                            src="/floormap/2F_AreaBox_Room5.png"
                            alt={"2F_AreaBox_Room5"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "39%", height: "auto" }}
                            className="absolute top-1 left-1 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("2F_AreaBox_Room5")}
                        />
                        <Image
                            src="/floormap/2F_AreaBox_LivingRoom.png"
                            alt={"2F_AreaBox_LivingRoom"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "39%", height: "auto" }}
                            className="absolute top-[8rem] right-1 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() =>
                                handleEnterRoom("2F_AreaBox_LivingRoom")
                            }
                        />
                        <Image
                            src="/floormap/2F_AreaBox_Stairs.png"
                            alt={"2F_AreaBox_Stairs"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            className="absolute bottom-3 right-0 z-10 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("2F_AreaBox_Stairs")}
                        />
                        {/** 房間一  */}
                        <PinIcon
                            className="bottom-[2.5rem] right-14"
                            isRightHere={currentRoom == "2F_FloorBox_Room1"}
                        />
                        {/** 房間二  */}
                        <PinIcon
                            className="bottom-[3.7rem] left-8"
                            isRightHere={currentRoom == "2F_FloorBox_Room2"}
                        />
                        {/** 房間三  */}
                        <PinIcon
                            className="bottom-[9.7rem] left-8"
                            isRightHere={currentRoom == "2F_FloorBox_Room3"}
                        />
                        {/** 房間五  */}
                        <PinIcon
                            className="top-[2rem] left-8"
                            isRightHere={currentRoom == "2F_FloorBox_Room5"}
                        />
                        {/** 房間四  */}
                        <PinIcon
                            className="top-[2rem] right-12"
                            isRightHere={currentRoom == "2F_FloorBox_Room4"}
                        />
                        {/** 客廳  */}
                        <PinIcon
                            className="bottom-[7.7rem] right-10"
                            isRightHere={
                                currentRoom == "2F_FloorBox_LivingRoom"
                            }
                        />
                        {/** 走道  */}
                        <PinIcon
                            className="top-[7rem] right-24"
                            isRightHere={currentRoom == "2F_FloorBox_Stairs"}
                        />
                        <LightbulbIcon
                            className="bottom-[4rem] right-24"
                            wireMesh="2F_Light_Wire_Room1_Main"
                        />
                        <LightbulbIcon
                            className="bottom-[4rem] right-20"
                            wireMesh="2F_Light_Wire_Room1"
                        />
                        <LightbulbIcon
                            className="bottom-[4rem] left-16"
                            wireMesh="2F_Light_Wire_Room2"
                        />
                        <LightbulbIcon
                            className="bottom-[3rem] left-16"
                            wireMesh="2F_Light_Wire_Room2_Main"
                        />
                        <LightbulbIcon
                            className="bottom-[10rem] left-16"
                            wireMesh="2F_Light_Wire_Room3"
                        />
                        <LightbulbIcon
                            className="bottom-[11rem] left-16"
                            wireMesh="2F_Light_Wire_Room3_Main"
                        />
                        <LightbulbIcon
                            className="top-[2.3rem] left-[4.5rem]"
                            wireMesh="2F_Light_Wire_Room5"
                        />
                        <LightbulbIcon
                            className="top-[1.3rem] left-[4.5rem]"
                            wireMesh="2F_Light_Wire_Room5_Main"
                        />
                        <LightbulbIcon
                            className="top-[4rem] left-[1.5rem]"
                            wireMesh="2F_Light_Wire_Room5_Toilet"
                        />
                        <LightbulbIcon
                            className="top-[2.3rem] left-28"
                            wireMesh="2F_Light_Wire_Room4"
                        />
                        <LightbulbIcon
                            className="top-[1.3rem] left-28"
                            wireMesh="2F_Light_Wire_Room4_Main"
                        />
                        <LightbulbIcon
                            className="top-[4rem] right-[2rem]"
                            wireMesh="2F_Light_Wire_Room4_Toilet"
                        />
                        <LightbulbIcon
                            className="top-[7rem] right-16"
                            wireMesh="2F_Light_Wire_Stairs"
                        />
                        <LightbulbIcon
                            className="top-[7rem] right-12"
                            wireMesh="2F_Light_Wire_Stairs001"
                        />
                        <LightbulbIcon
                            className="top-[6rem] right-16"
                            wireMesh="2F_Light_Wire_Stairs002"
                        />
                        <LightbulbIcon
                            className="top-[8rem] right-16"
                            wireMesh="2F_Light_Wire_LivingRoom"
                        />
                        <LightbulbIcon
                            className="top-[8rem] right-12"
                            wireMesh="2F_Light_Wire_LivingRoom_Main"
                        />
                    </div>
                    <div
                        className={`absolute top-0 left-0 w-full h-full duration-300 ${
                            floor == "3F" && isOpenMap
                                ? "opacity-100 pointer-events-auto"
                                : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <Image
                            src="/floormap/3F_AreaBox_Kitchen.png"
                            alt={"3F_AreaBox_Kitchen"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "16%", height: "auto" }}
                            className="absolute top-1 left-[3.3rem] z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("3F_AreaBox_Kitchen")}
                        />
                        <Image
                            src="/floormap/3F_AreaBox_Toilet.png"
                            alt={"3F_AreaBox_Toilet"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "22%", height: "auto" }}
                            className="absolute top-1 left-1 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("3F_AreaBox_Toilet")}
                        />
                        <Image
                            src="/floormap/3F_AreaBox_Room.png"
                            alt={"3F_AreaBox_Room"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "57%", height: "auto" }}
                            className="absolute top-1 right-1 z-20 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("3F_AreaBox_Room")}
                        />
                        <Image
                            src="/floormap/Floor3_1.png"
                            alt={"FloorMap_Floor3"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                            className="relative z-30 pointer-events-none"
                        />
                        <Image
                            src="/floormap/3F_AreaBox_Stairs.png"
                            alt={"3F_AreaBox_Stairs"}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: "40%", height: "auto" }}
                            className="absolute top-10 left-0 z-10 hover:bg-gray-300 duration-150 cursor-pointer"
                            onClick={() => handleEnterRoom("3F_AreaBox_Stairs")}
                        />

                        {/** 房間  */}
                        <PinIcon
                            className="top-[3rem] right-14"
                            isRightHere={currentRoom == "3F_FloorBox_Room"}
                        />
                        {/** 廚房  */}
                        <PinIcon
                            className="top-[1rem] left-[3.75rem]"
                            isRightHere={currentRoom == "3F_FloorBox_Kitchen"}
                        />
                        {/** 廁所  */}
                        <PinIcon
                            className="top-[1rem] left-4"
                            isRightHere={currentRoom == "3F_FloorBox_Toilet"}
                        />
                        {/** 走道  */}
                        <PinIcon
                            className="top-[4rem] left-8"
                            isRightHere={currentRoom == "3F_FloorBox_Stairs"}
                        />

                        <LightbulbIcon
                            className="top-[1.5rem] right-28"
                            wireMesh="3F_Light_Wire_Room"
                        />
                        <LightbulbIcon
                            className="top-[1.5rem] right-32"
                            wireMesh="3F_Light_Wire_Kitchen"
                        />
                        <LightbulbIcon
                            className="top-[0.5rem] right-28"
                            wireMesh="3F_Light_Wire_Room_Main"
                        />
                        <LightbulbIcon
                            className="top-0 right-2"
                            wireMesh="3F_Light_Wire_Room_Left"
                        />
                        <LightbulbIcon
                            className="top-[5.5rem] right-0"
                            wireMesh="3F_Light_Wire_Room_Right"
                        />
                        <LightbulbIcon
                            className="top-[6.7rem] left-7"
                            wireMesh="3F_Light_Wire_Balcony"
                        />
                        <LightbulbIcon
                            className="top-[5.5rem] left-7"
                            wireMesh="3F_Light_Wire_Stairs"
                        />
                        <LightbulbIcon
                            className="top-[5.5rem] left-11"
                            wireMesh="3F_Light_Wire_Stairs_Main"
                        />
                        <LightbulbIcon
                            className="top-[2.5rem] left-4"
                            wireMesh="3F_Light_Wire_Toilet"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloorMap;
