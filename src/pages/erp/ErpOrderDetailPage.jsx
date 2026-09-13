import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  RotateCcw,
  RefreshCw,
  Truck,
  User,
  MapPin,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Package,
  Layers
} from 'lucide-react';
import { ERP_ORDERS_DATA } from '../../data/mockErpData';
import { ShippingLabelPdfModal } from '../../components/erp/ShippingLabelPdfModal';
import { ReturnProcessModal } from '../../components/erp/ReturnProcessModal';
import './ErpOrderDetailPage.css';

export function ErpOrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Find order in mock dataset or fallback to first
  const initialOrder = ERP_ORDERS_DATA.find(o => o.orderId === orderId) || ERP_ORDERS_DATA[0];
  const [order, setOrder] = useState(initialOrder);

  // Modals state
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Retry Sync Handler
  const handleRetrySync = () => {
    const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setOrder(prev => ({
      ...prev,
      status: 'PROCESSING',
      statusBadge: 'Chờ Đóng Gói',
      statusColor: 'amber',
      hasSyncError: false,
      syncErrorMessage: null,
      outboxSyncLog: [
        ...(prev.outboxSyncLog || []),
        {
          timestamp: nowStr,
          event: 'OUTBOX_RETRY_SUCCESS',
          details: 'Kích hoạt lại Hangfire Job thành công. Webhook payload đã được đối chiếu & xử lý!',
          status: 'SUCCESS'
        }
      ]
    }));
    showToast(`Đã kích hoạt lại sync cho đơn hàng ${order.orderId}!`);
  };

  // Calculate items subtotal
  const itemsSubtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="erp-detail-container">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 600,
          fontSize: '14px'
        }}>
          <CheckCircle2 style={{ color: '#10B981', width: '20px', height: '20px' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => navigate('/admin/orders')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.8)',
            border: '1px solid #CBD5E1',
            color: '#0F172A',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          Quay lại danh sách đơn hàng
        </button>
      </div>

      {/* Header Info Card */}
      <div className="erp-detail-header-card">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', margin: 0, fontFamily: 'monospace' }}>
              {order.orderId}
            </h1>
            <span style={{
              fontSize: '12px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '8px',
              background: order.channel === 'shopee' ? '#FFF7ED' : order.channel === 'tiktok' ? '#F8FAFC' : '#EFF6FF',
              color: order.channel === 'shopee' ? '#EE4D2D' : order.channel === 'tiktok' ? '#0F172A' : '#0060FF',
              border: `1px solid ${order.channel === 'shopee' ? '#FFD8D0' : order.channel === 'tiktok' ? '#E2E8F0' : '#BFDBFE'}`
            }}>
              {order.channelName}
            </span>
            <span style={{
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 800,
              background: order.status === 'RETURN_REQUESTED' ? '#FFE4E6' : order.status === 'SYNC_ERROR' ? '#FEF2F2' : '#FEF3C7',
              color: order.status === 'RETURN_REQUESTED' ? '#E11D48' : order.status === 'SYNC_ERROR' ? '#DC2626' : '#D97706'
            }}>
              {order.statusBadge}
            </span>
          </div>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span><Clock style={{ width: '14px', height: '14px', display: 'inline', marginRight: '4px' }} /> Ngày tạo: {order.orderDate}</span>
            <span>Mã vận đơn: <strong>{order.trackingNumber}</strong></span>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {order.hasSyncError && (
            <button
              onClick={handleRetrySync}
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                background: '#DC2626',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RefreshCw style={{ width: '16px', height: '16px' }} />
              Thử lại Sync Webhook
            </button>
          )}

          <button
            onClick={() => setShowPdfModal(true)}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              background: '#0F172A',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Printer style={{ width: '16px', height: '16px' }} />
            In Tem Vận Đơn PDF (SCR-32)
          </button>

          {order.status === 'RETURN_REQUESTED' && (
            <button
              onClick={() => setShowReturnModal(true)}
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                background: '#E11D48',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RotateCcw style={{ width: '16px', height: '16px' }} />
              Xử lý Hủy / Hoàn (SCR-33)
            </button>
          )}
        </div>
      </div>

      {/* Main Detail Grid Layout */}
      <div className="erp-detail-grid">
        {/* Left Column: SKU Items Table & Outbox Sync Audit */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* SKU Items Table */}
          <div className="erp-card-glass">
            <div className="erp-card-title">
              <Package style={{ width: '18px', height: '18px', color: '#3B82F6' }} />
              Danh Sách Sản Phẩm Mua (SKU)
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '11px', textTransform: 'uppercase', textAlign: 'left' }}>
                  <th style={{ paddingBottom: '12px' }}>Sản phẩm</th>
                  <th style={{ paddingBottom: '12px' }}>Mã SKU</th>
                  <th style={{ paddingBottom: '12px', textAlign: 'right' }}>Đơn giá</th>
                  <th style={{ paddingBottom: '12px', textAlign: 'center' }}>Số lượng</th>
                  <th style={{ paddingBottom: '12px', textAlign: 'right' }}>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                        />
                        <span style={{ fontWeight: 700, color: '#0F172A', maxWidth: '240px' }}>{item.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 0' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, background: '#F1F5F9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontFamily: 'monospace' }}>
                        {item.sku}
                      </span>
                    </td>
                    <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>
                      {item.price.toLocaleString('vi-VN')}đ
                    </td>
                    <td style={{ padding: '12px 0', textAlign: 'center', fontWeight: 800 }}>
                      x{item.quantity}
                    </td>
                    <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 800, color: '#0F172A' }}>
                      {item.total.toLocaleString('vi-VN')}đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Financial Summary Breakdown */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px dashed #CBD5E1', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '240px', color: '#64748B' }}>
                <span>Tiền hàng:</span>
                <span>{itemsSubtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '240px', color: '#64748B' }}>
                <span>Phí vận chuyển:</span>
                <span>+{order.shippingFee.toLocaleString('vi-VN')}đ</span>
              </div>
              {order.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '240px', color: '#10B981' }}>
                  <span>Voucher giảm giá:</span>
                  <span>-{order.discountAmount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '240px', fontWeight: 900, fontSize: '16px', color: '#0F172A', marginTop: '6px' }}>
                <span>Tổng thanh toán:</span>
                <span style={{ color: '#059669' }}>{order.formattedTotal}</span>
              </div>
            </div>
          </div>

          {/* Outbox Pattern & Webhook Sync Log Audit */}
          <div className="erp-card-glass">
            <div className="erp-card-title">
              <Layers style={{ width: '18px', height: '18px', color: '#8B5CF6' }} />
              Nhật Ký Đồng Bộ Outbox Pattern & Webhook Event Log
            </div>

            <div className="outbox-timeline">
              {order.outboxSyncLog.map((log, index) => {
                let dotClass = 'success';
                if (log.status === 'FAILED') dotClass = 'failed';
                if (log.status === 'WARNING') dotClass = 'warning';

                return (
                  <div key={index} className="outbox-timeline-item">
                    <div className={`outbox-timeline-dot ${dotClass}`} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', fontFamily: 'monospace' }}>
                        [{log.timestamp}] {log.event}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: log.status === 'SUCCESS' ? '#ECFDF5' : log.status === 'FAILED' ? '#FEF2F2' : '#FFFBEB',
                        color: log.status === 'SUCCESS' ? '#059669' : log.status === 'FAILED' ? '#DC2626' : '#D97706'
                      }}>
                        {log.status}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 0 0' }}>
                      {log.details}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Customer Info & Carrier Shipping Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Customer & Recipient Card */}
          <div className="erp-card-glass">
            <div className="erp-card-title">
              <User style={{ width: '18px', height: '18px', color: '#10B981' }} />
              Thông Tin Người Nhận
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Tên người nhận</div>
                <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '14px', marginTop: '2px' }}>{order.customerName}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Số điện thoại</div>
                <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{order.customerPhone}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Địa chỉ giao hàng</div>
                <div style={{ color: '#334155', marginTop: '2px', lineHeight: '1.4' }}>{order.customerAddress}</div>
              </div>

              <div style={{ paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Phương thức thanh toán</div>
                <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CreditCard style={{ width: '14px', height: '14px', color: '#6366F1' }} />
                  {order.paymentMethod}
                </div>
              </div>
            </div>
          </div>

          {/* Logistics & Shipping Carrier Card */}
          <div className="erp-card-glass">
            <div className="erp-card-title">
              <Truck style={{ width: '18px', height: '18px', color: '#F59E0B' }} />
              Vận Chuyển & Đơn Vị Vận Chuyển
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Đơn vị vận chuyển</div>
                <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{order.carrier}</div>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Mã vận đơn (Tracking No)</div>
                <div style={{ fontWeight: 800, color: '#2563EB', marginTop: '2px', fontFamily: 'monospace', fontSize: '14px' }}>
                  {order.trackingNumber}
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0', marginTop: '4px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>Trạng thái in tem vận đơn:</div>
                <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 style={{ width: '14px', height: '14px' }} />
                  Sẵn sàng in tem chuẩn thermal PDF 100x150mm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCR-32: Thermal Shipping Label Modal */}
      {showPdfModal && (
        <ShippingLabelPdfModal
          isOpen={true}
          order={order}
          onClose={() => setShowPdfModal(false)}
        />
      )}

      {/* SCR-33: Return / Cancellation Process Modal */}
      {showReturnModal && (
        <ReturnProcessModal
          isOpen={true}
          order={order}
          onClose={() => setShowReturnModal(false)}
          onConfirmReturn={(orderId, autoRestock) => {
            setOrder(prev => ({
              ...prev,
              status: 'RETURNED',
              statusBadge: 'Đã Hoàn / Nhập Kho',
              statusColor: 'emerald',
              outboxSyncLog: [
                ...(prev.outboxSyncLog || []),
                {
                  timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                  event: 'RETURN_COMPLETED',
                  details: `Đã duyệt hoàn tiền & ${autoRestock ? 'tự động +1 Qty vào kho nội bộ' : 'không cộng kho'}`,
                  status: 'SUCCESS'
                }
              ]
            }));
            setShowReturnModal(false);
            showToast(`Đã xử lý hoàn tiền & cộng tồn kho cho đơn ${orderId}!`);
          }}
        />
      )}
    </div>
  );
}

export default ErpOrderDetailPage;
