import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, MapPin, Briefcase, Building2, 
  ArrowRight, Globe, Layout, Building, Rocket, Users, ChevronDown, Palette
} from "lucide-react";
import { getJobs } from "../data/staticData";
import JobCard from "../components/JobCard";
import CompanyLogo from "../components/CompanyLogo";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState({ keyword: "", location: "", category: "All Categories" });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // Use static data instead of API call
    const result = getJobs({ limit: 100 });
    const allJobs = result.data || [];
    const targetCompanies = ["Amazon", "Google", "Microsoft", "Spotify", "Swiggy", "Tesla"];
    const featuredJobs = [];
    
    // Find one job per target company, maintaining exact target order
    targetCompanies.forEach(target => {
      const job = allJobs.find(j => j.companyName.toLowerCase() === target.toLowerCase());
      if (job) featuredJobs.push(job);
    });
    
    // If we didn't find all 6, fill with others
    if (featuredJobs.length < 6) {
      const seen = new Set(featuredJobs.map(j => j.companyName.toLowerCase()));
      for (const job of allJobs) {
        if (featuredJobs.length >= 6) break;
        const comp = job.companyName.toLowerCase();
        if (!seen.has(comp)) {
          featuredJobs.push(job);
          seen.add(comp);
        }
      }
    }
    
    setJobs(featuredJobs.slice(0, 6));
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let query = "/jobs?";
    if (searchData.keyword) query += `search=${encodeURIComponent(searchData.keyword)}&`;
    if (searchData.location) query += `location=${encodeURIComponent(searchData.location)}&`;
    if (searchData.category && searchData.category !== "All Categories") query += `category=${encodeURIComponent(searchData.category)}&`;
    navigate(query.replace(/[&?]$/, ""));
  };

  const categories = [
    { name: "IT & Software", icon: <Globe className="w-6 h-6" />, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Core Engineering", icon: <Briefcase className="w-6 h-6" />, color: "text-red-600", bg: "bg-red-50" },
    { name: "Banking & Finance", icon: <Building className="w-6 h-6" />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Human Resources", icon: <Users className="w-6 h-6" />, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Management", icon: <Layout className="w-6 h-6" />, color: "text-amber-600", bg: "bg-amber-50" },
    { name: "Marketing & Sales", icon: <Layout className="w-6 h-6" />, color: "text-orange-600", bg: "bg-orange-50" },
    { name: "Startups/Ops", icon: <Rocket className="w-6 h-6" />, color: "text-pink-600", bg: "bg-pink-50" },
    { name: "Design & Creative", icon: <Palette className="w-6 h-6" />, color: "text-teal-600", bg: "bg-teal-50" },
  ];

  return (
    <div className="bg-white min-h-screen font-outfit">
      {/* Hero Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Evaluate Your Career with <br/><span className="text-blue-500">Premium Remote Opportunities</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Connecting global talent with the world's leading companies. Discover your next role in IT, Finance, Engineering, and more.
          </p>

          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-2 items-center">
              <div className="flex-1 flex items-center px-4 py-3 w-full border-b lg:border-b-0 lg:border-r border-gray-100">
                <Search className="text-gray-400 mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Job title or keyword" 
                  className="w-full outline-none text-gray-700 font-medium"
                  value={searchData.keyword}
                  onChange={(e) => setSearchData({...searchData, keyword: e.target.value})}
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-3 w-full border-b lg:border-b-0 lg:border-r border-gray-100">
                <MapPin className="text-gray-400 mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="w-full outline-none text-gray-700 font-medium"
                  value={searchData.location}
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-3 w-full">
                <Briefcase className="text-gray-400 mr-3 shrink-0" />
                <select 
                  className="w-full outline-none text-gray-700 font-medium bg-transparent cursor-pointer appearance-none"
                  value={searchData.category}
                  onChange={(e) => setSearchData({...searchData, category: e.target.value})}
                >
                  <option>All Categories</option>
                  {categories.map(c => <option key={c.name}>{c.name}</option>)}
                </select>
                <ChevronDown className="text-gray-400 w-4 h-4 ml-2" />
              </div>
              <button type="submit" className="w-full lg:w-auto bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
                Search Jobs
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Trusted Companies Banner - Placed below hero as per original design */}
      <section className="py-12 border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">Trusted by industry leaders worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 transition-all duration-700 max-w-6xl">
              {["Amazon", "Google", "Infosys", "Wipro", "Tesla", "Swiggy", "Zomato", "Microsoft", "SAP", "Spotify", "PayPal", "Uber"].map(name => (
                <CompanyLogo key={name} companyName={name} size={45} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Domain Categories Grid (4 + 4) */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Explore by Domain</h2>
          <p className="text-gray-500 font-medium">Browse opportunities across all major industry sectors</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              onClick={() => navigate(`/jobs?category=${encodeURIComponent(cat.name)}`)}
              className="group p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-center"
            >
              <div className={`${cat.bg} ${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{cat.name}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Explore Jobs</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Featured Opportunities</h2>
              <p className="text-gray-500 font-medium">Hand-picked premium roles for your next career move</p>
            </div>
            <Link to="/jobs" className="bg-white border border-gray-200 text-blue-600 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition shadow-sm">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400 font-bold">Loading premium jobs...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Why Professionals Choose Us</h2>
            <p className="text-gray-500 font-medium">Trusted by thousands of job seekers worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Software Engineer at Google", text: "Remote Jobs Portal made my job search effortless. I found my dream remote role within two weeks of creating an account." },
              { name: "Michael Chen", role: "Product Manager at Spotify", text: "The quality of opportunities here is unmatched. The application process is smooth and the companies are top-tier." },
              { name: "Priya Sharma", role: "Marketing Lead at Swiggy", text: "Excellent platform! The domain-specific filters helped me find the exact role I was looking for. Highly recommended." }
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, idx) => <svg key={idx} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Ready to start your professional journey?</h2>
              <p className="text-slate-300 text-lg mb-12 font-medium opacity-90">Join thousands of professionals finding their dream remote jobs every day.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-xl">Create Account</Link>
                <Link to="/jobs" className="bg-slate-800 text-white px-10 py-4 rounded-2xl font-black hover:bg-slate-700 transition shadow-xl border border-slate-700">Browse Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
