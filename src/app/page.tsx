"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getDirectorByName } from "@/services/people/getDirectorByName";
import Link from "next/link";
import getTopRatedMovies from "@/services/movies/getTopRatedMovies";
import getNowPlayingMovies from "@/services/movies/getNowPlayingMovies";
import { IMovieDetail } from "@/types/IMovieDetail";
import MovieList from "@/components/MovieList";

interface Director {
  id: number;
  name: string;
  image: string;
  knownFor: string;
}

export default function Home() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<IMovieDetail[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovieDetail[]>([]);

  const directorNames = [
    "Celine Song",
    "Akira Kurosawa",
    "Wim Wenders",
    "Gus Van Sant"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch directors
        const directorsData = await Promise.all(
          directorNames.map(async (name) => {
            const response = await getDirectorByName(name);
            const director = response.results[0];
            return {
              id: director.id,
              name: director.name,
              image: `https://image.tmdb.org/t/p/w500${director.profile_path}`,
              knownFor: director.known_for[0]?.title || ""
            };
          })
        );
        setDirectors(directorsData);

        // Fetch top rated movies
        const topRated = await getTopRatedMovies();
        setTopRatedMovies(topRated.results.slice(0, 4));

        // Fetch now playing movies
        const nowPlaying = await getNowPlayingMovies();
        setNowPlayingMovies(nowPlaying.results.slice(0, 4));
      } 
      catch (error) {
        console.error("Error fetching data:", error);
      } 
    };

    fetchData();
  }, [directorNames]);

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden pt-25 bg-gradient-to-b from-purple-200 to-white">
        {/* Decorative elements */}
        <div className="absolute top-20 left-50 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>
        <div className="absolute top-50 right-70 w-24 h-24 bg-purple-400 rounded-full opacity-30 animate-bounce mix-blend-multiply"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-purple-500 rounded-full opacity-10 animate-pulse mix-blend-multiply"></div>
        
        <div className="container mx-auto px-8 py-32 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-6xl font-bold mb-10 text-purple-900">
              Your Film Voyage Starts Here
            </h1>
              <p className="text-xl text-purple-800 mb-4">From new directors to award-winning filmmakers.</p>
              <p className="text-xl text-purple-800">Discover films from around the world that will transform you.</p>
            
            <div className="flex justify-center items-center gap-6 mt-12">
              <Link 
                href={"/popular"}
                className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Explore Movies
              </Link>
              <Link
                href={"/my-favs"}
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg border-2 border-purple-600"
              >
                My Favorites
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-3 bg-purple-600 mt-10"></div>

      {/* Directors Section */}
      <div className="px-8 py-12">
        <h2 className="text-3xl font-semibold mb-10 text-center text-purple-700">Directors in the Spotlight: Monthly Selection</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {directors.map((director) => (
              <div 
                key={director.id}
                className="bg-white rounded-lg shadow-xl overflow-hidden hover:scale-103 transition-transform duration-300 text-center"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{director.name}</h3>
                  <p className="text-sm text-purple-600">{director.knownFor}</p>
                </div>
              </div>
            ))}
          </div>
      </div>

      {/* Top Rated Movies Section */}
      <div className="py-5">
        <div className="flex justify-between items-center mb-10 px-8">
          <div className="flex-1"></div> {/* empty div to balance the justify-between */}
          <h2 className="flex-1 text-3xl font-semibold text-purple-700 text-center">Top Rated Movies</h2>
          <div className="flex-1 flex justify-end pr-3">
            <Link href={'/top-rated'}>
              <button className="text-purple-600 transition-all duration-300 flex items-center group">
                View All
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </Link>
          </div>
        </div>
        <MovieList movies={topRatedMovies} />
      </div>

      {/* Now Playing Movies Section */}
      <div className="py-5">
        <div className="flex justify-between items-center mb-10 px-8">
          <div className="flex-1"></div> {/* empty div to balance the justify-between */}
          <h2 className="flex-1 text-3xl font-semibold text-purple-700 text-center">Now in Theaters</h2>
          <div className="flex-1 flex justify-end pr-3">
            <Link href={'/now-playing'}>
              <button className="text-purple-600 transition-all duration-300 flex items-center group">
                View All
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </Link>
          </div>
        </div>
        <MovieList movies={nowPlayingMovies} />
      </div>
      
    </div>
  );
}
