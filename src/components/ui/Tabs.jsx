import React, { useState } from 'react'
import { clsx } from 'clsx'

export const Tabs = ({ defaultValue, children, onValueChange }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  const handleTabChange = (value) => {
    setActiveTab(value)
    onValueChange?.(value)
  }

  return (
    <div className="w-full">
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, onTabChange: handleTabChange })
      )}
    </div>
  )
}

export const TabsList = ({ className, children, activeTab, onTabChange }) => {
  return (
    <div className={clsx('inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1', className)}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, onTabChange })
      )}
    </div>
  )
}

export const TabsTrigger = ({ value, children, activeTab, onTabChange }) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        activeTab === value ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary'
      )}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ value, children, activeTab }) => {
  if (activeTab !== value) return null
  
  return (
    <div className="mt-2 animate-fade-in">
      {children}
    </div>
  )
}