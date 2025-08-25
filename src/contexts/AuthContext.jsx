import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    // Demo implementation
    const demoUser = {
      id: 'demo-user-' + Date.now(),
      email,
      username: email.split('@')[0],
      createdAt: new Date().toISOString()
    }
    setUser(demoUser)
    localStorage.setItem('user', JSON.stringify(demoUser))
    return demoUser
  }

  const signUp = async (email, password, username) => {
    // Demo implementation
    const demoUser = {
      id: 'demo-user-' + Date.now(),
      email,
      username,
      createdAt: new Date().toISOString()
    }
    setUser(demoUser)
    localStorage.setItem('user', JSON.stringify(demoUser))
    return demoUser
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}