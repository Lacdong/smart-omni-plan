import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Sparkles,
  BarChart3,
  TrendingUp,
  Flame,
  Calendar,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Package,
  AlertTriangle,
  Send,
  Building2
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { INITIAL_AI_FORECAST_SKUS } from '@/data/mockAiData'
import './ErpAiForecastDetailPage.css'

export function ErpAiForecastDetailPage() {
  const navigate = useNavigate()
  const { sku } = useParams()

  const skuItem =
    INITIAL_AI_FORECAST_SKUS.find((item) => item.sku === sku) ||
    INITIAL_AI_FORECAST_SKUS[0]

  const isStockout = skuItem.riskType === 'STOCKOUT'

  return (
    <div className="forecast-detail-container">
      {/* Page Header */}
      <PageHeader
        title={`Chi tiết Phân rã Dự báo Prophet: ${skuItem.sku} (SCR-61)`}
        description="Biểu đồ phân rã chuỗi thời gian (Xu hướng g(t) + Mùa vụ s(t) + Sự kiện Mega Sale h(t)) và Đề xuất Nhập hàng AI."
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/ai/forecast')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 text-slate-700 font-bold text-xs border border-slate-300 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-indigo-600" /> Quay lại SCR-60 Dashboard AI
            </button>

            <button
              onClick={() => navigate('/admin/inventory')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all border border-indigo-400/40 cursor-pointer"
            >
              <Package className="w-4 h-4" /> Chuyển sang SCR-40 Cập nhật Tồn
            </button>
          </div>
        }
      />

      {/* Prophet Time Series Equation Card */}
      <div className="prophet-equation-box">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
                Prophet Time-Series Decomposition Model
              </div>
              <h3 className="text-base font-extrabold text-white">
                Công thức Phân rã: y(t) = g(t) + s(t) + h(t) + &epsilon;<sub>t</sub>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-200 border border-purple-400/30">
              Độ tin cậy: {skuItem.confidenceScore}%
            </span>
          </div>
        </div>

        {/* 3 Component Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="component-card">
            <div className="text-[11px] font-mono font-bold text-purple-300 uppercase">
              1. Growth Trend g(t)
            </div>
            <div className="text-sm font-bold text-white mt-1">Xu hướng Tăng trưởng +14.2%</div>
            <p className="text-[11px] text-purple-200 mt-0.5">
              Đường cơ sở nhu cầu tăng trưởng ổn định dài hạn.
            </p>
          </div>

          <div className="component-card">
            <div className="text-[11px] font-mono font-bold text-purple-300 uppercase">
              2. Seasonality s(t)
            </div>
            <div className="text-sm font-bold text-white mt-1">Chu kỳ Hàng tuần (Peak Wknd)</div>
            <p className="text-[11px] text-purple-200 mt-0.5">
              Tăng vọt 1.8x vào các ngày Thứ 6, Thứ 7 & Chủ Nhật.
            </p>
          </div>

          <div className="component-card">
            <div className="text-[11px] font-mono font-bold text-purple-300 uppercase">
              3. Exogenous Event h(t)
            </div>
            <div className="text-sm font-bold text-white mt-1">Biến Mega Sale (3.5x Multiplier)</div>
            <p className="text-[11px] text-purple-200 mt-0.5">
              Ảnh hưởng trực tiếp từ đợt Siêu Sale 9.9 & 10.10 đã khai báo.
            </p>
          </div>
        </div>
      </div>

      {/* SKU Brief & Key Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main SVG Interactive Forecast Chart */}
          <div className="liquid-glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Biểu đồ Nhu cầu Lịch sử & Dự báo 30 ngày tới
                </h3>
                <p className="text-xs text-slate-500">
                  Đường nét liền: Lịch sử thực tế &bull; Đường nét đứt: Dự báo mô hình Prophet &bull;
                  Đường màu đỏ: Ngưỡng cạn tồn kho
                </p>
              </div>
            </div>

            {/* SVG Visualizer */}
            <div className="relative">
              <svg className="forecast-svg-chart" viewBox="0 0 700 240">
                {/* Background Grid Lines */}
                <line x1="40" y1="40" x2="660" y2="40" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="40" y1="90" x2="660" y2="90" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="40" y1="140" x2="660" y2="140" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="40" y1="190" x2="660" y2="190" stroke="#E2E8F0" strokeDasharray="3 3" />

                {/* Stockout Threshold Red Line */}
                <line x1="40" y1="165" x2="660" y2="165" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" />
                <text x="50" y="160" fill="#EF4444" fontSize="10" fontWeight="bold">
                  Ngưỡng cạn tồn kho (Stockout Level)
                </text>

                {/* Vertical Divider Today */}
                <line x1="340" y1="20" x2="340" y2="210" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="345" y="32" fill="#6366F1" fontSize="10" fontWeight="bold">
                  Hôm nay (2026-09-13)
                </text>

                {/* Historical Line (Blue Solid) */}
                <polyline
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  points="40,150 65,145 90,140 115,155 140,130 165,120 190,105 215,115 240,135 265,140 290,125 315,110 340,95"
                />

                {/* Forecast Line (Indigo Dashed with 95% Confidence Shadow Band) */}
                <polygon
                  fill="rgba(99, 102, 241, 0.12)"
                  points="340,95 365,80 390,75 415,60 440,50 465,45 490,40 515,35 540,30 565,25 590,20 615,18 640,15 640,65 615,70 590,75 565,80 540,85 515,90 490,95 465,100 440,105 415,110 390,115 365,120 340,95"
                />
                <polyline
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  points="340,95 365,85 390,80 415,65 440,55 465,50 490,45 515,40 540,35 565,30 590,25 615,22 640,18"
                />

                {/* Data Points */}
                <circle cx="340" cy="95" r="5" fill="#6366F1" />
                <circle cx="490" cy="45" r="5" fill="#A855F7" />
                <circle cx="640" cy="18" r="5" fill="#6366F1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Col: AI Recommendation & Restock Action Box */}
        <div className="space-y-6">
          <div className="liquid-glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Khuyến nghị Hành động AI
              </h3>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                PROPHET VERIFIED
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] font-semibold text-slate-500">Mã SKU & Sản phẩm:</div>
                <div className="font-bold text-xs text-indigo-700 font-mono">{skuItem.sku}</div>
                <div className="text-xs font-bold text-slate-900">{skuItem.productName}</div>
              </div>

              {isStockout ? (
                <>
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                    <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-rose-600 shrink-0" /> Dự báo Cháy hàng trong{' '}
                      {skuItem.daysUntilStockout} ngày
                    </div>
                    <div className="text-xs text-rose-700">
                      Mốc cạn tồn kho dự kiến: <strong>{skuItem.stockoutDate}</strong>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <div className="text-[11px] font-semibold text-emerald-800">
                      Số lượng Đề xuất Nhập bổ sung:
                    </div>
                    <div className="text-xl font-black text-emerald-700">
                      +{skuItem.recommendedRestockQty} sản phẩm
                    </div>
                    <div className="text-xs font-bold text-emerald-900 mt-1">
                      Hạn chót đặt hàng với nhà cung cấp: {skuItem.recommendedRestockDate}
                    </div>
                  </div>

                  {skuItem.potentialRevenueLoss > 0 && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                      <div className="text-[11px] font-semibold text-amber-800">
                        Dự kiến Thất thoát Doanh số nếu không nhập:
                      </div>
                      <div className="text-base font-extrabold text-amber-900">
                        {skuItem.potentialRevenueLoss.toLocaleString('vi-VN')}đ
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" /> Cảnh báo Tồn đọng vốn
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">{skuItem.recommendationNote}</p>
                </div>
              )}
            </div>

            {/* Quick Action Button */}
            <div className="pt-2">
              <button
                onClick={() => navigate('/admin/inventory')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all border border-indigo-400/40 cursor-pointer"
              >
                <Package className="w-4 h-4" /> Kích hoạt Cập nhật Tồn kho (SCR-40)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
