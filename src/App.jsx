import React, { useState } from "react";
import Search from "./components/search";

const App = () => {

  const [searchTerm, setsearchTerm] = useState('');

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1 className="capitalize">Find <span className="text-gradient">Movies</span> you'll like easily.</h1>
        </header>

        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
      </div>
    </main>
  );
};

export default App;
