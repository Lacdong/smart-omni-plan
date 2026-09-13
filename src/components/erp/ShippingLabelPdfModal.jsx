import React, { useState } from 'react'
import { Printer, Check, Download, QrCode } from 'lucide-react'
import { GlassModal } from '@/components/ui/GlassModal'
import './ShippingLabelPdfModal.css'

export function ShippingLabelPdfModal({ isOpen, onClose, order }) {
  const [isPrinting, setIsPrinting] = useState(false)
  const [printSuccess, setPrintSuccess] = useState(false)

  if (!order) return null

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      setIsPrinting(false)
      setPrintSuccess(true)
      setTimeout(() => setPrintSuccess(false), 2500)
    }, 1200)
  }

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Màn Hình In Mã Vận Đơn PDF (SCR-32)"
    >
      <div className="flex flex-col gap-4">
        {/* PDF Label Thermal Preview Box */}
        <div className="shipping-label-pdf-preview">
          {/* Header */}
          <div className="pdf-label-header">
            <div className="pdf-carrier-logo flex items-center gap-1.5">
              <span>{order.channel === 'shopee' ? '🍊 Shopee Xpress' : order.channel === 'tiktok' ? '🎵 J&T Express' : '💙 LEX Express'}</span>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
              TEM IN NHIỆT 100x150MM
            </span>
          </div>

          {/* Barcode */}
          <div className="pdf-barcode-box">
            <div className="pdf-barcode-lines"></div>
            <div className="pdf-tracking-val">{order.trackingNumber || 'SPX998877112'}</div>
          </div>

          {/* Addresses */}
          <div className="pdf-addresses-grid">
            <div>
              <div className="pdf-address-title">Từ (Người Gửi):</div>
              <div className="font-bold">SmartOmni Store - Hxvf123</div>
              <div>SĐT: 0900 123 456</div>
              <div className="text-slate-500">Kho Trung Tâm Tân Bình, TP.HCM</div>
            </div>
            <div>
              <div className="pdf-address-title">Đến (Người Nhận):</div>
              <div className="font-bold">{order.customerName}</div>
              <div>SĐT: {order.customerPhone}</div>
              <div className="text-slate-500 line-clamp-2">{order.customerAddress}</div>
            </div>
          </div>

          {/* Items Summary */}
          <div className="pdf-items-summary">
            <div className="pdf-address-title mb-1">Nội dung hàng hóa (Mã SKU):</div>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs font-semibold py-0.5">
                <span>{item.sku} (x{item.quantity})</span>
                <span>{item.total.toLocaleString('vi-VN')}đ</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 text-xs font-extrabold text-slate-800">
            <span>Mã đơn: {order.orderId}</span>
            <span>Tổng thu COD: {order.paymentMethod.includes('COD') ? order.formattedTotal : '0đ (Đã CK)'}</span>
          </div>
        </div>

        {/* Print Feedback Status */}
        {printSuccess && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
            <Check size={16} />
            <span>Đã gửi lệnh in tem thành công tới máy in tem nhiệt (Thermal Printer USB/LAN)!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pdf-actions-row">
          <button
            type="button"
            className="btn-print-thermal"
            onClick={handlePrint}
            disabled={isPrinting}
          >
            <Printer size={16} />
            <span>{isPrinting ? 'Đang Kết Nối Máy In...' : 'In Tem Vận Đơn (Máy In Tem)'}</span>
          </button>
        </div>
      </div>
    </GlassModal>
  )
}
