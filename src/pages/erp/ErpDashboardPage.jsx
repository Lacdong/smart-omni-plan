import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DollarSign, ShoppingBag, Package, TrendingUp, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { AIInsightCard } from '@/components/ui/AIInsightCard'
import { GlassModal } from '@/components/ui/GlassModal'

export function ErpDashboardPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <PageHeader
        title="BI Dashboard & Operations Summary"
        description="Real-time multi-channel sales overview, stock risk alerts, and AI demand predictions."
        actions={
          <button
            onClick={() => navigate('/admin/inventory')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-lg hover:bg-indigo-500 transition-all border border-indigo-400/50 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Quick Stock Adjustment (SCR-40)
          </button>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue (All Channels)"
          value="$48,250.00"
          change="+14.2%"
          changeType="positive"
          icon={DollarSign}
          description="vs last 30 days"
        />
        <StatCard
          title="Total Multi-channel Orders"
          value="1,420"
          change="+8.1%"
          changeType="positive"
          icon={ShoppingBag}
          description="Shopee + TikTok Shop"
          onClick={() => navigate('/admin/orders')}
        />
        <StatCard
          title="Redirect CTR (Click-Through)"
          value="34.8%"
          change="+2.4%"
          changeType="positive"
          icon={TrendingUp}
          description="Storefront to Marketplace"
        />
        <StatCard
          title="Active SKUs Monitored"
          value="850"
          change="Pro Tier"
          changeType="positive"
          icon={Package}
          description="Click to manage stock"
          onClick={() => navigate('/admin/inventory')}
        />
      </div>

      {/* Main Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-cols: Orders Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="liquid-glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Recent Synchronized Orders</h3>
                <p className="text-xs text-slate-300">Real-time Webhook feed from Shopee & TikTok Shop</p>
              </div>
              <button 
                onClick={() => navigate('/admin/orders')}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
              >
                View All Orders &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="liquid-glass-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Channel</th>
                    <th>SKU</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="cursor-pointer hover:bg-white/10" onClick={() => navigate('/admin/orders/ORD-SPX-8891')}>
                    <td className="font-bold text-white">#ORD-SPX-8891</td>
                    <td className="text-slate-300">Shopee Mall</td>
                    <td className="font-mono text-indigo-200">TSHIRT-BLK-XL</td>
                    <td className="font-bold text-emerald-400">770.000đ</td>
                    <td><StatusBadge status="CONFIRMED" /></td>
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); navigate('/admin/orders/ORD-SPX-8891'); }} className="text-indigo-300 hover:text-white font-bold text-xs">Detail</button>
                    </td>
                  </tr>
                  <tr className="cursor-pointer hover:bg-white/10" onClick={() => navigate('/admin/orders/ORD-TT-4402')}>
                    <td className="font-bold text-white">#ORD-TT-4402</td>
                    <td className="text-slate-300">TikTok Shop</td>
                    <td className="font-mono text-indigo-200">HEADPHONE-ANC-BLK</td>
                    <td className="font-bold text-emerald-400">1.390.000đ</td>
                    <td><StatusBadge status="PACKING" /></td>
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); navigate('/admin/orders/ORD-TT-4402'); }} className="text-indigo-300 hover:text-white font-bold text-xs">Detail</button>
                    </td>
                  </tr>
                  <tr className="cursor-pointer hover:bg-white/10" onClick={() => navigate('/admin/orders/ORD-SYNC-ERR-01')}>
                    <td className="font-bold text-white">#ORD-SYNC-ERR-01</td>
                    <td className="text-slate-300">TikTok Shop</td>
                    <td className="font-mono text-indigo-200">CHARGER-GAN-65W</td>
                    <td className="font-bold text-rose-400">390.000đ</td>
                    <td><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">Lỗi Sync</span></td>
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); navigate('/admin/orders/ORD-SYNC-ERR-01'); }} className="text-rose-300 hover:text-white font-bold text-xs">Thử lại Sync</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1-col: AI Recommendation & Outbox Sync Health */}
        <div className="space-y-6">
          <AIInsightCard
            title="Stockout Alert: TSHIRT-BLK-2XL"
            recommendation="Prophet AI forecasts a 35% demand spike in next 14 days due to upcoming promotion. Current stock (12 units) will deplete in 4 days."
            confidence="94.2%"
            actionText="Create Restock Order"
          />

          <div className="liquid-glass-panel p-5">
            <h4 className="text-sm font-bold text-white mb-3">Outbox Sync Health</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/15 text-slate-200">
                <span className="font-semibold">Shopee Outbox Sync</span>
                <StatusBadge status="SUCCESS" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/15 text-slate-200">
                <span className="font-semibold">TikTok Shop Outbox Sync</span>
                <StatusBadge status="SUCCESS" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Demonstration */}
      <GlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="SCR-41: Quick Inventory Stock Adjustment"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-300">
            Demonstrating Redis Lock & Optimistic Concurrency manual adjustment flow.
          </p>
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Target SKU:</span>
              <span className="font-bold text-white">TSHIRT-BLK-2XL</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Current Actual Stock:</span>
              <span className="font-bold text-emerald-400">12 units</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-white/15">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-all border border-indigo-400/50"
            >
              Save Adjustment
            </button>
          </div>
        </div>
      </GlassModal>
    </div>
  )
}
