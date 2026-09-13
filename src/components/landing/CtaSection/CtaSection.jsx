import React from 'react'
import { Link } from 'react-router-dom'
import './CtaSection.css'

export function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-gradient-box">
          {/* Top Pill Badge */}
          <div className="cta-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z"/>
            </svg>
            <span>Quick Setup</span>
          </div>

          {/* Heading */}
          <h2 className="cta-title">
            Ready to optimize your omnichannel supply chain today?
          </h2>

          {/* Subtitle */}
          <p className="cta-subtitle">
            Join leading retail brands eliminating stockouts and maximizing sustainable profit margins with SmartOmni.
          </p>

          {/* Action Button */}
          <div className="cta-action-wrap">
            <Link to="/onboarding/register" className="btn-cta-white">
              Create Account & Claim Subdomain
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

          {/* Bottom 3 Highlights */}
          <div className="cta-highlights-row">
            <div className="highlight-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12h8"/>
              </svg>
              <span>No credit card required</span>
            </div>

            <div className="highlight-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>Instant activation</span>
            </div>

            <div className="highlight-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Dedicated support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
