import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/Button'
import { useAuth } from '../../contexts/AuthContext'
import { Lightbulb, LogOut, User } from 'lucide-react'

export const Header = () => {
  const { user, signOut } = useAuth()
  const location = useLocation()

  return (
    <header className="border-b border-border bg-surface">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <span className="heading">PredictionForge</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              Predictions
            </Link>
            <Link
              to="/leaderboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/leaderboard' ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              Leaderboard
            </Link>
            {user && (
              <Link
                to="/submit"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/submit' ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                Submit Idea
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}