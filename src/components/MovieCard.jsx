import React from "react";

const MovieCard = ({
  movie: { title, original_language, poster_path, release_date, vote_average },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "./no-movie.png"
        }
        alt=""
      />

      <div>
        <h3 className="text-white">{title}</h3>

        <div className="content">
          <div className="rating gap-1.5">
            <img src="./star.svg" alt="Star Icon" />
            <p className="text-white">
              {vote_average ? Math.floor(vote_average * 10) / 10 : "N/A"}
            </p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
