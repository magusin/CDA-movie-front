import './App.css'
import React from 'react'
import Header from './component/Header/header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Movie from './views/Movie'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
