=== Nexus Blocks ===
Contributors: webclyde
Tags: gutenberg, blocks, page builder, advanced blocks, design system
Requires at least: 6.4
Tested up to: 6.6
Requires PHP: 8.1
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Advanced Gutenberg blocks with Elementor Pro-level design controls. Zero render-blocking CSS, scoped per-block styles, and a full global design token system.

== Description ==

**Nexus Blocks** brings Elementor Pro-level design control to the native WordPress block editor — without the performance overhead of a page builder.

= Phase 1 Blocks (16 blocks) =

* **Advanced Heading** — Full typography control, gradient text, text stroke, SVG highlight shapes
* **Advanced Text** — Multi-column body copy with drop cap and column rules
* **Advanced Image** — CSS filters, hover overlays, shape masks, lightbox
* **Advanced Button** — Gradient backgrounds, hover animations, icon support, ripple effects
* **Icon** — Scalable SVG/Font Awesome icons with shape backgrounds, tooltips
* **Divider** — Horizontal rule with optional text or icon center element
* **Spacer** — Responsive vertical spacer with optional background
* **Icon Box** — Feature cards with icon, title, description, hover effects
* **Image Box** — Team/product cards with image, title, description
* **Icon List** — Styled lists with per-item icon and color overrides
* **Counter** — Count-up animation on scroll with odometer mode
* **Progress Bar** — Animated fill bars with gradient support
* **Star Rating** — Visual rating with star, heart, circle, or diamond icons
* **Tabs** — Switchable content panels with URL hash support
* **Accordion** — FAQ accordion with schema.org markup output
* **Alert / Notice** — Dismissible notifications with cookie persistence

= Core Features =

* **Zero render-blocking CSS** — each block outputs only the CSS it needs, scoped with a unique block ID
* **Global Design Token System** — define colors, typography, and spacing tokens shared across all blocks
* **No jQuery** — vanilla JS and React only
* **FSE Compatible** — all blocks work in Full Site Editing templates
* **Accessibility** — WCAG 2.1 AA compliant on every block
* **Responsive Controls** — independent values for Desktop, Tablet, and Mobile

== Installation ==

1. Upload the `nexus-blocks` folder to `/wp-content/plugins/`
2. Activate the plugin through the **Plugins** menu in WordPress
3. Open any post or page in the block editor — all Nexus blocks appear in the **Nexus Blocks** category

= Building from Source =

```bash
cd nexus-blocks
npm install
npm run build
```

== Frequently Asked Questions ==

= Does this replace my existing page builder? =
No. Nexus Blocks extends the native WordPress block editor (Gutenberg). It works alongside your existing blocks and themes.

= Does it work with Full Site Editing? =
Yes. All Phase 1 blocks are FSE-compatible and can be used in site templates.

= What happened to my blocks after an update? =
Nexus Blocks uses a `deprecated` attribute system. Old block attributes are migrated automatically when you open a post in the editor.

= Is WooCommerce supported? =
WooCommerce blocks are planned for Phase 3. The plugin does not conflict with WooCommerce.

== Screenshots ==

1. Advanced Heading block with gradient text and SVG highlight shape
2. Icon Box grid — feature cards with hover lift effect
3. Global Design Panel — color tokens and typography presets
4. Accordion block with FAQ schema output

== Changelog ==

= 1.0.0 =
* Initial release — all 16 Phase 1 blocks
* Global Design Token Panel (Colors, Typography, Spacing, Custom CSS)
* Scoped per-block CSS architecture
* Frontend: count-up counter, progress bar animations, tabs, accordion, alert dismiss

== Upgrade Notice ==

= 1.0.0 =
Initial release.
