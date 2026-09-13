# SmartOmni — Project Brief

## 1. Project Overview

SmartOmni is a multi-tenant SaaS platform for small and medium-sized businesses.

The platform helps businesses manage:

- Products and SKUs
- Multi-channel orders
- Inventory
- Business intelligence
- AI-based demand forecasting
- Marketplace integrations
- Tenant and staff management
- Subscription plans

The platform integrates with e-commerce marketplaces such as Shopee and TikTok Shop.

---

## 2. Product Vision

SmartOmni should feel like a premium, intelligent and trustworthy business platform.

The interface should communicate:

- Simplicity
- Intelligence
- Reliability
- Modern technology
- Operational efficiency
- Business clarity

The product must not feel like a generic admin template.

---

## 3. UI Domains

SmartOmni consists of four major UI domains.

### 3.1 Tenant Onboarding Portal

Screens:

- SCR-00 — Landing Page
- SCR-01 — Registration
- SCR-02 — Plan Selection
- SCR-03 — Marketplace Connection
- SCR-04 — Initial Import Configuration
- SCR-05 — Completion / Redirect

---

### 3.2 Storefront Web

Screens:

- SCR-20 — Home / Catalog
- SCR-21 — Product Detail
- SCR-22 — Marketplace Redirect Modal
- SCR-23 — Cross-platform Order Lookup

The Storefront is customer-facing and should prioritize clarity, product discovery and a simple shopping experience.

---

### 3.3 Admin ERP Dashboard

Screens:

- SCR-10 — BI Dashboard
- SCR-30 — Multi-channel Order Management
- SCR-31 — Order Detail
- SCR-40 — Inventory
- SCR-41 — Inventory Adjustment
- SCR-42 — Inventory Logs
- SCR-50 — Product Catalog
- SCR-51 — Product Create / Edit
- SCR-52 — Marketplace Mapping
- SCR-60 — AI Demand Forecasting
- SCR-61 — Forecast / Recommendations
- SCR-62 — Mega Sale

The Admin ERP should be data-first.

Do not transform the landing page into a dashboard.

The Admin ERP should inherit the SmartOmni visual identity while using layouts appropriate for operational work, data tables, filters, charts and business workflows.

---

### 3.4 Super Admin Console

Screens:

- SCR-70 — SaaS Dashboard
- SCR-71 — Tenant Management
- SCR-72 — Pricing / Feature Flags
- SCR-73 — APM / Security Logs

The Super Admin Console is for platform-level administration.

---

## 4. Actors

### Customer

Uses the Storefront Web.

Main activities:

- Browse catalog
- View products
- Redirect to marketplace
- Look up orders

### Manager

Responsible for operational business activities.

Main activities:

- Manage products / SKUs
- Manage multi-channel orders
- Adjust inventory
- View shipping information
- Use AI inventory insights

### Tenant Admin

Responsible for managing a tenant.

Main activities:

- Tenant onboarding
- Marketplace API connections
- Staff permissions
- BI reports
- Subscription / plan management

### Super Admin

Responsible for the entire SmartOmni SaaS platform.

Main activities:

- Tenant management
- Tenant lock / unlock
- Pricing
- Feature flags
- APM
- Security
- Platform-level controls

---

## 5. Supporting Systems

SmartOmni integrates with external marketplace systems including:

- Shopee
- TikTok Shop

These systems support functionality such as:

- Real-time webhooks
- Stock synchronization
- Price updates
- Marketplace-related data synchronization

---

## 6. Source of Truth

SmartOmni UI development must follow three different sources of truth.

### Visual Source of Truth

The provided:

`SCR-00 Landing Page`

is the primary visual reference.

All other screens should inherit its visual language.

Do not redesign the SmartOmni visual identity from scratch.

### Functional Source of Truth

The provided SmartOmni system, UC and functional specification documents define:

- Business functionality
- Business rules
- User capabilities
- Data requirements
- Functional behavior

Do not invent business functionality that is not supported by the specifications.

### UX / Navigation Source of Truth

The provided:

`SmartOmni_Workflows_Navigation`

document defines:

- Screen relationships
- Navigation
- Workflows
- User flows
- UI navigation structure

Do not change the defined navigation flow without explicit approval.

---

## 7. Core Development Rule

Do not invent business functionality.

All functional behavior must be derived from the provided SmartOmni documentation.

If a UI detail is not explicitly specified:

1. Infer only the minimum necessary interaction.
2. Follow existing SmartOmni UI patterns.
3. Do not introduce unrelated features.
4. Do not modify business rules.
5. Do not change navigation without approval.

---

## 8. Visual Direction

The SmartOmni visual language is:

- Premium
- Minimal
- Intelligent
- Modern
- Clean
- Calm
- Technical
- Trustworthy

The primary visual reference is SCR-00 Landing Page.

The interface should use:

- White / off-white backgrounds
- Near-black typography
- Blue / violet accents
- Soft lavender / blue AI-related areas
- Thin borders
- Restrained shadows
- Generous whitespace
- Clean hierarchy
- Subtle visual effects

Avoid:

- Generic SaaS dashboard aesthetics
- Bootstrap-like visual language
- Excessive gradients
- Excessive rounded cards
- Excessive shadows
- Excessive glass effects
- Overly colorful dashboards
- Dark cyberpunk aesthetics
- Unnecessary decorative elements

---

## 9. Liquid Glass Direction

Liquid Glass is a component material, not the default surface for the entire application.

Preferred use cases include:

- Header
- Navigation
- Sidebar
- Notification panel
- Dropdown
- Modal / Dialog
- Toast
- Floating controls

Liquid Glass should generally NOT be used for:

- Dense data tables
- Every card
- Every section
- Charts by default
- Every form field

Glass surfaces should use:

- Translucent white
- Subtle blue / violet tint
- Backdrop blur
- Thin low-contrast borders
- Soft shadows
- Subtle highlights
- Strong text readability

The interface must remain usable when blur or transparency is reduced or unavailable.

---

## 10. Responsive Design

All screens must be designed responsively.

The implementation should account for:

- Desktop
- Tablet
- Mobile

Responsive behavior should preserve:

- Information hierarchy
- Navigation clarity
- Readability
- Usability
- Visual identity

Do not simply shrink desktop layouts on mobile.

---

## 11. Component Philosophy

Shared UI components should be created and reused across screens.

Examples include:

- GlassHeader
- GlassSidebar
- GlassNotification
- GlassDropdown
- GlassModal
- PageHeader
- StatCard
- DataTable
- StatusBadge
- FilterBar
- SearchInput
- EmptyState
- ErrorState
- LoadingState
- AIInsightCard
- ChartCard
- ConfirmDialog
- Toast

Components should be reusable without forcing every screen into the same layout.

---

## 12. Implementation Philosophy

Build SmartOmni incrementally.

Recommended implementation order:

1. Design System
2. Shared Components
3. Tenant Onboarding
4. BI Dashboard
5. Order Management
6. Inventory
7. Product Catalog
8. AI Forecasting
9. Storefront
10. Super Admin Console

After each major screen:

- Run the application
- Inspect the screen in the browser
- Verify visual consistency with SCR-00
- Verify navigation
- Verify responsive behavior
- Verify interaction states
- Verify loading / empty / error states
- Verify component reuse
- Verify Liquid Glass usage
- Fix visual inconsistencies before continuing

---

## 13. Quality Standard

A screen is not considered complete merely because it renders.

Each screen must satisfy:

- Functional correctness
- Navigation correctness
- Visual consistency
- Responsive behavior
- Component consistency
- Accessibility
- Appropriate interaction states
- Appropriate loading / empty / error states
- Consistent SmartOmni visual identity

---

## 14. Critical Constraint

Do not treat SmartOmni as a generic SaaS template.

The final product should feel like one coherent product system where:

SCR-00 establishes the visual identity,

the functional specifications establish the business behavior,

and the workflow / navigation specifications establish how users move through the system.