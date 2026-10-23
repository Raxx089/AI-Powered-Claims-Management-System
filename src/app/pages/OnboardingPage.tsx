import { useState } from "react";
import { useNavigate } from "react-router";
import {
  User, Briefcase, Bell, CheckCircle, ArrowRight, ArrowLeft, Zap,
  Shield, BarChart3, FileText, Users, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const steps = [
  { id: 1, label: "Profile", icon: User },
  { id: 2, label: "Role", icon: Briefcase },
  { id: 3, label: "Preferences", icon: Bell },
  { id: 4, label: "Ready", icon: CheckCircle },
];

const roles = [
  { id: "adjuster", label: "Claims Adjuster", description: "Review and process individual claims", icon: FileText, color: "var(--primary)" },
  { id: "manager", label: "Operations Manager", description: "Oversee team performance and workflows", icon: Users, color: "var(--violet)" },
  { id: "fraud", label: "Fraud Analyst", description: "Investigate suspicious claims and patterns", icon: Shield, color: "var(--destructive)" },
  { id: "executive", label: "Insurance Executive", description: "Monitor KPIs and strategic insights", icon: BarChart3, color: "var(--success)" },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({ firstName: "Sarah", lastName: "Mitchell", jobTitle: "Senior Claims Adjuster", phone: "+1 (555) 234-5678" });
  const [selectedRole, setSelectedRole] = useState("adjuster");
  const [notifications, setNotifications] = useState({ email: true, slack: false, sms: true, fraudAlerts: true, settlementUpdates: true, aiInsights: true });

  const canContinue = step === 1 ? (profile.firstName && profile.lastName) : step === 2 ? !!selectedRole : true;

  const handleFinish = async () => {
    navigate("/app/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--surface-container-low)" }}
    >
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-2xl"
              style={{ width: 44, height: 44, background: "var(--primary)" }}
            >
              <Zap size={22} className="text-primary-foreground" />
            </div>
            <span style={{ fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-title-lg)", color: "var(--foreground)" }}>ClaimAI</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = s.id === step;
            const isDone = s.id < step;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="flex items-center justify-center rounded-full mb-1 transition-all"
                    style={{
                      width: 36,
                      height: 36,
                      background: isDone ? "var(--success)" : isActive ? "var(--primary)" : "var(--border)",
                    }}
                  >
                    {isDone ? (
                      <CheckCircle size={16} className="text-primary-foreground" />
                    ) : (
                      <Icon size={16} style={{ color: isActive ? "var(--primary-foreground)" : "var(--outline)" }} />
                    )}
                  </div>
                  <span className="text-xs" style={{ color: isActive ? "var(--primary)" : isDone ? "var(--success)" : "var(--outline)", fontWeight: isActive ? 600 : 400 }}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="h-px mb-5"
                    style={{ width: 60, background: s.id < step ? "var(--success)" : "var(--border)", marginTop: "-2px" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="rounded-2xl shadow-sm overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="mb-1" style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Set Up Your Profile</h2>
                <p className="mb-6" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>Help your team know who you are</p>

                <div className="flex justify-center mb-6">
                  <div
                    className="flex items-center justify-center rounded-full text-primary-foreground cursor-pointer"
                    style={{ width: 80, height: 80, background: "var(--success)", fontSize: "var(--fs-headline-sm)", fontWeight: "var(--font-weight-medium)" }}
                  >
                    SM
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "firstName", label: "First Name" },
                    { key: "lastName", label: "Last Name" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>{label}</label>
                      <input
                        value={profile[key as keyof typeof profile]}
                        onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                        className="w-full rounded-xl px-4 text-sm outline-none"
                        style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                      />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Job Title</label>
                    <input
                      value={profile.jobTitle}
                      onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                      className="w-full rounded-xl px-4 text-sm outline-none"
                      style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Phone Number</label>
                    <input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full rounded-xl px-4 text-sm outline-none"
                      style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="mb-1" style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Select Your Role</h2>
                <p className="mb-6" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>This helps us personalize your experience and dashboard</p>

                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.id;
                    return (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className="text-left p-4 rounded-xl transition-all"
                        style={{
                          border: isSelected ? `2px solid ${role.color}` : "2px solid var(--surface-container)",
                          background: isSelected ? `color-mix(in srgb, ${role.color} 3%, transparent)` : "var(--surface-container-low)",
                        }}
                      >
                        <div
                          className="flex items-center justify-center rounded-xl mb-3"
                          style={{ width: 40, height: 40, background: `color-mix(in srgb, ${role.color} 8%, transparent)` }}
                        >
                          <Icon size={18} style={{ color: role.color }} />
                        </div>
                        <p className="text-sm mb-1" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{role.label}</p>
                        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{role.description}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8"
              >
                <h2 className="mb-1" style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Notification Preferences</h2>
                <p className="mb-6" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>Stay informed about what matters most</p>

                <div className="space-y-4">
                  {[
                    { key: "email", label: "Email Notifications", desc: "Daily digest and important updates" },
                    { key: "sms", label: "SMS Alerts", desc: "Critical claims and fraud alerts" },
                    { key: "fraudAlerts", label: "Fraud Alerts", desc: "Immediate notification of suspicious activity" },
                    { key: "settlementUpdates", label: "Settlement Updates", desc: "Status changes on claims you manage" },
                    { key: "aiInsights", label: "AI Insights", desc: "Weekly AI-powered recommendations and patterns" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--surface-container-low)" }}>
                      <div>
                        <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{label}</p>
                        <p className="text-xs" style={{ color: "var(--outline)" }}>{desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] })}
                        className="rounded-full transition-all flex-shrink-0"
                        style={{
                          width: 40,
                          height: 22,
                          background: notifications[key as keyof typeof notifications] ? "var(--primary)" : "var(--outline-variant)",
                          position: "relative",
                        }}
                      >
                        <span
                          className="absolute top-0.5 rounded-full bg-card transition-all"
                          style={{
                            width: 18,
                            height: 18,
                            left: notifications[key as keyof typeof notifications] ? "20px" : "2px",
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 80, height: 80, background: "var(--success)" }}
                  >
                    <CheckCircle size={40} className="text-primary-foreground" />
                  </motion.div>
                </div>
                <h2 className="mb-2" style={{ fontSize: "var(--fs-headline-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>You're all set!</h2>
                <p className="mb-8" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>
                  Welcome to ClaimAI, {profile.firstName}. Your workspace is ready.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { icon: Sparkles, label: "AI Triage", desc: "Auto-classifying claims", color: "var(--violet)" },
                    { icon: Shield, label: "Fraud Guard", desc: "Monitoring all claims", color: "var(--destructive)" },
                    { icon: BarChart3, label: "Analytics", desc: "Dashboard ready", color: "var(--success)" },
                  ].map(({ icon: Icon, label, desc, color }) => (
                    <div key={label} className="p-3 rounded-xl text-center" style={{ background: "var(--surface-container-low)", border: "1px solid var(--surface-container)" }}>
                      <div
                        className="flex items-center justify-center rounded-lg mx-auto mb-2"
                        style={{ width: 36, height: 36, background: `color-mix(in srgb, ${color} 8%, transparent)` }}
                      >
                        <Icon size={16} style={{ color }} />
                      </div>
                      <p className="text-xs mb-0.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{label}</p>
                      <p style={{ fontSize: "var(--fs-label-sm)", color: "var(--outline)" }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Navigation */}
          <div
            className="flex items-center justify-between px-8 py-4"
            style={{ borderTop: "1px solid var(--surface-container)", background: "var(--surface-container-low)" }}
          >
            <button
              onClick={() => step > 1 ? setStep(step - 1) : navigate("/workspace")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors hover:bg-card"
              style={{ color: "var(--muted-foreground)", border: "1px solid var(--border)", background: "transparent" }}
            >
              <ArrowLeft size={14} />
              Back
            </button>

            <span className="text-xs" style={{ color: "var(--outline)" }}>Step {step} of {steps.length}</span>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canContinue}
                className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm text-primary-foreground transition-all hover:opacity-90"
                style={{
                  background: canContinue ? "var(--primary)" : "var(--outline-variant)",
                  cursor: canContinue ? "pointer" : "not-allowed",
                }}
              >
                Continue
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm text-primary-foreground transition-all hover:opacity-90"
                style={{ background: "var(--success)" }}
              >
                Go to Dashboard
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}