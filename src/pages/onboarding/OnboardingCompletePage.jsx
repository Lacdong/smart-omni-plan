import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import './OnboardingCompletePage.css'

export function OnboardingCompletePage() {
  const navigate = useNavigate()

  return (
    <div className="onboarding-complete-wrapper">
      <div className="onboarding-complete-card">
        {/* Success Animated Icon Box */}
        <div className="complete-success-icon">
          <Check size={36} strokeWidth={3} />
        </div>

        <div className="onboarding-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#059669', marginBottom: '12px' }}>
          <ShieldCheck size={13} />
          <span>Khởi Tạo Workspace Thành Công</span>
        </div>

        <h1 className="complete-title">Chúc Mừng! Tài Khoản Doanh Nghiệp Đã Tạo Thành Công</h1>
        <p className="complete-desc">
          Workspace SmartOmni ERP dành cho Doanh nghiệp (Tenant Admin) của bạn đã được kích hoạt thành công với 14 ngày sử dụng thử nghiệm đầy đủ tính năng gói Pro.
        </p>

        {/* Summary Card */}
        <div className="complete-summary-box">
          <div className="complete-summary-row">
            <span className="complete-summary-label">Loại Tài Khoản</span>
            <span className="complete-summary-val" style={{ color: '#4F46E5', fontWeight: 700 }}>Tenant Admin (Doanh nghiệp)</span>
          </div>
          <div className="complete-summary-row">
            <span className="complete-summary-label">Gói Cước Kích Hoạt</span>
            <span className="complete-summary-val" style={{ color: '#4F46E5' }}>Pro (14 Ngày Dùng Thử Miễn Phí)</span>
          </div>
          <div className="complete-summary-row">
            <span className="complete-summary-label">Xác Thực OTP 2FA</span>
            <span className="complete-summary-val" style={{ color: '#059669', fontWeight: 700 }}>Đã xác thực (1111)</span>
          </div>
          <div className="complete-summary-row">
            <span className="complete-summary-label">Tự Động Đồng Bộ</span>
            <span className="complete-summary-val" style={{ color: '#059669' }}>Shopee VN, TikTok Shop (Active)</span>
          </div>
        </div>

        {/* Login Now Button as requested */}
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
