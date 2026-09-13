import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import './Login.css'

export function Login() {
  const navigate = useNavigate()
  const { loginAsRole } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)

      // Match configured emails / keywords to role
      const lowerEmail = email.toLowerCase().trim()
      let roleKey = 'TENANT_ADMIN'

      if (lowerEmail === 'customer@gmail.com' || lowerEmail.includes('customer')) {
        roleKey = 'CUSTOMER'
      } else if (lowerEmail === 'manager@hxvf123.vn' || lowerEmail.includes('manager')) {
        roleKey = 'MANAGER'
      } else if (lowerEmail === 'superadmin@smartomni.vn' || lowerEmail.includes('super')) {
        roleKey = 'SUPER_ADMIN'
      } else if (lowerEmail === 'tenantadmin@hxvf123.vn' || lowerEmail.includes('admin')) {
        roleKey = 'TENANT_ADMIN'
      }

      const defaultRoute = loginAsRole(roleKey)
      navigate(defaultRoute)
    }, 500)
  }

  return (
    <div className="login-page-root">
      {/* Floating Back to Landing Page Button over Video Background */}
      <Link to="/" className="login-video-back-btn">
        <ArrowLeft size={16} />
        <span>Back to Landing Page</span>
      </Link>

      {/* SVG Optical Refraction Filter */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="login-glass-refraction" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.015"
              numOctaves="2"
              seed="42"
              result="noise"
            />
            <feGaussianBlur
              in="noise"
              stdDeviation="1.5"
              result="blurred"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Layer 0: HTML5 Video Background */}
      <video
        className="login-video-background"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      >
        <source src="/login-video.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Layer 1: Soft Video Overlay */}
      <div className="login-video-overlay" />

      {/* Layer 2: Liquid Glass Container & Card */}
      <div className="login-card-wrapper">
        <div className="login-glass-card">
          {/* Header */}
          <div className="login-header">
            <h1 className="login-heading">Login to SmartOmni</h1>
            <p className="login-subheading">Enter your details to access your workspace</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="login-input-group">
              <label className="login-label" htmlFor="login-email">
                Email Address
              </label>
              <div className="login-input-wrapper">
                <Mail className="login-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className="login-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="login-input-group">
              <label className="login-label" htmlFor="login-password">
                Password
              </label>
              <div className="login-input-wrapper">
                <Lock className="login-input-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input login-input-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="login-options-row">
              <label className="login-remember-label">
                <input
                  type="checkbox"
                  className="login-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot-password"
                className="login-forgot-link"
                onClick={(e) => {
                  e.preventDefault()
                  alert('Password reset link sent to your email.')
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="login-btn-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="login-social-container">
            <button
              type="button"
              className="login-social-btn"
              onClick={() => {
                setIsLoading(true)
                setTimeout(() => {
                  setIsLoading(false)
                  loginAsRole('TENANT_ADMIN')
                  navigate('/admin/dashboard')
                }, 400)
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9c-.4-.7-.6-1.5-.6-2.3z" />
                <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 22.3 12 23z" />
              </svg>
              <span>Google</span>
            </button>
          </div>

          {/* Footer Register Prompt */}
          <div className="login-register-footer">
            <span>Don't have an account?</span>
            <Link to="/onboarding/register" className="login-register-link">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
