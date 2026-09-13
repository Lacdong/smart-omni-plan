import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ArrowRight, Sparkles, ArrowLeft } from 'lucide-react'
import './OnboardingPlanPage.css'

export function OnboardingPlanPage() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('pro')

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: '$0',
      period: 'forever',
      popular: false,
      features: [
        'Up to 200 orders / month',
        '1 Sales channel connection',
        'Basic inventory tracking',
        'Standard email support',
      ],
    },
    {
      id: 'pro',
      name: 'Pro (14-Day Free Trial)',
      price: '$0',
      period: 'for 14 days ($29/mo after)',
      popular: true,
      features: [
        'Unlimited monthly orders',
        'Multi-channel automatic sync',
        'AI Demand Forecasting engine',
        '24/7 Priority SLA support',
      ],
    },
  ]

  return (
    <div className="onboarding-plan-wrapper">
      <div className="onboarding-plan-card">
        <div className="onboarding-header">
          <div className="onboarding-badge">
            <Sparkles size={12} />
            <span>Step 2 of 5 — Choose Subscription Tier</span>
          </div>
          <h1 className="onboarding-title">Select Your Preferred Plan</h1>
          <p className="onboarding-subtitle">Try full Pro features free for 14 days. Downgrade or upgrade anytime.</p>
        </div>

        {/* 2 Plan Grid */}
        <div className="onboarding-plan-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-option-card ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && <span className="plan-popular-badge">Recommended</span>}
              <div>
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price">
                  {plan.price} <span>{plan.period}</span>
                </div>
                <ul className="plan-features-list">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="plan-feature-item">
                      <Check size={16} className="plan-check-icon" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="plan-actions">
          <button
            type="button"
            className="onboarding-btn-back"
            onClick={() => navigate('/onboarding/register')}
          >
            <ArrowLeft size={16} />
            <span>Back to Account</span>
          </button>
          <button
            type="button"
            className="onboarding-btn-submit"
            style={{ width: 'auto', padding: '0 28px' }}
            onClick={() => navigate('/onboarding/marketplace')}
          >
            <span>Continue to Channel Config</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
