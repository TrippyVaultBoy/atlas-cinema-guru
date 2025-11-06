import { Title } from "@/lib/definitions";

type Props = {
    movie: Title;
};

function MovieCard({ movie }: Props) {
    return (
        <div key={movie.id} className="relative group overflow-hidden rounded-2xl border border-[#54f4d0]">
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