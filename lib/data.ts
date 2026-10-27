import {
  Cpu,
  HeartPulse,
  Scale,
  Wallet,
  Briefcase,
  Palette,
  Landmark,
  Shield,
  Banknote,
  Leaf,
  Brain,
  Database,
  Lock,
  Cloud,
  Code2,
  Smartphone,
  Megaphone,
  Film,
  Bot,
  Wifi,
  ClipboardList,
  Compass,
  FileText,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';

export type Career = {
  slug: string;
  title: string;
  category: string;
  icon: LucideIcon;
  overview: string;
  skills: string[];
  salary: string;
  demand: 'High' | 'Very High' | 'Medium' | 'Growing';
  futureScope: string;
  growth: string;
  roadmap: { phase: string; items: string[] }[];
  topCompanies: string[];
  courses: string[];
  certifications: string[];
  eligibility: string;
  matchTags: string[];
};

export const careers: Career[] = [
  {
    slug: 'ai-engineer',
    title: 'AI Engineer',
    category: 'AI & Machine Learning',
    icon: Brain,
    overview:
      'AI Engineers build intelligent systems that can learn, reason, and make decisions. They work on machine learning models, neural networks, and natural language processing.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Mathematics', 'Statistics'],
    salary: '₹6–40 LPA',
    demand: 'Very High',
    futureScope:
      'AI is reshaping every industry. Demand will grow 10x by 2030 with applications in healthcare, finance, autonomous vehicles, and more.',
    growth: '35% annual growth',
    roadmap: [
      { phase: 'Foundation (3-6 months)', items: ['Python programming', 'Linear Algebra & Statistics', 'Data structures & algorithms'] },
      { phase: 'Core ML (6-12 months)', items: ['Scikit-learn', 'Supervised & unsupervised learning', 'Model evaluation & tuning'] },
      { phase: 'Deep Learning (6-12 months)', items: ['Neural networks', 'TensorFlow/Keras', 'CNNs and RNNs'] },
      { phase: 'Specialization (ongoing)', items: ['NLP or Computer Vision', 'MLOps', 'Deploy models with Docker/Kubernetes'] },
    ],
    topCompanies: ['Google', 'Microsoft', 'OpenAI', 'Amazon', 'Meta', 'Nvidia'],
    courses: ['ML Specialization — Coursera', 'Deep Learning — NPTEL', 'AI for Everyone — SWAYAM'],
    certifications: ['TensorFlow Developer Certificate', 'AWS ML Specialty', 'Google Professional ML Engineer'],
    eligibility: 'B.Tech / B.Sc / MCA / Any graduate with strong math',
    matchTags: ['programming', 'math', 'analytical', 'logical', 'research'],
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & Analytics',
    icon: Database,
    overview:
      'Data Scientists extract insights from large datasets using statistical analysis, machine learning, and data visualization to drive business decisions.',
    skills: ['Python', 'R', 'SQL', 'Statistics', 'Pandas', 'Tableau', 'Machine Learning'],
    salary: '₹5–35 LPA',
    demand: 'Very High',
    futureScope:
      'Data-driven decision making is becoming universal. Every company needs data scientists to stay competitive.',
    growth: '28% annual growth',
    roadmap: [
      { phase: 'Foundation (2-4 months)', items: ['Python & SQL', 'Statistics & probability', 'Excel proficiency'] },
      { phase: 'Data Tools (3-6 months)', items: ['Pandas & NumPy', 'Data visualization (Matplotlib, Seaborn)', 'Tableau / Power BI'] },
      { phase: 'Machine Learning (4-8 months)', items: ['Supervised learning', 'Model deployment', 'Big data basics (Spark)'] },
      { phase: 'Advanced (ongoing)', items: ['Deep learning', 'NLP', 'Cloud platforms (AWS/GCP)'] },
    ],
    topCompanies: ['Amazon', 'Flipkart', 'Mu Sigma', 'Fractal', 'Deloitte'],
    courses: ['Data Science Bootcamp — Coursera', 'PG Program — UpGrad', 'Data Science — NPTEL'],
    certifications: ['IBM Data Science Professional', 'SAS Certified Data Scientist', 'Microsoft Azure Data Scientist'],
    eligibility: 'B.Tech / B.Sc Statistics / M.Sc / Any graduate',
    matchTags: ['math', 'analytical', 'research', 'logical', 'programming'],
  },
  {
    slug: 'fullstack-developer',
    title: 'Full Stack Developer',
    category: 'Software Development',
    icon: Code2,
    overview:
      'Full Stack Developers build end-to-end web applications, working on both frontend (React, Angular) and backend (Node.js, Python, Java) with databases.',
    skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git', 'REST APIs'],
    salary: '₹4–25 LPA',
    demand: 'Very High',
    futureScope:
      'Web development continues to be the backbone of the digital economy. Full stack skills remain in top demand across startups and enterprises.',
    growth: '22% annual growth',
    roadmap: [
      { phase: 'Frontend (3-5 months)', items: ['HTML, CSS, JavaScript', 'React.js', 'Responsive design'] },
      { phase: 'Backend (4-6 months)', items: ['Node.js / Express', 'Databases (MongoDB, PostgreSQL)', 'REST API design'] },
      { phase: 'DevOps (2-4 months)', items: ['Git & GitHub', 'Docker', 'CI/CD basics'] },
      { phase: 'Projects (ongoing)', items: ['Build full-stack apps', 'Deploy to cloud', 'Open source contributions'] },
    ],
    topCompanies: ['TCS', 'Infosys', 'Razorpay', 'Swiggy', 'Zomato'],
    courses: ['Full Stack — The Odin Project', 'MERN Stack — Coursera', 'Web Dev — Udemy'],
    certifications: ['Meta Front-End Developer', 'FreeCodeCamp certifications', 'AWS Developer Associate'],
    eligibility: 'B.Tech CS / BCA / MCA / Any graduate',
    matchTags: ['programming', 'logical', 'creative', 'technical', 'analytical'],
  },
  {
    slug: 'cyber-security-analyst',
    title: 'Cyber Security Analyst',
    category: 'Cyber Security',
    icon: Lock,
    overview:
      'Cyber Security Analysts protect organizations from digital threats by monitoring systems, analyzing vulnerabilities, and implementing security measures.',
    skills: ['Networking', 'Linux', 'Penetration Testing', 'Cryptography', 'SIEM', 'Python'],
    salary: '₹5–30 LPA',
    demand: 'Very High',
    futureScope:
      'With rising cyber threats and digital transformation, cyber security is one of the fastest-growing fields globally.',
    growth: '32% annual growth',
    roadmap: [
      { phase: 'Foundation (3-6 months)', items: ['Networking fundamentals', 'Linux & command line', 'Operating systems'] },
      { phase: 'Security Basics (4-6 months)', items: ['Cryptography', 'Web security (OWASP)', 'Security tools (Nmap, Wireshark)'] },
      { phase: 'Advanced (6-12 months)', items: ['Penetration testing', 'SIEM tools', 'Incident response'] },
      { phase: 'Specialization (ongoing)', items: ['Cloud security', 'Malware analysis', 'Bug bounty hunting'] },
    ],
    topCompanies: ['TCS', 'Wipro', 'Deloitte', 'KPMG', 'Quick Heal'],
    courses: ['Cybersecurity — Coursera', 'Ethical Hacking — Udemy', 'Security+ — CompTIA'],
    certifications: ['CEH (Certified Ethical Hacker)', 'CompTIA Security+', 'CISSP', 'OSCP'],
    eligibility: 'B.Tech IT / B.Sc CS / Any graduate',
    matchTags: ['logical', 'analytical', 'technical', 'problem-solving', 'research'],
  },
  {
    slug: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Cloud Computing',
    icon: Cloud,
    overview:
      'Cloud Engineers design, deploy, and manage cloud infrastructure on platforms like AWS, Azure, and Google Cloud, enabling scalable applications.',
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Linux', 'Terraform', 'CI/CD'],
    salary: '₹6–30 LPA',
    demand: 'Very High',
    futureScope:
      'As businesses migrate to the cloud, cloud engineering skills are essential and command premium salaries.',
    growth: '25% annual growth',
    roadmap: [
      { phase: 'Foundation (2-4 months)', items: ['Linux fundamentals', 'Networking basics', 'Virtualization'] },
      { phase: 'Cloud Platform (3-6 months)', items: ['AWS or Azure core services', 'Storage & databases', 'IAM & security'] },
      { phase: 'DevOps (3-6 months)', items: ['Docker', 'Kubernetes', 'CI/CD pipelines'] },
      { phase: 'Infrastructure as Code (ongoing)', items: ['Terraform', 'CloudFormation', 'Monitoring & logging'] },
    ],
    topCompanies: ['AWS', 'Microsoft', 'Google', 'TCS', 'IBM'],
    courses: ['AWS Cloud Practitioner — Amazon', 'Azure Fundamentals — Microsoft', 'Cloud Engineering — Coursera'],
    certifications: ['AWS Solutions Architect', 'Microsoft Azure Administrator', 'Google Cloud Engineer', 'CKA (Kubernetes)'],
    eligibility: 'B.Tech / B.Sc IT / Any graduate',
    matchTags: ['technical', 'logical', 'problem-solving', 'analytical', 'programming'],
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Design',
    icon: Palette,
    overview:
      'UI/UX Designers create intuitive, beautiful, and user-centered digital experiences through research, wireframing, prototyping, and visual design.',
    skills: ['Figma', 'User Research', 'Prototyping', 'Visual Design', 'Wireframing', 'Design Systems'],
    salary: '₹4–20 LPA',
    demand: 'High',
    futureScope:
      'Design-led companies outperform peers. UX roles are expanding into AR/VR, voice, and AI-driven interfaces.',
    growth: '18% annual growth',
    roadmap: [
      { phase: 'Design Fundamentals (2-4 months)', items: ['Color theory & typography', 'Design principles', 'Sketching'] },
      { phase: 'Tools (2-3 months)', items: ['Figma mastery', 'Prototyping', 'Design systems'] },
      { phase: 'UX Research (3-6 months)', items: ['User interviews', 'Usability testing', 'Information architecture'] },
      { phase: 'Portfolio (ongoing)', items: ['Case studies', 'Real projects', 'Design community'] },
    ],
    topCompanies: ['Razorpay', 'Cred', 'Swiggy', 'Google', 'Microsoft'],
    courses: ['Google UX Design — Coursera', 'UI/UX Specialization — CalArts', 'DesignLab'],
    certifications: ['Google UX Design Certificate', 'NN/g UX Certification', 'Interaction Design Foundation'],
    eligibility: 'Any graduate / Design diploma',
    matchTags: ['creative', 'artistic', 'empathy', 'communication', 'design'],
  },
  {
    slug: 'digital-marketing-specialist',
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    icon: Megaphone,
    overview:
      'Digital Marketing Specialists promote brands and products online using SEO, SEM, social media, content marketing, and analytics.',
    skills: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Analytics', 'Email Marketing'],
    salary: '₹3–15 LPA',
    demand: 'High',
    futureScope:
      'Digital ad spend continues to grow. Specialists in performance marketing and analytics are in high demand.',
    growth: '15% annual growth',
    roadmap: [
      { phase: 'Fundamentals (1-3 months)', items: ['Marketing basics', 'SEO principles', 'Content strategy'] },
      { phase: 'Channels (2-4 months)', items: ['Google Ads', 'Social media marketing', 'Email marketing'] },
      { phase: 'Analytics (2-3 months)', items: ['Google Analytics', 'Conversion optimization', 'A/B testing'] },
      { phase: 'Advanced (ongoing)', items: ['Marketing automation', 'Influencer marketing', 'Growth hacking'] },
    ],
    topCompanies: ['Google', 'Meta', 'Amazon', 'Agency roles', 'Startups'],
    courses: ['Google Digital Marketing — Google', 'HubSpot Academy', 'Digital Marketing — Udemy'],
    certifications: ['Google Ads Certification', 'HubSpot Inbound Marketing', 'Meta Blueprint', 'SEMrush SEO'],
    eligibility: 'Any graduate / MBA Marketing',
    matchTags: ['communication', 'creative', 'business', 'social', 'analytical'],
  },
  {
    slug: 'blockchain-developer',
    title: 'Blockchain Developer',
    category: 'Emerging Tech',
    icon: Cpu,
    overview:
      'Blockchain Developers build decentralized applications and smart contracts on platforms like Ethereum, using Solidity and web3 technologies.',
    skills: ['Solidity', 'JavaScript', 'Smart Contracts', 'Ethereum', 'Cryptography', 'Web3.js'],
    salary: '₹6–35 LPA',
    demand: 'Growing',
    futureScope:
      'Blockchain is expanding beyond crypto into supply chain, finance, healthcare, and government applications.',
    growth: '20% annual growth',
    roadmap: [
      { phase: 'Foundation (3-5 months)', items: ['JavaScript & Node.js', 'Cryptography basics', 'Blockchain fundamentals'] },
      { phase: 'Smart Contracts (3-6 months)', items: ['Solidity', 'Ethereum platform', 'Hardhat / Truffle'] },
      { phase: 'DApp Development (3-6 months)', items: ['Web3.js / Ethers.js', 'Frontend integration', 'IPFS'] },
      { phase: 'Advanced (ongoing)', items: ['Layer 2 solutions', 'DeFi protocols', 'Security auditing'] },
    ],
    topCompanies: ['Polygon', 'Coinbase', 'Binance', 'IBM', 'Accenture'],
    courses: ['Blockchain — Coursera', 'Ethereum & Solidity — Udemy', 'Blockchain Developer — IBM'],
    certifications: ['Certified Blockchain Developer', 'Ethereum Developer Certification', 'IBM Blockchain Foundation'],
    eligibility: 'B.Tech CS / BCA / Any graduate with programming',
    matchTags: ['programming', 'logical', 'analytical', 'technical', 'math'],
  },
  {
    slug: 'iot-engineer',
    title: 'IoT Engineer',
    category: 'Emerging Tech',
    icon: Wifi,
    overview:
      'IoT Engineers design connected devices and systems that collect and exchange data, bridging hardware and software for smart applications.',
    skills: ['Embedded C', 'Python', 'Arduino', 'Raspberry Pi', 'MQTT', 'Networking', 'Cloud IoT'],
    salary: '₹4–20 LPA',
    demand: 'Growing',
    futureScope:
      'IoT is powering smart cities, industrial automation, healthcare, and agriculture — a massive growth area.',
    growth: '18% annual growth',
    roadmap: [
      { phase: 'Electronics (2-4 months)', items: ['Basic electronics', 'Arduino / Raspberry Pi', 'Sensors & actuators'] },
      { phase: 'Programming (3-5 months)', items: ['Embedded C', 'Python for IoT', 'Microcontrollers'] },
      { phase: 'Connectivity (3-4 months)', items: ['MQTT / HTTP protocols', 'Cloud IoT platforms (AWS IoT, Azure IoT)', 'Edge computing'] },
      { phase: 'Advanced (ongoing)', items: ['IoT security', 'Data analytics', 'AI at the edge'] },
    ],
    topCompanies: ['TCS', 'Wipro', 'Siemens', 'Bosch', 'IBM'],
    courses: ['IoT Specialization — Coursera', 'IoT — NPTEL', 'Arduino — Udemy'],
    certifications: ['AWS IoT Specialty', 'Cisco IoT Fundamentals', 'Microsoft Azure IoT'],
    eligibility: 'B.Tech ECE / EEE / CS / Any graduate',
    matchTags: ['technical', 'electronics', 'programming', 'analytical', 'problem-solving'],
  },
  {
    slug: 'robotics-engineer',
    title: 'Robotics Engineer',
    category: 'Emerging Tech',
    icon: Bot,
    overview:
      'Robotics Engineers design, build, and program robots for industries like manufacturing, healthcare, defense, and space exploration.',
    skills: ['C++', 'Python', 'ROS', 'Mechatronics', 'Computer Vision', 'Control Systems'],
    salary: '₹5–25 LPA',
    demand: 'Growing',
    futureScope:
      'Robotics is transforming manufacturing, logistics, surgery, and agriculture. Demand will accelerate with AI integration.',
    growth: '17% annual growth',
    roadmap: [
      { phase: 'Foundation (4-6 months)', items: ['Math & physics', 'C++ programming', 'Electronics basics'] },
      { phase: 'Robotics Core (6-12 months)', items: ['ROS (Robot Operating System)', 'Control systems', 'Sensors & actuators'] },
      { phase: 'Intelligence (6-12 months)', items: ['Computer vision', 'Machine learning', 'Path planning'] },
      { phase: 'Specialization (ongoing)', items: ['Industrial robotics', 'Autonomous vehicles', 'Medical robotics'] },
    ],
    topCompanies: ['ABB', 'Kuka', 'Boston Dynamics', 'ISRO', 'DRDO'],
    courses: ['Robotics Specialization — Coursera', 'Modern Robotics — NPTEL', 'ROS — Udemy'],
    certifications: ['ROS Developer Certificate', 'Certified Robotics Professional', 'FANUC Robotics'],
    eligibility: 'B.Tech Mechatronics / ECE / Mechanical / CS',
    matchTags: ['technical', 'math', 'programming', 'problem-solving', 'research'],
  },
  {
    slug: 'mobile-app-developer',
    title: 'Mobile App Developer',
    category: 'Software Development',
    icon: Smartphone,
    overview:
      'Mobile App Developers build native and cross-platform apps for iOS and Android using Swift, Kotlin, Flutter, or React Native.',
    skills: ['Flutter', 'React Native', 'Dart', 'JavaScript', 'Firebase', 'REST APIs'],
    salary: '₹4–22 LPA',
    demand: 'High',
    futureScope:
      'Mobile continues to dominate digital interaction. Cross-platform frameworks are expanding opportunities.',
    growth: '16% annual growth',
    roadmap: [
      { phase: 'Programming (2-4 months)', items: ['Dart or JavaScript', 'OOP concepts', 'Git basics'] },
      { phase: 'Framework (3-6 months)', items: ['Flutter or React Native', 'UI components', 'State management'] },
      { phase: 'Backend Integration (2-4 months)', items: ['REST APIs', 'Firebase', 'Local databases'] },
      { phase: 'Publishing (ongoing)', items: ['App Store deployment', 'Push notifications', 'App analytics'] },
    ],
    topCompanies: ['Google', 'Razorpay', 'PhonePe', 'Swiggy', 'Startups'],
    courses: ['Flutter & Dart — Udemy', 'React Native — Coursera', 'Mobile Dev — Google'],
    certifications: ['Google Associate Android Developer', 'Flutter Certification', 'React Native certifications'],
    eligibility: 'B.Tech / BCA / MCA / Any graduate',
    matchTags: ['programming', 'creative', 'logical', 'technical', 'analytical'],
  },
  {
    slug: 'civil-services',
    title: 'Civil Services (IAS/IPS)',
    category: 'Government Jobs',
    icon: Landmark,
    overview:
      'Civil Services officers serve in top administrative positions in the government, shaping policy and governance at national and state levels.',
    skills: ['General Studies', 'Current Affairs', 'Essay Writing', 'Optional Subject', 'Communication', 'Leadership'],
    salary: '₹7–18 LPA + perks',
    demand: 'High',
    futureScope:
      'Civil services remain one of the most prestigious career paths with significant impact on society and governance.',
    growth: 'Stable demand',
    roadmap: [
      { phase: 'Foundation (6-12 months)', items: ['NCERT books (6-12)', 'Newspaper reading habit', 'Current affairs'] },
      { phase: 'Core Preparation (12-18 months)', items: ['GS Paper 1-4', 'Optional subject', 'Answer writing practice'] },
      { phase: 'Prelims (3-6 months)', items: ['Mock tests', 'Previous year papers', 'Revision'] },
      { phase: 'Mains & Interview (ongoing)', items: ['Mains answer writing', 'Mock interviews', 'Personality test prep'] },
    ],
    topCompanies: ['Government of India', 'State Governments', 'PSUs'],
    courses: ['UPSC GS — Unacademy', 'NCERT — SWAYAM', 'Optional — Vision IAS'],
    certifications: ['N/A — UPSC Civil Services Examination'],
    eligibility: 'Any graduate degree',
    matchTags: ['social', 'communication', 'leadership', 'general-knowledge', 'empathy'],
  },
  {
    slug: 'defence-officer',
    title: 'Defence Officer',
    category: 'Government Jobs',
    icon: Shield,
    overview:
      'Defence Officers serve in the Indian Army, Navy, or Air Force, protecting the nation and leading operations on land, sea, and air.',
    skills: ['Physical Fitness', 'Leadership', 'Strategy', 'Discipline', 'Communication', 'Technical Skills'],
    salary: '₹6–15 LPA + allowances',
    demand: 'High',
    futureScope:
      'A prestigious career with opportunities in combat, technical, and support roles across the three services.',
    growth: 'Stable demand',
    roadmap: [
      { phase: 'Eligibility (pre-college)', items: ['NDA after 12th or CDS after graduation', 'Physical fitness', 'Medical standards'] },
      { phase: 'Written Exam (3-6 months)', items: ['NDA / CDA exam preparation', 'Math & English', 'General Knowledge'] },
      { phase: 'SSB Interview (ongoing)', items: ['Officer Intelligence Rating', 'Group Testing', 'Personal Interview'] },
      { phase: 'Training (ongoing)', items: ['Academy training', 'Physical conditioning', 'Specialization'] },
    ],
    topCompanies: ['Indian Army', 'Indian Navy', 'Indian Air Force', 'Coast Guard'],
    courses: ['NDA Preparation — Unacademy', 'CDS — Adda247', 'SSB Coaching — OliveBoard'],
    certifications: ['NDA / CDS / AFCAT Examination'],
    eligibility: '12th (NDA) or Graduate (CDS)',
    matchTags: ['leadership', 'physical', 'discipline', 'social', 'strategic'],
  },
  {
    slug: 'banking-officer',
    title: 'Banking Officer (PO)',
    category: 'Government Jobs',
    icon: Banknote,
    overview:
      'Banking Probationary Officers manage bank operations, customer service, loans, and financial products in public and private sector banks.',
    skills: ['Quantitative Aptitude', 'Reasoning', 'English', 'Banking Awareness', 'Computer Knowledge'],
    salary: '₹4–10 LPA',
    demand: 'High',
    futureScope:
      'Banking jobs offer stability and growth. IBPS and SBI PO exams recruit thousands of officers annually.',
    growth: 'Stable demand',
    roadmap: [
      { phase: 'Syllabus (2-3 months)', items: ['Quant & Reasoning basics', 'English grammar', 'Banking awareness'] },
      { phase: 'Practice (3-6 months)', items: ['Daily mock tests', 'Speed & accuracy', 'Previous papers'] },
      { phase: 'Mains (2-3 months)', items: ['Descriptive writing', 'Data interpretation', 'Computer knowledge'] },
      { phase: 'Interview (ongoing)', items: ['Group discussion', 'Personal interview', 'Banking updates'] },
    ],
    topCompanies: ['SBI', 'RBI', 'IBPS Banks', 'Private Banks'],
    courses: ['Banking PO — Adda247', 'IBPS — OliveBoard', 'Banking — Unacademy'],
    certifications: ['IBPS PO / SBI PO / RBI Grade B Examination'],
    eligibility: 'Any graduate degree',
    matchTags: ['analytical', 'logical', 'business', 'communication', 'numerical'],
  },
  {
    slug: 'doctor',
    title: 'Doctor (MBBS)',
    category: 'Medical',
    icon: HeartPulse,
    overview:
      'Doctors diagnose and treat patients, working in hospitals, clinics, or private practice. Specializations include surgery, pediatrics, cardiology, and more.',
    skills: ['Biology', 'Chemistry', 'Patient Care', 'Diagnosis', 'Communication', 'Empathy'],
    salary: '₹8–50 LPA',
    demand: 'Very High',
    futureScope:
      'Healthcare demand is growing. Specializations and super-specializations command premium salaries.',
    growth: '15% annual growth',
    roadmap: [
      { phase: 'NEET Prep (1-2 years)', items: ['Physics, Chemistry, Biology', 'NCERT mastery', 'Mock tests'] },
      { phase: 'MBBS (5.5 years)', items: ['Pre-clinical subjects', 'Clinical rotations', 'Internship'] },
      { phase: 'Specialization (3-5 years)', items: ['NEET-PG / MD / MS', 'Super specialization (DM/MCh)', 'Fellowships'] },
      { phase: 'Practice (ongoing)', items: ['Registration', 'Residency', 'Private practice'] },
    ],
    topCompanies: ['AIIMS', 'Apollo', 'Fortis', 'Govt Hospitals', 'Private Clinics'],
    courses: ['NEET Prep — Allen', 'MBBS — Medical Colleges', 'PG Prep — Marrow'],
    certifications: ['MBBS + MD/MS + DM/MCh (Medical Council of India)'],
    eligibility: '12th Science (PCB) + NEET',
    matchTags: ['biology', 'empathy', 'social', 'research', 'communication'],
  },
  {
    slug: 'lawyer',
    title: 'Lawyer / Legal Advisor',
    category: 'Law',
    icon: Scale,
    overview:
      'Lawyers represent clients in legal matters, draft contracts, provide counsel, and specialize in areas like corporate, criminal, or civil law.',
    skills: ['Legal Research', 'Communication', 'Analytical Thinking', 'Drafting', 'Negotiation', 'Critical Thinking'],
    salary: '₹5–30 LPA',
    demand: 'High',
    futureScope:
      'Legal services are expanding into corporate compliance, IP, tech law, and international arbitration.',
    growth: '12% annual growth',
    roadmap: [
      { phase: 'CLAT Prep (1-2 years)', items: ['English, GK, Legal reasoning', 'Math & Logic', 'Mock tests'] },
      { phase: 'LLB (3-5 years)', items: ['Constitutional law', 'Criminal & civil law', 'Internships'] },
      { phase: 'Specialization (ongoing)', items: ['Corporate / Criminal / IP law', 'LLM (optional)', 'Bar registration'] },
      { phase: 'Practice (ongoing)', items: ['Law firm / independent', 'Court appearances', 'Client base'] },
    ],
    topCompanies: ['Law Firms (Amarchand, Khaitan)', 'Corporate Legal Teams', 'Independent Practice'],
    courses: ['CLAT Prep — Career Launcher', 'LLB — Law Colleges', 'Legal — SWAYAM'],
    certifications: ['LLB + Bar Council Registration + LLM (optional)'],
    eligibility: '12th (5-yr integrated) or Graduate (3-yr LLB)',
    matchTags: ['communication', 'analytical', 'logical', 'social', 'research'],
  },
  {
    slug: 'chartered-accountant',
    title: 'Chartered Accountant',
    category: 'Commerce',
    icon: Wallet,
    overview:
      'CAs handle accounting, auditing, taxation, and financial advisory for businesses and individuals, playing a critical role in financial compliance.',
    skills: ['Accounting', 'Taxation', 'Auditing', 'Finance', 'Business Law', 'Analytical Thinking'],
    salary: '₹7–25 LPA',
    demand: 'High',
    futureScope:
      'Every business needs CAs for compliance and advisory. Demand grows with the economy.',
    growth: '10% annual growth',
    roadmap: [
      { phase: 'CA Foundation (6-12 months)', items: ['Accounting principles', 'Business laws', 'Economics'] },
      { phase: 'CA Intermediate (12 months)', items: ['Advanced accounting', 'Taxation', 'Audit'] },
      { phase: 'Articleship (3 years)', items: ['Practical training', 'Audit experience', 'Tax filing'] },
      { phase: 'CA Final (ongoing)', items: ['Strategic financial management', 'Direct & indirect tax', 'Final exam'] },
    ],
    topCompanies: ['Big 4 (Deloitte, PwC, EY, KPMG)', 'Corporates', 'Independent Practice'],
    courses: ['CA — ICAI', 'Commerce — Unacademy', 'Accounting — SWAYAM'],
    certifications: ['CA (ICAI) + CPA (optional)'],
    eligibility: '12th Commerce (or any stream) + CA exams',
    matchTags: ['numerical', 'analytical', 'business', 'logical', 'detail-oriented'],
  },
  {
    slug: 'mba-manager',
    title: 'Business Manager (MBA)',
    category: 'Management',
    icon: Briefcase,
    overview:
      'MBA graduates lead teams, manage operations, and drive strategy in finance, marketing, HR, or operations across industries.',
    skills: ['Leadership', 'Strategy', 'Communication', 'Analytics', 'Finance', 'Marketing'],
    salary: '₹8–40 LPA',
    demand: 'High',
    futureScope:
      'MBA remains the gold standard for management careers, with growing demand in tech, consulting, and startups.',
    growth: '12% annual growth',
    roadmap: [
      { phase: 'CAT/MAT Prep (6-12 months)', items: ['Quant & DI', 'Verbal & LR', 'Mock tests'] },
      { phase: 'MBA (2 years)', items: ['Core management', 'Specialization (Finance/Marketing/HR)', 'Internships'] },
      { phase: 'First Job', items: ['Management trainee', 'Consulting / Product / Sales roles', 'Networking'] },
      { phase: 'Growth (ongoing)', items: ['Leadership roles', 'Industry expertise', 'Entrepreneurship'] },
    ],
    topCompanies: ['McKinsey', 'BCG', 'Amazon', 'ITC', 'HUL', 'Tata'],
    courses: ['MBA Prep — TIME/CL', 'MBA — IIMs / ISB', 'Management — SWAYAM'],
    certifications: ['MBA (AICTE approved) + CFA / PMP (optional)'],
    eligibility: 'Graduate + CAT/MAT/XAT',
    matchTags: ['leadership', 'business', 'communication', 'social', 'analytical'],
  },
  {
    slug: 'agriculture-scientist',
    title: 'Agriculture Scientist',
    category: 'Agriculture',
    icon: Leaf,
    overview:
      'Agriculture Scientists research and develop improved crop varieties, farming techniques, and sustainable practices to enhance food security.',
    skills: ['Biology', 'Soil Science', 'Agronomy', 'Research', 'Data Analysis', 'Biotechnology'],
    salary: '₹4–18 LPA',
    demand: 'Growing',
    futureScope:
      'With climate change and food security concerns, agricultural innovation is critical and well-funded.',
    growth: '10% annual growth',
    roadmap: [
      { phase: 'Foundation (2-4 years)', items: ['B.Sc Agriculture', 'Soil & crop science', 'Practical training'] },
      { phase: 'Specialization (2-3 years)', items: ['M.Sc Agriculture', 'Research methodology', 'Specialized domain'] },
      { phase: 'Research (ongoing)', items: ['PhD (optional)', 'ICAR positions', 'Field research'] },
      { phase: 'Career (ongoing)', items: ['Govt / private R&D', 'Agri-tech startups', 'Extension services'] },
    ],
    topCompanies: ['ICAR', 'State Agriculture Depts', 'Agri Startups', 'IFFCO', 'Bayer'],
    courses: ['B.Sc Agri — Agri Universities', 'ICAR — Unacademy', 'Agronomy — SWAYAM'],
    certifications: ['B.Sc + M.Sc Agriculture + ICAR NET / PhD'],
    eligibility: '12th Science (PCB/PCM) + Agri entrance',
    matchTags: ['biology', 'research', 'analytical', 'environment', 'empathy'],
  },
  {
    slug: 'animation-designer',
    title: 'Animation Designer',
    category: 'Design',
    icon: Film,
    overview:
      'Animation Designers create 2D and 3D animations for films, games, advertising, and digital media using tools like Blender, Maya, and After Effects.',
    skills: ['Blender', 'Maya', 'After Effects', 'Drawing', 'Storytelling', 'Creativity'],
    salary: '₹3–18 LPA',
    demand: 'Growing',
    futureScope:
      'Animation and VFX are booming in entertainment, gaming, AR/VR, and advertising globally.',
    growth: '16% annual growth',
    roadmap: [
      { phase: 'Art Foundation (3-6 months)', items: ['Drawing & sketching', 'Color & composition', 'Storytelling'] },
      { phase: 'Tools (6-12 months)', items: ['Blender / Maya', 'After Effects', '2D animation principles'] },
      { phase: 'Specialization (6-12 months)', items: ['3D modeling / rigging', 'VFX', 'Character animation'] },
      { phase: 'Portfolio (ongoing)', items: ['Demo reel', 'Industry projects', 'Studio applications'] },
    ],
    topCompanies: ['Prime Focus', 'Redchillies VFX', 'Disney India', 'MPC', 'Technicolor'],
    courses: ['Animation — Arena Animation', '3D Animation — Coursera', 'Blender — YouTube/Udemy'],
    certifications: ['Animation / VFX Diploma + Autodesk certifications'],
    eligibility: '12th any stream + Animation diploma',
    matchTags: ['creative', 'artistic', 'design', 'storytelling', 'visual'],
  },
];

export type Course = {
  id: string;
  title: string;
  provider: string;
  platform: 'Coursera' | 'Udemy' | 'NPTEL' | 'SWAYAM' | 'edX' | 'Google' | 'Microsoft' | 'AWS' | 'Cisco' | 'IBM' | 'Meta';
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: 'Free' | 'Paid';
  rating: number;
  skills: string[];
  certificate: boolean;
  url: string;
};

export const courses: Course[] = [
  { id: 'c1', title: 'Machine Learning Specialization', provider: 'Andrew Ng', platform: 'Coursera', category: 'AI & ML', level: 'Intermediate', duration: '3 months', price: 'Paid', rating: 4.9, skills: ['Python', 'ML', 'Deep Learning'], certificate: true, url: 'https://coursera.org' },
  { id: 'c2', title: 'Full Stack Web Development', provider: 'Meta', platform: 'Coursera', category: 'Web Dev', level: 'Beginner', duration: '8 months', price: 'Paid', rating: 4.7, skills: ['React', 'Node.js', 'JavaScript'], certificate: true, url: 'https://coursera.org' },
  { id: 'c3', title: 'CS50 Introduction to Computer Science', provider: 'Harvard', platform: 'edX', category: 'CS Basics', level: 'Beginner', duration: '12 weeks', price: 'Free', rating: 4.8, skills: ['C', 'Python', 'Algorithms'], certificate: true, url: 'https://edx.org' },
  { id: 'c4', title: 'Data Science Bootcamp', provider: 'IBM', platform: 'Coursera', category: 'Data Science', level: 'Intermediate', duration: '10 months', price: 'Paid', rating: 4.6, skills: ['Python', 'SQL', 'ML'], certificate: true, url: 'https://coursera.org' },
  { id: 'c5', title: 'Cyber Security Fundamentals', provider: 'NPTEL', platform: 'NPTEL', category: 'Cyber Security', level: 'Beginner', duration: '12 weeks', price: 'Free', rating: 4.5, skills: ['Networking', 'Security', 'Linux'], certificate: true, url: 'https://nptel.ac.in' },
  { id: 'c6', title: 'Cloud Computing Concepts', provider: 'SWAYAM', platform: 'SWAYAM', category: 'Cloud', level: 'Intermediate', duration: '8 weeks', price: 'Free', rating: 4.4, skills: ['AWS', 'Azure', 'Virtualization'], certificate: true, url: 'https://swayam.gov.in' },
  { id: 'c7', title: 'AWS Cloud Practitioner', provider: 'Amazon', platform: 'AWS', category: 'Cloud', level: 'Beginner', duration: '6 weeks', price: 'Free', rating: 4.7, skills: ['AWS', 'Cloud', 'Storage'], certificate: true, url: 'https://aws.amazon.com' },
  { id: 'c8', title: 'Google UX Design Professional', provider: 'Google', platform: 'Coursera', category: 'Design', level: 'Beginner', duration: '6 months', price: 'Paid', rating: 4.8, skills: ['Figma', 'UX Research', 'Prototyping'], certificate: true, url: 'https://coursera.org' },
  { id: 'c9', title: 'Python for Everybody', provider: 'University of Michigan', platform: 'Coursera', category: 'Programming', level: 'Beginner', duration: '8 months', price: 'Paid', rating: 4.8, skills: ['Python', 'Data', 'Web'], certificate: true, url: 'https://coursera.org' },
  { id: 'c10', title: 'CCNA Networking Basics', provider: 'Cisco', platform: 'Cisco', category: 'Networking', level: 'Intermediate', duration: '6 months', price: 'Paid', rating: 4.6, skills: ['Networking', 'Routing', 'Switching'], certificate: true, url: 'https://cisco.com' },
  { id: 'c11', title: 'IBM Data Science Professional', provider: 'IBM', platform: 'Coursera', category: 'Data Science', level: 'Beginner', duration: '10 months', price: 'Paid', rating: 4.6, skills: ['Python', 'SQL', 'Pandas', 'ML'], certificate: true, url: 'https://coursera.org' },
  { id: 'c12', title: 'React - The Complete Guide', provider: 'Maximilian Schwarzmüller', platform: 'Udemy', category: 'Web Dev', level: 'Intermediate', duration: '68 hours', price: 'Paid', rating: 4.7, skills: ['React', 'Redux', 'JavaScript'], certificate: true, url: 'https://udemy.com' },
  { id: 'c13', title: 'Introduction to IoT', provider: 'NPTEL', platform: 'NPTEL', category: 'IoT', level: 'Beginner', duration: '8 weeks', price: 'Free', rating: 4.5, skills: ['IoT', 'Sensors', 'Networking'], certificate: true, url: 'https://nptel.ac.in' },
  { id: 'c14', title: 'Blockchain Basics', provider: 'IBM', platform: 'Coursera', category: 'Blockchain', level: 'Beginner', duration: '4 weeks', price: 'Free', rating: 4.4, skills: ['Blockchain', 'Ethereum', 'Solidity'], certificate: true, url: 'https://coursera.org' },
  { id: 'c15', title: 'Microsoft Azure Fundamentals', provider: 'Microsoft', platform: 'Microsoft', category: 'Cloud', level: 'Beginner', duration: '4 weeks', price: 'Free', rating: 4.5, skills: ['Azure', 'Cloud', 'Services'], certificate: true, url: 'https://microsoft.com' },
  { id: 'c16', title: 'Digital Marketing Specialization', provider: 'Google', platform: 'Google', category: 'Marketing', level: 'Beginner', duration: '6 months', price: 'Free', rating: 4.6, skills: ['SEO', 'SEM', 'Analytics'], certificate: true, url: 'https://google.com' },
  { id: 'c17', title: 'Meta Front-End Developer', provider: 'Meta', platform: 'Coursera', category: 'Web Dev', level: 'Beginner', duration: '7 months', price: 'Paid', rating: 4.7, skills: ['HTML', 'CSS', 'JavaScript', 'React'], certificate: true, url: 'https://coursera.org' },
  { id: 'c18', title: 'Ethical Hacking Basics', provider: 'Udemy', platform: 'Udemy', category: 'Cyber Security', level: 'Intermediate', duration: '24 hours', price: 'Paid', rating: 4.5, skills: ['Penetration Testing', 'Kali Linux', 'Security'], certificate: true, url: 'https://udemy.com' },
];

export type College = {
  id: string;
  name: string;
  type: 'Government' | 'Private';
  state: string;
  city: string;
  courses: string[];
  fees: string;
  ranking: number;
  facilities: string[];
  placements: string;
  website: string;
  admissionDate: string;
  seats: number;
};

export const colleges: College[] = [
  { id: 'col1', name: 'IIT Bombay', type: 'Government', state: 'Maharashtra', city: 'Mumbai', courses: ['B.Tech', 'M.Tech', 'PhD'], fees: '₹2L/year', ranking: 1, facilities: ['Hostel', 'Library', 'Labs', 'Sports'], placements: '₹21 LPA avg', website: 'iitb.ac.in', admissionDate: 'Jun 2026', seats: 1000 },
  { id: 'col2', name: 'IIT Delhi', type: 'Government', state: 'Delhi', city: 'New Delhi', courses: ['B.Tech', 'M.Tech', 'MBA'], fees: '₹2.2L/year', ranking: 2, facilities: ['Hostel', 'Library', 'Labs', 'Sports', 'Incubator'], placements: '₹20 LPA avg', website: 'iitd.ac.in', admissionDate: 'Jun 2026', seats: 950 },
  { id: 'col3', name: 'IIT Madras', type: 'Government', state: 'Tamil Nadu', city: 'Chennai', courses: ['B.Tech', 'M.Tech', 'PhD'], fees: '₹2L/year', ranking: 1, facilities: ['Hostel', 'Library', 'Labs', 'Sports'], placements: '₹19 LPA avg', website: 'iitm.ac.in', admissionDate: 'Jun 2026', seats: 900 },
  { id: 'col4', name: 'BITS Pilani', type: 'Private', state: 'Rajasthan', city: 'Pilani', courses: ['B.E.', 'M.E.', 'MBA'], fees: '₹5L/year', ranking: 5, facilities: ['Hostel', 'Library', 'Labs', 'Sports', 'Incubator'], placements: '₹18 LPA avg', website: 'bits-pilani.ac.in', admissionDate: 'Aug 2026', seats: 1000 },
  { id: 'col5', name: 'NIT Trichy', type: 'Government', state: 'Tamil Nadu', city: 'Tiruchirappalli', courses: ['B.Tech', 'M.Tech'], fees: '₹1.5L/year', ranking: 8, facilities: ['Hostel', 'Library', 'Labs', 'Sports'], placements: '₹14 LPA avg', website: 'nitt.edu', admissionDate: 'Jul 2026', seats: 800 },
  { id: 'col6', name: 'VIT Vellore', type: 'Private', state: 'Tamil Nadu', city: 'Vellore', courses: ['B.Tech', 'M.Tech', 'MBA'], fees: '₹3.5L/year', ranking: 12, facilities: ['Hostel', 'Library', 'Labs', 'Sports', 'Incubator'], placements: '₹9 LPA avg', website: 'vit.ac.in', admissionDate: 'Jul 2026', seats: 5000 },
  { id: 'col7', name: 'COEP Pune', type: 'Government', state: 'Maharashtra', city: 'Pune', courses: ['B.Tech', 'M.Tech'], fees: '₹1.2L/year', ranking: 15, facilities: ['Hostel', 'Library', 'Labs', 'Sports'], placements: '₹10 LPA avg', website: 'coep.org.in', admissionDate: 'Jun 2026', seats: 700 },
  { id: 'col8', name: 'IIIT Hyderabad', type: 'Government', state: 'Telangana', city: 'Hyderabad', courses: ['B.Tech', 'M.Tech', 'PhD'], fees: '₹2.5L/year', ranking: 6, facilities: ['Hostel', 'Library', 'Labs', 'Research'], placements: '₹23 LPA avg', website: 'iiit.ac.in', admissionDate: 'Jul 2026', seats: 300 },
  { id: 'col9', name: 'SRM Chennai', type: 'Private', state: 'Tamil Nadu', city: 'Chennai', courses: ['B.Tech', 'MBA', 'Medical'], fees: '₹4L/year', ranking: 20, facilities: ['Hostel', 'Library', 'Labs', 'Sports'], placements: '₹7 LPA avg', website: 'srmist.edu.in', admissionDate: 'Jul 2026', seats: 6000 },
  { id: 'col10', name: 'AIIMS Delhi', type: 'Government', state: 'Delhi', city: 'New Delhi', courses: ['MBBS', 'MD', 'MS'], fees: '₹5K/year', ranking: 1, facilities: ['Hostel', 'Hospital', 'Library', 'Research'], placements: '₹12 LPA avg', website: 'aiims.edu', admissionDate: 'Aug 2026', seats: 125 },
  { id: 'col11', name: 'NLSIU Bangalore', type: 'Government', state: 'Karnataka', city: 'Bengaluru', courses: ['LLB', 'LLM'], fees: '₹2L/year', ranking: 1, facilities: ['Hostel', 'Library', 'Moot Court'], placements: '₹16 LPA avg', website: 'nls.ac.in', admissionDate: 'Jul 2026', seats: 240 },
  { id: 'col12', name: 'IIM Ahmedabad', type: 'Government', state: 'Gujarat', city: 'Ahmedabad', courses: ['MBA', 'PGP', 'PhD'], fees: '₹30L total', ranking: 1, facilities: ['Hostel', 'Library', 'Case Study Rooms'], placements: '₹40 LPA avg', website: 'iima.ac.in', admissionDate: 'Jun 2026', seats: 400 },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  { slug: 'ai-career-roadmap', title: 'The Complete AI Career Roadmap for 2026', excerpt: 'A step-by-step guide to building a career in Artificial Intelligence — from foundations to specialization.', category: 'AI & ML', author: 'Dr. Rajesh Kumar', date: 'Jul 10, 2026', readTime: '8 min', image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'data-science-vs-ai', title: 'Data Science vs AI vs ML: Which Career is Right for You?', excerpt: 'Understand the differences and overlaps between these three booming fields and choose your path.', category: 'Career Tips', author: 'Priya Sharma', date: 'Jul 8, 2026', readTime: '6 min', image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'cyber-security-trends', title: 'Top 10 Cyber Security Trends to Watch in 2026', excerpt: 'From zero-trust to AI-driven threats, here is what security professionals need to know.', category: 'Cyber Security', author: 'Amit Singh', date: 'Jul 5, 2026', readTime: '7 min', image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'crack-interview-tips', title: '10 Proven Tips to Crack Your First Technical Interview', excerpt: 'From resume screening to the final round — strategies that actually work.', category: 'Interview Tips', author: 'Sneha Patel', date: 'Jul 3, 2026', readTime: '5 min', image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'government-exams-guide', title: 'Complete Guide to Government Exams After Graduation', excerpt: 'UPSC, SSC, Banking, Railways — everything you need to know about government job preparation.', category: 'Government Exams', author: 'Vikram Reddy', date: 'Jul 1, 2026', readTime: '10 min', image: 'https://images.pexels.com/photos/5668773/pexels-photo-5668773.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { slug: 'success-story-rahul', title: 'From Tier-3 College to Google: Rahul\'s Success Story', excerpt: 'How consistent learning and the right roadmap helped Rahul land a dream job at Google.', category: 'Success Stories', author: 'Rahul Verma', date: 'Jun 28, 2026', readTime: '6 min', image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Remote' | 'Government';
  salary: string;
  experience: string;
  skills: string[];
  posted: string;
  description: string;
  applyUrl: string;
};

export const jobs: Job[] = [
  {
    id: 'j1', title: 'AI Engineer', company: 'Google', location: 'Bengaluru',
    type: 'Full-time', salary: '₹25–40 LPA', experience: '2-5 yrs',
    skills: ['Python', 'TensorFlow', 'NLP'], posted: '2 days ago',
    description: 'Build and deploy cutting-edge AI models. Work on search, recommendations, and large-scale ML pipelines at Google.',
    applyUrl: 'https://careers.google.com',
  },
  {
    id: 'j2', title: 'Data Scientist', company: 'Amazon', location: 'Hyderabad',
    type: 'Full-time', salary: '₹18–30 LPA', experience: '1-4 yrs',
    skills: ['Python', 'SQL', 'ML'], posted: '1 day ago',
    description: 'Analyze large datasets and build predictive models to drive business decisions across Amazon\'s e-commerce platform.',
    applyUrl: 'https://www.amazon.jobs',
  },
  {
    id: 'j3', title: 'Full Stack Developer', company: 'Razorpay', location: 'Remote',
    type: 'Remote', salary: '₹12–22 LPA', experience: '2-5 yrs',
    skills: ['React', 'Node.js', 'MongoDB'], posted: '3 days ago',
    description: 'Build and scale payment infrastructure used by 10M+ businesses. Work on React frontends and Node.js microservices.',
    applyUrl: 'https://razorpay.com/jobs',
  },
  {
    id: 'j4', title: 'Software Engineer Intern', company: 'Microsoft', location: 'Bengaluru',
    type: 'Internship', salary: '₹50K/month', experience: '0-1 yrs',
    skills: ['C++', 'DSA', 'OS'], posted: '5 days ago',
    description: 'Join Microsoft\'s engineering team for a 6-month internship. Work on real products used by millions globally.',
    applyUrl: 'https://careers.microsoft.com',
  },
  {
    id: 'j5', title: 'Cyber Security Analyst', company: 'Deloitte', location: 'Gurugram',
    type: 'Full-time', salary: '₹8–16 LPA', experience: '1-3 yrs',
    skills: ['Networking', 'SIEM', 'Python'], posted: '1 week ago',
    description: 'Protect Deloitte clients from cyber threats. Conduct vulnerability assessments and incident response.',
    applyUrl: 'https://www2.deloitte.com/in/en/careers.html',
  },
  {
    id: 'j6', title: 'Bank PO', company: 'State Bank of India', location: 'Pan India',
    type: 'Government', salary: '₹8–12 LPA', experience: '0-2 yrs',
    skills: ['Aptitude', 'Reasoning', 'English'], posted: '1 week ago',
    description: 'Join SBI as a Probationary Officer. Manage branch banking operations, customer service, and credit.',
    applyUrl: 'https://bank.sbi/careers',
  },
  {
    id: 'j7', title: 'UI/UX Designer', company: 'Swiggy', location: 'Bengaluru',
    type: 'Full-time', salary: '₹10–18 LPA', experience: '2-4 yrs',
    skills: ['Figma', 'Research', 'Prototyping'], posted: '4 days ago',
    description: 'Design delightful experiences for Swiggy\'s 90M+ users. Own end-to-end design from research to final delivery.',
    applyUrl: 'https://careers.swiggy.com',
  },
  {
    id: 'j8', title: 'Cloud Engineer', company: 'TCS', location: 'Pune',
    type: 'Full-time', salary: '₹6–14 LPA', experience: '1-4 yrs',
    skills: ['AWS', 'Docker', 'Kubernetes'], posted: '6 days ago',
    description: 'Design and manage cloud infrastructure for TCS enterprise clients. Work with AWS, Azure, and containerized workloads.',
    applyUrl: 'https://www.tcs.com/careers',
  },
];

export const stats = [
  { label: 'Active Learners', value: '50,000+' },
  { label: 'Educational Videos', value: '2,500+' },
  { label: 'Curated Tutorials', value: '5,000+' },
  { label: 'Quizzes Taken', value: '120,000+' },
  { label: 'EduMart Listings', value: '15,000+' },
  { label: 'Projects Built', value: '8,500+' },
];

export const features = [
  { title: 'Learn (Video Courses)', desc: 'Interactive educational videos, structured courses, and hands-on tutorials across all career domains.', icon: BookOpen },
  { title: 'Practice (Quizzes)', desc: 'Subject-wise quizzes, MCQs, timed challenges, instant explanations, and global leaderboards.', icon: Cpu },
  { title: 'Track (Progress & Badges)', desc: 'Monitor study hours, quiz accuracy, streaks, completion certificates, and skill achievements.', icon: LayoutDashboard },
  { title: 'Build (Project Recommendations)', desc: 'Step-by-step project roadmaps tailored to your skills, interests, and career path.', icon: Code2 },
  { title: 'Explore (Careers & Colleges)', desc: 'Detailed career roadmaps, college directories, and industry trends to guide your future.', icon: Compass },
  { title: 'Exchange (EduMart Marketplace)', desc: 'Buy and sell second-hand textbooks, calculators, lab instruments, and study gear at student-friendly prices.', icon: Briefcase },
];
