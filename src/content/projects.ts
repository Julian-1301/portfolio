import type { Localized } from '../i18n'
import tk2021Checks from './code/tk2021-checks.txt?raw'

// Projects are added back one at a time as each one is rebuilt.

export interface MediaImage {
  /** File name inside public/images/projects/<slug>/ (or a path like 'shared/file.jpg' from images/projects/) */
  file: string
  /** The same screen on a phone, shown instead on small screens so it can be read there. */
  mobile?: string
  alt: Localized
}

/**
 * How a group of images is laid out.
 * - single: one wide image
 * - pair: two images side by side
 * - device: a desktop screen with a phone screen overlapping it (first image desktop, second mobile)
 * - phones: two or three phone screens side by side
 */
export type MediaLayout = 'single' | 'pair' | 'device' | 'phones'

export interface Media {
  layout: MediaLayout
  images: MediaImage[]
  caption?: Localized
}

/** A numbered point inside a case study chapter, such as a problem and how it was solved. */
export interface CaseNote {
  title: Localized
  body: Localized
}

/** A real excerpt from the project's code, shown verbatim. Keep the source in content/code/. */
export interface CodeExcerpt {
  /** Path of the file inside the project's repository. */
  file: string
  source: string
  caption: Localized
}

export interface CaseSection {
  heading: Localized
  paragraphs: Localized[]
  notes?: CaseNote[]
  code?: CodeExcerpt
  media?: Media
}

/** A hard number about the project, shown large: 352 with the label 'municipalities'. Formatted per language. */
export interface Figure {
  value: number
  label: Localized
}

export interface Project {
  slug: string
  title: string
  year: string
  context: Localized
  discipline: Localized
  summary: Localized
  /** One line for the homepage hero when this is the lead project: the most telling fact about it. */
  teaser?: Localized
  /** Featured projects get a large row in the index; the first one leads the page. Keep this to three or four. */
  featured: boolean
  /** Shown in the project index. */
  cover: Media
  /** The first image of the case study, so it doesn't repeat the index. Falls back to cover. */
  hero?: Media
  figures?: Figure[]
  role: Localized
  stack: string[]
  links: { live?: string; repo?: string }
  sections: CaseSection[]
}

const tk2021: Project = {
  slug: 'tk2021',
  title: 'TK2021 in kaart',
  year: '2026',
  context: { en: 'Personal project', nl: 'Eigen project' },
  discipline: { en: 'Data visualisation, frontend', nl: 'Datavisualisatie, frontend' },
  summary: {
    en: 'The 2021 Dutch general election, read straight from the official XML of the Kiesraad: every municipality, almost 12,000 polling stations, and a voting guide built from real votes in parliament.',
    nl: 'De Tweede Kamerverkiezing van 2021, direct uit de officiële XML van de Kiesraad: elke gemeente, bijna 12.000 stembureaus, en een kieswijzer op basis van echt stemgedrag in de Kamer.',
  },
  teaser: {
    en: '11,934 polling stations on one map',
    nl: '11.934 stembureaus op één kaart',
  },
  featured: true,
  cover: {
    layout: 'device',
    images: [
      {
        file: 'home.jpg',
        alt: {
          en: 'Homepage of TK2021 in kaart: 10,462,677 times the red pencil, with the national figures beside it',
          nl: 'Homepage van TK2021 in kaart: 10.462.677 keer het rode potlood, met de landelijke cijfers ernaast',
        },
      },
      {
        file: 'home-mobile.jpg',
        alt: { en: 'The same homepage on a phone', nl: 'Dezelfde homepage op een telefoon' },
      },
    ],
  },
  hero: {
    layout: 'phones',
    images: [
      {
        file: 'home-mobile.jpg',
        alt: {
          en: 'The homepage on a phone: 10,462,677 times the red pencil',
          nl: 'De homepage op een telefoon: 10.462.677 keer het rode potlood',
        },
      },
      {
        file: 'map-mobile.jpg',
        alt: {
          en: 'The municipality map on a phone, with the party picker under it',
          nl: 'De gemeentekaart op een telefoon, met de partijkeuze eronder',
        },
      },
      {
        file: 'kieswijzer-mobile.jpg',
        alt: {
          en: 'The voting guide on a phone: motion 1 of 23',
          nl: 'De kieswijzer op een telefoon: motie 1 van 23',
        },
      },
    ],
    caption: {
      en: 'Every view works on a phone, maps included.',
      nl: 'Elke weergave werkt op een telefoon, de kaarten ook.',
    },
  },
  figures: [
    { value: 352, label: { en: 'municipalities', nl: 'gemeenten' } },
    {
      value: 11934,
      label: { en: 'polling stations on the map', nl: 'stembureaus op de kaart' },
    },
    { value: 397, label: { en: 'XML files, almost 2 GB', nl: 'XML-bestanden, bijna 2 GB' } },
    {
      value: 23,
      label: { en: 'real motions in the voting guide', nl: 'echte moties in de kieswijzer' },
    },
  ],
  role: {
    en: 'Solo: design, data pipeline and frontend',
    nl: 'Alleen: ontwerp, datapipeline en frontend',
  },
  stack: ['Vue 3', 'TypeScript', 'Vite', 'd3-geo', 'fast-xml-parser'],
  links: {},
  sections: [
    {
      heading: { en: 'The question', nl: 'De vraag' },
      paragraphs: [
        {
          en: 'Election results usually reach you as one national bar chart. But the Kiesraad publishes everything, down to each polling station, as open XML that almost nobody opens.',
          nl: 'Een verkiezingsuitslag zie je meestal als één landelijke staafgrafiek. Maar de Kiesraad publiceert alles, tot op het stembureau, als open XML die bijna niemand opent.',
        },
        {
          en: 'I wanted to see what is in there: where each party was strong, what happened in my own street, and how 2021 compares with 2017 and 2023. The site is in Dutch, because it is about a Dutch election.',
          nl: 'Ik wilde zien wat erin staat: waar elke partij sterk was, wat er in mijn eigen straat gebeurde, en hoe 2021 zich verhoudt tot 2017 en 2023.',
        },
      ],
      media: {
        layout: 'single',
        images: [
          {
            file: 'map.jpg',
            mobile: 'map-mobile.jpg',
            alt: {
              en: "Map of all 352 municipalities, coloured by one party's share of the vote",
              nl: 'Kaart van alle 352 gemeenten, gekleurd naar het aandeel van één partij',
            },
          },
        ],
        caption: {
          en: "The map shows one party's share, or the largest party, in every municipality.",
          nl: 'De kaart toont het aandeel van één partij, of de grootste partij, in elke gemeente.',
        },
      },
    },
    {
      heading: { en: 'From XML to JSON', nl: 'Van XML naar JSON' },
      paragraphs: [
        {
          en: 'The results come as EML, an open XML standard for elections: 397 files for 2021. TypeScript scripts read them and write small JSON files the site loads directly, so there is no server and no database.',
          nl: 'De uitslag komt als EML, een open XML-standaard voor verkiezingen: 397 bestanden voor 2021. TypeScript-scripts lezen ze en schrijven kleine JSON-bestanden die de site direct laadt, dus zonder server en zonder database.',
        },
        {
          en: 'The scripts check themselves. If they do not find 352 municipalities, if the municipalities do not add up to the national total, or if there are not 150 elected members, they stop and write nothing.',
          nl: 'De scripts controleren zichzelf. Vinden ze geen 352 gemeenten, tellen de gemeenten niet op tot het landelijke totaal, of zijn er geen 150 gekozenen, dan stoppen ze en schrijven ze niets weg.',
        },
      ],
      code: {
        file: 'scripts/build-data.ts',
        source: tk2021Checks,
        caption: {
          en: 'The checks that run before anything is written. If one fails, the script stops.',
          nl: 'De controles die draaien voordat er iets wordt weggeschreven. Faalt er één, dan stopt het script.',
        },
      },
      media: {
        layout: 'single',
        images: [
          {
            file: 'stations.jpg',
            mobile: 'stations-mobile.jpg',
            alt: {
              en: 'Amsterdam per polling station: each dot is a polling station, sized by its number of votes',
              nl: 'Amsterdam per stembureau: elke stip is een stembureau, zo groot als het aantal stemmen',
            },
          },
        ],
        caption: {
          en: 'Zoom in on a municipality and every polling station gets its own dot.',
          nl: 'Zoom in op een gemeente en elk stembureau krijgt een eigen stip.',
        },
      },
    },
    {
      heading: { en: 'What did not add up', nl: 'Wat niet klopte' },
      paragraphs: [
        {
          en: 'Official data is not clean data. Every fix lives in one corrections file in the code, with its source, and the site has a page that explains them.',
          nl: 'Officiële data is geen schone data. Elke correctie staat in één bestand in de code, met de bron erbij, en de site heeft een pagina die ze uitlegt.',
        },
      ],
      notes: [
        {
          title: {
            en: 'Den Haag had a turnout of almost 90%',
            nl: 'Den Haag had een opkomst van bijna 90%',
          },
          body: {
            en: 'Den Haag counts the postal votes from abroad, and in 2017 and 2021 they sit inside its result. I take the 63,293 votes out, so Den Haag is just Den Haag and the years compare.',
            nl: 'Den Haag telt de briefstemmen uit het buitenland, en in 2017 en 2021 zitten die in de uitslag van Den Haag. Ik haal de 63.293 stemmen eruit, zodat Den Haag gewoon Den Haag is en de jaren vergelijkbaar zijn.',
          },
        },
        {
          title: { en: 'An id is not a place on the list', nl: 'Een id is geen plek op de lijst' },
          body: {
            en: "In the result file a candidate's id looks like their list position, but it is the order in which they were elected. With the real positions from the candidate lists, three MPs turn out to have won their seat on preference votes.",
            nl: 'In het resultaatbestand lijkt het id van een kandidaat de plek op de lijst, maar het is de volgorde waarin ze gekozen zijn. Met de echte plekken uit de kandidatenlijsten blijkt dat drie Kamerleden hun zetel met voorkeurstemmen haalden.',
          },
        },
        {
          title: {
            en: 'Polling stations have no coordinates',
            nl: 'Stembureaus hebben geen coördinaten',
          },
          body: {
            en: 'The XML names a polling station by number and sometimes a postcode. I match them to the open list of waarismijnstemlokaal.nl, first on number and then on postcode, which places 11,934 of the 13,102 physical stations.',
            nl: 'De XML noemt een stembureau bij nummer en soms postcode. Ik koppel ze aan de open lijst van waarismijnstemlokaal.nl, eerst op nummer en dan op postcode. Zo staan 11.934 van de 13.102 fysieke stembureaus op de kaart.',
          },
        },
        {
          title: { en: '2017 was not complete in XML', nl: '2017 was niet compleet in XML' },
          body: {
            en: 'Two electoral districts, Tilburg and Dordrecht, only published their 2017 results per municipality as Excel. The pipeline reads those too.',
            nl: 'Twee kieskringen, Tilburg en Dordrecht, publiceerden hun uitslag van 2017 per gemeente alleen als Excel. De pipeline leest die ook in.',
          },
        },
      ],
    },
    {
      heading: { en: 'A voting guide without opinions', nl: 'Een kieswijzer zonder meningen' },
      paragraphs: [
        {
          en: 'Most voting guides ask about positions someone summarised. This one uses 23 real motions that the parliament elected in 2021 voted on, from the open data of the Tweede Kamer. Parties sit where they actually voted, and every question links to its motion.',
          nl: 'De meeste kieswijzers vragen naar standpunten die iemand heeft samengevat. Deze gebruikt 23 echte moties waarover de Kamer van 2021 stemde, uit de open data van de Tweede Kamer. Partijen staan waar ze echt stemden, en elke vraag linkt naar de motie.',
        },
      ],
      media: {
        layout: 'single',
        images: [
          {
            file: 'kieswijzer.jpg',
            mobile: 'kieswijzer-mobile.jpg',
            alt: {
              en: 'The voting guide: motion 1 of 23, with buttons for and against',
              nl: 'De kieswijzer: motie 1 van 23, met knoppen voor en tegen',
            },
          },
        ],
      },
    },
    {
      heading: { en: 'Paper, ink and a red pencil', nl: 'Papier, inkt en een rood potlood' },
      paragraphs: [
        {
          en: 'The design comes from the ballot paper itself: warm paper, black ink and the red pencil. Red only ever means votes or a choice, so it never decorates.',
          nl: 'Het ontwerp komt van het stembiljet zelf: warm papier, zwarte inkt en het rode potlood. Rood betekent alleen stemmen of een keuze, dus het is nooit versiering.',
        },
        {
          en: 'The maps are SVG I draw myself with d3-geo, without map tiles. The borders already use the Dutch RD coordinate system, so they only need scaling. Comparisons are drawn on the 2023 borders, so merged municipalities count as one.',
          nl: 'De kaarten zijn SVG die ik zelf teken met d3-geo, zonder kaarttegels. De grenzen staan al in het Nederlandse RD-stelsel, dus ze hoeven alleen geschaald te worden. Vergelijkingen staan op de grenzen van 2023, zodat samengevoegde gemeenten als één tellen.',
        },
      ],
      media: {
        layout: 'single',
        images: [
          {
            file: 'compare.jpg',
            mobile: 'compare-mobile.jpg',
            alt: {
              en: 'Seats in 2017, 2021 and 2023 side by side on a black band',
              nl: 'Zetels in 2017, 2021 en 2023 naast elkaar op een zwarte band',
            },
          },
        ],
      },
    },
    {
      heading: { en: 'What I would do differently', nl: 'Wat ik anders zou doen' },
      paragraphs: [
        {
          en: 'Write automated tests around the corrections file from the start. The scripts already refuse to write when the totals do not add up, but a test per fix would make sure a new download of the source files can never quietly undo one.',
          nl: 'Vanaf het begin geautomatiseerde tests schrijven rond het correctiebestand. De scripts weigeren al te schrijven als de totalen niet kloppen, maar een test per correctie zou zorgen dat een nieuwe download van de bronbestanden er nooit stilletjes een ongedaan maakt.',
        },
      ],
    },
  ],
}

export const projects: Project[] = [tk2021]

const byYearDesc = (a: Project, b: Project) => Number(b.year) - Number(a.year)

export const sortedProjects = (): Project[] => [...projects].sort(byYearDesc)

/** The project that leads the homepage: the newest featured one. */
export const leadProject = (): Project | undefined => sortedProjects().find((p) => p.featured)

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
