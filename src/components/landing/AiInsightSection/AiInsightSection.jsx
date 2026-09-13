import React from 'react'
import { Link } from 'react-router-dom'
import './AiInsightSection.css'

export function AiInsightSection() {
  return (
    <section className="ai-section" id="ai-insight">
      <div className="ai-container">
        {/* Left Column: Intelligence Features */}
        <div className="ai-content-col">
          <div className="ai-tag-pill">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span>SmartOmni Supply Chain Intelligence</span>
          </div>

          <h2 className="ai-heading">
            Precise demand prediction with multi-dimensional machine learning.
          </h2>

          <p className="ai-description">
            No more gut-feeling decisions. SmartOmni AI continuously trains on live data dimensions: monthly buying patterns, flash sale multiplier effects, and geographic fulfillment lead times.
          </p>

          <ul className="ai-checklist">
            <li className="ai-check-item">
              <div className="check-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <strong className="check-title">Transparent SHAP Explainability</strong>
                <p className="check-text">Clear reasoning behind every replenishment proposal, eliminating black-box opacity completely.</p>
              </div>
            </li>

            <li className="ai-check-item">
              <div className="check-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <strong className="check-title">Automated Purchase Order Drafting (Auto PO)</strong>
                <p className="check-text">Generates purchase orders 14 days in advance to comfortably cover supplier production and shipping lead time.</p>
              </div>
            </li>

            <li className="ai-check-item">
              <div className="check-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <strong className="check-title">Regional Cross-Warehouse Balancing</strong>
                <p className="check-text">Dynamically rebalances regional stock between Hanoi and HCMC hubs to slash expensive last-mile logistics expenses.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Column: AI Forecast Mockup Widget */}
        <div className="ai-mockup-col">
          <div className="mockup-card">
            {/* Top Warning Bar */}
            <div className="mockup-warning-bar">
              <div className="warning-bar-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span className="warning-title">Stockout Risk Alert</span>
              </div>
              <span className="critical-badge">CRITICAL</span>
            </div>
            <p className="sku-subtitle">SKU: DRY-FIT-TEE-BLACK-L on TikTok Shop (HN-Hub)</p>

            {/* Illustrative UI Metrics */}
            <div className="mockup-metrics-grid">
              <div className="metric-box">
                <span className="metric-label">Current On-Hand</span>
                <span className="metric-value text-slate-800">142 units</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">24h Run-Rate</span>
                <span className="metric-value text-blue-600">85 units/day</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Projected Stockout</span>
                <span className="metric-value text-red-600">18:00 Tomorrow</span>
              </div>
            </div>

            {/* AI Proposal Card */}
            <div className="ai-proposal-box">
              <div className="proposal-header">
                <span className="proposal-title">AI Recommended Action:</span>
                <span className="proposal-badge">Automated Proposal</span>
              </div>
              <p className="proposal-desc">
                Transfer 300 units from Binh Duong warehouse to Hanoi warehouse via expedited courier. Alternatively, reallocate TikTok Shop pool from primary shared stock.
              </p>
              <div className="proposal-actions">
                <Link to="/onboarding/register" className="btn-approve">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Approve Transfer (1-Click)
                </Link>
                <Link to="/onboarding/register" className="btn-customize">
                  Customize
                </Link>
              </div>
            </div>

            {/* Footer confidence note */}
            <div className="mockup-footer-note">
              <span>Model Confidence Score: Evaluated across past Mega Sale cycles</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
