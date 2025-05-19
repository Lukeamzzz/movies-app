"use client";

import React, { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import { getFavorites } from "@/services/accounts/getFavorites";
import { useGuestSession } from "@/providers/GuestSessionContext";
import Loader from "@/components/Loader/Loader";
import { IMovieDetail } from "@/types/IMovieDetail";
import Pagination from "@/components/Pagination";

const MyFavoritesPage = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movies, setMovies] = useState<IMovieDetail[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      try {
        const data = await getFavorites(guestSessionId, currentPage);
        setMovies(data?.results || []);
        setTotalPages(Math.min(data?.total_pages, 20)); // Limit to 20 pages
      } catch (err) {
        console.error("Error loading favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [guestSessionId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top of page on page change
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>      
      <h2 className="text-3xl font-bold my-10 text-center">My favorite movies</h2>

      {movies.length === 0 && (
        <div className="text-center mt-20 text-gray-600">
          <p className="text-xl">You don't have any favorite movies yet.</p>
          <p className="text-sm mt-2">
            Go to a movie's detail page and click "Add to Favorites" to see it here.
          </p>
        </div>
      )}

      {movies.length > 0 && <MovieList movies={movies} />}

      {movies.length > 0 && 
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      }
    </div>
  );
};

export default MyFavoritesPage;