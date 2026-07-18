export type Project = {
  id: string
  name: string
  category: string
  type: string
  url: string
  domain: string
  accent: string
  image?: string
  tags?: string[]
}

export type TeamMember = {
  slug: string
  name: string
  role: string
  title: string
  photo: string
  bio: string
  focus: string[]
}

export type FigmaWork = {
  id: string
  name: string
  url?: string
  status: string
  image?: string
}

export const projects: Project[] = [
  {
    id: '01',
    name: 'WOS Caffe',
    category: 'Hospitality',
    type: 'Website',
    url: 'https://www.woscaffe.com',
    domain: 'woscaffe.com',
    accent: 'from-[#3a1c0c]',
    image: '/projects/woscaffe.png',
    tags: ['REACT', 'CMS', 'BRAND'],
  },
  {
    id: '02',
    name: 'Eagle Medical Care',
    category: 'Healthcare',
    type: 'Website',
    url: 'https://www.eaglemedicalcare.com',
    domain: 'eaglemedicalcare.com',
    accent: 'from-[#0c2a4d]',
    image: '/projects/Eagle.png',
    tags: ['REACT', 'HEALTH', 'SEO'],
  },
  {
    id: '03',
    name: 'WOS Hosting',
    category: 'Hosting',
    type: 'Infrastructure',
    url: 'https://www.woshostingeth.com',
    domain: 'woshostingeth.com',
    accent: 'from-[#2b3a11]',
    image: '/projects/Woshosting.png',
    tags: ['HOSTING', 'CLOUD', 'CPANEL'],
  },
  {
    id: '04',
    name: 'WOS Medical Complex',
    category: 'Healthcare',
    type: 'Platform',
    url: 'https://www.wosmedical.com',
    domain: 'wosmedical.com',
    accent: 'from-[#113a36]',
    image: '/projects/wosmedical.png',
    tags: ['WEB APP', 'PATIENT', 'OPS'],
  },
  {
    id: '05',
    name: 'Madeg Charity Organization',
    category: 'Nonprofit',
    type: 'Website',
    url: 'https://www.madeg.org',
    domain: 'madeg.org',
    accent: 'from-[#3a1c4a]',
    image: '/projects/Madeg.png',
    tags: ['REACT', 'DONATIONS', 'CMS'],
  },
  {
    id: '06',
    name: 'Derma Care',
    category: 'Healthcare',
    type: 'Web App',
    url: 'https://dermafrontend-khaki.vercel.app/',
    domain: 'dermafrontend-khaki.vercel.app',
    accent: 'from-[#4d2a0c]',
    image: '/projects/Dermacare.png',
    tags: ['REACT', 'UI', 'CLINIC'],
  },
  {
    id: '07',
    name: 'Multi Modal AI Suit',
    category: 'AI',
    type: 'Platform',
    url: 'https://multiaisuit.netlify.app/',
    domain: 'multiaisuit.netlify.app',
    accent: 'from-[#0d3f2b]',
    image: '/projects/multimodal-ai.png',
    tags: ['AI', 'MULTIMODAL', 'PRODUCT'],
  },
]

export const homeProjects = projects.slice(0, 5)

export const teamMembers: TeamMember[] = [
  {
    slug: 'haileyesus-mulugeta',
    name: 'Haileyesus Mulugeta',
    role: 'CEO and Team Lead',
    title: 'CEO · Team Lead',
    photo: '/team/haileyesus-mulugeta.png',
    bio: 'Haileyesus leads Hello World with a focus on shipping reliable digital products, growing ambitious teams, and turning complex ideas into systems that perform in the real world.',
    focus: ['Product strategy', 'Team leadership', 'Client partnerships', 'Delivery excellence'],
  },
  {
    slug: 'rebika-yihenew',
    name: 'Rebika Yihenew',
    role: 'CTO and Software Engineer',
    title: 'CTO · Software Engineer',
    photo: '/team/rebika-yihenew.png',
    bio: 'Rebika architects and builds the technical foundation behind Hello World products — from modern web platforms to AI-powered experiences — with craft, speed, and engineering rigor.',
    focus: ['Software architecture', 'Full-stack engineering', 'AI products', 'Technical direction'],
  },
]

export const figmaWorks: FigmaWork[] = [
  {
    id: '01',
    name: 'Shega Date',
    url: 'https://www.figma.com/design/7QyWzvcUgiO2NEsrqDklzG/Shega-Date?node-id=0-1&p=f&t=3Y0TxRhCVoeVJAbk-0',
    status: 'Live in Figma',
    image: '/projects/shega.png',
  },
  {
    id: '02',
    name: 'AVS',
    url: 'https://www.figma.com/design/Kr2u6a2jOThmYTB3wkU8mt/Untitled?t=OmZ6t3pOJCttI6WS-0',
    status: 'Live in Figma',
    image: '/projects/Avs.png',
  },
]

export const hostingProduct = {
  name: 'WOS Hosting',
  url: 'https://www.woshostingeth.com',
  domain: 'woshostingeth.com',
  image: '/projects/Woshosting.png',
  phone: '+251 918 155 305',
  phoneAlt: '+251 989 991 524',
  email: 'rebeccayihenew@gmail.com',
  plans: [
    {
      name: 'Bronze',
      price: 'Birr 999/yr',
      features: ['One domain', 'Unlimited subdomains', 'cPanel included', '5GB disk', '100GB bandwidth', 'Free Sitejet Builder', 'Free SSL'],
    },
    {
      name: 'Silver',
      price: 'Birr 2,299/yr',
      features: ['Five domains', 'Unlimited subdomains', 'cPanel included', '10GB disk', '300GB bandwidth', 'Free domain', 'Free Sitejet + SSL'],
    },
    {
      name: 'Gold',
      price: 'Birr 4,299/yr',
      features: ['Unlimited domains', 'Unlimited subdomains', 'cPanel included', '15GB disk', '1000GB bandwidth', 'Free domain', 'Free Sitejet + SSL'],
    },
    {
      name: 'Platinum',
      price: 'Birr 7,999/yr',
      features: ['Unlimited domains', 'Unlimited subdomains', 'cPanel included', '20GB disk', 'Unlimited bandwidth', 'Free domain all TLDs', 'Free Sitejet + SSL'],
    },
  ],
}
