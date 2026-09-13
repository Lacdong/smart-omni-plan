import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Server, ShieldCheck, Activity, Key, Lock, Sparkles, ArrowRight, Zap } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { INITIAL_TENANTS, INITIAL_APM_SECURITY_LOGS } from '@/data/mockSuperAdminData'

export function SuperAdminDashboardPage() {
  const navigate = useNavigate()

  const totalTenants = INITIAL_TENANTS.length
  const lockedTenants = INITIAL_TENANTS.filter((t) => t.status === 'LOCKED').length

  return (
    <div className="space-y-6 text-slate-900">
      {/* Page Header */}
      <PageHeader
        title="SmartOmni SaaS Console Dashboard (SCR-70)"
        description="Tổng quan vận hành hệ thống đa doanh nghiệp (Multi-tenant SaaS), giám sát thông lượng Webhook, bảo mật RLS và mô hình AI Prophet."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tổng Doanh nghiệp (Tenants)"
          value={totalTenants}
          change="+12 tháng này"
          changeType="positive"
          icon={Server}
          description="Đang quản lý"
          onClick={() => navigate('/superadmin/tenants')}
        />

        <StatCard
          title="Thông lượng Webhook"
          value="420 req/s"
          change="RabbitMQ Queue Stable"
          changeType="positive"
          icon={Zap}
          description="Sàn Shopee + TikTok"
          onClick={() => navigate('/superadmin/apm')}
        />

        <StatCard
          title="PostgreSQL RLS Violations"
          value="0 Active"
          change="100% Data Isolated"
          changeType="positive"
          icon={ShieldCheck}
          description="Row Level Security"
          onClick={() => navigate('/superadmin/apm')}
        />

        <StatCard
          title="Mô hình AI Prophet RMSE"
          value="0.042"
          change="Accurate 94.6%"
          changeType="positive"
          icon={Sparkles}
          description="Backtest Score"
          onClick={() => navigate('/superadmin/plans')}
        />
      </div>

      {/* Quick Access Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('/superadmin/tenants')}
          className="liquid-glass-panel p-6 cursor-pointer hover:border-indigo-400 transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
              <Server className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600">SCR-71 &rarr;</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Quản lý Tenant & Khóa Khẩn cấp</h3>
            <p className="text-xs text-slate-500 mt-1">
              Xem danh sách doanh nghiệp và sử dụng công tắc Switch để vô hiệu hóa JWT Token & Nginx Gateway.
            </p>
          </div>
        </div>

        <div
          onClick={() => navigate('/superadmin/plans')}
          className="liquid-glass-panel p-6 cursor-pointer hover:border-purple-400 transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold border border-purple-200">
              <Key className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-purple-600">SCR-72 &rarr;</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Cấu hình Gói cước & Feature Flags</h3>
            <p className="text-xs text-slate-500 mt-1">
              Thiết lập hạn mức SKU, số gian hàng kết nối sàn, quyền dùng Prophet AI cho gói Free/Pro.
            </p>
          </div>
        </div>

        <div
          onClick={() => navigate('/superadmin/apm')}
          className="liquid-glass-panel p-6 cursor-pointer hover:border-emerald-400 transition-all space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold border border-emerald-200">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600">SCR-73 &rarr;</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Giám sát APM & Log Security RLS</h3>
            <p className="text-xs text-slate-500 mt-1">
              Theo dõi biểu đồ độ trễ hệ thống, log kiểm định cô lập dữ liệu RLS và sai số RMSE của AI.
            </p>
          </div>
        </div>
      </div>

      {/* Tenant Summary Preview */}
      <div className="liquid-glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              SCR-71 Preview: Tenant Directory Overview
            </h3>
            <p className="text-xs text-slate-500">
              Hiển thị danh sách doanh nghiệp và trạng thái vận hành trực tuyến.
            </p>
          </div>

          <button
            onClick={() => navigate('/superadmin/tenants')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer"
          >
            Quản lý Chi tiết Tenant (SCR-71) &rarr;
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="liquid-glass-table">
            <thead>
              <tr>
                <th>Tenant ID & Company</th>
                <th>Subdomain</th>
                <th>Plan Tier</th>
                <th>SKUs Used</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {INITIAL_TENANTS.map((t) => (
                <tr key={t.tenantId} className="hover:bg-slate-50/80">
                  <td className="font-mono text-xs font-bold text-indigo-700">{t.tenantId} - {t.companyName}</td>
                  <td className="text-xs text-slate-700 font-mono font-semibold">{t.subdomain}</td>
                  <td>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      {t.planTier}_TIER
                    </span>
                  </td>
                  <td className="text-xs text-slate-700">{t.skusUsed} / {t.skuLimit}</td>
                  <td>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
