/**
 * Breakpoints live here, not in `theme.ts`: they have no dark/light variant and
 * are read from plain `styled` interpolations *and* from JS (`useMediaQuery`),
 * the same reasoning that keeps motion tokens in their own module.
 *
 * Both `media.*` helpers are max-width — write desktop first, then narrow it.
 */
export const breakpoints = {
  mobile: 640,
  tablet: 1024,
  /** Narrow desktops: still two columns, but no room for a third pane. */
  wide: 1180,
} as const

/** Raw queries — for `useMediaQuery` from usehooks-ts. */
export const query = {
  /** Phones. */
  mobile: `(max-width: ${breakpoints.mobile}px)`,
  /** Phones *and* tablets — i.e. "not desktop", where the nav collapses. */
  tablet: `(max-width: ${breakpoints.tablet}px)`,
  /** Everything below a roomy desktop. */
  wide: `(max-width: ${breakpoints.wide}px)`,
} as const

/** Wrapped queries — for interpolation inside styled-components. */
export const media = {
  mobile: `@media ${query.mobile}`,
  tablet: `@media ${query.tablet}`,
  wide: `@media ${query.wide}`,
} as const
