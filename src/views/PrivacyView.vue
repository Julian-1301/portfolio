<template>
  <div class="privacy-page">
    <div class="page-wrap">

      <div class="page-header">
        <span class="section-tag" style="background: var(--accent2);">privacy implications</span>
        <h2>This isn't hypothetical.</h2>
        <p>
          IRIS demonstrates a pipeline that already exists in the real world.
          Clearview AI has built a database of 30+ billion faces scraped from the public web.
          Several companies sell access to similar tools. The barrier to entry gets lower every year.
        </p>
      </div>

      <!-- main concern cards -->
      <div class="concerns-grid">
        <div v-for="c in concerns" :key="c.title" class="concern-card">

          <div class="concern-body">
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </div>

      <div class="section-divider">
        <span class="section-tag">legal landscape</span>
      </div>

      <!-- legal table -->
      <div class="legal-section">
        <h3>Where does the law stand?</h3>
        <p class="legal-intro">Regulation exists, but it moves slower than the technology.</p>
        <table class="legal-table">
          <thead>
            <tr>
              <th>Framework / Region</th>
              <th>What it covers</th>
              <th>Gap / limitation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in legal" :key="l.framework">
              <td class="fw-name">{{ l.framework }}</td>
              <td>{{ l.covers }}</td>
              <td class="gap-cell">{{ l.gap }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section-divider">
        <span class="section-tag">real world cases</span>
      </div>

      <!-- cases -->
      <div class="cases-list">
        <div v-for="c in cases" :key="c.title" class="case-item">
          <div class="case-year">{{ c.year }}</div>
          <div class="case-body">
            <div class="case-title">{{ c.title }}</div>
            <div class="case-desc">{{ c.desc }}</div>
          </div>
          <div class="case-tag" :class="c.tagClass">{{ c.tag }}</div>
        </div>
      </div>

      <div class="bottom-nav">
        <RouterLink to="/demo" class="btn-ghost">← Back to demo</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
const concerns = [
  {
    icon: '👓',
    title: 'Passive capture via smart glasses',
    desc: 'Meta Ray-Ban, Google Glass, and similar devices record video from the wearer\'s point of view. Unlike a phone camera, there\'s no obvious signal that recording is happening. Bystanders have no way to notice, object, or opt out.',
  },
  {
    icon: '🗄️',
    title: 'Your public photos are already indexed',
    desc: 'Every time you post a photo on LinkedIn, tag yourself on Facebook, or appear in a university photo, that image may be scraped and added to a facial recognition database. You consented to the platform. You never consented to the database.',
  },
  {
    icon: '🔗',
    title: 'Aggregation makes it serious',
    desc: 'No single data source is that alarming. LinkedIn shows your employer, Instagram might show your neighborhood. But when a system combines 10+ sources in real time, the result is a profile more detailed than most background checks.',
  },
  {
    icon: '🎯',
    title: 'Targeted harm becomes trivial',
    desc: 'Stalking, doxxing, social engineering, and targeted harassment all become significantly easier when a stranger can look up someone\'s full profile just by seeing their face. This doesn\'t require a state actor or large organization.',
  },
  {
    icon: '⚖️',
    title: 'GDPR helps, but has limits',
    desc: 'GDPR classifies biometric data as sensitive and requires explicit consent for processing. But enforcement is slow, cross-border data flows are hard to regulate, and many actors operate outside EU jurisdiction entirely.',
  },
  {
    icon: '🏛️',
    title: 'Mission creep in legitimate use',
    desc: 'Even systems built for legitimate purposes: law enforcement, fraud prevention, etcetera tend to expand beyond their original scope. Once the infrastructure exists, the question of who gets access and under what conditions becomes political.',
  },
]

const legal = [
  {
    framework: 'GDPR (EU)',
    covers: 'Biometric data is "special category"; It requires explicit consent to process',
    gap: 'Hard to enforce on foreign companies; individuals rarely know their data is being processed',
  },
  {
    framework: 'AI Act (EU, 2024)',
    covers: 'Bans real-time remote facial recognition in public spaces for most uses',
    gap: 'Significant exceptions for law enforcement; still being implemented',
  },
  {
    framework: 'Illinois BIPA (US)',
    covers: 'Requires informed consent before collecting biometric identifiers',
    gap: 'State-level only; most US states have no equivalent law',
  },
  {
    framework: 'No specific law (most of world)',
    covers: 'General privacy or data protection laws may apply indirectly',
    gap: 'Facial recognition is largely unregulated in most jurisdictions',
  },
]

const cases = [
  {
    year: '2020',
    title: 'Clearview AI exposed',
    desc: 'NYT investigation revealed Clearview had scraped 3B+ photos without consent and sold access to law enforcement. Used to identify people at protests.',
    tag: 'surveillance',
    tagClass: 'tag-red',
  },
  {
    year: '2021',
    title: 'UK police facial recognition at protests',
    desc: 'Metropolitan Police used live facial recognition cameras at London events, matching faces against watchlists in real time without individual consent.',
    tag: 'law enforcement',
    tagClass: 'tag-orange',
  },
  {
    year: '2023',
    title: 'Harvard students\' I-XRAY experiment',
    desc: 'Two students demonstrated that Meta Ray-Ban glasses combined with PimEyes (a reverse face search engine) could identify strangers on the street and pull up their home addresses in seconds.',
    tag: 'academic demo',
    tagClass: 'tag-blue',
  },
  {
    year: '2024',
    title: 'EU AI Act signed into law',
    desc: 'The EU becomes the first jurisdiction to comprehensively regulate AI, including restrictions on real-time facial recognition in public spaces. Enforcement begins in stages through 2026.',
    tag: 'regulation',
    tagClass: 'tag-green',
  },
]
</script>

<style scoped>
.privacy-page { padding: 60px 0 80px; }

.page-header {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 2px solid var(--accent2);
}
.page-header h2 { font-size: 36px; margin: 12px 0 14px; }
.page-header p { color: var(--muted); font-size: 15px; line-height: 1.75; max-width: 680px; }

/* concerns */
.concerns-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}
.concern-card {
  background: var(--surface2);
  border: 1.5px solid var(--border);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.15s;
}
.concern-card:hover { border-color: var(--accent2); }
.concern-icon { font-size: 28px; }
.concern-body h3 { font-size: 14px; margin-bottom: 8px; letter-spacing: -0.01em; }
.concern-body p { font-size: 13px; color: var(--muted); line-height: 1.65; }

.section-divider {
  margin: 48px 0 28px;
  padding-bottom: 16px;
  border-bottom: 1.5px solid var(--border);
}

/* legal table */
.legal-section { margin-bottom: 48px; }
.legal-section h3 { font-size: 22px; margin-bottom: 8px; }
.legal-intro { color: var(--muted); font-size: 14px; margin-bottom: 20px; }

.legal-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.legal-table th {
  font-family: var(--mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  text-align: left;
  padding: 10px 14px;
  background: var(--surface);
  border: 1.5px solid var(--border);
}
.legal-table td {
  padding: 12px 14px;
  border: 1px solid var(--border);
  vertical-align: top;
  line-height: 1.55;
}
.legal-table tr:hover td { background: var(--surface); }
.fw-name { font-family: var(--mono); font-size: 12px; font-weight: 700; width: 200px; }
.gap-cell { color: var(--muted); font-size: 12px; }

/* cases */
.cases-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 48px;
  border: 1.5px solid var(--border);
  border-radius: 2px;
  overflow: hidden;
}
.case-item {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 16px;
  padding: 16px 20px;
  align-items: start;
  border-bottom: 1px solid var(--border);
  background: var(--surface2);
  transition: background 0.1s;
}
.case-item:last-child { border-bottom: none; }
.case-item:hover { background: var(--surface); }
.case-year {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  padding-top: 2px;
}
.case-title { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
.case-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

.case-tag {
  font-family: var(--mono);
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 2px;
  white-space: nowrap;
  align-self: center;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.tag-red    { background: #fde8e8; color: #9b1c1c; border: 1px solid #f5aaaa; }
.tag-orange { background: #fff3cd; color: #7a5400; border: 1px solid #ffd97d; }
.tag-blue   { background: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; }
.tag-green  { background: #e6f4ea; color: #1e6b35; border: 1px solid #a8d5b5; }

/* reflection */
.reflection {
  background: #faf7f2;
  border: 1.5px solid var(--border-dark);
  border-left: 4px solid var(--accent2);
  padding: 28px 32px;
  margin-bottom: 40px;
}
.reflection-label {
  font-family: var(--mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent2);
  margin-bottom: 16px;
}
.reflection p {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text);
  margin-bottom: 14px;
}
.reflection p:last-child { margin-bottom: 0; }

/* bottom nav */
.bottom-nav {
  padding-top: 28px;
  border-top: 1.5px solid var(--border);
}
.btn-ghost {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--muted);
  padding: 10px 20px;
  border: 1.5px solid var(--border-dark);
  transition: all 0.15s;
}
.btn-ghost:hover { color: var(--text); border-color: var(--accent); }

@media (max-width: 860px) {
  .concerns-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .privacy-page { padding: 32px 0 60px; }

  .page-header h2 { font-size: 26px; }
  .page-header p { font-size: 14px; }

  .concerns-grid {
    grid-template-columns: 1fr;
  }

  .legal-section { overflow-x: auto; }
  .legal-table { min-width: 520px; }

  .case-item {
    grid-template-columns: 48px 1fr;
    grid-template-rows: auto auto;
  }
  .case-tag {
    grid-column: 2;
    justify-self: start;
    margin-top: 8px;
  }

  .reflection { padding: 20px; }
}
</style>
