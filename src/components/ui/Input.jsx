import React from 'react'
import { clsx } from 'clsx'

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        'flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}