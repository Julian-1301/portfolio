import type { Localized } from '../i18n'

// Everything about you that is not a project. Text that is shown to visitors has an English
// and a Dutch version. A value of null hides that part of the page.

export interface TimelineEntry {
  role: Localized
  place: string
  year: Localized
}

export interface LanguageEntry {
  name: Localized
  level: Localized
  cefr: string
}

export interface Site {
  name: string
  nameLines: [string, string]
  lead: Localized
  study: Localized
  email: string
  linkedin: string | null
  github: string | null
  /** Path inside public/, for example 'cv/julian-van-der-linde.pdf'. */
  cv: string | null
  /** Path inside public/, for example 'images/julian.jpg'. Portrait, 4:5. */
  photo: string | null
  bio: Localized[]
  experience: TimelineEntry[]
  education: TimelineEntry[]
  languages: LanguageEntry[]
}

const same = (text: string): Localized => ({ en: text, nl: text })

export const site: Site = {
  name: 'Julian van der Linde',
  nameLines: ['Julian van', 'der Linde'],

  lead: {
    en: 'Software engineer with a background in UX and interface design. I build frontends in Vue and TypeScript, and design them first.',
    nl: 'Software engineer met een achtergrond in UX en interfacedesign. Ik bouw frontends in Vue en TypeScript, en ontwerp ze eerst.',
  },
  study: {
    en: 'HBO-ICT Software Engineering, Amsterdam University of Applied Sciences',
    nl: 'HBO-ICT Software Engineering, Hogeschool van Amsterdam',
  },

  email: 'j.van.der.linde@outlook.com',
  linkedin: 'https://www.linkedin.com/in/julianvdlinde',
  github: null,
  cv: null,
  photo: null,

  bio: [
    {
      en: 'I study Software Engineering at the Amsterdam University of Applied Sciences and did an exchange semester at the University of Michigan School of Information.',
      nl: 'Ik studeer Software Engineering aan de Hogeschool van Amsterdam en deed een uitwisselingssemester aan de University of Michigan School of Information.',
    },
    {
      en: 'My work sits between design and engineering. I design interfaces, build them, and I have a research interest in privacy and the ethics of emerging technology.',
      nl: 'Mijn werk zit tussen design en engineering in. Ik ontwerp interfaces, bouw ze, en ik doe graag onderzoek naar privacy en de ethiek van nieuwe technologie.',
    },
  ],

  experience: [
    {
      role: { en: 'Software developer intern', nl: 'Stagiair software developer' },
      place: 'Effytool',
      year: same('2025'),
    },
    {
      role: { en: 'IT infrastructure management', nl: 'IT-infrastructuurbeheer' },
      place: 'Dijklander Ziekenhuis',
      year: same('2023'),
    },
    {
      role: { en: 'Technical support', nl: 'Technische ondersteuning' },
      place: 'De Zorgcirkel',
      year: same('2022'),
    },
  ],
  education: [
    {
      role: { en: 'Exchange semester', nl: 'Uitwisselingssemester' },
      place: 'University of Michigan',
      year: same('2025'),
    },
    {
      role: same('HBO-ICT Software Engineering'),
      place: 'Amsterdam UAS',
      year: { en: '2023 to now', nl: '2023 tot nu' },
    },
  ],
  languages: [
    {
      name: { en: 'Dutch', nl: 'Nederlands' },
      level: { en: 'Native', nl: 'Moedertaal' },
      cefr: 'C2',
    },
    { name: { en: 'English', nl: 'Engels' }, level: { en: 'Fluent', nl: 'Vloeiend' }, cefr: 'C2' },
    { name: { en: 'German', nl: 'Duits' }, level: { en: 'Good', nl: 'Goed' }, cefr: 'B2' },
  ],
}
