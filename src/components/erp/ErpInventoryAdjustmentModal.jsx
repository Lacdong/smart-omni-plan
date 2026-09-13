import React, { useState, useEffect } from 'react'
import {
  Package,
  Layers,
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Send,
  Zap,
  ArrowRight,
  ShieldCheck,
  Server
} from 'lucide-react'
import { GlassModal } from '@/components/ui/GlassModal'
import './ErpInventoryAdjustmentModal.css'

export function ErpInventoryAdjustmentModal({ isOpen, onClose, skuData, onSaveSuccess }) {
  const [newActualQty, setNewActualQty] = useState(0)
  const [reason, setReason] = useState('RESTOCK')
  const [note, setNote] = useState('')
  const [simulateConflict, setSimulateConflict] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [stepState, setStepState] = useState(null) // null | 'REDIS_LOCK' | 'OPTIMISTIC_CHECK' | 'OUTBOX_WRITE' | 'OUTBOX_PUB' | 'DONE' | 'CONFLICT_ERROR'
  const [conflictResolved, setConflictResolved] = useState(false)

  useEffect(() => {
    if (skuData) {
      setNewActualQty(skuData.actualStock)
      setReason('RESTOCK')
      setNote('')
      setSimulateConflict(false)
      setIsProcessing(false)
      setStepState(null)
      setConflictResolved(false)
    }
  }, [skuData])

  if (!skuData) return null

  const delta = newActualQty - skuData.actualStock
  const newAvailableQty = Math.max(0, newActualQty - skuData.reservedStock)

  const handleConfirmSave = async () => {
    setIsProcessing(true)
    setConflictResolved(false)

    // Step 1: Redis Lock Acquisition
    setStepState('REDIS_LOCK')
    await new Promise((r) => setTimeout(r, 600))

    if (simulateConflict && !conflictResolved) {
      // Edge Case: Concurrency Conflict detected
      setStepState('CONFLICT_ERROR')
      await new Promise((r) => setTimeout(r, 1200))
      // Auto-retry via Redis Lock contention resolution
      setConflictResolved(true)
      setStepState('REDIS_LOCK')
      await new Promise((r) => setTimeout(r, 600))
    }

    // Step 2: Optimistic Concurrency check
    setStepState('OPTIMISTIC_CHECK')
    await new Promise((r) => setTimeout(r, 600))

    // Step 3: Outbox Table Record Write
    setStepState('OUTBOX_WRITE')
    await new Promise((r) => setTimeout(r, 600))

    // Step 4: Outbox Publisher Execution
    setStepState('OUTBOX_PUB')
    await new Promise((r) => setTimeout(r, 700))

    setStepState('DONE')

    const newRowVersion = skuData.rowVersion + 1
    const reasonLabels = {
      RESTOCK: 'Nhập hàng',
      INVENTORY: 'Kiểm kê kho',
      SHRINKAGE: 'Hao hụt / Hỏng hóc',
    }

    const updatedSku = {
      ...skuData,
      actualStock: Number(newActualQty),
      availableStock: newAvailableQty,
      rowVersion: newRowVersion,
      lastAdjusted: new Date().toISOString().replace('T', ' ').substring(0, 19),
      channels: skuData.channels.map((ch) => ({
        ...ch,
        stockOnChannel: newAvailableQty,
        status: 'SYNCED',
      })),
    }

    const newLogId = `OBX-${Math.floor(1000 + Math.random() * 9000)}`
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19)

    const newOutboxLog = {
      id: newLogId,
      timestamp: nowStr,
      sku: skuData.sku,
      productName: skuData.name,
      eventType: 'STOCK_ADJUSTMENT',
      reason: reasonLabels[reason] || reason,
      reasonCode: reason,
      oldQty: skuData.actualStock,
      newQty: Number(newActualQty),
      delta: delta,
      optimisticVersion: newRowVersion,
      redisLockKey: `lock:inventory:${skuData.sku}`,
      lockStatus: 'RELEASED',
      outboxStatus: 'SUCCESS',
      details: note || `Điều chỉnh kho (${reasonLabels[reason]}): ${delta >= 0 ? '+' : ''}${delta} sản phẩm.`,
      channelsSync: [
        { channel: 'Shopee Mall VN', status: 'SUCCESS', responseTime: '115ms', syncTime: nowStr, apiEndpoint: 'POST /api/v2/inventory/update_stock' },
        { channel: 'TikTok Shop Live', status: 'SUCCESS', responseTime: '170ms', syncTime: nowStr, apiEndpoint: 'POST /api/v1/products/stock/sync' },
        { channel: 'Lazada Flagship', status: 'SUCCESS', responseTime: '135ms', syncTime: nowStr, apiEndpoint: 'POST /rest/seller/inventory/set' },
      ],
    }

    setTimeout(() => {
      onSaveSuccess?.(updatedSku, newOutboxLog)
    }, 400)
  }

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={isProcessing ? undefined : onClose}
      title="Cập nhật Tồn kho SKU — SCR-41"
      className="max-w-2xl"
    >
      <div className="space-y-5">
        {/* SKU Header Brief */}
        <div className="flex items-start gap-3.5 p-3.5 bg-slate-900/5 rounded-2xl border border-slate-200/80">
          <img
            src={skuData.image}
            alt={skuData.name}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0 shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md">
                {skuData.sku}
              </span>
              <span className="concurrency-badge">
                <ShieldCheck className="w-3 h-3" /> v{skuData.rowVersion}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 truncate mt-1">{skuData.name}</h4>
            <p className="text-xs text-slate-500 truncate">{skuData.location}</p>
          </div>
        </div>

        {/* Current Stock Metrics vs New Stock Preview */}
        <div className="grid grid-cols-3 gap-3">
          <div className="stock-pill bg-slate-50">
            <span className="stock-pill-val">{skuData.actualStock}</span>
            <span className="stock-pill-lbl">Tồn thực tế cũ</span>
          </div>
          <div className="stock-pill bg-slate-50">
            <span className="stock-pill-val text-amber-600">{skuData.reservedStock}</span>
            <span className="stock-pill-lbl">Tồn đang giữ chỗ</span>
          </div>
          <div className="stock-pill bg-indigo-50 border-indigo-200">
            <span className="stock-pill-val text-indigo-700">{skuData.availableStock}</span>
            <span className="stock-pill-lbl text-indigo-600">Tồn khả dụng cũ</span>
          </div>
        </div>

        {/* Form Inputs (Disabled during processing) */}
        {!isProcessing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Số lượng tồn thực tế mới
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    value={newActualQty}
                    onChange={(e) => setNewActualQty(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="absolute right-3 top-2.5 text-xs font-semibold text-slate-400">
                    Sản phẩm
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Chênh lệch (Delta):{' '}
                  <span className={delta > 0 ? 'text-emerald-600 font-bold' : delta < 0 ? 'text-rose-600 font-bold' : 'text-slate-600 font-bold'}>
                    {delta > 0 ? `+${delta}` : delta}
                  </span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Lý do điều chỉnh
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="RESTOCK">Nhập hàng mới (Restock)</option>
                  <option value="INVENTORY">Kiểm kê định kỳ (Inventory Audit)</option>
                  <option value="SHRINKAGE">Hao hụt / Hỏng hóc (Shrinkage)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Tồn khả dụng mới dự kiến:{' '}
                  <strong className="text-indigo-600">{newAvailableQty}</strong>
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Ghi chú điều chỉnh / Chứng từ kiểm kê
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nhập ghi chú hoặc mã phiếu kiểm kê kho..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Edge Case Simulation Toggle */}
            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-amber-900">
                    Mô phỏng tranh chấp Redis Lock & Optimistic Concurrency
                  </div>
                  <div className="text-[11px] text-amber-700">
                    Giả lập trường hợp có sàn khác đang cập nhật cùng mã SKU này.
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={simulateConflict}
                onChange={(e) => setSimulateConflict(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded border-amber-300 focus:ring-amber-500 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Real-time Sync Simulation Steps Indicator */}
        {isProcessing && (
          <div className="space-y-2.5 py-2">
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Xử lý Giao dịch Tồn kho & Đẩy Outbox (Processing Outbox)
            </h5>

            <div className={`sync-simulation-step ${stepState === 'REDIS_LOCK' ? 'active' : stepState === 'CONFLICT_ERROR' ? 'error' : 'completed'}`}>
              <Lock className="w-4 h-4 text-slate-600" />
              <div className="flex-1 text-xs">
                <span className="font-bold">1. Redis Lock Acquisition: </span>
                <span className="font-mono text-[11px]">lock:inventory:{skuData.sku}</span>
              </div>
              {stepState === 'REDIS_LOCK' && <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />}
              {stepState === 'CONFLICT_ERROR' && <span className="text-[11px] font-bold text-rose-600">Lock Conflict! Retrying...</span>}
              {stepState !== 'REDIS_LOCK' && stepState !== 'CONFLICT_ERROR' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>

            <div className={`sync-simulation-step ${stepState === 'OPTIMISTIC_CHECK' ? 'active' : stepState === 'OUTBOX_WRITE' || stepState === 'OUTBOX_PUB' || stepState === 'DONE' ? 'completed' : ''}`}>
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              <div className="flex-1 text-xs">
                <span className="font-bold">2. Optimistic Concurrency Check: </span>
                <span>Verifying Row Version v{skuData.rowVersion} &rarr; v{skuData.rowVersion + 1}</span>
              </div>
              {stepState === 'OPTIMISTIC_CHECK' && <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />}
              {(stepState === 'OUTBOX_WRITE' || stepState === 'OUTBOX_PUB' || stepState === 'DONE') && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>

            <div className={`sync-simulation-step ${stepState === 'OUTBOX_WRITE' ? 'active' : stepState === 'OUTBOX_PUB' || stepState === 'DONE' ? 'completed' : ''}`}>
              <Server className="w-4 h-4 text-slate-600" />
              <div className="flex-1 text-xs">
                <span className="font-bold">3. Ghi bản tin Outbox: </span>
                <span>Ghi 1 record vào bảng Outbox trong cùng DB Transaction</span>
              </div>
              {stepState === 'OUTBOX_WRITE' && <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />}
              {(stepState === 'OUTBOX_PUB' || stepState === 'DONE') && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>

            <div className={`sync-simulation-step ${stepState === 'OUTBOX_PUB' ? 'active' : stepState === 'DONE' ? 'completed' : ''}`}>
              <Send className="w-4 h-4 text-slate-600" />
              <div className="flex-1 text-xs">
                <span className="font-bold">4. Outbox Publisher: </span>
                <span>Tự động đẩy tồn mới ({newAvailableQty}) lên Shopee & TikTok Shop</span>
              </div>
              {stepState === 'OUTBOX_PUB' && <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />}
              {stepState === 'DONE' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
          {!isProcessing ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all border border-indigo-400/40 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Xác nhận lưu (Process Outbox)
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
              <RefreshCw className="w-4 h-4 animate-spin" /> Đang cập nhật & đẩy số tồn lên sàn...
            </div>
          )}
        </div>
      </div>
    </GlassModal>
  )
}
