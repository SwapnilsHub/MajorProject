// lib/translations.ts
// Multilingual support system with priority order: English, Kannada, Marathi, Hindi, Telugu, Tamil

export type LanguageCode = 'en' | 'kn' | 'mr' | 'hi' | 'te' | 'ta';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];

export interface TranslationDictionary {
  nav: {
    home: string;
    projects: string;
    domains: string;
    courses: string;
    edumart: string;
    resume: string;
    profile: string;
    login: string;
    join: string;
  };
  chatbot: {
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    send: string;
    quickPrompts: string[];
    responses: Record<string, string>;
    fallback: string;
  };
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  // 1. ENGLISH (Primary Priority)
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      domains: 'Domains',
      courses: 'Courses',
      edumart: 'EduMart',
      resume: 'Resume',
      profile: 'Student Profile',
      login: 'Login',
      join: 'Join EduGram',
    },
    chatbot: {
      title: 'EduGram Assistant',
      subtitle: 'Online — Learn. Share. Grow.',
      greeting: 'Hi! I am your EduGram Learning Assistant. How can I help you today?',
      placeholder: 'Ask about domains, quizzes, colleges...',
      send: 'Send',
      quickPrompts: ['Domain Quizzes', 'EduMart Marketplace', 'Career Roadmaps', 'Project Guides'],
      responses: {
        edumart: 'EduMart is EduGram’s marketplace for second-hand textbooks, scientific calculators, lab equipment, and electronics! Visit EduMart to buy or sell.',
        quiz: 'EduGram has domain-specific quizzes in AI, Data Science, Web Dev, Cyber Security, etc. Each attempt gives 5 randomized questions!',
        learn: 'Check out EduGram Learn for video lectures and structured tutorials on key tech topics!',
        project: 'Explore EduGram Projects to view step-by-step roadmaps, code architecture, and GitHub references for hands-on building.',
        career: 'Explore the Domains section for detailed roadmaps, salary insights, required skills, and domain quizzes!',
        domain: 'Explore the Domains section for detailed roadmaps, salary insights, required skills, and domain quizzes!',
        college: 'Filter top government and private colleges by state, fees, rankings, and courses in the Colleges section.',
        hello: 'Hello! I am your EduGram Assistant. Ask me about video courses, domain quizzes, project roadmaps, careers, or EduMart!',
        hi: 'Hi there! How can I help your career learning journey today on EduGram?',
      },
      fallback: "I'm here to help you on EduGram! You can ask me about learning videos, domain quizzes, project roadmaps, careers, colleges, or buying and selling on EduMart.",
    },
  },

  // 2. KANNADA (ಕನ್ನಡ)
  kn: {
    nav: {
      home: 'ಮುಖಪುಟ',
      projects: 'ಯೋಜನೆಗಳು',
      domains: 'ಡೊಮೇನ್‌ಗಳು',
      courses: 'ಕೋರ್ಸ್‌ಗಳು',
      edumart: 'ಎಡುಮಾರ್ಟ್',
      resume: 'ರೆಸ್ಯೂಮೆ',
      profile: 'ವಿದ್ಯಾರ್ಥಿ ಪ್ರೊಫೈಲ್',
      login: 'ಲಾಗಿನ್',
      join: 'ಎಡುಗ್ರಾಂ ಸೇರಿ',
    },
    chatbot: {
      title: 'ಎಡುಗ್ರಾಂ ಸಹಾಯಕ',
      subtitle: 'ಆನ್‌ಲೈನ್ — ಕಲಿಯಿರಿ. ಹಂಚಿಕೊಳ್ಳಿ. ಬೆಳೆಯಿರಿ.',
      greeting: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಎಡುಗ್ರಾಂ (EduGram) ಸಹಾಯಕ. ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
      placeholder: 'ವೃತ್ತಿಮಾರ್ಗಗಳು, ರಸಪ್ರಶ್ನೆಗಳು, ಕಾಲೇಜುಗಳ ಬಗ್ಗೆ ಕೇಳಿ...',
      send: 'ಕಳುಹಿಸಿ',
      quickPrompts: ['ಡೊಮೇನ್ ರಸಪ್ರಶ್ನೆಗಳು', 'ಎಡುಮಾರ್ಟ್ ಮಾರುಕಟ್ಟೆ', 'ಕೆರಿಯರ್ ರೋಡ್‌ಮ್ಯಾಪ್', 'ಯೋಜನಾ ಮಾರ್ಗದರ್ಶಿ'],
      responses: {
        edumart: 'EduMart ಎಡುಗ್ರಾಂನ ಮರುಬಳಕೆಯ ಪಠ್ಯಪುಸ್ತಕಗಳು, ಸೈಂಟಿಫಿಕ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗಳು ಮತ್ತು ಲ್ಯಾಬ್ ಉಪಕರಣಗಳ ಮಾರುಕಟ್ಟೆಯಾಗಿದೆ! ಖರೀದಿಸಲು ಅಥವಾ ಮಾರಾಟ ಮಾಡಲು ಎಡುಮಾರ್ಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.',
        quiz: 'EduGram ನಲ್ಲಿ AI, ಡೇಟಾ ಸೈನ್ಸ್, ವೆಬ್ ಡೆವಲಪ್‌ಮೆಂಟ್ ಮತ್ತು ಸೈಬರ್ ಸೆಕ್ಯುರಿಟಿ ವಿಭಾಗಗಳ ಪ್ರತ್ಯೇಕ 5 ಪ್ರಶ್ನೆಗಳ ರಸಪ್ರಶ್ನೆಗಳಿವೆ!',
        learn: 'ವೀಡಿಯೊ ಉಪನ್ಯಾಸಗಳು ಮತ್ತು 60 ಸೆಕೆಂಡುಗಳ ಕಲಿಕೆಯ ರೀಲ್‌ಗಳಿಗಾಗಿ EduGram Learn ಪರಿಶೀಲಿಸಿ!',
        project: 'ಹಂತ-ಹಂತದ ರೋಡ್‌ಮ್ಯಾಪ್‌ಗಳು ಮತ್ತು ಗಿಟ್‌ಹಬ್ ಉಲ್ಲೇಖಗಳನ್ನು ವೀಕ್ಷಿಸಲು EduGram Projects ಪರಿಶೀಲಿಸಿ!',
        career: 'ವಿವರವಾದ ರೋಡ್‌ಮ್ಯಾಪ್‌ಗಳು, ವೇತನದ ವಿವರಗಳು ಮತ್ತು ಕೌಶಲ್ಯಗಳಿಗಾಗಿ Domains ವಿಭಾಗವನ್ನು ಅನ್ವೇಷಿಸಿ!',
        domain: 'ವಿವರವಾದ ರೋಡ್‌ಮ್ಯಾಪ್‌ಗಳು, ವೇತನದ ವಿವರಗಳು ಮತ್ತು ಕೌಶಲ್ಯಗಳಿಗಾಗಿ Domains ವಿಭಾಗವನ್ನು ಅನ್ವೇಷಿಸಿ!',
        college: 'ರಾಜ್ಯ, ಶುಲ್ಕ ಮತ್ತು ಶ್ರೇಯಾಂಕಗಳ ಮೂಲಕ ಉನ್ನತ ಸರ್ಕಾರಿ ಮತ್ತು ಖಾಸಗಿ ಕಾಲೇಜುಗಳನ್ನು ಹುಡುಕಿ.',
        hello: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಎಡುಗ್ರಾಂ ಸಹಾಯಕ. ಕಲಿಕೆಯ ವೀಡಿಯೊಗಳು, ರಸಪ್ರಶ್ನೆಗಳು, ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು ಅಥವಾ EduMart ಬಗ್ಗೆ ಕೇಳಿ!',
        hi: 'ನಮಸ್ತೆ! ಇಂದು ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಪ್ರಯಾಣಕ್ಕೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
      },
      fallback: 'ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ! ಕಲಿಕೆಯ ವೀಡಿಯೊಗಳು, ಡೊಮೇನ್ ರಸಪ್ರಶ್ನೆಗಳು, ಯೋಜನಾ ರೋಡ್‌ಮ್ಯಾಪ್‌ಗಳು ಅಥವಾ EduMart ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ.',
    },
  },

  // 3. MARATHI (मराठी)
  mr: {
    nav: {
      home: 'मुख्यपृष्ठ',
      projects: 'प्रकल्प (Projects)',
      domains: 'डोमेन्स (Domains)',
      courses: 'कोर्सेस',
      edumart: 'एड्युमार्ट (EduMart)',
      resume: 'बायोडेटा (Resume)',
      profile: 'विद्यार्थी प्रोफाईल',
      login: 'लॉगिन',
      join: 'EduGram मध्ये सामील व्हा',
    },
    chatbot: {
      title: 'EduGram सहाय्यक',
      subtitle: 'ऑनलाइन — शिका. शेअर करा. वाढा.',
      greeting: 'नमस्कार! मी तुमचा EduGram सहाय्यक आहे. आज मी तुम्हाला कशी मदत करू शकतो?',
      placeholder: 'करिअर, क्विझ, महाविद्यालयांबद्दल विचारा...',
      send: 'पाठवा',
      quickPrompts: ['डोमेन क्विझ', 'EduMart मार्केटप्लेस', 'करिअर रोडमॅप', 'प्रोजेक्ट मार्गदर्शक'],
      responses: {
        edumart: 'EduMart हे जुनी पुस्तके, सायंटिफिक कॅल्क्युलेटर आणि प्रयोगशाळा उपकरणांसाठी EduGram चे मार्केटप्लेस आहे! खरेदी किंवा विक्रीसाठी EduMart ला भेट द्या.',
        quiz: 'EduGram मध्ये AI, डेटा सायन्स, वेब डेव्हलपमेंट आणि सायबर सुरक्षा या क्षेत्रातील 5 प्रश्नांच्या विशेष क्विझ आहेत!',
        learn: 'व्हिडिओ व्याख्याने आणि 60 सेकंदांच्या शॉर्ट लर्निंग रील्ससाठी EduGram Learn पहा!',
        project: 'स्टेप-बाय-स्टेप रोडमॅप्स आणि GitHub संदर्भांसाठी EduGram Projects ला भेट द्या!',
        career: 'विस्तृत रोडमॅप, पगाराची माहिती आणि आवश्यक कौशल्यांसाठी Domains विभागाचा शोध घ्या!',
        domain: 'विस्तृत रोडमॅप, पगाराची माहिती आणि आवश्यक कौशल्यांसाठी Domains विभागाचा शोध घ्या!',
        college: 'राज्य, फी आणि रँकिंगनुसार अव्वल सरकारी आणि खाजगी महाविद्यालये शोधा.',
        hello: 'नमस्कार! मी तुमचा EduGram सहाय्यक आहे. लर्निंग व्हिडिओ, क्विझ, प्रोजेक्ट्स किंवा EduMart बद्दल विचारा!',
        hi: 'नमस्कार! आज मी तुमच्या शैक्षणिक प्रवासात कशी मदत करू शकतो?',
      },
      fallback: 'मी तुम्हाला मदत करण्यासाठी येथे आहे! लर्निंग व्हिडिओ, डोमेन क्विझ, प्रोजेक्ट रोडमॅप्स किंवा EduMart बद्दल विचारा.',
    },
  },

  // 4. HINDI (हिंदी)
  hi: {
    nav: {
      home: 'होम',
      projects: 'प्रोजेक्ट्स',
      domains: 'डोमेन्स',
      courses: 'कोर्सेस',
      edumart: 'एड्यूमार्ट',
      resume: 'रिज़्यूमे',
      profile: 'स्टूडेंट प्रोफाइल',
      login: 'लॉगिन',
      join: 'EduGram से जुड़ें',
    },
    chatbot: {
      title: 'EduGram असिस्टेंट',
      subtitle: 'ऑनलाइन — सीखें। साझा करें। बढ़ें।',
      greeting: 'नमस्ते! मैं आपका EduGram असिस्टेंट हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?',
      placeholder: 'करियर, क्विज़, कॉलेज के बारे में पूछें...',
      send: 'भेजें',
      quickPrompts: ['डोमेन क्विज़', 'EduMart मार्केटप्लेस', 'करियर रोडमैप', 'प्रोजेक्ट गाइड'],
      responses: {
        edumart: 'EduMart सेकंड-हैंड किताबों, साइंटिफिक कैलकुलेटर और लैब उपकरणों के लिए EduGram का मार्केटप्लेस है! खरीदने या बेचने के लिए EduMart पर जाएं।',
        quiz: 'EduGram में AI, डेटा साइंस, वेब डेवलपमेंट और साइबर सुरक्षा के लिए 5 प्रश्नों की विशेष क्विज़ उपलब्ध हैं!',
        learn: 'वीडियो लेक्चर्स और 60-सेकंड की लर्निंग रील्स के लिए EduGram Learn देखें!',
        project: 'स्टेप-बाय-स्टेप रोडमैप और GitHub रेफरेंस के लिए EduGram Projects देखें!',
        career: 'विस्तृत रोडमैप, सैलरी और आवश्यक स्किल्स के लिए Domains सेक्शन एक्सप्लोर करें!',
        domain: 'विस्तृत रोडमैप, सैलरी और आवश्यक स्किल्स के लिए Domains सेक्शन एक्सप्लोर करें!',
        college: 'राज्य, फीस और रैंकिंग के अनुसार शीर्ष सरकारी और प्राइवेट कॉलेजों की सूची देखें।',
        hello: 'नमस्ते! मैं आपका EduGram असिस्टेंट हूँ। आप मुझसे लर्निंग रील्स, क्विज़, प्रोजेक्ट्स या EduMart के बारे में पूछ सकते हैं।',
        hi: 'नमस्ते! आज मैं आपकी लर्निंग यात्रा में कैसे मदद कर सकता हूँ?',
      },
      fallback: 'मैं EduGram पर आपकी मदद के लिए यहाँ हूँ! आप मुझसे लर्निंग रील्स, क्विज़, प्रोजेक्ट्स, करियर या EduMart के बारे में पूछ सकते हैं।',
    },
  },

  // 5. TELUGU (తెలుగు)
  te: {
    nav: {
      home: 'హోమ్',
      projects: 'ప్రాజెక్ట్‌లు',
      domains: 'డొమైన్‌లు',
      courses: 'కోర్సులు',
      edumart: 'ఎడుమార్ట్',
      resume: 'రెజ్యూమ్',
      profile: 'స్టూడెంట్ ప్రొఫైల్',
      login: 'లాగిన్',
      join: 'EduGram లో చేరండి',
    },
    chatbot: {
      title: 'EduGram అసిస్టెంట్',
      subtitle: 'ఆన్‌లైన్ — నేర్చుకోండి. పంచుకోండి. ఎదగండి.',
      greeting: 'నమస్కారం! నేను మీ EduGram అసిస్టెంట్‌ని. ఈరోజు మీకు ఎలా సహాయపడగలను?',
      placeholder: 'కెరీర్లు, క్విజ్‌లు, కళాశాలల గురించి అడగండి...',
      send: 'పంపండి',
      quickPrompts: ['డొమైన్ క్విజ్‌లు', 'EduMart మార్కెట్‌ప్లేస్', 'కెరీర్ రోడ్‌మ్యాప్', 'ప్రాజెక్ట్ గైడ్'],
      responses: {
        edumart: 'EduMart అనేది సెకండ్ హ్యాండ్ పుస్తకాలు, సైంటిఫిక్ క్యాలిక్యులేటర్లు మరియు ల్యాబ్ పరికరాల కోసం EduGram మార్కెట్‌ప్లేస్! కొనడానికి లేదా అమ్మడానికి EduMart ని సందర్శించండి.',
        quiz: 'EduGram లో AI, డేటా సైన్స్, వెబ్ డెవలప్‌మెంట్ మరియు సైబర్ సెక్యూరిటీ కోసం ప్రత్యేక 5 ప్రశ్నల క్విజ్‌లు ఉన్నాయి!',
        learn: 'వీడియో ఉపన్యాసాలు మరియు 60-సెకన్ల లెర్నింగ్ రీల్స్ కోసం EduGram Learn చూడండి!',
        project: 'స్టెప్-బై-స్టెప్ రోడ్‌మ్యాప్‌లు మరియు GitHub రెఫరెన్స్‌ల కోసం EduGram Projects విజిట్ చేయండి!',
        career: 'వివరమైన రోడ్‌మ్యాప్‌లు, జీతం వివరాలు మరియు స్కిల్స్ కోసం Domains విభాగాన్ని ఎక్స్‌ప్లోర్ చేయండి!',
        domain: 'వివరమైన రోడ్‌మ్యాప్‌లు, జీతం వివరాలు మరియు స్కిల్స్ కోసం Domains విభాగాన్ని ఎక్స్‌ప్లోర్ చేయండి!',
        college: 'రాష్ట్రం, ఫీజులు మరియు ర్యాంకింగ్‌ల ఆధారంగా అగ్ర ప్రభుత్వ మరియు ప్రైవేట్ కళాశాలలను శోధించండి.',
        hello: 'నమస్కారం! నేను మీ EduGram అసిస్టెంట్‌ని. లెర్నింగ్ రీల్స్, క్విజ్‌లు, ప్రాజెక్ట్‌లు లేదా EduMart గురించి అడగండి!',
        hi: 'నమస్తే! ఈరోజు మీ విద్యా ప్రయాణానికి నేను ఎలా సహాయపడగలను?',
      },
      fallback: 'నేను మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాను! లెర్నింగ్ రీల్స్, డొమైన్ క్విజ్‌లు, ప్రాజెక్ట్‌లు లేదా EduMart గురించి నన్ను అడగండి.',
    },
  },

  // 6. TAMIL (தமிழ்)
  ta: {
    nav: {
      home: 'முகப்பு',
      projects: 'திட்டங்கள் (Projects)',
      domains: 'துறைகள் (Domains)',
      courses: 'பாடம் (Courses)',
      edumart: 'எடுமார்ட் (EduMart)',
      resume: 'தன்னவிவரக் குறிப்பு (Resume)',
      profile: 'மாணவர் விவரக்குறிப்பு',
      login: 'உள்நுழைவு',
      join: 'EduGram இல் இணையுங்கள்',
    },
    chatbot: {
      title: 'EduGram உதவி ஆளுமை',
      subtitle: 'ஆன்லைன் — கற்றல். பகிர்தல். வளர்ச்சி.',
      greeting: 'வணக்கம்! நான் உங்கள் EduGram உதவி ஆளுமை. இன்று உங்களுக்கு எவ்வாறு உதவட்டும்?',
      placeholder: 'வேலைவாய்ப்புகள், வினாடி வினா, கல்லூரிகள் பற்றி கேளுங்கள்...',
      send: 'அனுப்பு',
      quickPrompts: ['துறை வினாடி வினாக்கள்', 'EduMart சந்தை', 'வேலைவாய்ப்பு வழிகாட்டி', 'திட்ட வழிகாட்டி'],
      responses: {
        edumart: 'EduMart என்பது பழைய புத்தகங்கள், அறிவியல் கால்குலேட்டர்கள் மற்றும் ஆய்வகக் கருவிகளுக்கான EduGram சந்தையாகும்! வாங்க அல்லது விற்க EduMart ஐப் பார்வையிடவும்.',
        quiz: 'EduGram இல் AI, தரவு அறிவியல், வலை உருவாக்கம் மற்றும் சைபர் பாதுகாப்புக்கான 5 கேள்விகள் கொண்ட வினாடி வினாக்கள் உள்ளன!',
        learn: 'வீடியோ விரிவுரைகள் மற்றும் 60 வினாடி கற்றல் ரீல்களுக்கு EduGram Learn ஐப் பாருங்கள்!',
        project: 'படி-படியான வழிகாட்டல்கள் மற்றும் GitHub குறிப்புகளுக்கு EduGram Projects ஐப் பார்வையிடவும்!',
        career: 'விரிவான பாடத்திட்டங்கள், சம்பள விவரங்கள் மற்றும் திறன்களுக்கு Domains பிரிவை ஆராயுங்கள்!',
        domain: 'விரிவான பாடத்திட்டங்கள், சம்பள விவரங்கள் மற்றும் திறன்களுக்கு Domains பிரிவை ஆராயுங்கள்!',
        college: 'மாநிலம், கட்டணம் மற்றும் தரவரிசை அடிப்படையில் சிறந்த அரசு மற்றும் தனியார் கல்லூரிகளைக் கண்டறியவும்.',
        hello: 'வணக்கம்! நான் உங்கள் EduGram உதவி ஆளுமை. கற்றல் வீடியோக்கள், வினாடி வினாக்கள், திட்டங்கள் அல்லது EduMart பற்றி கேளுங்கள்!',
        hi: 'வணக்கம்! இன்று உங்கள் கற்றல் பயணத்திற்கு நான் எவ்வாறு உதவட்டும்?',
      },
      fallback: 'உங்களுக்கு உதவ நான் இங்கே இருக்கிறேன்! கற்றல் வீடியோக்கள், துறை வினாடி வினாக்கள், திட்டங்கள் அல்லது EduMart பற்றி கேளுங்கள்.',
    },
  },
};

// Helper function to match input keywords to appropriate multilingual response
export function getMultilingualBotResponse(input: string, lang: LanguageCode): string {
  const lower = input.toLowerCase();
  const dict = translations[lang]?.chatbot || translations.en.chatbot;
  const responses = dict.responses;

  for (const [key, val] of Object.entries(responses)) {
    if (lower.includes(key)) {
      return val;
    }
  }

  // Check English key fallback in selected dictionary if applicable
  if (lower.includes('edumart') || lower.includes('buy') || lower.includes('sell') || lower.includes('book')) return responses.edumart;
  if (lower.includes('quiz') || lower.includes('test') || lower.includes('question')) return responses.quiz;
  if (lower.includes('learn') || lower.includes('reel') || lower.includes('video')) return responses.learn;
  if (lower.includes('project') || lower.includes('build') || lower.includes('code')) return responses.project;
  if (lower.includes('career') || lower.includes('domain') || lower.includes('roadmap') || lower.includes('salary')) return responses.domain;
  if (lower.includes('college') || lower.includes('iit') || lower.includes('university')) return responses.college;
  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) return responses.hello;

  return dict.fallback;
}
