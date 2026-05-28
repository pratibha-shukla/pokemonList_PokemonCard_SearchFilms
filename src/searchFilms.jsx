import React, { useState } from "react";

export default function StarWarsFilmFinder() {
  const [name, setName] = useState("");
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchedCharacter, setSearchedCharacter] = useState("");

  async function searchFilmsMock(e) {
    if (e) e.preventDefault();
    if (!name.trim()) return;

    setError("");
    setLoading(true);
    setFilms([]);
    setSearchedCharacter("");

    try {
     
      const res = await fetch("https://swapi.info/api/people");
      if (!res.ok) {
        throw new Error("Not able to fetch.");
      }
      const people = await res.json();

      
      const targetCharacter = people.find((person) =>
         person.name.toLowerCase() === name.trim().toLowerCase()
      );

      if (!targetCharacter) {
        throw new Error(`Character "${name}" not found.`);
      }

      setSearchedCharacter(targetCharacter.name);

      
      if (targetCharacter.films && targetCharacter.films.length > 0) {
        const filmPromises = targetCharacter.films.map(async (url) => {
          const filmRes = await fetch(url);
          if (!filmRes.ok) throw new Error("Failed to load film details.");
          return filmRes.json();
        });

        const filmDataArray = await Promise.all(filmPromises);
        
        
        const formattedFilms = filmDataArray.map((film) => ({
          id: film.episode_id || film.url,
          title: film.title,
          year: new Date(film.release_date).getFullYear(),
        }));

        setFilms(formattedFilms);
      } else {
        setFilms([]);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <form onSubmit={searchFilmsMock}>
        <input
          type="text"
          placeholder="Type(Luke Skywalker)..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading} style={{padding: "10px",width: "160px", color: "blue"}}
        />
        <button type="submit" disabled={loading} style={{ marginLeft: "8px",padding: "10px", width: "120px",color: "red" }}>
          Search Films
        </button>
      </form>

      {loading && <p style={{ color: "green" }}>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {searchedCharacter && !loading && (
        <div>
          <h3 style={{color: "blue"}}>{searchedCharacter}'s Films (Title and Year)</h3>
          {films.length === 0 ? (
            <p>No films found for this character.</p>
          ) : (
            <ul>
              {films.map((film) => (
                <li key={film.id} style={{listStyle: "none", color: "purple", marginBottom: "10px"}}>
                  {film.title} ({film.year})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

  