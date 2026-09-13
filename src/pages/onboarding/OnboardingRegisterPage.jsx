import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Building2, Globe, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Calendar, AlertCircle } from 'lucide-react'
import './OnboardingRegisterPage.css'

export function OnboardingRegisterPage() {
  const navigate = useNavigate()
  
  // Account Type Selection: 'customer' | 'business'
  const [accountType, setAccountType] = useState('customer')

  // Common Fields
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Business Specific Fields
  const [storeName, setStoreName] = useState('')
  const [subdomain, setSubdomain] = useState('')

  const handleStoreNameChange = (e) => {
    const val = e.target.value
    setStoreName(val)
    setSubdomain(val.toLowerCase().replace(/[^a-z0-9]/g, ''))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không trùng khớp!')
      return
    }

    if (accountType === 'customer') {
      // Customer Flow: Navigate to OTP Verification (1111) -> Success -> Login Now
      const targetEmail = email || 'customer@gmail.com'
      const targetName = fullName || 'Nguyễn Văn An'
      navigate(`/onboarding/otp?type=customer&email=${encodeURIComponent(targetEmail)}&name=${encodeURIComponent(targetName)}`)
    } else {
      // Business Flow: Navigate to Onboarding Plan (SCR-01 -> SCR-02 -> SCR-03 -> SCR-04 -> OTP -> SCR-05)
      navigate('/onboarding/plan')
    }
  }

  return (
    <div className={`onboarding-card-wrapper ${accountType === 'business' ? 'business-wide' : ''}`}>
      <div className="onboarding-glass-card">
        {/* Header */}
        <div className="onboarding-header">
          <div className="onboarding-badge">
            <Sparkles size={12} />
            <span>SmartOmni Onboarding & Registration</span>
          </div>
          <h1 className="onboarding-title">Tạo Tài Khoản Mới</h1>
          <p className="onboarding-subtitle">Chọn loại tài khoản phù hợp với nhu cầu của bạn</p>
        </div>

        {/* Account Type Tabs */}
        <div className="account-type-tabs">
          <button
            type="button"
            className={`account-type-tab ${accountType === 'customer' ? 'active' : ''}`}
            onClick={() => {
              setAccountType('customer')
              setErrorMsg('')
            }}
          >
            <User size={16} />
            <div className="tab-text">
              <span className="tab-title">Khách Hàng</span>
              <span className="tab-desc">Mua sắm cá nhân</span>
            </div>
          </button>

          <button
            type="button"
            className={`account-type-tab ${accountType === 'business' ? 'active' : ''}`}
            onClick={() => {
              setAccountType('business')
              setErrorMsg('')
            }}
          >
            <Building2 size={16} />
            <div className="tab-text">
              <span className="tab-title">Doanh Nghiệp</span>
              <span className="tab-desc">Tenant Admin ERP</span>
            </div>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={`onboarding-form ${accountType === 'business' ? 'form-grid-2col' : ''}`}>
          {accountType === 'customer' ? (
            /* Single Column Form for Customer */
            <>
              <div className="onboarding-input-group">
                <label className="onboarding-label" htmlFor="fullName">
                  Họ và Tên
                </label>
                <div className="onboarding-input-wrapper">
                  <User className="onboarding-input-icon" />
                  <input
                    id="fullName"
                    type="text"
                    className="onboarding-input"
                    placeholder="e.g. Nguyễn Văn An"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="onboarding-input-group">
                <label className="onboarding-label" htmlFor="dob">
                  Ngày Sinh
                </label>
                <div className="onboarding-input-wrapper">
                  <Calendar className="onboarding-input-icon" />
                  <input
                    id="dob"
                    type="date"
                    className="onboarding-input"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="onboarding-input-group">
                <label className="onboarding-label" htmlFor="email">
                  Email Đăng Nhập
                </label>
                <div className="onboarding-input-wrapper">
                  <Mail className="onboarding-input-icon" />
                  <input
                    id="email"
                    type="email"
                    className="onboarding-input"
                    placeholder="customer@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="onboarding-input-group">
                <label className="onboarding-label" htmlFor="password">
                  Mật Khẩu
                </label>
                <div className="onboarding-input-wrapper">
                  <Lock className="onboarding-input-icon" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="onboarding-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="onboarding-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="onboarding-input-group">
                <label className="onboarding-label" htmlFor="confirmPassword">
                  Xác Nhận Mật Khẩu
                </label>
                <div className="onboarding-input-wrapper">
                  <Lock className="onboarding-input-icon" />
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    className="onboarding-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            /* 2-Column Horizontal Grid Form for Business ("chia đều form ngang") */
            <>
              {/* Column 1: Personal & Business Info */}
              <div className="grid-col-left">
                <div className="onboarding-input-group">
                  <label className="onboarding-label" htmlFor="fullName">
                    Họ và Tên Đại Diện
                  </label>
                  <div className="onboarding-input-wrapper">
                    <User className="onboarding-input-icon" />
                    <input
                      id="fullName"
                      type="text"
                      className="onboarding-input"
                      placeholder="e.g. Lê Hoàng Nam"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="onboarding-input-group">
                  <label className="onboarding-label" htmlFor="dob">
                    Ngày Sinh
                  </label>
                  <div className="onboarding-input-wrapper">
                    <Calendar className="onboarding-input-icon" />
                    <input
                      id="dob"
                      type="date"
                      className="onboarding-input"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="onboarding-input-group">
                  <label className="onboarding-label" htmlFor="storeName">
                    Tên Gian Hàng / Doanh Nghiệp
                  </label>
                  <div className="onboarding-input-wrapper">
                    <Building2 className="onboarding-input-icon" />
                    <input
                      id="storeName"
                      type="text"
                      className="onboarding-input"
                      placeholder="e.g. Hxvf123 Official Store"
                      value={storeName}
                      onChange={handleStoreNameChange}
                      required
                    />
                  </div>
                </div>

                <div className="onboarding-input-group">
                  <label className="onboarding-label" htmlFor="subdomain">
                    Target Subdomain
                  </label>
                  <div className="onboarding-input-wrapper">
                    <Globe className="onboarding-input-icon" />
                    <input
                      id="subdomain"
                      type="text"
                      className="onboarding-input"
                      placeholder="hxvf123"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value)}
                      required
                    />
                  </div>
                  {subdomain && (
                    <div className="onboarding-url-preview">
                      <span>URL: https://{subdomain}.smartomni.vn</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Column 2: Account Login Credentials */}
              <div className="grid-col-right">
                <div className="onboarding-input-group">
                  <label className="onboarding-label" htmlFor="email">
                    Email Admin Đăng Nhập
                  </label>
                  <div className="onboarding-input-wrapper">
                    <Mail className="onboarding-input-icon" />
                    <input
                      id="email"
                      type="email"
                      className="onboarding-input"
                      placeholder="tenantadmin@hxvf123.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="onboarding-input-group">
                  <label className="onboarding-label" htmlFor="password">
                    Mật Khẩu Admin
                  </label>
                  <div className="onboarding-input-wrapper">
                    <Lock className="onboarding-input-icon" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="onboarding-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="onboarding-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="onboarding-input-group">
                  <label className="onboarding-label" htmlFor="confirmPassword">
                    Xác Nhận Mật Khẩu
                  </label>
                  <div className="onboarding-input-wrapper">
                    <Lock className="onboarding-input-icon" />
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      className="onboarding-input"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Subdomain Notice / Info Box */}
                <div className="business-info-pill-box">
                  <Sparkles size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    Gói thử nghiệm Pro 14 ngày áp dụng tự động sau khi hoàn tất đăng ký.
                  </span>
                </div>
              </div>
            </>
          )}

          {errorMsg && (
            <div className="register-error-banner form-full-width">
              <AlertCircle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="onboarding-btn-submit form-full-width">
            {accountType === 'customer' ? (
              <>
                <span>Tiếp Tục Đến Xác Thực OTP (1111)</span>
                <ArrowRight size={16} />
              </>
            ) : (
              <>
                <span>Đi Tiếp Luồng Register (SCR-01 → SCR-04)</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="onboarding-footer">
          <span>Đã có tài khoản?</span>
          <Link to="/login" className="onboarding-link">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  )
}
