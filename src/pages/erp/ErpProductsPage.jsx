import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Layers,
  Plus,
  Search,
  Filter,
  Link2,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Cloud,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { ErpMarketplaceMappingModal } from '@/components/erp/ErpMarketplaceMappingModal'
import { INITIAL_PRODUCTS } from '@/data/mockProductData'
import './ErpProductsPage.css'

export function ErpProductsPage() {
  const navigate = useNavigate()
  const [productList, setProductList] = useState(INITIAL_PRODUCTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMappingFilter, setSelectedMappingFilter] = useState('all')

  const [activeMappingProduct, setActiveMappingProduct] = useState(null)
  const [toastNotification, setToastNotification] = useState(null)

  const showToast = (msg) => {
    setToastNotification(msg)
    setTimeout(() => setToastNotification(null), 4000)
  }

  // Handle saved marketplace mapping
  const handleSaveMapping = (updatedProduct) => {
    setProductList((prev) =>
      prev.map((p) => (p.sku === updatedProduct.sku ? updatedProduct : p))
    )
    showToast(`Đã lưu liên kết sàn TMĐT thành công cho sản phẩm ${updatedProduct.sku}!`)
  }

  // Handle delete product
  const handleDeleteProduct = (sku) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm ${sku} khỏi danh mục nội bộ?`)) {
      setProductList((prev) => prev.filter((p) => p.sku !== sku))
      showToast(`Đã xóa sản phẩm ${sku}.`)
    }
  }

  // Filter products
  const filteredProducts = productList.filter((p) => {
    const matchesSearch =
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory
    let matchesMapping = true
    if (selectedMappingFilter === 'mapped') {
      matchesMapping = p.marketplaceMappings.length > 0
    } else if (selectedMappingFilter === 'unmapped') {
      matchesMapping = p.marketplaceMappings.length === 0
    }
    return matchesSearch && matchesCategory && matchesMapping
  })

  // KPI Calculations
  const totalProducts = productList.length
  const fullyMappedCount = productList.filter((p) => p.marketplaceMappings.length >= 3).length
  const unmappedCount = productList.filter((p) => p.marketplaceMappings.length === 0).length
  const mappedCount = productList.filter((p) => p.marketplaceMappings.length > 0).length

  return (
    <div className="products-page-container">
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-indigo-500/40 text-xs backdrop-blur-md">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-semibold">{toastNotification}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Quản lý Danh mục Sản phẩm Nội bộ & Mapping Sàn (SCR-50)"
        description="Tạo sản phẩm nội bộ, quản lý tài sản hình ảnh S3 cô lập theo tenant_id và map mã SKU với gian hàng TMĐT."
        actions={
          <button
            onClick={() => navigate('/admin/products/new')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all border border-indigo-400/40 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Thêm sản phẩm mới (SCR-51)
          </button>
        }
      />

      {/* KPI Stats Grid */}
      <div className="products-kpi-grid">
        <StatCard
          title="Tổng Sản phẩm Nội bộ"
          value={totalProducts}
          change="SmartOmni Catalog"
          changeType="positive"
          icon={Layers}
          description="Độc lập đa kênh"
        />
        <StatCard
          title="Đã Liên kết Sàn (Mapped)"
          value={mappedCount}
          change={`${Math.round((mappedCount / (totalProducts || 1)) * 100)}% danh mục`}
          changeType="positive"
          icon={Link2}
          description="Shopee + TikTok Shop"
        />
        <StatCard
          title="Chưa Gắn Link Sàn"
          value={unmappedCount}
          change={unmappedCount > 0 ? 'Cần gắn link' : 'Hoàn tất'}
          changeType={unmappedCount > 0 ? 'negative' : 'positive'}
          icon={AlertCircle}
          description="Chưa đẩy tồn tự động"
        />
        <StatCard
          title="Tenant S3 Asset Bucket"
          value="245 MB"
          change="s3://tenant-hxvf123"
          changeType="positive"
          icon={Cloud}
          description="Dung lượng đã dùng"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="liquid-glass-panel p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo mã SKU hoặc tên sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white/80"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Phân loại:</span>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="Thời trang Nam">Thời trang Nam</option>
              <option value="Phụ kiện">Phụ kiện</option>
              <option value="Điện tử & Công nghệ">Điện tử & Công nghệ</option>
              <option value="Phụ kiện Điện tử">Phụ kiện Điện tử</option>
            </select>

            <select
              value={selectedMappingFilter}
              onChange={(e) => setSelectedMappingFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Tất cả trạng thái link</option>
              <option value="mapped">Đã gắn link sàn</option>
              <option value="unmapped">Chưa gắn link sàn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Product Table (SCR-50) */}
      <div className="liquid-glass-panel p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Danh sách Sản phẩm & Mã SKU Nội bộ</h3>
            <p className="text-xs text-slate-500">
              Hiển thị thông tin sản phẩm, liên kết ảnh S3 và trạng thái mapping gian hàng TMĐT.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">
            Hiển thị {filteredProducts.length} / {productList.length} sản phẩm
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="liquid-glass-table">
            <thead>
              <tr>
                <th>Ảnh S3 & Sản phẩm</th>
                <th>Thuộc tính SP</th>
                <th className="text-right">Giá bán</th>
                <th>Trạng thái Mapping Sàn</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => {
                const isFullyMapped = p.marketplaceMappings.length >= 2
                const isUnmapped = p.marketplaceMappings.length === 0

                return (
                  <tr key={p.sku} className="hover:bg-slate-50/80 transition-colors">
                    <td>
                      <div className="flex items-start gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm"
                          />
                          <span className="s3-badge absolute -bottom-1 -right-1">S3</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-1.5 py-0.5 rounded">
                              {p.sku}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500">
                              {p.category}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-1 max-w-sm">
                            {p.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 truncate max-w-xs mt-0.5">
                            {p.s3Url}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="text-xs text-slate-700 space-y-0.5">
                        {p.attributes?.color && (
                          <div>
                            Màu: <strong>{p.attributes.color}</strong>
                          </div>
                        )}
                        {p.attributes?.size && (
                          <div>
                            Size: <strong>{p.attributes.size}</strong>
                          </div>
                        )}
                        {p.attributes?.material && (
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">
                            {p.attributes.material}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="text-right">
                      <div className="text-xs font-extrabold text-slate-900">
                        {p.price.toLocaleString('vi-VN')}đ
                      </div>
                      {p.compareAtPrice && (
                        <div className="text-[11px] text-slate-400 line-through">
                          {p.compareAtPrice.toLocaleString('vi-VN')}đ
                        </div>
                      )}
                    </td>

                    {/* Mapping Badges */}
                    <td>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`mapping-status-pill ${
                              isFullyMapped
                                ? 'full'
                                : isUnmapped
                                ? 'unmapped'
                                : 'partial'
                            }`}
                          >
                            {isFullyMapped ? (
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            ) : isUnmapped ? (
                              <AlertCircle className="w-3 h-3 text-rose-600" />
                            ) : (
                              <Link2 className="w-3 h-3 text-blue-600" />
                            )}
                            {isFullyMapped
                              ? 'Đã map đủ Sàn'
                              : isUnmapped
                              ? 'Chưa gắn link'
                              : `Đã map ${p.marketplaceMappings.length} Sàn`}
                          </span>
                        </div>

                        {p.marketplaceMappings.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {p.marketplaceMappings.map((m) => (
                              <span
                                key={m.platform}
                                className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1"
                              >
                                <ShoppingBag className="w-2.5 h-2.5 text-indigo-600" />
                                {m.platformName.split(' ')[0]}: #{m.marketplaceProductId}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setActiveMappingProduct(p)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-bold hover:bg-indigo-100 transition-all cursor-pointer"
                        >
                          <Link2 className="w-3.5 h-3.5" /> Gắn link sàn
                        </button>

                        <button
                          onClick={() => navigate(`/admin/products/edit/${p.sku}`)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Sửa sản phẩm"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(p.sku)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render SCR-52 Marketplace Mapping Modal */}
      {activeMappingProduct && (
        <ErpMarketplaceMappingModal
          isOpen={!!activeMappingProduct}
          onClose={() => setActiveMappingProduct(null)}
          product={activeMappingProduct}
          onSaveMapping={handleSaveMapping}
        />
      )}
    </div>
  )
}
