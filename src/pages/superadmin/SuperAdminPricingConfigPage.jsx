import React, { useState } from 'react'
import {
  Key,
  Crown,
  Sparkles,
  CheckCircle2,
  Save,
  Layers,
  ShoppingBag,
  Zap,
  Check,
  ShieldCheck,
  Sliders
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { INITIAL_PRICING_CONFIG, INITIAL_FEATURE_FLAGS } from '@/data/mockSuperAdminData'
import './SuperAdminPricingConfigPage.css'

export function SuperAdminPricingConfigPage() {
  const [pricingConfig, setPricingConfig] = useState(INITIAL_PRICING_CONFIG)
  const [featureFlags, setFeatureFlags] = useState(INITIAL_FEATURE_FLAGS)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  const handleToggleFlag = (flagId) => {
    setFeatureFlags((prev) =>
      prev.map((f) => (f.id === flagId ? { ...f, enabled: !f.enabled } : f))
    )
  }

  const handleSave = (e) => {
    e.preventDefault()
    showToast('Đã lưu thành công Cấu hình Hạn mức Gói cước & Feature Flags toàn hệ thống!')
  }

  return (
    <div className="pricing-config-container text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-indigo-500/40 text-xs backdrop-blur-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Cấu hình Gói cước & Feature Flags (SCR-72)"
        description="Thiết lập hạn mức tài nguyên (số SKU, số sàn kết nối, quyền dùng Prophet AI) cho các gói Free/Pro và bật tắt tính năng toàn hệ thống."
      />

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tier Config Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Tier Config Card */}
          <div className="tier-config-card">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
                  FREE TIER
                </span>
                <h3 className="text-sm font-bold text-slate-900">Gói Miễn phí</h3>
              </div>
              <span className="text-xs font-bold text-slate-500">0đ / tháng</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Hạn mức Số SKU tối đa
                </label>
                <input
                  type="number"
                  value={pricingConfig.FREE.maxSkus}
                  onChange={(e) =>
                    setPricingConfig({
                      ...pricingConfig,
                      FREE: { ...pricingConfig.FREE, maxSkus: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Số Gian hàng Sàn tối đa được kết nối
                </label>
                <input
                  type="number"
                  value={pricingConfig.FREE.maxChannels}
                  onChange={(e) =>
                    setPricingConfig({
                      ...pricingConfig,
                      FREE: { ...pricingConfig.FREE, maxChannels: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Quyền sử dụng Mô hình Prophet AI</div>
                  <div className="text-[11px] text-slate-500">Mặc định Disabled ở gói Free</div>
                </div>
                <input
                  type="checkbox"
                  checked={pricingConfig.FREE.aiProphetEnabled}
                  onChange={(e) =>
                    setPricingConfig({
                      ...pricingConfig,
                      FREE: { ...pricingConfig.FREE, aiProphetEnabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Pro Tier Config Card */}
          <div className="tier-config-card pro">
            <div className="flex items-center justify-between border-b border-indigo-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                  PRO TIER
                </span>
                <h3 className="text-sm font-bold text-slate-900">Gói Chuyên nghiệp (Pro)</h3>
              </div>
              <span className="text-xs font-bold text-indigo-600">1.990.000đ / tháng</span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Hạn mức Số SKU tối đa
                </label>
                <input
                  type="text"
                  value={pricingConfig.PRO.maxSkus}
                  onChange={(e) =>
                    setPricingConfig({
                      ...pricingConfig,
                      PRO: { ...pricingConfig.PRO, maxSkus: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-indigo-300 font-bold text-indigo-700 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Số Gian hàng Sàn tối đa được kết nối
                </label>
                <input
                  type="number"
                  value={pricingConfig.PRO.maxChannels}
                  onChange={(e) =>
                    setPricingConfig({
                      ...pricingConfig,
                      PRO: { ...pricingConfig.PRO, maxChannels: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-indigo-300 font-bold focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-purple-900">
                    Quyền sử dụng Mô hình Prophet AI Forecast
                  </div>
                  <div className="text-[11px] text-purple-700">Mặc định Enabled ở gói Pro</div>
                </div>
                <input
                  type="checkbox"
                  checked={pricingConfig.PRO.aiProphetEnabled}
                  onChange={(e) =>
                    setPricingConfig({
                      ...pricingConfig,
                      PRO: { ...pricingConfig.PRO, aiProphetEnabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Global Feature Flags Section */}
        <div className="liquid-glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" /> Quản lý Công tắc Feature Flags Toàn Hệ thống
            </h3>
            <span className="text-xs font-mono font-bold text-slate-500">
              {featureFlags.filter((f) => f.enabled).length} / {featureFlags.length} Flags Active
            </span>
          </div>

          <div className="space-y-3">
            {featureFlags.map((flag) => (
              <div
                key={flag.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {flag.id}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{flag.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{flag.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={flag.enabled}
                    onChange={() => handleToggleFlag(flag.id)}
                    className="toggle-switch-input"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer border border-indigo-400/40"
          >
            <Save className="w-4 h-4" /> Lưu Cấu hình Gói cước & Feature Flags
          </button>
        </div>
      </form>
    </div>
  )
}
