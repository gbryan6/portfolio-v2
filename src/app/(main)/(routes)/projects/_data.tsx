import type { IconType } from 'react-icons'
import { FaReact, FaPython, FaJava } from 'react-icons/fa6'
import { SiNextdotjs } from 'react-icons/si'
import { TbBrandReactNative } from 'react-icons/tb'

/**
 * Projects data — same co-located `_data.tsx` idea as about-me.
 * `TechId` is the canonical match key for the filter; `label` is display-only
 * (so the "TypeScript" vs "Typescript" mismatch in the old page can't happen).
 */

export type TechId = 'react' | 'next' | 'react-native' | 'python' | 'java'

export interface TechFilter {
  id: TechId
  label: string
  icon: IconType
}

export interface Project {
  id: string
  /** 1-based, stable — drives the "Project N" heading */
  index: number
  /** shown as `_slug` */
  slug: string
  /** used for the thumbnail alt text */
  title: string
  description: string
  /** every tech the project touches — drives the filter (ANY-match) */
  techs: TechId[]
  /** the single icon pinned on the thumbnail */
  badge: TechId
  thumbnail: string
  href: string
}

/** Sidebar filter rows — the stacks Gabriel actually works in. */
export const techFilters: TechFilter[] = [
  { id: 'react', label: 'React', icon: FaReact },
  { id: 'next', label: 'Next.js', icon: SiNextdotjs },
  { id: 'react-native', label: 'React Native', icon: TbBrandReactNative },
  { id: 'python', label: 'Python', icon: FaPython },
  { id: 'java', label: 'Java', icon: FaJava },
]

/** icon + label lookup for the card badge and the summary tab. */
export const techById: Record<TechId, TechFilter> = techFilters.reduce(
  (acc, tech) => {
    acc[tech.id] = tech
    return acc
  },
  {} as Record<TechId, TechFilter>
)

/**
 * Empty on purpose — the catalogue is being rebuilt. `ProjectGrid` reads the
 * length to tell "nothing published yet" apart from "the filter matched
 * nothing", which are different messages to the visitor.
 */
export const projects: Project[] = []
