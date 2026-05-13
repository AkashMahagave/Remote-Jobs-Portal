import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Briefcase, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";

const Login = () => {
  const [loginMethod, setLoginMethod] = useState("email"); // 'email' or 'phone'
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMethodSwitch = (method) => {
    setLoginMethod(method);
    setIdentifier("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(identifier, password, loginMethod);
    setLoading(false);
    if (res.success) {
      navigate("/dashboard");
    } else {
      // Clean, friendly error messages
      const msg = res.message || "";
      if (msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("credentials") || msg.toLowerCase().includes("password")) {
        setError(loginMethod === "phone"
          ? "The phone number or password you entered is incorrect. Please try again."
          : "The email or password you entered is incorrect. Please try again."
        );
      } else if (msg.toLowerCase().includes("not found") || msg.toLowerCase().includes("no user")) {
        setError(loginMethod === "phone"
          ? "No account found with this phone number. Please register first."
          : "No account found with this email address. Please register first."
        );
      } else if (msg.toLowerCase().includes("provide")) {
        setError("Please enter your credentials and password.");
      } else {
        setError(msg || "Something went wrong. Please try again.");
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
          <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2 font-medium">Sign in to your Remote Jobs account</p>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 text-center">Login Options</label>
          {/* Login Method Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            type="button"
            onClick={() => handleMethodSwitch("email")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition ${
              loginMethod === "email"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Mail className="w-4 h-4" /> Email
          </button>
          <button
            type="button"
            onClick={() => handleMethodSwitch("phone")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition ${
              loginMethod === "phone"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Phone className="w-4 h-4" /> Phone
          </button>
        </div>
      </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-2xl mb-6 text-sm border border-red-100 flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {loginMethod === "email" ? "Email Address" : "Phone Number"}
            </label>
            <div className="relative">
              {loginMethod === "email" ? (
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              ) : (
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              )}
              <input
                type={loginMethod === "email" ? "email" : "tel"}
                required
                autoComplete="off"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800"
                placeholder={loginMethod === "email" ? "you@example.com" : "+91 9876543210"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">Password</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-black py-3.5 rounded-xl transition shadow-lg shadow-blue-200 text-sm uppercase tracking-wider"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>


        <p className="text-center mt-6 text-gray-500 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create one free</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
