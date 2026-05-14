/**
 * Static Jobs Data
 * Pre-generated job listings so the app works without a backend.
 * This replaces all API calls to /api/jobs and /api/companies.
 */

const companyData = {
  "Google": { domain: "google.com", color: "4285F4", icon: "google", category: "IT & Software" },
  "Microsoft": { domain: "microsoft.com", color: "5E5E5E", icon: "microsoft", category: "IT & Software" },
  "Amazon": { domain: "amazon.com", color: "FF9900", icon: "amazon", category: "IT & Software" },
  "Tata": { domain: "tata.com", color: "5C789B", icon: "tata", category: "IT & Software" },
  "Infosys": { domain: "infosys.com", color: "007CC3", icon: "infosys", category: "IT & Software" },
  "Cognizant": { domain: "cognizant.com", color: "1A4F8B", icon: "cognizant", category: "IT & Software" },
  "Wipro": { domain: "wipro.com", color: "3F1D73", icon: "wipro", category: "IT & Software" },
  "Intel": { domain: "intel.com", color: "0071C5", icon: "intel", category: "IT & Software" },
  "Siemens": { domain: "siemens.com", color: "009999", icon: "siemens", category: "Core Engineering" },
  "Honda": { domain: "honda.com", color: "E40521", icon: "honda", category: "Core Engineering" },
  "Tesla": { domain: "tesla.com", color: "CC0000", icon: "tesla", category: "Core Engineering" },
  "General Electric": { domain: "ge.com", color: "0066B2", icon: "generalelectric", category: "Core Engineering" },
  "Bosch": { domain: "bosch.com", color: "E20015", icon: "bosch", category: "Core Engineering" },
  "Visa": { domain: "visa.com", color: "1434CB", icon: "visa", category: "Banking & Finance" },
  "Mastercard": { domain: "mastercard.com", color: "EB001B", icon: "mastercard", category: "Banking & Finance" },
  "JP Morgan Chase": { domain: "jpmorganchase.com", color: "003A70", icon: "jpmorganchase", category: "Banking & Finance" },
  "Goldman Sachs": { domain: "goldmansachs.com", color: "6B9AC4", icon: "goldmansachs", category: "Banking & Finance" },
  "American Express": { domain: "americanexpress.com", color: "006FCF", icon: "americanexpress", category: "Banking & Finance" },
  "PayPal": { domain: "paypal.com", color: "00457C", icon: "paypal", category: "Banking & Finance" },
  "LinkedIn": { domain: "linkedin.com", color: "0A66C2", icon: "linkedin", category: "Human Resources" },
  "Workday": { domain: "workday.com", color: "0075C9", icon: "workday", category: "Human Resources" },
  "Zoom": { domain: "zoom.us", color: "2D8CFF", icon: "zoom", category: "Human Resources" },
  "Discord": { domain: "discord.com", color: "5865F2", icon: "discord", category: "Human Resources" },
  "Slack": { domain: "slack.com", color: "4A154B", icon: "slack", category: "Human Resources" },
  "Accenture": { domain: "accenture.com", color: "A100FF", icon: "accenture", category: "Management" },
  "IBM": { domain: "ibm.com", color: "054ADA", icon: "ibm", category: "Management" },
  "Oracle": { domain: "oracle.com", color: "F80000", icon: "oracle", category: "Management" },
  "Salesforce": { domain: "salesforce.com", color: "00A1E0", icon: "salesforce", category: "Management" },
  "SAP": { domain: "sap.com", color: "0FAAFF", icon: "sap", category: "Management" },
  "HubSpot": { domain: "hubspot.com", color: "FF7A59", icon: "hubspot", category: "Marketing & Sales" },
  "Mailchimp": { domain: "mailchimp.com", color: "FFE01B", icon: "mailchimp", category: "Marketing & Sales" },
  "Spotify": { domain: "spotify.com", color: "1DB954", icon: "spotify", category: "Marketing & Sales" },
  "Zomato": { domain: "zomato.com", color: "E23744", icon: "zomato", category: "Marketing & Sales" },
  "Swiggy": { domain: "swiggy.com", color: "FC8019", icon: "swiggy", category: "Marketing & Sales" },
  "Stripe": { domain: "stripe.com", color: "635BFF", icon: "stripe", category: "Startups/Ops" },
  "Airbnb": { domain: "airbnb.com", color: "FF5A5F", icon: "airbnb", category: "Startups/Ops" },
  "Uber": { domain: "uber.com", color: "000000", icon: "uber", category: "Startups/Ops" },
  "Notion": { domain: "notion.so", color: "000000", icon: "notion", category: "Startups/Ops" },
  "Figma": { domain: "figma.com", color: "F24E1E", icon: "figma", category: "Design & Creative" },
  "Adobe": { domain: "adobe.com", color: "FF0000", icon: "adobe", category: "Design & Creative" },
  "Canva": { domain: "canva.com", color: "00C4CC", icon: "canva", category: "Design & Creative" },
  "Dribbble": { domain: "dribbble.com", color: "EA4C89", icon: "dribbble", category: "Design & Creative" },
  "Behance": { domain: "behance.net", color: "1769FF", icon: "behance", category: "Design & Creative" }
};

const getLogoUrl = (name) => {
  const data = companyData[name];
  if (!data) return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=334155&color=fff&size=256&bold=true&font-size=0.33`;
  return `https://cdn.simpleicons.org/${data.icon}/${data.color}`;
};

const domainData = {
  "IT & Software": {
    companies: ["Google", "Microsoft", "Amazon", "Tata", "Infosys", "Cognizant", "Wipro", "Intel"],
    titles: ["Full Stack Developer", "Backend Engineer", "Frontend Specialist", "Cloud Architect", "Data Scientist", "DevOps Engineer", "React Developer", "Node.js Developer"],
    skills: ["React", "Node.js", "MongoDB", "AWS", "Python", "Docker", "JavaScript", "TypeScript"]
  },
  "Core Engineering": {
    companies: ["Siemens", "Honda", "Tesla", "General Electric", "Bosch"],
    titles: ["Mechanical Design Engineer", "Electrical Systems Engineer", "Civil Site Engineer", "Structural Analyst", "Production Engineer", "Embedded Systems Engineer"],
    skills: ["AutoCAD", "SolidWorks", "MATLAB", "PLC Programming", "Project Estimation", "Circuit Design"]
  },
  "Banking & Finance": {
    companies: ["Visa", "Mastercard", "JP Morgan Chase", "Goldman Sachs", "American Express", "PayPal"],
    titles: ["Financial Portfolio Manager", "Investment Banker", "Risk Compliance Officer", "Credit Analyst", "Corporate Finance Director"],
    skills: ["Financial Analysis", "Tally", "Excel", "KYC Compliance", "Risk Assessment"]
  },
  "Human Resources": {
    companies: ["LinkedIn", "Workday", "Zoom", "Discord", "Slack"],
    titles: ["Human Resources Director", "Senior Technical Recruiter", "Talent Acquisition Lead", "HR Operations Manager"],
    skills: ["Talent Sourcing", "Interviewing", "HRIS", "Onboarding"]
  },
  "Management": {
    companies: ["Accenture", "IBM", "Oracle", "Salesforce", "SAP"],
    titles: ["Business Development Director", "Senior Project Manager", "Operations Director", "Management Consultant"],
    skills: ["Leadership", "Agile", "Strategic Planning", "Jira"]
  },
  "Marketing & Sales": {
    companies: ["HubSpot", "Mailchimp", "Spotify", "Zomato", "Swiggy"],
    titles: ["Digital Marketing Specialist", "SEO Analyst", "Public Relations Manager", "Content Strategist"],
    skills: ["SEO", "Content Creation", "Google Analytics", "Copywriting"]
  },
  "Startups/Ops": {
    companies: ["Stripe", "Airbnb", "Uber", "Notion"],
    titles: ["Head of Growth Operations", "Product Innovation Lead", "Founding Engineer", "Venture Capital Analyst"],
    skills: ["Growth Strategies", "Lean Startup", "Data Analysis", "Product Development"]
  },
  "Design & Creative": {
    companies: ["Figma", "Adobe", "Canva", "Dribbble", "Behance"],
    titles: ["UI/UX Designer", "Graphic Designer", "Creative Director", "Motion Graphics Artist"],
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "Wireframing"]
  }
};

const locations = {
  bengaluru: ["Bengaluru, India", "Whitefield, Bengaluru", "Electronic City, Bengaluru", "Koramangala, Bengaluru"],
  india: ["Mumbai, India", "Delhi NCR, India", "Hyderabad, India", "Pune, India", "Chennai, India", "Kolkata, India", "Remote, India"],
  worldwide: ["San Francisco, USA", "London, UK", "Singapore", "Dubai, UAE", "Toronto, Canada", "Berlin, Germany", "Sydney, Australia", "Remote, Global"]
};

const workModes = ["Remote", "Onsite", "Hybrid"];
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const experiences = ["Fresher", "1-2 years", "3-5 years", "5+ years"];

// Seeded random for consistent results
let seed = 42;
const seededRandom = () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};
const pick = (arr) => arr[Math.floor(seededRandom() * arr.length)];

const generateSalary = (location) => {
  if (location.includes("India") || location.includes("Bengaluru")) {
    const min = Math.floor(seededRandom() * 15) + 3;
    const max = min + Math.floor(seededRandom() * 10) + 2;
    return `₹${min}L - ₹${max}L`;
  }
  const min = Math.floor(seededRandom() * 60) + 40;
  const max = min + Math.floor(seededRandom() * 40) + 10;
  return `$${min}k - $${max}k`;
};

const generateDescription = (company, title, category) => {
  return `We are thrilled to announce an exciting opportunity at ${company} for a highly motivated ${title}. Join our dynamic team in the ${category} department and be part of a forward-thinking culture. In this role, you will be responsible for driving key initiatives and collaborating with cross-functional teams to deliver outstanding results. We are looking for someone with a proven track record of excellence, strong problem-solving skills, and a passion for innovation. You will have the chance to work on cutting-edge projects that directly impact our core business objectives and shape the future of our industry. At ${company}, we believe in empowering our employees and providing a supportive environment where you can truly thrive and grow your career. Our comprehensive benefits package includes competitive compensation, health insurance, paid time off, and continuous learning opportunities. If you are a proactive self-starter who thrives in a fast-paced environment, this is the perfect role for you.`;
};

// Generate dates relative to "now"
const getDateDaysAgo = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

// ─── GENERATE JOBS ─────────────────────────────────────────────
const categoryCounts = {
  "IT & Software": 20,
  "Core Engineering": 20,
  "Banking & Finance": 10,
  "Human Resources": 10,
  "Management": 10,
  "Marketing & Sales": 10,
  "Startups/Ops": 10,
  "Design & Creative": 10
};

const generateAllJobs = () => {
  seed = 42; // Reset seed for consistency
  const jobs = [];
  let id = 1;

  // Location types pool
  const allLocTypes = ["bengaluru", "india", "worldwide"];

  // Generate exactly the right number of jobs per category
  // IT & Software: 20, Core Engineering: 20, all others: 10 each = 100 total
  for (const [category, targetCount] of Object.entries(categoryCounts)) {
    const data = domainData[category];
    
    for (let i = 0; i < targetCount; i++) {
      const companyName = data.companies[i % data.companies.length];
      const title = data.titles[i % data.titles.length];
      const locType = allLocTypes[Math.floor(seededRandom() * allLocTypes.length)];
      const location = pick(locations[locType]);
      const workMode = pick(workModes);
      const type = pick(jobTypes);
      const salary = generateSalary(location);
      const experience = pick(experiences);
      const skills = [...data.skills].sort(() => seededRandom() - 0.5).slice(0, 3);
      const daysAgo = Math.floor(seededRandom() * 15);

      jobs.push({
        _id: `job_${String(id++).padStart(3, '0')}`,
        title,
        description: generateDescription(companyName, title, category),
        location,
        workMode,
        type,
        salary,
        experience,
        skills,
        category,
        companyName,
        companyLogo: getLogoUrl(companyName),
        createdAt: getDateDaysAgo(daysAgo)
      });
    }
  }

  // Sort by date (newest first)
  jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return jobs;
};

// ─── GENERATE COMPANIES ────────────────────────────────────────
const generateAllCompanies = () => {
  return Object.entries(companyData).map(([name, info], idx) => ({
    _id: `company_${String(idx + 1).padStart(3, '0')}`,
    name,
    description: `${name} is a global leader in ${info.category}.`,
    website: `https://${info.domain}`,
    location: "Global / Remote",
    logo: getLogoUrl(name),
    category: info.category
  }));
};

// Pre-generate data
export const staticJobs = generateAllJobs();
export const staticCompanies = generateAllCompanies();

/**
 * Get jobs with filtering and pagination (mimics backend API)
 */
export const getJobs = ({ search, location, category, workMode, experience, type, page = 1, limit = 10 } = {}) => {
  let filtered = [...staticJobs];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(j =>
      j.title.toLowerCase().includes(q) ||
      j.companyName.toLowerCase().includes(q) ||
      j.skills.some(s => s.toLowerCase().includes(q))
    );
  }
  if (location) {
    const q = location.toLowerCase();
    filtered = filtered.filter(j => j.location.toLowerCase().includes(q));
  }
  if (category && category !== 'All Categories') {
    filtered = filtered.filter(j => j.category === category);
  }
  if (workMode && workMode !== 'All Modes') {
    filtered = filtered.filter(j => j.workMode === workMode);
  }
  if (experience && experience !== 'All Experiences') {
    filtered = filtered.filter(j => j.experience === experience);
  }
  if (type && type !== 'All Types') {
    filtered = filtered.filter(j => j.type === type);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return { data, count: total };
};

/**
 * Get a single job by ID
 */
export const getJobById = (id) => {
  return staticJobs.find(j => j._id === id) || null;
};

/**
 * Get all companies
 */
export const getCompanies = () => {
  return staticCompanies;
};

/**
 * Get company by ID with its jobs
 */
export const getCompanyById = (id) => {
  const company = staticCompanies.find(c => c._id === id);
  if (!company) return null;
  const jobs = staticJobs.filter(j => j.companyName === company.name);
  return { ...company, jobs };
};
