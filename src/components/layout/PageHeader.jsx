import React from 'react'
import { cn } from '@/utils/cn'

export function PageHeader({ title, description, actions, className }) {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-6', className)}>
      <div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-xs md:text-sm text-slate-600 font-medium">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3">{actions}</div>
      )}
    </div>
  )
}
