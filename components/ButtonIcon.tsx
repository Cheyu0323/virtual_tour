import React from "react";

import {
    House,
    Box,
    Droplet,
    Zap,
    Flame,
    Triangle,
    Rows3,
    Map,
    X,
} from "lucide-react";

type ButtonIconProps = {
    icon: "Row" | "Home" | "View" | "Water" | "Zap" | "Flame" | "Map" | "X";
    tooltip?: { txt: string; position: "left" | "right" };
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const iconClass = "h-5 w-5 stroke-1 text-black";

const ButtonIcon: React.FC<
    ButtonIconProps & React.HTMLAttributes<HTMLDivElement>
> = ({ icon, tooltip, onClick, className = "" }) => {
    const svgMap = {
        Row: <Rows3 className={iconClass} />,
        Home: <House className={iconClass} />,
        View: <Box className={iconClass} />,
        Water: <Droplet className={iconClass} />,
        Zap: <Zap className={iconClass} />,
        Flame: <Flame className={iconClass} />,
        Map: <Map className={iconClass} />,
        X: <X className={iconClass} />,
    };

    return (
        <>
            <button
                className={`rounded duration-150 p-2 relative group ${className}`}
                onClick={onClick}
            >
                {svgMap[icon]}
                {tooltip != null && (
                    <div
                        className={`absolute bg-[#3D3D3D] opacity-0 group-hover:opacity-100 pointer-events-none duration-300 px-3 leading-6 text-sm tracking-wide text-nowrap rounded-[2px] top-1/2 -translate-y-1/2 text-white ${
                            tooltip.position == "left" ? "left-14" : "right-14"
                        }`}
                    >
                        {tooltip.txt}
                        <Triangle
                            className={`absolute top-1/2 -translate-y-1/2 -rotate-90 w-4 h-4 fill-[#3D3D3D] stroke-none ${
                                tooltip.position == "left"
                                    ? "-left-3"
                                    : "-right-3 -scale-100"
                            }`}
                        />
                    </div>
                )}
            </button>
        </>
    );
};

export default ButtonIcon;
