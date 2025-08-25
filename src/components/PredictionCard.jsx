import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Heart, ExternalLink, Github, Calendar, User, Zap } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export const PredictionCard = ({ prediction, onVote, onGenerateMVP }) => {
  const { user } = useAuth()
  const [isVoting, setIsVoting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleVote = async () => {
    if (!user || isVoting) return
    setIsVoting(true)
    try {
      await onVote(prediction.id)
    } finally {
      setIsVoting(false)
    }
  }

  const handleGenerateMVP = async () => {
    if (isGenerating) return
    setIsGenerating(true)
    try {
      await onGenerateMVP(prediction.id)
    } finally {
      setIsGenerating(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'validated': return 'text-green-600 bg-green-50'
      case 'building': return 'text-blue-600 bg-blue-50'
      case 'launched': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const canGenerateMVP = prediction.status === 'validated' && prediction.upvotes >= 50

  return (
    <Card variant="elevated" className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="mb-2">{prediction.statement}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{prediction.username}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(prediction.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prediction.status)}`}>
            {prediction.status}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant={prediction.hasVoted ? "primary" : "outline"}
              size="sm"
              onClick={handleVote}
              disabled={!user || isVoting}
              className="flex items-center space-x-1"
            >
              <Heart className={`h-4 w-4 ${prediction.hasVoted ? 'fill-current' : ''}`} />
              <span>{prediction.upvotes}</span>
            </Button>

            {canGenerateMVP && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleGenerateMVP}
                disabled={isGenerating}
                className="flex items-center space-x-1"
              >
                <Zap className="h-4 w-4" />
                <span>{isGenerating ? 'Generating...' : 'Generate MVP'}</span>
              </Button>
            )}
          </div>

          {prediction.status === 'launched' && (
            <div className="flex items-center space-x-2">
              {prediction.githubUrl && (
                <a
                  href={prediction.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {prediction.previewUrl && (
                <a
                  href={prediction.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {prediction.status === 'building' && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              🚀 MVP is being generated! This may take a few minutes...
            </p>
          </div>
        )}

        {prediction.techStack && prediction.techStack.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-text-secondary mb-2">Tech Stack:</p>
            <div className="flex flex-wrap gap-1">
              {prediction.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}