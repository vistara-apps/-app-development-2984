import React, { useState, useEffect } from 'react'
import { PredictionCard } from '../components/PredictionCard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs'
import { generateMVPCode } from '../lib/openai'

export const Home = () => {
  const [predictions, setPredictions] = useState([])
  const [activeTab, setActiveTab] = useState('all')

  // Demo data
  useEffect(() => {
    const demoData = [
      {
        id: '1',
        statement: 'An AI-powered nutrition app that scans food photos and provides instant macro breakdowns will gain 10,000 users in 3 months',
        userId: 'user1',
        username: 'healthtech_builder',
        status: 'validated',
        upvotes: 67,
        createdAt: '2024-01-15T10:00:00Z',
        hasVoted: false,
        githubUrl: null,
        previewUrl: null,
        techStack: ['React', 'Computer Vision', 'Firebase']
      },
      {
        id: '2',
        statement: 'A collaborative workspace for remote teams with virtual reality integration will revolutionize remote work within 6 months',
        userId: 'user2',
        username: 'vr_innovator',
        status: 'pending',
        upvotes: 23,
        createdAt: '2024-01-20T14:30:00Z',
        hasVoted: true,
        githubUrl: null,
        previewUrl: null,
        techStack: ['WebXR', 'Three.js', 'WebRTC']
      },
      {
        id: '3',
        statement: 'A blockchain-based loyalty program for local businesses will increase customer retention by 40% in pilot cities',
        userId: 'user3',
        username: 'crypto_entrepreneur',
        status: 'launched',
        upvotes: 89,
        createdAt: '2024-01-10T09:15:00Z',
        hasVoted: false,
        githubUrl: 'https://github.com/demo/loyalty-chain',
        previewUrl: 'https://loyalty-chain-demo.vercel.app',
        techStack: ['Solidity', 'React', 'Web3.js', 'IPFS']
      }
    ]
    setPredictions(demoData)
  }, [])

  const handleVote = async (predictionId) => {
    setPredictions(prev => prev.map(p => 
      p.id === predictionId 
        ? { ...p, upvotes: p.hasVoted ? p.upvotes - 1 : p.upvotes + 1, hasVoted: !p.hasVoted }
        : p
    ))
  }

  const handleGenerateMVP = async (predictionId) => {
    const prediction = predictions.find(p => p.id === predictionId)
    if (!prediction) return

    // Update status to building
    setPredictions(prev => prev.map(p => 
      p.id === predictionId ? { ...p, status: 'building' } : p
    ))

    try {
      // Simulate MVP generation
      setTimeout(() => {
        setPredictions(prev => prev.map(p => 
          p.id === predictionId 
            ? { 
                ...p, 
                status: 'launched',
                githubUrl: 'https://github.com/demo/generated-mvp-' + predictionId,
                previewUrl: 'https://generated-mvp-' + predictionId + '.vercel.app'
              } 
            : p
        ))
      }, 3000)
    } catch (error) {
      console.error('Error generating MVP:', error)
      // Revert status on error
      setPredictions(prev => prev.map(p => 
        p.id === predictionId ? { ...p, status: 'validated' } : p
      ))
    }
  }

  const filteredPredictions = predictions.filter(p => {
    switch (activeTab) {
      case 'pending': return p.status === 'pending'
      case 'validated': return p.status === 'validated'
      case 'launched': return p.status === 'launched'
      default: return true
    }
  })

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="display mb-4">Community Predictions</h1>
        <p className="body text-text-secondary">
          Discover and validate the next big app ideas through community consensus.
        </p>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Predictions</TabsTrigger>
          <TabsTrigger value="pending">Pending ({predictions.filter(p => p.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="validated">Validated ({predictions.filter(p => p.status === 'validated').length})</TabsTrigger>
          <TabsTrigger value="launched">Launched ({predictions.filter(p => p.status === 'launched').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPredictions.map(prediction => (
              <PredictionCard
                key={prediction.id}
                prediction={prediction}
                onVote={handleVote}
                onGenerateMVP={handleGenerateMVP}
              />
            ))}
          </div>

          {filteredPredictions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No predictions found in this category.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}