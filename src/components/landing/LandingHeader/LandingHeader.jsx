import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import './LandingHeader.css'

export function LandingHeader() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const isLoggedIn = Boolean(currentUser)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="landing-header-wrapper">
      {/* SVG Distortion Filter from User Spec */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
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

      <div className="landing-header-container">
        {/* Brand Logo */}
        <Link to="/" className="landing-brand-logo">
          <div className="brand-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H9M17 7V15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="brand-name">SmartOmni</span>
        </Link>

        {/* Center Navigation Glass Pill */}
        <nav className="landing-nav-pill">
          <Link to="/storefront" className="nav-link">Product</Link>
          <a href="#feature" className="nav-link">Feature</a>
          <a href="#ai-insight" className="nav-link">AI Insight</a>
          <a href="#price" className="nav-link">Price</a>
          <a href="#customer" className="nav-link">Customer</a>
        </nav>

        {/* Right Header Actions: If logged in, remove Sign In / Free trial, show user profile & Logout */}
        <div className="landing-header-actions">
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
              <Link to="/login" className="btn-sign-in">
                Sign In
              </Link>
              <Link to="/onboarding/register" className="btn-free-trial">
                Free Trial
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
