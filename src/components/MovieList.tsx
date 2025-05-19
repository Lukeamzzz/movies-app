import Link from 'next/link';
import React from 'react'
import MovieCard from './MovieCard';
import { IMovieDetail } from "@/types/IMovieDetail";

interface MovieProps {
    movies: IMovieDetail[];
}

const MovieList: React.FC<MovieProps> = ({ movies }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8 mx-2 items-center'>
            {movies.map((movie) => (
                <Link key={movie.id} href={{ 
                        pathname: `/movie/${movie.id}`,
                        query: { from: window.location.pathname }
                    }}>
                    <MovieCard
                        title = {movie.title} 
                        voteAverage = {movie.vote_average}
                        posterPath = {movie.poster_path}
                        releaseYear = {new Date(movie.release_date).getFullYear()}
                        description = {movie.overview}
                    />
                </Link>
            ))}
        </div>
    )
};

export default MovieList;