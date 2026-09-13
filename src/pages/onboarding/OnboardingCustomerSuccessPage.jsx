import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react'
import './OnboardingCustomerSuccessPage.css'

export function OnboardingCustomerSuccessPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const email = searchParams.get('email') || 'khachhang@gmail.com'
  const name = searchParams.get('name') || 'Nguyễn Văn An'

  return (
    <div className="onboarding-customer-success-wrapper">
      <div className="onboarding-customer-success-card">
        <div className="customer-success-icon-box">
          <Check size={36} strokeWidth={3} />
        </div>

        <div className="customer-success-badge">
          <ShieldCheck size={13} />
          <span>Xác thực OTP Thành Công</span>
        </div>

        <h1 className="customer-success-title">Đăng Ký Khách Hàng Thành Công!</h1>
        <p className="customer-success-desc">
          Tài khoản mua sắm cá nhân của bạn đã được khởi tạo thành công trên hệ thống SmartOmni.
        </p>

        <div className="customer-info-box">
          <div className="customer-info-row">
            <span className="customer-info-label">Họ và Tên</span>
            <span className="customer-info-val">{name}</span>
          </div>
          <div className="customer-info-row">
            <span className="customer-info-label">Email Đăng Nhập</span>
            <span className="customer-info-val font-mono">{email}</span>
          </div>
          <div className="customer-info-row">
            <span className="customer-info-label">Loại Tài Khoản</span>
            <span className="customer-info-val text-emerald-600 dark:text-emerald-400 font-bold">Khách Hàng Cá Nhân (Customer)</span>
          </div>
        </div>

        <button
          type="button"
          className="onboarding-btn-submit"
          onClick={() => navigate('/login')}
        >
          <span>Login Now (Đăng nhập ngay)</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
