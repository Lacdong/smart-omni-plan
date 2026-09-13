import React, { useState } from 'react'
import {
  Link2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Trash2,
  Plus,
  Sparkles,
  Layers,
  Search,
  Check
} from 'lucide-react'
import { GlassModal } from '@/components/ui/GlassModal'
import './ErpMarketplaceMappingModal.css'

export function ErpMarketplaceMappingModal({ isOpen, onClose, product, onSaveMapping }) {
  const [selectedPlatform, setSelectedPlatform] = useState('shopee')
  const [marketplaceUrl, setMarketplaceUrl] = useState('')
  const [parsedData, setParsedData] = useState(null)
  const [mappings, setMappings] = useState(product?.marketplaceMappings || [])
  const [parseError, setParseError] = useState(null)

  if (!product) return null

  // Real-time URL Parsing Engine simulation for Shopee / TikTok Shop / Lazada
  const handleUrlChange = (url) => {
    setMarketplaceUrl(url)
    setParseError(null)

    if (!url.trim()) {
      setParsedData(null)
      return
    }

    try {
      if (url.includes('shopee.vn') || url.includes('shopee.com')) {
        setSelectedPlatform('shopee')
        // Regex match shopee pattern /product/shopId/productId or i.shopId.productId
        const match = url.match(/(?:product\/|i\.)(\d+)\/(\d+)/) || url.match(/\/(\d+)\/(\d+)/)
        const productId = match ? match[2] : `SP-${Math.floor(10000000 + Math.random() * 90000000)}`
        const shopId = match ? match[1] : '889977'

        setParsedData({
          platform: 'shopee',
          platformName: 'Shopee Mall VN',
          marketplaceProductId: productId,
          marketplaceShopId: shopId,
          url: url,
          status: 'MAPPED',
          mappedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          confidence: '100% Match',
        })
      } else if (url.includes('tiktok.com') || url.includes('tiktokshop')) {
        setSelectedPlatform('tiktok')
        const match = url.match(/product\/(\d+)/)
        const productId = match ? match[1] : `TT-${Math.floor(10000000 + Math.random() * 90000000)}`

        setParsedData({
          platform: 'tiktok',
          platformName: 'TikTok Shop Live',
          marketplaceProductId: productId,
          marketplaceShopId: 'TK-LIVE-01',
          url: url,
          status: 'MAPPED',
          mappedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          confidence: '98% Match',
        })
      } else if (url.includes('lazada.vn') || url.includes('lazada')) {
        setSelectedPlatform('lazada')
        const match = url.match(/i(\d+)/)
        const productId = match ? match[1] : `LZD-${Math.floor(10000000 + Math.random() * 90000000)}`

        setParsedData({
          platform: 'lazada',
          platformName: 'Lazada Flagship',
          marketplaceProductId: productId,
          marketplaceShopId: 'LZD-STORE-88',
          url: url,
          status: 'MAPPED',
          mappedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          confidence: '95% Match',
        })
      } else {
        setParsedData(null)
        if (url.length > 10) {
          setParseError('URL không đúng định dạng sản phẩm Shopee, TikTok Shop hoặc Lazada hợp lệ.')
        }
      }
    } catch (e) {
      setParseError('Lỗi bóc tách URL sản phẩm sàn.')
    }
  }

  // Add parsed link mapping
  const handleAddMapping = () => {
    if (!parsedData) return

    // Check if platform is already mapped
    const existingIndex = mappings.findIndex((m) => m.platform === parsedData.platform)
    let updatedMappings = []

    if (existingIndex >= 0) {
      updatedMappings = [...mappings]
      updatedMappings[existingIndex] = parsedData
    } else {
      updatedMappings = [...mappings, parsedData]
    }

    setMappings(updatedMappings)
    setMarketplaceUrl('')
    setParsedData(null)
  }

  // Remove a mapping
  const handleRemoveMapping = (platform) => {
    setMappings(mappings.filter((m) => m.platform !== platform))
  }

  // Save all mappings to product
  const handleSave = () => {
    const updatedProduct = {
      ...product,
      marketplaceMappings: mappings,
    }
    onSaveMapping(updatedProduct)
    onClose()
  }

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Gắn link & Mapping Sàn TMĐT — SCR-52"
      className="max-w-xl"
    >
      <div className="mapping-modal-container">
        {/* Product Brief Summary */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-900/5 border border-slate-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded">
                {product.sku}
              </span>
              <span className="text-xs font-bold text-slate-700">{product.category}</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">{product.name}</h4>
          </div>
        </div>

        {/* Platform Selection Tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            1. Chọn sàn TMĐT cần kết nối
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedPlatform('shopee')}
              className={`platform-select-btn ${selectedPlatform === 'shopee' ? 'active' : ''}`}
            >
              <ShoppingBag className="w-4 h-4 text-orange-500" /> Shopee Mall
            </button>
            <button
              type="button"
              onClick={() => setSelectedPlatform('tiktok')}
              className={`platform-select-btn ${selectedPlatform === 'tiktok' ? 'active' : ''}`}
            >
              <ShoppingBag className="w-4 h-4 text-slate-900" /> TikTok Shop
            </button>
            <button
              type="button"
              onClick={() => setSelectedPlatform('lazada')}
              className={`platform-select-btn ${selectedPlatform === 'lazada' ? 'active' : ''}`}
            >
              <ShoppingBag className="w-4 h-4 text-blue-600" /> Lazada Flagship
            </button>
          </div>
        </div>

        {/* URL Input & Auto Parse */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            2. Dán đường dẫn (URL) sản phẩm trên gian hàng sàn
          </label>
          <div className="relative">
            <input
              type="url"
              value={marketplaceUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="VD: https://shopee.vn/product/889977/14253678 hoặc https://shop.tiktok.com/..."
              className="w-full pl-9 pr-24 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            />
            <Link2 className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <button
              type="button"
              disabled={!parsedData}
              onClick={handleAddMapping}
              className="absolute right-1.5 top-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 disabled:opacity-40 transition-all cursor-pointer"
            >
              + Thêm Link
            </button>
          </div>

          {parseError && (
            <p className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {parseError}
            </p>
          )}
        </div>

        {/* Auto Parsed Result Preview */}
        {parsedData && (
          <div className="url-parse-card parsed animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Đã bóc tách thành công ID từ
                sàn ({parsedData.confidence})
              </span>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                {parsedData.platformName}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-200">
                <div className="text-[10px] text-slate-500">Marketplace Product ID:</div>
                <div className="font-bold text-slate-900">{parsedData.marketplaceProductId}</div>
              </div>
              <div className="bg-white/80 p-2 rounded-lg border border-emerald-200">
                <div className="text-[10px] text-slate-500">Shop ID:</div>
                <div className="font-bold text-slate-900">{parsedData.marketplaceShopId}</div>
              </div>
            </div>
          </div>
        )}

        {/* Existing Mappings List */}
        <div>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Danh sách Sàn đã liên kết ({mappings.length})
          </h4>

          {mappings.length === 0 ? (
            <div className="p-4 text-center rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 italic">
              Sản phẩm này chưa được liên kết với gian hàng sàn TMĐT nào.
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {mappings.map((m) => (
                <div key={m.platform} className="mapping-list-item">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-xs text-indigo-900 bg-indigo-50 border border-indigo-200/80 px-2 py-1 rounded-md">
                      {m.platformName}
                    </span>
                    <div>
                      <div className="text-xs font-mono font-bold text-slate-800">
                        ID: {m.marketplaceProductId}
                      </div>
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 truncate max-w-xs"
                      >
                        {m.url} <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveMapping(m.platform)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Gỡ liên kết sàn này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all border border-indigo-400/40 cursor-pointer"
          >
            <Check className="w-4 h-4" /> Lưu liên kết Mapping
          </button>
        </div>
      </div>
    </GlassModal>
  )
}
