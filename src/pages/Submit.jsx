import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { TextArea } from '../components/ui/TextArea'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Lightbulb, Target, Zap } from 'lucide-react'

export const Submit = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [statement, setStatement] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!statement.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to home after successful submission
      navigate('/')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary mb-4">
              You need to sign in to submit predictions.
            </p>
            <Button onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="display mb-4">Submit Your Prediction</h1>
          <p className="body text-text-secondary">
            Share your app idea as a clear, testable prediction. The community will validate it through upvotes.
          </p>
        </div>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              <span>Your Prediction Statement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <TextArea
                  placeholder="e.g., An AI-powered app that helps people find parking spots in real-time will gain 5,000 active users within 2 months of launch..."
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-sm text-text-secondary mt-2">
                  Be specific about your app idea, target users, and measurable success criteria.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-3">
                      <Target className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Good Example</h4>
                        <p className="text-xs text-text-secondary mt-1">
                          "A meditation app with AI-generated personalized sessions will reach 1,000 daily active users in 3 months"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-3">
                      <Zap className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Pro Tip</h4>
                        <p className="text-xs text-text-secondary mt-1">
                          Include specific metrics and timeframes to make your prediction more compelling and measurable.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!statement.trim() || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Prediction'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your prediction will be visible to the community</li>
            <li>• Community members can upvote promising ideas</li>
            <li>• At 50 upvotes, AI will generate an MVP codebase</li>
            <li>• Your validated idea gets a head start with generated code!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}