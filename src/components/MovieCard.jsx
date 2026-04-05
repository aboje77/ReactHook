import React from 'react'
import { Link } from 'react-router-dom'

// Presentational component: receives a `movie` object and renders its fields.
// Wrap the card with a <Link> to the detail page and pass the movie via state.
export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} state={{ movie }} className="movie-card-link">
      <div className="movie-card">
        <img className="poster" src={movie.posterURL} alt={movie.title} />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p className="rating">Rating: {movie.rating}</p>
          <p className="desc">{movie.description}</p>
        </div>
      </div>
    </Link>
  )
}