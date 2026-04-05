import React, { useState } from 'react'
import MovieList from '../components/MovieList'
import Filter from '../components/Filter'

// Home page: contains movies state, add-form, and filtering UI.
export default function Home() {
  const initialMovies = [
    {
      id: 1,
      title: 'The Issakaba',
      description:
        'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      posterURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMKvBXRx4WWNe-4FWSHgYb5STw2QHKPRGyVA&s',
      rating: 9.3,
      trailerURL: 'https://www.youtube.com/embed/6hB3S9bIaco',
    },
    {
      id: 2,
      title: 'Breaking Bad',
      description:
        'A high school chemistry teacher turned methamphetamine producer navigates dangers of the criminal underworld.',
      posterURL: 'https://www.youtube.com/watch?v=budCAG5DZP4',
      rating: 9.5,
      trailerURL: 'https://www.youtube.com/watch?v=budCAG5DZP4',
    },
    {
      id: 3,
      title: 'Inception',
      description:
        'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
      posterURL: 'https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg',
      rating: 8.8,
      trailerURL: 'https://www.youtube.com/embed/YoHD9XEInc0',
    },
  ]

  // State for the list of movies
  const [movies, setMovies] = useState(initialMovies)

  // States for the filtering inputs
  const [titleFilter, setTitleFilter] = useState('')
  const [ratingFilter, setRatingFilter] = useState(0)

  // State for the 'Add Movie' form
  const [form, setForm] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: '',
    trailerURL: '',
  })

  // Function to handle adding a new movie to the state
  const handleAddMovie = (e) => {
    e.preventDefault()
    // Validation: Require title, poster, and rating
    if (!form.title || !form.posterURL || form.rating === '') return

    const next = {
      id: Date.now(), // Unique ID based on timestamp
      title: form.title,
      description: form.description,
      posterURL: form.posterURL,
      rating: Number(form.rating),
      trailerURL: form.trailerURL,
    }
    // Update movie list with the new entry at the top
    setMovies((prev) => [next, ...prev])
    // Reset form fields
    setForm({ title: '', description: '', posterURL: '', rating: '', trailerURL: '' })
  }

  // Derived state: filter movies based on current search criteria
  const filtered = movies.filter((m) => {
    const matchesTitle = m.title.toLowerCase().includes(titleFilter.toLowerCase())
    const matchesRating = m.rating >= Number(ratingFilter || 0)
    return matchesTitle && matchesRating
  })

  return (
    <div>
      <section className="controls">
        <Filter
          titleFilter={titleFilter}
          setTitleFilter={setTitleFilter}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
        />

        <form className="add-form" onSubmit={handleAddMovie}>
          <h2>Add a movie / show</h2>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Poster URL"
            value={form.posterURL}
            onChange={(e) => setForm({ ...form, posterURL: e.target.value })}
          />
          <input
            placeholder="Trailer URL (YouTube embed or watch link)"
            value={form.trailerURL}
            onChange={(e) => setForm({ ...form, trailerURL: e.target.value })}
          />
          <input
            placeholder="Rating (0-10)"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
          />
          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button type="submit">Add Movie</button>
        </form>
      </section>

      <main>
        <MovieList movies={filtered} />
      </main>
    </div>
  )
}