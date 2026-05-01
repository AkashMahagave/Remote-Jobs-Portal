const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config({ path: "./backend/.env" });
const User = require("./models/User");
const Job = require("./models/Job");
const Company = require("./models/Company");

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
    companies: ["Stripe", "Airbnb", "Uber", "Notion", "Figma"],
    titles: ["Head of Growth Operations", "Product Innovation Lead", "Founding Engineer", "Venture Capital Analyst"],
    skills: ["Growth Strategies", "Lean Startup", "Data Analysis", "Product Development"]
  },
  "Design & Creative": {
    companies: ["Adobe", "Canva", "Dribbble", "Behance", "Figma"],
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

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateSalary = (location) => {
  if (location.includes("India")) {
    const min = Math.floor(Math.random() * 15) + 3;
    const max = min + Math.floor(Math.random() * 10) + 2;
    return `₹${min}L - ₹${max}L`;
  }
  const min = Math.floor(Math.random() * 60) + 40;
  const max = min + Math.floor(Math.random() * 40) + 10;
  return `$${min}k - $${max}k`;
};

const seed = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("Cleaning old data...");
    await Job.deleteMany({});
    await User.deleteMany({});
    await Company.deleteMany({});

    console.log("Creating demo users...");
    const hashedPassword = await bcrypt.hash("password123", 10);
    const employer = await User.create({ 
      name: "Portal Admin", 
      email: "admin@portal.com", 
      password: hashedPassword, 
      role: "employer",
      phone: "9876543210"
    });
    
    await User.create({ 
      name: "Job Seeker", 
      email: "user@example.com", 
      password: hashedPassword, 
      role: "jobseeker",
      phone: "9998887770"
    });

    console.log("Generating companies...");
    const companyDocs = {};
    for (const [name, info] of Object.entries(companyData)) {
      const newCompany = await Company.create({
        name,
        description: `${name} is a global leader in ${info.category}.`,
        website: `https://${info.domain}`,
        location: "Global / Remote",
        logo: getLogoUrl(name),
        category: info.category,
        owner: employer._id
      });
      companyDocs[name] = newCompany;
    }

    console.log("Generating 100 jobs with strict distribution...");
    const allJobs = [];
    const categories = Object.keys(domainData);

    const categoryCounts = {
      "IT & Software": 10,
      "Core Engineering": 10,
      "Banking & Finance": 10,
      "Human Resources": 10,
      "Management": 10,
      "Marketing & Sales": 10,
      "Startups/Ops": 10,
      "Design & Creative": 10
    }; // Total exactly 80 for the general pool

    let locationPool = [
      ...Array(30).fill("bengaluru"),
      ...Array(40).fill("india"),
      ...Array(30).fill("worldwide")
    ].sort(() => Math.random() - 0.5);

    let workModePool = [
      ...Array(50).fill("Remote"),
      ...Array(25).fill("Hybrid"),
      ...Array(25).fill("Onsite")
    ].sort(() => Math.random() - 0.5);

    let locIdx = 0;
    let wmIdx = 0;

    // Create an ordered list of 100 companies.
    const top20Names = [
      "Amazon", "Google", "Microsoft", "SAP", "Intel", 
      "Oracle", "Tesla", "Uber", "American Express", "Bosch", 
      "Honda", "Infosys", "Wipro", "Zomato", "Tata",
      "Visa", "LinkedIn", "Spotify", "Salesforce", "Stripe"
    ];
    
    const allCompaniesList = Object.keys(companyData).filter(c => !top20Names.includes(c));
    let companyPool = [];
    while (companyPool.length < 80) {
      companyPool.push(...allCompaniesList.sort(() => Math.random() - 0.5));
    }
    companyPool = companyPool.slice(0, 80);

    // Generate long description
    const generateDescription = (company, title, category) => {
      const sentences = [
        `We are thrilled to announce an exciting opportunity at ${company} for a highly motivated ${title}.`,
        `Join our dynamic team in the ${category} department and be part of a forward-thinking culture.`,
        `In this role, you will be responsible for driving key initiatives and collaborating with cross-functional teams to deliver outstanding results.`,
        `We are looking for someone with a proven track record of excellence, strong problem-solving skills, and a passion for innovation.`,
        `You will have the chance to work on cutting-edge projects that directly impact our core business objectives and shape the future of our industry.`,
        `At ${company}, we believe in empowering our employees and providing a supportive environment where you can truly thrive and grow your career.`,
        `Our comprehensive benefits package includes competitive compensation, health insurance, paid time off, and continuous learning opportunities.`,
        `If you are a proactive self-starter who thrives in a fast-paced environment, this is the perfect role for you.`,
        `We value diversity and inclusion, and we are committed to building a team that reflects a wide range of backgrounds and perspectives.`,
        `Take the next step in your professional journey and apply today to become a vital part of our success story.`
      ];
      // Pick 6 to 10 sentences
      const count = Math.floor(Math.random() * 5) + 6;
      return sentences.slice(0, count).join(" ");
    };

    // General 80 jobs
    for (const category of categories) {
      const targetCount = categoryCounts[category]; // we won't strictly hit this due to 80 limit, but it's fine
      const data = domainData[category];
      
      for (let i = 0; i < targetCount; i++) {
        if (allJobs.length >= 80) break;
        const title = pick(data.titles);
        const companyName = companyPool.pop();
        const locType = locationPool[locIdx++];
        const location = pick(locations[locType]);
        const workMode = workModePool[wmIdx++];
        const type = pick(jobTypes);
        const salary = generateSalary(location);
        const experience = pick(experiences);
        const skills = data.skills.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        const companyObj = companyDocs[companyName];
        
        allJobs.push({
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
          companyLogo: companyObj.logo,
          company: companyObj._id,
          postedBy: employer._id
        });
      }
    }

    // Ensure the top 20 companies are the LAST 20 added so they appear on Page 1 and 2
    // We reverse the top20Names so Amazon is inserted LAST (appears first)
    const reversedTop20 = [...top20Names].reverse();

    for (const companyName of reversedTop20) {
      const companyObj = companyDocs[companyName];
      if (companyObj) {
        const category = companyObj.category;
        const data = domainData[category];
        const title = pick(data.titles);
        
        allJobs.push({
          title: title,
          description: generateDescription(companyName, title, category),
          location: pick(locations["india"]),
          workMode: workModePool[wmIdx++] || "Remote",
          type: pick(jobTypes),
          salary: generateSalary("India"),
          experience: pick(experiences),
          skills: data.skills.slice(0, 3) || ["Communication", "Leadership", "Teamwork"],
          category: category,
          companyName: companyName,
          companyLogo: companyObj.logo,
          company: companyObj._id,
          postedBy: employer._id
        });
      }
    }

    await Job.insertMany(allJobs);
    console.log(`🎉 Seeding complete: ${allJobs.length} jobs created!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seed();

