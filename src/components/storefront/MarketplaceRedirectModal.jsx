import React from 'react'
import { ExternalLink, ShoppingBag, ShieldCheck } from 'lucide-react'
import { GlassModal } from '@/components/ui/GlassModal'
import './MarketplaceRedirectModal.css'

export function MarketplaceRedirectModal({ isOpen, onClose, product }) {
  if (!product) return null

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Chọn Kênh Thương Mại Điện Tử Để Mua Hàng"
    >
      <div className="redirect-modal-content">
        {/* Product Brief */}
        <div className="redirect-product-summary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-16 h-16 rounded-xl object-cover border border-slate-200"
          />
          <div className="redirect-product-info">
            <span className="redirect-product-title">{product.name}</span>
            <span className="redirect-product-price">
              Giá ưu đãi: {product.priceRange.min.toLocaleString('vi-VN')}{product.priceRange.currency}
            </span>
          </div>
        </div>

        {/* Marketplace Selection Options */}
        <div className="redirect-options-list">
          {product.marketplaces.map((m, idx) => (
            <a
              key={idx}
              href={m.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`redirect-option-card ${m.colorClass}`}
              onClick={() => {
                console.log(`[Analytics] Outbound redirect to ${m.platformName} for product ${product.id}`)
              }}
            >
              <div className="redirect-option-left">
                <div className={`redirect-platform-icon ${m.colorClass}`}>
                  {m.platform === 'shopee' ? '🍊' : '🎵'}
                </div>
                <div>
                  <div className="redirect-platform-name">{m.platformName}</div>
                  <div className="redirect-platform-badge">{m.badgeText} ({m.priceTeaser})</div>
                </div>
              </div>

              <div className={`redirect-cta-btn ${m.colorClass}`}>
                <span>Chuyển sang {m.platform === 'shopee' ? 'Shopee Mall' : 'TikTok Shop'}</span>
                <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>

        <div className="redirect-disclaimer">
          🔒 SmartOmni không trực tiếp xử lý giỏ hàng hay thu tiền. Giao dịch của bạn được bảo mật tuyệt đối trực tiếp trên ứng dụng gian hàng chính hãng.
        </div>
      </div>
    </GlassModal>
  )
}
