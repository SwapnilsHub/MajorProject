// lib/project-data.ts
// AI Project recommendation data

export type ProjectDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProjectRoadmapStep {
  step: number;
  title: string;
  description: string;
  estimatedTime: string;
  resources: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  difficulty: ProjectDifficulty;
  estimatedTime: string;
  requiredSkills: string[];
  technologies: string[];
  learningOutcomes: string[];
  description: string;
  industryRelevance: string;
  careerPaths: string[]; // Which career goals this suits
  roadmap: ProjectRoadmapStep[];
  githubRef: string;
  dataset?: string;
  apis?: string[];
  architecture: string;
  folderStructure: string;
  deploymentGuide: string;
  testingGuide: string;
}

export const projectCategories = [
  { id: 'all', label: 'All Projects', icon: '🌟' },
  { id: 'web-development', label: 'Web Development', icon: '🌐' },
  { id: 'ai-ml', label: 'AI / ML', icon: '🤖' },
  { id: 'data-science', label: 'Data Science', icon: '📊' },
  { id: 'android', label: 'Android', icon: '📱' },
  { id: 'iot', label: 'IoT', icon: '🔌' },
  { id: 'cloud', label: 'Cloud Computing', icon: '☁️' },
  { id: 'cyber-security', label: 'Cyber Security', icon: '🔐' },
  { id: 'blockchain', label: 'Blockchain', icon: '⛓️' },
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'java', label: 'Java', icon: '☕' },
  { id: 'fullstack', label: 'Full Stack', icon: '🏗️' },
  { id: 'devops', label: 'DevOps', icon: '🔄' },
];

export const projects: Project[] = [
  {
    id: 'proj-001',
    title: 'AI-Powered Resume Analyzer & Score Predictor',
    category: 'ai-ml',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 weeks',
    requiredSkills: ['Python', 'NLP', 'Flask', 'HTML/CSS'],
    technologies: ['Python', 'spaCy', 'scikit-learn', 'Flask', 'React', 'PDF.js'],
    learningOutcomes: [
      'Natural Language Processing fundamentals',
      'Text classification with ML',
      'Building REST APIs with Flask',
      'Keyword extraction and matching algorithms',
    ],
    description: 'Build a web application that analyzes resumes, scores them against job descriptions using NLP, and provides AI-generated improvement suggestions. Perfect for understanding real-world NLP applications.',
    industryRelevance: 'High demand at HR-tech companies like Naukri, LinkedIn, and corporate HR departments globally.',
    careerPaths: ['AI Engineer', 'Data Science', 'Software Engineering'],
    roadmap: [
      { step: 1, title: 'Setup & Planning', description: 'Install libraries, design database schema, plan API structure', estimatedTime: '1 day', resources: ['Python docs', 'spaCy quickstart'] },
      { step: 2, title: 'PDF Text Extraction', description: 'Build PDF parser to extract structured text from resumes', estimatedTime: '2 days', resources: ['PyMuPDF docs', 'pdfplumber tutorial'] },
      { step: 3, title: 'NLP Processing', description: 'Entity recognition, keyword extraction, and skill detection', estimatedTime: '4 days', resources: ['spaCy NER tutorial', 'NLTK guide'] },
      { step: 4, title: 'Scoring Algorithm', description: 'Build cosine similarity-based matching against job descriptions', estimatedTime: '3 days', resources: ['scikit-learn TF-IDF', 'cosine similarity tutorial'] },
      { step: 5, title: 'Flask API', description: 'Build REST API endpoints for upload, analyze, and results', estimatedTime: '2 days', resources: ['Flask tutorial', 'REST API best practices'] },
      { step: 6, title: 'Frontend', description: 'React UI with drag-and-drop upload, score visualization', estimatedTime: '3 days', resources: ['React docs', 'Chart.js tutorial'] },
      { step: 7, title: 'Deploy', description: 'Deploy to Render or Railway with CI/CD pipeline', estimatedTime: '1 day', resources: ['Render deployment guide'] },
    ],
    githubRef: 'https://github.com/example/resume-analyzer',
    dataset: 'Kaggle Resume Dataset (10,000+ resumes)',
    apis: ['OpenAI GPT-4 API (optional for suggestions)'],
    architecture: 'Frontend (React) → Flask REST API → NLP Pipeline → PostgreSQL → Cloud Storage (S3)',
    folderStructure: `resume-analyzer/
├── backend/
│   ├── app.py          # Flask entry point
│   ├── nlp/
│   │   ├── extractor.py
│   │   └── scorer.py
│   ├── models/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   └── package.json
├── docker-compose.yml
└── README.md`,
    deploymentGuide: '1. Build Docker images\n2. Push to Docker Hub\n3. Deploy on Render with Docker\n4. Set environment variables for API keys\n5. Configure custom domain',
    testingGuide: '1. Unit tests for NLP functions (pytest)\n2. Integration tests for API endpoints\n3. Test with 20+ sample resumes\n4. Load testing with Locust',
  },
  {
    id: 'proj-002',
    title: 'Real-Time Stock Market Dashboard with ML Predictions',
    category: 'data-science',
    difficulty: 'Advanced',
    estimatedTime: '4-5 weeks',
    requiredSkills: ['Python', 'Machine Learning', 'API Integration', 'Data Visualization'],
    technologies: ['Python', 'pandas', 'scikit-learn', 'LSTM', 'Plotly', 'Streamlit', 'yfinance API'],
    learningOutcomes: [
      'Time series analysis and forecasting',
      'LSTM neural networks for sequential data',
      'Real-time API data integration',
      'Interactive dashboard development',
      'Financial data analysis',
    ],
    description: 'Build a professional stock market dashboard with live data, technical indicators, and LSTM-based price prediction. Includes backtesting and portfolio simulation.',
    industryRelevance: 'Directly applicable in fintech, investment banks, trading firms, and hedge funds.',
    careerPaths: ['Data Science', 'AI Engineer', 'Finance Tech'],
    roadmap: [
      { step: 1, title: 'Data Collection', description: 'Fetch historical + live stock data using yfinance API', estimatedTime: '2 days', resources: ['yfinance documentation', 'Alpha Vantage API'] },
      { step: 2, title: 'Data Analysis & EDA', description: 'Exploratory analysis, correlation, moving averages, RSI, MACD', estimatedTime: '3 days', resources: ['Pandas docs', 'TA-Lib guide'] },
      { step: 3, title: 'Feature Engineering', description: 'Technical indicators, lag features, sentiment features', estimatedTime: '3 days', resources: ['Feature engineering blog', 'TA-Lib tutorial'] },
      { step: 4, title: 'ML Model (LSTM)', description: 'Build and train LSTM model for price forecasting', estimatedTime: '5 days', resources: ['Keras LSTM tutorial', 'TensorFlow docs'] },
      { step: 5, title: 'Backtesting', description: 'Test prediction strategy against historical data', estimatedTime: '3 days', resources: ['Backtrader docs', 'Zipline tutorial'] },
      { step: 6, title: 'Dashboard', description: 'Streamlit app with interactive Plotly charts', estimatedTime: '4 days', resources: ['Streamlit docs', 'Plotly Express guide'] },
      { step: 7, title: 'Deploy', description: 'Deploy to Streamlit Cloud or Hugging Face Spaces', estimatedTime: '1 day', resources: ['Streamlit Cloud guide'] },
    ],
    githubRef: 'https://github.com/example/stock-predictor',
    dataset: 'yfinance API (real-time) + Yahoo Finance historical data',
    apis: ['yfinance', 'Alpha Vantage', 'News API for sentiment'],
    architecture: 'Data Layer (yfinance) → Feature Engineering → LSTM Model → Streamlit Dashboard → Cloud Deploy',
    folderStructure: `stock-dashboard/
├── data/
│   ├── fetcher.py
│   └── preprocessor.py
├── models/
│   ├── lstm_model.py
│   └── trained_model.h5
├── indicators/
│   └── technical.py
├── dashboard/
│   └── app.py          # Streamlit app
├── backtesting/
│   └── backtest.py
└── requirements.txt`,
    deploymentGuide: '1. requirements.txt with all deps\n2. Push to GitHub\n3. Connect Streamlit Cloud to repo\n4. Add API keys as Streamlit secrets\n5. Deploy with auto-reload on push',
    testingGuide: '1. Validate prediction RMSE < 5%\n2. Backtest Sharpe ratio > 1.0\n3. Test API failure handling\n4. Cross-validate on out-of-sample data',
  },
  {
    id: 'proj-003',
    title: 'E-Commerce Full-Stack Web Application',
    category: 'fullstack',
    difficulty: 'Intermediate',
    estimatedTime: '3-4 weeks',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Authentication'],
    technologies: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT', 'Tailwind CSS'],
    learningOutcomes: [
      'Full-stack MERN/MEAN development',
      'JWT authentication & authorization',
      'Payment gateway integration',
      'Database design and optimization',
      'Responsive e-commerce UI',
    ],
    description: 'Build a production-ready e-commerce platform with product catalog, cart, checkout with Stripe, user auth, order management, and admin dashboard.',
    industryRelevance: 'Extremely high — e-commerce is a multi-trillion dollar industry. Companies like Meesho, Flipkart, and Myntra hire full-stack developers continuously.',
    careerPaths: ['Web Development', 'Full Stack', 'Software Engineering'],
    roadmap: [
      { step: 1, title: 'Project Setup', description: 'Next.js frontend + Express backend boilerplate, MongoDB Atlas setup', estimatedTime: '1 day', resources: ['Next.js docs', 'Express.js guide'] },
      { step: 2, title: 'Authentication', description: 'JWT auth, bcrypt password hashing, protected routes', estimatedTime: '3 days', resources: ['JWT tutorial', 'Passport.js docs'] },
      { step: 3, title: 'Product Catalog', description: 'Product listing, search, filter, category, pagination APIs', estimatedTime: '4 days', resources: ['MongoDB aggregation tutorial'] },
      { step: 4, title: 'Cart & Wishlist', description: 'Shopping cart state management, wishlist, quantity updates', estimatedTime: '3 days', resources: ['Redux Toolkit tutorial', 'Zustand guide'] },
      { step: 5, title: 'Checkout & Payments', description: 'Stripe integration, order creation, payment confirmation', estimatedTime: '3 days', resources: ['Stripe API docs', 'Webhook guide'] },
      { step: 6, title: 'Admin Dashboard', description: 'Product management, order tracking, analytics dashboard', estimatedTime: '3 days', resources: ['Recharts docs', 'Admin UI patterns'] },
      { step: 7, title: 'Deploy', description: 'Vercel (frontend) + Railway (backend) + MongoDB Atlas', estimatedTime: '2 days', resources: ['Vercel deploy guide', 'Railway docs'] },
    ],
    githubRef: 'https://github.com/example/ecommerce-fullstack',
    apis: ['Stripe Payments API', 'Cloudinary (images)', 'SendGrid (emails)'],
    architecture: 'Next.js SPA → Express REST API → MongoDB Atlas → Stripe → Cloudinary',
    folderStructure: `ecommerce/
├── frontend/          # Next.js app
│   ├── app/
│   ├── components/
│   └── lib/
├── backend/           # Express API
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── controllers/
├── .env.example
└── docker-compose.yml`,
    deploymentGuide: '1. Frontend: connect GitHub to Vercel\n2. Backend: deploy to Railway with env vars\n3. Database: MongoDB Atlas free tier\n4. Set CORS origins and Stripe webhooks\n5. Add custom domain',
    testingGuide: '1. API tests with Jest + Supertest\n2. Frontend tests with Cypress\n3. Payment flow with Stripe test cards\n4. Load test with k6',
  },
  {
    id: 'proj-004',
    title: 'IoT Smart Home Monitoring System',
    category: 'iot',
    difficulty: 'Intermediate',
    estimatedTime: '3-4 weeks',
    requiredSkills: ['Python', 'MQTT', 'Raspberry Pi', 'React', 'MongoDB'],
    technologies: ['Raspberry Pi', 'Arduino', 'Python', 'MQTT', 'Node.js', 'React', 'InfluxDB', 'Grafana'],
    learningOutcomes: [
      'IoT protocols (MQTT, HTTP)',
      'Sensor data collection and processing',
      'Real-time dashboards with WebSockets',
      'Time-series databases',
      'Edge computing basics',
    ],
    description: 'Build a smart home system with temperature, humidity, and motion sensors. Real-time monitoring dashboard, alerts, and historical data visualization.',
    industryRelevance: 'IoT market growing at 25% CAGR. Opportunities at Bosch, Honeywell, Siemens, and hundreds of IoT startups.',
    careerPaths: ['IoT Engineer', 'Embedded Systems', 'Software Engineering'],
    roadmap: [
      { step: 1, title: 'Hardware Setup', description: 'Setup Raspberry Pi/Arduino, connect sensors (DHT11, PIR, MQ-2)', estimatedTime: '2 days', resources: ['Raspberry Pi docs', 'Arduino tutorial'] },
      { step: 2, title: 'Sensor Code', description: 'Python scripts to read sensor data on intervals', estimatedTime: '2 days', resources: ['GPIO Python tutorial'] },
      { step: 3, title: 'MQTT Broker', description: 'Setup Mosquitto MQTT broker, publish/subscribe sensor topics', estimatedTime: '2 days', resources: ['Mosquitto docs', 'MQTT tutorial'] },
      { step: 4, title: 'Data Storage', description: 'Store time-series data in InfluxDB', estimatedTime: '2 days', resources: ['InfluxDB Python tutorial'] },
      { step: 5, title: 'Alerts', description: 'Email/SMS alerts when sensor readings exceed thresholds', estimatedTime: '2 days', resources: ['Twilio SMS API', 'SendGrid'] },
      { step: 6, title: 'Dashboard', description: 'Grafana + custom React dashboard for real-time visualization', estimatedTime: '4 days', resources: ['Grafana docs', 'WebSocket tutorial'] },
    ],
    githubRef: 'https://github.com/example/smart-home-iot',
    apis: ['Twilio SMS API', 'SendGrid Email'],
    architecture: 'Sensors → Raspberry Pi → MQTT Broker → Node.js Backend → InfluxDB → Grafana/React Dashboard',
    folderStructure: `smart-home/
├── hardware/
│   ├── sensors.py      # Sensor reading scripts
│   └── mqtt_pub.py     # MQTT publisher
├── backend/
│   ├── server.js       # Node.js server
│   └── mqtt_sub.js     # MQTT subscriber
├── frontend/
│   └── dashboard/      # React app
├── grafana/
│   └── dashboards/
└── docker-compose.yml`,
    deploymentGuide: '1. Run MQTT broker + InfluxDB on Raspberry Pi\n2. Deploy backend to cloud VM\n3. Deploy frontend to Vercel\n4. Configure port forwarding for remote access',
    testingGuide: '1. Simulate sensor data with MQTT test client\n2. Verify data storage in InfluxDB\n3. Test alert thresholds\n4. Load test with 100 concurrent sensor streams',
  },
  {
    id: 'proj-005',
    title: 'Blockchain-Based Certificate Verification System',
    category: 'blockchain',
    difficulty: 'Advanced',
    estimatedTime: '4-5 weeks',
    requiredSkills: ['Solidity', 'Ethereum', 'React', 'Node.js', 'Web3.js'],
    technologies: ['Solidity', 'Ethereum', 'Hardhat', 'React', 'Web3.js', 'IPFS', 'MetaMask'],
    learningOutcomes: [
      'Solidity smart contract development',
      'Ethereum blockchain fundamentals',
      'Decentralized storage with IPFS',
      'Web3 frontend integration',
      'Gas optimization techniques',
    ],
    description: 'A tamper-proof certificate issuance and verification system on Ethereum. Universities issue certificates as NFTs, employers verify instantly without contacting institutions.',
    industryRelevance: 'Blockchain in EdTech is growing rapidly. Companies like NPTEL, Coursera, and government initiatives are exploring blockchain credentials.',
    careerPaths: ['Blockchain Developer', 'Web Development', 'Software Engineering'],
    roadmap: [
      { step: 1, title: 'Blockchain Basics', description: 'Learn Ethereum, Solidity, and smart contract fundamentals', estimatedTime: '3 days', resources: ['Ethereum docs', 'CryptoZombies tutorial'] },
      { step: 2, title: 'Smart Contract', description: 'Write and test CertificateNFT.sol with Hardhat', estimatedTime: '5 days', resources: ['Hardhat docs', 'OpenZeppelin contracts'] },
      { step: 3, title: 'IPFS Storage', description: 'Store certificate PDFs on IPFS, get content hash', estimatedTime: '2 days', resources: ['IPFS docs', 'Pinata tutorial'] },
      { step: 4, title: 'Deploy Contract', description: 'Deploy to Goerli testnet, verify on Etherscan', estimatedTime: '1 day', resources: ['Hardhat deploy guide'] },
      { step: 5, title: 'Admin Portal', description: 'React app for institutions to issue certificates', estimatedTime: '4 days', resources: ['Web3.js tutorial', 'ethers.js guide'] },
      { step: 6, title: 'Verification Portal', description: 'Public portal for anyone to verify certificate by ID', estimatedTime: '3 days', resources: ['React Router docs'] },
    ],
    githubRef: 'https://github.com/example/blockchain-certificates',
    apis: ['Alchemy (Ethereum node)', 'Pinata (IPFS pinning)', 'MetaMask wallet'],
    architecture: 'React DApp ↔ MetaMask ↔ Ethereum Smart Contract ↔ IPFS (certificate files)',
    folderStructure: `blockchain-certs/
├── contracts/
│   └── CertificateNFT.sol
├── scripts/
│   └── deploy.js
├── test/
│   └── certificate.test.js
├── frontend/
│   ├── src/
│   └── package.json
├── hardhat.config.js
└── .env.example`,
    deploymentGuide: '1. Deploy smart contract to Polygon mainnet\n2. Host frontend on Vercel\n3. Configure MetaMask for Polygon network\n4. Set Alchemy API key as env variable',
    testingGuide: '1. Unit test all smart contract functions\n2. Test with Hardhat local network\n3. Integration test on Goerli testnet\n4. Security audit with Slither',
  },
  {
    id: 'proj-006',
    title: 'DevOps CI/CD Pipeline with Kubernetes',
    category: 'devops',
    difficulty: 'Advanced',
    estimatedTime: '3-4 weeks',
    requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'Jenkins/GitHub Actions', 'Terraform'],
    technologies: ['Docker', 'Kubernetes', 'Helm', 'Jenkins', 'GitHub Actions', 'Terraform', 'AWS EKS', 'Prometheus', 'Grafana'],
    learningOutcomes: [
      'Container orchestration with Kubernetes',
      'CI/CD pipeline automation',
      'Infrastructure as Code with Terraform',
      'Monitoring and observability',
      'Zero-downtime deployments',
    ],
    description: 'Build a production-grade CI/CD pipeline that auto-deploys a microservices app to Kubernetes on AWS. Includes blue-green deployments, auto-scaling, and monitoring.',
    industryRelevance: 'DevOps is among the highest-paying IT specializations. Every major company needs DevOps engineers.',
    careerPaths: ['DevOps', 'Cloud & DevOps', 'Software Engineering'],
    roadmap: [
      { step: 1, title: 'Docker Setup', description: 'Dockerize a sample microservices application', estimatedTime: '2 days', resources: ['Docker docs', 'Multi-stage builds tutorial'] },
      { step: 2, title: 'Kubernetes Cluster', description: 'Setup AWS EKS cluster with Terraform', estimatedTime: '3 days', resources: ['Terraform AWS EKS module', 'kubectl tutorial'] },
      { step: 3, title: 'Helm Charts', description: 'Create Helm charts for each microservice', estimatedTime: '2 days', resources: ['Helm docs', 'Helm best practices'] },
      { step: 4, title: 'CI/CD Pipeline', description: 'GitHub Actions workflow: test → build → push → deploy', estimatedTime: '4 days', resources: ['GitHub Actions docs', 'Jenkins pipeline guide'] },
      { step: 5, title: 'Monitoring', description: 'Prometheus metrics + Grafana dashboards + alerting', estimatedTime: '3 days', resources: ['Prometheus docs', 'Grafana k8s dashboard'] },
      { step: 6, title: 'Auto-scaling', description: 'HPA, VPA, and Cluster Autoscaler configuration', estimatedTime: '2 days', resources: ['Kubernetes HPA docs'] },
    ],
    githubRef: 'https://github.com/example/k8s-cicd-pipeline',
    apis: ['AWS APIs', 'DockerHub', 'GitHub API'],
    architecture: 'GitHub → Actions CI → Docker Build → ECR → EKS Cluster → Services → ALB → Prometheus/Grafana',
    folderStructure: `cicd-pipeline/
├── app/
│   ├── service-a/
│   └── service-b/
├── k8s/
│   ├── deployments/
│   ├── services/
│   └── ingress/
├── helm/
│   └── charts/
├── terraform/
│   └── eks/
├── .github/
│   └── workflows/
│       └── deploy.yml
└── monitoring/
    ├── prometheus/
    └── grafana/`,
    deploymentGuide: '1. terraform init && terraform apply (creates EKS)\n2. Push code → GitHub Actions auto-deploys\n3. helm install for initial setup\n4. Configure Ingress with SSL cert\n5. Setup Prometheus scrape config',
    testingGuide: '1. Test pipeline with pull request\n2. Verify zero-downtime with rolling update\n3. Load test with k6 to trigger HPA\n4. Chaos engineering with Chaos Monkey',
  },
  {
    id: 'proj-007',
    title: 'Android Health & Fitness Tracker App',
    category: 'android',
    difficulty: 'Intermediate',
    estimatedTime: '3-4 weeks',
    requiredSkills: ['Kotlin', 'Android Studio', 'SQLite/Room', 'Jetpack Compose'],
    technologies: ['Kotlin', 'Jetpack Compose', 'Room Database', 'Retrofit', 'Google Fit API', 'Firebase', 'MPAndroidChart'],
    learningOutcomes: [
      'Jetpack Compose modern UI',
      'Local database with Room',
      'Background services and WorkManager',
      'Google Fit API integration',
      'Firebase analytics and crash reporting',
    ],
    description: 'A beautiful Android fitness app tracking steps, workouts, calories, sleep, and water intake with personalized weekly goals and progress charts.',
    industryRelevance: 'Health & fitness apps are a $15B+ market. Companies like HealthifyMe, Fitbit, and startups constantly hire Android developers.',
    careerPaths: ['Android Developer', 'Mobile Development', 'Software Engineering'],
    roadmap: [
      { step: 1, title: 'Project Setup', description: 'Android Studio project with Jetpack Compose and Navigation', estimatedTime: '1 day', resources: ['Android docs', 'Compose tutorial'] },
      { step: 2, title: 'Database Layer', description: 'Room database for workouts, meals, and sleep data', estimatedTime: '3 days', resources: ['Room docs', 'MVVM tutorial'] },
      { step: 3, title: 'Core Features', description: 'Step counter, workout log, calorie calculator', estimatedTime: '5 days', resources: ['Google Fit API', 'Sensor API docs'] },
      { step: 4, title: 'Charts & Analytics', description: 'Weekly progress charts with MPAndroidChart', estimatedTime: '3 days', resources: ['MPAndroidChart docs'] },
      { step: 5, title: 'Notifications', description: 'Daily reminders, goal alerts with WorkManager', estimatedTime: '2 days', resources: ['WorkManager docs', 'Notification channels'] },
      { step: 6, title: 'Firebase', description: 'Auth, Firestore sync, and Crashlytics', estimatedTime: '3 days', resources: ['Firebase Android docs'] },
    ],
    githubRef: 'https://github.com/example/android-fitness-app',
    apis: ['Google Fit API', 'Firebase', 'Nutritionix API (food data)'],
    architecture: 'Compose UI → ViewModel → Repository → Room DB + Firebase + REST APIs',
    folderStructure: `FitnessApp/
├── app/src/main/
│   ├── data/
│   │   ├── local/      # Room DB
│   │   └── remote/     # Retrofit APIs
│   ├── domain/
│   │   └── usecases/
│   ├── presentation/
│   │   ├── screens/
│   │   └── viewmodels/
│   └── di/             # Hilt DI
├── build.gradle
└── google-services.json`,
    deploymentGuide: '1. Generate signed APK in Android Studio\n2. Create Play Store account ($25 one-time)\n3. Upload APK to Play Console\n4. Fill store listing: screenshots, description\n5. Submit for review (1-3 days)',
    testingGuide: '1. Unit tests for ViewModels with JUnit\n2. UI tests with Espresso\n3. Integration tests with Room in-memory DB\n4. Test on multiple screen sizes',
  },
  {
    id: 'proj-008',
    title: 'Network Vulnerability Scanner',
    category: 'cyber-security',
    difficulty: 'Advanced',
    estimatedTime: '3-4 weeks',
    requiredSkills: ['Python', 'Networking', 'Linux', 'Socket Programming', 'Web Security'],
    technologies: ['Python', 'Scapy', 'Nmap', 'Flask', 'SQLite', 'Docker', 'React'],
    learningOutcomes: [
      'Network protocol fundamentals (TCP/IP)',
      'Port scanning techniques',
      'Vulnerability assessment methodologies',
      'Report generation and documentation',
      'Ethical hacking principles',
    ],
    description: 'Build an ethical network scanner that discovers hosts, scans ports, identifies services, and checks for common CVEs. Generates professional security assessment reports.',
    industryRelevance: 'Cybersecurity is among the fastest growing careers. CISA, DRDO, major banks, and all large enterprises need security professionals.',
    careerPaths: ['Cyber Security', 'Network Security', 'Software Engineering'],
    roadmap: [
      { step: 1, title: 'Networking Fundamentals', description: 'TCP/IP, ports, protocols, OSI model review', estimatedTime: '2 days', resources: ['Networking fundamentals course'] },
      { step: 2, title: 'Host Discovery', description: 'ARP scan, ICMP ping sweep with Scapy', estimatedTime: '2 days', resources: ['Scapy docs', 'Python socket tutorial'] },
      { step: 3, title: 'Port Scanner', description: 'TCP/UDP port scanner with banner grabbing', estimatedTime: '3 days', resources: ['Nmap scripting tutorial'] },
      { step: 4, title: 'Vulnerability Check', description: 'CVE database lookup for identified services', estimatedTime: '4 days', resources: ['NVD API docs', 'CVE database tutorial'] },
      { step: 5, title: 'Report Generator', description: 'HTML/PDF security assessment reports', estimatedTime: '2 days', resources: ['ReportLab docs', 'Jinja2 template'] },
      { step: 6, title: 'Web Dashboard', description: 'Flask + React UI for running scans and viewing reports', estimatedTime: '4 days', resources: ['Flask docs', 'React tutorial'] },
    ],
    githubRef: 'https://github.com/example/vuln-scanner',
    apis: ['NVD API (CVE database)', 'Shodan API'],
    architecture: 'React Dashboard → Flask API → Scan Engine (Scapy/Nmap) → SQLite → Report Generator',
    folderStructure: `vuln-scanner/
├── scanner/
│   ├── host_discovery.py
│   ├── port_scanner.py
│   └── vuln_checker.py
├── api/
│   └── server.py
├── reports/
│   └── generator.py
├── frontend/
│   └── src/
└── requirements.txt`,
    deploymentGuide: '1. Run in Docker container (privileged for raw sockets)\n2. Deploy on local network or VPN\n3. NEVER scan networks without permission\n4. Use for authorized testing only',
    testingGuide: '1. Test on your own home network\n2. Use intentionally vulnerable VM (DVWA, Metasploitable)\n3. Verify CVE matching accuracy\n4. Test report generation with sample data',
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
}

export function getRecommendedProjects(
  careerGoal: string,
  completedSkills: string[],
  difficulty?: ProjectDifficulty
): Project[] {
  const goalMap: Record<string, string[]> = {
    'Data Science': ['data-science', 'ai-ml', 'python'],
    'AI Engineer': ['ai-ml', 'python', 'data-science'],
    'Web Development': ['web-development', 'fullstack'],
    'Full Stack': ['fullstack', 'web-development'],
    'Cyber Security': ['cyber-security'],
    'Cloud & DevOps': ['cloud', 'devops'],
    'Android Developer': ['android'],
    'Blockchain Developer': ['blockchain'],
    'IoT Engineer': ['iot'],
    'Software Engineering': ['fullstack', 'web-development', 'python'],
  };

  const targetCategories = goalMap[careerGoal] || ['fullstack', 'ai-ml'];

  return projects
    .filter((p) =>
      targetCategories.includes(p.category) &&
      (difficulty ? p.difficulty === difficulty : true)
    )
    .slice(0, 6);
}
