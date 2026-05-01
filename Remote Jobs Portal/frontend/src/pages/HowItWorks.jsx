import React from 'react';
import { 
  Search, Send, LayoutDashboard, 
  CheckCircle, Briefcase, UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="bg-white min-h-screen font-outfit">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">How It Works</h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            A simple, streamlined process designed to connect top talent with industry-leading companies efficiently.
          </p>
        </div>
      </section>

      {/* How to Register Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">How to Register</h2>
            <p className="text-gray-500 font-medium text-lg md:text-xl max-w-2xl mx-auto">Create your account in just a few clicks and unlock thousands of premium remote opportunities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 z-0"></div>
            
            <div className="bg-white p-10 rounded-[2.5rem] text-center border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-4 transition-all duration-500 relative z-10 group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-black shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Click Sign Up</h3>
              <p className="text-gray-500 leading-relaxed">Navigate to our signup page from the top menu or via the get started buttons.</p>
            </div>
            
            <div className="bg-white p-10 rounded-[2.5rem] text-center border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-4 transition-all duration-500 relative z-10 group">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-black shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fill Details</h3>
              <p className="text-gray-500 leading-relaxed">Enter your basic information and choose your account type (Job Seeker or Employer).</p>
            </div>
            
            <div className="bg-white p-10 rounded-[2.5rem] text-center border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-4 transition-all duration-500 relative z-10 group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl font-black shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome Aboard</h3>
              <p className="text-gray-500 leading-relaxed">Submit the form and instantly gain access to your personalized dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Process Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden border-t border-gray-100">
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Login Process</h2>
            <p className="text-gray-500 font-medium text-lg md:text-xl max-w-2xl mx-auto">Securely access your account to pick up right where you left off.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/30 border border-gray-100 text-center relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <LayoutDashboard className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Authenticate</h3>
              <p className="text-gray-500 leading-relaxed">Click on the Login button and securely enter your registered email address and password.</p>
            </div>
            
            {/* Connector */}
            <div className="hidden md:flex flex-col justify-center items-center px-4">
              <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 text-emerald-500 z-10">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="w-1 h-24 bg-gradient-to-b from-transparent via-emerald-200 to-transparent absolute -z-0"></div>
            </div>
            
            {/* Step 2 */}
            <div className="flex-1 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/30 border border-gray-100 text-center relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Briefcase className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Access Dashboard</h3>
              <p className="text-gray-500 leading-relaxed">Enter your tailored dashboard where you can apply for jobs or manage candidate applications instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Job Seekers */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">For Job Seekers</h2>
            <p className="text-gray-500 font-medium text-lg">Your journey to a dream job in four simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-100 via-emerald-100 to-purple-100 -translate-y-1/2 z-0"></div>
            
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg border border-gray-100 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 relative z-10">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <UserPlus className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Register & Login</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Create a free account as a job seeker and login. Build your profile by uploading your latest resume and details.
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg border border-gray-100 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 relative z-10">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Search className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Find Opportunities</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Browse through hundreds of premium remote jobs. Use our advanced filters to find the perfect match for your skills.
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg border border-gray-100 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 relative z-10">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Send className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. Apply & Track</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Apply instantly with a single click. Track all your applications and their statuses directly from your personalized dashboard.
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg border border-gray-100 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 relative z-10">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">4. Get Hired</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Connect directly with top employers, ace your interviews, and secure your dream remote job globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-4">For Employers</h2>
            <p className="text-gray-500 font-medium text-lg">Find top talent for your company seamlessly</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-orange-100 via-pink-100 to-teal-100 -translate-y-1/2 z-0"></div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg border border-gray-100 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 relative z-10">
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <UserPlus className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Register & Login</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sign up as an employer and login. Set up your official company profile to attract premium candidates.
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg border border-gray-100 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 relative z-10">
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Briefcase className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Post Jobs</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Create detailed job listings specifying roles, requirements, and benefits to reach our global talent pool.
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg border border-gray-100 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 relative z-10">
              <div className="bg-gradient-to-br from-teal-100 to-teal-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <LayoutDashboard className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. Manage Applications</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Review applicant profiles, download resumes, and manage the hiring pipeline directly from your dashboard.
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg border border-gray-100 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 relative z-10">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">4. Hire Top Talent</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Interview selected candidates and seamlessly onboard the best fit for your team and company culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Ready to land your dream job?</h2>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 transition">Get Started Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
