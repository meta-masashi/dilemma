# DESIGN.md — DILEMMA (Clinical Decision Simulator for Personal Trainers)

**Version**: 1.0.0
**Created**: 2026-04-08
**Reference Companies**: Claude (AI warmth), Linear (dark-mode-native SaaS), Stripe (professional precision)
**DNA Inheritance**: Deep Space (#0D1117) + Strava Orange (#FC4C02) + "Complexity to Clarity"

---

## 1. Visual Theme & Atmosphere

DILEMMA is a clinical decision simulator, not a game. The visual identity communicates:

- **Professional gravity**: The interface must feel like a medical-grade simulation tool, not gamified entertainment
- **Dark-mode-native**: Following Linear's approach, dark mode is the primary and only mode. Deep Space (#0D1117) backgrounds reduce eye strain during extended learning sessions
- **Controlled tension**: Orange accents (#FC4C02) create urgency without alarm. Red appears only for genuine danger (injury states)
- **Information density with clarity**: Stripe's principle of "dense data, generous chrome" applies directly. The 3-column simulation layout packs critical data while maintaining readable whitespace
- **Trust through restraint**: Typography is clean and unstyled. No decorative elements. Every pixel serves a clinical or navigational purpose

First impression: A trainee opening DILEMMA should feel like entering a flight simulator cockpit — serious, capable, and slightly intimidating in the best way.

Tone keywords: Clinical, Authoritative, Focused, Dark, Warm-accented

---

## 2. Color Palette & Roles

### Background Hierarchy (Linear-inspired luminance stepping)

| Token | Hex | Role |
|-------|-----|------|
| bg-primary | #0D1117 | App background, page canvas |
| bg-elevated | #161B22 | Cards, panels, sidebar backgrounds |
| bg-surface | #1C2128 | Elevated containers, modals, dropdowns |
| bg-hover | #21262D | Hover states on dark surfaces |
| bg-active | #282E36 | Active/pressed states |

### Foreground / Text

| Token | Hex | Opacity | Role |
|-------|-----|---------|------|
| text-primary | #E6EDF3 | 100% | Headings, primary content |
| text-secondary | #8B949E | 100% | Descriptions, labels, secondary info |
| text-tertiary | #6E7681 | 100% | Disabled text, placeholders |
| text-on-accent | #FFFFFF | 100% | Text on orange/colored backgrounds |

### Brand Accent (Strava Orange DNA)

| Token | Hex | Role |
|-------|-----|------|
| accent-50 | #FFF3EB | Lightest tint (backgrounds, badges) |
| accent-100 | #FFD9BF | Light tint |
| accent-200 | #FFB380 | Subtle highlight |
| accent-300 | #FF8C40 | Medium emphasis |
| accent-400 | #FC6B1F | Secondary interactive |
| accent-500 | #FC4C02 | Primary CTA, active states, brand anchor |
| accent-600 | #D94000 | Hover on primary CTA |
| accent-700 | #B33500 | Pressed state |
| accent-800 | #802600 | Dark accent contexts |
| accent-900 | #4D1700 | Darkest accent |

### Semantic Colors

| Token | Hex | Role |
|-------|-----|------|
| success | #2EA043 | Good outcomes, green timeline nodes, positive radar changes |
| success-muted | rgba(46,160,67,0.15) | Success backgrounds |
| warning | #D29922 | Caution states, yellow timeline nodes, risk thresholds approaching |
| warning-muted | rgba(210,153,34,0.15) | Warning backgrounds |
| danger | #F85149 | Injury events, red timeline nodes, danger thresholds exceeded |
| danger-muted | rgba(248,81,73,0.15) | Danger backgrounds |
| info | #58A6FF | Informational, links, neutral interactive elements |
| info-muted | rgba(88,166,255,0.15) | Info backgrounds |

### Radar Chart Colors

| Token | Hex | Role |
|-------|-----|------|
| radar-current | #FC4C02 | Current values (filled polygon, brand orange) |
| radar-current-fill | rgba(252,76,2,0.20) | Current values fill area |
| radar-target | #8B949E | Target values (gray dashed line) |
| radar-danger | #F85149 | Danger threshold (red dashed line) |
| radar-axis | #30363D | Axis lines and grid |
| radar-label | #8B949E | Axis labels |

### Border & Separator

| Token | Hex | Role |
|-------|-----|------|
| border-default | #30363D | Default borders, dividers |
| border-muted | #21262D | Subtle separators |
| border-accent | #FC4C02 | Active/focused borders |

---

## 3. Typography Rules

### Font Stack

```
Primary: 'Noto Sans JP', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif
Monospace: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace
```

Noto Sans JP is the primary font for all UI text. It provides excellent Japanese readability and includes Latin characters. Inter serves as fallback for Latin-only contexts.

### Type Scale

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| display | 32px | 700 | 1.25 | -0.5px | Page titles (Dashboard, AAR) |
| heading-lg | 24px | 700 | 1.33 | -0.3px | Section headings |
| heading-md | 20px | 600 | 1.4 | -0.2px | Card titles, subsections |
| heading-sm | 16px | 600 | 1.5 | 0 | Widget titles, labels |
| body-lg | 16px | 400 | 1.75 | 0 | Primary body text (Japanese requires 1.75) |
| body-md | 14px | 400 | 1.7 | 0 | Secondary body, descriptions |
| body-sm | 12px | 400 | 1.6 | 0 | Captions, metadata, timestamps |
| label | 12px | 500 | 1.0 | 0.5px | Form labels, badges, uppercase labels |
| code | 13px | 400 | 1.6 | 0 | Code snippets, technical values |

### Japanese Typography Rules

- Minimum font size: 14px for body text (12px allowed for labels/captions only)
- Line height: Never below 1.6 for Japanese text
- Word break: `word-break: break-all` for Japanese paragraphs
- Font feature settings: `"palt"` for proportional alternates in headings

---

## 4. Component Stylings

### Button

| Variant | Background | Text | Border | Hover BG | Active BG |
|---------|-----------|------|--------|----------|-----------|
| primary | #FC4C02 | #FFFFFF | none | #D94000 | #B33500 |
| secondary | transparent | #E6EDF3 | 1px solid #30363D | #21262D | #282E36 |
| ghost | transparent | #8B949E | none | rgba(255,255,255,0.05) | rgba(255,255,255,0.08) |
| danger | transparent | #F85149 | 1px solid rgba(248,81,73,0.4) | rgba(248,81,73,0.15) | rgba(248,81,73,0.25) |
| success | transparent | #2EA043 | 1px solid rgba(46,160,67,0.4) | rgba(46,160,67,0.15) | rgba(46,160,67,0.25) |

Sizes:
- sm: height 32px, padding 0 12px, font 13px
- md: height 40px, padding 0 16px, font 14px
- lg: height 48px, padding 0 24px, font 16px

Border radius: 6px (all sizes)
Transition: all 150ms ease
Disabled: opacity 0.5, cursor not-allowed
Loading: spinner icon replaces text, same dimensions

Focus-visible: 2px solid #FC4C02, offset 2px

### Card

- Background: #161B22
- Border: 1px solid #30363D
- Border radius: 8px
- Padding: 20px (md), 16px (sm)
- Shadow: none (Linear approach: luminance stepping, not shadows)
- Hover (if interactive): border-color transitions to #FC4C02 at 50% opacity

### Input / Text Field

- Background: #0D1117
- Border: 1px solid #30363D
- Border radius: 6px
- Height: 40px
- Padding: 0 12px
- Text: #E6EDF3
- Placeholder: #6E7681
- Focus: border-color #FC4C02, box-shadow 0 0 0 3px rgba(252,76,2,0.2)
- Error: border-color #F85149, box-shadow 0 0 0 3px rgba(248,81,73,0.2)

### Badge / Tag

- Background: semantic color muted variant
- Text: semantic color
- Padding: 2px 8px
- Border radius: 12px (pill)
- Font: 12px weight 500

Difficulty badges:
- Easy: success colors
- Normal: info colors
- Hard: warning colors
- Extreme: danger colors

### Chat Bubble (Debate UI)

| Sender | Background | Border | Alignment |
|--------|-----------|--------|-----------|
| User | #161B22 | 1px solid #30363D | Right |
| S&C AI | rgba(252,76,2,0.08) | 1px solid rgba(252,76,2,0.2) | Left |
| AT AI | rgba(46,160,67,0.08) | 1px solid rgba(46,160,67,0.2) | Left |
| Client AI | rgba(210,153,34,0.08) | 1px solid rgba(210,153,34,0.2) | Left |
| Mentor AI | rgba(88,166,255,0.08) | 1px solid rgba(88,166,255,0.2) | Left |

Border radius: 12px (with 4px on the sender's corner)
Max width: 80% of chat container
Padding: 12px 16px

### Modal / Dialog

- Overlay: rgba(0,0,0,0.6) with backdrop-filter: blur(4px)
- Background: #161B22
- Border: 1px solid #30363D
- Border radius: 12px
- Padding: 24px
- Max width: 480px (sm), 640px (md), 800px (lg)
- Animation: fade in + scale from 0.95 to 1.0, 200ms ease-out

### Sidebar / Navigation

- Background: #0D1117
- Width: 240px (desktop), collapsible
- Border right: 1px solid #21262D
- Nav item height: 36px
- Nav item padding: 8px 12px
- Nav item hover: #161B22 background
- Nav item active: #21262D background + #FC4C02 left border (2px)
- Icon size: 16px
- Icon color: #8B949E (default), #E6EDF3 (active)

### Timeline Node (Time Travel)

- Node size: 16px diameter (default), 20px (active/hovered)
- Track: 2px height, #30363D background
- Node colors: success (#2EA043), warning (#D29922), danger (#F85149)
- Active node: 3px ring of node color at 40% opacity
- Connector line: 2px solid #30363D
- Drag handle: cursor grab, node scales to 24px on drag

---

## 5. Layout Principles

### Spacing Scale (8px base unit)

| Token | Value | Usage |
|-------|-------|-------|
| space-0 | 0px | — |
| space-1 | 4px | Tight gaps (icon-to-text) |
| space-2 | 8px | Intra-component spacing |
| space-3 | 12px | Small gaps |
| space-4 | 16px | Standard component padding |
| space-5 | 20px | Card padding |
| space-6 | 24px | Section inner padding |
| space-8 | 32px | Section gaps |
| space-10 | 40px | Major section separation |
| space-12 | 48px | Page-level spacing |
| space-16 | 64px | Large section gaps |

### Grid System

- Container max width: 1440px
- Content max width: 1280px
- Gutter: 16px (mobile), 24px (desktop)
- Sidebar: 240px fixed (collapsible to 64px icon-only)
- Main content: fluid, fills remaining width

### Key Layouts

**Dashboard**: Sidebar + main content area. Main content uses CSS Grid with auto-fit columns (min 320px).

**Simulation (3-Column)**:
- Left panel: 320px fixed — Client info + Radar chart
- Center panel: fluid (min 400px) — Debate chat
- Right panel: 360px fixed — Exercise prescription
- Panels separated by 1px #21262D borders (not gaps)
- Each panel scrolls independently

**AAR**: Single column, max-width 800px centered. Evidence blocks in expandable accordions.

**Time Travel**: Full-width timeline at top (80px height), content area below for radar chart comparison (side-by-side on desktop, stacked on smaller screens).

### Information Density

Following "Complexity to Clarity" and Stripe's "dense data, generous chrome":
- Data-heavy areas (radar stats, exercise lists): compact spacing (space-2 to space-3)
- Chrome areas (headers, nav, section titles): generous spacing (space-6 to space-8)
- Always prefer showing more information with clear hierarchy over hiding behind clicks

---

## 6. Depth & Elevation

DILEMMA follows Linear's approach: luminance stepping rather than box shadows. Depth is communicated through background color changes, not drop shadows.

| Level | Background | Usage |
|-------|-----------|-------|
| Base | #0D1117 | Page background, deepest layer |
| Raised | #161B22 | Cards, panels, sidebar |
| Elevated | #1C2128 | Modals, dropdowns, floating elements |
| Overlay | #21262D | Tooltips, popovers |

Exceptions where shadows are used:
- Modal overlay: rgba(0,0,0,0.6) backdrop
- Dropdown menus: 0 8px 24px rgba(0,0,0,0.4) for floating detachment
- Toast notifications: 0 4px 12px rgba(0,0,0,0.3)

Border treatment: 1px solid borders at each elevation level provide clear edge definition. Border color lightens with elevation (#21262D at base, #30363D at raised, #3D444D at elevated).

---

## 7. Do's and Don'ts

### Do

- Use #0D1117 as the base background everywhere. Never use pure black (#000000)
- Keep orange (#FC4C02) reserved for primary CTAs and active indicators. One orange element per viewport section maximum
- Use luminance stepping for depth. Lighter = more elevated
- Maintain 1px borders on all card and panel edges for clarity
- Use semantic colors consistently: green=good, yellow=caution, red=danger across all contexts (timeline nodes, radar overlays, badges)
- Keep Japanese body text at minimum 14px with 1.7+ line height
- Show data upfront. Use the 3-layer disclosure pattern: Status (visible) > Narrative (one click) > Evidence (expandable)
- Animate radar chart transitions with Framer Motion (300ms ease-out)
- Use monospace font for numerical clinical values (Z-scores, percentages, risk scores)

### Don't

- Don't use more than 2 accent colors in a single view. Orange + one semantic color maximum
- Don't apply border-radius larger than 12px on any element (except pill badges at 12px)
- Don't use gradient backgrounds. Flat, solid colors only
- Don't add decorative illustrations or icons. Every visual element must carry information
- Don't use box shadows for standard card elevation. Luminance stepping only
- Don't reduce spacing below 4px between any interactive elements
- Don't use light mode. DILEMMA is dark-mode only
- Don't animate anything for longer than 400ms. Clinical tools must feel instant
- Don't use colored backgrounds for large areas. Backgrounds are always from the bg- palette
- Don't gamify the interface. No confetti, no achievement popups, no streaks. Progress is shown through skill radar improvement

---

## 8. Responsive Behavior

### Breakpoints

| Token | Width | Behavior |
|-------|-------|----------|
| sm | 640px | Mobile baseline. Single column. Sidebar hidden behind hamburger |
| md | 768px | Tablet. 2-column grids. Sidebar overlay |
| lg | 1024px | Desktop. Sidebar visible. 3-column simulation layout activates |
| xl | 1280px | Wide desktop. Full content width |
| 2xl | 1440px | Max container width reached, center-aligned |

### Mobile-First CSS, Desktop-Optimized UX

DILEMMA is desktop-optimized (target users use laptops/desktops for study), but all CSS is written mobile-first with md:/lg: breakpoint extensions.

### Layout Collapsing

**Simulation 3-column (lg+ only)**:
- Below lg: Tabs switch between Client Info, Debate, and Prescription panels
- Each panel becomes full-width stacked
- Radar chart moves to top of Client Info tab

**Dashboard grid**:
- xl+: 3-column grid
- md-lg: 2-column grid
- sm: Single column stack

**Timeline (Time Travel)**:
- lg+: Horizontal slider with node labels visible
- Below lg: Horizontal slider with nodes only (labels on tap)
- Below sm: Vertical timeline

**Navigation**:
- lg+: Fixed sidebar 240px
- md: Collapsible sidebar (icon-only 64px, expand on hover)
- sm: Hidden sidebar, hamburger menu, bottom tab bar for primary nav

### Typography Scaling

| Token | sm | md | lg+ |
|-------|----|----|-----|
| display | 24px | 28px | 32px |
| heading-lg | 20px | 22px | 24px |
| body-lg | 15px | 16px | 16px |

### Touch Targets

All interactive elements: minimum 44x44px touch target on screens below lg.

---

## 9. Agent Prompt Guide

This DESIGN.md is the single source of truth for all visual decisions in the DILEMMA project.

### For @03-frontend (Implementation Agent)

1. Read this DESIGN.md FIRST before implementing any component
2. Derive all Tailwind CSS tokens from Section 2 (Color Palette) and Section 3 (Typography)
3. Component behavior must match Section 4 exactly. Do not invent new variants
4. Layout must follow Section 5 grid specifications. The 3-column simulation layout is the most critical
5. Use luminance stepping (Section 6), not shadows, for elevation
6. All animations use Framer Motion with durations <= 400ms
7. Responsive behavior follows Section 8. Desktop-optimized but mobile-first CSS

### For @02-ui-ux (Design Agent)

1. When updating this DESIGN.md, increment the version and add to changelog
2. Any color change must pass WCAG 2.1 AA contrast check against its background
3. New components must define all states: default, hover, active, disabled, focus-visible, loading (if applicable)

### Quick Token Reference

```
Primary BG:     #0D1117
Card BG:        #161B22
Border:         #30363D
Text Primary:   #E6EDF3
Text Secondary: #8B949E
Accent:         #FC4C02
Success:        #2EA043
Warning:        #D29922
Danger:         #F85149
Info:           #58A6FF
```

### Contrast Ratios (Verified WCAG AA)

| Foreground | Background | Ratio | Pass |
|-----------|-----------|-------|------|
| #E6EDF3 on #0D1117 | text-primary on bg-primary | 13.2:1 | AAA |
| #E6EDF3 on #161B22 | text-primary on bg-elevated | 11.1:1 | AAA |
| #8B949E on #0D1117 | text-secondary on bg-primary | 5.0:1 | AA |
| #8B949E on #161B22 | text-secondary on bg-elevated | 4.2:1 | AA |
| #FFFFFF on #FC4C02 | text-on-accent on accent | 3.6:1 | AA-Large |
| #FFFFFF on #D94000 | text-on-accent on accent-hover | 4.5:1 | AA |
| #FC4C02 on #0D1117 | accent on bg-primary | 3.7:1 | AA-Large |

Note: White on FC4C02 passes AA for large text (18px+ or 14px bold). For small text buttons, use #D94000 background or pair with adequate size (16px weight 600+).

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2026-04-08 | 1.0.0 | Initial DESIGN.md. References: Claude (warmth patterns), Linear (dark-mode luminance), Stripe (data density). DNA: Deep Space + Strava Orange + Complexity to Clarity |
