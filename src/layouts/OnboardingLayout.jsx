import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'
import './OnboardingLayout.css'

export function OnboardingLayout() {
  const location = useLocation()

  // Determine current step index (1..5)
  const getStepIndex = (path) => {
    if (path.includes('/onboarding/plan')) return 2
    if (path.includes('/onboarding/marketplace')) return 3
    if (path.includes('/onboarding/import')) return 4
    if (path.includes('/onboarding/otp')) return 5
    if (path.includes('/onboarding/customer-success')) return 5
    if (path.includes('/onboarding/complete')) return 5
    return 1
  }

  const currentStep = getStepIndex(location.pathname)

  const steps = [
    { number: 1, name: 'Account' },
    { number: 2, name: 'Plan' },
    { number: 3, name: 'Channels' },
    { number: 4, name: 'Import' },
    { number: 5, name: 'Launch' },
  ]

  return (
    <div className="onboarding-root">
      {/* SVG Optical Refraction Filter */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="onboarding-glass-refraction" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.015 0.015" 
              numOctaves="2" 
              seed="42" 
              result="noise" 
            />
            <feGaussianBlur in="noise" stdDeviation="1.5" result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="20" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Layer 0: HTML5 Video Background */}
      <video
        className="onboarding-video-background"
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      >
        <source src="/login-video.mp4" type="video/mp4" />
      </video>

      {/* Layer 1: Subtle Overlay */}
      <div className="onboarding-video-overlay" />

      {/* Header Bar */}
      <header className="onboarding-header-wrapper">
        <Link to="/" className="onboarding-brand">
          <div className="onboarding-brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H9M17 7V15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="onboarding-brand-name">SmartOmni</span>
        </Link>

        {/* Stepper Pill */}
        <div className="onboarding-stepper-pill">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number
            const isActive = currentStep === step.number
            return (
              <React.Fragment key={step.number}>
                <div
                  className={`onboarding-step-dot ${
                    isCompleted ? 'completed' : isActive ? 'active' : 'upcoming'
                  }`}
                >
                  {isCompleted ? <Check size={12} strokeWidth={3} /> : step.number}
                </div>
                {isActive && (
                  <span className="onboarding-step-label">
                    Step {step.number}: {step.name}
                  </span>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </header>

      {/* Main Content View Outlet */}
      <main className="onboarding-main-container">
        <Outlet />
      </main>
    </div>
  )
}
