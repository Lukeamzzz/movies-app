"use client";

import Loader from "@/components/Loader/Loader";
import MovieList from "@/components/MovieList";
import Pagination from "@/components/Pagination";
import getNowPlayingMovies from "@/services/movies/getNowPlayingMovies";
import { IMovieDetail } from "@/types/IMovieDetail";
import React, { useEffect, useState } from "react";

const NowPlayingClientPage = () => {
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate 4s delay
      try {
        const data = await getNowPlayingMovies(currentPage);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 20)); // Limit to 20 pages
      }
      catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchNowPlayingMovies();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top of page on page change
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold my-10 text-center">Now In Theaters</h2>

      <MovieList movies={movies}/>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
};

export default NowPlayingClientPage;