import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Sparkles,
  Zap,
  Calendar,
  DollarSign,
  ShoppingBag,
  Save,
  CheckCircle2,
  PlusCircle,
  TrendingUp,
  Layers,
  Check
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { INITIAL_MEGA_SALES } from '@/data/mockAiData'
import './ErpAiMegaSaleFormPage.css'

export function ErpAiMegaSaleFormPage() {
  const navigate = useNavigate()
  const [megaSalesList, setMegaSalesList] = useState(INITIAL_MEGA_SALES)

  const [formData, setFormData] = useState({
    name: '',
    startDate: '2026-10-10',
    endDate: '2026-10-12',
    platforms: ['shopee', 'tiktok'],
    exogenousMultiplier: 3.5,
    budgetVnd: 50000000,
    targetCategories: ['Thời trang Nam', 'Phụ kiện'],
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name) {
      alert('Vui lòng nhập Tên đợt Mega Sale!')
      return
    }

    const newSale = {
      id: `SALE-${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      status: 'UPCOMING',
      createdAt: new Date().toISOString().substring(0, 10),
    }

    setMegaSalesList([newSale, ...megaSalesList])

    // Redirect to SCR-60 with success state
    navigate('/admin/ai/forecast')
  }

  return (
    <div className="mega-sale-container">
      {/* Page Header */}
      <PageHeader
        title="Khai báo Đợt Mega Sale & Truyền biến h(t) vào AI (SCR-62)"
        description="Đăng ký trước các đợt Siêu Sale trên Shopee, TikTok Shop & Lazada để mô hình Prophet tính toán hệ số tăng trưởng nhu cầu h(t)."
        actions={
          <button
            onClick={() => navigate('/admin/ai/forecast')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 text-slate-700 font-bold text-xs border border-slate-300 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600" /> Quay lại SCR-60 AI Insights
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Mega Sale Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="liquid-glass-panel p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Khai báo Sự kiện Khuyến mãi Mới
              </h3>
              <span className="font-mono text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                PROPHET EXOGENOUS VAR h(t)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tên Sự kiện Mega Sale <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="VD: Siêu Hội Sale 10.10 Double Day All Platforms"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ngày bắt đầu đợt Sale <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ngày kết thúc đợt Sale <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Hệ số Tăng trưởng Dự kiến h(t) Multiplier <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.exogenousMultiplier}
                  onChange={(e) =>
                    setFormData({ ...formData, exogenousMultiplier: parseFloat(e.target.value) })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-indigo-700 focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="1.5">1.5x — Mini Campaign (Sale ngày thường)</option>
                  <option value="2.5">2.5x — Mid-Month Sale (Sale giữa tháng)</option>
                  <option value="3.5">3.5x — Mega Sale Double Day (Sale 9.9, 10.10, 11.11)</option>
                  <option value="5.0">5.0x — Super Mega Sale (Sale cuối năm & Tết)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Biến $h(t)$ sẽ nhân nhu cầu bán dự kiến gấp <strong>{formData.exogenousMultiplier} lần</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ngân sách Marketing / Ads / Livestream (VND)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.budgetVnd}
                  onChange={(e) =>
                    setFormData({ ...formData, budgetVnd: parseInt(e.target.value) || 0 })
                  }
                  placeholder="VD: 50000000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>

            {/* Action Submit */}
            <div className="pt-3 border-t border-slate-200">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all border border-indigo-400/40 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Lưu Đợt Sale & Re-train AI Model (Prophet h(t))
              </button>
            </div>
          </form>
        </div>

        {/* Right Col: Declared Mega Sales List */}
        <div className="space-y-4">
          <div className="liquid-glass-panel p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200/80 pb-3 flex items-center justify-between">
              <span>Đợt Sale Đã Khai Báo</span>
              <span className="text-xs font-mono font-bold text-indigo-600">
                {megaSalesList.length} Events
              </span>
            </h3>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {megaSalesList.map((sale) => (
                <div key={sale.id} className="mega-sale-card">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {sale.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        sale.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                    >
                      {sale.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900">{sale.name}</h4>

                  <div className="text-[11px] text-slate-600 mt-1 space-y-0.5 font-semibold">
                    <div>
                      Thời gian: {sale.startDate} &rarr; {sale.endDate}
                    </div>
                    <div>
                      Biến h(t): <strong className="text-indigo-600">{sale.exogenousMultiplier}x</strong>{' '}
                      &bull; Ngân sách: {sale.budgetVnd.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
