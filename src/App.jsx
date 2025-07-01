import React, { useState, useEffect } from "react";
import Search from "./components/search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchMovies = async () => {

    setisLoading('True');
    seterrorMsg ('');

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?include_adult=flase&include_video=false&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      
      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      console.log(data);

      if(data.response === 'False'){
        seterrorMsg(data.Error || 'Failed to fetch movies');
        setmovieList([]);
        return;
      }setmovieList(data.results || []);

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      seterrorMsg('Error Fetching movies ! ! !');
    } finally{
      setisLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1 className="capitalize">
            Find <span className="text-gradient">Movies</span> you'll like
            easily.
          </h1>

          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />
        </header>

        <section className="all-movies pt-6">
          <h2>All Movies</h2>

          {
            isLoading?(
              <Spinner/>
            ): errorMsg?(
              <p className="text-red-600">{errorMsg}</p>
            ):(
              <ul>
                {movieList.map((movie)=>(
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )
          }
        </section>
      </div>
    </main>
  );
};

export default App;
