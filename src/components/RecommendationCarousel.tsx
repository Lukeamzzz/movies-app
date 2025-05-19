import { IMovieDetail } from "@/types/IMovieDetail";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface IRecommendationProps {
    recommendations: IMovieDetail[];
}

const RecommendationCarousel: React.FC<IRecommendationProps> = ({ recommendations }) => {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1280 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1280, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    if (!recommendations || recommendations.length === 0) {
        return (
            <div className="text-center py-8">
                <h2 className="text-gray-600 font-semibold text-2xl">No recommendations available</h2>
            </div>
        );
    }

    return (
        <div className="mt-20">
            <h2 className="text-3xl font-bold px-4 text-center mb-10">You might also like</h2>
            <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                transitionDuration={300}
                containerClass="carousel-container"
                itemClass="px-22"
            >
                {recommendations.map((movie) => (
                    <Link 
                        key={movie.id} 
                        href={`/movie/${movie.id}`}
                    >
                        <div className="bg-white shadow-xl rounded-lg h-[360px] group overflow-hidden relative mb-20">
                            <div className="relative">
                                <Image 
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    width={380}
                                    height={400}
                                    className="rounded-t-lg"
                                    priority
                                />
                                {/* View Details Overlay */}
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="text-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
                                        <span className="text-white px-4 py-2 font-semibold">
                                            View Details
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 text-center h-[100px] flex items-center justify-center">
                                <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
                                    {movie.title}
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </div>
    );
};

export default RecommendationCarousel;