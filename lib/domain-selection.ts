// lib/domain-selection.ts
// Utility module for storing, managing, and recommending projects & jobs based on the user's chosen professional domain.

export interface DomainMeta {
  title: string;
  category: string;
  iconName?: string;
  projectCategories: string[];
  projectKeywords: string[];
  jobKeywords: string[];
}

export const domainDefinitions: Record<string, DomainMeta> = {
  'AI & Machine Learning': {
    title: 'AI & Machine Learning',
    category: 'AI & Machine Learning',
    projectCategories: ['ai-ml', 'data-science', 'python'],
    projectKeywords: ['ai', 'machine learning', 'nlp', 'deep learning', 'neural', 'python', 'tensorflow', 'model'],
    jobKeywords: ['ai', 'machine learning', 'data scientist', 'python', 'tensorflow', 'nlp', 'ml'],
  },
  'AI Engineer': {
    title: 'AI Engineer',
    category: 'AI & Machine Learning',
    projectCategories: ['ai-ml', 'data-science', 'python'],
    projectKeywords: ['ai', 'machine learning', 'nlp', 'deep learning', 'neural', 'python', 'tensorflow', 'model'],
    jobKeywords: ['ai engineer', 'machine learning', 'data scientist', 'python', 'tensorflow', 'nlp', 'ml'],
  },
  'Software Development': {
    title: 'Software Development',
    category: 'Software Development',
    projectCategories: ['fullstack', 'web-development', 'android', 'java', 'python'],
    projectKeywords: ['web', 'react', 'next.js', 'fullstack', 'node', 'express', 'frontend', 'backend', 'api'],
    jobKeywords: ['full stack', 'software engineer', 'developer', 'react', 'node.js', 'dsa', 'c++'],
  },
  'Full Stack Developer': {
    title: 'Full Stack Developer',
    category: 'Software Development',
    projectCategories: ['fullstack', 'web-development', 'android', 'java'],
    projectKeywords: ['web', 'react', 'next.js', 'fullstack', 'node', 'express', 'frontend', 'backend', 'api'],
    jobKeywords: ['full stack', 'developer', 'software engineer intern', 'react', 'node.js', 'mongodb'],
  },
  'Data & Analytics': {
    title: 'Data & Analytics',
    category: 'Data & Analytics',
    projectCategories: ['data-science', 'ai-ml', 'python'],
    projectKeywords: ['data', 'pandas', 'analytics', 'visualization', 'sql', 'statistics', 'dashboard'],
    jobKeywords: ['data scientist', 'analytics', 'sql', 'python', 'ml', 'bi'],
  },
  'Data Scientist': {
    title: 'Data Scientist',
    category: 'Data & Analytics',
    projectCategories: ['data-science', 'ai-ml', 'python'],
    projectKeywords: ['data', 'pandas', 'analytics', 'visualization', 'sql', 'statistics', 'dashboard'],
    jobKeywords: ['data scientist', 'analytics', 'sql', 'python', 'ml', 'ai engineer'],
  },
  'Cyber Security': {
    title: 'Cyber Security',
    category: 'Cyber Security',
    projectCategories: ['cyber-security', 'blockchain', 'cloud'],
    projectKeywords: ['security', 'cryptography', 'auth', 'vulnerability', 'firewall', 'network', 'blockchain'],
    jobKeywords: ['cyber security', 'networking', 'siem', 'python', 'security analyst'],
  },
  'Cyber Security Analyst': {
    title: 'Cyber Security Analyst',
    category: 'Cyber Security',
    projectCategories: ['cyber-security', 'blockchain', 'cloud'],
    projectKeywords: ['security', 'cryptography', 'auth', 'vulnerability', 'firewall', 'network'],
    jobKeywords: ['cyber security analyst', 'networking', 'siem', 'python'],
  },
  'Cloud Computing': {
    title: 'Cloud Computing',
    category: 'Cloud Computing',
    projectCategories: ['cloud', 'devops'],
    projectKeywords: ['cloud', 'aws', 'docker', 'kubernetes', 'ci/cd', 'terraform', 'infrastructure'],
    jobKeywords: ['cloud engineer', 'aws', 'docker', 'kubernetes', 'remote'],
  },
  'Cloud Engineer': {
    title: 'Cloud Engineer',
    category: 'Cloud Computing',
    projectCategories: ['cloud', 'devops'],
    projectKeywords: ['cloud', 'aws', 'docker', 'kubernetes', 'ci/cd', 'terraform', 'infrastructure'],
    jobKeywords: ['cloud engineer', 'aws', 'docker', 'kubernetes'],
  },
  'Design': {
    title: 'Design',
    category: 'Design',
    projectCategories: ['web-development', 'fullstack'],
    projectKeywords: ['ui', 'ux', 'figma', 'design', 'frontend', 'responsive', 'accessibility'],
    jobKeywords: ['ui/ux designer', 'figma', 'research', 'prototyping', 'designer'],
  },
  'UI/UX Designer': {
    title: 'UI/UX Designer',
    category: 'Design',
    projectCategories: ['web-development', 'fullstack'],
    projectKeywords: ['ui', 'ux', 'figma', 'design', 'frontend', 'responsive'],
    jobKeywords: ['ui/ux designer', 'figma', 'research', 'prototyping'],
  },
};

export const DEFAULT_DOMAIN = 'AI & Machine Learning';

/**
 * Reads the currently active professional domain chosen by the student.
 */
export function getSelectedDomain(): string {
  if (typeof window === 'undefined') return DEFAULT_DOMAIN;
  try {
    const direct = localStorage.getItem('edugram_selected_domain');
    if (direct && direct.trim()) return direct.trim();

    const profileRaw = localStorage.getItem('edugram_user_profile');
    if (profileRaw) {
      const p = JSON.parse(profileRaw);
      if (p.targetDomain && p.targetDomain.trim()) {
        return p.targetDomain.trim();
      }
    }
  } catch (e) {
    console.warn('Error reading selected domain:', e);
  }
  return DEFAULT_DOMAIN;
}

/**
 * Commits the chosen professional domain to localStorage and synchronizes with student profile.
 */
export function setSelectedDomain(domainName: string, domainCategory?: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('edugram_selected_domain', domainName);

    // Synchronize with edugram_user_profile if present
    const profileRaw = localStorage.getItem('edugram_user_profile');
    let profileObj: any = {};
    if (profileRaw) {
      try {
        profileObj = JSON.parse(profileRaw);
      } catch (e) {}
    }
    profileObj.targetDomain = domainName;
    localStorage.setItem('edugram_user_profile', JSON.stringify(profileObj));

    // Dispatch custom event so all active pages and components update in real time
    window.dispatchEvent(
      new CustomEvent('edugram:domain_selected', {
        detail: { domain: domainName, category: domainCategory || domainName },
      })
    );
  } catch (e) {
    console.warn('Error saving selected domain:', e);
  }
}

/**
 * Checks whether a given project matches the student's chosen domain.
 */
export function isProjectMatchingDomain(project: {
  category: string;
  careerPaths?: string[];
  technologies?: string[];
  title?: string;
  description?: string;
}, domainName: string): boolean {
  if (!domainName) return false;
  const def = domainDefinitions[domainName];

  const lowerDomain = domainName.toLowerCase();
  const lowerCat = project.category?.toLowerCase() || '';
  const lowerTitle = project.title?.toLowerCase() || '';

  // 1. Direct definition category match
  if (def && def.projectCategories.includes(lowerCat)) {
    return true;
  }

  // 2. Career paths match
  if (project.careerPaths && project.careerPaths.some((cp) => cp.toLowerCase().includes(lowerDomain) || lowerDomain.includes(cp.toLowerCase()))) {
    return true;
  }

  // 3. Keyword matching
  if (def) {
    for (const kw of def.projectKeywords) {
      if (lowerTitle.includes(kw) || lowerCat.includes(kw)) {
        return true;
      }
      if (project.technologies && project.technologies.some((t) => t.toLowerCase().includes(kw))) {
        return true;
      }
    }
  }

  // Fallback simple fuzzy check
  return lowerTitle.includes(lowerDomain) || lowerDomain.includes(lowerCat);
}

/**
 * Checks whether a given job or internship matches the student's chosen domain.
 */
export function isJobMatchingDomain(job: {
  title: string;
  skills: string[];
  description?: string;
}, domainName: string): boolean {
  if (!domainName) return false;
  const def = domainDefinitions[domainName];

  const lowerDomain = domainName.toLowerCase();
  const lowerTitle = job.title.toLowerCase();

  // 1. Title match
  if (lowerTitle.includes(lowerDomain) || lowerDomain.includes(lowerTitle)) {
    return true;
  }

  // 2. Definition job keywords match
  if (def) {
    for (const kw of def.jobKeywords) {
      if (lowerTitle.includes(kw)) {
        return true;
      }
      if (job.skills.some((s) => s.toLowerCase() === kw || s.toLowerCase().includes(kw))) {
        return true;
      }
    }
  }

  // 3. Common acronym matching
  if (lowerDomain.includes('ai') || lowerDomain.includes('machine learning')) {
    if (lowerTitle.includes('ai') || lowerTitle.includes('data') || job.skills.includes('Python') || job.skills.includes('ML')) {
      return true;
    }
  }

  if (lowerDomain.includes('software') || lowerDomain.includes('full stack') || lowerDomain.includes('web')) {
    if (lowerTitle.includes('developer') || lowerTitle.includes('software') || job.skills.includes('React') || job.skills.includes('Node.js')) {
      return true;
    }
  }

  return false;
}
