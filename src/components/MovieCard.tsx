import Config from "@/config";
import { Star } from "lucide-react";
import Image from "next/image";

interface IMovieCard {
  title: string;
  voteAverage: number;
  posterPath: string;
  releaseYear: number;
  description: string;
}

const MovieCard: React.FC<IMovieCard> = ({
  title,
  voteAverage,
  posterPath,
  releaseYear,
  description,
}) => {
  const poster = Config.IMAGE_SOURCE + posterPath;

  return (
    <div className="flex items-center justify-center hover:-translate-y-1 transition duration-300">
      <div className="mx-auto rounded-3xl shadow-xl">
        <div className="grid rounded-3xl max-w-[290px] shadow-sm flex-col group">
          {/* Poster Image */}
          <Image
            src={poster}
            width="300"
            height="200"
            className="rounded-t-xl justify-center grid object-cover border-b-4 border-purple-700"
            alt={title}
          />
          <div className="p-5 z-10 text-center">
            {/* Movie Title */}
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-slate-500">
              ({releaseYear})
            </p>

            {/* Movie Description */}
            <div className="h-20">
              <span className="line-clamp-3 py-2 h-20 text-sm font-light leading-relaxed">
                {description}
              </span>
            </div>

            {/* Movie Rating */}
            <div className="grid-cols-2 flex justify-center">
              <div className="font-black flex flex-col">
                <span className="text-lg">Rating</span>
                <span className="text-xl flex gap-x-1 items-center">
                  {voteAverage.toFixed(1)}
                  <Star fill="#aa00ff" color="#aa00ff"/>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;