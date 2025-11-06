import { Title } from "@/lib/definitions";

import { StarIcon as StarSolid, ClockIcon as ClockSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline, ClockIcon as ClockOutline } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type Props = {
    movie: Title;
};

function MovieCard({ movie }: Props) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);

    async function checkFavorite(movie: Title) {
        const res = await fetch("/api/favorites");

        if (res.ok) {
            const data = await res.json();
            const movieIdToCheck = movie.id;
            const favorited = data.favorites.some((movie: Title) => movie.id === movieIdToCheck);

            setIsFavorited(favorited);
        } else if (res.status === 401) {
            console.error("");
        } else {
            console.error("");
        }
    }
   
    async function checkWatchLater(movie: Title) {
        const res = await fetch("/api/watch-later");

        if (res.ok) {
            const data = await res.json();
            const movieIdToCheck = movie.id;
            const watchLater = data.watchLater.some((movie: Title) => movie.id === movieIdToCheck);

            setIsWatchLater(watchLater);
        } else if (res.status === 401) {
            console.error("");
        } else {
            console.error("");
        }
    }

    async function toggleFavorite(movie: Title) {
        try {
            const res = await fetch(`/api/favorites/${movie.id}`, {
                method: isFavorited ? "DELETE" : "POST",
            });

            if (res.ok) {
               setIsFavorited(!isFavorited); 
            } else if (res.status === 401) {
                console.error("Not logged in");
            } else {
                console.error("Failed to update favorite");
            }
        } catch (err) {
            console.error("Error toggling favorite:", err);
        }
    }

    async function toggleWatchLater(movie: Title) {
        try {
            const res = await fetch(`/api/watch-later/${movie.id}`, {
                method: isWatchLater ? "DELETE" : "POST",
            });

            if (res.ok) {
                setIsWatchLater(!isWatchLater);
            } else if (res.status === 401) {
                console.error("Not logged in");
            } else {
                console.error("Failed to update favorite");
            }
        } catch (err) {
            console.error("Error toggling favorite:", err);
        }
    }
    
    useEffect(() => {
        checkWatchLater(movie);
        checkFavorite(movie);
    }, [movie]);
    
    return (
        <div key={movie.id} className="relative group overflow-hidden rounded-2xl border border-[#54f4d0]">
            <div className="absolute top-2 right-2 flex gap-2 translate-x-16 group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
                {isFavorited ? <StarSolid onClick={() => toggleFavorite(movie)} width={25} height={25} className="cursor-pointer"/> : <StarOutline onClick={() => toggleFavorite(movie)} width={25} height={25} className="cursor-pointer"/>}
                {isWatchLater ? <ClockSolid onClick={() => toggleWatchLater(movie)} width={25} height={25} className="cursor-pointer"/> : <ClockOutline onClick={() => toggleWatchLater(movie)} width={25} height={25} className="cursor-pointer"/>}
            </div>
            <img src={movie.image} alt={movie.title} className="rounded-2xl" />
            <div className="absolute bottom-0 left-0 w-full
                            flex flex-col justify-between
                          bg-[#000061]/90 text-white p-3
                            translate-y-full group-hover:translate-y-0
                            transition-transform duration-500 ease-in-out
                            rounded-2xl gap-2">
                <span className="font-bold text-sm">{movie.title} ({movie.released})</span>
                <p className="text-sm">{movie.synopsis}</p>
                <p className="text-sm bg-[#54f4d0] text-[#00003c] rounded-2xl mx-auto ms-0 p-1">{movie.genre}</p>
            </div>
        </div>
    );
}

export default MovieCard;