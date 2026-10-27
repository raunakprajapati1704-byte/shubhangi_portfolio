/* ============================================================
   👇 SHUBHANGI GUJRATI - PROFESSIONAL PORTFOLIO DATA
   ============================================================ */

const PROFILE = {
  username: "shubhangi.gujrati",
  fullName: "Shubhangi Gujrati",
  verified: true,

  // Category tag under name
  category: "Portfolio · Digital Marketing Executive",

  // Profile picture
  avatar: "./shubhangi-profile.png",

  bioLines: [
    "🚀 Digital Marketing Associate @ Digi Vidyarthi",
    "📈 SEO · Meta Ads · AI Content Creation · Web Development",
    "📍 Ramesh Nagar, New Delhi | Varanasi · 🟢 Available for Opportunities",
  ],
  website: "https://digividyarthi.com",
  email: "shubhangigujrati08@gmail.com",
  whatsapp: "https://wa.me/919569111844",
  whatsappDisplay: "+91 95691 11844",
  address: "6B-14, Opposite Mother Dairy 352, Near Handa Medical Store, Ramesh Nagar, New Delhi - 110015",
  github: "",
  telegram: "",

  stats: { followers: "1,420", following: "310" },
};

/* ------------------------------------------------------------
   STORY HIGHLIGHTS
   ------------------------------------------------------------ */
const HIGHLIGHTS = [
  {
    name: "About", emoji: "👩‍💼", bg: "linear-gradient(160deg,#4f5bd5,#962fbf)",
    slides: [
      { emoji: "👋", title: "Hello, I am Shubhangi Gujrati", text: "Energetic and results-driven Digital Marketing Professional with an entrepreneurial mindset." },
      { emoji: "🎯", title: "Professional Objective", text: "Expertise in SEO, social media marketing, AI-powered content creation, and website development. Dedicated to driving measurable online growth." },
      { emoji: "📋", title: "Personal Details", text: "DOB: May 8, 1999 | Father: Sh. Gopi Krishna Das | Nationality: Indian | Gender: Female | Blood Group: B+" },
    ],
  },
  {
    name: "Experience", emoji: "💼", bg: "linear-gradient(160deg,#0f2027,#2c5364)",
    slides: [
      { emoji: "🎓", title: "Digi Vidyarthi (2025–Present)", text: "Digital Marketing Associate — Leading end-to-end digital marketing and social media strategy for multiple client brands." },
      { emoji: "🏨", title: "Shanti Banaras (Taj Ganges)", text: "Digital Marketing Executive (Sep 2022 – Oct 2025) — Specialized in SEO, social media management, and high-converting paid campaigns." },
    ],
  },
  {
    name: "SEO & Social", emoji: "📈", bg: "linear-gradient(160deg,#d62976,#fa7e1e)",
    slides: [
      { emoji: "🔍", title: "SEO & Analytics Expertise", text: "Search Engine Optimization (Technical, Local, On-Page, Off-Page), Keyword Research, Content Strategy & Lead Generation." },
      { emoji: "📱", title: "Social Media Growth", text: "Meta Ads, Facebook Marketing, Instagram Campaigns, Content Planning & Brand Strategy." },
    ],
  },
  {
    name: "AI & Web Dev", emoji: "🤖", bg: "linear-gradient(160deg,#11998e,#38ef7d)",
    slides: [
      { emoji: "🤖", title: "AI Marketing Workflows", text: "Prompt Engineering, AI-Driven Graphic & Video Editing, SaaS Development & Marketing Automation." },
      { emoji: "💻", title: "WordPress & Web Development", text: "Elementor, Custom Landing Pages, Payment Gateway Integration & Performance Optimization." },
    ],
  },
  {
    name: "Education", emoji: "🎓", bg: "linear-gradient(160deg,#8e2de2,#4a00e0)",
    slides: [
      { emoji: "📜", title: "Digital Marketing Master Course", text: "Mastermind Gurukul — 2025" },
      { emoji: "🏫", title: "Master of Commerce (M.Com)", text: "Mahatma Gandhi Kashi Vidyapeeth, Varanasi — 2019–21" },
      { emoji: "🎓", title: "Bachelor of Commerce (B.Com)", text: "Mahatma Gandhi Kashi Vidyapeeth, Varanasi — 2017–19" },
    ],
  },
  {
    name: "Contact", emoji: "📬", bg: "linear-gradient(160deg,#962fbf,#d62976)",
    slides: [
      { emoji: "🚀", title: "Let's Connect & Scale Your Brand", text: "Email: shubhangigujrati08@gmail.com | Phone: +91 95691 11844 | Location: Ramesh Nagar, New Delhi" },
    ],
  },
];

/* ------------------------------------------------------------
   PROJECTS / PORTFOLIO SHOWCASE
   ------------------------------------------------------------ */
const PROJECTS = [
  {
    title: "Digi Vidyarthi Brands", emoji: "🚀",
    tagline: "End-to-End Digital Growth Strategy",
    desc: "Managed end-to-end digital marketing and social media strategy for client brands including mannatmakeover.in, PSAyurveda.com, EssenceOfVaranasi.com, WagaBanaras.com and DigiBanaras.com.",
    tags: ["DigitalMarketing", "DigiVidyarthi", "BrandStrategy", "MultiBrand"],
    gradient: "linear-gradient(135deg,#4f5bd5,#d62976)",
    likes: 954,
    link: "https://digividyarthi.com",
    socialLink: "https://www.instagram.com/digi.vidyarthi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    repo: "",
    comments: [
      { user: "digividyarthi.official", text: "Multi-brand growth strategy executed flawlessly! 🎯" },
      { user: "marketing.director", text: "Substantial online visibility and engagement growth 📈" },
    ],
  },
  {
    title: "PSAyurveda.com", emoji: "🌿",
    tagline: "AI Video Creation & Social Media",
    desc: "Led social media management and AI-generated video content creation for PSAyurveda.com, leveraging cutting-edge AI tools to significantly boost brand engagement.",
    tags: ["PSAyurveda", "AIVideo", "SocialMedia", "Reels"],
    gradient: "linear-gradient(135deg,#11998e,#38ef7d)",
    likes: 889,
    link: "https://PSAyurveda.com",
    socialLink: "https://www.instagram.com/psayurveda?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    video: "./ai-video-reels.mp4",
    repo: "",
    comments: [
      { user: "ayurveda.health", text: "AI generated video reels boosted our brand reach! 🎥" },
    ],
  },
  {
    title: "WagaBanaras.com", emoji: "🥻",
    tagline: "Social Media & Content Strategy",
    desc: "Handled complete social media presence, strategic content calendar planning, and audience engagement for WagaBanaras.com.",
    tags: ["WagaBanaras", "ContentPlanning", "SocialMedia", "BrandBuilding"],
    gradient: "linear-gradient(135deg,#d62976,#fa7e1e)",
    likes: 820,
    link: "https://WagaBanaras.com",
    socialLink: "https://www.instagram.com/waga_banaras?igsh=ZmJnaW1udzZoMHJ6",
    repo: "",
    comments: [
      { user: "waga.fashion", text: "Content calendar setup and brand aesthetic are outstanding 👌" },
    ],
  },
  {
    title: "DigiBanaras.com", emoji: "🌐",
    tagline: "Local Marketing & Social Presence",
    desc: "Managed end-to-end social media presence, local business promotion, and content marketing strategy for DigiBanaras.com.",
    tags: ["DigiBanaras", "LocalSEO", "SocialMedia", "ContentPlanning"],
    gradient: "linear-gradient(135deg,#fa7e1e,#feda75)",
    likes: 780,
    link: "https://DigiBanaras.com",
    socialLink: "https://www.instagram.com/digibanaras?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    repo: "",
    comments: [
      { user: "local.growth", text: "Local search rankings and brand engagement expanded rapidly 🚀" },
    ],
  },
  {
    title: "Hotel Ramya Varanasi", emoji: "🏨",
    tagline: "Digital Marketing & Social Growth",
    desc: "Spearheaded social media management, brand presence, and digital marketing strategy for Hotel Ramya Varanasi to boost customer bookings.",
    tags: ["HotelRamya", "Hospitality", "SocialMedia", "DigitalMarketing"],
    gradient: "linear-gradient(135deg,#0f2027,#2c5364)",
    likes: 740,
    link: "https://www.instagram.com/hotelramyavaranasi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    socialLink: "https://www.instagram.com/hotelramyavaranasi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    repo: "",
    comments: [
      { user: "hotel.ramya", text: "Social media engagement and direct room bookings increased significantly 🏨✨" },
    ],
  },
  {
    title: "EssenceOfVaranasi.com", emoji: "🛕",
    tagline: "Website & Digital Initiatives",
    desc: "Supported website-related digital initiatives, content structuring, and online brand strategy for EssenceOfVaranasi.com.",
    tags: ["EssenceOfVaranasi", "WebDev", "DigitalGrowth", "SEO"],
    gradient: "linear-gradient(135deg,#8e2de2,#4a00e0)",
    likes: 715,
    link: "https://EssenceOfVaranasi.com",
    socialLink: "https://www.instagram.com/essenceofvaranasi/",
    repo: "",
    comments: [
      { user: "vns.culture", text: "Digital footprint and search presence enhanced significantly ✨" },
    ],
  },
  {
    title: "Mannat Makeover", emoji: "💄",
    tagline: "Digital Growth & Lead Generation",
    desc: "Supported website-related digital initiatives, landing page development, and online lead generation strategy for mannatmakeover.in.",
    tags: ["MannatMakeover", "BeautyBrand", "LeadGen", "WebInitiatives"],
    gradient: "linear-gradient(135deg,#e6683c,#dc2743)",
    likes: 690,
    link: "https://mannatmakeover.in",
    socialLink: "https://www.instagram.com/mannatmakeover/",
    repo: "",
    comments: [
      { user: "mannat.studio", text: "Client inquiries and booking leads increased substantially 🌸" },
    ],
  },
  {
    title: "SEO & Analytics Suite", emoji: "🔍",
    tagline: "Technical, Local & Organic SEO",
    desc: "Comprehensive Search Engine Optimization suite — Technical SEO, Local SEO, On-Page & Off-Page SEO, Keyword Research, Google Search Console, GA4, GTM, SEMrush, and Screaming Frog.",
    tags: ["SEO", "GoogleAnalytics", "SEMrush", "GTM", "KeywordResearch"],
    gradient: "linear-gradient(135deg,#feda75,#fa7e1e,#d62976)",
    likes: 590,
    link: "",
    socialLink: "",
    repo: "",
    comments: [
      { user: "seo.specialist", text: "Clean technical architecture and keyword rankings 🥇" },
    ],
  },
  {
    title: "AI Workflows & Automation", emoji: "🤖",
    tagline: "Prompt Engineering & AI Content",
    desc: "AI-powered graphic design, AI video editing, SaaS project development with AI, and custom AI automation workflows for accelerated marketing production.",
    tags: ["AISkills", "PromptEngineering", "AIAutomation", "GraphicDesignAI"],
    gradient: "linear-gradient(135deg,#11998e,#38ef7d)",
    likes: 540,
    link: "",
    socialLink: "",
    video: "./ai-video-reels.mp4",
    repo: "",
    comments: [
      { user: "ai.innovator", text: "Prompt engineering workflows optimized content production 10x 🧠" },
    ],
  },
];

/* ------------------------------------------------------------
   SKILLS TAB
   ------------------------------------------------------------ */
const SKILL_GROUPS = [
  {
    name: "Digital Marketing & SEO", emoji: "🔍",
    skills: ["SEO", "Technical SEO", "Local SEO", "On-Page SEO", "Off-Page SEO", "Keyword Research", "Content Marketing", "Lead Generation"]
  },
  {
    name: "Social Media Marketing", emoji: "📱",
    skills: ["Meta Ads", "Facebook Marketing", "Instagram Marketing", "Content Planning", "Brand Building"]
  },
  {
    name: "WordPress & Web Development", emoji: "💻",
    skills: ["Elementor", "Website Development", "Landing Page Development", "Payment Gateway Integration", "Website Optimization"]
  },
  {
    name: "AI Skills & Workflows", emoji: "🤖",
    skills: ["Artificial Intelligence (AI)", "Prompt Engineering", "Graphic Design with AI", "Video Editing with AI", "SaaS Project Building", "AI Automation Workflows"]
  },
  {
    name: "Design & Creative Suite", emoji: "🎨",
    skills: ["Canva", "Adobe Photoshop", "Figma", "Adobe Premiere Pro", "Adobe After Effects"]
  },
  {
    name: "SEO & Analytics Tools", emoji: "📊",
    skills: ["Google Search Console", "Google Analytics (GA4)", "Google Tag Manager", "Google Keyword Planner", "SEMrush", "Screaming Frog"]
  },
  {
    name: "Office & Business Tools", emoji: "💼",
    skills: ["Tally", "MS Excel", "MS PowerPoint", "SAP", "Google Ads"]
  },
  {
    name: "Key Attributes & Hobbies", emoji: "🌟",
    skills: ["Honest & Hardworking", "Team Player", "Sales & Customer Service Oriented", "Listening to Music", "Photography"]
  },
];
