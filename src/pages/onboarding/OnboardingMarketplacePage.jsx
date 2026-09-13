import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Copy, Check, RefreshCw, ArrowRight, ArrowLeft, Sparkles, Key, Lock } from 'lucide-react'
import './OnboardingMarketplacePage.css'

export function OnboardingMarketplacePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('shopee')

  const [channelData, setChannelData] = useState({
    shopee: {
      name: 'Shopee VN',
      logo: 'S',
      logoClass: 'market-shopee',
      appKey: '8401928374',
      appSecret: '••••••••••••••••••••••••',
      webhookUrl: 'https://api.smartomni.vn/webhooks/v1/shopee/tenant_hxvf123',
      isTested: true,
      latency: '38ms',
      isTesting: false,
    },
    tiktok: {
      name: 'TikTok Shop',
      logo: '🎵',
      logoClass: 'market-tiktok',
      appKey: '6719204851',
      appSecret: '••••••••••••••••••••••••',
      webhookUrl: 'https://api.smartomni.vn/webhooks/v1/tiktok/tenant_hxvf123',
      isTested: true,
      latency: '45ms',
      isTesting: false,
    },
    lazada: {
      name: 'Lazada VN',
      logo: 'L',
      logoClass: 'market-lazada',
      appKey: '',
      appSecret: '',
      webhookUrl: 'https://api.smartomni.vn/webhooks/v1/lazada/tenant_hxvf123',
      isTested: false,
      latency: null,
      isTesting: false,
    },
  })

  const [copied, setCopied] = useState(false)

  const currentChannel = channelData[activeTab]

  const handleInputChange = (field, value) => {
    setChannelData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
        isTested: false, // Reset test status when credentials change
      },
    }))
  }

  const handleTestConnection = () => {
    setChannelData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        isTesting: true,
      },
    }))

    setTimeout(() => {
      setChannelData((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          isTesting: false,
          isTested: true,
          latency: `${Math.floor(Math.random() * 25) + 30}ms`,
        },
      }))
    }, 800)
  }

  const handleCopyWebhook = () => {
    navigator.clipboard?.writeText?.(currentChannel.webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="onboarding-channel-wrapper">
      <div className="onboarding-channel-card">
        <div className="onboarding-header">
          <div className="onboarding-badge">
            <Sparkles size={12} />
            <span>Step 3 of 5 — Multi-Channel Security Configuration</span>
          </div>
          <h1 className="onboarding-title">Configure Sales Channels</h1>
          <p className="onboarding-subtitle">Enter App Key & Secret for each platform. Encrypted via AES-256.</p>
        </div>

        {/* Channel Tabs */}
        <div className="channel-tabs-row">
          {Object.keys(channelData).map((key) => {
            const ch = channelData[key]
            return (
              <button
                key={key}
                type="button"
                className={`channel-tab-btn ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                <div className={`channel-logo-icon ${ch.logoClass}`} style={{ width: 20, height: 20, fontSize: 11 }}>
                  {ch.logo}
                </div>
                <span>{ch.name}</span>
                <span className={`channel-tab-badge ${ch.isTested ? 'verified' : ''}`}>
                  {ch.isTested ? '✓ Verified' : 'Not Connected'}
                </span>
              </button>
            )
          })}
        </div>

        {/* Config Form Box */}
        <div className="channel-config-box">
          <div className="channel-box-header">
            <div className="channel-box-title">
              <div className={`channel-logo-icon ${currentChannel.logoClass}`}>
                {currentChannel.logo}
              </div>
              <span>{currentChannel.name} Integration API</span>
            </div>
            <div className="security-badge">
              <ShieldCheck size={14} />
              <span>AES-256 Encrypted</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="onboarding-input-group">
            <label className="onboarding-label">App Key / Partner ID</label>
            <div className="onboarding-input-wrapper">
              <Key className="onboarding-input-icon" />
              <input
                type="text"
                className="onboarding-input"
                placeholder="Enter App Key"
                value={currentChannel.appKey}
                onChange={(e) => handleInputChange('appKey', e.target.value)}
              />
            </div>
          </div>

          <div className="onboarding-input-group">
            <label className="onboarding-label">App Secret Key</label>
            <div className="onboarding-input-wrapper">
              <Lock className="onboarding-input-icon" />
              <input
                type="password"
                className="onboarding-input"
                placeholder="Enter App Secret"
                value={currentChannel.appSecret}
                onChange={(e) => handleInputChange('appSecret', e.target.value)}
              />
            </div>
          </div>

          {/* Webhook URL Box */}
          <div className="webhook-box">
            <span className="webhook-label">Dedicated Webhook Endpoint</span>
            <div className="webhook-input-row">
              <div className="webhook-url-code">{currentChannel.webhookUrl}</div>
              <button type="button" className="webhook-copy-btn" onClick={handleCopyWebhook}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Test Connection Button & Status */}
          {currentChannel.isTested ? (
            <div className="test-status-success">
              <Check size={16} />
              <span>Connection Verified Successfully (Latency: {currentChannel.latency})</span>
            </div>
          ) : (
            <button
              type="button"
              className="btn-test-connection"
              onClick={handleTestConnection}
              disabled={currentChannel.isTesting || !currentChannel.appKey}
            >
              {currentChannel.isTesting ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  <span>Verifying API Handshake...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Kiểm tra kết nối (Test Connection)</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="plan-actions">
          <button
            type="button"
            className="onboarding-btn-back"
            onClick={() => navigate('/onboarding/plan')}
          >
            <ArrowLeft size={16} />
            <span>Back to Plan</span>
          </button>
          <button
            type="button"
            className="onboarding-btn-submit"
            style={{ width: 'auto', padding: '0 28px' }}
            onClick={() => navigate('/onboarding/import')}
          >
            <span>Continue to Data Import</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
