import { scraped } from './scraped.js';

// Content for each case study. Add a new entry here, then a route in App.jsx.
export const studies = {
  'dealer-registration': {
    title: 'Dealer Registration.',
    client: 'CarMax Auctions',
    role: 'Product Designer II',
    year: '[YEAR]',
    contribution: 'Helped lead the registration refresh and redesign. [Name your specific scope: research, flows, UI, testing.]',
    heroLabel: '[Hero image: final registration flow]',
    contextOne: '[Who the dealers are, what registering lets them do, and how the old process worked.]',
    beforeLabel: '[Before: the old registration flow]',
    prev: { label: '← All work', to: '/#work' },
    next: { label: 'Next: Damage detail card →', to: '/work/damage-detail-card' }
  },
  'damage-detail-card': {
    title: 'Damage Detail Card.',
    client: 'CarMax Auctions',
    role: 'Product Designer II',
    year: '[YEAR]',
    contribution: '[What you owned: research, flows, UI, testing.]',
    heroLabel: '[Hero image: final damage detail card]',
    contextOne: "[Who the dealers are, how they judge a vehicle's condition, and how damage was shown before.]",
    beforeLabel: '[Before: the old damage view]',
    prev: { label: '← Previous: Dealer registration', to: '/work/dealer-registration' },
    next: { label: 'Next: [Project 3] →', to: '/work/project-3' }
  },
  'project-3': {
    title: '[Project Title].',
    client: '[Barclays or American Airlines]',
    role: '[Your role]',
    year: '[YEAR]',
    contribution: '[What you owned: research, flows, UI, testing.]',
    heroLabel: '[Hero image: final design]',
    contextOne: '[Who the users are, what the product lets them do, and how the old experience worked.]',
    beforeLabel: '[Before: the old experience]',
    prev: { label: '← Previous: Damage detail card', to: '/work/damage-detail-card' },
    next: { label: 'Next: The LIFE School →', to: '/work/life-school' }
  },
  ...scraped
};
