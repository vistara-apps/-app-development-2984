import React from 'react'
import { cva } from 'class-variance-authority'
import { clsx } from 'clsx'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "border border-border bg-transparent hover:bg-gray-50",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        ghost: "hover:bg-gray-100"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
)

export const Button = ({ className, variant, size, ...props }) => {
  return (
    <button
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}