"use client";

import { FolderIcon, StarIcon, ClockIcon } from "@heroicons/react/24/solid";

import { useState } from "react";

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
                  ${expanded ? "w-96" : "w-24"} flex flex-col p-4`}
        >
            <div className="flex flex-col bg-[#1dd2af] p-4 gap-4">
                <div className="flex gap-2">
                    <FolderIcon width={25} height={25}/>
                    {expanded && <span className="font-semibold">Home</span>}
                </div>
                <div className="flex gap-2">
                    <StarIcon width={25} height={25}/>
                    {expanded && <span className="font-semibold">Favorites</span>}
                </div>
                <div className="flex gap-2">
                    <ClockIcon width={25} height={25}/>
                    {expanded && <span className="font-semibold">Watch Later</span>}
                </div>
                {expanded && <div className="flex flex-col text-[#00003c] bg-[#54f4d0] rounded-2xl p-2 gap-2">
                    <span className="text-center font-bold">Latest Activities</span>
                    <div>
                        <p>10/2/2025, 5:11:17 PM</p>
                        <p>Added Before the Down to watch later</p>
                    </div>
                    <div>
                        <p>10/2/2025, 5:11:17 PM</p>
                        <p>Added Before the Down to watch later</p>
                    </div>
                    <div>
                        <p>10/2/2025, 5:11:17 PM</p>
                        <p>Added Before the Down to watch later</p>
                    </div>
                    <div>
                        <p>10/2/2025, 5:11:17 PM</p>
                        <p>Added Before the Down to watch later</p>
                    </div>
                </div>}
            </div>
        </aside>
    );
}

export default LayoutSidebar;