# Portfolio

Julian van der Linde's portfolio. Vue 3, TypeScript and Vite, deployed to GitHub Pages from the `docs/` folder.

```
npm install        # first time, and after pulling
npm run dev        # local site at http://localhost:5173/portfolio/
npm run build      # type-checks, then builds into docs/
npm run lint       # ESLint
npm run format     # Prettier
```

After `npm run build`, commit the `docs/` folder and push.

- How to change text, add a project and fill in the placeholders: [HOW-TO-EDIT.md](HOW-TO-EDIT.md)
- How the site looks and why: [DESIGN.md](DESIGN.md)

## Where things are

```
src/
  content/       site.ts (you, bio, experience, links) and projects.ts (your projects)
  i18n/          English and Dutch interface text, and the useI18n() helper
  styles/        tokens.css (all colors, sizes, spacing) and base.css
  composables/   theme, weight effect (useWeightField), nav color
  components/    nav, hero, WeightText, projects, about, contact, media layouts
  views/         home, project case study, 404
public/          favicon, CV, portrait and project images
```
