export const profile = {
  name: 'Pardha Saradhi Alapati',
  title: 'AI & Machine Learning Engineer | Full-Stack Developer',
  tagline: 'Building intelligent systems that turn real-world data into real-world impact',
  location: 'Open to India / Remote',
  // status: 'Recent graduate, actively seeking full-time roles in AI/ML and Computer Vision',
  bio: `AI & ML graduate (B.Tech, 2026) with 2 shipped real-world computer vision projects and a 3-month AI internship at Infosys Springboard. I specialize in building high-accuracy computer vision systems — my work has achieved 87% model accuracy on 1,000+ real-world images and improved traffic flow efficiency by 25%. I'll be continuing my studies with an M.Tech in Computer Science and Engineering at KL University, Vaddeswaram, while pushing the boundaries of AI/ML to solve tangible problems.`,
  email: 'pardhasaradhi.0515@gmail.com',
  phone: '+91 7382692747',
  linkedin: 'https://linkedin.com/in/pardha-saradhi-alapati',
  github: 'https://github.com/Saradhi0515',
  resumeHref: '/Pardha_Saradhi_Alapati_Resume.pdf', // NOTE: drop your resume PDF into /public as resume.pdf
  // NOTE: drop your profile photo into /public as profile.jpg (or update this
  // path if you use a different filename/extension).
  profileImage: '/hero.jpg',
  aboutImage: '/profile.jpg',
};

export const stats = [
  { label: 'Model Accuracy', value: '87%', suffix: '' },
  { label: 'Images Processed', value: '1,000', suffix: '+' },
  { label: 'Traffic Efficiency Gain', value: '25', suffix: '%' },
  { label: 'Shipped Projects', value: '2', suffix: '' },
];

export const skillGroups = [
  {
    category: 'Programming Languages',
    skills: ['Python', 'Java', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    category: 'AI / ML',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'YOLOv8 (Ultralytics)',
      'OpenCV',
      'Hugging Face',
      'NLP',
      'LLMs',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'TensorFlow',
      'PyTorch',
      'Keras',
      'OCR',
    ],
  },
  {
    category: 'AI Tools',
    skills: ['GitHub Copilot', 'ChatGPT Codex', 'Claude Code', 'n8n Automation', 'Ollama', 'Cursor'],
  },
  {
    category: 'Tools & Practices',
    skills: ['Git', 'GitHub', 'Jupyter Notebook', 'VS Code', 'SDLC', 'OOP', 'Agile Methodologies'],
  },
];

export const projects = [
  {
    id: 'traffic-system',
    title: 'Intelligent Traffic System for Urban Conditions',
    period: 'Nov 2025 – Apr 2026',
    description:
      'Real-time multi-stream vehicle detection and tracking, accident recognition, emergency vehicle prioritization, and dynamic signal control using YOLOv8 and OpenCV. Integrated Hugging Face models for enhanced detection accuracy, built with a full SDLC workflow.',
    tech: ['YOLOv8', 'OpenCV', 'Hugging Face', 'Python', 'JavaScript'],
    links: [
      { label: 'Frontend Repo', href: 'https://github.com/Saradhi0515/Intelligent-Traffic-System-Frontend' },
      { label: 'Backend Repo', href: 'https://github.com/Saradhi0515/Intelligent-Traffic-System-Backend' },
    ],
    demoHref: 'https://saradhi0515.github.io/Intelligent-Traffic-System-Frontend/', // placeholder - no live demo yet
    badge: 'MIT Licensed',
  },
  {
    id: 'anpr-atcc',
    title: 'ANPR & ATCC Smart Traffic Management System',
    period: 'Infosys Springboard Internship · Oct–Dec 2024',
    description:
      'Automatic Number Plate Recognition and Automatic Traffic Classification & Control using Python, OpenCV, and YOLO-based object detection. Processed 1,000+ real-world images/video frames at 87% model accuracy, improving traffic flow efficiency by 25% via data-driven signal control and anomaly detection. Full pipeline from detection through data interpolation to annotated video visualization.',
    tech: ['Python', 'OpenCV', 'YOLO', 'Computer Vision'],
    links: [
      { label: 'View Code', href: 'https://github.com/Saradhi0515/ANPR_And_ATCC_For_Smart_Traffic_Management_System' },
    ],
    demoHref: null,
    badge: 'MIT Licensed',
  },
  {
    id: 'weather-dashboard',
    title: 'Dynamic Weather Dashboard',
    period: 'Personal Project',
    description:
      'A JavaScript-based responsive weather dashboard with live data, built for a clean, fast, at-a-glance experience across devices.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    links: [{ label: 'View Code', href: 'https://github.com/Saradhi0515/Dynamic_Weather_Dashboard' }],
    demoHref: null,
  },
  {
    id: 'shift-board',
    title: 'Employee Shift Board',
    period: 'Personal Project',
    description:
      'A TypeScript application for managing and scheduling employee shifts, focused on clarity and ease of use for day-to-day scheduling.',
    tech: ['TypeScript'],
    links: [{ label: 'View Code', href: 'https://github.com/Saradhi0515/Employee-Shift-Board' }],
    demoHref: null,
  },
];

// Unified Experience & Certifications timeline, in reverse-chronological order.
// `type` drives the visual treatment (role vs. certification milestone).
export const timeline = [
  {
    id: 'infosys-internship',
    type: 'role',
    title: 'AI Intern',
    org: 'Infosys Springboard',
    period: 'Oct 2024 – Dec 2024',
    location: 'Remote',
    points: [
      'Built the ANPR & ATCC Smart Traffic Management System using Python and OpenCV, processing 1,000+ real-world images at 87% model accuracy.',
      'Improved traffic flow efficiency by 25% through data-driven signal control logic and anomaly detection modules.',
      'Owned end-to-end data preprocessing, feature engineering, pipeline prep, model training, evaluation, testing, and cross-team documentation following SDLC and Git workflows.',
    ],
  },
  {
    id: 'cert-azure',
    type: 'certification',
    title: 'Microsoft Azure AI Essentials Professional Certificate',
    org: 'Microsoft & LinkedIn',
    period: '2024',
  },
  {
    id: 'cert-oracle',
    type: 'certification',
    title: 'Oracle AI Vector Search Professional',
    org: 'Oracle · 1Z0-184-25',
    period: '2024',
  },
  {
    id: 'cert-zscaler',
    type: 'certification',
    title: 'Fundamentals of Cybersecurity',
    org: 'Zscaler · EDU-102',
    period: '2024',
  },
];

// Reverse-chronological education history. M.Tech is upcoming (not yet
// started), so it's listed first with status 'Upcoming'.
export const educationHistory = [
  {
    id: 'mtech',
    degree: 'M.Tech, Computer Science and Engineering',
    school: 'KL University, Vaddeswaram',
    period: 'Upcoming',
    status: 'Upcoming',
  },
  {
    id: 'btech',
    degree: 'B.Tech, Artificial Intelligence and Machine Learning',
    school: 'DVR & Dr. HS MIC College of Technology, Kanchikacherla',
    period: '2022 – 2026',
    cgpa: 'CGPA 8.04 / 10',
    status: 'Graduated',
    coursework: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'OOP (Java & Python)', 'Software Engineering'],
  },
  {
    id: 'intermediate',
    degree: 'Intermediate (MPC)',
    school: 'Sri Sarada Junior College, Vijayawada',
    period: '2020 – 2022',
    cgpa: 'CGPA 7.61 / 10',
    board: 'Board of Intermediate Education, Andhra Pradesh',
    status: 'Completed',
    coursework: ['Mathematics', 'Physics', 'Chemistry', 'English'],
  },
  {
    id: 'tenth',
    degree: '10th Class (SSC)',
    school: 'Sri K V H School, Vijayawada',
    period: '2020',
    cgpa: 'CGPA 9.0 / 10',
    board: 'Board of Secondary School Education, Andhra Pradesh',
    status: 'Completed',
    coursework: ['Mathematics', 'Science', 'Social Studies', 'English'],
  },
];

// Kept for backward compatibility with any code still expecting a single
// `education` object — points at the B.Tech entry (the highlighted degree
// on the mountain-road marker).
export const education = educationHistory.find((e) => e.id === 'btech');

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
