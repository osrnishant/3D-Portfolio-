export interface Stat {
  label: string;
  value: string;
}

export interface Achievement {
  metric: string;
  description: string;
}

export interface SkillCategory {
  [category: string]: string[];
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  type: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export interface NavLink {
  label: string;
  href: string;
  download?: boolean;
}

export interface ResumeData {
  name: string;
  title: string;
  tagline: string;
  about: string;
  email: string;
  location: string;
  linkedin: string;
  availability: string;
  profileImage: string;
  profileImageFallback?: string;
  resumePdf: string;
  stats: Stat[];
  achievements: Achievement[];
  skills: SkillCategory;
  experience: Experience[];
  education: Education[];
  languages: string[];
  projects: Project[];
}
