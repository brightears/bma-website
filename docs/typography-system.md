# BMAsia typography system

BMAsia uses one responsive type scale across the public website. Consistency is
defined by semantic role: every page title uses the same token, every major
section title uses the same token, and so on. Product identity comes from
colour, imagery, layout and motion rather than arbitrary font-size changes.

## Type families

- Headlines and body copy: Geist (`font-headline` / `font-sans`)
- Labels, buttons and compact product UI: Space Grotesk (`font-label`)

## Semantic roles

| Role | Class | Responsive range | Typical use |
| --- | --- | --- | --- |
| Page title | `bma-page-title` | 52–96px | The single `h1` on a public page |
| Section title | `bma-section-title` | 42–72px | Major narrative sections and final CTAs |
| Subsection title | `bma-subsection-title` | 32–52px | Form panels, process steps and prominent modules |
| Card title | `bma-card-title` | 24–32px | Product, industry and information cards |
| Lead copy | `bma-lede` | 17–20px | Page and section introductions |
| Body copy | `bma-body` | 16px | Standard explanatory copy |
| Small body copy | `bma-body-small` | 14px | Supporting and compact UI copy |
| Label | `bma-label` / `bma-kicker` | 11px | Eyebrows and uppercase metadata |

The source tokens live in `app/globals.css`. Fluid sizes use `clamp()` with rem
minimum and maximum bounds so the layout responds to viewport width while still
supporting browser zoom and text resizing.

## Rules for new work

1. Every public `h1` uses `bma-page-title`; do not add a page-specific text-size utility.
2. Choose the semantic role before choosing colour or layout.
3. Keep line length controlled with `max-width`; do not shrink text to force a preferred line break.
4. Preserve natural wrapping and allow containers to grow at 200% text zoom.
5. Use product-specific colour and imagery without changing the shared type scale.
6. Run `npm run check:typography` before opening a pull request.

Compact controls, charts and intentionally small interface readouts may use
local sizes when they are not acting as page or section headings.
