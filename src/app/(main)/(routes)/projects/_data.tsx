import type { IconType } from 'react-icons'
import { FaReact, FaHtml5, FaCss3, FaVuejs, FaAngular } from 'react-icons/fa6'
import { SiGatsby, SiFlutter } from 'react-icons/si'

/**
 * Mocked projects data — same co-located `_data.tsx` idea as about-me.
 * `TechId` is the canonical match key for the filter; `label` is display-only
 * (so the "TypeScript" vs "Typescript" mismatch in the old page can't happen).
 */

export type TechId =
  | 'react'
  | 'html'
  | 'css'
  | 'vue'
  | 'angular'
  | 'gatsby'
  | 'flutter'

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

/** Sidebar filter rows, in screenshot order. */
export const techFilters: TechFilter[] = [
  { id: 'react', label: 'React', icon: FaReact },
  { id: 'html', label: 'HTML', icon: FaHtml5 },
  { id: 'css', label: 'CSS', icon: FaCss3 },
  { id: 'vue', label: 'Vue', icon: FaVuejs },
  { id: 'angular', label: 'Angular', icon: FaAngular },
  { id: 'gatsby', label: 'Gatsby', icon: SiGatsby },
  { id: 'flutter', label: 'Flutter', icon: SiFlutter },
]

/** icon + label lookup for the card badge and the summary tab. */
export const techById: Record<TechId, TechFilter> = techFilters.reduce(
  (acc, tech) => {
    acc[tech.id] = tech
    return acc
  },
  {} as Record<TechId, TechFilter>
)

export const projects: Project[] = [
  {
    id: 'ui-animations',
    index: 1,
    slug: 'ui-animations',
    title: 'UI Animations',
    description:
      'Biblioteca de microinterações: cada estado da interface ganha entrada, saída e resposta ao toque.',
    techs: ['react', 'css'],
    badge: 'react',
    thumbnail: '/assets/projects/ui-animations.svg',
    href: 'https://github.com/gbryan6',
  },
  {
    id: 'tetris-game',
    index: 2,
    slug: 'tetris-game',
    title: 'Tetris Game',
    description:
      'Tetris jogável no navegador — grid, rotação de peças, wall-kick e placar, tudo em Canvas.',
    techs: ['html', 'css'],
    badge: 'html',
    thumbnail: '/assets/projects/tetris-game.svg',
    href: 'https://github.com/gbryan6',
  },
  {
    id: 'glassy-ui',
    index: 3,
    slug: 'glassy-ui',
    title: 'Glassy UI',
    description:
      'Kit de componentes com vidro fosco: blur, brilho de borda e profundidade em camadas.',
    techs: ['css', 'react'],
    badge: 'css',
    thumbnail: '/assets/projects/glassy-ui.svg',
    href: 'https://github.com/gbryan6',
  },
  {
    id: 'nimbus',
    index: 4,
    slug: 'nimbus',
    title: 'Nimbus',
    description:
      'Painel de clima que lê a previsão por geolocalização e anima a transição entre condições.',
    techs: ['vue', 'css'],
    badge: 'vue',
    thumbnail: '/assets/projects/nimbus.svg',
    href: 'https://github.com/gbryan6',
  },
  {
    id: 'emberize-ui',
    index: 5,
    slug: 'emberize-ui',
    title: 'Emberize UI',
    description:
      'Design system em Vue com tema claro/escuro trocável e tokens versionados.',
    techs: ['vue'],
    badge: 'vue',
    thumbnail: '/assets/projects/emberize-ui.svg',
    href: 'https://github.com/gbryan6',
  },
  {
    id: 'atlas-docs',
    index: 6,
    slug: 'atlas-docs',
    title: 'Atlas Docs',
    description:
      'Site de documentação gerado do Markdown, com busca instantânea e navegação por teclado.',
    techs: ['gatsby', 'react'],
    badge: 'gatsby',
    thumbnail: '/assets/projects/atlas-docs.svg',
    href: 'https://github.com/gbryan6',
  },
  {
    id: 'pocket-ledger',
    index: 7,
    slug: 'pocket-ledger',
    title: 'Pocket Ledger',
    description:
      'App de finanças offline-first: registra gastos, agrupa por categoria e fecha o mês.',
    techs: ['flutter'],
    badge: 'flutter',
    thumbnail: '/assets/projects/pocket-ledger.svg',
    href: 'https://github.com/gbryan6',
  },
  {
    id: 'orbit-forms',
    index: 8,
    slug: 'orbit-forms',
    title: 'Orbit Forms',
    description:
      'Construtor de formulários com validação por schema e pré-visualização ao vivo.',
    techs: ['angular', 'html'],
    badge: 'angular',
    thumbnail: '/assets/projects/orbit-forms.svg',
    href: 'https://github.com/gbryan6',
  },
]
