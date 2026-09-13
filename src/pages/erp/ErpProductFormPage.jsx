import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cloud,
  Sparkles,
  Save,
  X,
  FileImage,
  Image as ImageIcon,
  ShieldCheck,
  Building2
} from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { INITIAL_PRODUCTS } from '@/data/mockProductData'
import './ErpProductFormPage.css'

export function ErpProductFormPage() {
  const navigate = useNavigate()
  const { sku } = useParams()
  const isEditMode = Boolean(sku)

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: 'Thời trang Nam',
    price: '',
    compareAtPrice: '',
    attributes: {
      color: '',
      size: '',
      material: '',
      weight: '',
    },
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    s3Url: 's3://tenant-hxvf123-bucket/products/new-asset.png',
  })

  // S3 Upload states
  const [s3UploadState, setS3UploadState] = useState('idle') // idle | uploading | success | error
  const [s3Progress, setS3Progress] = useState(0)
  const [uploadErrorMsg, setUploadErrorMsg] = useState(null)
  const [uploadedS3Path, setUploadedS3Path] = useState(null)

  useEffect(() => {
    if (isEditMode) {
      const existingProduct = INITIAL_PRODUCTS.find((p) => p.sku === sku)
      if (existingProduct) {
        setFormData(existingProduct)
        setUploadedS3Path(existingProduct.s3Url)
      }
    }
  }, [sku, isEditMode])

  // File Upload Validation & Edge Case Handling (Format & 5MB Limit check)
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadErrorMsg(null)
    setS3UploadState('idle')

    // Validation 1: Allowed image formats (JPG, PNG, WEBP)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setS3UploadState('error')
      setUploadErrorMsg(
        'Lỗi định dạng: Chỉ chấp nhận file ảnh .jpg, .jpeg, .png, .webp! File đã chọn không đúng định dạng.'
      )
      return
    }

    // Validation 2: Maximum file size 5MB
    const maxSizeInBytes = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSizeInBytes) {
      setS3UploadState('error')
      setUploadErrorMsg(
        `Lỗi dung lượng: Dung lượng file (${(file.size / (1024 * 1024)).toFixed(
          2
        )} MB) vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn!`
      )
      return
    }

    // Simulate S3 Bucket direct upload
    setS3UploadState('uploading')
    setS3Progress(10)

    const interval = setInterval(() => {
      setS3Progress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 25
      })
    }, 200)

    setTimeout(() => {
      clearInterval(interval)
      setS3Progress(100)
      setS3UploadState('success')
      const sanitizedName = file.name.toLowerCase().replace(/\s+/g, '-')
      const generatedS3 = `s3://tenant-hxvf123-bucket/products/${Date.now()}-${sanitizedName}`
      setUploadedS3Path(generatedS3)

      // Create preview object URL
      const previewUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        image: previewUrl,
        s3Url: generatedS3,
      }))
    }, 1200)
  }

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.sku || !formData.name || !formData.price) {
      alert('Vui lòng nhập đầy đủ Mã SKU, Tên sản phẩm và Giá bán!')
      return
    }

    // Save and navigate back to SCR-50
    navigate('/admin/products')
  }

  return (
    <div className="product-form-container">
      {/* Page Header */}
      <PageHeader
        title={isEditMode ? `Sửa Sản phẩm SKU: ${sku} (SCR-51)` : 'Tạo Sản phẩm mới & Upload S3 (SCR-51)'}
        description="Nhập thông tin sản phẩm nội bộ và tải ảnh sản phẩm trực tiếp lên S3 Storage cô lập theo tenant_id."
        actions={
          <button
            onClick={() => navigate('/admin/products')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 text-slate-700 font-bold text-xs border border-slate-300 shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600" /> Quay lại SCR-50 Danh mục
          </button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Product Core Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="liquid-glass-panel p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200/80 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Thông tin Sản phẩm Nội bộ
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mã SKU Nội bộ (Unique ID) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isEditMode}
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value.toUpperCase() })
                    }
                    placeholder="VD: TSHIRT-BLK-L"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-xs uppercase focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Mã SKU dùng để đối soát tồn kho và mapping tự động với gian hàng sàn.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Danh mục Sản phẩm <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="Thời trang Nam">Thời trang Nam</option>
                    <option value="Thời trang Nữ">Thời trang Nữ</option>
                    <option value="Phụ kiện">Phụ kiện</option>
                    <option value="Điện tử & Công nghệ">Điện tử & Công nghệ</option>
                    <option value="Phụ kiện Điện tử">Phụ kiện Điện tử</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tên sản phẩm <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập tên sản phẩm nội bộ đầy đủ..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>

              {/* Pricing Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Giá bán Niêm yết (VND) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="VD: 290000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-indigo-700 focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Giá So sánh / Giá Gốc (VND)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.compareAtPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, compareAtPrice: e.target.value })
                    }
                    placeholder="VD: 350000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-600 focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Attributes Section */}
            <div className="liquid-glass-panel p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200/80 pb-3">
                Thuộc tính Biến thể Sản phẩm
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Màu sắc (Color)
                  </label>
                  <input
                    type="text"
                    value={formData.attributes?.color || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attributes: { ...formData.attributes, color: e.target.value },
                      })
                    }
                    placeholder="VD: Đen (Black)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Kích thước / Size
                  </label>
                  <input
                    type="text"
                    value={formData.attributes?.size || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attributes: { ...formData.attributes, size: e.target.value },
                      })
                    }
                    placeholder="VD: XL / 44mm"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Chất liệu (Material)
                  </label>
                  <input
                    type="text"
                    value={formData.attributes?.material || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attributes: { ...formData.attributes, material: e.target.value },
                      })
                    }
                    placeholder="VD: 100% Cotton 260GSM"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Trọng lượng đóng gói
                  </label>
                  <input
                    type="text"
                    value={formData.attributes?.weight || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attributes: { ...formData.attributes, weight: e.target.value },
                      })
                    }
                    placeholder="VD: 320g"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: S3 Media Asset Upload Widget */}
          <div className="space-y-6">
            <div className="liquid-glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Cloud className="w-4 h-4 text-indigo-600" /> S3 Tenant Asset Bucket
                </h3>
                <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200/60">
                  tenant_id: tenant-hxvf123
                </span>
              </div>

              {/* S3 File Upload Zone */}
              <div
                className={`s3-upload-zone ${
                  s3UploadState === 'error'
                    ? 'error'
                    : s3UploadState === 'uploading'
                    ? 'uploading'
                    : ''
                }`}
                onClick={() => document.getElementById('s3-file-input')?.click()}
              >
                <input
                  id="s3-file-input"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="flex flex-col items-center justify-center space-y-2">
                  {s3UploadState === 'uploading' ? (
                    <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
                  ) : s3UploadState === 'error' ? (
                    <AlertTriangle className="w-8 h-8 text-rose-600" />
                  ) : (
                    <UploadCloud className="w-8 h-8 text-indigo-600" />
                  )}

                  <div className="text-xs font-bold text-slate-800">
                    {s3UploadState === 'uploading'
                      ? `Đang tải lên S3... (${s3Progress}%)`
                      : 'Kéo thả hoặc Bấm vào đây để chọn ảnh'}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Hỗ trợ file: JPG, PNG, WEBP. Dung lượng tối đa: <strong>5MB</strong>
                  </p>
                </div>
              </div>

              {/* Edge Case Error Display */}
              {s3UploadState === 'error' && uploadErrorMsg && (
                <div className="p-3 rounded-xl bg-rose-100 border border-rose-300 text-xs font-bold text-rose-800 flex items-start gap-2 animate-fade-in">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{uploadErrorMsg}</span>
                </div>
              )}

              {/* Upload Progress Bar */}
              {s3UploadState === 'uploading' && (
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-2 transition-all duration-200"
                    style={{ width: `${s3Progress}%` }}
                  />
                </div>
              )}

              {/* Image & S3 Path Preview */}
              {formData.image && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-700">Xem trước ảnh & S3 URL:</div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="uploaded-image-preview shrink-0">
                      <img src={formData.image} alt="Preview" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Đã lưu trên S3 Bucket
                      </div>
                      <div className="font-mono text-[11px] text-slate-600 truncate mt-1 bg-white p-1.5 rounded border border-slate-200">
                        {formData.s3Url}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form Save Button Card */}
            <div className="liquid-glass-panel p-6 space-y-3">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all border border-indigo-400/40 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {isEditMode ? 'Lưu cập nhật Sản phẩm' : 'Lưu Sản phẩm mới'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="w-full px-4 py-2.5 rounded-xl bg-white text-slate-600 font-semibold text-xs border border-slate-300 hover:bg-slate-50 transition-colors"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
