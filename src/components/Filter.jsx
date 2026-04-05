import React from 'react'

// Simple controlled inputs to update parent filter state.
export default function Filter({ titleFilter, setTitleFilter, ratingFilter, setRatingFilter }) {
  return (
    <div className="filter">
      <h2>Filter</h2>
      <input
        placeholder="Search by title"
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
      />
      <label>
        Min rating:
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        />
      </label>
    </div>
  )
}