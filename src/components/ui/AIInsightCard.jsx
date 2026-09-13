import React from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

export function AIInsightCard({ title, recommendation, confidence, actionText, onAction, className }) {
  return (
    <div className={cn('liquid-glass-panel p-5 relative overflow-hidden', className)}>
      <div className="flex items-center gap-2 text-indigo-700 mb-2">
        <Sparkles className="w-4 h-4 animate-pulse text-indigo-600" />
        <span className="text-xs font-bold uppercase tracking-wider">SmartOmni AI Recommendation</span>
      </div>
      <h4 className="text-base font-bold text-slate-900">{title}</h4>
      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-medium">{recommendation}</p>
      
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-200/80">
        {confidence && (
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Prophet Model Confidence: {confidence}
          </span>
        )}
        {actionText && (
          <button
            onClick={onAction}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-900 transition-colors"
          >
            {actionText} &rarr;
          </button>
        )}
      </div>
    </div>
  )
}
