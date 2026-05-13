import { Link } from "react-router-dom";
import { 
  MapPin, Banknote, Briefcase, Clock, 
  ChevronRight 
} from "lucide-react";
import CompanyLogo from "./CompanyLogo";

const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1d ago";
  return `${diffDays}d ago`;
};

const JobCard = ({ job }) => {
  const companyName = job.company?.name || job.companyName || "Company";

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col h-full relative group">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5 pt-2">
        <CompanyLogo companyName={companyName} size={48} />
        <div className="flex-grow">
          <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{job.title}</h3>
          <p className="text-sm text-gray-500 font-medium">{companyName}</p>
        </div>
        {job.createdAt && (
          <div className="text-xs font-medium text-gray-400 whitespace-nowrap">
            {timeAgo(job.createdAt)}
          </div>
        )}
      </div>
      
      {/* Job Details */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
          <MapPin className="w-4 h-4 text-gray-400" /> {job.location}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
          <Banknote className="w-4 h-4 text-gray-400" /> {job.salary}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
          <Briefcase className="w-4 h-4 text-gray-400" /> {job.experience}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
          <Clock className="w-4 h-4 text-gray-400" /> {job.type}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-5 border-t border-gray-50 flex items-center justify-between">
        <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
          job.workMode === 'Remote' ? 'bg-green-50 text-green-700' : 
          job.workMode === 'Hybrid' ? 'bg-purple-50 text-purple-700' : 'bg-orange-50 text-orange-700'
        }`}>
          {job.workMode}
        </span>
        <Link 
          to={`/jobs/${job._id}`} 
          className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
        >
          View Details <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
