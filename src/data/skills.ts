export interface SkillCategory {
  name: string;
  color: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    color: '#6C63FF',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++', 'Rust (Learning)'],
  },
  {
    name: 'AI / ML & Intelligence',
    color: '#00D4FF',
    skills: [
      'Google Gemini API',
      'NLP / NLU',
      'scikit-learn',
      'PyTorch',
      'LangChain',
      'Gnani Prisma STT & TTS',
      'PyMuPDF',
      'Responsible AI / Fairness Auditing',
    ],
  },
  {
    name: 'Frontend Engineering',
    color: '#34D399',
    skills: ['React 18 / 19', 'TypeScript', 'Vite', 'Tailwind CSS v3 / v4', 'Three.js / R3F', 'Framer Motion'],
  },
  {
    name: 'Backend & APIs',
    color: '#FF6B6B',
    skills: ['FastAPI', 'Python 3.13', 'SQLAlchemy', 'PostgreSQL', 'SQLite', 'Node.js', 'REST APIs'],
  },
  {
    name: 'Tools & DevOps',
    color: '#F59E0B',
    skills: ['Git & GitHub', 'Vercel', 'Linux', 'Docker', 'Jupyter', 'BeautifulSoup4', 'httpx'],
  },
];
