# Tablet Optimization Guidelines & Anti-Hallucination Rules

These rules are MANDATORY for the AI Assistant when performing "Tablet Optimizations" or "Responsive Tuning" for the **InoHamsar Portfolio**.

## 📏 1. The 3-Tier Breakpoint Architecture
You must strictly respect the following CSS prefixes:
- **Mobile (Base)**: No prefix (Classes like `px-6`, `text-xl`). Matches `< 768px`.
- **Tablet (md)**: Prefix `md:`. Matches `768px - 1023px`.
- **Desktop (lg)**: Prefix `lg:`. Matches `≥ 1024px`.

---

## 🚫 2. Prohibited Actions (Anti-Hallucination)
1.  **NEVER** modify a class without a prefix (Mobile) when working on Tablet fixes.
2.  **NEVER** modify a class with the `lg:` prefix (Desktop) unless explicitly instructed to change the Desktop layout. 
3.  **NEVER** assume a layout should be same on Tablet and Desktop. Always treat `lg:` as the **"Sacred Desktop Anchor"** that must not be moved.

---

## 💎 3. Editorial & Precision Standards
1.  **Manual Precision Alignment**: In headers, prefer `items-end` and fixed `gap-X` instead of `justify-between` to ensure perfect visual baselines between titles and buttons.
2.  **Typography Balance**:
    - **Titles**: Use `noPadding` prop in `RevealHeading` for pixel-perfect edge alignment. 
    - **Leading**: For large headers (`8xl`), use `leading-none` (1.0) or `leading-[0.9]` to prevent text clashing.
3.  **Spacing Consistency**:
    - Mobile/Compact Tablet: `px-6`.
    - Editorial Tablet: `md:px-12`.
    - Full Desktop: `lg:px-container`.

---

## 🔍 4. Verification Protocol
After every change to an `md:` class, the AI MUST verify:
1.  **1440px (Desktop)**: Is it still perfect? (Zero Regression).
2.  **768px (iPad Intro)**: Is it readable and balanced?
3.  **820px (iPad Air)**: Does the grid scale correctly?
4.  **375px (iPhone)**: Are the mobile styles intact?

---

> [!CAUTION]
> If you are unsure whether a class affects Mobile or Desktop, **STOP** and check the file history or run a browser test. Do not guess. Do not hallucinate.
