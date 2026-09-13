import React from 'react'
import { cn } from '@/utils/cn'

export function StatusBadge({ status, className }) {
  const statusMap = {
    // Orders / Outbox
    SUCCESS: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    CONFIRMED: 'bg-blue-50 text-blue-700 border-blue-200',
    PACKING: 'bg-violet-50 text-violet-700 border-violet-200',
    SHIPPING: 'bg-amber-50 text-amber-700 border-amber-200',
    DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    FAILED: 'bg-red-50 text-red-700 border-red-200',
    CANCELLED: 'bg-slate-100 text-slate-600 border-slate-200',
    RETURNED: 'bg-orange-50 text-orange-700 border-orange-200',

    // Inventory & AI
    ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    STOCKOUT_RISK: 'bg-red-50 text-red-700 border-red-200',
    DEADSTOCK_RISK: 'bg-amber-50 text-amber-700 border-amber-200',
    PRO_TIER: 'bg-violet-50 text-violet-700 border-violet-200',
    FREE_TIER: 'bg-slate-100 text-slate-600 border-slate-200',
    LOCKED: 'bg-red-50 text-red-700 border-red-200',
  }

  const normalized = (status || '').toUpperCase()
  const badgeStyle = statusMap[normalized] || 'bg-slate-50 text-slate-700 border-slate-200'

  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border', badgeStyle, className)}>
      <span className="w-1.5 h-1.5 rounded-full fill-current bg-current opacity-75"></span>
      {status}
    </span>
  )
}
