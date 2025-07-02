import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState("");

  useDebounce(() => setdebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setisLoading("True");
    seterrorMsg("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&include_adult=false`
        : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      console.log(data);

      if (data.response === "False") {
        seterrorMsg(data.Error || "Failed to fetch movies");
        setmovieList([]);
        return;
      }
      setmovieList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      seterrorMsg("Error Fetching movies ! ! !");
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <div className="flex gap-0 justify-center items-end pb-8 md:pb-16 ">
            {movieList.slice(0, 3).map((movie, index) => (
              <div
                key={movie.id}
                className={`relative transition-all duration-300 ${
                  index === 1 ? "z-10 scale-120 shadow-lg" : "z-0"
                }`}
              >
                <img
                  // key={movie.id}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "./no-movie.png"
                  }
                  className={
                    index === 0
                      ? "w-fit h-32 rounded-lg sm:h-40 md:h-64 -rotate-8 translate-x-2"
                      : index === 2
                      ? " w-fit h-32 rounded-lg sm:h-40 md:h-64 rotate-8 -translate-x-2"
                      : " w-fit h-32 rounded-lg sm:h-40 md:h-64"
                  }
                  alt={`Image ${movie.title}`}
                />
              </div>
            ))}
          </div>
          <h1 className="capitalize text-4xl md:text-5xl">
            Find <span className="text-gradient">Movies</span> you'll like
            easily.
          </h1>

          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        </header>

        <section className="all-movies pt-6">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMsg ? (
            <p className="text-red-600">{errorMsg}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
