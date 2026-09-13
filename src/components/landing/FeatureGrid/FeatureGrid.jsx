import React from 'react'
import './FeatureGrid.css'

export function FeatureGrid() {
  return (
    <section className="feature-section" id="feature">
      <div className="feature-container">
        {/* Category Badge */}
        <p className="feature-category-tag">
          CORE ENTERPRISE VALUE
        </p>

        {/* Section Heading */}
        <h2 className="feature-main-title">
          Built for Velocity. Engineered for Scale.
        </h2>

        {/* Section Subtitle */}
        <p className="feature-main-subtitle">
          Solve the 4 greatest headaches of high-growth omnichannel brands: order bottlenecks, stockout overselling, deadstock capital lockup, and heavy marketplace dependency.
        </p>

        {/* 2x2 Cards Grid */}
        <div className="feature-grid">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="card-top-tag badge-blue">
              Realtime Speed
            </div>
            <h3 className="card-heading">
              Instant Multi-Channel Sync (Omnichannel Sync)
            </h3>
            <p className="card-description">
              Ingest and control incoming orders from Shopee, TikTok Shop, Lazada, and your branded Web Storefront in one unified pane of glass. Ultra-fast webhook delivery ensures zero orders are ever dropped.
            </p>
            <div className="card-footer-bar">
              <div className="footer-pill">
                <span className="dot dot-blue" />
                High-Throughput Order Ingestion
              </div>
              <span className="footer-text-highlight text-violet">
                Webhook Synchronization
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="card-top-tag badge-green">
              Channel Reputation Protection
            </div>
            <h3 className="card-heading">
              Centralized Inventory & Stock Allocation
            </h3>
            <p className="card-description">
              Automatically allocate, lock, and replenish virtual and physical inventory across all sales channels in real-time. Completely eliminate late delivery penalties and order cancellations during peak flash sales and livestreams.
            </p>
            <div className="card-footer-bar">
              <div className="footer-pill">
                <span className="dot dot-green" />
                Real-time Stock Allocation
              </div>
              <span className="footer-text-highlight text-green">
                Channel Inventory Locking
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="card-top-tag badge-blue">
              Machine Learning Engine
            </div>
            <h3 className="card-heading">
              AI Demand Forecasting (Demand Engine)
            </h3>
            <p className="card-description">
              Accurately predict 30-day demand per SKU using historical velocity, market seasonality, and promotional calendars. Flag slow-moving stock and automatically draft vendor purchase orders before stock runs dry.
            </p>
            <div className="card-footer-bar">
              <div className="footer-pill">
                <span className="dot dot-blue" />
                Optimized Working Capital
              </div>
              <span className="footer-text-highlight text-violet">
                Auto PO Generator
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="feature-card">
            <div className="card-top-tag badge-yellow">
              Direct-To-Consumer (DTC)
            </div>
            <h3 className="card-heading">
              Instant Branded Subdomain Storefront
            </h3>
            <p className="card-description">
              Instantly deploy high-converting branded web storefronts like yourstore.smartomni.vn in 1 click. Full SEO optimization, pixel integration, and direct checkout routing.
            </p>
            <div className="card-footer-bar">
              <div className="footer-pill">
                <span className="dot dot-yellow" />
                Branded Subdomain & SSL
              </div>
              <span className="footer-text-highlight text-orange">
                No Complex Setup
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
