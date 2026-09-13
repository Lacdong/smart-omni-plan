import React from 'react'
import './IntegrationSection.css'

export function IntegrationSection() {
  return (
    <section className="integration-section" id="product">
      <div className="integration-container">
        {/* Uppercase Header Tag */}
        <p className="integration-tag">
          SEAMLESS INTEGRATION WITH LEADING MARKETPLACES & LOGISTICS CARRIERS
        </p>

        {/* Liquid Glass Integration Pill */}
        <div className="integration-glass-pill">
          {/* Shopee */}
          <div className="integration-item">
            <div className="icon-shopee">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6h-3c0-2.21-1.79-4-4-4S8 3.79 8 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm7 14H5V8h3v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h3v10z"/>
              </svg>
            </div>
            <span className="integration-name">Shopee</span>
          </div>

          {/* Tiktokshop */}
          <div className="integration-item">
            <div className="icon-tiktok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.38a6.34 6.34 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.64a6.34 6.34 0 0 0 10.74 4.5V11.2a8.28 8.28 0 0 0 4.85 1.55V9.3a4.85 4.85 0 0 1-3-1.06v-1.55z"/>
              </svg>
            </div>
            <span className="integration-name">Tiktokshop</span>
          </div>

          {/* Payment Gateway */}
          <div className="integration-item">
            <div className="icon-gateway">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
            <span className="integration-name">Payment Gateway</span>
          </div>
        </div>
      </div>
    </section>
  )
}
