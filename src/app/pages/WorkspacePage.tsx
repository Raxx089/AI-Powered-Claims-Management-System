import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Users, FileText, Plus, ArrowRight, Zap, LogOut, Check,
  Shield, BarChart3, Sparkles, Activity, AlertTriangle,
  CheckCircle, Clock, TrendingUp, Globe, ChevronRight,
  Building2, X, Mail, UserPlus, Settings, Star, Bell,
  Search, MapPin, Briefcase, Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { workspaces, currentUser, workspaceActivity, workspaceTeams } from "../data/mockData";

// ─── Types ────────────────────────────────────────────────────────────────────
type CreateStep = 1 | 2 | 3;

interface NewWorkspace {
  name: string;
  industry: string;
  size: string;
  plan: string;
  invites: string[];
  aiFeatures: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const activityIcon: Record<string, React.ReactNode> = {
  fraud: <AlertTriangle size={11} style={{ color: "var(--destructive)" }} />,
  ai: <Sparkles size={11} style={{ color: "var(--violet)" }} />,
  approved: <CheckCircle size={11} style={{ color: "var(--success)" }} />,
  submitted: <FileText size={11} style={{ color: "var(--primary)" }} />,
  document: <FileText size={11} style={{ color: "var(--warning)" }} />,
  settled: <CheckCircle size={11} style={{ color: "var(--success)" }} />,
  reviewed: <Eye size={11} style={{ color: "var(--muted-foreground)" }} />,
};

const activityBg: Record<string, string> = {
  fraud: "var(--destructive-container)",
  ai: "var(--violet-container)",
  approved: "var(--success-container)",
  submitted: "var(--accent)",
  document: "var(--warning-container)",
  settled: "var(--success-container)",
  reviewed: "var(--surface-container-low)",
};

const statusDot: Record<string, string> = {
  online: "var(--success)",
  away: "var(--warning)",
  offline: "var(--outline)",
};

const industries = [
  "Property & Casualty", "Auto & Life", "Commercial & Liability",
  "Health & Dental", "Travel & Specialty", "Reinsurance",
];

const companySizes = ["1–10", "11–50", "51–200", "201–500", "500+"];

const aiFeatureOptions = [
  { id: "triage", label: "AI Claim Triage", desc: "Auto-classify and prioritize claims", icon: Sparkles, color: "var(--violet)" },
  { id: "fraud", label: "Fraud Detection", desc: "Real-time fraud pattern analysis", icon: Shield, color: "var(--destructive)" },
  { id: "ocr", label: "Document OCR", desc: "Extract data from uploaded documents", icon: FileText, color: "var(--primary)" },
  { id: "analytics", label: "Predictive Analytics", desc: "AI-driven insights and forecasting", icon: BarChart3, color: "var(--success)" },
  { id: "autosettle", label: "Auto-Settlement", desc: "Fast-track low-risk claim payouts", icon: CheckCircle, color: "var(--warning)" },
];

// ─── Entering Overlay ─────────────────────────────────────────────────────────
function EnteringOverlay({ workspace }: { workspace: typeof workspaces[0] }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = [
    "Authenticating workspace…",
    "Loading AI models…",
    "Syncing claims data…",
    "Preparing your dashboard…",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 100));
    }, 40);
    const phaseInterval = setInterval(() => {
      setPhase((p) => Math.min(p + 1, phases.length - 1));
    }, 500);
    return () => { clearInterval(interval); clearInterval(phaseInterval); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "var(--sidebar)" }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full blur-3xl opacity-20" style={{ width: 600, height: 600, top: -100, left: -100, background: workspace.color }} />
        <div className="absolute rounded-full blur-3xl opacity-10" style={{ width: 400, height: 400, bottom: -100, right: -100, background: "var(--violet)" }} />
      </div>

      <div className="relative text-center px-8" style={{ maxWidth: 420 }}>
        {/* Workspace Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="flex items-center justify-center rounded-3xl mx-auto mb-6 text-primary-foreground"
          style={{ width: 80, height: 80, background: workspace.color, fontSize: "var(--fs-headline-sm)", fontWeight: "var(--font-weight-medium)", boxShadow: `0 0 60px color-mix(in srgb, ${workspace.color} 38%, transparent)` }}
        >
          {workspace.logo}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-primary-foreground mb-1" style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)" }}>
            Entering {workspace.name}
          </p>
          <p style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)", fontSize: "var(--fs-body-md)" }}>{workspace.industry}</p>
        </motion.div>

        {/* Progress bar */}
        <div className="mt-10 mb-4">
          <div className="rounded-full overflow-hidden" style={{ height: 4, background: "color-mix(in srgb, var(--card) 10%, transparent)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `${workspace.color}`, width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)", fontSize: "var(--fs-body-sm)" }}
          >
            {phases[phase]}
          </motion.p>
        </AnimatePresence>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-2 flex-wrap mt-8"
        >
          {[
            { label: "AI Active", icon: Sparkles, color: "var(--violet)" },
            { label: "Fraud Guard", icon: Shield, color: "var(--destructive)" },
            { label: "Analytics", icon: BarChart3, color: "var(--success)" },
          ].map(({ label, icon: Icon, color }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ background: "color-mix(in srgb, var(--card) 6%, transparent)", border: "1px solid color-mix(in srgb, var(--card) 10%, transparent)" }}
            >
              <Icon size={11} style={{ color }} />
              <span style={{ color: "var(--outline-variant)", fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Create Workspace Modal ───────────────────────────────────────────────────
function CreateWorkspaceModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [step, setStep] = useState<CreateStep>(1);
  const [ws, setWs] = useState<NewWorkspace>({
    name: "",
    industry: "",
    size: "",
    plan: "professional",
    invites: [""],
    aiFeatures: ["triage", "fraud", "ocr"],
  });
  const [creating, setCreating] = useState(false);

  const canNext1 = ws.name.trim().length > 0 && ws.industry !== "" && ws.size !== "";
  const canNext2 = true;

  const handleCreate = async () => {
    setCreating(true);
    await new Promise((r) => setTimeout(r, 1800));
    onCreated();
  };

  const toggleFeature = (id: string) => {
    setWs((prev) => ({
      ...prev,
      aiFeatures: prev.aiFeatures.includes(id)
        ? prev.aiFeatures.filter((f) => f !== id)
        : [...prev.aiFeatures, id],
    }));
  };

  const updateInvite = (i: number, val: string) => {
    const arr = [...ws.invites];
    arr[i] = val;
    setWs({ ...ws, invites: arr });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-4"
      style={{ background: "color-mix(in srgb, var(--foreground) 70%, transparent)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="w-full rounded-2xl overflow-hidden"
        style={{ maxWidth: 540, background: "var(--card)", boxShadow: "0 24px 80px color-mix(in srgb, var(--foreground) 20%, transparent)" }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: "var(--sidebar)", borderBottom: "1px solid color-mix(in srgb, var(--card) 5%, transparent)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: "color-mix(in srgb, var(--violet) 20%, transparent)" }}>
              <Building2 size={16} style={{ color: "var(--violet-soft)" }} />
            </div>
            <div>
              <p className="text-sm text-primary-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>New Workspace</p>
              <p style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)", fontSize: "var(--fs-label-sm)" }}>Step {step} of 3</p>
            </div>
          </div>
          <button onClick={onClose} className="flex items-center justify-center rounded-lg transition-colors hover:bg-card/10" style={{ width: 32, height: 32 }}>
            <X size={16} style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }} />
          </button>
        </div>

        {/* Step progress */}
        <div className="flex" style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--surface-container)" }}>
          {[
            { n: 1, label: "Workspace Info" },
            { n: 2, label: "Invite Team" },
            { n: 3, label: "AI Features" },
          ].map(({ n, label }) => (
            <div
              key={n}
              className="flex-1 flex items-center gap-2 px-4 py-3 text-xs"
              style={{ borderBottom: step === n ? "2px solid var(--primary)" : "2px solid transparent" }}
            >
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width: 20, height: 20,
                  background: step > n ? "var(--success)" : step === n ? "var(--primary)" : "var(--border)",
                  fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)", color: step >= n ? "var(--primary-foreground)" : "var(--outline)",
                }}
              >
                {step > n ? <Check size={10} /> : n}
              </div>
              <span style={{ color: step === n ? "var(--primary)" : step > n ? "var(--success)" : "var(--outline)", fontWeight: step === n ? 600 : 400 }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Workspace Name *</label>
                <input
                  value={ws.name}
                  onChange={(e) => setWs({ ...ws, name: e.target.value })}
                  placeholder="e.g. Acme Insurance Co."
                  className="w-full rounded-xl px-4 text-sm outline-none"
                  style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                />
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Industry *</label>
                <div className="grid grid-cols-2 gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setWs({ ...ws, industry: ind })}
                      className="text-left px-3 py-2 rounded-lg text-xs transition-all"
                      style={{
                        border: ws.industry === ind ? "1.5px solid var(--primary)" : "1.5px solid var(--border)",
                        background: ws.industry === ind ? "var(--accent)" : "var(--surface-container-low)",
                        color: ws.industry === ind ? "var(--primary)" : "var(--on-surface-variant)",
                        fontWeight: ws.industry === ind ? 600 : 400,
                      }}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Team Size *</label>
                <div className="flex gap-2 flex-wrap">
                  {companySizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setWs({ ...ws, size: sz })}
                      className="px-4 py-1.5 rounded-lg text-xs transition-all"
                      style={{
                        border: ws.size === sz ? "1.5px solid var(--primary)" : "1.5px solid var(--border)",
                        background: ws.size === sz ? "var(--accent)" : "var(--surface-container-low)",
                        color: ws.size === sz ? "var(--primary)" : "var(--on-surface-variant)",
                        fontWeight: ws.size === sz ? 600 : 400,
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Plan</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "professional", label: "Professional", price: "$149/mo", color: "var(--violet)" },
                    { id: "enterprise", label: "Enterprise", price: "Custom", color: "var(--primary)" },
                  ].map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setWs({ ...ws, plan: plan.id })}
                      className="text-left p-3 rounded-xl transition-all"
                      style={{
                        border: ws.plan === plan.id ? `1.5px solid ${plan.color}` : "1.5px solid var(--border)",
                        background: ws.plan === plan.id ? `color-mix(in srgb, ${plan.color} 3%, transparent)` : "var(--surface-container-low)",
                      }}
                    >
                      <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{plan.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: plan.color, fontWeight: "var(--font-weight-medium)" }}>{plan.price}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 space-y-4">
              <div>
                <p className="text-sm mb-1" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Invite Team Members</p>
                <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>They'll receive an email invite to join {ws.name || "your workspace"}.</p>
                <div className="space-y-2">
                  {ws.invites.map((email, i) => (
                    <div key={i} className="flex gap-2">
                      <div className="flex-1 flex items-center gap-2 rounded-xl px-3" style={{ border: "1.5px solid var(--border)", background: "var(--surface-container-low)", height: 40 }}>
                        <Mail size={13} style={{ color: "var(--outline)" }} />
                        <input
                          value={email}
                          onChange={(e) => updateInvite(i, e.target.value)}
                          placeholder="colleague@company.com"
                          className="flex-1 text-sm outline-none bg-transparent"
                          style={{ color: "var(--foreground)" }}
                        />
                      </div>
                      {ws.invites.length > 1 && (
                        <button
                          onClick={() => setWs({ ...ws, invites: ws.invites.filter((_, j) => j !== i) })}
                          className="flex items-center justify-center rounded-xl transition-colors hover:bg-destructive-container"
                          style={{ width: 40, border: "1.5px solid var(--destructive-container)" }}
                        >
                          <X size={13} style={{ color: "var(--destructive)" }} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setWs({ ...ws, invites: [...ws.invites, ""] })}
                  className="flex items-center gap-2 mt-3 text-xs transition-colors hover:opacity-70"
                  style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}
                >
                  <UserPlus size={13} />
                  Add another member
                </button>
              </div>

              {/* Role quick-set */}
              <div className="p-4 rounded-xl" style={{ background: "var(--surface-container-low)", border: "1px solid var(--surface-container)" }}>
                <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Default Role for Invitees</p>
                <div className="flex gap-2">
                  {["Claims Adjuster", "Fraud Analyst", "Manager", "View Only"].map((role) => (
                    <button
                      key={role}
                      className="text-xs px-2.5 py-1 rounded-full transition-all"
                      style={{ background: role === "Claims Adjuster" ? "var(--accent)" : "var(--primary-foreground)", color: role === "Claims Adjuster" ? "var(--primary)" : "var(--muted-foreground)", border: "1px solid var(--border)", fontWeight: role === "Claims Adjuster" ? 600 : 400 }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "var(--accent)", border: "1px solid var(--primary-container)" }}>
                <Bell size={14} style={{ color: "var(--primary)", flexShrink: 0 }} />
                <p className="text-xs" style={{ color: "var(--on-primary-container)" }}>
                  Invites are valid for 7 days. Members can access the workspace immediately upon accepting.
                </p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6 space-y-3">
              <div>
                <p className="text-sm mb-0.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>AI Features</p>
                <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Select the AI capabilities to enable for this workspace.</p>
              </div>
              {aiFeatureOptions.map(({ id, label, desc, icon: Icon, color }) => {
                const active = ws.aiFeatures.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => toggleFeature(id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                    style={{
                      border: active ? `1.5px solid ${color}` : "1.5px solid var(--border)",
                      background: active ? `color-mix(in srgb, ${color} 3%, transparent)` : "var(--surface-container-low)",
                    }}
                  >
                    <div className="flex items-center justify-center rounded-lg flex-shrink-0" style={{ width: 34, height: 34, background: active ? `color-mix(in srgb, ${color} 8%, transparent)` : "var(--border)" }}>
                      <Icon size={15} style={{ color: active ? color : "var(--outline)" }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{label}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
                    </div>
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0 transition-all"
                      style={{ width: 20, height: 20, background: active ? color : "var(--border)" }}
                    >
                      {active && <Check size={11} className="text-primary-foreground" />}
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: "1px solid var(--surface-container)", background: "var(--surface-container-low)" }}>
          <button
            onClick={() => step > 1 ? setStep((step - 1) as CreateStep) : onClose()}
            className="px-4 py-2 rounded-xl text-sm transition-colors hover:bg-card"
            style={{ color: "var(--muted-foreground)", border: "1px solid var(--border)" }}
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--outline)" }}>{step} / 3</span>
            {step < 3 ? (
              <button
                onClick={() => setStep((step + 1) as CreateStep)}
                disabled={step === 1 && !canNext1}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm text-primary-foreground transition-all hover:opacity-90"
                style={{
                  background: (step === 1 && !canNext1) ? "var(--outline-variant)" : "var(--primary)",
                  cursor: (step === 1 && !canNext1) ? "not-allowed" : "pointer",
                }}
              >
                Continue <ArrowRight size={13} />
              </button>
            ) : (
              <button
                onClick={handleCreate}
                disabled={creating}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm text-primary-foreground transition-all hover:opacity-90"
                style={{ background: "var(--success)", cursor: creating ? "not-allowed" : "pointer" }}
              >
                {creating ? (
                  <>
                    <div className="animate-spin rounded-full" style={{ width: 14, height: 14, border: "2px solid color-mix(in srgb, var(--card) 30%, transparent)", borderTopColor: "var(--primary-foreground)" }} />
                    Creating…
                  </>
                ) : (
                  <>
                    <Zap size={13} /> Create Workspace
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Workspace Detail Panel ───────────────────────────────────────────────────
function WorkspaceDetail({
  ws,
  onEnter,
}: {
  ws: typeof workspaces[0];
  onEnter: () => void;
}) {
  const team = workspaceTeams[ws.id] ?? [];
  const activity = workspaceActivity[ws.id] ?? [];
  const onlineCount = team.filter((m) => m.status === "online").length;

  const metrics = [
    { label: "Open Claims", value: ws.openClaims.toLocaleString(), icon: FileText, color: "var(--primary)", bg: "var(--accent)" },
    { label: "Team Members", value: ws.members, icon: Users, color: "var(--violet)", bg: "var(--violet-container)" },
    { label: "AI Accuracy", value: `${ws.aiAccuracy}%`, icon: Sparkles, color: "var(--success)", bg: "var(--success-container)" },
    { label: "Avg. Settlement", value: `${ws.avgSettlement}d`, icon: Clock, color: "var(--warning)", bg: "var(--warning-container)" },
  ];

  return (
    <motion.div
      key={ws.id}
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col h-full overflow-hidden"
    >
      {/* Workspace Header Banner */}
      <div
        className="relative px-8 py-7 flex-shrink-0 overflow-hidden"
        style={{ background: `color-mix(in srgb, ${ws.color} 9%, transparent)`, borderBottom: "1px solid var(--surface-container)" }}
      >
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 rounded-full blur-3xl opacity-20" style={{ width: 300, height: 300, background: ws.color, transform: "translate(30%, -50%)" }} />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center rounded-2xl text-primary-foreground flex-shrink-0"
              style={{ width: 60, height: 60, background: ws.color, fontSize: "var(--fs-body-lg)", fontWeight: "var(--font-weight-medium)", boxShadow: `0 8px 24px color-mix(in srgb, ${ws.color} 25%, transparent)` }}
            >
              {ws.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{ws.name}</h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: ws.plan === "Enterprise" ? "var(--accent)" : "var(--violet-container)",
                    color: ws.plan === "Enterprise" ? "var(--primary)" : "var(--violet)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  {ws.plan}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <Briefcase size={12} style={{ color: "var(--outline)" }} />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{ws.industry}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} style={{ color: "var(--outline)" }} />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{ws.region}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="rounded-full" style={{ width: 6, height: 6, background: "var(--success)" }} />
                  <span className="text-xs" style={{ color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>{onlineCount} online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="flex items-center justify-center rounded-xl transition-colors hover:bg-surface-container" style={{ width: 36, height: 36, border: "1px solid var(--border)", background: "var(--card)" }}>
              <Settings size={14} style={{ color: "var(--muted-foreground)" }} />
            </button>
            <button
              onClick={onEnter}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm text-primary-foreground transition-all hover:opacity-90 active:scale-95"
              style={{ background: `${ws.color}`, fontWeight: "var(--font-weight-medium)", boxShadow: `0 4px 14px color-mix(in srgb, ${ws.color} 25%, transparent)` }}
            >
              Enter Workspace
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Metrics grid */}
        <div className="grid grid-cols-4 gap-3">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="rounded-xl p-3" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
                <div className="flex items-center justify-center rounded-lg mb-2" style={{ width: 30, height: 30, background: m.bg }}>
                  <Icon size={13} style={{ color: m.color }} />
                </div>
                <p style={{ fontSize: "var(--fs-body-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{m.value}</p>
                <p className="text-xs" style={{ color: "var(--outline)" }}>{m.label}</p>
              </div>
            );
          })}
        </div>

        {/* Performance strip */}
        <div className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Performance Overview</p>
            <span className="text-xs" style={{ color: "var(--outline)" }}>This month</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Settlement Rate", value: ws.settlementRate, color: ws.color, suffix: "%" },
              { label: "Claims Processed", value: 78, color: "var(--success)", suffix: "%" },
              { label: "Fraud Prevention", value: 92, color: "var(--violet)", suffix: "%" },
            ].map(({ label, value, color, suffix }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</span>
                  <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color }}>{value}{suffix}</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 5, background: "var(--surface-container)" }}>
                  <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team + Activity row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Team */}
          <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--surface-container-low)" }}>
              <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Team</p>
              <div className="flex items-center gap-1">
                <div className="rounded-full" style={{ width: 6, height: 6, background: "var(--success)" }} />
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{onlineCount} active</span>
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--surface-container-low)" }}>
              {team.slice(0, 5).map((member) => (
                <div key={member.name} className="flex items-center gap-2.5 px-4 py-2.5">
                  <div className="relative flex-shrink-0">
                    <div
                      className="flex items-center justify-center rounded-full text-primary-foreground"
                      style={{ width: 28, height: 28, background: `${ws.color}`, fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}
                    >
                      {member.avatar}
                    </div>
                    <div
                      className="absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-primary-foreground"
                      style={{ width: 9, height: 9, background: statusDot[member.status] }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{member.name}</p>
                    <p style={{ fontSize: "var(--fs-label-sm)", color: "var(--outline)" }}>{member.role}</p>
                  </div>
                  {member.claims > 0 && (
                    <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ background: "var(--surface-container)", color: "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" }}>
                      {member.claims}
                    </span>
                  )}
                </div>
              ))}
              {team.length > 5 && (
                <div className="px-4 py-2.5">
                  <span className="text-xs" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>+{team.length - 5} more members</span>
                </div>
              )}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--surface-container-low)" }}>
              <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Recent Activity</p>
              <Activity size={12} style={{ color: "var(--outline)" }} />
            </div>
            <div className="divide-y" style={{ borderColor: "var(--surface-container-low)" }}>
              {activity.map((ev) => (
                <div key={ev.id} className="flex items-start gap-2.5 px-4 py-2.5">
                  <div
                    className="flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                    style={{ width: 22, height: 22, background: activityBg[ev.type] ?? "var(--surface-container-low)" }}
                  >
                    {activityIcon[ev.type] ?? <Activity size={11} style={{ color: "var(--outline)" }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>{ev.event}</p>
                    <p style={{ fontSize: "var(--fs-label-sm)", color: "var(--outline)" }}>{ev.user} · {ev.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fraud saved banner */}
        <div
          className="flex items-center justify-between rounded-xl px-5 py-4"
          style={{ background: "var(--sidebar)", border: "1px solid color-mix(in srgb, var(--card) 5%, transparent)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: "color-mix(in srgb, var(--violet) 20%, transparent)" }}>
              <Shield size={16} style={{ color: "var(--violet-soft)" }} />
            </div>
            <div>
              <p className="text-sm text-primary-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>AI Fraud Savings</p>
              <p style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)", fontSize: "var(--fs-body-sm)" }}>Estimated total prevented this month</p>
            </div>
          </div>
          <p style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--violet-soft)" }}>
            ${(ws.fraudSaved / 1000).toFixed(0)}K
          </p>
        </div>

        {/* Quick actions */}
        <div>
          <p className="text-xs mb-3" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick Actions</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "New Claim", icon: FileText, color: "var(--primary)" },
              { label: "View Reports", icon: BarChart3, color: "var(--violet)" },
              { label: "Invite Member", icon: UserPlus, color: "var(--success)" },
            ].map(({ label, icon: Icon, color }) => (
              <button
                key={label}
                className="flex flex-col items-center gap-2 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-sm"
                style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}
              >
                <div className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, background: `color-mix(in srgb, ${color} 7%, transparent)` }}>
                  <Icon size={14} style={{ color }} />
                </div>
                <span className="text-xs" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function WorkspacePage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>("ws_001");
  const [entering, setEntering] = useState(false);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");

  const filteredWs = workspaces.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.industry.toLowerCase().includes(search.toLowerCase())
  );

  const selectedWs = workspaces.find((w) => w.id === selectedId) ?? workspaces[0];

  const handleEnter = async () => {
    setEntering(true);
    await new Promise((r) => setTimeout(r, 2200));
    navigate("/onboarding");
  };

  const handleCreated = async () => {
    setCreating(false);
    setEntering(true);
    await new Promise((r) => setTimeout(r, 2200));
    navigate("/onboarding");
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ background: "var(--card)", borderBottom: "1px solid var(--surface-container)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 3%, transparent)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 36, height: 36, background: "var(--on-primary-container)" }}
          >
            <Zap size={18} className="text-primary-foreground" />
          </div>
          <div>
            <p style={{ fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-lg)", color: "var(--foreground)", lineHeight: 1.2 }}>ClaimAI</p>
            <p style={{ color: "var(--outline)", fontSize: "var(--fs-label-sm)" }}>Enterprise Claims Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden sm:flex items-center gap-2 rounded-full px-3 py-1"
            style={{ background: "var(--success-container)", border: "1px solid var(--success-border)" }}
          >
            <div className="rounded-full animate-pulse" style={{ width: 6, height: 6, background: "var(--success)" }} />
            <span className="text-xs" style={{ color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>AI Systems Operational</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center rounded-full text-primary-foreground"
              style={{ width: 32, height: 32, background: "var(--success)", fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}
            >
              {currentUser.avatar}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{currentUser.name}</p>
              <p style={{ fontSize: "var(--fs-label-sm)", color: "var(--outline)" }}>{currentUser.role}</p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center rounded-lg transition-colors hover:bg-surface-container"
              style={{ width: 30, height: 30 }}
            >
              <LogOut size={13} style={{ color: "var(--outline)" }} />
            </button>
          </div>
        </div>
      </div>

      {/* Main split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left: Workspace list ──────────────────────────────────────── */}
        <div
          className="flex flex-col flex-shrink-0 overflow-hidden"
          style={{ width: 320, background: "var(--card)", borderRight: "1px solid var(--surface-container)" }}
        >
          {/* Panel header */}
          <div className="px-5 pt-5 pb-3">
            <h2 className="mb-1" style={{ fontSize: "var(--fs-body-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Your Workspaces</h2>
            <p className="text-xs mb-4" style={{ color: "var(--outline)" }}>{workspaces.length} organizations</p>

            {/* Search */}
            <div className="flex items-center gap-2 rounded-xl px-3" style={{ height: 36, background: "var(--background)", border: "1px solid var(--surface-container-high)" }}>
              <Search size={13} style={{ color: "var(--outline)", flexShrink: 0 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search workspaces…"
                className="flex-1 text-xs bg-transparent outline-none"
                style={{ color: "var(--on-surface-variant)" }}
              />
            </div>
          </div>

          {/* Workspace cards */}
          <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1.5">
            {filteredWs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Globe size={24} style={{ color: "var(--outline-variant)", marginBottom: 8 }} />
                <p className="text-xs" style={{ color: "var(--outline)" }}>No workspaces found</p>
              </div>
            ) : (
              filteredWs.map((ws, i) => {
                const isSelected = ws.id === selectedId;
                return (
                  <motion.button
                    key={ws.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setSelectedId(ws.id)}
                    className="w-full text-left rounded-xl p-3 transition-all"
                    style={{
                      background: isSelected ? `color-mix(in srgb, ${ws.color} 6%, transparent)` : "transparent",
                      border: isSelected ? `1.5px solid color-mix(in srgb, ${ws.color} 25%, transparent)` : "1.5px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* Logo */}
                      <div
                        className="flex items-center justify-center rounded-xl text-primary-foreground flex-shrink-0"
                        style={{ width: 40, height: 40, background: ws.color, fontSize: "var(--fs-body-sm)", fontWeight: "var(--font-weight-medium)", boxShadow: isSelected ? `0 4px 12px color-mix(in srgb, ${ws.color} 25%, transparent)` : "none" }}
                      >
                        {ws.logo}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <p className="text-sm truncate" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{ws.name}</p>
                          {isSelected && <div className="flex-shrink-0 rounded-full" style={{ width: 5, height: 5, background: ws.color }} />}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{ws.members} members</span>
                          <span className="text-xs" style={{ color: "var(--outline-variant)" }}>·</span>
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{ws.claimsThisMonth.toLocaleString()} claims</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full"
                          style={{
                            background: ws.plan === "Enterprise" ? "var(--accent)" : "var(--violet-container)",
                            color: ws.plan === "Enterprise" ? "var(--primary)" : "var(--violet)",
                            fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-label-sm)",
                          }}
                        >
                          {ws.plan}
                        </span>
                        <span style={{ fontSize: "var(--fs-label-sm)", color: "var(--outline)" }}>{ws.lastAccessed}</span>
                      </div>
                    </div>

                    {/* Mini metrics when selected */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex gap-3 mt-2.5 pt-2.5"
                        style={{ borderTop: `1px solid color-mix(in srgb, ${ws.color} 13%, transparent)` }}
                      >
                        <div className="flex items-center gap-1">
                          <Activity size={10} style={{ color: ws.color }} />
                          <span style={{ fontSize: "var(--fs-label-sm)", color: "var(--muted-foreground)" }}>{ws.openClaims} open</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles size={10} style={{ color: "var(--violet)" }} />
                          <span style={{ fontSize: "var(--fs-label-sm)", color: "var(--muted-foreground)" }}>{ws.aiAccuracy}% AI accuracy</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp size={10} style={{ color: "var(--success)" }} />
                          <span style={{ fontSize: "var(--fs-label-sm)", color: "var(--muted-foreground)" }}>{ws.settlementRate}% settled</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                );
              })
            )}
          </div>

          {/* Create Workspace CTA */}
          <div className="px-3 pb-4 pt-2" style={{ borderTop: "1px solid var(--surface-container)" }}>
            <button
              onClick={() => setCreating(true)}
              className="flex items-center gap-3 w-full p-3 rounded-xl transition-all hover:bg-surface-container-low group"
              style={{ border: "1.5px dashed var(--outline-variant)" }}
            >
              <div
                className="flex items-center justify-center rounded-xl flex-shrink-0 transition-colors group-hover:bg-primary-container"
                style={{ width: 36, height: 36, background: "var(--surface-container)" }}
              >
                <Plus size={16} style={{ color: "var(--muted-foreground)" }} />
              </div>
              <div className="text-left">
                <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Create New Workspace</p>
                <p style={{ fontSize: "var(--fs-label-sm)", color: "var(--outline)" }}>Set up a new organization</p>
              </div>
            </button>
          </div>
        </div>

        {/* ── Right: Detail panel ──────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <WorkspaceDetail key={selectedId} ws={selectedWs} onEnter={handleEnter} />
          </AnimatePresence>
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {creating && (
          <CreateWorkspaceModal onClose={() => setCreating(false)} onCreated={handleCreated} />
        )}
      </AnimatePresence>

      {entering && <EnteringOverlay workspace={selectedWs} />}
    </div>
  );
}
