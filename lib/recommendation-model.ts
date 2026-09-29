// lib/recommendation-model.ts
// AI-powered recommendation model for domain-specific learning videos and reels

import { careers, type Career } from './data';
import { learningVideos, learningReels, type LearningVideo, type LearningReel } from './video-data';

export interface DomainRecommendationResult {
  domain: Career;
  recommendedVideos: LearningVideo[];
  recommendedReels: LearningReel[];
  domainSkills: string[];
  programmingLanguages: string[];
  allFilterTags: string[];
  totalMatches: number;
}

// Common programming languages & tech stack identifiers
const KNOWN_PROGRAMMING_LANGUAGES = new Set([
  'python',
  'javascript',
  'typescript',
  'java',
  'c++',
  'c',
  'embedded c',
  'r',
  'sql',
  'html/css',
  'html',
  'css',
  'solidity',
  'dart',
  'kotlin',
  'swift',
  'php',
  'ruby',
  'go',
  'rust',
  'bash',
  'shell',
]);

// Synonym dictionary for fuzzy and semantic tag matching
const SYNONYM_MAP: Record<string, string[]> = {
  ml: ['machine learning', 'scikit-learn', 'deep learning', 'data science'],
  'machine learning': ['ml', 'data science', 'scikit-learn', 'ai'],
  ai: ['artificial intelligence', 'machine learning', 'deep learning', 'neural networks'],
  dsa: ['data structures', 'algorithms', 'leetcode', 'problem solving'],
  'data structures': ['dsa', 'algorithms', 'leetcode'],
  sql: ['database', 'databases', 'rdbms', 'queries', 'mysql', 'postgresql'],
  stats: ['statistics', 'probability', 'mathematics', 'math'],
  statistics: ['stats', 'probability', 'mathematics', 'math', 'analytics'],
  k8s: ['kubernetes', 'containers', 'devops', 'cloud'],
  kubernetes: ['k8s', 'containers', 'devops', 'cloud'],
  js: ['javascript', 'web development', 'frontend'],
  javascript: ['js', 'web development', 'frontend', 'node.js', 'react'],
  react: ['react.js', 'frontend', 'javascript', 'next.js', 'web development'],
  cybersecurity: ['cyber security', 'ethical hacking', 'infosec', 'network security', 'penetration testing'],
  'cyber security': ['cybersecurity', 'ethical hacking', 'infosec', 'network security'],
  cloud: ['aws', 'azure', 'gcp', 'cloud computing', 'devops'],
  figma: ['ui/ux', 'design', 'prototyping', 'wireframing', 'user interface'],
  'ui/ux': ['figma', 'design', 'wireframing', 'prototyping', 'user experience'],
  seo: ['digital marketing', 'search engine', 'analytics', 'traffic'],
  solidity: ['smart contracts', 'ethereum', 'blockchain', 'web3'],
  flutter: ['dart', 'mobile development', 'cross-platform', 'android', 'ios'],
  ros: ['robotics', 'robot operating system', 'automation', 'mechatronics'],
};

/**
 * Normalizes text for comparison (lowercase, trimmed, stripped of special characters)
 */
function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9+#]/g, '').trim();
}

/**
 * Returns matching score between a video tag and domain skills/languages.
 * Short tags/skills (<= 3 chars like 'r', 'c', 'ai', 'ml', 'sql') strictly require EXACT match.
 */
export function tagMatchesSkill(tag: string, skill: string): boolean {
  const normTag = normalize(tag);
  const normSkill = normalize(skill);

  if (!normTag || !normSkill) return false;
  if (normTag === normSkill) return true;

  // If either tag or skill is short (<= 3 chars, e.g. 'r', 'c', 'ai', 'ml', 'sql', 'dsa'):
  // ONLY ALLOW EXACT MATCHES (no substring containment).
  if (normTag.length <= 3 || normSkill.length <= 3) {
    const tagSynonyms = SYNONYM_MAP[tag.toLowerCase().trim()] || [];
    if (tagSynonyms.some((s) => normalize(s) === normSkill)) return true;

    const skillSynonyms = SYNONYM_MAP[skill.toLowerCase().trim()] || [];
    if (skillSynonyms.some((s) => normalize(s) === normTag)) return true;

    return false;
  }

  // Specific exclusions to prevent unrelated substring matches
  if ((normSkill === 'userresearch' && normTag === 'research') || (normTag === 'userresearch' && normSkill === 'research')) {
    return false;
  }

  // Both terms are 4+ characters: check exact match or clear substring containment
  if (normTag === normSkill) return true;
  if (normTag.includes(normSkill) || normSkill.includes(normTag)) return true;

  // Check synonym mappings
  const rawTagLower = tag.toLowerCase().trim();
  const rawSkillLower = skill.toLowerCase().trim();

  const tagSynonyms = SYNONYM_MAP[rawTagLower] || [];
  for (const s of tagSynonyms) {
    const normS = normalize(s);
    if (normS === normSkill) return true;
    if (normS.length > 3 && (normS.includes(normSkill) || normSkill.includes(normS))) return true;
  }

  const skillSynonyms = SYNONYM_MAP[rawSkillLower] || [];
  for (const s of skillSynonyms) {
    const normS = normalize(s);
    if (normS === normTag) return true;
    if (normS.length > 3 && (normS.includes(normTag) || normTag.includes(normS))) return true;
  }

  return false;
}

/**
 * Tests if text contains a skill using regex word boundaries
 */
function textContainsSkill(text: string, skill: string): boolean {
  if (!text || !skill) return false;
  const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'i');
  return regex.test(text);
}

/**
 * Finds a career by slug, title, or alias
 */
export function getCareerBySlug(slugOrTitle: string): Career | undefined {
  if (!slugOrTitle) return undefined;
  const target = normalize(slugOrTitle);
  return careers.find(
    (c) =>
      normalize(c.slug) === target ||
      normalize(c.title) === target ||
      target.includes(normalize(c.slug)) ||
      normalize(c.slug).includes(target)
  );
}

/**
 * Extracts programming languages and skills for a domain
 */
export function getDomainSkillBreakdown(career: Career): {
  programmingLanguages: string[];
  domainSkills: string[];
  allFilterTags: string[];
} {
  const languages: string[] = [];
  const skills: string[] = [];

  career.skills.forEach((s) => {
    const norm = s.toLowerCase().trim();
    if (KNOWN_PROGRAMMING_LANGUAGES.has(norm)) {
      languages.push(s);
    } else {
      skills.push(s);
    }
  });

  return {
    programmingLanguages: languages,
    domainSkills: skills,
    allFilterTags: ['All', ...languages, ...skills],
  };
}

/**
 * Recommendation Model Scoring Function:
 * Computes relevance score between a learning video and a career domain.
 * Strictly requires at least one primary skill, language, or category match.
 */
export function calculateVideoRelevanceScore(
  video: LearningVideo,
  career: Career,
  selectedFilter?: string
): { score: number; matchedTags: string[] } {
  let score = 0;
  const matchedTags: string[] = [];

  const domainSkills = career.skills;
  const careerCategory = career.category.toLowerCase();
  const videoCategory = video.category.toLowerCase();

  // If specific skill filter is active, check strictly for that skill first
  if (selectedFilter && selectedFilter !== 'All') {
    const hasFilterMatch =
      video.tags.some((t) => tagMatchesSkill(t, selectedFilter)) ||
      textContainsSkill(video.title, selectedFilter) ||
      textContainsSkill(video.description, selectedFilter);

    if (!hasFilterMatch) {
      return { score: 0, matchedTags: [] };
    }
    score += 100; // Strong boost for exact requested skill
    matchedTags.push(selectedFilter);
  }

  // 1. Tag Matching against Domain Skills & Languages (High Weight: 25 per match)
  let skillTagMatches = 0;
  video.tags.forEach((tag) => {
    domainSkills.forEach((skill) => {
      if (tagMatchesSkill(tag, skill)) {
        skillTagMatches++;
        score += 25;
        if (!matchedTags.includes(tag)) matchedTags.push(tag);
      }
    });
  });

  // 2. Title & Description Keyword Matching for Domain Skills using Word Boundaries
  let keywordMatches = 0;
  domainSkills.forEach((skill) => {
    if (textContainsSkill(video.title, skill)) {
      keywordMatches++;
      score += 15;
      if (!matchedTags.includes(skill)) matchedTags.push(skill);
    } else if (textContainsSkill(video.description, skill)) {
      score += 5;
    }
  });

  // 3. Category Match Bonus
  let categoryMatched = false;
  if (
    videoCategory === careerCategory ||
    (videoCategory.length > 5 && careerCategory.length > 5 && (videoCategory.includes(careerCategory) || careerCategory.includes(videoCategory)))
  ) {
    categoryMatched = true;
    score += 20;
  }

  // Strict domain relevance rule: MUST have at least one skill tag match or keyword match
  if (skillTagMatches === 0 && keywordMatches === 0 && !categoryMatched) {
    return { score: 0, matchedTags: [] };
  }

  // 4. Boost for high-rating and popularity
  score += Math.round(video.rating * 2);

  return { score, matchedTags };
}

/**
 * Computes relevance score between a reel and a career domain.
 */
export function calculateReelRelevanceScore(
  reel: LearningReel,
  career: Career,
  selectedFilter?: string
): { score: number; matchedTags: string[] } {
  let score = 0;
  const matchedTags: string[] = [];

  const domainSkills = career.skills;

  if (selectedFilter && selectedFilter !== 'All') {
    const hasFilterMatch =
      reel.tags.some((t) => tagMatchesSkill(t, selectedFilter)) ||
      textContainsSkill(reel.title, selectedFilter) ||
      textContainsSkill(reel.description, selectedFilter);

    if (!hasFilterMatch) {
      return { score: 0, matchedTags: [] };
    }
    score += 100;
    matchedTags.push(selectedFilter);
  }

  let matches = 0;
  reel.tags.forEach((tag) => {
    domainSkills.forEach((skill) => {
      if (tagMatchesSkill(tag, skill)) {
        matches++;
        score += 20;
        if (!matchedTags.includes(tag)) matchedTags.push(tag);
      }
    });
  });

  domainSkills.forEach((skill) => {
    if (textContainsSkill(reel.title, skill)) {
      matches++;
      score += 12;
      if (!matchedTags.includes(skill)) matchedTags.push(skill);
    }
  });

  if (matches === 0) {
    return { score: 0, matchedTags: [] };
  }

  return { score, matchedTags };
}

/**
 * Main Domain Recommendation Model Engine:
 * Returns strictly recommended videos & reels for any domain, filtered by tags.
 */
export function getDomainRecommendations(
  slugOrCareer: string | Career,
  options?: {
    skillFilter?: string;
    limit?: number;
  }
): DomainRecommendationResult | null {
  const career = typeof slugOrCareer === 'string' ? getCareerBySlug(slugOrCareer) : slugOrCareer;
  if (!career) return null;

  const { programmingLanguages, domainSkills, allFilterTags } = getDomainSkillBreakdown(career);
  const selectedFilter =
    options?.skillFilter && options.skillFilter !== 'All' ? options.skillFilter : undefined;

  // Score and rank all videos
  const scoredVideos: { video: LearningVideo; score: number; matchedTags: string[] }[] = [];

  learningVideos.forEach((video) => {
    const { score, matchedTags } = calculateVideoRelevanceScore(video, career, selectedFilter);
    if (score > 0) {
      scoredVideos.push({ video, score, matchedTags });
    }
  });

  // Sort descending by recommendation score, then by rating
  scoredVideos.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.video.rating - a.video.rating;
  });

  let recommendedVideos = scoredVideos.map((item) => item.video);
  if (options?.limit && options.limit > 0) {
    recommendedVideos = recommendedVideos.slice(0, options.limit);
  }

  // Score and rank reels
  const scoredReels: { reel: LearningReel; score: number; matchedTags: string[] }[] = [];

  learningReels.forEach((reel) => {
    const { score, matchedTags } = calculateReelRelevanceScore(reel, career, selectedFilter);
    if (score > 0) {
      scoredReels.push({ reel, score, matchedTags });
    }
  });

  scoredReels.sort((a, b) => b.score - a.score);
  const recommendedReels = scoredReels.map((item) => item.reel);

  return {
    domain: career,
    recommendedVideos,
    recommendedReels,
    domainSkills,
    programmingLanguages,
    allFilterTags,
    totalMatches: recommendedVideos.length,
  };
}
