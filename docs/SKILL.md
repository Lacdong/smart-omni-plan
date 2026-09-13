## STRICT FILE SEPARATION

Every page, section, component, and custom visual effect must have
separated JSX and CSS files whenever styling is specific to that
page/component.

Required pattern:

ComponentName/
├── ComponentName.jsx
└── ComponentName.css

Examples:

LandingPage/
├── LandingPage.jsx
└── LandingPage.css

HeroSection/
├── HeroSection.jsx
└── HeroSection.css

PricingSection/
├── PricingSection.jsx
└── PricingSection.css

GlassCard/
├── GlassCard.jsx
└── GlassCard.css


### Mandatory rules

1. NEVER place a large amount of page-specific CSS inside JSX.

2. NEVER use inline style objects for complex visual styling.

3. NEVER put all page-specific styles into one global CSS file.

4. Every custom animation must be defined in a CSS file.

5. Every custom gradient effect must be defined in a CSS file.

6. Every Liquid Glass effect must be defined in a CSS file.

7. Every pseudo-element (::before / ::after) must be defined in CSS.

8. Every custom hover/focus/transition effect should be defined in CSS
   when it is more than a simple Tailwind utility.

9. JSX should primarily contain:
   - React structure
   - component composition
   - data
   - state
   - event handlers
   - conditional rendering

10. CSS should contain:
   - custom visual effects
   - animations
   - gradients
   - shadows
   - pseudo-elements
   - glass effects
   - complex responsive behavior
   - component-specific visual rules

11. Tailwind may still be used for simple utilities such as:
   - flex
   - grid
   - padding
   - margin
   - gap
   - width/height
   - simple typography
   - simple responsive utilities

12. Do not create extremely long Tailwind class strings when a reusable
    CSS class would make the code significantly clearer.

13. Keep global CSS limited to:
   - reset
   - base typography
   - CSS variables/tokens
   - truly global utilities

14. Do not create a single giant CSS file for the entire application.

15. Do not create a single giant JSX file for an entire page.