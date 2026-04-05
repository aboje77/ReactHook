import React from 'react'
import MovieCard from './MovieCard'

export default function MovieList({ movies }) {
  if (!movies.length) return <p className="empty">No movies found.</p>

  return (
    <div className="movie-list">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  )
}