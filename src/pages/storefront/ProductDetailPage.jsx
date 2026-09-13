import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Sparkles, ExternalLink, ArrowRight, ArrowLeft, ShieldCheck, Truck, CheckCircle2, TrendingDown, Tag } from 'lucide-react'
import { PRODUCTS, TENANTS } from '@/data/mockStorefrontData'
import { MarketplaceRedirectModal } from '@/components/storefront/MarketplaceRedirectModal'
import './ProductDetailPage.css'

export function ProductDetailPage() {
  const { tenantSlug = 'hxvf123', productId = '1' } = useParams()
  const tenant = TENANTS[tenantSlug] || TENANTS['hxvf123']
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0]

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch recommended products
  const recommendedProducts = PRODUCTS.filter((p) => product.recommendations.includes(p.id))

  // Find lowest price channel
  const lowestPriceChannel = product.marketplaces.reduce((min, current) => {
    return (current.price < min.price) ? current : min
  }, product.marketplaces[0])

  return (
    <div className="pdp-container">
      {/* Breadcrumbs */}
      <div className="pdp-breadcrumbs">
        <Link to={`/storefront/${tenant.slug}`} className="pdp-breadcrumb-link">
          ← Trở về {tenant.name}
        </Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span style={{ color: '#0F172A', fontWeight: 700 }}>{product.name}</span>
      </div>

      {/* Main View Grid */}
      <div className="pdp-main-grid">
        {/* Left: Product Gallery Card */}
        <div className="pdp-gallery-card liquid-glass-container">
          <div className="pdp-main-image-wrapper">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="pdp-main-img"
            />
            {product.priceRange.discountBadge && (
              <span className="pdp-gallery-discount-badge">
                {product.priceRange.discountBadge}
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="pdp-thumbs-row">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`pdp-thumb-item ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="pdp-thumb-img" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info Card */}
        <div className="pdp-info-card liquid-glass-container">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="pdp-category-pill">{product.category}</span>
              <span className="pdp-sku-badge">SKU: {product.sku}</span>
            </div>

            <h1 className="pdp-title">{product.name}</h1>

            <div className="pdp-rating-row">
              <div className="pdp-stars">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                <span style={{ fontWeight: 800, marginLeft: 4, color: '#D97706' }}>{product.rating}</span>
              </div>
              <span>•</span>
              <span className="font-semibold">{product.reviewCount} Đánh giá đã xác thực</span>
              <span>•</span>
              <span className="text-indigo-600 font-bold">100% Chính Hãng</span>
            </div>

            {/* Price Showcase */}
            <div className="pdp-price-box">
              <span className="pdp-price-main">
                {product.priceRange.min.toLocaleString('vi-VN')}{product.priceRange.currency}
              </span>
              {product.priceRange.originalMin && (
                <span className="pdp-price-old">
                  {product.priceRange.originalMin.toLocaleString('vi-VN')}{product.priceRange.currency}
                </span>
              )}
            </div>

            <p className="pdp-description">{product.description}</p>

            {/* Lowest Price Banner Hint */}
            <div className="bg-emerald-50/80 border border-emerald-200/90 p-3 rounded-2xl flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingDown className="text-emerald-600" size={16} />
                <span className="text-xs font-bold text-slate-800">
                  Giá tốt nhất: <span className="text-emerald-600 font-extrabold">{lowestPriceChannel.formattedPrice}</span> tại {lowestPriceChannel.platformName}
                </span>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Tiết kiệm tối đa 🔥
              </span>
            </div>

            {/* Guarantees Box */}
            <div className="pdp-guarantee-box liquid-glass-container">
              <div className="guarantee-item">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>Cam kết 100% chính hãng</span>
              </div>
              <div className="guarantee-item">
                <Truck size={16} className="text-indigo-600" />
                <span>Giao hàng nhanh toàn quốc</span>
              </div>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            className="pdp-btn-buy"
            onClick={() => setIsModalOpen(true)}
          >
            <span>So Sánh & Mua Trực Tiếp Trên Sàn</span>
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      {/* 2. DEDICATED MULTI-CHANNEL PRICE COMPARISON TABLE WIDGET */}
      <div className="pdp-price-table-card liquid-glass-container">
        <div className="pdp-price-table-header">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-500" size={20} />
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                Bảng So Sánh Giá Trực Tuyến Đa Sàn (SmartOmni AI Tracker)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Cập nhật giá bán thực tế và chương trình ưu đãi từ các cửa hàng chính hãng ủy quyền
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 size={13} /> Dữ liệu trực tuyến 24/7
          </span>
        </div>

        <div className="pdp-price-channels-grid">
          {product.marketplaces.map((m, idx) => {
            const isLowest = m.price === product.priceRange.min
            return (
              <a
                key={idx}
                href={m.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`pdp-price-channel-item ${m.platform} ${isLowest ? 'lowest-price' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="channel-icon-avatar">
                    {m.platform === 'shopee' ? '🍊' : m.platform === 'tiktok' ? '🎵' : '💙'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">{m.platformName}</span>
                      {isLowest && (
                        <span className="text-[10px] font-extrabold bg-emerald-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                          Giá Rẻ Nhất 🔥
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{m.badgeText}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-black text-slate-900 text-xl">
                    {m.formattedPrice}
                  </span>
                  <button type="button" className={`pdp-channel-buy-btn ${m.platform}`}>
                    <span>Mua Trực Tiếp</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* AI Recommendation Shelf */}
      {recommendedProducts.length > 0 && (
        <div className="ai-shelf-container">
          <div className="ai-shelf-header">
            <Sparkles className="text-indigo-600" size={20} />
            <span>Sản Phẩm Gợi Ý Cho Bạn (AI Smart Recommendation)</span>
          </div>

          <div className="ai-shelf-grid">
            {recommendedProducts.map((rec) => (
              <Link
                key={rec.id}
                to={`/storefront/${tenant.slug}/product/${rec.id}`}
                className="product-card-glass liquid-glass-container"
              >
                <div>
                  <div className="product-img-wrapper" style={{ height: 160 }}>
                    <img src={rec.images[0]} alt={rec.name} className="product-img-real" />
                  </div>
                  <span className="product-sku">{rec.sku}</span>
                  <h3 className="product-title" style={{ fontSize: 14, height: 38 }}>{rec.name}</h3>
                </div>

                <div className="product-footer-row">
                  <span className="product-price-val">
                    {rec.priceRange.min.toLocaleString('vi-VN')}{rec.priceRange.currency}
                  </span>
                  <button type="button" className="btn-view-details">
                    <span>Xem Ngay</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* SCR-22 Marketplace Redirect Modal */}
      <MarketplaceRedirectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </div>
  )
}
