import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, Package, Sparkles, Users, Layers, ShieldCheck, Lock } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils/cn'

export function GlassSidebar({ navItems = [] }) {
  const { currentUser } = useAuth()
  const role = currentUser?.role || 'TENANT_ADMIN'

  const defaultErpNav = [
    { label: 'BI Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Multi-channel Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Inventory SKU', path: '/admin/inventory', icon: Package },
    { label: 'Product Catalog', path: '/admin/products', icon: Layers },
    { label: 'AI Forecasting', path: '/admin/ai/forecast', icon: Sparkles },
    { label: 'Staff & Subscription', path: '/admin/settings/staff', icon: Users, requiresAdmin: true },
  ]

  let items = navItems.length > 0 ? navItems : defaultErpNav

  // ROLE.md Filter: Manager cannot access Staff & Subscription (SCR-19)
  if (role === 'MANAGER') {
    items = items.filter((item) => !item.requiresAdmin)
  }

  return (
    <aside className="w-64 liquid-glass-panel p-4 my-6 ml-6 flex flex-col justify-between hidden md:flex self-start">
      <div className="space-y-6">
        <div className="flex items-center justify-between px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Operations Hub</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full text-white font-mono font-extrabold ${currentUser?.roleBadgeColor || 'bg-indigo-600'}`}>
            {currentUser?.role || 'ROLE'}
          </span>
        </div>

        <nav className="space-y-1.5">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150',
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  )
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Role RBAC Summary Footer */}
      <div className="p-3.5 rounded-xl bg-indigo-50/90 border border-indigo-100 backdrop-blur-md space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{currentUser?.roleLabel}</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-normal">
          {role === 'MANAGER'
            ? 'Quyền Vận hành: Đơn hàng, Tồn kho, SP (Toàn quyền). BI & AI (Xem).'
            : 'Toàn quyền Quản trị ERP Tenant.'}
        </p>
      </div>
    </aside>
  )
}
