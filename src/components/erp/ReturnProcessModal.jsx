import React, { useState } from 'react'
import { RotateCcw, Check, RefreshCw, AlertTriangle, PackagePlus } from 'lucide-react'
import { GlassModal } from '@/components/ui/GlassModal'
import './ReturnProcessModal.css'

export function ReturnProcessModal({ isOpen, onClose, order, onConfirmReturn }) {
  const [autoRestock, setAutoRestock] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)

  if (!order) return null

  const handleConfirm = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setSuccessMsg(true)
      setTimeout(() => {
        setSuccessMsg(false)
        onConfirmReturn && onConfirmReturn(order.orderId, autoRestock)
        onClose()
      }, 1500)
    }, 1000)
  }

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Xác Nhận Xử Lý Hoàn/Hủy Đơn Hàng (SCR-33)"
    >
      <div className="return-modal-content">
        {/* Order Brief */}
        <div className="return-order-summary">
          <div className="flex items-center justify-between font-bold text-sm mb-1">
            <span>Đơn hàng #{order.orderId}</span>
            <span>{order.formattedTotal}</span>
          </div>
          <div className="text-xs">Khách hàng: {order.customerName} ({order.customerPhone})</div>
        </div>

        {/* Reason Box */}
        <div className="return-reason-box">
          <div className="font-extrabold text-slate-800 text-xs mb-1 flex items-center gap-1.5">
            <AlertTriangle size={14} className="text-rose-600" />
            <span>Lý do khách hàng yêu cầu Hoàn/Hủy:</span>
          </div>
          <div className="text-slate-600 italic">
            "{order.returnReason || 'Khách hàng thay đổi nhu cầu mua sắm hoặc nhầm thông tin đặt hàng'}"
          </div>
        </div>

        {/* Auto Restock Checkbox Option */}
        <label className="restock-checkbox-option">
          <input
            type="checkbox"
            checked={autoRestock}
            onChange={(e) => setAutoRestock(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
          <div className="flex items-center gap-2">
            <PackagePlus size={18} />
            <span>Tự động cộng lại số lượng sản phẩm vào tồn kho nội bộ (+Qty)</span>
          </div>
        </label>

        {/* Success Feedback Banner */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
            <Check size={16} />
            <span>Đã xác nhận hoàn tiền & phát sự kiện cộng +1 sản phẩm vào tồn kho nội bộ!</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            className="btn-confirm-return"
            onClick={handleConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <RefreshCw className="animate-spin" size={16} />
            ) : (
              <>
                <RotateCcw size={16} />
                <span>Xác Nhận Nhận Lại Hàng & Cộng Tồn Kho</span>
              </>
            )}
          </button>
        </div>
      </div>
    </GlassModal>
  )
}
