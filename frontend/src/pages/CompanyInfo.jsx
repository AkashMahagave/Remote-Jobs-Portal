import { useState, useEffect } from "react";
import { getCompanies } from "../data/staticData";
import { Building2, MapPin, ArrowRight, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getCompanyColor, isVerifiedCompany } from "../utils/companyLogos";
import CompanyLogo from "../components/CompanyLogo";

const CompanyInfo = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Use static data instead of API call
    const allCompanies = getCompanies();
    setCompanies(allCompanies);
    setLoading(false);
  }, []);

  const filteredCompanies = companies.filter((company) => {
    return company.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Top Hiring Companies</h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
            Discover leading companies currently hiring top talent worldwide.
          </p>
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center shadow-2xl border border-white/20 transition-all focus-within:bg-white focus-within:border-white group">
            <Search className="w-6 h-6 text-blue-200 ml-4 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 outline-none bg-transparent text-white placeholder-blue-200/70 font-medium text-lg group-focus-within:text-gray-900 group-focus-within:placeholder-gray-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Spacer after hero */}
      <div className="mb-8" />

      {/* Companies Grid */}
      <div className="max-w-6xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 bg-gray-200 rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-2" />
                    <div className="h-3.5 bg-gray-100 rounded-lg w-1/2" />
                  </div>
                </div>
                <div className="h-12 bg-gray-200 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredCompanies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company, i) => {
                const brandColor = getCompanyColor(company.name);

                return (
                  <div
                    key={company._id || i}
                    className="company-card bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {/* Accent top gradient bar */}
                    <div
                      className="h-1.5 w-full"
                      style={{ background: `linear-gradient(90deg, ${brandColor}, ${brandColor}66, transparent)` }}
                    />

                    <div className="p-6 flex-grow">
                      {/* Logo + Name */}
                      <div className="flex items-center gap-4 mb-4">
                        <CompanyLogo
                          companyName={company.name}
                          size={64}
                          className="transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-lg text-gray-900 truncate leading-tight">
                            {company.name}
                          </h3>
                        </div>
                      </div>

                      {/* Location only — no job roles or listings */}
                      {company.location && (
                        <div className="flex items-center gap-2.5 text-sm text-gray-500 mb-1">
                          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className="truncate">{company.location}</span>
                        </div>
                      )}
                    </div>

                    {/* View Details Button */}
                    <div className="px-6 pb-6 mt-auto">
                      <Link
                        to={`/companies/${company._id}`}
                        className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all duration-300 shadow-sm text-white"
                        style={{ backgroundColor: "#0f172a" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = brandColor;
                          e.currentTarget.style.boxShadow = `0 8px 25px ${brandColor}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#0f172a";
                          e.currentTarget.style.boxShadow = "";
                        }}
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="bg-white p-20 rounded-2xl text-center border border-gray-100 shadow-sm">
            <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Building2 className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-xl font-bold text-gray-700 mb-2">No Companies Found</p>
            <p className="text-gray-500 mb-6">Try adjusting your search.</p>
            <button
              onClick={() => { setSearchTerm(""); }}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInfo;
