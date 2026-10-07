// Interface text in both languages. Content about you and your projects lives in src/content/.
const en = {
  skipToContent: 'Skip to content',
  navProjects: 'Projects',
  navAbout: 'About',
  navContact: 'Contact',
  navMain: 'Main',
  switchLanguage: 'switch to Dutch',
  themeDark: 'Dark',
  themeLight: 'Light',
  themeLabel: 'Switch to the dark theme',
  themeLabelLight: 'Switch to the light theme',

  factStudy: 'Study',
  factInShort: 'In short',
  factLatest: 'Latest project',
  factAvailable: 'Available',
  factBasedIn: 'Based in',

  projectsTitle: 'Projects',
  projectsNote: 'Each one with what was hard and how I solved it.',
  projectsEmpty:
    'The projects are being rebuilt one at a time, each with a proper case study. They will appear here as they are finished.',

  projectsMore: 'More projects',
  aboutTitle: 'About',
  experience: 'Experience',
  education: 'Education',
  languages: 'Languages',
  downloadCv: 'Download CV (PDF)',
  portraitAlt: 'Portrait of Julian van der Linde',

  contactAsk:
    'Looking for an intern or junior software engineer? Email is the quickest way to reach me.',

  projectBack: 'All projects',
  projectRole: 'Role',
  projectStack: 'Stack',
  projectYear: 'Year',
  projectContext: 'Context',
  projectLive: 'Open the live site',
  projectRepo: 'View the code',
  projectNext: 'Next project',
  projectRead: 'Read the case study',
  projectNotes: 'Problems and fixes',
  projectChapters: 'Chapters',
  mediaOpen: 'Open full size',
  mediaStrip: 'Phone screens, scroll sideways for more',
  projectSummary: 'Summary',
  projectCode: 'Code',
  projectCodeSoon: 'The repository goes public soon.',
  projectSite: 'Live site',

  notFoundTitle: 'Page not found',
  notFoundBody: 'There is no page at this address. The projects and my contact details are on the homepage.',
  notFoundHome: 'Back to the homepage',
}

const nl: typeof en = {
  skipToContent: 'Naar de inhoud',
  navProjects: 'Projecten',
  navAbout: 'Over mij',
  navContact: 'Contact',
  navMain: 'Hoofdmenu',
  switchLanguage: 'switch to English',
  themeDark: 'Donker',
  themeLight: 'Licht',
  themeLabel: 'Schakel naar het donkere thema',
  themeLabelLight: 'Schakel naar het lichte thema',

  factStudy: 'Opleiding',
  factInShort: 'In het kort',
  factLatest: 'Nieuwste project',
  factAvailable: 'Beschikbaar',
  factBasedIn: 'Locatie',

  projectsTitle: 'Projecten',
  projectsNote: 'Elk met wat er lastig was en hoe ik het oploste.',
  projectsEmpty:
    'De projecten worden een voor een opnieuw opgebouwd, elk met een uitgebreide case study. Ze verschijnen hier zodra ze af zijn.',

  projectsMore: 'Meer projecten',
  aboutTitle: 'Over mij',
  experience: 'Werkervaring',
  education: 'Opleiding',
  languages: 'Talen',
  downloadCv: 'Download cv (pdf)',
  portraitAlt: 'Portret van Julian van der Linde',

  contactAsk:
    'Op zoek naar een stagiair of junior software engineer? Mail is de snelste manier om mij te bereiken.',

  projectBack: 'Alle projecten',
  projectRole: 'Rol',
  projectStack: 'Techniek',
  projectYear: 'Jaar',
  projectContext: 'Context',
  projectLive: 'Bekijk de live site',
  projectRepo: 'Bekijk de code',
  projectNext: 'Volgend project',
  projectRead: 'Lees de case study',
  projectNotes: 'Problemen en oplossingen',
  projectChapters: 'Hoofdstukken',
  mediaOpen: 'Open op ware grootte',
  mediaStrip: 'Telefoonschermen, scroll opzij voor meer',
  projectSummary: 'Samenvatting',
  projectCode: 'Code',
  projectCodeSoon: 'De repository komt binnenkort online.',
  projectSite: 'Live site',

  notFoundTitle: 'Pagina niet gevonden',
  notFoundBody: 'Op dit adres staat geen pagina. De projecten en mijn contactgegevens staan op de homepage.',
  notFoundHome: 'Terug naar de homepage',
}

export type MessageKey = keyof typeof en

export const messages = { en, nl }
