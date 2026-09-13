import React from 'react'
import { Link } from 'react-router-dom'
import './HeroSection.css'

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-ambient-glow" />
      
      <div className="hero-container">
        {/* Subtitle Brand Badge */}
        <div className="hero-brand-tag">
          SmartOmni
        </div>

        {/* Main Headline */}
        <h1 className="hero-title">
          Multi-channel Retail Management & AI Supply Chain Optimization Platform.
        </h1>

        {/* Subtitle Description */}
        <p className="hero-subtitle">
          SmartOmni is a <span className="highlight-purple">SaaS Multi-tenant retail management platform</span> that centralizes products, orders, inventory, marketplace integrations and AI-powered demand forecasting.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <Link to="/onboarding/register" className="btn-hero-primary">
            Free Trial
          </Link>
          <a href="#feature" className="btn-hero-secondary">
            Discover
          </a>
        </div>
      </div>
    </section>
  )
}
