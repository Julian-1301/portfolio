# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Internship recruiters**: people at companies looking for an HBO-ICT intern. They skim, often on a phone, and decide in under a minute whether to open a project or send an email.
- **Junior hiring teams**: developers and engineering leads hiring a junior after graduation. They open a case study and check how problems were solved and whether the code is real.
- **Teachers and school assessment**: lecturers at the Amsterdam University of Applied Sciences who use the portfolio as evidence of competence for the HBO-ICT Software Engineering programme. They read more slowly and look for process, choices and reflection.

## Product Purpose

The personal portfolio of Julian van der Linde, a Software Engineering student. It exists to get him an internship and later a junior role, and to serve as evidence in his study. Success is a recruiter or teacher who understands within a minute what he can do, opens at least one case study, and either emails him or has the evidence they need.

## Positioning

He is presented as a **broad software engineer**: frontend is one strength, alongside data work, backend and infrastructure. The UX and interface design background is an advantage that shows in how his work looks and is explained, not the whole job title. His projects are real, built alone or in real settings, and their case studies show the actual problems and fixes with real numbers.

Open: the hero currently reads "Software engineer with a background in UX and interface design. I build frontends in Vue and TypeScript, and design them first." That leans frontend and design more than the broad positioning. Rewording it is his call.

## Operating Context

- Deployed on GitHub Pages from the `docs/` folder of `github.com/Julian-1301/portfolio`, under the `/portfolio/` base path.
- Fully bilingual, English and Dutch, switchable in the nav. Interface text is in `src/i18n/messages.ts`; content about him and his projects is in `src/content/`.
- Recruiters reach out by email (`j.van.der.linde@outlook.com`) or LinkedIn. There is no contact form.
- Light and dark themes.

## Capabilities and Constraints

- Vue 3, TypeScript and Vite; content is typed data in `src/content/site.ts` and `src/content/projects.ts`.
- Each project has a case study page (`/project/:slug`) with role, context, stack, year, optional live and repo links, optional key figures, chapters with media and optional numbered notes.
- Projects are being added back one at a time, each with a proper case study. The next projects are not decided yet; the layout must work with one project and with several.
- Projects may be Dutch-language products (TK2021 in kaart is in Dutch); the case study text is still bilingual.

## Brand Commitments

- His name, Julian van der Linde, is the identity. No logo.
- Voice: plain, specific, first person, active voice. No buzzwords, no em dashes. Copy should sound like him, not like a brand.

## Evidence on Hand

- **TK2021 in kaart** (2026, personal project): the 2021 Dutch general election from the official Kiesraad XML. Screenshots in `public/images/projects/tk2021/`. Not yet in a public repository or hosted, so it has no live or repo link yet.
- Experience (from his CV, titles as on the CV):
  - Software Developer Intern, Effytool (2025): developed and maintained backend solutions in C#, new features and optimising existing code, with the team; tested and debugged.
  - IT Workplace Technician, Dijklander Ziekenhuis (2023): replaced and managed workplace hardware, resolved support tickets, explained IT solutions to healthcare staff.
  - IT Support Specialist, De Zorgcirkel (2022): guided staff through the move to a new intranet and Office 365, hands-on support and training.
- Skills (CV): Java, JavaScript, TypeScript, C#, HTML, CSS, Tailwind, REST APIs, PHP, SQL, Spring Boot, Vue.js, Scrum/Agile; plus Node.js data scripts and Vite (shown in TK2021).
- Also on the CV: VWO at Da Vinci College (2016-2022); Cambridge Certificate in Advanced English (CAE, 2020). His CV profile stresses software development and data analysis.
- Education: HBO-ICT Software Engineering at the Amsterdam University of Applied Sciences (2023 to now), exchange semester at the University of Michigan School of Information (2025).
- Languages: Dutch (native), English (C2), German (B2).
- Availability: looking for an internship from February 2027. The site says "Based in: Amsterdam" (his choice; the CV lists Purmerend, near Amsterdam). Set in `site.ts`.
- Not on hand yet: portrait photo, CV PDF, GitHub profile link. These are switched off in `site.ts` until supplied. Never fabricate testimonials, client logos, metrics or projects.

## Product Principles

1. **Real work over presentation.** One honest project with real numbers beats several polished placeholders.
2. **Readable in a minute, deep on request.** The homepage answers "what can he do" fast; the case studies hold the detail teachers and engineers look for.
3. **Show the problem, not just the result.** Every case study names what was hard, what did not add up, and what he decided.
4. **Both languages are first class.** Nothing ships in one language only, and switching never breaks the layout.
5. **The site is itself evidence.** Its code quality, accessibility and performance are part of what a reviewer judges.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard navigation, visible focus, reduced-motion support, AA contrast in both themes, and alt text in both languages for every image.
