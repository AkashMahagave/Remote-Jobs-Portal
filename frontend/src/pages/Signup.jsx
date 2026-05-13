import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Briefcase, Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "jobseeker",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    const res = await register(formData.name, formData.email, formData.password, formData.role, formData.phone);
    setLoading(false);
    if (res.success) {
      navigate("/dashboard");
    } else {
      const msg = res.message || "";
      if (msg.toLowerCase().includes("exists")) {
        setError("An account with this email already exists. Please login instead.");
      } else if (msg.toLowerCase().includes("phone")) {
        setError("This phone number is already registered. Please use a different one.");
      } else if (msg.toLowerCase().includes("validation")) {
        setError("Please check your details — all fields are required.");
      } else {
        setError(msg || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-[calc(100vh-100px)]">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Briefcase className="w-7 h-7" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2 font-medium">Join Remote Jobs — free forever</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6 text-sm border border-red-100 flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                autoComplete="off"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800"
                placeholder="e.g. +91 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password <span className="text-gray-400 font-normal">(min. 6 characters)</span></label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength="6"
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">I am a...</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`border-2 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition gap-2 ${formData.role === 'jobseeker' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                <input type="radio" name="role" value="jobseeker" className="hidden" checked={formData.role === 'jobseeker'} onChange={handleChange} />
                <span className="text-2xl">👤</span>
                <span className="font-bold text-sm">Job Seeker</span>
              </label>
              <label className={`border-2 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition gap-2 ${formData.role === 'employer' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                <input type="radio" name="role" value="employer" className="hidden" checked={formData.role === 'employer'} onChange={handleChange} />
                <span className="text-2xl">🏢</span>
                <span className="font-bold text-sm">Employer</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-black py-3.5 rounded-xl transition shadow-lg shadow-blue-200 text-sm uppercase tracking-wider mt-2"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
