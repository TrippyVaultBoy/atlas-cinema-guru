"use client"

import MovieCard from "@/app/components/MovieCard";
import { Title } from "@/lib/definitions";
import { useEffect, useState } from "react";

export default function WatchLaterPage() {
    const [watchLater, setWatchLater] = useState<Title[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchTitles() {
            const res = await fetch(`/api/watch-later?page=${page}`);

            if (res.ok) {
                const data = await res.json();
                setWatchLater(data.watchLater);
            } else if (res.status === 401) {
                console.error("Not logged in");
            } else {
                console.error("Failed to fetch titles");
            }
        }

        fetchTitles();
    }, [page]);

    return (
        <div className="h-full flex flex-col">
            <span className="text-3xl font-bold mx-auto pt-8 px-8">Watch Later</span>
            {/* Film Cards */}
            <div className="grid grid-cols-3 gap-16 p-8">
                {watchLater.map((watchLater) => (
                    <MovieCard key={watchLater.id} movie={watchLater}/>
                ))}
            </div>
            {/* Page Buttons */}
            <div className="flex justify-center mb-8">
                <button 
                    onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}
                    className="w-32 border-2 rounded-s-4xl bg-[#54f4d0] text-[#000061] p-4"
                >
                    Previous
                </button>
                <span className="bg-[#54f4d0] text-[#000061] p-4">
                    {page}
                </span>
                <button
                    onClick={(() => setPage((prev) => prev + 1))}
                    className=" w-32 border-2 rounded-e-4xl bg-[#54f4d0] text-[#000061] p-4"
                >
                    Next
                </button>
            </div>
        </div>
    );
}