import type { Localized } from '../i18n'

// Everything about you that is not a project. Text that is shown to visitors has an English
// and a Dutch version. A value of null hides that part of the page.

export interface TimelineEntry {
  role: Localized
  place: string
  year: Localized
  /** One plain line about what he did there. */
  note?: Localized
}

export interface LanguageEntry {
  name: Localized
  level: Localized
  cefr: string
  note?: Localized
}

/** A group of tools in the "Works with" list. */
export interface SkillGroup {
  label: Localized
  items: string[]
}

export interface Site {
  name: string
  nameLines: [string, string]
  lead: Localized
  study: Localized
  /** What he is looking for and from when, shown in the hero. null hides it. */
  availability: Localized | null
  /** Where he is based, shown in the hero. null hides it. */
  location: Localized | null
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
  skills: SkillGroup[]
}

const same = (text: string): Localized => ({ en: text, nl: text })

export const site: Site = {
  name: 'Julian van der Linde',
  nameLines: ['Julian van', 'der Linde'],

  lead: {
    en: 'Software engineer who takes a project from raw data to the screen: pipelines, Vue and TypeScript frontends, and the design in between.',
    nl: 'Software engineer die een project bouwt van ruwe data tot scherm: pipelines, frontends in Vue en TypeScript, en het ontwerp daartussen.',
  },
  study: {
    en: 'HBO-ICT Software Engineering, Amsterdam University of Applied Sciences',
    nl: 'HBO-ICT Software Engineering, Hogeschool van Amsterdam',
  },

  availability: {
    en: 'Internship from February 2027',
    nl: 'Stage vanaf februari 2027',
  },
  location: same('Amsterdam'),

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
      en: 'My focus is software development and data analysis. At Effytool I built backend features in C#, and in a hospital and a care organisation I learned to explain technology to the people who use it every day.',
      nl: 'Mijn focus is softwareontwikkeling en data-analyse. Bij Effytool bouwde ik backendfeatures in C#, en in een ziekenhuis en een zorgorganisatie leerde ik techniek uit te leggen aan de mensen die er elke dag mee werken.',
    },
  ],

  experience: [
    {
      role: { en: 'Software Developer Intern', nl: 'Stagiair softwareontwikkeling' },
      place: 'Effytool',
      year: same('2025'),
      note: {
        en: 'Built and maintained backend features in C#, and tested and debugged them with the team.',
        nl: 'Bouwde en onderhield backendfeatures in C#, en testte en debugde ze met het team.',
      },
    },
    {
      role: { en: 'IT Workplace Technician', nl: 'IT-werkplektechnicus' },
      place: 'Dijklander Ziekenhuis',
      year: same('2023'),
      note: {
        en: 'Replaced and managed workplace hardware and handled support tickets for healthcare staff.',
        nl: 'Verving en beheerde werkplekhardware en handelde supporttickets af voor zorgmedewerkers.',
      },
    },
    {
      role: { en: 'IT Support Specialist', nl: 'IT-supportmedewerker' },
      place: 'De Zorgcirkel',
      year: same('2022'),
      note: {
        en: 'Guided staff through the move to a new intranet and Office 365, with hands-on support and training.',
        nl: 'Begeleidde medewerkers bij de overstap naar een nieuw intranet en Office 365, met praktische hulp en training.',
      },
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
    {
      role: same('VWO'),
      place: 'Da Vinci College',
      year: { en: '2016 to 2022', nl: '2016 tot 2022' },
    },
  ],
  languages: [
    {
      name: { en: 'Dutch', nl: 'Nederlands' },
      level: { en: 'Native', nl: 'Moedertaal' },
      cefr: 'C2',
    },
    {
      name: { en: 'English', nl: 'Engels' },
      level: { en: 'Fluent', nl: 'Vloeiend' },
      cefr: 'C2',
      note: {
        en: 'Cambridge Certificate in Advanced English (CAE), 2020',
        nl: 'Cambridge Certificate in Advanced English (CAE), 2020',
      },
    },
    { name: { en: 'German', nl: 'Duits' }, level: { en: 'Good', nl: 'Goed' }, cefr: 'B2' },
  ],

  skills: [
    {
      label: { en: 'Code', nl: 'Code' },
      items: ['TypeScript', 'JavaScript', 'Java', 'C#', 'PHP', 'SQL', 'HTML', 'CSS'],
    },
    {
      label: { en: 'Frameworks and tools', nl: 'Frameworks en tools' },
      items: ['Vue', 'Vite', 'Spring Boot', 'Tailwind', 'REST APIs', 'Node.js data scripts'],
    },
    {
      label: { en: 'Way of working', nl: 'Werkwijze' },
      items: ['Scrum', 'Agile'],
    },
  ],
}
