import React, { useState } from 'react'
import {
  ShieldCheck,
  Lock,
  Unlock,
  AlertTriangle,
  Server,
  Key,
  CheckCircle2,
  Search,
  Filter,
  RefreshCw,
  Globe,
  Users,
  ShieldAlert
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { GlassModal } from '@/components/ui/GlassModal'
import { INITIAL_TENANTS } from '@/data/mockSuperAdminData'
import './SuperAdminTenantManagementPage.css'

export function SuperAdminTenantManagementPage() {
  const [tenants, setTenants] = useState(INITIAL_TENANTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('all')

  const [activeLockTenant, setActiveLockTenant] = useState(null)
  const [isProcessingLock, setIsProcessingLock] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4500)
  }

  // Handle Toggle Switch Lock/Unlock Trigger
  const handleToggleClick = (tenant) => {
    if (tenant.status === 'ACTIVE') {
      // Open confirmation modal for Locking
      setActiveLockTenant(tenant)
    } else {
      // Quick Unlock
      setTenants((prev) =>
        prev.map((t) =>
          t.tenantId === tenant.tenantId
            ? {
                ...t,
                status: 'ACTIVE',
                jwtRevokedAt: null,
                nginxBlocked: false,
                lockReason: null,
              }
            : t
        )
      )
      showToast(`Đã mở khóa lại cho Tenant ${tenant.companyName} (${tenant.tenantId})!`)
    }
  }

  // Confirm Emergency Lock Action (Edge Case execution)
  const handleConfirmEmergencyLock = async () => {
    if (!activeLockTenant) return

    setIsProcessingLock(true)
    await new Promise((r) => setTimeout(r, 800)) // simulate JWT revocation & Nginx block injection

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19)

    setTenants((prev) =>
      prev.map((t) =>
        t.tenantId === activeLockTenant.tenantId
          ? {
              ...t,
              status: 'LOCKED',
              jwtRevokedAt: nowStr,
              nginxBlocked: true,
              lockReason: 'Khóa khẩn cấp bởi Super Admin (Spam API / Vi phạm Điều khoản)',
            }
          : t
      )
    )

    setIsProcessingLock(false)
    const lockedName = activeLockTenant.companyName
    setActiveLockTenant(null)

    showToast(
      `Đã khóa khẩn cấp Tenant ${lockedName}! Toàn bộ JWT Token đã bị vô hiệu hóa & Nginx Gateway đã chặn 403.`
    )
  }

  // Filter tenants
  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.tenantId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subdomain.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlan = selectedPlanFilter === 'all' || t.planTier === selectedPlanFilter
    return matchesSearch && matchesPlan
  })

  // KPI Calculations
  const totalTenants = tenants.length
  const activeTenants = tenants.filter((t) => t.status === 'ACTIVE').length
  const lockedTenants = tenants.filter((t) => t.status === 'LOCKED').length
  const proTenants = tenants.filter((t) => t.planTier === 'PRO').length

  return (
    <div className="tenant-mgmt-container text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-rose-500/40 text-xs backdrop-blur-md">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Quản lý Tenant & Khóa/Mở Khẩn cấp (SCR-71)"
        description="Giám sát danh sách doanh nghiệp trên hệ thống SmartOmni. Cung cấp nút công tắc Khóa/Mở khẩn cấp, vô hiệu hóa JWT Token & Nginx Gateway."
      />

      {/* KPI Stats Grid */}
      <div className="tenant-stats-grid">
        <StatCard
          title="Tổng Doanh nghiệp (Tenants)"
          value={totalTenants}
          change="Multi-tenant DB"
          changeType="positive"
          icon={Building2Icon}
          description="Đã khởi tạo schema"
        />
        <StatCard
          title="Tenant Đang Hoạt Động"
          value={activeTenants}
          change="Sẵn sàng"
          changeType="positive"
          icon={ShieldCheck}
          description="JWT Valid & Nginx OK"
        />
        <StatCard
          title="Tenant Đang Khóa Khẩn cấp"
          value={lockedTenants}
          change={lockedTenants > 0 ? 'JWT Revoked' : '0 Bị khóa'}
          changeType={lockedTenants > 0 ? 'negative' : 'positive'}
          icon={Lock}
          description="Nginx Blocked 403"
        />
        <StatCard
          title="Tỷ lệ Gói Pro Tier"
          value={`${Math.round((proTenants / (totalTenants || 1)) * 100)}%`}
          change={`${proTenants} Tenants Pro`}
          changeType="positive"
          icon={CrownIcon}
          description="AI Prophet Active"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="liquid-glass-panel p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo Tenant ID, Tên doanh nghiệp, Subdomain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white/80"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Gói cước:</span>
            </div>

            <select
              value={selectedPlanFilter}
              onChange={(e) => setSelectedPlanFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất cả gói cước</option>
              <option value="PRO">Gói Pro Tier</option>
              <option value="FREE">Gói Free Tier</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tenant Directory Table (SCR-71) */}
      <div className="liquid-glass-panel p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Danh sách Toàn bộ Doanh nghiệp trên Nền tảng
            </h3>
            <p className="text-xs text-slate-500">
              Điều khiển công tắc Switch để kích hoạt quy trình Khóa khẩn cấp (JWT Revocation & Nginx Rule).
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">
            Hiển thị {filteredTenants.length} / {tenants.length} Tenants
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="liquid-glass-table">
            <thead>
              <tr>
                <th>Tenant ID & Doanh nghiệp</th>
                <th>Subdomain URL</th>
                <th>Gói Cước</th>
                <th>Tài nguyên Hạn mức</th>
                <th>Trạng thái Trực tuyến</th>
                <th className="text-center">Công tắc Khóa / Mở (Switch)</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((t) => {
                const isLocked = t.status === 'LOCKED'
                return (
                  <tr key={t.tenantId} className="hover:bg-slate-50/80 transition-colors">
                    <td>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded">
                            {t.tenantId}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{t.companyName}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{t.adminEmail}</div>
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-1 font-mono text-xs text-slate-700 font-semibold">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.subdomain}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold font-mono ${
                          t.planTier === 'PRO'
                            ? 'bg-purple-100 text-purple-800 border border-purple-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {t.planTier}_TIER
                      </span>
                    </td>

                    <td>
                      <div className="text-xs text-slate-700 space-y-0.5">
                        <div>
                          SKU: <strong>{t.skusUsed}</strong> / {t.skuLimit}
                        </div>
                        <div>
                          Sàn kết nối: <strong>{t.channelsConnected}</strong> / {t.maxChannels}
                        </div>
                      </div>
                    </td>

                    {/* Status Pill */}
                    <td>
                      <div className="space-y-1">
                        <span
                          className={`tenant-status-pill ${
                            isLocked ? 'locked' : 'active'
                          }`}
                        >
                          {isLocked ? (
                            <>
                              <Lock className="w-3.5 h-3.5 text-rose-600" /> LOCKED (JWT REVOKED)
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ACTIVE
                            </>
                          )}
                        </span>
                        {isLocked && t.jwtRevokedAt && (
                          <div className="text-[10px] text-rose-600 font-mono italic">
                            Blocked at {t.jwtRevokedAt}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Emergency Control Switch */}
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="checkbox"
                          checked={!isLocked}
                          onChange={() => handleToggleClick(t)}
                          className="toggle-switch-input"
                          title={isLocked ? 'Bấm để Mở khóa Tenant' : 'Bấm để Khóa khẩn cấp Tenant'}
                        />
                        <span className="text-xs font-bold text-slate-600">
                          {isLocked ? 'Đã Khóa' : 'Đang Mở'}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCR-71 Emergency Lock Confirmation Modal */}
      {activeLockTenant && (
        <GlassModal
          isOpen={!!activeLockTenant}
          onClose={isProcessingLock ? undefined : () => setActiveLockTenant(null)}
          title={`XÁC NHẬN KHÓA TENANT KHẨN CẤP: ${activeLockTenant.tenantId}`}
          className="max-w-lg border-rose-500/40"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
              <div className="flex items-center gap-2 text-sm font-extrabold text-rose-800">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>CẢNH BÁO THAO TÁC NGUY HIỂM VẬN HÀNH</span>
              </div>
              <p className="text-xs text-rose-700 leading-relaxed">
                Bạn sắp tiến hành khóa khẩn cấp doanh nghiệp <strong>{activeLockTenant.companyName}</strong> (
                <span className="font-mono">{activeLockTenant.subdomain}</span>).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2 text-xs">
              <div className="font-bold text-indigo-300 uppercase tracking-wider text-[11px]">
                Quy trình Tự động Kích hoạt Backend:
              </div>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                <li>
                  Lập tức thu hồi (Revoke) tất cả <strong>JWT Tokens</strong> của người dùng thuộc tenant{' '}
                  <span className="font-mono text-purple-300">{activeLockTenant.tenantId}</span>.
                </li>
                <li>Đẩy JTI Token Blacklist vào Redis Cache phân tán.</li>
                <li>Inject rule chặn HTTP 403 Access Denied tại Gateway Layer (Nginx).</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              {!isProcessingLock ? (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveLockTenant(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmEmergencyLock}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-600/30 hover:bg-rose-500 transition-all border border-rose-400/40 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" /> Xác nhận Khóa & Revoke JWT
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Đang thu hồi JWT Tokens & Inject Nginx Rule...
                </div>
              )}
            </div>
          </div>
        </GlassModal>
      )}
    </div>
  )
}

function Building2Icon(props) {
  return <Users {...props} />
}

function CrownIcon(props) {
  return <Key {...props} />
}
