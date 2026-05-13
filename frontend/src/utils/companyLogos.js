/**
 * Company Logo Utility
 * Provides consistent, high-quality logos for all companies across the platform.
 * Uses Simple Icons CDN for verified working brands.
 * All other companies get premium SVG data-URI logos that always render.
 */

// Darken a hex color by a given amount for gradients
const darkenHex = (hex, amount) => {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = Math.max(0, parseInt(hex.substring(0, 2), 16) + amount);
  const g = Math.max(0, parseInt(hex.substring(2, 4), 16) + amount);
  const b = Math.max(0, parseInt(hex.substring(4, 6), 16) + amount);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
};

// Generate a premium SVG logo as a data URI
const makeSvgLogo = (initials, color) => {
  const safe = initials.replace(/&/g, '&amp;');
  const len = initials.replace(/&/g, '').length;
  const fs = len <= 1 ? 52 : len <= 2 ? 40 : len <= 3 ? 32 : len <= 4 ? 26 : 22;
  const dark = darkenHex(color, -40);
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">',
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">',
    `<stop offset="0%" stop-color="${color}"/>`,
    `<stop offset="100%" stop-color="${dark}"/>`,
    '</linearGradient></defs>',
    '<rect width="120" height="120" rx="26" fill="url(#g)"/>',
    `<text x="60" y="63" text-anchor="middle" dominant-baseline="central" font-family="system-ui,-apple-system,Segoe UI,sans-serif" font-weight="800" font-size="${fs}" fill="white" opacity=".95" letter-spacing="-1">${safe}</text>`,
    '</svg>'
  ].join('');
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

// ── Company logo configuration ─────────────────────────────────────
// Slugs verified against Simple Icons library.
const LOGO_CONFIG = {
  // IT & Software
  "Google": { icon: "google", color: "#4285F4" },
  "Microsoft": { icon: "microsoft", color: "#00A4EF" },
  "Amazon": { icon: "amazon", color: "#FF9900" },
  "Tata": { icon: "tata", color: "#5C789B" },
  "Infosys": { icon: "infosys", color: "#007CC3" },
  "Cognizant": { icon: "cognizant", color: "#1A4F8B" },
  "Wipro": { icon: "wipro", color: "#3F1D73" },
  "Intel": { icon: "intel", color: "#0071C5" },

  // Core Engineering
  "Siemens": { icon: "siemens", color: "#009999" },
  "Honda": { icon: "honda", color: "#E40521" },
  "Tesla": { icon: "tesla", color: "#CC0000" },
  "General Electric": { icon: "generalelectric", color: "#0066B2" },
  "Bosch": { icon: "bosch", color: "#E20015" },

  // Banking & Finance
  "Visa": { icon: "visa", color: "#1434CB" },
  "Mastercard": { icon: "mastercard", color: "#EB001B" },
  "JP Morgan Chase": { icon: "jpmorganchase", color: "#003A70" },
  "Goldman Sachs": { icon: "goldmansachs", color: "#6B9AC4" },
  "American Express": { icon: "americanexpress", color: "#006FCF" },
  "PayPal": { icon: "paypal", color: "#00457C" },

  // Human Resources
  "LinkedIn": { icon: "linkedin", color: "#0A66C2" },
  "Workday": { icon: "workday", color: "#0075C9" },
  "Zoom": { icon: "zoom", color: "#2D8CFF" },
  "Discord": { icon: "discord", color: "#5865F2" },
  "Slack": { icon: "slack", color: "#4A154B" },

  // Management
  "Accenture": { icon: "accenture", color: "#A100FF" },
  "IBM": { icon: "ibm", color: "#054ADA" },
  "Oracle": { icon: "oracle", color: "#F80000" },
  "Salesforce": { icon: "salesforce", color: "#00A1E0" },
  "SAP": { icon: "sap", color: "#0FAAFF" },

  // Marketing & Sales
  "HubSpot": { icon: "hubspot", color: "#FF7A59" },
  "Mailchimp": { icon: "mailchimp", color: "#FFE01B" },
  "Spotify": { icon: "spotify", color: "#1DB954" },
  "Zomato": { icon: "zomato", color: "#E23744" },
  "Swiggy": { icon: "swiggy", color: "#FC8019" },

  // Startups / Business Operations
  "Stripe": { icon: "stripe", color: "#635BFF" },
  "Airbnb": { icon: "airbnb", color: "#FF5A5F" },
  "Uber": { icon: "uber", color: "#000000" },
  "Notion": { icon: "notion", color: "#000000" },
  "Netflix": { icon: "netflix", color: "#E50914" },
  "Meta": { icon: "meta", color: "#0668E1" },
  "Apple": { icon: "apple", color: "#000000" },
  "Coinbase": { icon: "coinbase", color: "#0052FF" },

  // Design & Creative
  "Figma": { icon: "figma", color: "#F24E1E" },
  "Adobe": { icon: "adobe", color: "#FF0000" },
  "Canva": { icon: "canva", color: "#00C4CC" },
  "Dribbble": { icon: "dribbble", color: "#EA4C89" },
  "Behance": { icon: "behance", color: "#1769FF" }
};

/**
 * Get a reliable logo URL for any company name.
 */
export const getCompanyLogoUrl = (companyName) => {
  if (!companyName) return makeSvgLogo('?', '#334155');

  // Normalization for matching
  const normalized = companyName.trim();
  
  // Special cases for high-quality multi-color logos
  const specialLogos = {
    "Google": "https://www.gstatic.com/images/branding/product/2x/googleg_96dp.png",
    "Microsoft": "https://img.icons8.com/color/144/microsoft.png",
    "Amazon": "https://img.icons8.com/color/144/amazon.png",
    "Adobe": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg",
    "Canva": "https://img.icons8.com/color/144/canva.png",
    "Cognizant": "https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg",
    "IBM": "https://img.icons8.com/color/144/ibm.png",
    "JP Morgan": "https://img.icons8.com/color/144/jpmorgan-chase.png",
    "JP Morgan Chase": "https://img.icons8.com/color/144/jpmorgan-chase.png",
    "LinkedIn": "https://img.icons8.com/color/144/linkedin.png",
    "Salesforce": "https://img.icons8.com/color/144/salesforce.png",
    "Slack": "https://img.icons8.com/color/144/slack.png",
    "Workday": "https://img.icons8.com/color/144/workday.png",
    "Oracle": "https://img.icons8.com/color/144/oracle-logo.png"
  };

  // Handle normalization for matching
  const lookupName = normalized;
  
  // Check special cases first (case-insensitive)
  const specialKey = Object.keys(specialLogos).find(
    key => key.toLowerCase() === lookupName.toLowerCase()
  );
  if (specialKey) return specialLogos[specialKey];
  
  // Find key in LOGO_CONFIG (case-insensitive)
  const configKey = Object.keys(LOGO_CONFIG).find(
    key => key.toLowerCase() === lookupName.toLowerCase()
  );

  const cfg = configKey ? LOGO_CONFIG[configKey] : null;

  if (cfg?.icon) {
    const hex = cfg.color.replace('#', '');
    return `https://cdn.simpleicons.org/${cfg.icon}/${hex}`;
  }
  if (cfg?.initials) {
    return makeSvgLogo(cfg.initials, cfg.color);
  }
  
  // Fallback for unknown companies
  const initials = normalized.split(/[\s&]+/).map(w => w[0]).join('').substring(0, 3).toUpperCase();
  return makeSvgLogo(initials, '#334155');
};

/**
 * Get the brand color for a company.
 */
export const getCompanyColor = (companyName) => {
  if (!companyName) return '#334155';
  const lookupName = companyName;

  // Colors for special cases
  const specialColors = {
    "Google": "#4285F4",
    "Microsoft": "#00A4EF",
    "Amazon": "#FF9900",
    "Adobe": "#FF0000",
    "Canva": "#00C4CC",
    "Cognizant": "#1A4F8B",
    "IBM": "#054ADA",
    "JP Morgan Chase": "#003A70",
    "LinkedIn": "#0A66C2",
    "Salesforce": "#00A1E0",
    "Slack": "#4A154B",
    "Workday": "#0075C9",
    "Oracle": "#F80000"
  };

  const specialKey = Object.keys(specialColors).find(
    key => key.toLowerCase() === lookupName.toLowerCase()
  );
  if (specialKey) return specialColors[specialKey];

  const configKey = Object.keys(LOGO_CONFIG).find(
    key => key.toLowerCase() === lookupName.toLowerCase()
  );
  return LOGO_CONFIG[configKey]?.color || '#334155';
};

/**
 * Check if a company uses a CDN icon.
 */
export const isSimpleIcon = (companyName) => {
  if (!companyName) return false;
  const lookupName = companyName;
  
  // Special cases also count as "Simple Icons" for UI styling purposes
  const specialNames = ["Google", "Microsoft", "Amazon", "Adobe", "Canva", "Cognizant", "IBM", "JP Morgan Chase", "LinkedIn", "Salesforce", "Slack", "Workday", "Oracle"];
  if (specialNames.some(n => n.toLowerCase() === lookupName.toLowerCase())) return true;

  const configKey = Object.keys(LOGO_CONFIG).find(
    key => key.toLowerCase() === lookupName.toLowerCase()
  );
  return !!LOGO_CONFIG[configKey]?.icon;
};

/**
 * Get a fallback SVG logo.
 */
export const getFallbackLogoUrl = (companyName) => {
  if (!companyName) return makeSvgLogo('?', '#334155');
  const lookupName = companyName;
  const configKey = Object.keys(LOGO_CONFIG).find(
    key => key.toLowerCase() === lookupName.toLowerCase()
  );
  const cfg = configKey ? LOGO_CONFIG[configKey] : null;
  const color = cfg?.color || '#334155';
  if (cfg?.initials) {
    return makeSvgLogo(cfg.initials, color);
  }
  const initials = companyName.split(/[\s&]+/).map(w => w[0]).join('').substring(0, 3).toUpperCase();
  return makeSvgLogo(initials, color);
};

export const isVerifiedCompany = (companyName) => {
  if (!companyName) return false;
  const lookupName = companyName.toLowerCase();
  
  // Check special names first
  const specialNames = ["Google", "Microsoft", "Amazon", "Adobe", "Canva", "Cognizant", "IBM", "JP Morgan", "JP Morgan Chase", "LinkedIn", "Salesforce", "Slack", "Workday", "Oracle", "Netflix", "Meta", "Apple", "Uber", "Airbnb", "Stripe", "Coinbase", "Tesla", "Spotify"];
  if (specialNames.some(n => n.toLowerCase() === lookupName)) return true;

  // Check LOGO_CONFIG
  return Object.keys(LOGO_CONFIG).some(
    key => key.toLowerCase() === lookupName
  );
};

export default { getCompanyLogoUrl, getCompanyColor, isSimpleIcon, getFallbackLogoUrl, isVerifiedCompany, LOGO_CONFIG };
