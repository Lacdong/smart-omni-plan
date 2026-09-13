import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Flame,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Crown,
  RefreshCw,
  PlusCircle,
  BarChart3,
  HelpCircle
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { INITIAL_AI_FORECAST_SKUS, INITIAL_MEGA_SALES } from '@/data/mockAiData'
import './ErpAiForecastPage.css'

export function ErpAiForecastPage() {
  const navigate = useNavigate()
  const [planTier, setPlanTier] = useState('PRO') // 'PRO' | 'FREE'
  const [forecastSkus, setForecastSkus] = useState(INITIAL_AI_FORECAST_SKUS)
  const [megaSales, setMegaSales] = useState(INITIAL_MEGA_SALES)
  const [filterRisk, setFilterRisk] = useState('all')

  const filteredSkus = forecastSkus.filter((item) => {
    if (filterRisk === 'STOCKOUT') return item.riskType === 'STOCKOUT'
    if (filterRisk === 'DEADSTOCK') return item.riskType === 'DEADSTOCK'
    return true
  })

  const stockoutCount = forecastSkus.filter((s) => s.riskType === 'STOCKOUT').length
  const deadstockCount = forecastSkus.filter((s) => s.riskType === 'DEADSTOCK').length

  return (
    <div className="ai-forecast-container">
      {/* Plan Tier Switcher Toolbar */}
      <div className="p-3 rounded-2xl bg-white/80 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Crown className="w-4 h-4 text-amber-500" />
          <span>Giả lập Gói Dịch vụ Tenant:</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPlanTier('PRO')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              planTier === 'PRO'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline mr-1" /> Gói Pro (AI Prophet Active)
          </button>
          <button
            onClick={() => setPlanTier('FREE')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              planTier === 'FREE'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5 inline mr-1" /> Gói Free (Edge Case Test)
          </button>
        </div>
      </div>

      {/* Page Header */}
      <PageHeader
        title="AI Insights & Dự báo Nhu cầu Kho (SCR-60)"
        description="Mô hình dự báo Prophet phân rã chuỗi thời gian, cảnh báo nguy cơ Cháy hàng / Tồn đọng và tích hợp sự kiện Mega Sale."
        actions={
          planTier === 'PRO' && (
            <button
              onClick={() => navigate('/admin/ai/mega-sale')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all border border-indigo-400/40 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> Khai báo Đợt Sale (SCR-62)
            </button>
          )
        }
      />

      {/* EDGE CASE HANDLER: Free Tier Upgrade Banner */}
      {planTier === 'FREE' ? (
        <div className="free-tier-banner animate-fade-in">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8 text-indigo-400" />
            </div>

            <div className="space-y-2">
              <span className="prophet-badge">PRO FEATURE LOCKED</span>
              <h2 className="text-xl font-extrabold text-white">
                Nâng cấp Gói Pro để kích hoạt Mô hình Prophet AI Forecast
              </h2>
              <p className="text-xs text-indigo-200 leading-relaxed">
                Tính năng Dự báo Kho AI (SCR-60, SCR-61, SCR-62) chỉ xuất hiện khi Tenant đang đăng ký{' '}
                <strong className="text-amber-400">Gói dịch vụ Pro</strong>. Thuật toán Prophet giúp bạn dự báo chính xác nhu cầu 30 ngày tới, cảnh báo cháy hàng trước 12 ngày và tối ưu chi phí tồn đọng.
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={() => setPlanTier('PRO')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-xl hover:from-indigo-600 hover:to-purple-700 transition-all cursor-pointer border border-indigo-300/40"
              >
                <Sparkles className="w-4 h-4" /> Nâng cấp Gói Pro ngay (Dùng thử AI Prophet)
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* PRO TIER DASHBOARD CONTENT */
        <>
          {/* AI Model Active Header */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl border border-purple-500/30">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Prophet Time-Series Engine</span>
                  <span className="prophet-badge">y(t) = g(t) + s(t) + h(t) + &epsilon;</span>
                </div>
                <p className="text-xs text-purple-200 mt-0.5">
                  Mô hình đã học lịch sử bán lẻ đa sàn & tích hợp {megaSales.length} sự kiện Mega Sale $h(t)$.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/admin/ai/mega-sale')}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer"
              >
                Quản lý {megaSales.length} Đợt Sale &rarr;
              </button>
            </div>
          </div>

          {/* KPI Stats Grid */}
          <div className="ai-kpi-grid">
            <StatCard
              title="SKU Nguy cơ Cháy hàng"
              value={stockoutCount}
              change="Cảnh báo đỏ"
              changeType="negative"
              icon={Flame}
              description="Cần nhập hàng trong 14 ngày"
            />
            <StatCard
              title="SKU Nguy cơ Tồn đọng"
              value={deadstockCount}
              change="Cảnh báo vàng"
              changeType="warning"
              icon={AlertTriangle}
              description="Chậm luân chuyển > 60 ngày"
            />
            <StatCard
              title="Độ chính xác Prophet AI"
              value="94.6%"
              change="+1.8%"
              changeType="positive"
              icon={ShieldCheck}
              description="Đã qua kiểm định backtest"
            />
            <StatCard
              title="Sự kiện Mega Sale Active"
              value={megaSales.length}
              change="Biến h(t)"
              changeType="positive"
              icon={Zap}
              description="Tăng trưởng dự kiến 3.5x"
            />
          </div>

          {/* Risk Filter Bar */}
          <div className="liquid-glass-panel p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Lọc theo loại rủi ro:</span>
                <button
                  onClick={() => setFilterRisk('all')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    filterRisk === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tất cả ({forecastSkus.length})
                </button>
                <button
                  onClick={() => setFilterRisk('STOCKOUT')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    filterRisk === 'STOCKOUT'
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  Cháy hàng ({stockoutCount})
                </button>
                <button
                  onClick={() => setFilterRisk('DEADSTOCK')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    filterRisk === 'DEADSTOCK'
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  Tồn đọng ({deadstockCount})
                </button>
              </div>

              <span className="text-xs text-slate-500 italic hidden md:inline">
                * Click vào bất kỳ dòng SKU để xem chi tiết biểu đồ phân rã chuỗi thời gian (SCR-61).
              </span>
            </div>
          </div>

          {/* Risk SKU Table / Cards */}
          <div className="liquid-glass-panel p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Danh sách Cảnh báo Rủi ro Tồn kho Thông minh
                </h3>
                <p className="text-xs text-slate-500">
                  Phân tích chuỗi thời gian và khuyến nghị số lượng nhập bổ sung cụ thể.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="liquid-glass-table">
                <thead>
                  <tr>
                    <th>Mã SKU & Sản phẩm</th>
                    <th>Loại Rủi ro</th>
                    <th className="text-center">Tồn Hiện tại</th>
                    <th className="text-center">Dự báo 30 ngày</th>
                    <th>Đề xuất Nhập hàng AI</th>
                    <th className="text-center">Độ tin cậy</th>
                    <th className="text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSkus.map((item) => {
                    const isStockout = item.riskType === 'STOCKOUT'
                    return (
                      <tr
                        key={item.sku}
                        onClick={() => navigate(`/admin/ai/forecast/${item.sku}`)}
                        className="cursor-pointer hover:bg-indigo-50/50 transition-colors"
                      >
                        <td>
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200/60">
                                  {item.sku}
                                </span>
                                <span className="text-[10px] text-slate-500">{item.category}</span>
                              </div>
                              <div className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-1">
                                {item.productName}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`risk-level-tag ${
                              isStockout ? 'stockout' : 'deadstock'
                            }`}
                          >
                            {isStockout ? (
                              <>
                                <Flame className="w-3.5 h-3.5 text-rose-600" /> Nguy cơ Cháy hàng (
                                {item.daysUntilStockout} ngày)
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Tồn đọng vốn
                              </>
                            )}
                          </span>
                        </td>

                        <td className="text-center font-bold text-slate-900">{item.currentStock}</td>

                        <td className="text-center font-bold text-indigo-700">
                          {item.predictedDemand30d} sp
                        </td>

                        <td>
                          {isStockout ? (
                            <div className="text-xs">
                              <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                +{item.recommendedRestockQty} sản phẩm
                              </span>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                Hạn đặt hàng: <strong>{item.recommendedRestockDate}</strong>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-amber-800 italic max-w-xs">
                              {item.recommendationNote}
                            </div>
                          )}
                        </td>

                        <td className="text-center">
                          <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                            {item.confidenceScore}%
                          </span>
                        </td>

                        <td className="text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/admin/ai/forecast/${item.sku}`)
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-all shadow-sm cursor-pointer ml-auto"
                          >
                            <BarChart3 className="w-3.5 h-3.5" /> Xem Biểu đồ (SCR-61)
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
