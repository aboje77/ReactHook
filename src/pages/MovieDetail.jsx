import React from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'

function getEmbedUrl(url) {
  if (!url) return null
  // If already an embed URL, return as-is
  if (url.includes('youtube.com/embed') || url.includes('player.vimeo.com')) return url

  // Convert common YouTube watch links to embed form
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v) return `https://www.youtube.com/embed/${v}`
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1)
      return `https://www.youtube.com/embed/${id}`
    }
  } catch (e) {
    // fallback: return original
  }
  return url
}

export default function MovieDetail() {
  const { id } = useParams() // Extract the movie ID from the URL parameter
  const location = useLocation() // Access the current location object
  const navigate = useNavigate() // Navigation hook for redirecting the user

  // We prefer the movie passed through Link state for immediate display. 
  // If not available (e.g., user refreshed the page), show a fallback.
  const movie = location.state?.movie

  if (!movie) {
    return (
      <div style={{ padding: '1rem' }}>
        <h2>Movie not found</h2>
        <p>The movie data was not passed to this page. Return to home to select a movie.</p>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  // Convert the stored trailer URL into an embed-friendly format
  const embed = getEmbedUrl(movie.trailerURL)

  return (
    <div className="movie-detail-container">
      {/* Navigate back to the home page */}
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Home
      </button>
      <div className="movie-detail-content">
        <div className="movie-detail-header">
          <h2>{movie.title}</h2>
          <p className="rating">Rating: {movie.rating}</p>
        </div>
        <div className="movie-detail-body">
          <img src={movie.posterURL} alt={movie.title} className="detail-poster" />
          <div className="movie-info-section">
            <p className="movie-description">{movie.description}</p>
            {/* Render the YouTube trailer if an embed link is available */}
            {embed ? (
              <div className="trailer-container">
                <div className="video-wrapper">
                  <iframe
                    title={`${movie.title} trailer`}
                    src={embed}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <p>No trailer available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}