import React from 'react'
import { cn } from '@/utils/cn'

export const Input = React.forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-darkText-secondary">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-darkText-muted pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-white border border-slate-200 rounded-input py-2 px-3.5 text-sm text-darkText-primary placeholder:text-darkText-muted focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200',
            Icon && 'pl-10',
            error && 'border-semantic-error focus:ring-semantic-error/30 focus:border-semantic-error',
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-semantic-error">{error}</span>}
      {helperText && !error && <span className="text-xs text-darkText-muted">{helperText}</span>}
    </div>
  )
})

Input.displayName = 'Input'
