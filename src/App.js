import React, { useState, useEffect } from "react";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movie, setMovie] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const searchMovie = async () => {
    if (!movieName) return;

    const apiKey = "YOUR_OMDB_API_KEY";

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovie(data);
      } else {
        alert("Movie not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addFavorite = () => {
    if (
      movie &&
      !favorites.find((fav) => fav.imdbID === movie.imdbID)
    ) {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="container">
      <h1>Movie Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />

        <button onClick={searchMovie}>
          Search
        </button>
      </div>

      {movie && (
        <div className="movie-card">
          <img
            src={movie.Poster}
            alt={movie.Title}
          />

          <h2>{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>IMDb:</strong> {movie.imdbRating}</p>

          <button onClick={addFavorite}>
            Save Favorite
          </button>
        </div>
      )}

      <h2>Favorites</h2>

      <div className="favorites">
        {favorites.map((fav) => (
          <div
            key={fav.imdbID}
            className="favorite-card"
          >
            <img
              src={fav.Poster}
              alt={fav.Title}
            />
            <p>{fav.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
