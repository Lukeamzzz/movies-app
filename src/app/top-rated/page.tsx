"use client";

import Loader from '@/components/Loader/Loader';
import MovieList from '@/components/MovieList';
import Pagination from '@/components/Pagination';
import getTopRatedMovies from '@/services/movies/getTopRatedMovies';
import { IMovieDetail } from '@/types/IMovieDetail';
import React, { useEffect, useState } from 'react'

const TopRatedClientPage = () => {
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate 4s delay
      try {
        const data = await getTopRatedMovies(currentPage);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 20)); // Limit to 20 pages
      }
      catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
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
      <h2 className="text-3xl font-bold my-10 text-center">Top Rated Movies</h2>

      <MovieList movies={movies}/>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
};

export default TopRatedClientPage;