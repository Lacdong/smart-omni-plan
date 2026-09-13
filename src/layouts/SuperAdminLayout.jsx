import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { ShieldCheck, Server, Key, Activity, LogOut, Shield } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import '@/styles/glass-layout.css'

export function SuperAdminLayout() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const navItems = [
    { label: 'SaaS Dashboard', path: '/superadmin/dashboard', icon: Server },
    { label: 'Tenant Directory', path: '/superadmin/tenants', icon: ShieldCheck },
    { label: 'Plans & Feature Flags', path: '/superadmin/plans', icon: Key },
    { label: 'APM & RLS Security Logs', path: '/superadmin/apm', icon: Activity },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="glass-app-layout flex flex-col min-h-screen font-sans">
      {/* Static Ambient Glow Spheres */}
      <div className="glass-ambient-glow-1" />
      <div className="glass-ambient-glow-2" />

      {/* Header */}
      <header className="relative z-20 mx-6 mt-4 p-4 rounded-2xl liquid-glass-panel flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            SA
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-slate-900">
              SmartOmni SuperAdmin Console
            </span>
            <div className="text-[10px] text-slate-500 font-mono">
              System Admin Operator: {currentUser?.name}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 font-extrabold flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-rose-600" /> Super Admin Role
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
            title="Đăng xuất khỏi SuperAdmin Console"
          >
            <LogOut size={14} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="relative z-10 flex-1 flex p-6 gap-6 max-w-7xl mx-auto w-full">
        <aside className="w-64 liquid-glass-panel p-4 space-y-2 hidden md:block self-start">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
