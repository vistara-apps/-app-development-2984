import React from 'react'
import { clsx } from 'clsx'

export const Card = ({ className, children, variant = 'default', ...props }) => {
  return (
    <div
      className={clsx(
        'rounded-lg border border-border bg-surface',
        variant === 'elevated' && 'shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div className={clsx('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3 className={clsx('heading', className)} {...props}>
      {children}
    </h3>
  )
}

export const CardContent = ({ className, children, ...props }) => {
  return (
    <div className={clsx('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
}