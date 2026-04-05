import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import MovieDetail from './pages/MovieDetail'

export default function App() {
  return (
    // BrowserRouter provides the navigation context for the entire application
    <BrowserRouter>
      <div id="root">
        <header className="app-header">
          <h1>Aboje's movie & TV Shows</h1>
          <nav className="nav">
            {/* Link components enable navigation without page refreshes */}
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>

        <main>
          {/* Routes component decides which view to render based on the current URL path */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Dynamic route parameter :id allows for individual movie detail pages */}
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}