// Every project on the site, in display order. Used by the home page grid and
// the project index (home page and the bottom of each case study).
// Public text only: full case study copy lives in public/content/<slug>.json.
import { cards } from './cards.js';

const all = [
  {
    slug: 'damage-detail-card',
    name: 'Damage Detail Card',
    tags: ['CarMax Auctions', 'Product design'],
    year: '2026',
    credit: 'Product designer, CarMax Auctions',
    title: "I designed the damage detail card that shows dealers a vehicle's true condition.",
    // Locked: the home page shows only a blurred preview.
    locked: true,
    cover: {
      src: '/images/damage-detail-card/cover-locked.jpg',
      alt: 'Blurred preview of the damage assessment design'
    }
  },
  {
    slug: 'dealer-registration',
    name: 'Dealer Registration',
    tags: ['CarMax Auctions', 'Product design'],
    year: '2025',
    title: 'I helped lead the redesign of how dealers register with CarMax Auctions.',
    hidden: true // Hidden for now; set to false (or delete this line) to show it again.
  },
  {
    slug: 'aadvantage-cash',
    name: 'AAdvantage® Cash App',
    tags: ['Truelio', 'UX'],
    year: '2021–2022',
    credit: 'UX designer at Truelio, for American Airlines flight attendants',
    title: 'I designed an app that let flight attendants track card sign-ups and incentives.',
    cover: {
      src: '/images/aadvantage-cash/cover.jpg',
      alt: 'AAdvantage Cash app home screen greeting Joy, with $425 in projected April earnings and 13 applications received and 8 approved, beside a qualification status screen'
    }
  },
  {
    slug: 'life-school',
    name: 'The LIFE School',
    tags: ['Client project', 'UX'],
    year: '2018',
    credit: 'UX designer, with Jarrett Coger (lead) and Treven Holcomb',
    title: cards['life-school'].title,
    cover: cards['life-school'].cover,
    // Where tall crops should anchor (CSS object-position). Keeps the headline in frame.
    focus: 'left top'
  }
  // Hidden for now: 'heal-thy', 'ohto' (their card text is in cards.js).
];

/** Shown projects, numbered in order (01, 02, 03...). */
export const work = all
  .filter((w) => !w.hidden)
  .map((w, i) => ({ ...w, n: String(i + 1).padStart(2, '0'), to: `/work/${w.slug}` }));
