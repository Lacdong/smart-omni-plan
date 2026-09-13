import React from 'react'
import './LandingPage.css'

import { LandingHeader } from '@/components/landing/LandingHeader/LandingHeader'
import { HeroSection } from '@/components/landing/HeroSection/HeroSection'
import { IntegrationSection } from '@/components/landing/IntegrationSection/IntegrationSection'
import { FeatureGrid } from '@/components/landing/FeatureGrid/FeatureGrid'
import { AiInsightSection } from '@/components/landing/AiInsightSection/AiInsightSection'
import { PricingSection } from '@/components/landing/PricingSection/PricingSection'
import { CtaSection } from '@/components/landing/CtaSection/CtaSection'
import { LandingFooter } from '@/components/landing/LandingFooter/LandingFooter'

export function LandingPage() {
  return (
    <div className="landing-page-root">
      {/* Soft background ambient atmospheric glow */}
      <div className="landing-ambient-glow-top" />
      <div className="landing-ambient-glow-bottom" />

      {/* Page Sections Composition */}
      <LandingHeader />
      <HeroSection />
      <IntegrationSection />
      <FeatureGrid />
      <AiInsightSection />
      <PricingSection />
      <CtaSection />
      <LandingFooter />
    </div>
  )
}
