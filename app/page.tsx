"use client";
import { useEffect, useState } from "react";

import { Title } from "@/lib/definitions";

export default function TitlesList() {
  const [genres, setGenres] = useState<string[]>([]);
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [query, setQuery] = useState("");
  
  const [titles, setTitles] = useState<Title[]>([]);
  const [page, setPage] = useState(1);

  const genreList = ["Romance", "Action", "Comedy", "Horror", "Sci-Fi",
                     "Drama", "Thriller", "Adventure", "Fantasy", "Mystery",];

  useEffect(() => {
    async function fetchTitles() {
      let url = `/api/titles?page=${page}`
      
      if (minYear) {
        url += `&minYear=${minYear}`;
      }
      if (maxYear) {
        url += `&maxYear=${maxYear}`;
      }
      if (genres?.length) {
        url += `&genres=${genres.join(",")}`;
      }
      if (query) {
        url += `&query=${encodeURIComponent(query)}`
      }

      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        setTitles(data.title);
      } else if (res.status === 401) {
        console.error("Not logged in");
      } else {
        console.error("Failed to fetch titles");
      }
    }

    fetchTitles();
  }, [page, query, minYear, maxYear, genres]);
  
  function toggleGenre(genre: string) {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  }
  
  return (
    <div className="flex flex-col">

      {/* Search Filters */}
      <div className="flex justify-between p-8">
        {/* Text Inputs */}
        <div className="w-96">
          <div className="flex flex-col">
            <span>Search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Movies..."
              className="rounded-2xl bg-[#000061] border-2 border-[#54f4d0] p-1"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col">
              <span>Min Year</span>
              <input
                type="text"
                value={minYear}
                onChange={(e) => setMinYear(e.target.value)}
                placeholder="1990"
                className="rounded-2xl bg-[#000061] border-2 border-[#54f4d0] p-1"
              />
            </div>
            <div className="flex flex-col">
              <span>Max Year</span>
              <input
                type="text"
                value={maxYear}
                onChange={(e) => setMaxYear(e.target.value)}
                placeholder="2025"
                className="rounded-2xl bg-[#000061] border-2 border-[#54f4d0] p-1"
              />
            </div>
          </div>
        </div>

        {/* Genres Tags */}
        <div className="flex flex-col">
          <span className="font-bold">Genres</span>
          <div className="flex flex-wrap w-96 gap-2">
            {genreList.map((genre) => (
              <span
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`border-2 rounded-2xl border-[#54f4d0] p-1 ${genres.includes(genre) ? "bg-[#54f4d0] text-[#000061]" : ""}`}>{genre}</span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Film Cards */}
      <div className="grid grid-cols-3 gap-16 p-8">
        {titles.map((title) => (
          <div key={title.id} className="">
            <img src={title.image} alt={title.title} className="rounded-2xl"/>
          </div>
        ))}
      </div>

      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
}
