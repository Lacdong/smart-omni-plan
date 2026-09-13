import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShieldCheck, ArrowRight, Sparkles, KeyRound, AlertCircle } from 'lucide-react'
import './OnboardingOtpPage.css'

export function OnboardingOtpPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const type = searchParams.get('type') || 'customer'
  const email = searchParams.get('email') || (type === 'customer' ? 'khachhang@gmail.com' : 'admin@store.com')
  const fullName = searchParams.get('name') || 'Nguyễn Văn An'

  const [otp, setOtp] = useState(['', '', '', ''])
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setErrorMsg('')

    // Auto-focus next input field
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleAutoFill = () => {
    setOtp(['1', '1', '1', '1'])
    setErrorMsg('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const enteredOtp = otp.join('')

    if (enteredOtp.length < 4) {
      setErrorMsg('Vui lòng nhập đủ 4 chữ số OTP.')
      return
    }

    if (enteredOtp !== '1111') {
      setErrorMsg('Mã OTP không đúng! Mã OTP giả lập là 1111.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      if (type === 'customer') {
        navigate(`/onboarding/customer-success?email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}`)
      } else {
        navigate('/onboarding/complete')
      }
    }, 600)
  }

  return (
    <div className="onboarding-otp-wrapper">
      <div className="onboarding-otp-card">
        {/* Header */}
        <div className="onboarding-header">
          <div className="onboarding-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#059669' }}>
            <ShieldCheck size={13} />
            <span>{type === 'customer' ? 'Xác thực OTP Khách hàng' : 'Step 5 of 5 — Xác thực OTP Admin'}</span>
          </div>

          <h1 className="onboarding-title">Xác Thực Mã OTP</h1>
          <p className="onboarding-subtitle">
            Hệ thống đã gửi mã xác nhận 4 chữ số đến email <br />
            <strong className="text-indigo-600 dark:text-indigo-400">{email}</strong>
          </p>
        </div>

        {/* Demo Helper Pill */}
        <div className="otp-demo-helper" onClick={handleAutoFill}>
          <KeyRound size={14} className="text-amber-500" />
          <span>Mã OTP Giả lập: <strong className="font-mono text-indigo-600">1111</strong> (Bấm để điền nhanh)</span>
        </div>

        {/* OTP Input Form */}
        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-digits-container">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`otp-digit-input ${digit ? 'filled' : ''}`}
                autoFocus={idx === 0}
              />
            ))}
          </div>

          {errorMsg && (
            <div className="otp-error-banner">
              <AlertCircle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="onboarding-btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Đang xác thực...</span>
            ) : (
              <>
                <span>Xác Thực & Hoàn Tất</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Prompt */}
        <div className="onboarding-footer">
          <span>Chưa nhận được mã?</span>
          <button
            type="button"
            className="otp-resend-btn"
            onClick={() => alert('Mã OTP mới (1111) đã được gửi lại tới email của bạn.')}
          >
            Gửi lại OTP
          </button>
        </div>
      </div>
    </div>
  )
}
