import { careers, type Career } from '@/lib/data';

export type AssessmentData = {
  name: string;
  age: string;
  gender: string;
  location: string;
  qualification: string;
  branch: string;
  cgpa: string;
  percentage: string;
  favoriteSubjects: string[];
  technicalSkills: string[];
  softSkills: string[];
  hobbies: string[];
  interests: string[];
  strengths: string[];
  weaknesses: string[];
  workStyle: string;
  dreamCareer: string;
  languages: string[];
  personality: string;
  aptitude: {
    logical: number;
    numerical: number;
    communication: number;
    programming: number;
    analytical: number;
  };
  learningStyle: string;
  careerGoals: string;
};

export const emptyAssessment: AssessmentData = {
  name: '',
  age: '',
  gender: '',
  location: '',
  qualification: '',
  branch: '',
  cgpa: '',
  percentage: '',
  favoriteSubjects: [],
  technicalSkills: [],
  softSkills: [],
  hobbies: [],
  interests: [],
  strengths: [],
  weaknesses: [],
  workStyle: '',
  dreamCareer: '',
  languages: [],
  personality: '',
  aptitude: { logical: 0, numerical: 0, communication: 0, programming: 0, analytical: 0 },
  learningStyle: '',
  careerGoals: '',
};

export type CareerRecommendation = {
  career: Career;
  matchScore: number;
  reasons: string[];
  confidence: 'High' | 'Medium' | 'Low';
};

const interestToTags: Record<string, string[]> = {
  programming: ['programming', 'logical', 'technical', 'analytical'],
  math: ['math', 'numerical', 'analytical', 'logical'],
  science: ['research', 'analytical', 'biology', 'technical'],
  art: ['creative', 'artistic', 'design', 'visual'],
  business: ['business', 'leadership', 'social', 'communication'],
  social: ['social', 'empathy', 'communication', 'leadership'],
  research: ['research', 'analytical', 'math', 'biology'],
  writing: ['communication', 'creative', 'writing'],
  music: ['creative', 'artistic'],
  sports: ['physical', 'discipline', 'leadership'],
  technology: ['technical', 'programming', 'analytical'],
  design: ['creative', 'design', 'visual', 'artistic'],
  environment: ['environment', 'biology', 'research', 'empathy'],
  helping: ['empathy', 'social', 'communication'],
};

export function generateRecommendations(data: AssessmentData): CareerRecommendation[] {
  const userTags = new Set<string>();

  data.interests.forEach((i) => {
    (interestToTags[i] || []).forEach((t) => userTags.add(t));
  });
  data.favoriteSubjects.forEach((s) => {
    const lower = s.toLowerCase();
    if (lower.includes('math')) userTags.add('math');
    if (lower.includes('bio')) userTags.add('biology');
    if (lower.includes('chem')) userTags.add('research');
    if (lower.includes('phys')) userTags.add('technical');
    if (lower.includes('comp') || lower.includes('cs')) userTags.add('programming');
    if (lower.includes('english') || lower.includes('lang')) userTags.add('communication');
    if (lower.includes('commerce') || lower.includes('account')) userTags.add('business');
    if (lower.includes('econ')) userTags.add('numerical');
  });
  data.technicalSkills.forEach((s) => {
    const lower = s.toLowerCase();
    if (lower.includes('python') || lower.includes('java') || lower.includes('c++') || lower.includes('coding') || lower.includes('programming'))
      userTags.add('programming');
    if (lower.includes('design') || lower.includes('figma')) userTags.add('design');
    if (lower.includes('data') || lower.includes('ml') || lower.includes('ai'))
      userTags.add('analytical');
  });
  data.softSkills.forEach((s) => {
    const lower = s.toLowerCase();
    if (lower.includes('communicat')) userTags.add('communication');
    if (lower.includes('leader')) userTags.add('leadership');
    if (lower.includes('team')) userTags.add('social');
    if (lower.includes('creative')) userTags.add('creative');
    if (lower.includes('empath')) userTags.add('empathy');
    if (lower.includes('problem')) userTags.add('problem-solving');
  });
  data.hobbies.forEach((h) => {
    const lower = h.toLowerCase();
    if (lower.includes('cod') || lower.includes('tech')) userTags.add('programming');
    if (lower.includes('draw') || lower.includes('paint') || lower.includes('art'))
      userTags.add('artistic');
    if (lower.includes('write') || lower.includes('blog')) userTags.add('communication');
    if (lower.includes('sport') || lower.includes('game') || lower.includes('fitness'))
      userTags.add('physical');
    if (lower.includes('read') || lower.includes('research')) userTags.add('research');
  });
  data.strengths.forEach((s) => {
    const lower = s.toLowerCase();
    if (lower.includes('analy')) userTags.add('analytical');
    if (lower.includes('logic')) userTags.add('logical');
    if (lower.includes('creat')) userTags.add('creative');
    if (lower.includes('communicat')) userTags.add('communication');
    if (lower.includes('leader')) userTags.add('leadership');
    if (lower.includes('empath')) userTags.add('empathy');
  });

  if (data.personality === 'Introvert') {
    userTags.add('analytical');
    userTags.add('research');
  } else if (data.personality === 'Extrovert') {
    userTags.add('social');
    userTags.add('leadership');
    userTags.add('communication');
  }

  const aptitudeAvg =
    (data.aptitude.logical + data.aptitude.numerical + data.aptitude.communication + data.aptitude.programming + data.aptitude.analytical) / 5;

  const results: CareerRecommendation[] = careers.map((career) => {
    let score = 0;
    const reasons: string[] = [];

    const matchCount = career.matchTags.filter((t) => userTags.has(t)).length;
    const tagScore = (matchCount / career.matchTags.length) * 60;
    score += tagScore;

    if (matchCount >= 3) reasons.push('Your interests and strengths align strongly with this career.');
    else if (matchCount >= 2) reasons.push('Your interests match several key areas of this career.');
    else if (matchCount >= 1) reasons.push('Some of your interests align with this career path.');

    if (data.aptitude.programming >= 70 && career.matchTags.includes('programming')) {
      score += 15;
      reasons.push('Your programming aptitude is excellent for this field.');
    }
    if (data.aptitude.analytical >= 70 && career.matchTags.includes('analytical')) {
      score += 10;
      reasons.push('Your analytical thinking suits this career well.');
    }
    if (data.aptitude.numerical >= 70 && career.matchTags.includes('numerical')) {
      score += 10;
      reasons.push('Your numerical ability is a strong fit.');
    }
    if (data.aptitude.communication >= 70 && career.matchTags.includes('communication')) {
      score += 8;
      reasons.push('Your communication skills are valuable here.');
    }

    if (aptitudeAvg >= 75) {
      score += 5;
      reasons.push('Your overall aptitude score indicates high readiness.');
    }

    if (data.dreamCareer && career.title.toLowerCase().includes(data.dreamCareer.toLowerCase().split(' ')[0])) {
      score += 15;
      reasons.push('This matches your stated dream career.');
    }

    score = Math.min(Math.round(score), 98);

    if (score < 30) {
      reasons.push('Consider developing skills in this area to improve your match.');
    }

    const confidence: 'High' | 'Medium' | 'Low' =
      score >= 70 ? 'High' : score >= 50 ? 'Medium' : 'Low';

    return { career, matchScore: score, reasons, confidence };
  });

  return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
}

export const aptitudeQuestions = {
  logical: [
    { q: 'If all Roses are flowers and some flowers fade quickly, can we conclude some roses fade quickly?', options: ['Yes', 'No', 'Cannot be determined', 'All roses fade'], answer: 'Cannot be determined' },
    { q: 'Find the next number: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], answer: '42' },
    { q: 'A is taller than B. B is taller than C. Who is shortest?', options: ['A', 'B', 'C', 'Cannot say'], answer: 'C' },
  ],
  numerical: [
    { q: 'What is 15% of 240?', options: ['36', '32', '40', '48'], answer: '36' },
    { q: 'If x + 5 = 12, what is x?', options: ['5', '7', '6', '8'], answer: '7' },
    { q: 'A train travels 60 km in 1.5 hours. What is its speed?', options: ['30 km/h', '40 km/h', '45 km/h', '50 km/h'], answer: '40 km/h' },
  ],
  communication: [
    { q: 'Choose the correctly spelled word:', options: ['Accomodate', 'Accommodate', 'Acommodate', 'Accommodatte'], answer: 'Accommodate' },
    { q: 'Synonym of "Happy":', options: ['Sad', 'Joyful', 'Angry', 'Tired'], answer: 'Joyful' },
    { q: 'Antonym of "Generous":', options: ['Kind', 'Stingy', 'Helpful', 'Giving'], answer: 'Stingy' },
  ],
  programming: [
    { q: 'Which is NOT a programming language?', options: ['Python', 'Java', 'HTML', 'C++'], answer: 'HTML' },
    { q: 'What does "int" represent in most languages?', options: ['Text', 'Integer', 'Decimal', 'Boolean'], answer: 'Integer' },
    { q: 'Which data structure works on FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 'Queue' },
  ],
  analytical: [
    { q: 'If today is Monday, what day will it be 100 days from now?', options: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], answer: 'Wednesday' },
    { q: 'Which pattern does not belong: 3,6,9,12,14?', options: ['3', '6', '9', '14'], answer: '14' },
    { q: 'A clock shows 3:15. What is the angle between hour and minute hands?', options: ['0°', '7.5°', '15°', '22.5°'], answer: '7.5°' },
  ],
};

export const personalityQuestions = [
  { q: 'I prefer working in teams rather than alone.', type: 'social' },
  { q: 'I enjoy solving complex logical problems.', type: 'analytical' },
  { q: 'I like creative activities like drawing or writing.', type: 'creative' },
  { q: 'I am comfortable speaking in front of groups.', type: 'communication' },
  { q: 'I pay attention to details and patterns.', type: 'analytical' },
  { q: 'I prefer structured tasks over open-ended ones.', type: 'logical' },
  { q: 'I enjoy helping others and understanding their feelings.', type: 'empathy' },
  { q: 'I take initiative and lead group activities.', type: 'leadership' },
];

export const interestOptions = [
  'programming', 'math', 'science', 'art', 'business', 'social',
  'research', 'writing', 'music', 'sports', 'technology', 'design',
  'environment', 'helping',
];

export const subjectOptions = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'English', 'Economics', 'Commerce', 'Accountancy', 'History', 'Geography',
  'Political Science', 'Psychology', 'Sociology',
];

export const techSkillOptions = [
  'Python', 'Java', 'C++', 'JavaScript', 'HTML/CSS', 'React', 'Node.js',
  'SQL', 'Data Analysis', 'Machine Learning', 'Cloud (AWS/Azure)',
  'Networking', 'Cyber Security', 'Photoshop', 'Figma', 'Excel',
];

export const softSkillOptions = [
  'Communication', 'Leadership', 'Teamwork', 'Problem Solving',
  'Creativity', 'Time Management', 'Critical Thinking', 'Adaptability',
  'Empathy', 'Public Speaking', 'Negotiation', 'Active Listening',
];

export const hobbyOptions = [
  'Coding', 'Reading', 'Writing', 'Drawing', 'Painting', 'Music',
  'Sports', 'Gaming', 'Photography', 'Cooking', 'Travel', 'Debate',
  'Volunteering', 'Astronomy', 'Robotics', 'Gardening',
];

export const strengthOptions = [
  'Analytical thinking', 'Logical reasoning', 'Creativity', 'Communication',
  'Leadership', 'Empathy', 'Attention to detail', 'Problem solving',
  'Quick learning', 'Persistence', 'Organization', 'Strategic thinking',
];
