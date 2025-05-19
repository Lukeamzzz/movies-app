"use client";

import { useEffect, useState } from "react";
import { IMovieDetail } from "@/types/IMovieDetail";
import Image from "next/image";
import { getMovieById } from "@/services/movies/getMovieById";
import { markAsFavorite } from "@/services/accounts/markAsFavorite";
import { useParams } from "next/navigation";
import { useGuestSession } from "@/providers/GuestSessionContext";
import Loader from '@/components/Loader/Loader';
import getRecommendations from "@/services/movies/getRecommendations";
import RecommendationCarousel from '@/components/RecommendationCarousel';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const [recommendationsLoading, setRecommendationsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recommendations, setRecommendations] = useState<IMovieDetail[]>([]);
  const { guestSessionId } = useGuestSession();

  // Load movie details
  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } 
      catch (err) {
        console.error("Error fetching movie:", err);
        setError("Could not load movie.");
      } 
      finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // Check if movie is in favorites (localStorage)
  useEffect(() => {
    if (!id || typeof id !== "string") return;

    const storedFavorites = localStorage.getItem("favoriteMovieIds");
    const favoriteIds: number[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];
    setIsFavorite(favoriteIds.includes(Number(id)));
  }, [id]);

  // Load recommendations
  useEffect(() => {
    if (!id || typeof id!== "string") return;
    const fetchRecommendations = async () => {
        setRecommendationsLoading(true);
        try {
            const data = await getRecommendations(Number(id));
            // Limit the number of recommendations to 5
            setRecommendations(data.results.slice(0,5));
            console.log(data.results.slice(0,5))
        }
        catch (err) {
            console.error("Error loading recommendations:", err);
            throw err;
        }
        setRecommendationsLoading(false);
    }
    fetchRecommendations();
  }, [id]);

  // Toggle favorite status
  const handleToggleFavorite = async () => {
    if (!guestSessionId || !movie) return;

    const newFavoriteState = !isFavorite;

    try {
      await markAsFavorite(movie.id, newFavoriteState, guestSessionId);
      setIsFavorite(newFavoriteState);
      
      const storedFavorites = localStorage.getItem("favoriteMovieIds");
      const favoriteIds: number[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
      
      const updatedFavorites = newFavoriteState
        ? [...new Set([...favoriteIds, movie.id])]
        : favoriteIds.filter((id) => id !== movie.id);
      
      localStorage.setItem(
        "favoriteMovieIds",
        JSON.stringify(updatedFavorites)
      );
    } 
    catch (err) {
      console.error("Failed to update favorite:", err);
    }
  };

  if (loading) return <Loader />;
  if (recommendationsLoading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!movie) return <div>No movie found.</div>;

  return (
    <div className="bg-gradient-to-b from-purple-200 to-purple-50 pt-10 sm:pt-20 px-4">
        <div className="max-w-4xl mx-auto shadow-xl rounded-2xl bg-white">
            <div className="flex flex-col sm:flex-row">
                <Image 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    className="w-full sm:w-auto rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                />

                <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                        <h1 className="font-bold text-2xl sm:text-4xl">{movie.title}</h1>
                        <p className="italic text-purple-600 text-sm sm:text-base">{movie.tagline}</p>
                    </div>
                    
                    <p className="text-sm sm:text-base">{movie.overview}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        <h4 className="font-semibold text-gray-600 text-sm sm:text-base">Release year: <span className="text-black font-normal">{new Date(movie.release_date).getFullYear()}</span></h4>
                        <h4 className="font-semibold text-gray-600 text-sm sm:text-base">Rating: <span className="text-black font-normal">{movie.vote_average?.toFixed(1)}</span></h4>
                        <h4 className="font-semibold text-gray-600 text-sm sm:text-base">Origin Country: <span className="text-black font-normal">{movie.production_countries[0]?.name ? movie.production_countries[0]?.name : "Unknown"}</span></h4>
                        <h4 className="font-semibold text-gray-600 text-sm sm:text-base">Genre: <span className="text-black font-normal">{movie.genres[0]?.name}</span></h4>
                    </div>

                    <button onClick={handleToggleFavorite}
                        className={`w-full rounded-md text-white py-3 sm:py-4 text-sm sm:text-base cursor-pointer transition-colors duration-300
                        ${isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"}`}>
                            {isFavorite? "Remove from favorites" : "Add to favorites"}
                    </button>
                </div>
            </div>
        </div>

        <div>
            <RecommendationCarousel recommendations={recommendations} />
        </div>
    </div>
  );
};

export default MovieDetailPage;
