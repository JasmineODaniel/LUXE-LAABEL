# Jasmine Notes

This file explains the key syntax and logic choices added to make the UI functional and responsive.

## Responsive carousel logic
- Added `useResponsiveColumns` (`src/hooks/useResponsiveColumns.ts`) to keep the number of visible cards in sync with CSS breakpoints. It watches `window.innerWidth`, updates on resize, and returns the column count for the current viewport.
- Both `FlashSales.tsx` and `ExploreProducts.tsx` now use this hook to decide how many products to show per view (4 desktop, 2 tablet, 1 mobile).
- `useMemo` builds a sliding window of products, and `useState` tracks the current start index. Previous/next buttons update that index modulo the product list, so the carousel loops without blank slots.
- A small `useEffect` resets the start index when the column count changes (e.g., rotating a device), preventing stale indexes.

## Controls now work
- Flash Sales and Explore arrow buttons now call `handlePrev/handleNext`, cycling through the product list according to the responsive column count.
- Categories arrows now step the active category forward/backward, so the UI focus aligns with the controls.

## Hero responsiveness
- Added media queries in `Hero.css` to stack the sidebar and banner on narrower viewports, shrink padding, and scale typography/images for mobile, preventing horizontal overflow.

## General patterns
- Kept data (e.g., product arrays) outside components for stable references and simple mapping.
- Used clear TypeScript shapes (`type Product`) to keep prop usage self-documenting without verbose comments.
