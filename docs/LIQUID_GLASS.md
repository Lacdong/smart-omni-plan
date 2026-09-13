# TASK: Upgrade Navigation Pill to Apple "Liquid Glass" Visual Spec

## 1. Objective & Design Delta
The current CSS implementation uses standard flat **glassmorphism** (`backdrop-filter: blur()`, linear gradients, flat box-shadows).

The goal is to upgrade this component to Apple's **Liquid Glass** standard:
* **Optical Refraction & Lensing:** Distort and bend light around pill edges rather than applying a flat uniform blur.
* **Curved 3-Layer Volume:** Separate distinct layers for **Highlight** (specular edge sheen), **Illumination** (inner light scattering/dome volume), and **Shadow** (contact bezel depth).
* **Fix "Glass-on-Glass" anti-patterns:** Strip nested `backdrop-filter` rules on child hover states and ensure text meets WCAG AA contrast (≥ 4.5:1).

┌─────────────────────────────────────────────────────────────┐
│ 1. HIGHLIGHT: Curved rim sheen + specular top edge          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 2. ILLUMINATION: Volumetric core + SVG lensing map    │  │
│  │    ┌────────────┐               ┌────────────┐        │  │
│  │    │  Nav Item  │               │ Hover Pill │        │  │
│  │    │ (Contrast) │               │ (Reflect)  │        │  │
│  │    └────────────┘               └────────────┘        │  │
│  └───────────────────────────────────────────────────────┘  │
│ 3. SHADOW: Multi-stop contact bezel + diffused drop-shadow  │
└─────────────────────────────────────────────────────────────┘

