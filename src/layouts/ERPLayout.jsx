import React from 'react'
import { Outlet } from 'react-router-dom'
import { GlassHeader } from '@/components/layout/GlassHeader'
import { GlassSidebar } from '@/components/layout/GlassSidebar'
import '@/styles/glass-layout.css'

export function ERPLayout() {
  return (
    <div className="glass-app-layout flex flex-col min-h-screen">
      {/* Static Ambient Atmospheric Glows */}
      <div className="glass-ambient-glow-1" />
      <div className="glass-ambient-glow-2" />

      {/* Glass Header */}
      <div className="relative z-10">
        <GlassHeader domainName="Admin ERP" tenantName="Hxvf123 Store" />
      </div>

      {/* Main Workspace */}
      <div className="relative z-10 flex-1 flex">
        <GlassSidebar />
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
