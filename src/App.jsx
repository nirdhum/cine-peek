import React from "react";

const App = () => {
  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1 className="capitalize">Find <span className="text-gradient">Movies</span> you'll like easily.</h1>
        </header>

        <p>Search</p>
      </div>
    </main>
  );
};

export default App;
