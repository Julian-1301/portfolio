// Interface text in both languages. Content about you and your projects lives in src/content/.
const en = {
  skipToContent: 'Skip to content',
  navProjects: 'Projects',
  navAbout: 'About',
  navContact: 'Contact',
  navMain: 'Main',
  switchLanguage: 'Switch to Dutch',
  themeDark: 'Dark',
  themeLight: 'Light',
  themeLabel: 'Switch to the dark theme',
  themeLabelLight: 'Switch to the light theme',

  factStudy: 'Study',

  projectsTitle: 'Projects',
  projectsNote: 'A selection of university, client and personal work.',
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
    'Looking for an intern or junior developer who also designs? Email is the quickest way to reach me.',

  projectBack: 'All projects',
  projectRole: 'Role',
  projectStack: 'Stack',
  projectYear: 'Year',
  projectContext: 'Context',
  projectLive: 'Open the live site',
  projectRepo: 'View the code',
  projectNext: 'Next project',

  notFoundTitle: 'Page not found',
  notFoundBody: 'This page does not exist, or it moved while the site was being rebuilt.',
  notFoundHome: 'Back to the homepage',
}

const nl: typeof en = {
  skipToContent: 'Naar de inhoud',
  navProjects: 'Projecten',
  navAbout: 'Over mij',
  navContact: 'Contact',
  navMain: 'Hoofdmenu',
  switchLanguage: 'Switch to English',
  themeDark: 'Donker',
  themeLight: 'Licht',
  themeLabel: 'Schakel naar het donkere thema',
  themeLabelLight: 'Schakel naar het lichte thema',

  factStudy: 'Opleiding',

  projectsTitle: 'Projecten',
  projectsNote: 'Een selectie van studie-, klant- en eigen werk.',
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
    'Op zoek naar een stagiair of junior developer die ook ontwerpt? Mail is de snelste manier om mij te bereiken.',

  projectBack: 'Alle projecten',
  projectRole: 'Rol',
  projectStack: 'Techniek',
  projectYear: 'Jaar',
  projectContext: 'Context',
  projectLive: 'Bekijk de live site',
  projectRepo: 'Bekijk de code',
  projectNext: 'Volgend project',

  notFoundTitle: 'Pagina niet gevonden',
  notFoundBody: 'Deze pagina bestaat niet, of is verplaatst tijdens het herbouwen van de site.',
  notFoundHome: 'Terug naar de homepage',
}

export type MessageKey = keyof typeof en

export const messages = { en, nl }
