import React, { useState } from 'react'
import {
  Users,
  Shield,
  CreditCard,
  Plus,
  Search,
  Lock,
  Unlock,
  Mail,
  UserCheck,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Download,
  X,
  ChevronRight,
  TrendingUp,
  HardDrive,
  Cpu,
  Layers,
  ShoppingBag
} from 'lucide-react'
import { INITIAL_STAFF_MEMBERS, SUBSCRIPTION_PLAN_INFO } from '@/data/mockStaffData'
import './ErpStaffSubscriptionPage.css'

export function ErpStaffSubscriptionPage() {
  const [activeTab, setActiveTab] = useState('staff') // 'staff' | 'subscription'

  // Staff State
  const [staffList, setStaffList] = useState(INITIAL_STAFF_MEMBERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  // New Staff Form State
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'WAREHOUSE_STAFF',
    stores: ['Shopee VN'],
  })

  // Subscription Upgrade Modal
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)

  const showToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // Filter staff list
  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'ALL' || s.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Toggle staff active/locked status
  const handleToggleStatus = (id) => {
    setStaffList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus = item.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE'
          showToast(
            newStatus === 'LOCKED'
              ? `Đã tạm khóa tài khoản nhân viên ${item.name} (Revoked JWT Token)`
              : `Đã mở khóa tài khoản nhân viên ${item.name}`
          )
          return { ...item, status: newStatus }
        }
        return item
      })
    )
  }

  // Handle Invite Form Submit
  const handleInviteSubmit = (e) => {
    e.preventDefault()
    if (!newStaff.name.trim() || !newStaff.email.trim()) return

    const roleLabelMap = {
      MANAGER: 'Manager Vận hành',
      WAREHOUSE_STAFF: 'Nhân viên Kiểm kho',
      ORDER_STAFF: 'Nhân viên Xử lý Đơn',
    }

    const roleColorMap = {
      MANAGER: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
      WAREHOUSE_STAFF: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
      ORDER_STAFF: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    }

    const createdStaff = {
      id: `st-${Date.now()}`,
      name: newStaff.name,
      email: newStaff.email,
      phone: newStaff.phone || '0909 000 111',
      role: newStaff.role,
      roleLabel: roleLabelMap[newStaff.role] || 'Nhân viên Vận hành',
      roleBadgeColor: roleColorMap[newStaff.role] || 'bg-slate-500/20 text-slate-700 border-slate-500/30',
      stores: newStaff.stores,
      status: 'ACTIVE',
      joinedDate: 'Vừa xong',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    }

    setStaffList([createdStaff, ...staffList])
    setIsInviteModalOpen(false)
    setNewStaff({ name: '', email: '', phone: '', role: 'WAREHOUSE_STAFF', stores: ['Shopee VN'] })
    showToast(`Đã gửi thư mời và cấp quyền thành công tới email ${createdStaff.email}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Toast Notification Banner */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/90 text-white shadow-2xl backdrop-blur-md border border-white/20 animate-fade-in text-sm font-medium">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold mb-2">
            <Shield size={12} />
            <span>SCR-19 — Tenant Admin Access Only</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Quản Lý Nhân Viên & Gói Cước (Staff & Subscription)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Thiết lập danh sách nhân sự, phân quyền vai trò tác nhân và theo dõi hạn mức sử dụng tài nguyên workspace.
          </p>
        </div>

        {/* Action Button */}
        {activeTab === 'staff' ? (
          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Mời Nhân Viên Mới</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsUpgradeModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Nâng Cấp Gói Enterprise</span>
          </button>
        )}
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('staff')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === 'staff'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <Users size={16} />
          <span>Danh Sách Nhân Viên ({staffList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('subscription')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === 'subscription'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          <CreditCard size={16} />
          <span>Gói Cước & Hạn Mức (Pro Trial)</span>
        </button>
      </div>

      {/* TAB 1: STAFF MANAGEMENT */}
      {activeTab === 'staff' && (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tổng Ghế Nhân Viên</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {staffList.length} / {SUBSCRIPTION_PLAN_INFO.resources.staffSeats.max} Seats
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Manager Vận Hành</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {staffList.filter((s) => s.role === 'MANAGER').length} Tài khoản
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <UserCheck size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Đang Hoạt Động (Active)</p>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {staffList.filter((s) => s.status === 'ACTIVE').length} Nhân sự
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Tạm Khóa (Locked)</p>
                <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
                  {staffList.filter((s) => s.status === 'LOCKED').length} Tài khoản
                </p>
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tên hoặc email nhân viên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 font-medium outline-none"
              >
                <option value="ALL">Tất cả vai trò</option>
                <option value="MANAGER">Manager Vận hành</option>
                <option value="WAREHOUSE_STAFF">Nhân viên Kiểm kho</option>
                <option value="ORDER_STAFF">Nhân viên Xử lý Đơn</option>
              </select>
            </div>
          </div>

          {/* Staff Table */}
          <div className="rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Thành Viên</th>
                    <th className="px-6 py-4">Vai Trò Phân Quyền</th>
                    <th className="px-6 py-4">Phạm Vi Gian Hàng</th>
                    <th className="px-6 py-4">Ngày Gia Nhập</th>
                    <th className="px-6 py-4 text-center">Trạng Thái</th>
                    <th className="px-6 py-4 text-right">Thao Tác Khóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      {/* Name & Avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={staff.avatar}
                            alt={staff.name}
                            className="w-10 h-10 rounded-full object-cover border border-white/40"
                          />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{staff.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{staff.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${staff.roleBadgeColor}`}>
                          <Shield size={12} />
                          <span>{staff.roleLabel}</span>
                        </span>
                      </td>

                      {/* Scope */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {staff.stores.map((st, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                              {st}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">{staff.joinedDate}</td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        {staff.status === 'ACTIVE' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                            <Lock size={11} />
                            Locked
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(staff.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                            staff.status === 'ACTIVE'
                              ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border-rose-500/30'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border-emerald-500/30'
                          }`}
                        >
                          {staff.status === 'ACTIVE' ? (
                            <>
                              <Lock size={13} />
                              <span>Khóa Khẩn Cấp</span>
                            </>
                          ) : (
                            <>
                              <Unlock size={13} />
                              <span>Mở Khóa</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUBSCRIPTION & RESOURCE LIMITS */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          {/* Plan Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white relative overflow-hidden shadow-xl border border-white/10">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold mb-3">
                  <Sparkles size={12} />
                  <span>Trạng Thái: {SUBSCRIPTION_PLAN_INFO.planName}</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight">Enterprise Infrastructure & AI Insights</h2>
                <p className="text-sm text-slate-300 mt-1 max-w-xl">
                  Gói thử nghiệm Pro của bạn còn <strong className="text-amber-400">{SUBSCRIPTION_PLAN_INFO.daysRemaining} ngày</strong> (Hạn đến {SUBSCRIPTION_PLAN_INFO.expiryDate}). Sau đó cước phí duy trì là {SUBSCRIPTION_PLAN_INFO.price}.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="px-5 py-3 rounded-2xl bg-white text-indigo-950 font-black text-sm hover:bg-slate-100 shadow-xl transition-all cursor-pointer"
                >
                  Nâng Cấp Gói Enterprise
                </button>
              </div>
            </div>
          </div>

          {/* Resource Usage Bars Grid */}
          <div className="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HardDrive size={18} className="text-indigo-600 dark:text-indigo-400" />
              <span>Hạn Mức Tài Nguyên Tenant (Resource Usage Limits)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SKU Limit */}
              <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-200">{SUBSCRIPTION_PLAN_INFO.resources.skuCount.label}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                    {SUBSCRIPTION_PLAN_INFO.resources.skuCount.current} / {SUBSCRIPTION_PLAN_INFO.resources.skuCount.max} SKU
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${(SUBSCRIPTION_PLAN_INFO.resources.skuCount.current / SUBSCRIPTION_PLAN_INFO.resources.skuCount.max) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Stores Limit */}
              <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-200">{SUBSCRIPTION_PLAN_INFO.resources.stores.label}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {SUBSCRIPTION_PLAN_INFO.resources.stores.current} / {SUBSCRIPTION_PLAN_INFO.resources.stores.max} Sàn
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    style={{ width: `${(SUBSCRIPTION_PLAN_INFO.resources.stores.current / SUBSCRIPTION_PLAN_INFO.resources.stores.max) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Staff Seats Limit */}
              <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-200">{SUBSCRIPTION_PLAN_INFO.resources.staffSeats.label}</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    {SUBSCRIPTION_PLAN_INFO.resources.staffSeats.current} / {SUBSCRIPTION_PLAN_INFO.resources.staffSeats.max} Ghế
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    style={{ width: `${(SUBSCRIPTION_PLAN_INFO.resources.staffSeats.current / SUBSCRIPTION_PLAN_INFO.resources.staffSeats.max) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Outbox Sync Requests Limit */}
              <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-200">{SUBSCRIPTION_PLAN_INFO.resources.outboxRequests.label}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {SUBSCRIPTION_PLAN_INFO.resources.outboxRequests.current} / {SUBSCRIPTION_PLAN_INFO.resources.outboxRequests.max} req
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${(SUBSCRIPTION_PLAN_INFO.resources.outboxRequests.current / SUBSCRIPTION_PLAN_INFO.resources.outboxRequests.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History Table */}
          <div className="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard size={18} className="text-indigo-600 dark:text-indigo-400" />
              <span>Lịch Sử Thanh Toán & Hóa Đơn (Billing History)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-100/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 font-bold text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Mã Hóa Đơn</th>
                    <th className="px-4 py-3">Ngày Phát Hành</th>
                    <th className="px-4 py-3">Nội Dung Thanh Toán</th>
                    <th className="px-4 py-3">Số Tiền</th>
                    <th className="px-4 py-3 text-center">Trạng Thái</th>
                    <th className="px-4 py-3 text-right">Hóa Đơn PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                  {SUBSCRIPTION_PLAN_INFO.billingHistory.map((inv) => (
                    <tr key={inv.id}>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">{inv.id}</td>
                      <td className="px-4 py-3 font-mono text-xs">{inv.date}</td>
                      <td className="px-4 py-3">{inv.description}</td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{inv.amount}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => showToast(`Đã tải xuống hóa đơn ${inv.id}.pdf`)}
                          className="px-3 py-1 rounded-lg bg-slate-200/60 hover:bg-slate-300 dark:bg-slate-800 text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Download size={13} />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: Invite Staff Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Users size={18} className="text-indigo-600 dark:text-indigo-400" />
                <span>Mời Nhân Viên Mới</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Họ và Tên Nhân Viên</label>
                <input
                  type="text"
                  placeholder="e.g. Nguyễn Hoàng Bách"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Đăng Nhập</label>
                <input
                  type="email"
                  placeholder="bach.staff@hxvf123.vn"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Vai Trò Phân Quyền</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm outline-none"
                >
                  <option value="MANAGER">Manager Vận Hành (Full Ops)</option>
                  <option value="WAREHOUSE_STAFF">Nhân viên Kiểm Kho (Stock Ops)</option>
                  <option value="ORDER_STAFF">Nhân viên Xử lý Đơn hàng</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-md"
                >
                  Gửi Lời Mời & Cấp Quyền
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Upgrade Enterprise Plan Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
                <span>Nâng Cấp Gói Enterprise</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsUpgradeModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Gói Enterprise cung cấp hạ tầng cô lập hoàn toàn, không giới hạn SKU, không giới hạn gian hàng kết nối và mở khóa toàn bộ AI Forecasting Prophet.
              </p>

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs space-y-2 text-purple-900 dark:text-purple-200">
                <p className="font-bold">Đặc quyền Gói Enterprise:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Không giới hạn SKU sản phẩm & gian hàng Marketplace</li>
                  <li>Tốc độ Outbox Real-time Push Rate 10,000 req/min</li>
                  <li>Không giới hạn số lượng ghế tài khoản Nhân viên (Staff Seats)</li>
                  <li>Dedicated Support Engineer 24/7 từ SmartOmni Team</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsUpgradeModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsUpgradeModalOpen(false)
                  showToast('Yêu cầu nâng cấp Gói Enterprise đã gửi tới đội ngũ Vận hành Super Admin!')
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:from-purple-700 hover:to-indigo-700 shadow-md"
              >
                Xác Nhận Đăng Ký Nâng Cấp ($199/tháng)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
