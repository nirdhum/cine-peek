import React from 'react'

const MovieCard = ({movie:
    {
        title,
        original_language,
        poster_path,
        release_date,
    }
}) => {
  return (
    <div className='movie-card'>
        <img src={poster_path?`https://image.tmdb.org/t/p/w500/${poster_path}`:'./no-movie.png'} alt="" />
        <p className="text-white">{title}</p>
        <p className="text-white">{release_date}</p>
        <p className="text-white">{original_language}</p>
    </div>
  )
}

export default MovieCard