import React from 'react'
import { Link } from 'react-router-dom'
import './PricingSection.css'

export function PricingSection() {
  return (
    <section className="pricing-section" id="price">
      <div className="pricing-container">
        {/* Header Tag */}
        <p className="pricing-category-tag">
          TRANSPARENT PRICING
        </p>

        {/* Section Heading */}
        <h2 className="pricing-main-title">
          Invest Small, Scale Velocity
        </h2>

        {/* Section Subtitle */}
        <p className="pricing-main-subtitle">
          Start completely free. Upgrade smoothly as your sales volume and logistics footprint scale.
        </p>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {/* Card 1: Starter Plan */}
          <div className="pricing-card starter-card">
            <div className="card-header-flex">
              <span className="plan-badge badge-gray">Free Forever</span>
            </div>
            <h3 className="plan-name">Starter Plan</h3>
            <p className="plan-desc">
              For emerging brands and boutique sellers starting out on a single marketplace channel.
            </p>

            <div className="plan-price-box">
              <span className="price-amount">$0</span>
              <span className="price-period">/ month</span>
            </div>

            <ul className="plan-feature-list">
              <li className="feature-item">
                <svg className="check-svg green-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Connect up to 1 sales channel (Shopee or TikTok)</span>
              </li>
              <li className="feature-item">
                <svg className="check-svg green-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Manage up to 100 SKUs</span>
              </li>
              <li className="feature-item">
                <svg className="check-svg green-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Standard order processing & packing slips</span>
              </li>
              <li className="feature-item">
                <svg className="check-svg green-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Default branded subdomain webstore</span>
              </li>
              <li className="feature-item disabled-feature">
                <svg className="check-svg gray-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                <span>AI Demand Forecasting & Auto PO</span>
              </li>
            </ul>

            <Link to="/onboarding/register" className="btn-plan-starter">
              Get Started Free
            </Link>
          </div>

          {/* Card 2: Enterprise Pro Plan (Featured) */}
          <div className="pricing-card pro-card">
            {/* Top Floating Badge */}
            <div className="floating-popular-badge">
              MOST POPULAR FOR SCALING RETAILERS
            </div>

            <div className="card-header-flex">
              <span className="plan-badge badge-blue">Full AI Power</span>
            </div>
            <h3 className="plan-name">Enterprise Pro Plan</h3>
            <p className="plan-desc">
              For fast-growing multi-channel brands requiring intelligent warehouse balancing and end-to-end automation.
            </p>

            <div className="plan-price-box">
              <span className="price-amount">Pro Tier</span>
            </div>

            <ul className="plan-feature-list">
              <li className="feature-item">
                <svg className="check-svg blue-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <strong>Unlimited sales channels (Shopee, TikTok, Lazada)</strong>
              </li>
              <li className="feature-item">
                <svg className="check-svg blue-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <strong>Unlimited SKUs & multi-branch regional hubs</strong>
              </li>
              <li className="feature-item">
                <svg className="check-svg blue-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Full AI Insights Suite: 30-day predictive demand</span>
              </li>
              <li className="feature-item">
                <svg className="check-svg blue-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Real-time webhook synchronization</span>
              </li>
              <li className="feature-item">
                <svg className="check-svg blue-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Technical support & dedicated onboarding</span>
              </li>
            </ul>

            <Link to="/onboarding/register" className="btn-plan-pro">
              Activate Pro Plan (Free Trial)
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
