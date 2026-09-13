import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { Sparkles, Star, ShoppingBag, Eye, Search, Filter, ShieldCheck, Tag, Flame, Bookmark } from 'lucide-react'
import { TENANTS, PRODUCTS } from '@/data/mockStorefrontData'
import './TenantStorefrontPage.css'

export function StorefrontCatalogPage() {
  const { tenantSlug = 'hxvf123' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const tenant = TENANTS[tenantSlug] || TENANTS['hxvf123']

  // Parse URL search parameters
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get('q') || ''

  const [activeCategory, setActiveCategory] = useState('Tất cả')

  // Reset active category when tenant slug changes
  useEffect(() => {
    setActiveCategory('Tất cả')
  }, [tenantSlug])

  // Filter products by current tenant AND search query across stores/items
  const filteredProducts = PRODUCTS.filter((product) => {
    const query = searchQuery.toLowerCase().trim()

    // Store context match: if no search query, filter by active tenant slug
    const tenantMatches = !query ? product.tenantSlug === tenant.slug : true

    // Category check
    const categoryMatches = activeCategory === 'Tất cả' || product.category === activeCategory

    // Search query check (matches product title, description, SKU, category, OR tenant name)
    const productTenant = TENANTS[product.tenantSlug]
    const searchMatches = !query || (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (productTenant && productTenant.name.toLowerCase().includes(query))
    )

    return tenantMatches && categoryMatches && searchMatches
  })

  const clearSearch = () => {
    navigate(`/storefront/${tenant.slug}`)
  }

  const handleQuickTagClick = (tag) => {
    navigate(`/storefront/${tenant.slug}?q=${encodeURIComponent(tag)}`)
  }

  return (
    <div className="storefront-container">
      {/* 1. Ultra-Sleek Zappicon Glass Hero Section (SCR-20) */}
      <div className="storefront-hero-card">
        <div className="storefront-hero-badges-row">
          {tenant.verifiedBadges.map((badge, idx) => (
            <div key={idx} className="hero-verified-badge">
              <ShieldCheck size={13} />
              <span>{badge}</span>
            </div>
          ))}
        </div>
        <h1 className="storefront-hero-title">{tenant.bannerTitle}</h1>
        <p className="storefront-hero-subtitle">{tenant.bannerSubtitle}</p>

        {/* Quick Tag Recommendations inside Hero */}
        {tenant.popularTags && tenant.popularTags.length > 0 && (
          <div className="hero-quick-tags-row">
            <span className="hero-quick-tag-label flex items-center gap-1">
              <Tag size={12} /> Từ khóa hot:
            </span>
            {tenant.popularTags.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                className="hero-quick-tag-btn"
                onClick={() => handleQuickTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Category Chips & Active Search Feedback */}
      <div className="storefront-filters-section">
        <div className="storefront-categories-row">
          {tenant.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-chip-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {searchQuery && (
          <div className="search-active-pill">
            <Search size={13} />
            <span>Kết quả tìm kiếm: "{searchQuery}"</span>
            <button type="button" onClick={clearSearch} title="Xóa bộ lọc tìm kiếm">
              &times;
            </button>
          </div>
        )}
      </div>

      {/* 3. Zappicon Pinterest-Style Glass Product Grid with Multi-Channel Pricing */}
      {filteredProducts.length > 0 ? (
        <div className="storefront-product-grid">
          {filteredProducts.map((product) => {
            const productTenant = TENANTS[product.tenantSlug] || tenant
            return (
              <Link
                key={product.id}
                to={`/storefront/${productTenant.slug}/product/${product.id}`}
                className="zappicon-glass-card"
              >
                <div>
                  {/* Card Top Row: Hot Sale Badge & Bookmark Icon */}
                  <div className="zappicon-card-top-row">
                    <div className="zappicon-hot-badge">
                      <Flame size={12} />
                      <span>{product.priceRange.discountBadge || 'Hot Sale'}</span>
                    </div>
                    <button
                      type="button"
                      className="zappicon-bookmark-btn"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      title="Lưu sản phẩm"
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>

                  {/* Floating Product Image Frame */}
                  <div className="zappicon-img-container">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="zappicon-product-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="zappicon-card-info">
                    <h3 className="zappicon-product-title" title={product.name}>
                      {product.name}
                    </h3>
                    <div className="zappicon-product-subtitle">
                      {product.category} • SKU: {product.sku}
                    </div>

                    {/* Multi-Channel Per-Marketplace Price Comparison Box */}
                    <div className="zappicon-multi-price-box">
                      {product.marketplaces.map((m, idx) => (
                        <div key={idx} className={`zappicon-channel-price-item ${m.platform}`}>
                          <div className="channel-tag-name">
                            <span>{m.platform === 'shopee' ? '🍊' : m.platform === 'tiktok' ? '🎵' : '💙'}</span>
                            <span>{m.platformName}</span>
                          </div>
                          <span className="channel-tag-price">{m.formattedPrice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <button type="button" className="zappicon-action-btn">
                  <ShoppingBag size={15} />
                  <span>So Sánh & Mua Trên Sàn</span>
                </button>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="no-results-card">
          <Filter size={36} className="mx-auto mb-3 text-slate-400" />
          <h3 className="font-bold text-slate-800 text-lg mb-1">Không tìm thấy sản phẩm phù hợp</h3>
          <p className="text-sm text-slate-500 mb-4">
            Vui lòng thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác cho gian hàng {tenant.name}.
          </p>
          <button
            type="button"
            className="category-chip-btn active px-6 py-2.5 inline-block"
            onClick={() => {
              setActiveCategory('Tất cả')
              clearSearch()
            }}
          >
            Đặt Lại Bộ Lọc
          </button>
        </div>
      )}
    </div>
  )
}
