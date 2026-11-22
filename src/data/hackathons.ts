export interface Hackathon {
  id: string;
  event: string;
  award: string;
  project: string;
  description: string;
  date: string;
  rank?: string;
}

export const hackathons: Hackathon[] = [
  {
    id: 'ongc-scholarship',
    event: 'ONGC Merit Scholarship 2025–26',
    award: 'National Merit Scholar',
    project: 'Academic & Engineering Excellence',
    description:
      'Prestigious national scholarship awarded by Oil and Natural Gas Corporation (ONGC), selected among ~1,100 high-merit engineering students across all of India.',
    date: '2025 – 2026',
    rank: 'National Merit',
  },
  {
    id: 'sih-top20',
    event: 'Smart India Hackathon (SIH)',
    award: 'Top 20 + Consolation Prize',
    project: 'Kisan Setu (Team Apex)',
    description:
      'Engineered an MSP procurement and real-time mandi queue management portal for farmers with Team Apex, advancing to the Top 20 in the SIH preliminaries and winning a consolation prize.',
    date: 'National Level',
    rank: 'Top 20 Finalist',
  },
  {
    id: 'hackathon-circuit',
    event: 'National Hackathon Circuit',
    award: '8+ Hackathons Competed',
    project: 'Multi-domain AI Prototypes',
    description:
      'Competed in 8+ national-level hackathons solving real-world challenges across healthcare accessibility (MEDNIVO), e-waste classification (EcoSort AI), and evidence intelligence (GapGlint).',
    date: '2024 – Present',
    rank: 'Active Competitor',
  },
  {
    id: 'academic-medals',
    event: 'Academic & STEM Competitions',
    award: '30+ Certificates & Medals',
    project: 'Olympiads, Coding & Technical Honors',
    description:
      'Recognized across academic, STEM, Olympiad, and competitive technical events for problem solving and continuous intellectual curiosity.',
    date: 'Cumulative',
    rank: 'Honors',
  },
];
