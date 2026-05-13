import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ArrowLeft, MapPin, Globe, Briefcase, ExternalLink, Search, Sparkles } from "lucide-react";
import CompanyLogo from "../components/CompanyLogo";
import JobCard from "../components/JobCard";
import { getCompanyColor } from "../utils/companyLogos";

const CompanyJobs = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { backendUrl } = useContext(AuthContext);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await axios.get(`${backendUrl}/companies/${id}`);
        setCompany(res.data.data);
      } catch (err) {
        console.error("Error fetching company jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, [id, backendUrl]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-slate-900 pt-16 pb-28">
          <div className="max-w-6xl mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-32 mb-10" />
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-24 h-24 bg-slate-700 rounded-2xl shrink-0" />
                <div className="flex-1 text-center md:text-left">
                  <div className="h-8 bg-slate-700 rounded w-64 mb-3" />
                  <div className="h-4 bg-slate-800 rounded w-96 mb-2" />
                  <div className="h-4 bg-slate-800 rounded w-80" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 -mt-10">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-6 animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Not Found</h2>
          <p className="text-gray-500 mb-6">The company you're looking for doesn't exist or was removed.</p>
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  const brandColor = getCompanyColor(company.name);

  // Filter jobs by search term if user types
  const filteredJobs = (company.jobs || []).filter((job) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      job.title?.toLowerCase().includes(q) ||
      job.location?.toLowerCase().includes(q) ||
      job.type?.toLowerCase().includes(q) ||
      job.workMode?.toLowerCase().includes(q) ||
      job.experience?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/companies" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Companies
          </Link>
          <div className="flex flex-col md:flex-row items-center gap-8 text-white">
            <CompanyLogo companyName={company.name} size={100} className="rounded-2xl border-4 border-white/10 shadow-2xl" />
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{company.name}</h1>
              <p className="text-slate-400 max-w-2xl mb-6">{company.description}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-blue-400" /> {company.location}</span>
                {company.website && <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition"><Globe className="w-4 h-4 text-emerald-400" /> {company.website.replace(/^https?:\/\//, "")}</a>}
                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-purple-400" /> {company.jobs?.length || 0} Open Roles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
          {/* Section Header */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: `${brandColor}12` }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: brandColor }} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Current Openings at {company.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {company.jobs?.length || 0} {company.jobs?.length === 1 ? "position" : "positions"} available
                  </p>
                </div>
              </div>

              {/* Search within jobs */}
              {company.jobs && company.jobs.length > 3 && (
                <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 px-3 py-2 gap-2 min-w-0 sm:w-72">
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Jobs List */}
          <div className="p-8">
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, i) => (
                  <div
                    key={job._id}
                    className="company-card"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <JobCard job={{ ...job, companyName: company.name }} />
                  </div>
                ))}
              </div>
            ) : searchTerm ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-gray-300" />
                </div>
                <p className="text-lg font-bold text-gray-700 mb-1">No matching roles</p>
                <p className="text-gray-500 text-sm mb-4">
                  No jobs at {company.name} match "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-sm font-semibold px-4 py-2 rounded-lg transition"
                  style={{ backgroundColor: `${brandColor}12`, color: brandColor }}
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Briefcase className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-xl font-bold text-gray-700 mb-2">No Active Openings</p>
                <p className="text-gray-500 mb-6">
                  Check back later for new opportunities at {company.name}.
                </p>
                <Link
                  to="/companies"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Explore Other Companies
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyJobs;
