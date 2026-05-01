import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronLeft, ChevronRight, Search, MapPin, Briefcase, Clock, Zap } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import JobCard from '../components/JobCard';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 10;

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || 'All Categories',
    workMode: searchParams.get('workMode') || 'All Modes',
    experience: searchParams.get('experience') || 'All Experiences',
    type: searchParams.get('type') || 'All Types',
  });

  const { backendUrl } = useContext(AuthContext);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchJobs = useCallback(async (activeFilters, page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('limit', JOBS_PER_PAGE);
      params.set('page', page);
      if (activeFilters.search) params.set('search', activeFilters.search);
      if (activeFilters.location) params.set('location', activeFilters.location);
      if (activeFilters.category && activeFilters.category !== 'All Categories') params.set('category', activeFilters.category);
      if (activeFilters.workMode && activeFilters.workMode !== 'All Modes') params.set('workMode', activeFilters.workMode);
      if (activeFilters.experience && activeFilters.experience !== 'All Experiences') params.set('experience', activeFilters.experience);
      if (activeFilters.type && activeFilters.type !== 'All Types') params.set('type', activeFilters.type);
      
      const response = await axios.get(`${backendUrl}/jobs?${params.toString()}`);
      setJobs(response.data.data || []);
      setTotalJobs(response.data.count || 0);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally { setLoading(false); }
  }, [backendUrl]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const urlFilters = {
      search: searchParams.get('search') || '',
      location: searchParams.get('location') || '',
      category: searchParams.get('category') || 'All Categories',
      workMode: searchParams.get('workMode') || 'All Modes',
      experience: searchParams.get('experience') || 'All Experiences',
      type: searchParams.get('type') || 'All Types',
    };
    setFilters(urlFilters);
    fetchJobs(urlFilters, currentPage);
  }, [searchParams, currentPage, fetchJobs]);

  const applyFiltersToUrl = (activeFilters) => {
    const params = {};
    if (activeFilters.search) params.search = activeFilters.search;
    if (activeFilters.location) params.location = activeFilters.location;
    if (activeFilters.category && activeFilters.category !== 'All Categories') params.category = activeFilters.category;
    if (activeFilters.workMode && activeFilters.workMode !== 'All Modes') params.workMode = activeFilters.workMode;
    if (activeFilters.experience && activeFilters.experience !== 'All Experiences') params.experience = activeFilters.experience;
    if (activeFilters.type && activeFilters.type !== 'All Types') params.type = activeFilters.type;
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    if (name === 'search' || name === 'location') {
      if (searchTimeout) clearTimeout(searchTimeout);
      setSearchTimeout(setTimeout(() => applyFiltersToUrl(newFilters), 500));
    } else {
      applyFiltersToUrl(newFilters);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: 'All Categories',
      workMode: 'All Modes',
      experience: 'All Experiences',
      type: 'All Types',
    });
    setSearchParams({});
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-outfit">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" /> Filters
                </h3>
                <button onClick={handleClearFilters} className="text-sm text-blue-600 font-bold hover:underline">Clear All</button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Quick Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input type="text" name="search" value={filters.search} onChange={handleFilterChange} className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/20" placeholder="Title or keyword" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input type="text" name="location" value={filters.location} onChange={handleFilterChange} className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/20" placeholder="City or remote" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Category</label>
                  <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/20">
                    <option>All Categories</option>
                    <option>IT & Software</option>
                    <option>Core Engineering</option>
                    <option>Banking & Finance</option>
                    <option>Human Resources</option>
                    <option>Management</option>
                    <option>Marketing & Sales</option>
                    <option>Startups/Ops</option>
                    <option>Design & Creative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Experience Level</label>
                  <select name="experience" value={filters.experience} onChange={handleFilterChange} className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/20">
                    <option>All Experiences</option>
                    <option>Fresher</option>
                    <option>1-2 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Job Type</label>
                  <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/20">
                    <option>All Types</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Work Mode</label>
                  <select name="workMode" value={filters.workMode} onChange={handleFilterChange} className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/20">
                    <option>All Modes</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>Onsite</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">Discover Jobs</h2>
                <p className="text-gray-600 font-medium flex items-center gap-2">
                  Showing <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">{totalJobs}</span> 
                  {(filters.search || filters.location || filters.category !== 'All Categories' || filters.workMode !== 'All Modes' || filters.experience !== 'All Experiences' || filters.type !== 'All Types') 
                    ? " results matching your criteria" 
                    : " available positions"}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100">
                <Zap className="w-4 h-4 fill-blue-700" />
                Latest Postings
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job) => <JobCard key={job._id} job={job} />)}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="flex items-center gap-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 disabled:opacity-30 transition shadow-sm font-bold text-gray-700"><ChevronLeft className="w-5 h-5" /> Previous</button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map(page => (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`w-11 h-11 rounded-xl font-black text-sm transition-all ${currentPage === page ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110" : "bg-white border border-gray-200 hover:bg-gray-100"}`}>{page}</button>
                      ))}
                    </div>
                    <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="flex items-center gap-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-100 disabled:opacity-30 transition shadow-sm font-bold text-gray-700">Next <ChevronRight className="w-5 h-5" /></button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white p-24 text-center rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">No matching jobs found</h3>
                <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">We couldn't find any positions matching your current filters. Try broadening your search or resetting all filters.</p>
                <button onClick={handleClearFilters} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition active:scale-95">Reset All Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
