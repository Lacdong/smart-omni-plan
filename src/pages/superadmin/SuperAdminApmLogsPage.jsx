import React, { useState } from 'react'
import {
  Activity,
  ShieldCheck,
  ShieldAlert,
  Server,
  Zap,
  CheckCircle2,
  Terminal,
  Lock,
  Sparkles,
  BarChart3,
  RefreshCw
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { INITIAL_APM_SECURITY_LOGS } from '@/data/mockSuperAdminData'
import './SuperAdminApmLogsPage.css'

export function SuperAdminApmLogsPage() {
  const [logs, setLogs] = useState(INITIAL_APM_SECURITY_LOGS)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 800)
  }

  return (
    <div className="apm-logs-container text-slate-900">
      {/* Page Header */}
      <PageHeader
        title="Giám sát APM & Security Logs (SCR-73)"
        description="Hiển thị biểu đồ độ trễ hệ thống, nhật ký cảnh báo vi phạm cô lập dữ liệu PostgreSQL RLS và lịch sử sai số RMSE của các mô hình AI."
        actions={
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 text-slate-700 font-bold text-xs border border-slate-300 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            Làm mới Logs APM
          </button>
        }
      />

      {/* KPI Stats Grid */}
      <div className="apm-stats-grid">
        <StatCard
          title="Độ trễ API p95"
          value="110 ms"
          change="Tối ưu"
          changeType="positive"
          icon={Zap}
          description="Nginx Gateway Response"
        />
        <StatCard
          title="Thông lượng Webhook"
          value="420 req/s"
          change="RabbitMQ Queue Stable"
          changeType="positive"
          icon={Server}
          description="Shopee + TikTok Shop"
        />
        <StatCard
          title="RLS Security Violations"
          value="0 Active"
          change="100% Data Isolated"
          changeType="positive"
          icon={ShieldCheck}
          description="PostgreSQL Tenant Policy"
        />
        <StatCard
          title="Sai số Prophet AI (RMSE)"
          value="0.042"
          change="Accurate 94.6%"
          changeType="positive"
          icon={Sparkles}
          description="Root Mean Square Error"
        />
      </div>

      {/* RLS Security Audit Logs Feed */}
      <div className="liquid-glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-600" /> PostgreSQL Row Level Security (RLS) Audit Log Feed
          </h3>
          <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            STRICT TENANT ISOLATION ACTIVE
          </span>
        </div>

        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {log.id}
                  </span>
                  <span className="text-xs font-bold text-slate-500 font-mono">{log.timestamp}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                    {log.status}
                  </span>
                </div>
                <span className="font-mono text-xs text-slate-600">Client IP: {log.clientIp}</span>
              </div>

              <p className="text-xs text-slate-700 font-semibold">{log.details}</p>

              {log.querySnippet && (
                <div className="sql-query-snippet">
                  <span className="text-slate-400">// Query Attempt Intercepted by PostgreSQL RLS:</span>
                  <div>{log.querySnippet}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prophet AI Model RMSE History Feed */}
      <div className="liquid-glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" /> Lịch sử Sai số RMSE Mô hình Prophet AI Forecast
          </h3>
          <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            MODEL VERIFICATION score: 94.6%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">Chỉ số RMSE 7 ngày gần nhất</div>
            <div className="text-2xl font-black text-slate-900 mt-1">0.042</div>
            <div className="text-[11px] text-emerald-600 font-bold mt-0.5">Dưới ngưỡng sai số 0.05</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">Backtest Cross-Validation Accuracy</div>
            <div className="text-2xl font-black text-purple-700 mt-1">94.6%</div>
            <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Kiểm định trên 30 ngày bán hàng</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-xs font-semibold text-slate-500">Ảnh hưởng biến h(t) Mega Sale</div>
            <div className="text-2xl font-black text-indigo-700 mt-1">3.5x - 5.0x</div>
            <div className="text-[11px] text-indigo-600 font-bold mt-0.5">Khớp với kết quả bán thực tế</div>
          </div>
        </div>
      </div>
    </div>
  )
}
