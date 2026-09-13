import React from 'react'
import { cn } from '@/utils/cn'

export function StatCard({ title, value, change, changeType = 'positive', icon: Icon, description, className, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={cn('liquid-glass-panel p-5 flex flex-col justify-between', onClick && 'cursor-pointer hover:bg-white/10 transition-all', className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="text-2xl font-black text-slate-900 tracking-tight">{value}</div>
        {change && (
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <span className={cn('font-bold', changeType === 'positive' ? 'text-emerald-600' : 'text-rose-600')}>
              {change}
            </span>
            {description && <span className="text-slate-500 font-medium">{description}</span>}
          </div>
        )}
      </div>
    </div>
  )
}
