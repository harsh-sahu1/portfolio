export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa?: string;
  highlights: string[];
}

export const education: Education[] = [
  {
    id: 'jecrc-btech',
    institution: 'JECRC Foundation, Jaipur',
    degree: 'B.Tech',
    field: 'Computer Science & Engineering',
    duration: 'Undergraduate',
    highlights: [
      'ONGC Merit Scholarship 2025–26 (Selected among ~1,100 across India)',
      'Smart India Hackathon (SIH) — Top 20 Team Apex',
      'Infosys Springboard: Programming Fundamentals using Python (66 hrs)',
      'Skill India Digital / NIELIT: Yuva AI for All Certified',
      '30+ Certificates & Medals across Academic, STEM & Olympiad events',
      'Focus: AI/ML Research, Evidence-Based Tooling & Prototyping',
    ],
  },
];
