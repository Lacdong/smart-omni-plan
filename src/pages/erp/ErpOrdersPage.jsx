import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  RefreshCw,
  Printer,
  RotateCcw,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Package,
  Truck,
  Layers,
  ArrowRight,
  Clock
} from 'lucide-react';
import { ERP_ORDERS_DATA } from '../../data/mockErpData';
import { ShippingLabelPdfModal } from '../../components/erp/ShippingLabelPdfModal';
import { ReturnProcessModal } from '../../components/erp/ReturnProcessModal';
import './ErpOrdersPage.css';

export function ErpOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(ERP_ORDERS_DATA);
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [activePdfModalOrder, setActivePdfModalOrder] = useState(null);
  const [activeReturnModalOrder, setActiveReturnModalOrder] = useState(null);

  // Retry Sync Simulation Handler (Edge case test for ORD-SYNC-ERR-01)
  const handleRetrySync = (orderId, e) => {
    e.stopPropagation();
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.orderId === orderId) {
          const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          return {
            ...order,
            status: 'PROCESSING',
            statusBadge: 'Chờ Đóng Gói',
            statusColor: 'amber',
            hasSyncError: false,
            syncErrorMessage: null,
            outboxSyncLog: [
              ...(order.outboxSyncLog || []),
              {
                timestamp: nowStr,
                event: 'OUTBOX_RETRY_SUCCESS',
                details: 'Kích hoạt lại Hangfire Job thành công. Webhook payload đã được đối chiếu & xử lý!',
                status: 'SUCCESS'
              }
            ]
          };
        }
        return order;
      })
    );

    showToast(`Đã khôi phục & đồng bộ thành công đơn hàng ${orderId}!`);
  };

  // Toast Notification Trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filter Orders
  const filteredOrders = orders.filter(order => {
    const matchesChannel = selectedChannel === 'all' || order.channel === selectedChannel;
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    return matchesChannel && matchesStatus && matchesSearch;
  });

  // Calculate Stat Summaries
  const totalOrders = orders.length;
  const pendingPack = orders.filter(o => o.status === 'PROCESSING').length;
  const returnRequests = orders.filter(o => o.status === 'RETURN_REQUESTED').length;
  const syncErrors = orders.filter(o => o.hasSyncError).length;

  return (
    <div className="erp-orders-container">
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
          fontSize: '14px',
          animation: 'fadeInDown 0.3s ease'
        }}>
          <CheckCircle2 style={{ color: '#10B981', width: '20px', height: '20px' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Quản Lý Đơn Hàng Đa Kênh (SCR-30)
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0 0' }}>
            Tiếp nhận, xử lý đơn hàng gộp tự động từ Shopee, TikTok Shop & Lazada qua Outbox Pattern.
          </p>
        </div>
      </div>

      {/* KPI Stats Summary Grid */}
      <div className="erp-stats-grid">
        <div className="erp-stat-card">
          <div className="erp-stat-title">TỔNG ĐƠN HÀNG</div>
          <div className="erp-stat-val" style={{ color: '#0F172A' }}>{totalOrders}</div>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Cập nhật theo thời gian thực</div>
        </div>

        <div className="erp-stat-card">
          <div className="erp-stat-title">CHỜ ĐÓNG GÓI</div>
          <div className="erp-stat-val" style={{ color: '#D97706' }}>{pendingPack}</div>
          <div style={{ fontSize: '11px', color: '#D97706', marginTop: '4px', fontWeight: 600 }}>Cần in mã vận đơn</div>
        </div>

        <div className="erp-stat-card">
          <div className="erp-stat-title">CẦN XỬ LÝ HỦY / HOÀN</div>
          <div className="erp-stat-val" style={{ color: '#E11D48' }}>{returnRequests}</div>
          <div style={{ fontSize: '11px', color: '#E11D48', marginTop: '4px', fontWeight: 600 }}>Chờ duyệt nhập lại kho</div>
        </div>

        <div className="erp-stat-card" style={{ borderColor: syncErrors > 0 ? '#FCA5A5' : 'rgba(255,255,255,0.95)' }}>
          <div className="erp-stat-title" style={{ color: syncErrors > 0 ? '#DC2626' : '#64748B' }}>LỖI SYNC WEBHOOK</div>
          <div className="erp-stat-val" style={{ color: syncErrors > 0 ? '#DC2626' : '#10B981' }}>{syncErrors}</div>
          <div style={{ fontSize: '11px', color: syncErrors > 0 ? '#DC2626' : '#10B981', marginTop: '4px', fontWeight: 600 }}>
            {syncErrors > 0 ? 'Cần Thử lại Sync thủ công' : 'Đồng bộ 100% hoàn hảo'}
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="erp-filters-bar">
        {/* Channel Chips */}
        <div className="channel-filter-chips">
          <button
            className={`channel-chip-btn ${selectedChannel === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedChannel('all')}
          >
            Tất cả Sàn
          </button>
          <button
            className={`channel-chip-btn ${selectedChannel === 'shopee' ? 'active' : ''}`}
            onClick={() => setSelectedChannel('shopee')}
          >
            Shopee Mall
          </button>
          <button
            className={`channel-chip-btn ${selectedChannel === 'tiktok' ? 'active' : ''}`}
            onClick={() => setSelectedChannel('tiktok')}
          >
            TikTok Shop
          </button>
          <button
            className={`channel-chip-btn ${selectedChannel === 'lazada' ? 'active' : ''}`}
            onClick={() => setSelectedChannel('lazada')}
          >
            Lazada Flagship
          </button>
        </div>

        {/* Status Dropdown & Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              fontWeight: 600,
              color: '#0F172A',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">Tất cả Trạng Thái</option>
            <option value="PROCESSING">Chờ Đóng Gói</option>
            <option value="PACKED">Đã Đóng Gói</option>
            <option value="SHIPPED">Đang Giao Hàng</option>
            <option value="RETURN_REQUESTED">Yêu Cầu Hủy / Hoàn</option>
            <option value="SYNC_ERROR">Lỗi Sync Webhook</option>
          </select>

          <div style={{ position: 'relative', width: '260px' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Tìm theo Mã đơn, Tên, SDT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                color: '#0F172A',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      {/* Orders Directory Table */}
      <div className="erp-orders-table-card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'rgba(241, 245, 249, 0.7)', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
              <th style={{ padding: '16px 20px' }}>Mã Đơn & Sàn</th>
              <th style={{ padding: '16px 20px' }}>Khách Hàng</th>
              <th style={{ padding: '16px 20px' }}>Sản Phẩm SKU</th>
              <th style={{ padding: '16px 20px' }}>Giá Trị Đơn</th>
              <th style={{ padding: '16px 20px' }}>Trạng Thái & Webhook</th>
              <th style={{ padding: '16px 20px', textAlign: 'right' }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94A3B8', fontWeight: 600 }}>
                  Không tìm thấy đơn hàng phù hợp.
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => {
                let badgeBg = '#FEF3C7';
                let badgeColor = '#D97706';
                if (order.status === 'PACKED') { badgeBg = '#E0E7FF'; badgeColor = '#4338CA'; }
                if (order.status === 'SHIPPED') { badgeBg = '#DBEAFE'; badgeColor = '#1D4ED8'; }
                if (order.status === 'RETURN_REQUESTED') { badgeBg = '#FFE4E6'; badgeColor = '#E11D48'; }
                if (order.status === 'SYNC_ERROR') { badgeBg = '#FEF2F2'; badgeColor = '#DC2626'; }

                return (
                  <tr
                    key={order.orderId}
                    className="erp-order-row"
                    onClick={() => navigate(`/admin/orders/${order.orderId}`)}
                    style={{ borderBottom: '1px solid #F1F5F9', background: order.hasSyncError ? 'rgba(254, 242, 242, 0.4)' : 'transparent' }}
                  >
                    {/* Order ID & Channel */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '14px', fontFamily: 'monospace' }}>
                        {order.orderId}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: order.channel === 'shopee' ? '#FFF7ED' : order.channel === 'tiktok' ? '#F8FAFC' : '#EFF6FF',
                          color: order.channel === 'shopee' ? '#EE4D2D' : order.channel === 'tiktok' ? '#0F172A' : '#0060FF',
                          border: `1px solid ${order.channel === 'shopee' ? '#FFD8D0' : order.channel === 'tiktok' ? '#E2E8F0' : '#BFDBFE'}`
                        }}>
                          {order.channelName}
                        </span>
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{order.customerName}</div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{order.customerPhone}</div>
                    </td>

                    {/* SKU Items preview */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {order.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, background: '#F1F5F9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
                              {item.sku}
                            </span>
                            <span style={{ fontSize: '12px', color: '#334155', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                              x{item.quantity} {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 900, color: '#0F172A', fontSize: '15px' }}>
                        {order.formattedTotal}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                        {order.paymentMethod}
                      </div>
                    </td>

                    {/* Status & Sync Warning */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          background: badgeBg,
                          color: badgeColor,
                          fontSize: '12px',
                          fontWeight: 800
                        }}>
                          {order.statusBadge}
                        </span>

                        {/* Edge Case Warning: ORD-SYNC-ERR-01 Webhook retry trigger */}
                        {order.hasSyncError && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                            <span className="sync-error-badge">
                              <AlertTriangle style={{ width: '12px', height: '12px' }} />
                              Lỗi Webhook
                            </span>
                            <button
                              className="btn-retry-sync"
                              onClick={(e) => handleRetrySync(order.orderId, e)}
                              title="Kích hoạt lại Job Hangfire Outbox Sync"
                            >
                              <RefreshCw style={{ width: '12px', height: '12px' }} />
                              Thử lại Sync
                            </button>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td style={{ padding: '16px 20px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        {/* Detail Trigger (SCR-31) */}
                        <button
                          onClick={() => navigate(`/admin/orders/${order.orderId}`)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: '#F1F5F9',
                            border: '1px solid #CBD5E1',
                            color: '#0F172A',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Eye style={{ width: '14px', height: '14px' }} />
                          Chi tiết
                        </button>

                        {/* Thermal PDF Modal Trigger (SCR-32) */}
                        <button
                          onClick={() => setActivePdfModalOrder(order)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: '#0F172A',
                            border: 'none',
                            color: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Printer style={{ width: '14px', height: '14px' }} />
                          In tem PDF
                        </button>

                        {/* Return/Cancellation Trigger (SCR-33) */}
                        {order.status === 'RETURN_REQUESTED' && (
                          <button
                            onClick={() => setActiveReturnModalOrder(order)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              background: '#E11D48',
                              border: 'none',
                              color: '#FFFFFF',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <RotateCcw style={{ width: '14px', height: '14px' }} />
                            Xử lý Hoàn
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* SCR-32: Thermal PDF Shipping Label Modal */}
      {activePdfModalOrder && (
        <ShippingLabelPdfModal
          isOpen={true}
          order={activePdfModalOrder}
          onClose={() => setActivePdfModalOrder(null)}
        />
      )}

      {/* SCR-33: Return / Cancellation Process Modal */}
      {activeReturnModalOrder && (
        <ReturnProcessModal
          isOpen={true}
          order={activeReturnModalOrder}
          onClose={() => setActiveReturnModalOrder(null)}
          onConfirmReturn={(orderId, autoRestock) => {
            setOrders(prev => prev.map(o => {
              if (o.orderId === orderId) {
                return {
                  ...o,
                  status: 'RETURNED',
                  statusBadge: 'Đã Hoàn / Nhập Kho',
                  statusColor: 'emerald',
                  outboxSyncLog: [
                    ...(o.outboxSyncLog || []),
                    {
                      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                      event: 'RETURN_COMPLETED',
                      details: `Đã duyệt hoàn tiền & ${autoRestock ? 'tự động +1 Qty vào kho nội bộ' : 'không cộng kho'}`,
                      status: 'SUCCESS'
                    }
                  ]
                };
              }
              return o;
            }));
            setActiveReturnModalOrder(null);
            showToast(`Đã xử lý hoàn tiền & cộng tồn kho cho đơn ${orderId}!`);
          }}
        />
      )}
    </div>
  );
}

export default ErpOrdersPage;
