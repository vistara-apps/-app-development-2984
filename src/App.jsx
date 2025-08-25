import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Layout/Header'
import { Home } from './pages/Home'
import { Submit } from './pages/Submit'
import { Leaderboard } from './pages/Leaderboard'
import { Auth } from './pages/Auth'

function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
    </div>
  )
}

export default App