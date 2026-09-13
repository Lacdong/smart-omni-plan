import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

export function GlassModal({ isOpen, onClose, title, children, className }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className={cn('glass-modal-panel w-full max-w-lg p-6 relative overflow-hidden', className)}>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200/80">
          <h3 className="text-lg font-bold text-darkText-primary">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-darkText-muted hover:text-darkText-primary hover:bg-slate-100/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
