import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Zap, Sparkles, Shield, BarChart3, ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("sarah.mitchell@insurecorp.com");
  const [password, setPassword] = useState("••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    navigate("/workspace");
  };

  const features = [
    { icon: Sparkles, text: "AI-Powered Claim Triage" },
    { icon: Shield, text: "Real-Time Fraud Detection" },
    { icon: BarChart3, text: "Intelligent Analytics" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel */}
      <div
        className="flex-1 hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "var(--sidebar)" }}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundColor: "color-mix(in srgb, var(--primary) 12%, transparent)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: "var(--primary)", transform: "translate(30%, -30%)" }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{ width: 48, height: 48, background: "var(--primary)" }}
          >
            <Zap size={24} className="text-primary-foreground" />
          </div>
          <div>
            <p className="text-primary-foreground" style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", lineHeight: 1.2 }}>ClaimAI</p>
            <p style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)", fontSize: "var(--fs-body-sm)" }}>Enterprise Claims Platform</p>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
              style={{ background: "color-mix(in srgb, var(--primary) 15%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)" }}
            >
              <Sparkles size={14} style={{ color: "var(--inverse-primary)" }} />
              <span style={{ color: "var(--inverse-primary)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--font-weight-medium)" }}>AI-Powered Platform</span>
            </div>
            <h1
              className="mb-4"
              style={{ color: "var(--primary-foreground)", fontSize: "var(--fs-display-sm)", fontWeight: "var(--font-weight-medium)", lineHeight: 1.2 }}
            >
              Transform Your
              <br />
              <span style={{ background: "var(--inverse-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Claims Operations
              </span>
            </h1>
            <p style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)", fontSize: "var(--fs-body-lg)", lineHeight: 1.6, maxWidth: 400 }}>
              Reduce claims processing time by 50% with AI-powered automation, intelligent fraud detection, and real-time insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3 mt-8"
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{ width: 32, height: 32, background: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
                  >
                    <Icon size={16} style={{ color: "var(--inverse-primary)" }} />
                  </div>
                  <span style={{ color: "var(--outline-variant)", fontSize: "var(--fs-body-md)" }}>{f.text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative flex gap-8"
        >
          {[
            { value: "50%", label: "Faster Processing" },
            { value: "30%", label: "Cost Reduction" },
            { value: "25%", label: "Less Fraud" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-primary-foreground mb-0.5" style={{ fontSize: "var(--fs-headline-sm)", fontWeight: "var(--font-weight-medium)" }}>{s.value}</p>
              <p style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)", fontSize: "var(--fs-body-sm)" }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div
        className="flex items-center justify-center p-8 lg:p-12"
        style={{ width: "100%", maxWidth: 480, background: "var(--card)", flexShrink: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{ width: 40, height: 40, background: "var(--primary)" }}
            >
              <Zap size={20} className="text-primary-foreground" />
            </div>
            <span style={{ fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-title-lg)", color: "var(--foreground)" }}>ClaimAI</span>
          </div>

          <h2 className="mb-1" style={{ color: "var(--foreground)", fontSize: "var(--fs-headline-md)", fontWeight: "var(--font-weight-medium)" }}>Welcome back</h2>
          <p className="mb-8" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>Sign in to your workspace</p>

          {error && (
            <div className="rounded-lg px-4 py-3 mb-4" style={{ background: "var(--destructive-container)", border: "1px solid var(--destructive-container)" }}>
              <p className="text-sm" style={{ color: "var(--destructive)" }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl px-4 text-sm outline-none transition-all"
                style={{
                  height: 44,
                  border: "1.5px solid var(--border)",
                  background: "var(--surface-container-low)",
                  color: "var(--foreground)",
                  fontSize: "var(--fs-body-md)",
                }}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Password</label>
                <button type="button" className="text-xs" style={{ color: "var(--primary)" }}>Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl px-4 pr-11 text-sm outline-none transition-all"
                  style={{
                    height: 44,
                    border: "1.5px solid var(--border)",
                    background: "var(--surface-container-low)",
                    color: "var(--foreground)",
                    fontSize: "var(--fs-body-md)",
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} style={{ color: "var(--outline)" }} /> : <Eye size={16} style={{ color: "var(--outline)" }} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center justify-center rounded flex-shrink-0 transition-colors"
                style={{
                  width: 18,
                  height: 18,
                  border: rememberMe ? "none" : "1.5px solid var(--outline-variant)",
                  background: rememberMe ? "var(--primary)" : "transparent",
                }}
              >
                {rememberMe && <Check size={12} className="text-primary-foreground" />}
              </button>
              <span className="text-sm" style={{ color: "var(--on-surface-variant)" }}>Remember me for 30 days</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl text-primary-foreground transition-all hover:opacity-90"
              style={{
                height: 44,
                background: loading ? "var(--inverse-primary)" : "var(--primary)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full" style={{ width: 16, height: 16, border: "2px solid color-mix(in srgb, var(--card) 30%, transparent)", borderTopColor: "var(--primary-foreground)" }} />
                  <span className="text-sm">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="text-sm">Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs" style={{ color: "var(--outline)" }}>OR</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          <button
            onClick={() => navigate("/workspace")}
            className="w-full flex items-center justify-center gap-2 rounded-xl text-sm transition-all hover:bg-surface-container-low"
            style={{ height: 44, border: "1.5px solid var(--border)", color: "var(--on-surface-variant)", background: "var(--card)" }}
          >
            <Shield size={16} style={{ color: "var(--muted-foreground)" }} />
            Sign in with SSO
          </button>

          <p className="mt-8 text-center text-xs" style={{ color: "var(--outline)" }}>
            By signing in, you agree to our{" "}
            <span style={{ color: "var(--primary)" }}>Terms of Service</span> and{" "}
            <span style={{ color: "var(--primary)" }}>Privacy Policy</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}