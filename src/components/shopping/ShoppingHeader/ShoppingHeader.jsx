import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Search, Package, Truck, Sparkles, X, LogOut, User } from 'lucide-react'
import { TENANTS } from '@/data/mockStorefrontData'
import { useAuth } from '@/context/AuthContext'
import './ShoppingHeader.css'

export function ShoppingHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { tenantSlug = 'hxvf123' } = useParams()
  const { currentUser, logout } = useAuth()
  const inputRef = useRef(null)

  const activeTenant = TENANTS[tenantSlug] || TENANTS['hxvf123']

  // Search state synced with URL query param `?q=`
  const queryParams = new URLSearchParams(location.search)
  const initialSearch = queryParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(initialSearch)

  // Expand state for collapsible search icon
  const [isSearchExpanded, setIsSearchExpanded] = useState(!!initialSearch)

  useEffect(() => {
    setSearchTerm(queryParams.get('q') || '')
    if (queryParams.get('q')) {
      setIsSearchExpanded(true)
    }
  }, [location.search])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/storefront/${activeTenant.slug}?q=${encodeURIComponent(searchTerm.trim())}`)
    } else {
      navigate(`/storefront/${activeTenant.slug}`)
    }
  }

  const handleIconClick = () => {
    if (!isSearchExpanded) {
      setIsSearchExpanded(true)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }

  const handleCloseSearch = (e) => {
    e.stopPropagation()
    setSearchTerm('')
    setIsSearchExpanded(false)
    navigate(`/storefront/${activeTenant.slug}`)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Is logged in check (if current user exists and is not default customer or is active)
  const isLoggedIn = Boolean(currentUser)

  return (
    <header className="shopping-header-wrapper">
      {/* SVG Distortion Filter matching LandingHeader */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="shopping-glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.012 0.012"
              numOctaves="2" 
              seed="92" 
              result="noise" 
            />
            <feGaussianBlur 
              in="noise" 
              stdDeviation="2" 
              result="blurred" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="blurred" 
              scale="85"
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      <div className="shopping-header-container">
        {/* Clean SmartOmni Brand Logo */}
        <Link to="/" className="shopping-brand-logo">
          <div className="brand-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H9M17 7V15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="brand-name">SmartOmni</span>
        </Link>

        {/* Center Liquid Glass Nav Pill */}
        <div className="shopping-nav-pill">
          {/* Navigation Links inside Pill */}
          <div className="shopping-pill-links">
            <Link
              to={`/storefront/${activeTenant.slug}`}
              className={`shopping-nav-link ${location.pathname.startsWith('/storefront') && !location.pathname.includes('/tracking') ? 'active' : ''}`}
            >
              <Package size={13} />
              <span>Danh Mục</span>
            </Link>

            <Link
              to="/storefront/tracking"
              className={`shopping-nav-link ${location.pathname.includes('/tracking') ? 'active' : ''}`}
            >
              <Truck size={13} className="text-indigo-600" />
              <span>Tra Cứu Đơn</span>
            </Link>

            <Link to="/" className="shopping-nav-link">
              <Sparkles size={13} className="text-amber-500" />
              <span>Trang Chủ</span>
            </Link>
          </div>

          {/* Collapsible Search Trigger & Input Field */}
          <form
            onSubmit={handleSearchSubmit}
            className={`collapsible-search-wrapper ${isSearchExpanded ? 'expanded' : 'collapsed'}`}
            onClick={handleIconClick}
          >
            <button
              type="button"
              className="search-toggle-btn"
              title="Tìm kiếm sản phẩm"
              onClick={handleIconClick}
            >
              <Search size={15} className="search-toggle-icon" />
            </button>

            {isSearchExpanded && (
              <div className="search-input-field-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Nhập tên sản phẩm, cửa hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="collapsible-search-input"
                  onBlur={() => {
                    if (!searchTerm.trim()) {
                      setIsSearchExpanded(false)
                    }
                  }}
                />
                {searchTerm && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={handleCloseSearch}
                    title="Xóa ô tìm kiếm"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Right Header Actions: When logged in, remove Sign In/Free Trial, show Profile & Logout */}
        <div className="shopping-header-actions">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover border border-white/40"
                />
                <span className="text-xs font-bold truncate max-w-[120px]">{currentUser.name}</span>
                <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded">
                  {currentUser.roleLabel}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 text-xs font-bold transition-all cursor-pointer"
                title="Đăng xuất"
              >
                <LogOut size={13} />
                <span>Đăng xuất</span>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="shopping-btn-sign-in">
                Đăng Nhập
              </Link>
              <Link to="/onboarding/register" className="shopping-btn-free-trial">
                Dùng Thử Miễn Phí
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
