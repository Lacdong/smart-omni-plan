# SmartOmni — UI Architecture

## 1. Purpose

This document defines the UI architecture of SmartOmni.

It describes how the SmartOmni interface is divided into UI domains, how screens are grouped, and how each domain should be structured.

This document does NOT define business rules.

Business functionality must come from the SmartOmni functional specifications.

Navigation and workflow behavior must follow the SmartOmni Workflow & Navigation specification.

Visual styling must follow:

`DESIGN_SYSTEM.md`

The primary visual reference is:

`references/SCR-00-Landing-Page.png`

---

# 2. SmartOmni UI Architecture

SmartOmni consists of four major UI domains:

1. Tenant Onboarding Portal
2. Storefront Web
3. Admin ERP Dashboard
4. Super Admin Console

These four domains share the same SmartOmni visual identity but have different layouts because they serve different user goals.

Do NOT force all four domains into one identical layout.

---

# 3. Domain 1 — Tenant Onboarding Portal

## Purpose

The Tenant Onboarding Portal guides a Tenant Admin through the process of creating and configuring a SmartOmni tenant.

## Screens

### SCR-00 — Landing Page

Purpose:

- Introduce SmartOmni
- Communicate product value
- Provide entry points to Sign In and Free Trial

Visual source of truth:

`references/SCR-00-Landing-Page.png`

SCR-00 establishes the primary SmartOmni visual identity.

---

### SCR-01 — Registration

Purpose:

- Register a new tenant / account

The screen should provide only the fields and interactions supported by the functional specification.

Layout direction:

- Clean
- Minimal
- Focused
- Clear form hierarchy

Avoid unnecessary dashboard elements.

---

### SCR-02 — Plan Selection

Purpose:

- Allow the Tenant Admin to select an available SmartOmni plan

The screen should clearly distinguish available plans.

Use the SmartOmni pricing visual language established by SCR-00.

Do not invent plans or features that are not specified in the documentation.

---

### SCR-03 — Marketplace Connection

Purpose:

- Connect marketplace accounts / integrations required by the tenant

Relevant marketplace integrations include:

- Shopee
- TikTok Shop

The screen should communicate connection status clearly.

Use appropriate loading, success and error states where required by the workflow.

---

### SCR-04 — Initial Import Configuration

Purpose:

- Configure the initial data import after marketplace connection

The interface should focus on configuration and confirmation.

Do not introduce unrelated configuration options.

---

### SCR-05 — Completion / Redirect

Purpose:

- Confirm successful onboarding
- Redirect the user to the appropriate application area

The completion state should be visually simple and clear.

---

# 4. Domain 2 — Storefront Web

## Purpose

The Storefront Web is the customer-facing shopping interface.

Primary user:

Customer

## Screens

### SCR-20 — Home / Catalog

Purpose:

- Display the storefront
- Allow customers to browse products
- Support product discovery

The Storefront should inherit the SmartOmni visual identity while prioritizing:

- Product visibility
- Clear navigation
- Readability
- Simple shopping flow

Do not copy the Admin ERP layout into the Storefront.

---

### SCR-21 — Product Detail

Purpose:

- Display detailed information about a product

The layout should prioritize:

- Product information
- Price
- Relevant product attributes
- Marketplace-related action where specified

Do not invent unsupported commerce functionality.

---

### SCR-22 — Marketplace Redirect Modal

Purpose:

- Inform the customer before redirecting to an external marketplace

The modal may use Liquid Glass according to the SmartOmni Design System.

The interaction must follow the defined workflow.

---

### SCR-23 — Cross-platform Order Lookup

Purpose:

- Allow customers to look up their order across supported marketplace channels

The interface should prioritize:

- Simple input
- Clear result state
- Order status
- Readability

Do not add unsupported order-management functionality.

---

# 5. Domain 3 — Admin ERP Dashboard

## Purpose

The Admin ERP Dashboard is the primary operational workspace for Manager and Tenant Admin users.

This domain is DATA-FIRST.

The Admin ERP must NOT look like a stretched version of the marketing Landing Page.

The visual identity should remain consistent with SCR-00 while the information architecture is optimized for:

- Business operations
- Tables
- Filters
- Charts
- Metrics
- Product management
- Inventory
- Orders
- AI insights

---

# 6. Admin ERP Navigation Structure

The Admin ERP should organize functionality into clear operational areas.

Primary areas include:

- Dashboard / BI
- Orders
- Inventory
- Products
- AI Forecasting
- Staff / Subscription where applicable

Only include navigation items supported by the SmartOmni specifications.

---

# 7. SCR-10 — BI Dashboard

## Purpose

Provide a business overview for operational users.

Primary users:

- Manager
- Tenant Admin

The layout should prioritize:

- Business metrics
- Relevant charts
- Operational summaries
- AI-related insights where specified

Recommended structural hierarchy:

```text
Application Header
        ↓
Navigation / Sidebar
        ↓
Page Header
        ↓
Key Business Metrics
        ↓
Charts / Analytics
        ↓
AI / Operational Insights
````

Do not invent metrics.

Metrics and data must come from the SmartOmni specifications.

---

# 8. SCR-30 — Multi-channel Order Management

## Purpose

Manage orders across supported marketplace channels.

Primary users:

* Manager
* Tenant Admin

The layout should be data-first.

Recommended structure:

```text
Application Header
        ↓
Sidebar
        ↓
Page Header
        ↓
Filter / Search Area
        ↓
Order Data Table
        ↓
Pagination / Additional Controls
```

Use solid surfaces for dense data.

Do not use Liquid Glass for the entire table.

---

# 9. SCR-31 — Order Detail

## Purpose

Display detailed information about a selected order.

The layout should establish a clear hierarchy between:

* Order information
* Customer-related information where specified
* Product / SKU information
* Shipping information
* Order status
* Relevant actions

Do not add unsupported order actions.

---

# 10. SCR-40 — Inventory

## Purpose

Provide an overview of inventory.

Primary users:

* Manager
* Tenant Admin

The screen should clearly communicate:

* Actual stock
* Available stock
* Reserved stock

The interface should prioritize data readability.

Recommended structure:

```text
Page Header
        ↓
Inventory Summary
        ↓
Filters / Search
        ↓
Inventory Table
        ↓
Row Actions
```

---

# 11. SCR-41 — Inventory Adjustment

## Purpose

Allow an authorized user to adjust inventory.

This is a focused operational interaction.

The adjustment flow includes:

* New quantity
* Adjustment reason

Supported reasons include:

* Restock
* Inventory
* Shrinkage

The interface should clearly distinguish:

* Current quantity
* New quantity
* Reason
* Save / confirmation action

The implementation must preserve the defined optimistic concurrency / Redis lock / Outbox workflow.

Do not modify the business logic.

The adjustment UI may use a modal / dialog.

Liquid Glass may be applied to the modal surface according to `DESIGN_SYSTEM.md`.

---

# 12. SCR-42 — Inventory Logs

## Purpose

Display inventory adjustment / synchronization logs.

The interface should clearly communicate operation results such as:

* SUCCESS
* FAILED

The screen should prioritize operational traceability and readability.

---

# 13. SCR-50 — Product Catalog

## Purpose

Manage SmartOmni products and SKUs.

Primary users:

* Manager
* Tenant Admin

The screen should prioritize:

* Product visibility
* SKU identification
* Product status
* Search / filtering
* Product actions

Use a data-first layout.

---

# 14. SCR-51 — Product Create / Edit

## Purpose

Create or edit a product.

The documented product information includes:

* Product name
* SKU
* Attributes
* Price
* Product image / asset upload

Image assets may use S3 according to the system specification.

Do not invent additional product fields.

---

# 15. SCR-52 — Marketplace Mapping

## Purpose

Map a SmartOmni product to marketplace listings.

Supported marketplace context includes:

* Shopee
* TikTok Shop

The documented workflow includes marketplace URL mapping.

This interaction may be implemented as a modal.

---

# 16. SCR-60 — AI Demand Forecasting

## Purpose

Provide AI-powered demand forecasting.

Primary users:

* Manager
* Tenant Admin

The interface should communicate AI insights clearly without becoming visually excessive.

Recommended visual language:

* Soft lavender
* Soft blue
* Blue-violet accents
* Subtle glow

AI elements should remain business-focused.

---

# 17. SCR-61 — Forecast / Recommendations

## Purpose

Display demand forecasting charts and AI recommendations.

The screen should prioritize:

* Forecast information
* Charts
* Recommendations
* Business interpretation

Charts should remain readable and should not be unnecessarily decorative.

---

# 18. SCR-62 — Mega Sale

## Purpose

Support the Mega Sale forecasting / planning workflow defined by the SmartOmni specification.

The implementation must follow the documented workflow.

Do not invent additional forecasting logic.

---

# 19. Domain 4 — Super Admin Console

## Purpose

The Super Admin Console provides platform-level administration.

Primary user:

Super Admin

This domain is separate from normal tenant operations.

---

# 20. SCR-70 — SaaS Dashboard

Purpose:

* Provide a platform-level overview

The layout should prioritize platform metrics and operational information defined by the specification.

---

# 21. SCR-71 — Tenant Management

Purpose:

* Manage SmartOmni tenants
* Support tenant-level administration defined by the specification
* Support tenant lock / unlock where specified

Use a data-first administrative layout.

---

# 22. SCR-72 — Pricing / Feature Flags

Purpose:

* Manage pricing configuration
* Manage feature flags

Only expose configuration capabilities defined by the specification.

Do not invent additional platform controls.

---

# 23. SCR-73 — APM / Security Logs

Purpose:

* Monitor platform performance / APM information
* Review security-related logs

This screen should prioritize:

* Traceability
* Readability
* Clear status
* Operational information

Avoid unnecessary visual decoration.

---

# 24. Shared Application Shell

Application domains may share common SmartOmni components.

Potential shared components include:

* GlassHeader
* GlassSidebar
* GlassNotification
* GlassDropdown
* PageHeader
* SearchInput
* FilterBar
* DataTable
* StatusBadge
* Toast
* ConfirmDialog
* GlassModal

Shared components must follow `DESIGN_SYSTEM.md`.

---

# 25. Application Header

The application header should provide the global context appropriate to the current application domain.

Potential elements include:

* SmartOmni branding
* Navigation
* Search
* Notifications
* User menu

Only implement elements supported by the relevant specification.

For appropriate application contexts, the header may use Liquid Glass.

---

# 26. Navigation Behavior

Navigation must follow:

`SmartOmni_Workflows_Navigation`

Do not change navigation relationships without explicit approval.

Do not invent new routes simply because they appear useful.

Every implemented route should correspond to a documented screen or an explicitly approved supporting route.

---

# 27. Role-based UI

UI visibility must respect the documented RBAC matrix.

Do not expose actions to users who are not authorized according to the specification.

Roles include:

* Customer
* Manager
* Tenant Admin
* Super Admin

Role permissions must come from the SmartOmni documentation.

Do not infer additional permissions.

---

# 28. Responsive Architecture

Each UI domain must have its own responsive strategy.

## Tenant Onboarding

Prioritize:

* Simple form layouts
* Clear progress
* Mobile readability

## Storefront

Prioritize:

* Product browsing
* Product imagery
* Simple navigation
* Mobile shopping experience

## Admin ERP

Prioritize:

* Data readability
* Table usability
* Filters
* Operational actions

On smaller screens, tables may require:

* Horizontal scrolling
* Responsive column prioritization
* Alternative compact presentation

Do not simply shrink dense tables until they become unusable.

## Super Admin

Prioritize:

* Operational readability
* Clear hierarchy
* Data visibility

---

# 29. Screen Composition Principle

Each screen should be composed from reusable primitives rather than independently designed from scratch.

General pattern:

```text
Application Shell
        ↓
Page Header
        ↓
Primary Content
        ↓
Supporting Content
        ↓
Actions / Feedback
```

However, the exact composition must be adapted to the purpose of each screen.

Do not force every screen into the same structure.

---

# 30. Visual Adaptation Principle

The four UI domains share one visual identity but have different information architectures.

Therefore:

Tenant Onboarding
→ focused and guided

Storefront
→ customer-friendly and product-oriented

Admin ERP
→ operational and data-first

Super Admin
→ platform-oriented and operational

All four should still feel unmistakably like SmartOmni.

---

# 31. Implementation Rule

Before implementing a screen, determine:

1. Which UI domain does it belong to?
2. Which user role accesses it?
3. Which specification defines its functionality?
4. Which workflow leads to it?
5. Which navigation items lead to it?
6. Which shared components can be reused?
7. Which Liquid Glass components are appropriate?
8. Which states must be supported?

Only then implement the screen.

---

# 32. No Business Logic Invention

UI architecture must never be used as a reason to invent business functionality.

If the documentation does not specify:

* A field
* An action
* A status
* A permission
* A workflow
* A route
* A business rule

do not invent one.

Use the minimum UI necessary to support the documented requirements.

---

# 33. Architecture Goal

The final SmartOmni interface should feel like one coherent system.

The relationship is:

```text
SCR-00 Landing Page
        ↓
Visual Identity
        ↓
DESIGN_SYSTEM.md
        ↓
Shared Components
        ↓
UI Architecture
        ↓
Individual Screens
```

At the same time:

```text
Functional Specifications
        ↓
Business Functionality
        ↓
Individual Screens
```

And:

```text
Workflow & Navigation Specification
        ↓
Routes + User Flows
        ↓
Individual Screens
```

These three layers must remain consistent.

---

# 34. Final Rule

Do not optimize for the number of screens.

Optimize for:

* Correct functionality
* Correct navigation
* Strong visual consistency
* Clear information architecture
* Reusable components
* Responsive usability
* Maintainable UI architecture

SmartOmni should feel designed as one product, not assembled from unrelated templates.

