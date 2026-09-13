import React from 'react'
import { cn } from '@/utils/cn'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  isLoading,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-button transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-brand-500 hover:bg-brand-600 text-white shadow-subtle hover:shadow',
    secondary: 'bg-white hover:bg-slate-50 text-darkText-primary border border-slate-200 shadow-subtle',
    outline: 'bg-transparent hover:bg-slate-100 text-darkText-primary border border-slate-200',
    ghost: 'bg-transparent hover:bg-slate-100 text-darkText-secondary hover:text-darkText-primary',
    ai: 'bg-gradient-to-r from-brand-500 to-violet-600 hover:from-brand-600 hover:to-violet-700 text-white shadow-ai-glow',
    destructive: 'bg-semantic-error hover:bg-red-600 text-white shadow-subtle',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : children}
    </button>
  )
}
