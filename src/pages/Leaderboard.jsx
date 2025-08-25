import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Trophy, TrendingUp, Users, Zap, ExternalLink, Github } from 'lucide-react'

export const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [sortBy, setSortBy] = useState('upvotes')

  useEffect(() => {
    // Demo leaderboard data
    const demoData = [
      {
        id: '1',
        statement: 'A blockchain-based loyalty program for local businesses will increase customer retention by 40% in pilot cities',
        username: 'crypto_entrepreneur',
        upvotes: 89,
        status: 'launched',
        createdAt: '2024-01-10T09:15:00Z',
        githubUrl: 'https://github.com/demo/loyalty-chain',
        previewUrl: 'https://loyalty-chain-demo.vercel.app',
        techStack: ['Solidity', 'React', 'Web3.js'],
        successScore: 92
      },
      {
        id: '2',
        statement: 'An AI-powered nutrition app that scans food photos and provides instant macro breakdowns will gain 10,000 users in 3 months',
        username: 'healthtech_builder',
        upvotes: 67,
        status: 'validated',
        createdAt: '2024-01-15T10:00:00Z',
        githubUrl: null,
        previewUrl: null,
        techStack: ['React', 'Computer Vision', 'Firebase'],
        successScore: 78
      },
      {
        id: '3',
        statement: 'A collaborative workspace for remote teams with virtual reality integration will revolutionize remote work within 6 months',
        username: 'vr_innovator',
        upvotes: 45,
        status: 'building',
        createdAt: '2024-01-20T14:30:00Z',
        githubUrl: 'https://github.com/demo/vr-workspace',
        previewUrl: null,
        techStack: ['WebXR', 'Three.js', 'WebRTC'],
        successScore: 65
      },
      {
        id: '4',
        statement: 'A social media platform for pet owners with location-based meetups will reach 5,000 active users in 4 months',
        username: 'pet_lover_dev',
        upvotes: 34,
        status: 'pending',
        createdAt: '2024-01-25T16:45:00Z',
        githubUrl: null,
        previewUrl: null,
        techStack: ['React Native', 'Firebase', 'Maps API'],
        successScore: 58
      }
    ]
    setLeaderboardData(demoData)
  }, [])

  const sortedData = [...leaderboardData].sort((a, b) => {
    switch (sortBy) {
      case 'upvotes':
        return b.upvotes - a.upvotes
      case 'recent':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'success':
        return b.successScore - a.successScore
      default:
        return 0
    }
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'launched': return <Trophy className="h-4 w-4 text-yellow-600" />
      case 'building': return <Zap className="h-4 w-4 text-blue-600" />
      case 'validated': return <TrendingUp className="h-4 w-4 text-green-600" />
      default: return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'launched': return 'bg-yellow-100 text-yellow-800'
      case 'building': return 'bg-blue-100 text-blue-800'
      case 'validated': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="display mb-4">Prediction Leaderboard</h1>
        <p className="body text-text-secondary">
          Track the most successful predictions and celebrate community wins.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={sortBy === 'upvotes' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSortBy('upvotes')}
        >
          Most Upvoted
        </Button>
        <Button
          variant={sortBy === 'success' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSortBy('success')}
        >
          Success Score
        </Button>
        <Button
          variant={sortBy === 'recent' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSortBy('recent')}
        >
          Most Recent
        </Button>
      </div>

      <div className="space-y-4">
        {sortedData.map((item, index) => (
          <Card key={item.id} variant="elevated" className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                    #{index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="heading mb-2 line-clamp-2">{item.statement}</h3>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-sm text-text-secondary">by @{item.username}</span>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(item.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{item.upvotes} upvotes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>Score: {item.successScore}/100</span>
                      </div>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>

                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {item.techStack.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-text-secondary hover:text-primary transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {item.previewUrl && (
                    <a
                      href={item.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-text-secondary hover:text-primary transition-colors"
                      title="View Live Preview"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-text-secondary">No predictions found on the leaderboard yet.</p>
        </div>
      )}
    </div>
  )
}