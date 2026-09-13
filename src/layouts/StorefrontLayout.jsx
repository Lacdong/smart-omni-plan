import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Truck, ShieldCheck, ArrowRight, Lock } from 'lucide-react'
import { ShoppingHeader } from '@/components/shopping/ShoppingHeader/ShoppingHeader'
import { TENANTS } from '@/data/mockStorefrontData'
import '@/styles/glass-layout.css'
import './StorefrontLayout.css'

export function StorefrontLayout() {
  return (
    <div className="glass-storefront-layout">
      {/* Atmospheric Ambient Soft Glow Spheres */}
      <div className="glass-ambient-glow-1" />
      <div className="glass-ambient-glow-2" />

      {/* LandingHeader-styled Floating Liquid Glass Shopping Header */}
      <ShoppingHeader />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Liquid Glass Footer Container */}
      <footer className="storefront-glass-footer liquid-glass-container">
        <div className="storefront-footer-grid">
          {/* Column 1: Storefront Overview & Security */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="storefront-logo-badge text-xs w-7 h-7 rounded-lg">SO</div>
              <span className="font-bold text-slate-900 text-base">SmartOmni Storefront</span>
            </div>
            <p className="storefront-footer-text mb-4">
              Nền tảng hiển thị catalog đa sàn, gợi ý sản phẩm thông minh bằng AI và tra cứu vận đơn tập trung.
            </p>
            <div className="security-badge-tag">
              <ShieldCheck size={13} />
              <span>Mã Hóa AES-256 Webhook</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="storefront-footer-col-title">Điều Hướng Nhanh</h4>
            <ul className="storefront-footer-links">
              <li><Link to="/storefront">Danh Mục Sản Phẩm</Link></li>
              <li><Link to="/storefront/tracking">Cổng Tra Cứu Đơn Hàng</Link></li>
              <li><Link to="/">Giới Thiệu SmartOmni</Link></li>
              <li><Link to="/onboarding/register">Đăng Ký Trải Nghiệm</Link></li>
              <li><Link to="/admin/dashboard">Trang Quản Trị ERP Merchant</Link></li>
            </ul>
          </div>

          {/* Column 3: Connected Marketplace Badges */}
          <div>
            <h4 className="storefront-footer-col-title">Sàn Thương Mại Liên Kết</h4>
            <p className="storefront-footer-text text-xs mb-3">
              Thanh toán & giao nhận an toàn trực tiếp trên ứng dụng gian hàng chính hãng:
            </p>
            <div className="flex flex-col gap-2">
              <div className="marketplace-badge-pill shopee">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Shopee Official Mall</span>
              </div>
              <div className="marketplace-badge-pill tiktok">
                <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                <span>TikTok Shop Live</span>
              </div>
              <div className="marketplace-badge-pill lazada">
                <span className="w-2 h-2 rounded-full bg-indigo-700"></span>
                <span>Lazada Flagship Store</span>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Order Tracking Shortcut */}
          <div>
            <h4 className="storefront-footer-col-title">Tra Cứu Trạng Thái Đơn Hàng</h4>
            <p className="storefront-footer-text text-xs mb-3">
              Nhập mã vận đơn Shopee (SPX...) hoặc TikTok (TT...) để kiểm tra hành trình ngay:
            </p>
            <Link
              to="/storefront/tracking"
              className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-2 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors w-full justify-center"
            >
              <Truck size={14} />
              <span>Tra Cứu Vận Đơn Ngay</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="storefront-footer-bottom">
          <span>&copy; 2026 SmartOmni Commerce Systems. Bảo lưu mọi quyền.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Lock size={12} /> Mô hình chuyển hướng sàn LTM</span>
            <Link to="/login" className="hover:text-indigo-600 font-semibold">Đăng Nhập Merchant</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
