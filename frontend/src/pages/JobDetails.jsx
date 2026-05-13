import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  MapPin, Briefcase, Banknote, Calendar, ArrowLeft, 
  CheckCircle, Upload, FileText, LogIn
} from "lucide-react";
import { getJobById } from "../data/staticData";
import { AuthContext } from "../context/AuthContext";
import CompanyLogo from "../components/CompanyLogo";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    // Use static data instead of API call
    const foundJob = getJobById(id);
    setJob(foundJob);
    setLoading(false);
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    
    setApplying(true);
    setError("");
    try {
      // Simulate application submission (no backend)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setApplied(true);
    } catch (err) {
      setError("Failed to submit application.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading job details...</div>;
  if (!job) return <div className="text-center py-20">Job not found</div>;

  const companyName = job.company?.name || job.companyName || 'Company';

  return (
    <div className="bg-gray-50 min-h-screen py-10 font-outfit">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/jobs" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center gap-6 mb-6">
                  <CompanyLogo companyName={companyName} size={80} className="rounded-2xl shadow-sm" />
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <p className="text-lg font-bold text-blue-600">{companyName}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</div>
                  <div className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.type}</div>
                  <div className="flex items-center gap-1.5"><Banknote className="w-4 h-4" /> {job.salary}</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Job Description</h3>
                <div className="whitespace-pre-wrap text-gray-600 leading-relaxed font-medium">
                  {job.description}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Apply</h3>
              {applied ? (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-8 rounded-2xl text-center shadow-sm">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                  <h4 className="text-xl font-black mb-2">Application Submitted!</h4>
                  <p className="text-emerald-600 font-medium mb-6">Your resume has been successfully sent to the employer.</p>
                  <Link to="/dashboard" className="inline-block w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 shadow-md shadow-emerald-200 transition">
                    Go to Application Dashboard
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-6">
                  {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
                  {!user ? (
                    <div className="text-center">
                      <p className="text-gray-500 mb-6">Log in to apply for this position.</p>
                      <Link to="/login" className="block w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition">Login to Apply</Link>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-widest">Upload Resume (PDF)</label>
                        <div 
                          onClick={() => document.getElementById('resume-upload').click()}
                          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${resumeFile ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'}`}
                        >
                          <Upload className={`w-10 h-10 mx-auto mb-4 transition-colors ${resumeFile ? 'text-blue-600' : 'text-gray-400'}`} />
                          <p className={`font-medium ${resumeFile ? 'text-blue-700' : 'text-gray-600'}`}>
                            {resumeFile ? resumeFile.name : "Click to choose a file"}
                          </p>
                          {!resumeFile && <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-wider">PDF files only (Max 5MB)</p>}
                          <input id="resume-upload" type="file" accept=".pdf" required onChange={(e) => setResumeFile(e.target.files[0])} className="hidden" />
                        </div>
                      </div>
                      <button type="submit" disabled={applying || !resumeFile} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition">
                        {applying ? "Applying..." : "Submit Application"}
                      </button>
                    </>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
