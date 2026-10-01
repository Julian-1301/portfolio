import type { Localized } from '../i18n'

// Projects are added back one at a time as each one is rebuilt.
// See HOW-TO-EDIT.md for a full example entry you can copy.

export interface MediaImage {
  /** File name inside public/images/projects/<slug>/ (or a path like 'shared/file.jpg' from images/projects/) */
  file: string
  alt: Localized
}

/**
 * How a group of images is laid out.
 * - single: one wide image
 * - pair: two images side by side
 * - device: a desktop screen with a phone screen overlapping it (first image desktop, second mobile)
 */
export type MediaLayout = 'single' | 'pair' | 'device'

export interface Media {
  layout: MediaLayout
  images: MediaImage[]
  caption?: Localized
}

export interface CaseSection {
  heading: Localized
  paragraphs: Localized[]
  media?: Media
}

export interface Project {
  slug: string
  title: string
  year: string
  context: Localized
  discipline: Localized
  summary: Localized
  /** Featured projects get a large row in the index. Keep this to three or four. */
  featured: boolean
  cover: Media
  role: Localized
  stack: string[]
  links: { live?: string; repo?: string }
  sections: CaseSection[]
}

// ---------------------------------------------------------------------------
// Placeholders, so the layout can be judged before real projects are added.
// Delete this block (and public/images/projects/placeholder/) once real work is in.
const same = (text: string): Localized => ({ en: text, nl: text })
const lorem = same(
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet.',
)
const lorem2 = same(
  'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper, cras mattis consectetur purus sit amet fermentum.',
)
const desktop: MediaImage = {
  file: 'placeholder/desktop.jpg',
  alt: same('Placeholder desktop screen'),
}
const mobile: MediaImage = {
  file: 'placeholder/mobile.jpg',
  alt: same('Placeholder mobile screen'),
}
const detail1: MediaImage = { file: 'placeholder/detail-1.jpg', alt: same('Placeholder detail') }
const detail2: MediaImage = { file: 'placeholder/detail-2.jpg', alt: same('Placeholder detail') }

const placeholder = (n: number, year: string, featured: boolean, cover: Media): Project => ({
  slug: `placeholder-${n}`,
  title: `Project title ${n}`,
  year,
  context: same('Context'),
  discipline: same('Discipline'),
  summary: same('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'),
  featured,
  cover,
  role: same('Role'),
  stack: ['Lorem', 'Ipsum'],
  links: {},
  sections: [
    { heading: same('The question'), paragraphs: [lorem, lorem2] },
    {
      heading: same('Process'),
      paragraphs: [lorem2],
      media: { layout: 'pair', images: [detail1, detail2] },
    },
    {
      heading: same('Result'),
      paragraphs: [lorem],
      media: { layout: 'single', images: [desktop] },
    },
  ],
})
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  placeholder(1, '2026', true, { layout: 'device', images: [desktop, mobile] }),
  placeholder(2, '2025', true, { layout: 'single', images: [detail1] }),
  placeholder(3, '2025', true, { layout: 'pair', images: [detail1, detail2] }),
  placeholder(4, '2024', true, { layout: 'single', images: [desktop] }),
  placeholder(5, '2023', false, { layout: 'single', images: [desktop] }),
  placeholder(6, '2022', false, { layout: 'single', images: [desktop] }),
]

const byYearDesc = (a: Project, b: Project) => Number(b.year) - Number(a.year)

export const sortedProjects = (): Project[] => [...projects].sort(byYearDesc)

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)

export const nextProject = (slug: string): Project | undefined => {
  const list = sortedProjects()
  if (list.length < 2) return undefined
  const i = list.findIndex((p) => p.slug === slug)
  return list[(i + 1) % list.length]
}

/** A file name is looked up in the project's own folder; a path with a slash is relative to images/projects/. */
export const imageUrl = (slug: string, file: string): string =>
  `${import.meta.env.BASE_URL}images/projects/${file.includes('/') ? file : `${slug}/${file}`}`
