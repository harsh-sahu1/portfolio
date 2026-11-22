export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  color: string;
  badge?: string;
}

export const projects: Project[] = [
  {
    id: 'gapglint',
    name: 'GapGlint',
    tagline: 'Cross-document fact checker with sentence-level citations',
    description:
      'When researching scholarships, grants, or official policies, information is scattered across 5–10 conflicting pages and PDFs. GapGlint parses sources, extracts atomic claims with exact source links, and surfaces where documents disagree or leave gaps.',
    techStack: ['React 18', 'TypeScript', 'FastAPI', 'Python', 'Google Gemini API', 'PyMuPDF', 'Tailwind CSS'],
    githubUrl: 'https://github.com/harsh-sahu1/GapGlint',
    color: '#6C63FF',
    badge: 'Flagship Project',
  },
  {
    id: 'mednivo',
    name: 'MEDNIVO',
    tagline: 'Voice-guided prescription & health assistant in Hindi & English',
    description:
      'Built for seniors who struggle with complex medicine schedules and small screens. Features natural voice conversations in Hindi and English with strict safety checks so dosage records are never accidentally marked without confirmation.',
    techStack: ['React 19', 'TypeScript', 'FastAPI', 'Python 3.13', 'Google Gemini API', 'Gnani Prisma STT', 'SQLite'],
    githubUrl: 'https://github.com/harsh-sahu1',
    color: '#00D4FF',
    badge: 'Healthcare Assistant',
  },
  {
    id: 'kisan-setu',
    name: 'Kisan Setu',
    tagline: 'Smart India Hackathon Top 20 · Team Apex',
    description:
      'Eliminates chaotic days-long queues at government MSP procurement centres by providing farmers with digital slot bookings, live token tracking, and direct status notifications.',
    techStack: ['React', 'JavaScript', 'Python', 'FastAPI', 'PostgreSQL', 'REST APIs'],
    githubUrl: 'https://github.com/harsh-sahu1/SIH',
    color: '#34D399',
    badge: 'SIH Finalist',
  },
  {
    id: 'ecosort-ai',
    name: 'EcoSort AI',
    tagline: 'E-waste component risk analysis and safe disposal guide',
    description:
      'Users upload a photo or description of broken electronics to identify toxic components (lithium, lead, mercury) and receive realistic, step-by-step local recycling instructions.',
    techStack: ['Python', 'FastAPI', 'Google Gemini API', 'React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/harsh-sahu1/ecosort-ai',
    color: '#10B981',
    badge: 'Sustainability Tool',
  },
  {
    id: 'recruit-ai',
    name: 'Recruit AI',
    tagline: 'Evidence-based resume & job description evaluator',
    description:
      'Replaces simple keyword scanning by verifying whether candidate resumes show demonstrated project evidence for listed skills, flagging gaps between claims and actual experience.',
    techStack: ['Python', 'FastAPI', 'Google Gemini API', 'React', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/harsh-sahu1/recruit-ai',
    color: '#F59E0B',
    badge: 'Evaluation Engine',
  },
  {
    id: 'fair-student-support',
    name: 'Fair Student Support System',
    tagline: 'Academic intervention allocation with bias disparity auditing',
    description:
      'A machine learning allocation model that actively audits group recall rates across demographics, ensuring educational support algorithms do not overlook underrepresented students.',
    techStack: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Jupyter'],
    githubUrl: 'https://github.com/harsh-sahu1/fair-student-support-system',
    color: '#FF6B6B',
    badge: 'Fairness in ML',
  },
];
