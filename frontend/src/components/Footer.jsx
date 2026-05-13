import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div>
          <Link to="/" className="text-2xl font-black flex items-center gap-2 mb-4 text-white tracking-tighter">
            <div className="bg-blue-500 text-white p-1.5 rounded-xl shadow-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            Remote Jobs
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            The world's most premium multi-domain job portal. Connecting global talent with opportunities in Software, Banking, MNCs, and more.
          </p>
        </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Candidates</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/jobs" className="hover:text-white transition">Browse Jobs</Link></li>
            <li><Link to="/companies" className="hover:text-white transition">Browse Companies</Link></li>
            <li><Link to="/signup" className="hover:text-white transition">Create Account</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Employers</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/signup" className="hover:text-white transition">Post a Job</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition">Hire Talent</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition">Employer Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/how-it-works" className="hover:text-white transition">How it Works</Link></li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Remote Jobs Portal. Professional, Reliable, Worldwide.</p>
      </div>
    </footer>
  );
};

export default Footer;
