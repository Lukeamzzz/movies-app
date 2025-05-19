"use client";

import React, { useEffect, useState } from "react";
import getPopularMovies from "@/services/movies/getPopularMovies";
import { IMovieDetail } from "@/types/IMovieDetail";
import MovieList from "@/components/MovieList";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination";

const PopularClientPage = () => {
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate 4s delay
      try {
        const data = await getPopularMovies(currentPage);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 20)); // Limit to 20 pages
      } 
      catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Scroll to top of page on page change
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
        <h2 className="text-3xl font-bold my-10 text-center">Popular Movies Now</h2>

      <MovieList movies={movies} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PopularClientPage;