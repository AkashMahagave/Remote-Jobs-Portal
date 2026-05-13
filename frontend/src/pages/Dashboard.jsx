import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { 
  Briefcase, Plus, Mail, 
  MapPin, Trash2, FileText,
  ChevronRight, Users, ArrowLeft
} from "lucide-react";
import CompanyLogo from "../components/CompanyLogo";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(user?.role === "employer" ? "manage-jobs" : "applied-jobs");
  
  const [myJobs, setMyJobs] = useState([]); 
  const [myApplications, setMyApplications] = useState([]); 
  const [selectedJobApps, setSelectedJobApps] = useState(null); // For viewing applicants
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [newJob, setNewJob] = useState({
    title: "", companyName: "", location: "", salary: "",
    type: "Full-time", workMode: "Remote", category: "IT & Software",
    experience: "Fresher", description: "", skills: ""
  });

  useEffect(() => {
    fetchDashboardData();
  }, [user, activeTab]);

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    // No backend - dashboard shows empty state for demo
    setMyJobs([]);
    setMyApplications([]);
    setLoading(false);
  };

  const fetchJobApplicants = async (jobId) => {
    setSelectedJobApps({ jobId, apps: [] });
    setActiveTab("view-applicants");
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate posting (no backend)
    await new Promise(r => setTimeout(r, 500));
    alert("Demo mode: Job posting simulated successfully!");
    setNewJob({
      title: "", companyName: "", location: "", salary: "",
      type: "Full-time", workMode: "Remote", category: "IT & Software",
      experience: "Fresher", description: "", skills: ""
    });
    setActiveTab("manage-jobs");
    setSubmitting(false);
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    setMyJobs(myJobs.filter(j => j._id !== id));
  };

  const handleDeleteApplication = async (appId) => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) return;
    setMyApplications(myApplications.filter(a => a._id !== appId));
  };

  if (!user) return <div className="text-center py-20">Please log in.</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-outfit">
      <div className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-white">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
              <p className="text-slate-400 font-medium">{user.email} · {user.role}</p>
            </div>
          </div>
          <div className="flex gap-4">
            {user.role === "employer" ? (
              <>
                <button onClick={() => { setActiveTab("manage-jobs"); setSelectedJobApps(null); }} className={`px-6 py-2.5 rounded-xl font-bold text-sm ${activeTab === 'manage-jobs' ? 'bg-white text-slate-900' : 'text-slate-400'}`}>My Listings</button>
                <button onClick={() => { setActiveTab("post-job"); setSelectedJobApps(null); }} className={`px-6 py-2.5 rounded-xl font-bold text-sm ${activeTab === 'post-job' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>Post Job</button>
              </>
            ) : (
              <button onClick={() => setActiveTab("applied-jobs")} className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm">My Applications</button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          {activeTab === "manage-jobs" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Manage Your Listings</h2>
              {loading ? <p className="text-center py-10">Loading...</p> : myJobs.length > 0 ? (
                myJobs.map(job => (
                  <div key={job._id} className="flex flex-col md:flex-row items-center justify-between p-6 border rounded-xl gap-6 group hover:border-blue-200 transition">
                    <div className="flex items-center gap-4">
                      <CompanyLogo companyName={job.companyName} size={50} />
                      <div>
                        <h3 className="font-bold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => fetchJobApplicants(job._id)} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-sm hover:bg-blue-100 transition">
                        <Users className="w-4 h-4" /> Applicants
                      </button>
                      <button onClick={() => handleDeleteJob(job._id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                ))
              ) : <p className="text-center py-10">No jobs listed yet.</p>}
            </div>
          )}

          {activeTab === "view-applicants" && selectedJobApps && (
            <div className="space-y-6">
              <button onClick={() => setActiveTab("manage-jobs")} className="flex items-center gap-2 text-blue-600 font-bold mb-6 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Listings
              </button>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Applicants for this position</h2>
              {selectedJobApps.apps.length > 0 ? (
                selectedJobApps.apps.map(app => (
                  <div key={app._id} className="p-6 border rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{app.applicant?.name}</h3>
                      <p className="text-sm text-gray-500">{app.applicant?.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <a href="#" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition">
                        <FileText className="w-4 h-4" /> View Resume
                      </a>
                    </div>
                  </div>
                ))
              ) : <p className="text-center py-20 text-gray-400">No one has applied yet.</p>}
            </div>
          )}

          {activeTab === "post-job" && (
            <form onSubmit={handlePostJob} className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Post a New Opportunity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Job Title" required className="w-full p-3 border rounded-lg" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                <input type="text" placeholder="Company Name" required className="w-full p-3 border rounded-lg" value={newJob.companyName} onChange={e => setNewJob({...newJob, companyName: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Location" required className="w-full p-3 border rounded-lg" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} />
                <input type="text" placeholder="Salary (e.g. ₹8L - ₹12L)" required className="w-full p-3 border rounded-lg" value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select className="w-full p-3 border rounded-lg" value={newJob.category} onChange={e => setNewJob({...newJob, category: e.target.value})}>
                  <option>IT & Software</option>
                  <option>Core Engineering</option>
                  <option>Banking & Finance</option>
                  <option>Human Resources</option>
                  <option>Management</option>
                  <option>Marketing & Sales</option>
                  <option>Startups/Ops</option>
                  <option>Design & Creative</option>
                </select>
                <select className="w-full p-3 border rounded-lg" value={newJob.experience} onChange={e => setNewJob({...newJob, experience: e.target.value})}>
                  <option>Fresher</option>
                  <option>1-2 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <select className="w-full p-3 border rounded-lg" value={newJob.workMode} onChange={e => setNewJob({...newJob, workMode: e.target.value})}>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Onsite</option>
                </select>
                <select className="w-full p-3 border rounded-lg" value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value})}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
              <textarea placeholder="Job Description" rows="5" required className="w-full p-3 border rounded-lg" value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} />
              <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg">
                {submitting ? "Processing..." : "Post Job Listing"}
              </button>
            </form>
          )}

          {activeTab === "applied-jobs" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 mb-8">Track Your Applications</h2>
              {loading ? <p className="text-center py-10">Loading...</p> : myApplications.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myApplications.map(app => (
                    <div key={app._id} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex items-start justify-between mb-6">
                        <CompanyLogo companyName={app.job?.companyName} size={64} className="rounded-2xl shadow-sm group-hover:scale-105 transition-transform shrink-0" />
                        <span className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider rounded-full shadow-sm ${app.status === 'Applied' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
                          {app.status || 'Applied'}
                        </span>
                      </div>
                      <div className="mb-6">
                        <h3 className="font-black text-gray-900 text-xl mb-2 line-clamp-2 leading-tight">{app.job?.title}</h3>
                        <p className="text-sm font-bold text-gray-500 mb-1">{app.job?.companyName}</p>
                        <p className="text-sm font-medium text-gray-400 flex items-center gap-1.5"><MapPin className="w-4 h-4 shrink-0" />{app.job?.location || "Remote"}</p>
                      </div>
                      <div className="mt-auto flex items-center gap-3 pt-6 border-t border-gray-100">
                        <a href="#" className="flex-1 flex justify-center items-center gap-2 py-3 bg-gray-50 text-gray-700 rounded-xl font-bold hover:bg-gray-100 hover:text-blue-600 transition">
                          <FileText className="w-4 h-4" /> View Resume
                        </a>
                        <button onClick={() => handleDeleteApplication(app._id)} className="p-3 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition shadow-sm" title="Withdraw Application">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-center py-20 text-gray-400 font-bold">You haven't applied for any jobs yet.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
