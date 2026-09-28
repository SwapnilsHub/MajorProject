// lib/learning-stats.ts
// Helper functions for learning progress stats and AI suggestions

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  earnedDate?: string;
  requirement: string;
}

export interface LearningStats {
  streakDays: number;
  longestStreak: number;
  totalHours: number;
  quizzesCompleted: number;
  videosWatched: number;
  reelsWatched: number;
  projectsCompleted: number;
  certificatesEarned: number;
  badges: Badge[];
  weeklyHours: number[];
  lastActiveDate: string | null;
}

export interface WeeklyPlan {
  day: string;
  tasks: string[];
  estimatedTime: string;
}

export const allBadges: Badge[] = [
  {
    id: 'first-quiz',
    title: 'Quiz Starter',
    description: 'Complete your first quiz',
    icon: '🎯',
    color: 'from-blue-400 to-cyan-400',
    earned: false,
    requirement: 'Complete 1 quiz',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Complete 25 quizzes with 80%+ score',
    icon: '🏆',
    color: 'from-yellow-400 to-orange-400',
    earned: false,
    requirement: 'Complete 25 quizzes',
  },
  {
    id: 'perfect-score',
    title: 'Perfect 100',
    description: 'Score 100% on any quiz',
    icon: '💯',
    color: 'from-green-400 to-emerald-400',
    earned: false,
    requirement: '100% on any quiz',
  },
  {
    id: 'streak-7',
    title: '7-Day Streak',
    description: 'Learn for 7 consecutive days',
    icon: '🔥',
    color: 'from-red-400 to-orange-400',
    earned: false,
    requirement: '7 day streak',
  },
  {
    id: 'streak-30',
    title: 'Monthly Champion',
    description: 'Maintain a 30-day learning streak',
    icon: '🌟',
    color: 'from-purple-400 to-pink-400',
    earned: false,
    requirement: '30 day streak',
  },
  {
    id: 'video-10',
    title: 'Binge Learner',
    description: 'Watch 10 learning videos',
    icon: '📺',
    color: 'from-indigo-400 to-blue-400',
    earned: false,
    requirement: 'Watch 10 videos',
  },
  {
    id: 'first-project',
    title: 'Builder',
    description: 'Start your first project',
    icon: '🛠️',
    color: 'from-teal-400 to-green-400',
    earned: false,
    requirement: 'Start 1 project',
  },
  {
    id: 'project-master',
    title: 'Project Pro',
    description: 'Complete 5 projects',
    icon: '🚀',
    color: 'from-violet-400 to-purple-400',
    earned: false,
    requirement: 'Complete 5 projects',
  },
  {
    id: 'first-cert',
    title: 'Certified',
    description: 'Earn your first certificate',
    icon: '🎓',
    color: 'from-amber-400 to-yellow-400',
    earned: false,
    requirement: 'Earn 1 certificate',
  },
  {
    id: 'speed-learner',
    title: 'Speed Learner',
    description: 'Complete a quiz in under 2 minutes',
    icon: '⚡',
    color: 'from-yellow-300 to-green-400',
    earned: false,
    requirement: 'Finish quiz in < 2 mins',
  },
  {
    id: 'all-rounder',
    title: 'All Rounder',
    description: 'Take quizzes in 5 different categories',
    icon: '🌈',
    color: 'from-pink-400 to-violet-400',
    earned: false,
    requirement: '5 different categories',
  },
  {
    id: 'top-10',
    title: 'Top 10',
    description: 'Reach the global top 10 leaderboard',
    icon: '👑',
    color: 'from-yellow-400 to-red-400',
    earned: false,
    requirement: 'Top 10 leaderboard',
  },
];

export const mockLearningStats: LearningStats = {
  streakDays: 12,
  longestStreak: 21,
  totalHours: 47.5,
  quizzesCompleted: 18,
  videosWatched: 14,
  reelsWatched: 65,
  projectsCompleted: 2,
  certificatesEarned: 1,
  badges: allBadges.map((b, i) => ({
    ...b,
    earned: i < 5,
    earnedDate: i < 5 ? `2024-0${i + 1}-15` : undefined,
  })),
  weeklyHours: [3.5, 5, 2, 6.5, 4, 7, 3],
  lastActiveDate: new Date().toISOString().split('T')[0],
};

export const mockMonthlyProgress = [
  { week: 'Week 1', hours: 8, quizzes: 3, videos: 4 },
  { week: 'Week 2', hours: 12, quizzes: 5, videos: 6 },
  { week: 'Week 3', hours: 10, quizzes: 4, videos: 2 },
  { week: 'Week 4', hours: 17, quizzes: 6, videos: 8 },
];

export const mockLeaderboard = [
  { rank: 1, name: 'Arjun Sharma', score: 9840, streak: 45, avatar: '🥇', change: 0 },
  { rank: 2, name: 'Priya Nair', score: 9720, streak: 38, avatar: '🥈', change: 1 },
  { rank: 3, name: 'Rahul Mehta', score: 9580, streak: 42, avatar: '🥉', change: -1 },
  { rank: 4, name: 'Sneha Patel', score: 9340, streak: 29, avatar: '4️⃣', change: 2 },
  { rank: 5, name: 'Vikram Singh', score: 9180, streak: 31, avatar: '5️⃣', change: 0 },
  { rank: 6, name: 'Kavitha R', score: 8960, streak: 25, avatar: '6️⃣', change: 3 },
  { rank: 7, name: 'Aditya Kumar', score: 8740, streak: 18, avatar: '7️⃣', change: -2 },
  { rank: 8, name: 'Divya Krishnan', score: 8520, streak: 22, avatar: '8️⃣', change: 1 },
  { rank: 9, name: 'Rohit Verma', score: 8310, streak: 15, avatar: '9️⃣', change: 0 },
  { rank: 10, name: 'Ananya Iyer', score: 8100, streak: 20, avatar: '🔟', change: -1 },
];

export const mockSkillProgress = [
  { skill: 'Python', completed: 78 },
  { skill: 'Machine Learning', completed: 55 },
  { skill: 'Data Structures', completed: 85 },
  { skill: 'SQL', completed: 70 },
  { skill: 'React', completed: 45 },
  { skill: 'System Design', completed: 30 },
  { skill: 'Statistics', completed: 60 },
];

export function generateAISuggestions(stats: LearningStats): string[] {
  const suggestions: string[] = [];

  if (stats.streakDays < 7) {
    suggestions.push('📅 Try to study daily to build your 7-day streak badge! Even 20 minutes counts.');
  }
  if (stats.quizzesCompleted < 10) {
    suggestions.push('🎯 Take more quizzes to identify weak areas. Aim for at least 3 quizzes this week.');
  }
  if (stats.videosWatched < 5) {
    suggestions.push('📺 Watch at least 2 learning videos this week. Start with Python or Data Structures.');
  }
  if (stats.projectsCompleted === 0) {
    suggestions.push('🛠️ Start a beginner project this week! Projects are the #1 way to impress recruiters.');
  }
  if (stats.totalHours < 20) {
    suggestions.push('⏱️ Increase your weekly study hours. Target 7-10 hours/week for consistent progress.');
  }
  if (stats.certificatesEarned === 0) {
    suggestions.push('🎓 Attempt a certification quiz in your strongest subject to earn your first certificate!');
  }

  if (suggestions.length === 0) {
    suggestions.push('🚀 You\'re on a great track! Focus on your weakest subject to round out your skills.');
    suggestions.push('🏆 You\'re close to the top 10 leaderboard — keep your daily streak going!');
  }

  return suggestions.slice(0, 4);
}

export function generateWeeklyPlan(careerGoal: string): WeeklyPlan[] {
  const plans: Record<string, WeeklyPlan[]> = {
    'Data Science': [
      { day: 'Monday', tasks: ['Complete Python Quiz (Intermediate)', 'Watch: Pandas Tutorial'], estimatedTime: '1.5 hrs' },
      { day: 'Tuesday', tasks: ['Machine Learning Video: Regression', 'Practice NumPy exercises'], estimatedTime: '2 hrs' },
      { day: 'Wednesday', tasks: ['Data Science Quiz (Beginner)', 'Start EDA mini-project'], estimatedTime: '1.5 hrs' },
      { day: 'Thursday', tasks: ['Statistics video', 'Read: Feature Engineering article'], estimatedTime: '1 hr' },
      { day: 'Friday', tasks: ['AI & ML Quiz (Intermediate)', 'Build visualizations with Matplotlib'], estimatedTime: '2 hrs' },
      { day: 'Saturday', tasks: ['Project work: Stock Dashboard', 'Kaggle dataset exploration'], estimatedTime: '3 hrs' },
      { day: 'Sunday', tasks: ['Review the week', 'Update learning notes', 'Plan next week'], estimatedTime: '1 hr' },
    ],
    'Web Development': [
      { day: 'Monday', tasks: ['Web Dev Quiz (Beginner)', 'Watch: React Hooks Tutorial'], estimatedTime: '1.5 hrs' },
      { day: 'Tuesday', tasks: ['Build a Todo App with Next.js', 'Practice Tailwind CSS'], estimatedTime: '2.5 hrs' },
      { day: 'Wednesday', tasks: ['Programming Quiz (Intermediate)', 'Watch: REST API Tutorial'], estimatedTime: '2 hrs' },
      { day: 'Thursday', tasks: ['Read: Database Design article', 'Practice SQL queries'], estimatedTime: '1 hr' },
      { day: 'Friday', tasks: ['Build: Simple Login page', 'CSS animation practice'], estimatedTime: '2 hrs' },
      { day: 'Saturday', tasks: ['E-Commerce project work', 'Deploy to Vercel'], estimatedTime: '3 hrs' },
      { day: 'Sunday', tasks: ['Code review', 'Watch interview prep video', 'Plan next week'], estimatedTime: '1 hr' },
    ],
    'default': [
      { day: 'Monday', tasks: ['Take Programming Quiz', 'Watch 1 Learning Video'], estimatedTime: '1.5 hrs' },
      { day: 'Tuesday', tasks: ['Aptitude Quiz Practice', 'Resume Review'], estimatedTime: '1 hr' },
      { day: 'Wednesday', tasks: ['Technical Subject Deep Dive', 'Read: Industry Articles'], estimatedTime: '2 hrs' },
      { day: 'Thursday', tasks: ['Watch Interview Prep Video', 'Practice Coding Problems'], estimatedTime: '1.5 hrs' },
      { day: 'Friday', tasks: ['Take Weekly Challenge Quiz', 'Explore project ideas'], estimatedTime: '2 hrs' },
      { day: 'Saturday', tasks: ['Work on Side Project', 'Learn new technology'], estimatedTime: '3 hrs' },
      { day: 'Sunday', tasks: ['Review week\'s learning', 'Update LinkedIn profile'], estimatedTime: '1 hr' },
    ],
  };

  return plans[careerGoal] || plans['default'];
}

export function getPlacementReadiness(stats: LearningStats): number {
  let score = 0;
  if (stats.quizzesCompleted >= 20) score += 25;
  else score += (stats.quizzesCompleted / 20) * 25;

  if (stats.videosWatched >= 15) score += 20;
  else score += (stats.videosWatched / 15) * 20;

  if (stats.projectsCompleted >= 3) score += 30;
  else score += (stats.projectsCompleted / 3) * 30;

  if (stats.certificatesEarned >= 2) score += 15;
  else score += (stats.certificatesEarned / 2) * 15;

  if (stats.streakDays >= 30) score += 10;
  else score += (stats.streakDays / 30) * 10;

  return Math.round(Math.min(score, 100));
}
