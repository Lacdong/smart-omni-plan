import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Search, User, ShoppingBag, AlertTriangle, ArrowRight, ChevronDown, LogOut, ShieldCheck, Crown, Sparkles } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export function GlassHeader({ domainName = 'Admin ERP', tenantName = 'Hxvf123 Store' }) {
  const navigate = useNavigate()
  const { currentUser, SIMULATED_ACCOUNTS, loginAsRole, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    navigate('/admin/orders')
  }

  const handleQuickSwitchRole = (roleKey) => {
    setShowUserMenu(false)
    const targetRoute = loginAsRole(roleKey)
    navigate(targetRoute)
  }

  return (
    <header className="mx-6 mt-4 p-3.5 rounded-2xl liquid-glass-panel flex items-center justify-between relative z-50">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-slate-900 tracking-tight">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-sm shadow-md">
            SO
          </span>
          <span>SmartOmni</span>
        </Link>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
          {domainName}
        </span>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm đơn hàng đa kênh, mã SKU... (SCR-30)"
            className="w-full bg-white/60 border border-slate-200/80 rounded-full py-1.5 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:bg-white transition-all"
          />
        </form>
      </div>

      <div className="flex items-center gap-3 relative">
        {/* Bell Notification Trigger */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 rounded-full text-slate-600 hover:bg-slate-100 relative transition-colors cursor-pointer"
          title="Thông báo đơn hàng mới"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute top-1.5 right-1.5 animate-pulse"></span>
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 top-12 w-80 p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white shadow-2xl z-50 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-extrabold text-slate-900">Thông Báo Đơn Hàng Mới</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold text-[10px]">3 Mới</span>
            </div>

            <div className="py-2 space-y-2">
              <div
                onClick={() => {
                  setShowNotifications(false)
                  navigate('/admin/orders/ORD-SPX-8891')
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-100 transition-colors cursor-pointer flex items-start gap-2.5"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Đơn hàng mới #ORD-SPX-8891</div>
                  <div className="text-slate-500 text-[11px]">Shopee Mall • 770.000đ • Chờ đóng gói</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowNotifications(false)
                navigate('/admin/orders')
              }}
              className="w-full mt-2 py-2 rounded-xl bg-slate-900 text-white font-extrabold text-[11px] flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors"
            >
              <span>Xem Tất Cả Đơn Hàng Màn 30 (SCR-30)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="h-4 w-px bg-slate-200"></div>

        {/* User Profile & Role Switcher Menu */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100/80 transition-all cursor-pointer"
            >
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300 shadow-sm"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser?.name}
                </span>
                <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1">
                  {currentUser?.roleLabel}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* User Menu & Role Switcher Popup */}
            {showUserMenu && (
              <div className="absolute right-0 top-12 w-64 p-3 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl z-50 text-xs space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900">{currentUser?.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{currentUser?.email}</div>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-extrabold text-white ${currentUser?.roleBadgeColor}`}>
                    Role: {currentUser?.role}
                  </span>
                </div>

                <div className="pt-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                    Đổi Vai trò Đăng nhập (Switch Role):
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => handleQuickSwitchRole('CUSTOMER')}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
                    >
                      <span>Khách hàng (Customer)</span>
                      {currentUser?.role === 'CUSTOMER' && <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>

                    <button
                      onClick={() => handleQuickSwitchRole('MANAGER')}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
                    >
                      <span>Manager Vận hành</span>
                      {currentUser?.role === 'MANAGER' && <Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>

                    <button
                      onClick={() => handleQuickSwitchRole('TENANT_ADMIN')}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
                    >
                      <span>Tenant Admin</span>
                      {currentUser?.role === 'TENANT_ADMIN' && <Sparkles className="w-3.5 h-3.5 text-purple-600" />}
                    </button>

                    <button
                      onClick={() => handleQuickSwitchRole('SUPER_ADMIN')}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
                    >
                      <span>Super Admin Console</span>
                      {currentUser?.role === 'SUPER_ADMIN' && <Sparkles className="w-3.5 h-3.5 text-rose-600" />}
                    </button>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      logout()
                      navigate('/login')
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 text-rose-600 font-bold transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Đăng xuất (Sign Out)</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/login')
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
            title="Đăng xuất"
          >
            <LogOut size={13} />
            <span className="hidden lg:inline">Đăng xuất</span>
          </button>
        </div>
      </div>
    </header>
  )
}
