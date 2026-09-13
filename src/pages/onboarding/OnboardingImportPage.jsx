import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Sparkles, CheckSquare, Square } from 'lucide-react'
import './OnboardingImportPage.css'

export function OnboardingImportPage() {
  const navigate = useNavigate()
  const [options, setOptions] = useState({
    products: true,
    orders: true,
    inventory: true,
    customers: false,
  })

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="onboarding-import-wrapper">
      <div className="onboarding-import-card">
        <div className="onboarding-header">
          <div className="onboarding-badge">
            <Sparkles size={12} />
            <span>Step 4 of 5 — Data Import Settings</span>
          </div>
          <h1 className="onboarding-title">Configure Initial Import</h1>
          <p className="onboarding-subtitle">Select what data to automatically fetch from connected channels</p>
        </div>

        {/* Options */}
        <div className="import-options-list">
          <div className="import-toggle-item" onClick={() => toggleOption('products')}>
            <div className="import-item-info">
              <span className="import-item-title">Product Catalog & SKUs</span>
              <span className="import-item-desc">Import active product listings, titles, pricing, and images</span>
            </div>
            {options.products ? <CheckSquare color="#4F46E5" size={22} /> : <Square color="#64748B" size={22} />}
          </div>

          <div className="import-toggle-item" onClick={() => toggleOption('inventory')}>
            <div className="import-item-info">
              <span className="import-item-title">Inventory Quantities</span>
              <span className="import-item-desc">Auto-map real-time stock levels across all channels</span>
            </div>
            {options.inventory ? <CheckSquare color="#4F46E5" size={22} /> : <Square color="#64748B" size={22} />}
          </div>

          <div className="import-toggle-item" onClick={() => toggleOption('orders')}>
            <div className="import-item-info">
              <span className="import-item-title">Recent Orders (Last 30 Days)</span>
              <span className="import-item-desc">Import historical orders for baseline analytics and demand forecast</span>
            </div>
            {options.orders ? <CheckSquare color="#4F46E5" size={22} /> : <Square color="#64748B" size={22} />}
          </div>

          <div className="import-toggle-item" onClick={() => toggleOption('customers')}>
            <div className="import-item-info">
              <span className="import-item-title">Customer Profiles & CRM</span>
              <span className="import-item-desc">Sync buyer profile records and order history</span>
            </div>
            {options.customers ? <CheckSquare color="#4F46E5" size={22} /> : <Square color="#64748B" size={22} />}
          </div>
        </div>

        {/* Actions */}
        <div className="plan-actions">
          <button
            type="button"
            className="onboarding-btn-back"
            onClick={() => navigate('/onboarding/marketplace')}
          >
            <ArrowLeft size={16} />
            <span>Back to Channels</span>
          </button>
          <button
            type="button"
            className="onboarding-btn-submit"
            style={{ width: 'auto', padding: '0 28px' }}
            onClick={() => navigate('/onboarding/otp?type=business')}
          >
            <span>Xác Thực OTP & Kích Hoạt Workspace</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
