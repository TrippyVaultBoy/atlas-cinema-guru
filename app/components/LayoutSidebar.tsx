"use client";

import { FolderIcon, StarIcon, ClockIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { useState } from "react";
import ActivityComponent from "./ActivityComponent";

function LayoutSidebar() {
    const [expanded, setExpanded] = useState(false);
    const open = () => setExpanded(true);
    const close = () => setExpanded(false);
    
    return (
        <aside
            onMouseEnter={open}
            onMouseLeave={close}
            onFocus={open}
            className={`bg-[#1dd2af] transition-all duration-300 ease-in-out 
                  ${expanded ? "w-220" : "w-24"} flex flex-col p-4`}
        >
            <div className="flex flex-col bg-[#1dd2af] p-4 gap-4">
                <Link href={"/"} className="flex gap-2 hover:text-[#00003c]">
                    <FolderIcon width={25} height={25}/>
                    {expanded && <span className="font-semibold">Home</span>}
                </Link>
                <Link href={"/favorites"} className="flex gap-2 hover:text-[#00003c]">
                    <StarIcon width={25} height={25}/>
                    {expanded && <span className="font-semibold">Favorites</span>}
                </Link>
                <Link href={"/watch-later"} className="flex gap-2 hover:text-[#00003c]">
                    <ClockIcon width={25} height={25}/>
                    {expanded && <span className="font-semibold">Watch Later</span>}
                </Link>
                <ActivityComponent isExpanded={expanded}/>
            </div>
        </aside>
    );
}

export default LayoutSidebar;