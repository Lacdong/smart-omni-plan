import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './LandingFooter.css'

export function LandingFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="landing-footer" id="customer">
      <div className="footer-container">
        {/* Column 1: Brand & Newsletter */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand-logo">
            <div className="brand-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H9M17 7V15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="brand-name">SmartOmni</span>
          </Link>

          <p className="footer-brand-desc">
            SmartOmni Multi-Channel Cloud Platform with built-in predictive demand AI, intelligent stock balancing, and real-time automated supply chain execution.
          </p>

          {/* Newsletter Box */}
          <div className="newsletter-box">
            <label className="newsletter-label">Subscribe to AI Supply Chain Newsletter</label>
            {subscribed ? (
              <div className="newsletter-success">Subscribed successfully!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter corporate email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Column 2: Products */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Products</h4>
          <ul className="footer-links-list">
            <li><a href="#feature">Intelligent WMS</a></li>
            <li><a href="#product">Marketplace Sync</a></li>
            <li><a href="#ai-insight">AI Demand Engine</a></li>
            <li><a href="#feature">OMS & Order Fulfillment</a></li>
          </ul>
        </div>

        {/* Column 3: Resources & API */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Resources & API</h4>
          <ul className="footer-links-list">
            <li><a href="#api">Developer API Docs</a></li>
            <li><a href="#sdk">SmartOmni SDK</a></li>
            <li><a href="#status">System Status</a></li>
            <li><a href="#security">Security & Compliance</a></li>
          </ul>
        </div>

        {/* Column 4: Enterprise */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Enterprise</h4>
          <ul className="footer-links-list">
            <li><a href="#stories">Client Stories</a></li>
            <li><a href="#price">Enterprise Pricing</a></li>
            <li><a href="#consulting">Strategic Consulting</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
