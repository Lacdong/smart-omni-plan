# SmartOmni — Design System

## 1. Design Source of Truth

The provided SCR-00 Landing Page is the primary visual source of truth for SmartOmni.

The Landing Page establishes the visual identity, atmosphere, hierarchy, typography direction, color language, spacing philosophy and interaction style of the product.

All subsequent SmartOmni screens must inherit this visual identity.

Do NOT redesign the SmartOmni visual identity from scratch.

When implementing a new screen:

1. Follow the functional requirements from the SmartOmni specifications.
2. Follow the navigation and workflow requirements from the Workflow & Navigation specification.
3. Apply the visual language established by SCR-00.
4. Reuse the SmartOmni component system whenever possible.

---

# 2. Visual Identity

SmartOmni should feel:

- Premium
- Minimal
- Intelligent
- Modern
- Clean
- Calm
- Technical
- Trustworthy

The visual design should communicate an intelligent business platform rather than a generic administration template.

The interface should have strong visual hierarchy and generous whitespace.

Visual effects should be subtle and purposeful.

---

# 3. Visual Reference

Primary reference:

`references/SCR-00-Landing-Page.png`

When making visual decisions that are not explicitly specified elsewhere, inspect this reference first.

Use it to maintain consistency in:

- Overall composition
- Color relationships
- Typography hierarchy
- Button styling
- Border treatment
- Card treatment
- Spacing
- Visual density
- Glow effects
- Gradient usage
- General atmosphere

Do not copy the landing page layout literally into application screens.

Instead, preserve its visual language while adapting the layout to each screen's purpose.

---

# 4. Color System

## 4.1 Base Colors

Primary background:

- White
- Soft off-white

Primary text:

- Near-black

Secondary text:

- Cool gray

Borders:

- Very light cool gray

The base interface should remain visually light and clean.

---

## 4.2 Accent Colors

Primary accent family:

- Electric blue
- Blue-violet
- Violet

Accent colors should be used selectively for:

- Primary actions
- Active navigation
- Important indicators
- AI-related elements
- Focus states
- Selected states
- Key visual highlights

Do not use strong accent colors everywhere.

---

## 4.3 AI Color Language

AI-related UI should use a restrained combination of:

- Soft lavender
- Soft blue
- Blue-violet

AI visuals should feel intelligent and premium.

Avoid overly saturated neon colors.

Avoid cyberpunk aesthetics.

---

## 4.4 Semantic Colors

Success:

- Soft green

Warning:

- Soft amber

Error:

- Soft red

Information:

- Soft blue

Semantic colors should remain restrained and should not overpower the primary SmartOmni visual identity.

---

# 5. Typography

Typography should be:

- Clean
- Modern
- Highly readable
- Professional

Use a consistent typographic hierarchy.

Recommended hierarchy:

### Display / Hero

Large, bold, high visual impact.

Used primarily for landing-page-level hero sections.

### Page Title

Strong but significantly smaller than the landing page hero.

### Section Title

Medium-to-large emphasis.

### Body

Highly readable regular text.

### Supporting Text

Smaller cool-gray text used for descriptions, hints and metadata.

### Labels

Compact and clear.

Avoid excessive font-weight variation.

Do not use decorative or playful typography.

---

# 6. Spacing

SmartOmni should use generous spacing.

Prefer consistent spacing tokens rather than arbitrary margins.

Recommended base spacing system:

- 4px
- 8px
- 12px
- 16px
- 20px
- 24px
- 32px
- 40px
- 48px
- 64px
- 80px
- 96px

Use smaller spacing for dense operational UI and larger spacing for major sections.

Avoid visually crowded layouts.

---

# 7. Border Radius

Use moderate corner radii.

The interface should feel refined rather than excessively rounded.

Recommended direction:

- Small controls: 8–10px
- Inputs: 10–12px
- Buttons: 10–14px
- Cards: 14–18px
- Large visual containers: 18–24px

Do not make every component heavily pill-shaped.

Pill shapes should be reserved for:

- Tags
- Status badges
- Compact navigation elements
- Selected filters
- Small contextual controls

---

# 8. Borders

Borders should be subtle.

Preferred characteristics:

- Thin
- Low contrast
- Cool neutral tone
- Used to establish hierarchy

Do not use thick decorative borders.

Borders should support structure rather than become visual decoration.

---

# 9. Shadows

Shadows should be restrained.

Preferred shadow behavior:

- Soft
- Large blur
- Low opacity
- Used primarily for elevation

Avoid:

- Heavy black shadows
- Strong drop shadows
- Multiple competing shadows

The interface should remain visually light.

---

# 10. Gradients

Gradients are part of the SmartOmni visual language but must be used selectively.

Appropriate uses:

- Hero visual effects
- AI visual areas
- Large CTA sections
- Decorative background glow
- Subtle accent surfaces

Avoid:

- Gradient on every button
- Gradient on every card
- Gradient on every section
- Strong rainbow gradients
- Excessive decorative gradients

Gradients should enhance hierarchy, not replace it.

---

# 11. Glow Effects

Soft glow effects may be used to reproduce the atmosphere of SCR-00.

Preferred glow characteristics:

- Soft
- Diffused
- Low opacity
- Blue / violet / lavender oriented

Glow should remain behind content and should never reduce text readability.

---

# 12. Liquid Glass

## 12.1 Principle

Liquid Glass is a material system for selected elevated and floating UI components.

Liquid Glass is NOT the default surface of SmartOmni.

Do not make the entire application glassmorphic.

---

## 12.2 Appropriate Liquid Glass Components

Use Liquid Glass primarily for:

- Header
- Navigation
- Sidebar
- Notification panel
- Dropdown
- Command palette
- Modal / Dialog
- Toast
- Floating controls
- Floating contextual actions

---

## 12.3 Components That Should Generally Remain Solid

Do NOT automatically apply Liquid Glass to:

- Dense data tables
- Every card
- Every section
- Charts
- Forms
- Every input field
- Large content areas
- Product grids by default

Operational content should prioritize readability and information density.

---

## 12.4 Liquid Glass Visual Properties

A Liquid Glass surface should generally use:

- Translucent white
- Very subtle blue / violet tint
- Background blur
- Thin low-contrast border
- Soft shadow
- Subtle highlight
- High text contrast

The effect should feel:

- Light
- Premium
- Refined
- Modern

It should NOT feel:

- Heavy
- Foggy
- Milky
- Excessively transparent
- Distracting

---

## 12.5 Liquid Glass Hierarchy

Use different levels of visual elevation.

### Level 0 — Background

White / off-white.

### Level 1 — Normal Content

Solid white surfaces.

### Level 2 — Elevated Content

White surface with:

- Subtle border
- Very soft shadow

### Level 3 — Glass Navigation

Translucent white surface with:

- Backdrop blur
- Subtle border
- Soft shadow

### Level 4 — Glass Overlay

Used for:

- Modal
- Notification panel
- Dropdown
- Command palette

Use stronger blur and slightly higher opacity than Level 3.

---

## 12.6 Accessibility

The interface must remain usable when:

- Backdrop blur is unavailable
- Transparency is reduced
- Device performance is limited

Never rely on transparency alone to communicate hierarchy.

Text must remain readable against the background.

---

# 13. Header

The SmartOmni header should inherit the visual language of SCR-00.

For application interfaces, the header may use Liquid Glass.

Characteristics:

- Clean
- Lightweight
- Fixed or sticky when appropriate
- Strong alignment
- Minimal visual noise

Typical elements may include:

- SmartOmni branding
- Navigation
- Search
- Notifications
- User menu

Only include elements required by the relevant screen specification.

Do not invent additional header functionality.

---

# 14. Navigation

Navigation should be:

- Clear
- Predictable
- Minimal
- Consistent

Active navigation should be visually obvious through restrained use of:

- Accent color
- Background tint
- Typography weight
- Subtle indicator

Navigation should not become visually dominant.

---

# 15. Sidebar

The Admin ERP and Super Admin Console may use a sidebar when appropriate.

The sidebar should use the SmartOmni visual language.

Liquid Glass may be used for the sidebar.

Sidebar requirements:

- Clear hierarchy
- Group related navigation items
- Highlight the current location
- Avoid unnecessary icons or decorative elements
- Preserve readability

The sidebar layout must follow the navigation defined by the specifications.

---

# 16. Buttons

## Primary Button

Used for the most important action.

Characteristics:

- Blue / blue-violet accent
- Strong contrast
- Moderate radius
- Clear label
- No excessive shadow

## Secondary Button

Used for supporting actions.

Characteristics:

- Light or white surface
- Subtle border
- Strong readable text

## Ghost Button

Used for low-emphasis actions.

Characteristics:

- Transparent background
- Minimal border
- Subtle hover state

Do not use multiple competing primary buttons in one visual area.

---

# 17. Cards

Cards should be used to organize information, not simply to decorate the interface.

Preferred characteristics:

- White surface
- Thin border
- Moderate radius
- Very soft shadow when elevated
- Generous internal spacing

Do not place every piece of information inside a separate card.

Avoid excessive card nesting.

---

# 18. Data Tables

Admin ERP interfaces are data-first.

Tables should prioritize:

- Readability
- Alignment
- Scannability
- Status visibility
- Sorting / filtering where specified
- Clear row actions

Tables should generally use solid surfaces rather than Liquid Glass.

Avoid excessive decoration.

---

# 19. Forms

Forms should be:

- Simple
- Clear
- Structured
- Easy to scan

Inputs should prioritize usability over decoration.

Use:

- Clear labels
- Consistent spacing
- Visible focus states
- Clear validation states
- Helpful error messages

Do not automatically apply glass effects to every form field.

---

# 20. Status Badges

Status badges should use restrained semantic colors.

Examples:

- SUCCESS
- FAILED
- PENDING
- ACTIVE
- INACTIVE

Badges should be compact and easy to scan.

Do not use highly saturated colors unless necessary for visibility.

---

# 21. Notifications

SmartOmni should support a consistent notification experience.

Notification categories include:

- Order
- Inventory
- AI
- System
- Security
- Subscription

Notification panels may use Liquid Glass.

Each notification should clearly communicate:

- Category
- Short message
- Time / contextual information when required
- Read / unread state

Do not invent notification behavior beyond the specifications.

---

# 22. AI Components

AI components should feel distinct but still belong to the SmartOmni design system.

Recommended visual language:

- Soft lavender / blue background
- Subtle glow
- Clear hierarchy
- Strong recommendation text
- Supporting explanation
- Minimal decoration

Examples:

- AIInsightCard
- Demand Forecast
- AI Recommendation
- Inventory Alert

AI components should communicate useful business information rather than looking like decorative AI widgets.

---

# 23. Charts

Charts should prioritize:

- Data readability
- Clear hierarchy
- Minimal decoration
- Consistent typography
- Consistent accent usage

Do not automatically apply Liquid Glass to chart containers.

Charts should visually belong to the same SmartOmni system without becoming overly decorative.

---

# 24. Modal / Dialog

Modals may use Liquid Glass.

Characteristics:

- Clear hierarchy
- Strong readability
- Moderate radius
- Subtle blur
- Soft shadow
- Clear primary / secondary actions

Use modals for focused tasks such as:

- Confirmation
- Inventory adjustment
- Marketplace mapping
- Redirect confirmation

Only implement modal behavior supported by the specifications.

---

# 25. Loading States

Loading states should be minimal and calm.

Prefer:

- Skeletons
- Subtle progress indicators
- Contextual loading indicators

Avoid unnecessary animation.

---

# 26. Empty States

Empty states should:

- Explain what is missing
- Provide useful context
- Provide an action only when the workflow supports one

Do not invent actions simply to make the empty state more interactive.

---

# 27. Error States

Error states should:

- Clearly communicate the problem
- Explain what the user can do next when supported
- Use restrained semantic error styling

Do not hide important errors behind decorative UI.

---

# 28. Interaction States

Every interactive component should define appropriate:

- Default
- Hover
- Focus
- Active
- Disabled
- Loading
- Error
- Selected

states when applicable.

Interaction effects should remain subtle and consistent.

---

# 29. Animation

Animations should be:

- Short
- Smooth
- Purposeful
- Subtle

Good uses include:

- Modal entrance
- Dropdown entrance
- Navigation transitions
- Hover feedback
- Notification appearance
- Glass surface transitions

Avoid:

- Excessive bouncing
- Large movements
- Continuous decorative animation
- Distracting effects

---

# 30. Responsive Design

SmartOmni must support:

- Desktop
- Tablet
- Mobile

Responsive layouts must preserve:

- Information hierarchy
- Readability
- Navigation clarity
- Primary actions
- Visual identity

Do not simply scale down the desktop interface.

Adapt layouts where necessary.

---

# 31. Component Reuse

Create reusable components before implementing multiple screens.

Recommended shared components include:

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

Components should be reusable while allowing screen-specific composition.

Do not force every screen into an identical layout.

---

# 32. Visual Consistency Rule

When implementing any new screen, verify:

1. Does it look like it belongs to SmartOmni?
2. Does it inherit the visual language of SCR-00?
3. Is the color usage restrained?
4. Is the typography hierarchy consistent?
5. Is spacing consistent?
6. Are borders and shadows subtle?
7. Is Liquid Glass used only where appropriate?
8. Is the interface readable?
9. Is the screen appropriate for its specific user role?
10. Does the layout serve the screen's actual business purpose?

---

# 33. Anti-Pattern Rules

Do NOT create:

- Generic SaaS dashboard templates
- Bootstrap-like layouts
- Excessive glassmorphism
- Excessive gradients
- Excessive rounded cards
- Excessive shadows
- Neon cyberpunk UI
- Overly colorful dashboards
- Decorative AI elements with no business purpose
- Unnecessary animations
- Unnecessary icons
- Unnecessary components
- Unnecessary features

SmartOmni should remain visually sophisticated through restraint.

---

# 34. Final Design Principle

SmartOmni should feel like:

"One coherent product system."

The Landing Page establishes the brand.

The Design System translates that brand into reusable UI rules.

The application screens adapt those rules to real business workflows.

Therefore:

Visual identity comes from SCR-00.

Business functionality comes from the SmartOmni specifications.

Navigation and workflows come from the Workflow & Navigation specification.

Never sacrifice functional correctness for visual decoration.
Never sacrifice visual consistency when implementing functionality.