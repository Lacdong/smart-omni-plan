import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Package,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  Send,
  History,
  ShieldCheck,
  Building2,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { ErpInventoryAdjustmentModal } from '@/components/erp/ErpInventoryAdjustmentModal'
import { INITIAL_INVENTORY_SKUS, INITIAL_OUTBOX_LOGS } from '@/data/mockInventoryData'
import './ErpInventoryPage.css'

export function ErpInventoryPage() {
  const navigate = useNavigate()
  const [skuList, setSkuList] = useState(INITIAL_INVENTORY_SKUS)
  const [outboxLogs, setOutboxLogs] = useState(INITIAL_OUTBOX_LOGS)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStockFilter, setSelectedStockFilter] = useState('all')

  const [activeAdjustmentSku, setActiveAdjustmentSku] = useState(null)
  const [toastNotification, setToastNotification] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToastNotification({ msg, type })
    setTimeout(() => setToastNotification(null), 5000)
  }

  const handleSaveSuccess = (updatedSku, newOutboxLog) => {
    setSkuList((prev) =>
      prev.map((item) => (item.sku === updatedSku.sku ? updatedSku : item))
    )

    setOutboxLogs((prev) => [newOutboxLog, ...prev])
    setActiveAdjustmentSku(null)

    showToast(
      `Đã cập nhật tồn kho mã ${updatedSku.sku}! Bản tin Outbox ${newOutboxLog.id} đã được phát đi.`
    )
  }

  // Filtering
  const filteredSkus = skuList.filter((item) => {
    const matchesSearch =
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory
    let matchesStock = true
    if (selectedStockFilter === 'low') {
      matchesStock = item.availableStock <= item.minStockAlert
    } else if (selectedStockFilter === 'normal') {
      matchesStock = item.availableStock > item.minStockAlert
    }
    return matchesSearch && matchesCategory && matchesStock
  })

  // KPI Calculations
  const totalSkus = skuList.length
  const totalActualStock = skuList.reduce((acc, curr) => acc + curr.actualStock, 0)
  const totalAvailableStock = skuList.reduce((acc, curr) => acc + curr.availableStock, 0)
  const lowStockCount = skuList.filter(
    (item) => item.availableStock <= item.minStockAlert
  ).length

  return (
    <div className="inventory-page-container">
      {/* Toast Notification Banner */}
      {toastNotification && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-indigo-500/40 text-xs backdrop-blur-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="flex-1">
              <div className="font-bold text-white">Thành công!</div>
              <div className="text-slate-300">{toastNotification.msg}</div>
            </div>
            <button
              onClick={() => navigate('/admin/inventory/logs')}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all text-[11px] shrink-0"
            >
              Xem SCR-42 Logs &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Quản lý Tồn kho SKU & Kiểm kê (SCR-40)"
        description="Theo dõi số dư tồn thực tế, khả dụng, giữ chỗ & đẩy tồn mới tự động lên sàn TMĐT qua Outbox."
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/inventory/logs')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 text-slate-700 font-bold text-xs border border-slate-300 shadow-sm hover:bg-slate-50 transition-all"
            >
              <History className="w-4 h-4 text-indigo-600" />
              Nhật ký Outbox Logs (SCR-42)
            </button>

            <button
              onClick={() => setActiveAdjustmentSku(skuList[0])}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all border border-indigo-400/40"
            >
              <Sparkles className="w-4 h-4" />
              Kiểm kê & Điều chỉnh Tồn kho
            </button>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className="inventory-kpi-grid">
        <StatCard
          title="Tổng SKU Monitored"
          value={totalSkus.toLocaleString('vi-VN')}
          change="Real-time"
          changeType="positive"
          icon={Package}
          description="Đồng bộ đa sàn"
        />
        <StatCard
          title="Tổng Tồn Thực Tế (Actual)"
          value={totalActualStock.toLocaleString('vi-VN')}
          change="Kho tổng"
          changeType="positive"
          icon={Layers}
          description="Tại các vị trí kệ"
        />
        <StatCard
          title="Tổng Tồn Khả Dụng (Available)"
          value={totalAvailableStock.toLocaleString('vi-VN')}
          change="Sẵn sàng bán"
          changeType="positive"
          icon={ShieldCheck}
          description="Trừ giữ chỗ đơn hàng"
        />
        <StatCard
          title="Cảnh báo Tồn thấp (Low Stock)"
          value={lowStockCount}
          change={lowStockCount > 0 ? 'Cần nhập thêm' : 'An toàn'}
          changeType={lowStockCount > 0 ? 'negative' : 'positive'}
          icon={AlertTriangle}
          description="Dưới ngưỡng min"
        />
      </div>

      {/* Outbox Publisher Pulse Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl border border-indigo-500/30">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center shrink-0">
            <Send className="w-5 h-5 text-indigo-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                Outbox Publisher Service Status
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                HEALTHY (POLLED 1s)
              </span>
            </div>
            <p className="text-xs text-indigo-200 mt-0.5">
              Cơ chế Optimistic Concurrency + Redis Lock ngăn chặn xung đột khi nhiều sàn chốt đơn cùng lúc.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/admin/inventory/logs')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-white font-bold text-xs transition-all self-start md:self-auto cursor-pointer"
        >
          Xem {outboxLogs.length} bản tin Outbox Logs &rarr;
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="liquid-glass-panel p-4">
        <div className="inventory-filter-bar">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã SKU hoặc tên sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Phân loại:</span>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="Thời trang Nam">Thời trang Nam</option>
              <option value="Phụ kiện">Phụ kiện</option>
              <option value="Điện tử & Công nghệ">Điện tử & Công nghệ</option>
              <option value="Phụ kiện Điện tử">Phụ kiện Điện tử</option>
            </select>

            <select
              value={selectedStockFilter}
              onChange={(e) => setSelectedStockFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất cả số dư</option>
              <option value="normal">Tồn khả dụng An toàn</option>
              <option value="low">Cảnh báo Tồn thấp (&le; Min)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Inventory SKU Table (SCR-40) */}
      <div className="liquid-glass-panel p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Danh sách Tồn kho SKU Chi tiết</h3>
            <p className="text-xs text-slate-500">
              Hiển thị 3 chỉ số tồn kho bắt buộc: Tồn thực tế, Tồn khả dụng, Tồn giữ chỗ.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">
            Hiển thị {filteredSkus.length} / {skuList.length} SKUs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="liquid-glass-table">
            <thead>
              <tr>
                <th>Sản phẩm / SKU</th>
                <th>Vị trí Kho</th>
                <th className="text-center">Tồn Thực Tế</th>
                <th className="text-center">Tồn Giữ Chỗ</th>
                <th className="text-center">Tồn Khả Dụng</th>
                <th className="text-center">RowVersion</th>
                <th>Đồng bộ Sàn TMĐT</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkus.map((item) => {
                const isLowStock = item.availableStock <= item.minStockAlert
                return (
                  <tr key={item.sku} className="hover:bg-slate-50/80 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-1.5 py-0.5 rounded">
                              {item.sku}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-slate-900 truncate max-w-xs mt-0.5">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.location}</span>
                      </div>
                    </td>

                    {/* Tồn thực tế */}
                    <td className="text-center">
                      <span className="stock-num-badge bg-slate-100 text-slate-800">
                        {item.actualStock}
                      </span>
                    </td>

                    {/* Tồn giữ chỗ */}
                    <td className="text-center">
                      <span className="stock-num-badge bg-amber-50 text-amber-700 border border-amber-200/60">
                        {item.reservedStock}
                      </span>
                    </td>

                    {/* Tồn khả dụng */}
                    <td className="text-center">
                      <span
                        className={`stock-num-badge ${
                          isLowStock
                            ? 'bg-rose-100 text-rose-800 border border-rose-300 font-black'
                            : 'bg-indigo-100 text-indigo-900 font-black'
                        }`}
                      >
                        {item.availableStock}
                      </span>
                      {isLowStock && (
                        <div className="text-[10px] font-bold text-rose-600 mt-0.5">
                          Tồn thấp! (&le;{item.minStockAlert})
                        </div>
                      )}
                    </td>

                    {/* RowVersion (Optimistic Concurrency) */}
                    <td className="text-center font-mono text-xs font-bold text-indigo-600">
                      v{item.rowVersion}
                    </td>

                    {/* Channels Sync Status */}
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {item.channels.map((ch) => (
                          <span
                            key={ch.channelId}
                            className={`channel-pill-tag ${
                              ch.status === 'SYNCED' ? 'synced' : 'failed'
                            }`}
                          >
                            {ch.status === 'SYNCED' ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                            )}
                            {ch.name.split(' ')[0]}: {ch.stockOnChannel}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* SCR-40 -> SCR-41 Trigger Button */}
                    <td className="text-right">
                      <button
                        onClick={() => setActiveAdjustmentSku(item)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-all shadow-sm cursor-pointer"
                      >
                        Cập nhật tồn
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SCR-41 Modal render */}
      {activeAdjustmentSku && (
        <ErpInventoryAdjustmentModal
          isOpen={!!activeAdjustmentSku}
          onClose={() => setActiveAdjustmentSku(null)}
          skuData={activeAdjustmentSku}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </div>
  )
}
