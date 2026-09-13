# SmartOmni — UX Rules

## 1. Purpose

This document defines the UX rules that must be followed when designing and implementing the SmartOmni platform.

These rules ensure that all SmartOmni screens feel like one coherent product while maintaining the different information architectures required by each application domain.

---

# 2. UX Source of Truth

SmartOmni UX must follow three layers of information.

## 2.1 Functional Requirements

Functional requirements define:

- What the system does
- What users can do
- What data is required
- What business rules apply
- What permissions exist

Reference:

`SmartOmni_UC_Specification.pdf`

---

## 2.2 Workflow and Navigation

Workflow and navigation specifications define:

- User flows
- Screen relationships
- Navigation
- Route transitions
- Workflow sequences

Reference:

`SmartOmni_Workflows_Navigation.pdf`

---

## 2.3 Visual Identity

The SmartOmni Landing Page defines the primary visual identity.

Reference:

`references/SCR-00-Landing-Page.png`

All application domains should feel visually related to the Landing Page.

---

# 3. Core UX Principles

SmartOmni UX should follow these principles:

1. Clarity
2. Consistency
3. Simplicity
4. Data readability
5. Predictable interaction
6. Reusable patterns
7. Responsive usability
8. Appropriate visual hierarchy
9. Business-focused AI presentation
10. Minimal unnecessary decoration

The interface should feel premium without becoming visually complicated.

---

# 4. Product Experience Principle

SmartOmni should feel like one product.

However, different application domains should not be forced into the same information architecture.

The four domains are:

- Tenant Onboarding
- Storefront
- Admin ERP
- Super Admin

Each domain has a different UX priority.

---

# 5. Tenant Onboarding UX

## Goal

Help a new tenant complete onboarding with minimal confusion.

## UX Characteristics

The onboarding experience should be:

- Focused
- Guided
- Sequential
- Clear
- Low cognitive load

## Rules

- Keep the number of visible decisions low.
- Clearly communicate the current onboarding step.
- Clearly communicate what happens next.
- Avoid unnecessary navigation.
- Avoid unnecessary secondary actions.
- Preserve the documented onboarding workflow.

## Progress

When progress is part of the documented onboarding flow, communicate it clearly.

Do not invent additional onboarding stages.

---

# 6. Storefront UX

## Goal

Provide a simple customer-facing shopping experience.

## UX Characteristics

The Storefront should be:

- Product-oriented
- Customer-friendly
- Visual
- Simple
- Easy to navigate

## Priorities

Prioritize:

- Product discovery
- Product imagery
- Product information
- Simple navigation
- Marketplace purchasing context

## Rules

Do not use the dense operational UX patterns of the Admin ERP in the Storefront.

Avoid unnecessary administrative terminology.

---

# 7. Admin ERP UX

## Goal

Help users perform operational tasks efficiently.

## Primary Users

- Manager
- Tenant Admin

## UX Characteristics

The Admin ERP should be:

- Data-first
- Operational
- Efficient
- Structured
- Highly readable

## Priorities

Prioritize:

- Data
- Search
- Filtering
- Status
- Operational actions
- Tables
- Clear hierarchy

## Rules

Do not sacrifice data readability for decorative visual effects.

Dense operational interfaces should use solid surfaces.

---

# 8. Super Admin UX

## Goal

Provide platform-level operational visibility and administration.

## Primary User

Super Admin

## UX Characteristics

The Super Admin Console should be:

- Operational
- Structured
- Data-oriented
- Traceable
- Clear

## Priorities

Prioritize:

- Platform visibility
- Tenant management
- Configuration
- Performance information
- Security information
- Operational traceability

Avoid unnecessary decoration.

---

# 9. Navigation Rules

Navigation must follow:

`SmartOmni_Workflows_Navigation.pdf`

## Rules

- Do not invent routes.
- Do not remove documented routes.
- Do not change documented screen relationships.
- Do not create navigation paths simply because they seem useful.
- Every implemented route should correspond to a documented screen or an explicitly approved supporting route.

## Navigation Consistency

Navigation should remain predictable.

The same interaction pattern should produce the same type of result throughout the application.

---

# 10. Application Shell Rules

The application shell should provide consistent global context.

Potential shared elements include:

- Header
- Sidebar
- Notifications
- User menu
- Search
- Page header

Only show elements relevant to the current application domain and specification.

---

# 11. Header UX

The application header should provide clear global context.

Potential elements include:

- SmartOmni branding
- Navigation
- Search
- Notifications
- User menu

## Rules

- Keep the header visually lightweight.
- Maintain strong text readability.
- Do not overload the header.
- Keep important global actions easy to access.

## Liquid Glass

The header may use Liquid Glass.

The glass treatment should be subtle rather than visually dominant.

---

# 12. Sidebar UX

The sidebar should provide access to documented application areas.

## Rules

- Clearly indicate the current location.
- Keep navigation hierarchy understandable.
- Avoid excessive nesting.
- Do not expose unauthorized destinations.
- Follow the documented navigation structure.

## Liquid Glass

The sidebar may use Liquid Glass.

The navigation content must remain readable over the translucent surface.

---

# 13. Page Header UX

Each operational screen should provide a clear page header when appropriate.

The page header should establish:

- Current screen
- Context
- Relevant primary action where documented

Avoid unnecessary text.

Do not add unsupported actions.

---

# 14. Search UX

Search should be used where the specification defines or requires search functionality.

## Rules

- Keep search visually prominent enough to discover.
- Use clear placeholder text.
- Preserve the current search state where appropriate.
- Do not add unsupported search filters.
- Do not imply search capabilities that do not exist.

---

# 15. Filter UX

Filters should help users narrow operational data.

## Rules

- Group related filters.
- Avoid unnecessary filters.
- Make active filters understandable.
- Provide clear reset behavior where supported.
- Preserve readability.

Do not invent filter dimensions.

---

# 16. Table UX

Tables are important for Admin ERP and Super Admin interfaces.

## Rules

- Prioritize readability.
- Use clear column hierarchy.
- Keep important status information visible.
- Avoid excessive decoration.
- Maintain sufficient spacing.
- Avoid unnecessary borders.

## Liquid Glass

Do not apply Liquid Glass to the entire data table.

Use solid surfaces for dense data.

## Responsive Tables

On smaller screens, tables may use:

- Horizontal scrolling
- Responsive column prioritization
- Compact presentation

Do not shrink columns until information becomes unreadable.

---

# 17. Card UX

Cards should be used to group related information.

## Rules

- Each card should have a clear purpose.
- Avoid excessive card nesting.
- Avoid creating a card for every small piece of information.
- Maintain consistent spacing.
- Use cards to support hierarchy rather than decoration.

## Visual Treatment

Cards should normally use solid or elevated surfaces.

Liquid Glass should not be applied automatically to every card.

---

# 18. Liquid Glass UX Rules

Liquid Glass is a material system.

It is not the default surface for the entire application.

## Appropriate Uses

Liquid Glass is appropriate for:

- Header
- Sidebar
- Notification panel
- Dropdown
- Modal
- Dialog
- Toast
- Floating controls
- Other appropriate overlays

## Avoid

Do not use Liquid Glass for:

- Dense data tables
- Every card
- Every page section
- Every form field
- Charts by default
- Large amounts of dense content

---

# 19. Liquid Glass Visual Requirements

Liquid Glass surfaces should use:

- Translucent white
- Subtle blue / violet tint
- Backdrop blur
- Thin low-contrast border
- Soft shadow
- Subtle highlight
- Strong text readability

## Important Rule

Glass should support the content.

It should never compete with the content.

If the user cannot easily read the information because of transparency, reduce the glass effect.

---

# 20. Modal UX

Modals should be used for focused interactions.

Appropriate documented examples include:

- Inventory adjustment
- Marketplace mapping
- Marketplace redirect
- Confirmation interactions

## Rules

- Keep modal content focused.
- Use clear titles.
- Make the primary action obvious.
- Make cancellation or dismissal understandable.
- Do not place unrelated functionality inside a modal.
- Do not turn every interaction into a modal.

---

# 21. Form UX

Forms should be simple and structured.

## Rules

- Group related fields.
- Use clear labels.
- Maintain consistent spacing.
- Clearly indicate required information when applicable.
- Avoid unnecessary fields.
- Preserve the fields defined by the functional specification.

## Important Rule

Do not invent fields simply to make the form appear more complete.

---

# 22. Button UX

Buttons should communicate action hierarchy.

## Primary Action

Use the primary button for the most important documented action.

## Secondary Action

Use secondary buttons for supporting actions.

## Destructive Action

Use destructive styling only when the documented action is destructive.

Do not invent destructive actions.

## Rules

- Use concise labels.
- Make the action understandable.
- Avoid excessive button count.
- Avoid ambiguous labels.

---

# 23. Status UX

Statuses should be immediately understandable.

Use shared components such as:

`StatusBadge`

## Rules

- Keep status terminology consistent.
- Use the terminology defined by the specification.
- Do not invent additional statuses.
- Make operational states visually distinguishable.

Documented examples include:

- `SUCCESS`
- `FAILED`

---

# 24. Loading UX

Loading states should preserve the user's understanding of the interface.

## Rules

- Preserve layout stability.
- Avoid unnecessary movement.
- Avoid excessive animation.
- Clearly communicate that data is being loaded.
- Maintain the existing visual hierarchy.

Loading indicators should not dominate the screen.

---

# 25. Empty State UX

Empty states should explain why content is currently absent when appropriate.

## Rules

- Keep the message concise.
- Clearly explain the state.
- Show only documented next actions.
- Avoid decorative empty states that add no value.

Do not invent workflows to fill empty states.

---

# 26. Error UX

Errors should be clear and actionable when recovery is defined.

## Rules

- Clearly communicate what failed.
- Preserve relevant context.
- Avoid technical language when unnecessary.
- Provide a recovery action only when supported by the specification.
- Do not invent recovery workflows.

---

# 27. Confirmation UX

Confirmation should be used when an action requires explicit user confirmation according to the documented workflow.

## Rules

- Clearly identify the action.
- Explain important consequences when relevant.
- Provide a clear confirm action.
- Provide a clear cancel action.
- Do not add unnecessary confirmation steps.

---

# 28. Notification UX

Notifications should communicate relevant system information.

Potential categories include:

- Order
- Inventory
- AI
- System
- Security
- Subscription

Only implement categories and behaviors supported by the specification.

## Rules

- Notifications should be concise.
- Important information should be immediately visible.
- Avoid excessive notifications.
- Do not interrupt the user unnecessarily.

## Liquid Glass

Notification panels may use Liquid Glass.

---

# 29. AI UX

AI should support business understanding rather than become a decorative visual theme.

## AI Visual Language

Use:

- Soft lavender
- Soft blue
- Blue-violet accents
- Subtle glow

## AI Rules

- Keep AI insights understandable.
- Prioritize business interpretation.
- Keep charts readable.
- Avoid excessive futuristic effects.
- Avoid unnecessary animation.
- Avoid making every component look like an AI component.

AI should feel integrated into SmartOmni rather than added as a separate visual theme.

---

# 30. Chart UX

Charts should communicate information efficiently.

## Rules

- Prioritize readability.
- Use clear labels.
- Maintain sufficient contrast.
- Avoid unnecessary decorative effects.
- Avoid excessive gradients.
- Avoid visual clutter.
- Use charts only where they provide meaningful information.

Do not invent metrics or chart data.

All chart information must come from the SmartOmni specifications.

---

# 31. Responsive UX

SmartOmni must remain usable across:

- Desktop
- Tablet
- Mobile

Each domain should have its own responsive strategy.

---

## 31.1 Tenant Onboarding

Prioritize:

- Simple forms
- Clear progress
- Mobile readability

---

## 31.2 Storefront

Prioritize:

- Product browsing
- Product imagery
- Simple navigation
- Mobile shopping experience

---

## 31.3 Admin ERP

Prioritize:

- Data readability
- Table usability
- Filters
- Operational actions

Tables may use horizontal scrolling on smaller screens.

---

## 31.4 Super Admin

Prioritize:

- Operational readability
- Clear hierarchy
- Data visibility

---

# 32. Mobile UX

Mobile layouts should not simply be scaled-down desktop layouts.

## Rules

- Reorganize content when necessary.
- Preserve primary actions.
- Prioritize important information.
- Avoid horizontal overflow except where appropriate for dense tables.
- Maintain readable text sizes.
- Preserve interaction accessibility.

---

# 33. Accessibility Rules

The interface should maintain accessible interaction patterns.

## Rules

- Maintain readable contrast.
- Do not rely only on color to communicate status.
- Make interactive elements clearly identifiable.
- Maintain keyboard accessibility where applicable.
- Ensure text remains readable over glass surfaces.
- Do not rely solely on blur or transparency to communicate hierarchy.

---

# 34. Interaction Consistency

The same type of action should behave consistently throughout SmartOmni.

Examples:

- Search behaves consistently.
- Filters behave consistently.
- Modals behave consistently.
- Notifications behave consistently.
- Status badges behave consistently.
- Primary buttons use consistent hierarchy.

Shared components should be preferred over duplicated implementations.

---

# 35. Animation Rules

Animation should support usability.

## Rules

- Keep animations subtle.
- Avoid excessive motion.
- Avoid distracting effects.
- Avoid unnecessary parallax.
- Avoid animations that slow down operational tasks.

Animations should never interfere with:

- Reading
- Data entry
- Navigation
- Decision making

---

# 36. Visual Hierarchy

Every screen should have a clear hierarchy.

The user should quickly understand:

1. Where they are
2. What the screen is for
3. What information matters
4. What action is available
5. What happened after an action

Do not allow decorative elements to compete with important information.

---

# 37. Spacing Rules

Use the spacing system defined in:

`DESIGN_SYSTEM.md`

## Rules

- Maintain consistent spacing.
- Use whitespace to establish hierarchy.
- Avoid overly compressed layouts.
- Avoid excessive empty space inside dense operational screens.

Spacing should reflect the information architecture of the screen.

---

# 38. Typography Rules

Typography must follow:

`DESIGN_SYSTEM.md`

## Rules

- Use consistent type hierarchy.
- Maintain readable body text.
- Use stronger typography for important headings.
- Avoid excessive font-size variation.
- Avoid decorative typography that conflicts with the SmartOmni Landing Page.

---

# 39. Color Rules

The primary visual language should remain consistent with the SmartOmni Landing Page.

General visual direction:

- White
- Off-white
- Black / dark typography
- Blue
- Violet
- Soft lavender
- Soft blue

## Rules

Do not introduce unrelated color systems.

Use accent colors intentionally.

Do not make every element colorful.

---

# 40. Shadow and Border Rules

Use shadows and borders to establish hierarchy.

## Rules

- Prefer subtle shadows.
- Prefer thin borders.
- Avoid heavy outlines.
- Avoid excessive elevation.
- Avoid excessive glow.

The interface should remain refined and lightweight.

---

# 41. Role-Based UX

The interface must adapt to the user's documented role.

Roles include:

- Customer
- Manager
- Tenant Admin
- Super Admin

## Rules

- Show only authorized actions.
- Show only relevant navigation.
- Do not expose administrative controls to customers.
- Do not expose Super Admin controls to tenant users.
- Do not infer permissions.

---

# 42. Business Logic Protection

UX implementation must not modify business logic.

The UI must preserve documented system behavior.

Do not:

- Change workflow logic
- Change calculation logic
- Change inventory rules
- Change permissions
- Change synchronization behavior
- Change forecasting logic
- Change marketplace behavior

The UI is an interface layer, not a reason to redesign business rules.

---

# 43. No Feature Invention

If the specification does not define:

- A feature
- A field
- An action
- A route
- A permission
- A status
- A workflow
- A metric
- A business rule

Do not invent it.

Use the minimum UI necessary.

---

# 44. Browser Verification

Every implemented screen should be verified in the browser.

## Verification Process

1. Start the application.
2. Open the implemented screen.
3. Verify the route.
4. Verify navigation.
5. Verify the primary interaction.
6. Verify responsive behavior.
7. Check loading states.
8. Check empty states where applicable.
9. Check error states where applicable.
10. Check console / runtime errors.
11. Compare the visual result with the SmartOmni design system.
12. Fix inconsistencies.
13. Re-check the screen.

---

# 45. Visual Consistency Check

After implementing each screen, verify:

- Typography
- Spacing
- Alignment
- Border radius
- Border treatment
- Shadows
- Colors
- Component consistency
- Liquid Glass treatment
- Responsive behavior

The screen should look like it belongs to SmartOmni.

---

# 46. Landing Page Consistency Rule

The Landing Page is the visual anchor of the entire product.

However, internal application screens should not simply copy the Landing Page layout.

Instead:

```text
Landing Page
      ↓
Visual Identity
      ↓
Design System
      ↓
Shared Components
      ↓
Domain-specific UX
      ↓
Individual Screens
````

The result should share the same visual DNA while using the correct information architecture for each domain.

---

# 47. Domain Adaptation Rule

The same SmartOmni visual identity should be adapted differently for each domain.

## Tenant Onboarding

Focused and guided.

## Storefront

Customer-friendly and product-oriented.

## Admin ERP

Operational and data-first.

## Super Admin

Platform-oriented and operational.

Do not force one layout onto all four domains.

---

# 48. Component Reuse Rule

Prefer reusable components over independent screen implementations.

For example:

```text
Shared Component
       ↓
Design System
       ↓
Multiple Screens
```

Instead of:

```text
Screen A → custom component
Screen B → different custom component
Screen C → another custom component
```

This improves consistency and maintainability.

---

# 49. Supporting State Rule

Each interactive screen should consider the states relevant to its documented functionality.

Potential states include:

* Default
* Loading
* Empty
* Error
* Success
* Failed
* Disabled
* Active

Only implement states that are meaningful for the screen.

Do not invent unsupported business states.

---

# 50. UX Quality Gate

Before considering a screen complete, verify:

## Functional

* [ ] Functionality matches the specification.
* [ ] Business rules are preserved.
* [ ] No unsupported functionality was added.

## Navigation

* [ ] Route is documented.
* [ ] Navigation follows the workflow specification.
* [ ] No unauthorized route is exposed.

## Visual

* [ ] Landing Page visual identity is preserved.
* [ ] Design System is followed.
* [ ] Typography is consistent.
* [ ] Spacing is consistent.
* [ ] Colors are consistent.
* [ ] Glass effects are appropriate.

## Interaction

* [ ] Primary action is clear.
* [ ] States are handled.
* [ ] Feedback is understandable.
* [ ] Interactions are consistent.

## Responsive

* [ ] Desktop works.
* [ ] Tablet works.
* [ ] Mobile works.
* [ ] Tables remain usable.

## Technical

* [ ] No console errors.
* [ ] No obvious runtime errors.
* [ ] Shared components are reused.
* [ ] No unnecessary duplicated UI logic.

---

# 51. Final UX Rule

SmartOmni must not feel like a collection of unrelated UI templates.

The final experience should communicate:

```text
One Product
    ↓
One Visual Identity
    ↓
One Design System
    ↓
Reusable Components
    ↓
Domain-specific UX
    ↓
Consistent User Experience
```

The goal is not to make every screen identical.

The goal is to make every screen feel like it belongs to the same SmartOmni product.

