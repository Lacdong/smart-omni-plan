# SmartOmni — Screen Specification

## 1. Purpose

This document defines the screen-level UI specification for the SmartOmni platform.

It translates the functional specifications and workflow/navigation specifications into implementable screen requirements.

This document is the screen-level source of truth for UI implementation.

---

## 2. Source of Truth

SmartOmni uses three primary sources of truth.

### 2.1 Functional Specifications

Functional specifications define:

- Business functionality
- User actions
- Data requirements
- Business rules
- Permissions
- System behavior

Reference:

`SmartOmni_UC_Specification.pdf`

---

### 2.2 Workflow & Navigation Specification

The workflow and navigation specification defines:

- Screen relationships
- User flows
- Navigation
- Workflow sequences
- Screen transitions

Reference:

`SmartOmni_Workflows_Navigation.pdf`

---

### 2.3 Visual Source of Truth

The SmartOmni Landing Page defines the primary visual identity.

Reference:

`references/SCR-00-Landing-Page.png`

The implementation should inherit:

- Typography
- Spacing
- Color language
- Visual hierarchy
- Border treatment
- Shadow treatment
- Blue and violet accent language
- Overall premium SaaS aesthetic

---

## 3. General Implementation Rules

### 3.1 No Business Logic Invention

Do not invent:

- Fields
- Actions
- Business rules
- Permissions
- Statuses
- Routes
- Workflows
- Metrics
- Data

If the documentation does not specify something, use the minimum UI necessary to support the documented requirements.

---

### 3.2 Reuse Shared Components

Screens should use shared SmartOmni components whenever possible.

Potential shared components include:

- `GlassHeader`
- `GlassSidebar`
- `GlassNotification`
- `GlassDropdown`
- `GlassModal`
- `PageHeader`
- `SearchInput`
- `FilterBar`
- `DataTable`
- `StatusBadge`
- `Toast`
- `ConfirmDialog`
- `StatCard`
- `ChartCard`
- `AIInsightCard`

Shared components must follow `DESIGN_SYSTEM.md`.

---

### 3.3 Role-Based UI

UI visibility must follow the documented RBAC matrix.

Roles:

- Customer
- Manager
- Tenant Admin
- Super Admin

Do not expose unauthorized actions.

---

# 4. Domain 1 — Tenant Onboarding Portal

## 4.1 SCR-00 — Landing Page

### Purpose

Provide the public entry point for SmartOmni.

### Primary User

Public / prospective tenant user.

### Visual Reference

The provided SmartOmni Landing Page is the primary visual reference for the entire product.

### Required Visual Characteristics

- Premium SaaS presentation
- White / off-white background
- Black primary typography
- Blue and violet accents
- Soft gradients and glow
- Generous whitespace
- Clean navigation
- Restrained shadows
- Thin borders
- Modern typography

### Main Areas

- SmartOmni branding
- Product navigation
- Hero section
- Primary CTA
- Secondary CTA
- Integration section
- Core enterprise value section
- AI demand prediction section
- Pricing section
- CTA section
- Footer

### Navigation

Navigation must follow the documented workflow and navigation specification.

Do not invent additional routes.

---

## 4.2 SCR-01 — Registration

### Purpose

Allow a new tenant to begin the SmartOmni onboarding process.

### Primary User

Tenant Admin.

### UI Principles

The registration interface should be:

- Focused
- Simple
- Guided
- Easy to understand
- Consistent with the SmartOmni visual identity

### Required Behavior

Implement only the registration behavior defined by the functional specification.

### Navigation

Follow the onboarding workflow defined in:

`SmartOmni_Workflows_Navigation.pdf`

Do not change the documented flow.

---

## 4.3 SCR-02 — Plan Selection

### Purpose

Allow the tenant to select the appropriate SmartOmni plan during onboarding.

### Primary User

Tenant Admin.

### UI Principles

Plan options should be presented clearly.

The interface should communicate the plan information defined by the specification.

### Business Rules

Use only the plan rules defined by the SmartOmni specification.

Do not invent:

- Additional plans
- Additional pricing rules
- Additional benefits
- Additional limitations

### Navigation

Follow the documented onboarding workflow.

---

## 4.4 SCR-03 — Marketplace Connection

### Purpose

Connect supported marketplace platforms during tenant onboarding.

### Primary User

Tenant Admin.

### Supported Marketplace Context

- Shopee
- TikTok Shop

### UI Principles

The connection interface should clearly communicate:

- Marketplace context
- Connection state
- Required interaction
- Next onboarding step

### Business Logic

Follow the marketplace API connection workflow defined by the specification.

Do not invent additional integrations.

---

## 4.5 SCR-04 — Initial Import Configuration

### Purpose

Configure the initial import process after marketplace connection.

### Primary User

Tenant Admin.

### UI Principles

The interface should guide the tenant through the documented initial import configuration.

### Business Logic

Follow the functional specification.

Do not invent additional import options.

---

## 4.6 SCR-05 — Completion / Redirect

### Purpose

Complete tenant onboarding and redirect the tenant to the appropriate application destination.

### Primary User

Tenant Admin.

### UI Principles

The screen should clearly communicate:

- Onboarding completion
- Next destination
- Relevant completion feedback

### Navigation

Follow the documented onboarding workflow.

Do not invent additional destinations.

---

# 5. Domain 2 — Admin ERP Dashboard

## 5.1 SCR-10 — BI Dashboard

### Purpose

Provide the main operational dashboard for the tenant.

### Primary Users

- Manager
- Tenant Admin

### UI Principles

The dashboard should be:

- Data-first
- Operational
- Easy to scan
- Consistent with SmartOmni visual identity

### Content

Display only metrics and information defined by the SmartOmni specifications.

### Important Rule

Do not invent dashboard metrics.

All metrics and data must come from the SmartOmni specifications.

### Recommended Structure

```text
Application Header
        ↓
Sidebar
        ↓
Page Header
        ↓
Dashboard Content
        ↓
Operational / AI Information
````

The exact content must follow the functional specification.

---

## 5.2 SCR-19 — Staff / Subscription

### Purpose

Provide Tenant Admin functionality related to staff and subscription management where defined by the SmartOmni specification.

### Primary User

Tenant Admin.

### Business Logic

Use only the functionality defined by the SmartOmni specifications.

Do not invent additional staff permissions or subscription rules.

### RBAC

Tenant Admin has full access according to the documented RBAC matrix.

---

## 5.3 SCR-30 — Multi-channel Order Management

### Purpose

Manage orders across supported marketplace channels.

### Primary Users

* Manager
* Tenant Admin

### UI Principle

The layout should be data-first.

### Recommended Structure

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

### Data Presentation

The order table should prioritize:

* Readability
* Identification
* Status visibility
* Relevant operational information

Only display fields defined by the functional specification.

### Visual Treatment

Use solid surfaces for dense data.

Do not use Liquid Glass for the entire table.

Liquid Glass may be used for:

* Header
* Sidebar
* Dropdowns
* Notifications
* Modals

---

## 5.4 SCR-31 — Order Detail

### Purpose

Display detailed information about a selected order.

### Primary Users

* Manager
* Tenant Admin

### Information Hierarchy

The layout should establish a clear hierarchy between:

* Order information
* Customer-related information where specified
* Product / SKU information
* Shipping information
* Order status
* Relevant actions

### Actions

Only implement actions explicitly defined by the specification.

Do not add unsupported order actions.

### Navigation

The screen should be reachable through the documented order management workflow.

---

## 5.5 SCR-40 — Inventory

### Purpose

Provide an overview of inventory.

### Primary Users

* Manager
* Tenant Admin

### Required Inventory Information

The screen should clearly communicate:

* Actual stock
* Available stock
* Reserved stock

### Recommended Structure

```text
Application Header
        ↓
Sidebar
        ↓
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

### UI Principles

Prioritize:

* Data readability
* Clear stock information
* Easy identification of inventory records
* Operational usability

Use solid surfaces for the dense inventory table.

---

## 5.6 SCR-41 — Inventory Adjustment

### Purpose

Allow an authorized user to adjust inventory.

### Primary Users

* Manager
* Tenant Admin

### Interaction Type

Focused operational interaction.

The adjustment UI may be implemented as a modal or dialog.

### Required Information

The adjustment flow includes:

* Current quantity
* New quantity
* Adjustment reason

### Supported Reasons

* Restock
* Inventory
* Shrinkage

### Recommended Structure

```text
Inventory Adjustment
        ↓
Current Quantity
        ↓
New Quantity
        ↓
Adjustment Reason
        ↓
Save / Confirmation
```

### Business Workflow

The implementation must preserve the documented:

* Optimistic concurrency
* Redis lock
* Outbox workflow

Do not modify the business logic.

### Visual Treatment

Liquid Glass may be applied to the modal surface according to:

`DESIGN_SYSTEM.md`

---

## 5.7 SCR-42 — Inventory Logs

### Purpose

Display inventory adjustment and synchronization logs.

### Primary Users

* Manager
* Tenant Admin

### Required Result States

The interface should clearly communicate operation results such as:

* `SUCCESS`
* `FAILED`

### UI Principles

Prioritize:

* Operational traceability
* Readability
* Clear status
* Relevant log information

Avoid unnecessary decoration.

---

## 5.8 SCR-50 — Product Catalog

### Purpose

Manage SmartOmni products and SKUs.

### Primary Users

* Manager
* Tenant Admin

### Main Priorities

The screen should prioritize:

* Product visibility
* SKU identification
* Product status
* Search / filtering
* Product actions

### Layout

Use a data-first layout.

### Recommended Structure

```text
Application Header
        ↓
Sidebar
        ↓
Page Header
        ↓
Search / Filter Area
        ↓
Product Data Table / Grid
        ↓
Product Actions
```

Only display product information defined by the specification.

---

## 5.9 SCR-51 — Product Create / Edit

### Purpose

Create or edit a product.

### Primary Users

* Manager
* Tenant Admin

### Documented Product Information

The interface includes:

* Product name
* SKU
* Attributes
* Price
* Product image / asset upload

### Image Assets

Image assets may use S3 according to the system specification.

### Important Rule

Do not invent additional product fields.

Do not add unsupported product configuration.

### UI Principles

The form should be:

* Clear
* Structured
* Easy to scan
* Consistent with the SmartOmni design system

---

## 5.10 SCR-52 — Marketplace Mapping

### Purpose

Map a SmartOmni product to marketplace listings.

### Primary Users

* Manager
* Tenant Admin

### Supported Marketplace Context

* Shopee
* TikTok Shop

### Documented Interaction

The workflow includes marketplace URL mapping.

### UI Implementation

This interaction may be implemented as a modal.

### Recommended Structure

```text
Marketplace Mapping
        ↓
Marketplace Context
        ↓
Marketplace URL
        ↓
Mapping Action
```

Do not invent additional marketplace mapping logic.

---

## 5.11 SCR-60 — AI Demand Forecasting

### Purpose

Provide AI-powered demand forecasting.

### Primary Users

* Manager
* Tenant Admin

### UI Principle

AI information should be understandable and business-focused.

The screen should communicate AI insights without becoming visually excessive.

### Recommended Visual Language

* Soft lavender
* Soft blue
* Blue-violet accents
* Subtle glow

### Important Rule

The AI visual language must remain consistent with the SmartOmni Landing Page.

Do not turn the screen into a generic AI dashboard.

---

## 5.12 SCR-61 — Forecast / Recommendations

### Purpose

Display demand forecasting charts and AI recommendations.

### Primary Users

* Manager
* Tenant Admin

### Main Priorities

The screen should prioritize:

* Forecast information
* Charts
* Recommendations
* Business interpretation

### Chart Principles

Charts must be:

* Readable
* Informative
* Business-oriented
* Visually consistent

Do not add unnecessary decorative chart effects.

---

## 5.13 SCR-62 — Mega Sale

### Purpose

Support the Mega Sale forecasting and planning workflow defined by the SmartOmni specification.

### Primary Users

* Manager
* Tenant Admin

### Implementation Rule

Follow the documented Mega Sale workflow.

Do not invent:

* Additional forecasting logic
* Additional business rules
* Additional calculations
* Unsupported actions

---

# 6. Domain 3 — Storefront Web

## 6.1 SCR-20 — Storefront Home / Catalog

### Purpose

Provide the customer-facing storefront experience.

### Primary Role

Customer.

### Main Priorities

* Product browsing
* Product imagery
* Simple navigation
* Customer-friendly presentation

### UI Principles

The Storefront should inherit the SmartOmni visual identity while adapting it for customer shopping.

It should not use the dense operational layout of the Admin ERP.

---

## 6.2 SCR-21 — Product Detail

### Purpose

Display detailed information about a selected product.

### Primary Role

Customer.

### Main Priorities

* Product information
* Product imagery
* SKU / relevant product information where specified
* Marketplace purchasing context where applicable

### UI Principles

The screen should be product-oriented and customer-friendly.

Do not add unsupported product actions.

---

## 6.3 SCR-22 — Marketplace Redirect Modal

### Purpose

Inform the customer before redirecting to a marketplace.

### Primary Role

Customer.

### Supported Marketplace Context

* Shopee
* TikTok Shop

### UI Implementation

This interaction may use a modal.

The modal should clearly communicate:

* Marketplace destination
* Redirect context
* Relevant confirmation action

Do not invent additional redirect behavior.

### Visual Treatment

Liquid Glass may be used for the modal surface according to `DESIGN_SYSTEM.md`.

---

## 6.4 SCR-23 — Cross-platform Order Lookup

### Purpose

Allow customers to look up order information across supported marketplace platforms.

### Primary Role

Customer.

### Other Permitted Roles

* Manager
* Tenant Admin

according to the documented RBAC matrix.

### UI Principles

Prioritize:

* Clear lookup interaction
* Readable result
* Marketplace context
* Order information defined by the specification

Do not expose unsupported information.

---

# 7. Domain 4 — Super Admin Console

## 7.1 SCR-70 — SaaS Dashboard

### Purpose

Provide a platform-level overview.

### Primary Role

Super Admin.

### Main Priorities

* Platform metrics
* Operational information
* System-level visibility

### Important Rule

All metrics must come from the SmartOmni specifications.

Do not invent platform metrics.

### Visual Principle

The screen should feel like SmartOmni while clearly being a platform administration interface.

---

## 7.2 SCR-71 — Tenant Management

### Purpose

Manage SmartOmni tenants.

### Primary Role

Super Admin.

### Documented Capabilities

* Tenant management
* Tenant-level administration defined by the specification
* Tenant lock / unlock where specified

### UI Principle

Use a data-first administrative layout.

Do not invent additional tenant controls.

---

## 7.3 SCR-72 — Pricing / Feature Flags

### Purpose

Manage platform pricing configuration and feature flags.

### Primary Role

Super Admin.

### Documented Capabilities

* Pricing configuration
* Feature flags

### Important Rule

Only expose configuration capabilities defined by the specification.

Do not invent additional platform controls.

---

## 7.4 SCR-73 — APM / Security Logs

### Purpose

Monitor platform performance and review security-related logs.

### Primary Role

Super Admin.

### Main Priorities

* Traceability
* Readability
* Clear status
* Operational information

### UI Principles

The interface should prioritize information density and operational clarity.

Avoid unnecessary visual decoration.

---

# 8. Shared Application Shell

## Purpose

Provide consistent navigation and global interaction patterns across application domains.

## Shared Components

Potential shared components include:

* `GlassHeader`
* `GlassSidebar`
* `GlassNotification`
* `GlassDropdown`
* `PageHeader`
* `SearchInput`
* `FilterBar`
* `DataTable`
* `StatusBadge`
* `Toast`
* `ConfirmDialog`
* `GlassModal`

All shared components must follow:

`DESIGN_SYSTEM.md`

---

# 9. Application Header

## Purpose

Provide global application context.

## Potential Elements

Depending on the application domain and specification:

* SmartOmni branding
* Navigation
* Search
* Notifications
* User menu

Only implement elements supported by the relevant specification.

## Liquid Glass

The header may use Liquid Glass where appropriate.

The glass treatment should remain:

* Subtle
* Readable
* Lightweight
* Consistent with the SmartOmni visual system

---

# 10. Sidebar Navigation

## Purpose

Provide navigation between documented application screens.

## Rules

Navigation must follow:

`SmartOmni_Workflows_Navigation.pdf`

Do not:

* Add undocumented routes
* Change route relationships
* Invent navigation items

## Visual Treatment

The sidebar may use Liquid Glass.

However, the content itself should remain highly readable.

---

# 11. Notification System

## Purpose

Provide relevant system feedback and notifications.

## Potential Categories

* Order
* Inventory
* AI
* System
* Security
* Subscription

Only implement notification categories and behaviors supported by the specification.

## Visual Treatment

Notifications may use Liquid Glass.

Use strong readability and clear hierarchy.

---

# 12. Modal / Dialog System

## Purpose

Provide focused interactions without unnecessarily navigating away from the current screen.

## Appropriate Use Cases

Examples include documented interactions such as:

* Inventory adjustment
* Marketplace mapping
* Marketplace redirect
* Confirmation interactions

## Visual Treatment

Modals may use Liquid Glass according to `DESIGN_SYSTEM.md`.

## Important Rule

Do not turn every interaction into a modal.

Use a modal only when appropriate to the documented workflow.

---

# 13. Data Table Rules

Dense operational data should use solid surfaces.

## Rules

* Prioritize readability
* Use clear column hierarchy
* Keep status visible
* Avoid excessive decoration
* Avoid full-table glass effects
* Preserve usability on smaller screens

## Responsive Behavior

On smaller screens, tables may use:

* Horizontal scrolling
* Responsive column prioritization
* Compact presentation

Do not simply shrink the table until it becomes unusable.

---

# 14. Loading States

Every screen that requires asynchronous data should provide an appropriate loading state where required by the implementation.

## Principles

* Preserve layout stability
* Avoid unnecessary animation
* Clearly communicate that content is loading
* Follow SmartOmni visual language

Do not invent business behavior.

---

# 15. Empty States

When a documented screen can legitimately have no records, provide an appropriate empty state.

## Principles

* Explain the current state clearly
* Keep the interface minimal
* Provide only documented next actions

Do not invent actions simply to fill an empty state.

---

# 16. Error States

Error states should clearly communicate operational failure.

## Principles

* Clear message
* Relevant context
* Appropriate recovery action where defined
* Consistent visual treatment

Do not invent recovery workflows.

---

# 17. Success / Failure States

Where the specification defines operation results, clearly communicate them.

Examples include:

* `SUCCESS`
* `FAILED`

Use consistent status components such as `StatusBadge`.

---

# 18. Responsive Requirements

## Tenant Onboarding

Prioritize:

* Simple forms
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

Tables may require horizontal scrolling on smaller screens.

## Super Admin

Prioritize:

* Operational readability
* Clear hierarchy
* Data visibility

---

# 19. Liquid Glass Usage Rules

Liquid Glass is a material and component system, not the default surface for every UI element.

## Appropriate Usage

Use Liquid Glass primarily for:

* Header
* Sidebar
* Notification panel
* Dropdown
* Command-style overlays where documented
* Modal
* Toast
* Floating controls

## Avoid

Do not use Liquid Glass for:

* Dense data tables
* Every card
* Every page section
* Every form field
* Charts by default

## Visual Requirements

Liquid Glass should use:

* Translucent white surface
* Subtle blue / violet tint
* Backdrop blur
* Thin low-contrast border
* Soft shadow
* Subtle highlight
* High text readability

The interface must remain usable when transparency or blur is reduced or unavailable.

---

# 20. Role-Based Screen Access

The documented role model is:

| Screen / Domain | Customer | Manager | Tenant Admin | Super Admin |
| --------------- | -------: | ------: | -----------: | ----------: |
| SCR-00–05       |        — |       — |         Full |           — |
| SCR-20          |     Full |    View |         View |        View |
| SCR-21          |     Full |    View |         View |        View |
| SCR-22          |     Full |       — |            — |           — |
| SCR-23          |     Full |    View |         View |           — |
| SCR-10          |        — |    View |         Full |           — |
| SCR-30–31       |        — |    Full |         Full |           — |
| SCR-40–42       |        — |    Full |         Full |           — |
| SCR-50–52       |        — |    Full |         Full |           — |
| SCR-60–62       |        — |    View |         Full |           — |
| SCR-19          |        — |       — |         Full |           — |
| SCR-70–73       |        — |       — |            — |        Full |

This matrix must follow the SmartOmni documentation.

Do not infer additional permissions.

---

# 21. Screen Implementation Checklist

Before implementing any screen, verify the following.

## Architecture

* [ ] Correct UI domain
* [ ] Correct role
* [ ] Correct route
* [ ] Correct navigation relationship

## Functionality

* [ ] Functional requirements identified
* [ ] Required fields identified
* [ ] Required actions identified
* [ ] Business rules preserved
* [ ] No invented functionality

## UI

* [ ] SmartOmni visual identity preserved
* [ ] Correct typography
* [ ] Correct spacing
* [ ] Correct surfaces
* [ ] Correct component reuse
* [ ] Appropriate Liquid Glass usage

## States

* [ ] Loading state where required
* [ ] Empty state where applicable
* [ ] Error state where applicable
* [ ] Success / failure state where applicable

## Responsive

* [ ] Desktop layout
* [ ] Tablet behavior
* [ ] Mobile behavior
* [ ] Dense tables remain usable

## Verification

* [ ] Run application
* [ ] Open screen in browser
* [ ] Verify navigation
* [ ] Verify interactions
* [ ] Compare visual result with SmartOmni visual system
* [ ] Check console / runtime errors
* [ ] Fix inconsistencies before moving to the next screen

---

# 22. Final Screen Specification Rule

Every SmartOmni screen must satisfy three layers simultaneously.

### Functional Layer

```text
Functional Specification
        ↓
Business Functionality
        ↓
Screen Implementation
```

### Navigation Layer

```text
Workflow & Navigation
        ↓
Routes + User Flows
        ↓
Screen Implementation
```

### Visual Layer

```text
SCR-00 Landing Page
        ↓
Visual Identity
        ↓
Design System
        ↓
Shared Components
        ↓
Screen Implementation
```

The final implementation must remain consistent across all three layers.

SmartOmni should feel like one coherent product rather than a collection of unrelated templates.

