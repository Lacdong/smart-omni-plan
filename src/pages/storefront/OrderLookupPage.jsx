import React, { useState } from 'react'
import { Search, Truck, Check, AlertCircle, RefreshCw, Sparkles, Package, ShieldCheck } from 'lucide-react'
import { ORDER_TRACKING_DATA } from '@/data/mockStorefrontData'
import './OrderLookupPage.css'

export function OrderLookupPage() {
  const [searchId, setSearchId] = useState('')
  const [activeOrder, setActiveOrder] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e) => {
    e?.preventDefault()
    if (!searchId.trim()) return

    setIsSearching(true)
    setHasSearched(false)

    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
      const found = ORDER_TRACKING_DATA[searchId.trim().toUpperCase()] || null
      setActiveOrder(found)
    }, 500)
  }

  const handlePresetSearch = (presetId) => {
    setSearchId(presetId)
    setIsSearching(true)
    setHasSearched(false)

    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
      setActiveOrder(ORDER_TRACKING_DATA[presetId])
    }, 400)
  }

  return (
    <div className="order-lookup-container">
      <div className="order-lookup-card liquid-glass-container">
        {/* Header */}
        <div className="lookup-header">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="lookup-badge">
              <Sparkles size={13} />
              <span>Cổng Tra Cứu Đơn Hàng Đa Sàn (SCR-23)</span>
            </div>

            <a
              href="/admin/orders"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white font-extrabold text-[11px] hover:bg-slate-800 transition-colors shadow-sm"
            >
              <span>Quản Lý Đơn Hàng ERP (Màn SCR-30)</span>
              <Package size={13} />
            </a>
          </div>
          <h1 className="lookup-title">Tra Cứu Vận Đơn Shopee & TikTok Shop</h1>
          <p className="lookup-subtitle">Nhập Mã đơn hàng hoặc Mã vận đơn để kiểm tra hành trình vận chuyển tập trung</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="lookup-form">
          <div className="lookup-input-wrapper">
            <Truck className="lookup-icon" size={18} />
            <input
              type="text"
              className="lookup-input liquid-glass-input"
              placeholder="Ví dụ: SPX123456789 hoặc TT998877"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-lookup-submit" disabled={isSearching}>
            {isSearching ? (
              <RefreshCw className="animate-spin" size={16} />
            ) : (
              <>
                <span>Tra Cứu Ngay</span>
                <Search size={16} />
              </>
            )}
          </button>
        </form>

        {/* Quick Hints */}
        <div className="lookup-quick-hints">
          <span>Mã đơn thử nghiệm:</span>
          <span className="hint-chip" onClick={() => handlePresetSearch('SPX123456789')}>
            SPX123456789 (Shopee Mall)
          </span>
          <span className="hint-chip" onClick={() => handlePresetSearch('TT998877')}>
            TT998877 (TikTok Shop)
          </span>
        </div>

        {/* Result State (Success) */}
        {hasSearched && activeOrder && (
          <div className="order-result-box liquid-glass-container">
            <div className="order-meta-header">
              <div>
                <span className="order-id-title">Mã Vận Đơn #{activeOrder.orderId}</span>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>
                  Đơn vị vận chuyển: <strong style={{ color: '#0F172A' }}>{activeOrder.carrier}</strong> • Cập nhật: {activeOrder.updatedAt}
                </div>
              </div>
              <span className="order-platform-pill">
                {activeOrder.platform === 'shopee' ? '🍊 Shopee Mall' : '🎵 TikTok Shop'}
              </span>
            </div>

            {/* 5-Step Timeline Tracker */}
            <div className="timeline-stepper">
              {activeOrder.steps.map((step, idx) => (
                <div key={idx} className="timeline-step">
                  <div
                    className={`step-circle ${
                      step.completed ? 'completed' : step.current ? 'current' : 'upcoming'
                    }`}
                  >
                    {step.completed ? <Check size={14} strokeWidth={3} /> : idx + 1}
                  </div>
                  <span className="step-title">{step.title}</span>
                  {step.date && <span className="step-date">{step.date}</span>}
                </div>
              ))}
            </div>

            {/* Status Message Banner */}
            <div className="order-status-banner">
              <strong>Trạng thái: {activeOrder.statusBadge}</strong>
              <div style={{ marginTop: 4 }}>{activeOrder.statusMessage}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: '#4F46E5', fontWeight: 800 }}>
                {activeOrder.estimatedDelivery}
              </div>
            </div>
          </div>
        )}

        {/* Result State (Not Found) */}
        {hasSearched && !activeOrder && (
          <div className="order-not-found-box liquid-glass-container">
            <div className="not-found-icon">
              <AlertCircle size={24} />
            </div>
            <div className="not-found-title">Không Tìm Thấy Mã Vận Đơn</div>
            <div className="not-found-desc">
              Hệ thống chưa tìm thấy thông tin đơn hàng với mã "{searchId}". Vui lòng kiểm tra lại mã hoặc thử mã gợi ý phía trên.
            </div>
            <button
              type="button"
              className="btn-try-again"
              onClick={() => {
                setSearchId('')
                setHasSearched(false)
              }}
            >
              Thử Vận Đơn Khác
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
