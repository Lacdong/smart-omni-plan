import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Send,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  Search,
  ArrowLeft,
  Terminal,
  Lock,
  ShieldCheck,
  Zap,
  RotateCcw,
  Check,
  Code
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { GlassModal } from '@/components/ui/GlassModal'
import { INITIAL_OUTBOX_LOGS } from '@/data/mockInventoryData'
import './ErpOutboxLogsPage.css'

export function ErpOutboxLogsPage() {
  const navigate = useNavigate()
  const [logs, setLogs] = useState(INITIAL_OUTBOX_LOGS)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [isPublishing, setIsPublishing] = useState(false)
  const [activeJsonPayloadLog, setActiveJsonPayloadLog] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Trigger manual Outbox Publisher pulse
  const handleTriggerPublisher = () => {
    setIsPublishing(true)
    setTimeout(() => {
      setIsPublishing(false)
      showToast('Outbox Publisher đã quét 100% bản tin pending và đồng bộ thành công!')
    }, 1200)
  }

  // Retry Sync handler for FAILED logs (e.g. OBX-9902)
  const handleRetrySync = (logId) => {
    setLogs((prev) =>
      prev.map((log) => {
        if (log.id === logId) {
          const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19)
          return {
            ...log,
            outboxStatus: 'SUCCESS',
            failureReason: null,
            channelsSync: log.channelsSync.map((ch) => ({
              ...ch,
              status: 'SUCCESS',
              error: null,
              syncTime: nowStr,
              responseTime: '145ms',
            })),
          }
        }
        return log
      })
    )
    showToast(`Đã khôi phục & thử lại đồng bộ bản tin ${logId} thành công lên TikTok Shop!`)
  }

  // Filtering
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.productName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      selectedStatus === 'all' || log.outboxStatus === selectedStatus
    let matchesChannel = true
    if (selectedChannel !== 'all') {
      matchesChannel = log.channelsSync.some(
        (ch) =>
          ch.channel.toLowerCase().includes(selectedChannel.toLowerCase()) &&
          ch.status === 'SUCCESS'
      )
    }
    return matchesSearch && matchesStatus && matchesChannel
  })

  // Calculations
  const totalLogs = logs.length
  const successCount = logs.filter((l) => l.outboxStatus === 'SUCCESS').length
  const failedCount = logs.filter((l) => l.outboxStatus === 'FAILED').length
  const successRate = totalLogs > 0 ? Math.round((successCount / totalLogs) * 100) : 100

  return (
    <div className="outbox-logs-container">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-emerald-500/40 text-xs backdrop-blur-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Nhật ký Đồng bộ Outbox Logs (SCR-42)"
        description="Theo dõi toàn bộ bản tin tồn kho mới được Outbox Publisher đẩy ngầm lên Shopee, TikTok Shop & Lazada."
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/inventory')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 text-slate-700 font-bold text-xs border border-slate-300 shadow-sm hover:bg-slate-50 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-indigo-600" />
              Quay lại SCR-40 Tồn kho
            </button>

            <button
              onClick={handleTriggerPublisher}
              disabled={isPublishing}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all border border-indigo-400/40 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isPublishing ? 'animate-spin' : ''}`} />
              {isPublishing ? 'Publisher đang quét...' : 'Chạy Outbox Publisher (Manual Pulse)'}
            </button>
          </div>
        }
      />

      {/* KPI Stats Grid */}
      <div className="outbox-stats-grid">
        <StatCard
          title="Tổng bản tin Outbox"
          value={totalLogs}
          change="DB Table"
          changeType="positive"
          icon={Send}
          description="Được ghi cùng DB transaction"
        />
        <StatCard
          title="Tỷ lệ Đồng bộ Thành công"
          value={`${successRate}%`}
          change={failedCount > 0 ? `${failedCount} lỗi cần xử lý` : '100% Khả dụng'}
          changeType={failedCount > 0 ? 'negative' : 'positive'}
          icon={ShieldCheck}
          description="Shopee + TikTok + Lazada"
        />
        <StatCard
          title="Số bản tin Lỗi (Failed Queue)"
          value={failedCount}
          change={failedCount > 0 ? 'Có sẵn nút Retry' : '0 Lỗi'}
          changeType={failedCount > 0 ? 'negative' : 'positive'}
          icon={AlertTriangle}
          description="Lỗi Rate Limit / Timeout API"
        />
        <StatCard
          title="Thời gian Phản hồi API TB"
          value="135 ms"
          change="Tối ưu"
          changeType="positive"
          icon={Zap}
          description="API sỉ đa sàn TMĐT"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="liquid-glass-panel p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo Mã bản tin (OBX-...), SKU, tên sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white/80"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Trạng thái:</span>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="SUCCESS">Thành công (SUCCESS)</option>
              <option value="FAILED">Thất bại (FAILED)</option>
            </select>

            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất cả sàn TMĐT</option>
              <option value="shopee">Shopee Mall</option>
              <option value="tiktok">TikTok Shop</option>
              <option value="lazada">Lazada Flagship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Outbox Logs List & Details (SCR-42) */}
      <div className="space-y-4">
        {filteredLogs.map((log) => {
          const isFailed = log.outboxStatus === 'FAILED'
          return (
            <div key={log.id} className="outbox-log-card">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-900 text-indigo-300 border border-slate-700">
                    {log.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`channel-status-badge ${
                        isFailed ? 'failed' : 'success'
                      }`}
                    >
                      {isFailed ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                      {log.outboxStatus}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {log.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    Redis Lock:
                  </span>
                  <span className="font-mono text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                    {log.redisLockKey} ({log.lockStatus})
                  </span>
                  <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    RowVersion v{log.optimisticVersion}
                  </span>
                </div>
              </div>

              {/* Log Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-3.5">
                <div className="lg:col-span-2 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                      {log.sku}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{log.productName}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Lý do:</strong> {log.reason} &bull; Tồn thay đổi:{' '}
                    <span className="font-bold">{log.oldQty}</span> &rarr;{' '}
                    <span className="font-bold text-indigo-600">{log.newQty}</span> (Delta:{' '}
                    <strong className={log.delta >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {log.delta >= 0 ? `+${log.delta}` : log.delta}
                    </strong>
                    )
                  </p>
                  {log.details && (
                    <p className="text-[11px] text-slate-500 italic">{log.details}</p>
                  )}
                  {isFailed && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800 flex items-center justify-between gap-2 mt-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{log.failureReason}</span>
                      </div>
                      <button
                        onClick={() => handleRetrySync(log.id)}
                        className="px-3 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] hover:bg-rose-500 transition-all shrink-0 cursor-pointer shadow-sm"
                      >
                        Thử lại Sync ngay
                      </button>
                    </div>
                  )}
                </div>

                {/* Platform Sync Status Pills */}
                <div className="space-y-2 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-4 pt-3 lg:pt-0">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Kết quả Sync Sàn TMĐT</span>
                    <button
                      onClick={() => setActiveJsonPayloadLog(log)}
                      className="flex items-center gap-1 text-[11px] text-indigo-600 hover:underline cursor-pointer"
                    >
                      <Code className="w-3 h-3" /> JSON Payload
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {log.channelsSync.map((ch, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-200/80"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">{ch.channel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {ch.responseTime}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ch.status === 'SUCCESS'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {ch.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* JSON Payload Modal */}
      {activeJsonPayloadLog && (
        <GlassModal
          isOpen={!!activeJsonPayloadLog}
          onClose={() => setActiveJsonPayloadLog(null)}
          title={`Outbox JSON Payload — ${activeJsonPayloadLog.id}`}
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              Payload tin nhắn Outbox ghi nhận trong CSDL trước khi đẩy qua Message Broker & Sàn API:
            </p>
            <pre className="json-payload-preview">
              {JSON.stringify(
                {
                  outboxMessageId: activeJsonPayloadLog.id,
                  timestamp: activeJsonPayloadLog.timestamp,
                  sku: activeJsonPayloadLog.sku,
                  event: activeJsonPayloadLog.eventType,
                  payload: {
                    newActualQuantity: activeJsonPayloadLog.newQty,
                    delta: activeJsonPayloadLog.delta,
                    optimisticRowVersion: activeJsonPayloadLog.optimisticVersion,
                    redisLock: activeJsonPayloadLog.redisLockKey,
                  },
                  channels: activeJsonPayloadLog.channelsSync,
                },
                null,
                2
              )}
            </pre>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveJsonPayloadLog(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </GlassModal>
      )}
    </div>
  )
}
