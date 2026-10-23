import { useState } from "react";
import {
  Search, Eye, EyeOff, ChevronDown, Calendar, Check, X, Info, AlertTriangle,
  AlertCircle, CheckCircle, Bell, User, Settings, Home, BarChart3, FileText,
  Star, Heart, Bookmark, MoreHorizontal, ArrowRight, ChevronLeft, ChevronRight,
  Loader2, Upload, Shield, Zap, Plus, Edit, Trash2, ExternalLink, Copy,
  Clock, Mail, Phone, MapPin
} from "lucide-react";

// ── Shared Helpers ──────────────────────────────────────────────────────────────
function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
      style={{ background: `color-mix(in srgb, ${color} 8%, transparent)`, color, fontWeight: "var(--font-weight-medium)" }}>
      {label}
    </span>
  );
}

function SectionCard({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
      <div className="mb-5">
        <h4 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{title}</h4>
        {desc && <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{desc}</p>}
      </div>
      {children}
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs mt-4 mb-2 uppercase tracking-widest" style={{ color: "var(--outline-variant)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-label-sm)" }}>{children}</p>;
}

// ── Buttons ─────────────────────────────────────────────────────────────────────
function BtnPrimary({ label, loading, disabled, icon }: { label: string; loading?: boolean; disabled?: boolean; icon?: React.ReactNode }) {
  return (
    <button disabled={disabled}
      className="inline-flex items-center gap-2 px-4 rounded-xl text-sm text-primary-foreground transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
      style={{ height: 40, background: disabled ? "var(--inverse-primary)" : "var(--primary)", fontWeight: "var(--font-weight-medium)", boxShadow: disabled ? "none" : "0 2px 8px color-mix(in srgb, var(--primary) 30%, transparent)" }}>
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {label}
    </button>
  );
}

function BtnSecondary({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 px-4 rounded-xl text-sm transition-all hover:-translate-y-0.5 active:scale-95"
      style={{ height: 40, background: "var(--surface-container)", color: "var(--foreground)", fontWeight: "var(--font-weight-medium)", border: "1px solid var(--border)" }}>
      {label}
    </button>
  );
}

function BtnGhost({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 px-4 rounded-xl text-sm transition-all hover:bg-accent active:scale-95"
      style={{ height: 40, color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>
      {icon}{label}
    </button>
  );
}

function BtnDanger({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 px-4 rounded-xl text-sm text-primary-foreground transition-all hover:-translate-y-0.5 active:scale-95"
      style={{ height: 40, background: "var(--destructive)", fontWeight: "var(--font-weight-medium)", boxShadow: "0 2px 8px color-mix(in srgb, var(--destructive) 30%, transparent)" }}>
      {label}
    </button>
  );
}

function BtnIcon({ icon, variant = "default" }: { icon: React.ReactNode; variant?: "default" | "primary" | "danger" }) {
  const styles = {
    default: { background: "var(--surface-container)", color: "var(--on-surface-variant)", border: "1px solid var(--border)" },
    primary: { background: "var(--accent)", color: "var(--primary)", border: "1px solid var(--primary-container)" },
    danger: { background: "var(--destructive-container)", color: "var(--destructive)", border: "1px solid var(--destructive-container)" },
  };
  return (
    <button className="flex items-center justify-center rounded-xl transition-all hover:-translate-y-0.5 active:scale-90"
      style={{ width: 40, height: 40, ...styles[variant] }}>
      {icon}
    </button>
  );
}

function BtnSize({ label, size }: { label: string; size: "sm" | "md" | "lg" }) {
  const configs = { sm: { height: 32, px: 12, fontSize: "var(--fs-body-sm)" }, md: { height: 40, px: 16, fontSize: "var(--fs-body-md)" }, lg: { height: 48, px: 20, fontSize: "var(--fs-body-md)" } };
  const c = configs[size];
  return (
    <button className="inline-flex items-center gap-2 rounded-xl text-primary-foreground transition-all hover:-translate-y-0.5"
      style={{ height: c.height, paddingLeft: c.px, paddingRight: c.px, fontSize: c.fontSize, background: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>
      {label}
    </button>
  );
}

// ── Inputs ──────────────────────────────────────────────────────────────────────
function InputField({ label, placeholder, type = "text", state, hint, icon }: {
  label: string; placeholder: string; type?: string; state?: "error" | "success"; hint?: string; icon?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const borderColor = state === "error" ? "var(--destructive)" : state === "success" ? "var(--success)" : "var(--border)";
  const focusBg = state === "error" ? "var(--destructive-container)" : state === "success" ? "var(--success-container)" : "var(--accent)";
  return (
    <div className="w-full">
      <label className="block text-xs mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--outline)" }}>{icon}</div>}
        <input type={type === "password" ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full rounded-xl text-sm outline-none transition-all"
          style={{
            height: 40, border: `1.5px solid ${borderColor}`, paddingLeft: icon ? 36 : 12, paddingRight: type === "password" ? 40 : 12,
            background: "var(--card)", color: "var(--foreground)",
          }}
          onFocus={e => { e.target.style.borderColor = state ? borderColor : "var(--primary)"; e.target.style.background = focusBg; e.target.style.boxShadow = `0 0 0 3px ${state === "error" ? "color-mix(in srgb, var(--destructive) 10%, transparent)" : state === "success" ? "color-mix(in srgb, var(--success) 10%, transparent)" : "color-mix(in srgb, var(--primary) 10%, transparent)"}`; }}
          onBlur={e => { e.target.style.borderColor = borderColor; e.target.style.background = "var(--primary-foreground)"; e.target.style.boxShadow = "none"; }}
        />
        {type === "password" && (
          <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--outline)" }}>
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
        {state === "success" && <CheckCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--success)" }} />}
        {state === "error" && <AlertCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--destructive)" }} />}
      </div>
      {hint && <p className="text-xs mt-1" style={{ color: state === "error" ? "var(--destructive)" : state === "success" ? "var(--success)" : "var(--outline)" }}>{hint}</p>}
    </div>
  );
}

function SelectField({ label }: { label: string }) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{label}</label>
      <div className="relative">
        <select className="w-full rounded-xl text-sm outline-none appearance-none transition-all"
          style={{ height: 40, border: "1.5px solid var(--border)", paddingLeft: 12, paddingRight: 36, background: "var(--card)", color: "var(--foreground)" }}>
          <option>Select claim type…</option>
          <option>Auto Accident</option>
          <option>Property Damage</option>
          <option>Medical</option>
          <option>Travel</option>
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--outline)" }} />
      </div>
    </div>
  );
}

function ToggleSwitch({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn ?? false);
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm" style={{ color: "var(--foreground)" }}>{label}</span>
      <button onClick={() => setOn(!on)} className="relative rounded-full transition-all"
        style={{ width: 44, height: 24, background: on ? "var(--primary)" : "var(--outline-variant)" }}>
        <div className="absolute top-1 rounded-full bg-card transition-all" style={{ width: 16, height: 16, left: on ? 24 : 4, boxShadow: "0 1px 3px color-mix(in srgb, var(--foreground) 20%, transparent)" }} />
      </button>
    </div>
  );
}

function CheckBox({ label, checked: defaultChecked }: { label: string; checked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <label className="flex items-center gap-2.5 cursor-pointer py-1">
      <div onClick={() => setChecked(!checked)}
        className="flex items-center justify-center rounded transition-all flex-shrink-0"
        style={{ width: 18, height: 18, background: checked ? "var(--primary)" : "var(--primary-foreground)", border: checked ? "none" : "1.5px solid var(--outline-variant)", boxShadow: checked ? "0 2px 6px color-mix(in srgb, var(--primary) 30%, transparent)" : "none" }}>
        {checked && <Check size={11} className="text-primary-foreground" />}
      </div>
      <span className="text-sm" style={{ color: "var(--foreground)" }}>{label}</span>
    </label>
  );
}

function RadioGroup() {
  const [sel, setSel] = useState("high");
  return (
    <div className="space-y-2">
      {[{ value: "low", label: "Low Risk" }, { value: "medium", label: "Medium Risk" }, { value: "high", label: "High Risk" }].map(o => (
        <label key={o.value} className="flex items-center gap-2.5 cursor-pointer py-1">
          <div onClick={() => setSel(o.value)} className="flex items-center justify-center rounded-full transition-all"
            style={{ width: 18, height: 18, border: `1.5px solid ${sel === o.value ? "var(--primary)" : "var(--outline-variant)"}`, background: "var(--card)" }}>
            {sel === o.value && <div className="rounded-full" style={{ width: 8, height: 8, background: "var(--primary)" }} />}
          </div>
          <span className="text-sm" style={{ color: "var(--foreground)" }}>{o.label}</span>
        </label>
      ))}
    </div>
  );
}

// ── Badges ──────────────────────────────────────────────────────────────────────
const BADGE_VARIANTS = [
  { label: "New", color: "var(--primary)" },
  { label: "Under Review", color: "var(--warning)" },
  { label: "Approved", color: "var(--success)" },
  { label: "Rejected", color: "var(--destructive)" },
  { label: "Settled", color: "var(--muted-foreground)" },
  { label: "Fraud Risk", color: "var(--destructive)" },
  { label: "Critical", color: "var(--on-destructive-container)" },
  { label: "AI Verified", color: "var(--violet)" },
  { label: "SLA Breach", color: "var(--warning)" },
  { label: "Pending", color: "var(--info)" },
];

// ── Avatars ─────────────────────────────────────────────────────────────────────
function Avatar({ name, size = 36, gradient }: { name: string; size?: number; gradient: string }) {
  return (
    <div className="flex items-center justify-center rounded-full text-primary-foreground text-xs"
      style={{ width: size, height: size, background: gradient, fontWeight: "var(--font-weight-medium)", fontSize: size < 32 ? 10 : 12, boxShadow: "0 2px 8px color-mix(in srgb, var(--foreground) 15%, transparent)" }}>
      {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
    </div>
  );
}

// ── Alerts ──────────────────────────────────────────────────────────────────────
function Alert({ type, title, desc }: { type: "info" | "success" | "warning" | "error"; title: string; desc: string }) {
  const configs = {
    info: { bg: "var(--accent)", border: "var(--primary-container)", color: "var(--primary)", icon: <Info size={16} /> },
    success: { bg: "var(--success-container)", border: "var(--success-border)", color: "var(--success)", icon: <CheckCircle size={16} /> },
    warning: { bg: "var(--warning-container)", border: "var(--warning-border)", color: "var(--warning)", icon: <AlertTriangle size={16} /> },
    error: { bg: "var(--destructive-container)", border: "var(--destructive-container)", color: "var(--destructive)", icon: <AlertCircle size={16} /> },
  };
  const c = configs[type];
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <div style={{ color: c.color, flexShrink: 0 }}>{c.icon}</div>
      <div>
        <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{title}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
      </div>
      <button className="ml-auto" style={{ color: "var(--outline)" }}><X size={14} /></button>
    </div>
  );
}

// ── Toast ───────────────────────────────────────────────────────────────────────
function ToastDemo({ type }: { type: "success" | "error" | "warning" | "info" }) {
  const configs = {
    success: { bg: "var(--foreground)", icon: <CheckCircle size={15} style={{ color: "var(--success)" }} />, label: "Claim approved successfully", color: "var(--success)" },
    error: { bg: "var(--foreground)", icon: <AlertCircle size={15} style={{ color: "var(--destructive)" }} />, label: "Failed to submit — retry?", color: "var(--destructive)" },
    warning: { bg: "var(--foreground)", icon: <AlertTriangle size={15} style={{ color: "var(--warning)" }} />, label: "SLA deadline approaching", color: "var(--warning)" },
    info: { bg: "var(--foreground)", icon: <Info size={15} style={{ color: "var(--primary)" }} />, label: "AI analysis complete", color: "var(--primary)" },
  };
  const c = configs[type];
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: c.bg, minWidth: 220, boxShadow: "0 8px 24px color-mix(in srgb, var(--foreground) 25%, transparent)" }}>
      {c.icon}
      <p className="text-xs flex-1" style={{ color: "var(--surface-container-low)", fontWeight: "var(--font-weight-medium)" }}>{c.label}</p>
      <button style={{ color: "var(--on-surface-variant)" }}><X size={12} /></button>
    </div>
  );
}

// ── Progress Bar ─────────────────────────────────────────────────────────────────
function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>{label}</span>
        <span className="text-xs" style={{ color, fontWeight: "var(--font-weight-medium)" }}>{value}%</span>
      </div>
      <div className="rounded-full overflow-hidden" style={{ height: 6, background: "var(--surface-container)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Skeleton ────────────────────────────────────────────────────────────────────
function Skeleton({ w, h, rounded }: { w: string; h: number; rounded?: boolean }) {
  return (
    <div className="animate-pulse" style={{ width: w, height: h, borderRadius: rounded ? 9999 : 8, background: "var(--surface-container)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
  );
}

// ── Tab component ───────────────────────────────────────────────────────────────
function TabDemo() {
  const [active, setActive] = useState("overview");
  const tabs = ["overview", "documents", "timeline", "audit"];
  return (
    <div className="border-b" style={{ borderColor: "var(--surface-container)" }}>
      <div className="flex gap-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setActive(t)}
            className="px-4 py-2.5 text-sm capitalize transition-all relative"
            style={{ color: active === t ? "var(--primary)" : "var(--outline)", fontWeight: active === t ? 700 : 400 }}>
            {t}
            {active === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "var(--primary)" }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Breadcrumb ──────────────────────────────────────────────────────────────────
function Breadcrumb() {
  const crumbs = ["Dashboard", "Claims", "CLM-2024-001", "Settlement"];
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {crumbs.map((c, i) => (
        <div key={c} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} style={{ color: "var(--outline-variant)" }} />}
          <span className="text-xs transition-colors cursor-pointer"
            style={{ color: i === crumbs.length - 1 ? "var(--foreground)" : "var(--primary)", fontWeight: i === crumbs.length - 1 ? 700 : 400 }}>
            {c}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Pagination ──────────────────────────────────────────────────────────────────
function Pagination() {
  const [page, setPage] = useState(3);
  const pages = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1.5">
      <button onClick={() => setPage(p => Math.max(1, p - 1))} className="flex items-center gap-1 px-3 rounded-lg text-xs transition-all hover:bg-accent"
        style={{ height: 32, color: "var(--on-surface-variant)", border: "1px solid var(--border)", background: "var(--card)" }}>
        <ChevronLeft size={12} /> Prev
      </button>
      {pages.map(p => (
        <button key={p} onClick={() => setPage(p)} className="rounded-lg text-xs font-semibold transition-all"
          style={{ width: 32, height: 32, background: page === p ? "var(--primary)" : "var(--primary-foreground)", color: page === p ? "var(--primary-foreground)" : "var(--on-surface-variant)", border: "1px solid var(--border)", boxShadow: page === p ? "0 2px 8px color-mix(in srgb, var(--primary) 30%, transparent)" : "none" }}>
          {p}
        </button>
      ))}
      <button onClick={() => setPage(p => Math.min(5, p + 1))} className="flex items-center gap-1 px-3 rounded-lg text-xs transition-all hover:bg-accent"
        style={{ height: 32, color: "var(--on-surface-variant)", border: "1px solid var(--border)", background: "var(--card)" }}>
        Next <ChevronRight size={12} />
      </button>
    </div>
  );
}

// ── Card variants ───────────────────────────────────────────────────────────────
function StatCard({ label, value, change, icon: Icon, color, bg }: { label: string; value: string; change: string; icon: any; color: string; bg: string }) {
  return (
    <div className="rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: bg }}>
          <Icon size={16} style={{ color }} />
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--success-container)", color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>{change}</span>
      </div>
      <p style={{ fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-title-lg)", color: "var(--foreground)" }}>{value}</p>
      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{label}</p>
    </div>
  );
}

// ── Tooltip ─────────────────────────────────────────────────────────────────────
function TooltipDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs transition-all"
        style={{ background: "var(--accent)", color: "var(--primary)", fontWeight: "var(--font-weight-medium)", border: "1px solid var(--primary-container)" }}>
        <Info size={12} /> Hover for tooltip
      </button>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 whitespace-nowrap rounded-xl px-3 py-2"
          style={{ background: "var(--sidebar)", color: "var(--surface-container-low)", fontSize: "var(--fs-body-sm)", fontWeight: "var(--font-weight-medium)", boxShadow: "0 8px 24px color-mix(in srgb, var(--foreground) 30%, transparent)" }}>
          AI confidence score: 94.7%
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: "var(--foreground)" }} />
        </div>
      )}
    </div>
  );
}

// ── Accordion ───────────────────────────────────────────────────────────────────
function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "var(--surface-container)" }}>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-3.5 text-sm text-left transition-colors"
        style={{ color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>
        {title}
        <ChevronDown size={14} style={{ color: "var(--outline)", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms" }} />
      </button>
      {open && <div className="pb-4 text-sm" style={{ color: "var(--muted-foreground)" }}>{children}</div>}
    </div>
  );
}

// ── Empty State ─────────────────────────────────────────────────────────────────
function EmptyState({ icon: Icon, title, desc, action }: { icon: any; title: string; desc: string; action: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center rounded-2xl"
      style={{ background: "var(--surface-container-low)", border: "2px dashed var(--border)" }}>
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: "var(--accent)" }}>
        <Icon size={22} style={{ color: "var(--primary)" }} />
      </div>
      <p className="text-sm mb-1" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{title}</p>
      <p className="text-xs mb-4" style={{ color: "var(--outline)" }}>{desc}</p>
      <button className="inline-flex items-center gap-2 px-4 rounded-xl text-sm text-primary-foreground"
        style={{ height: 36, background: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>
        <Plus size={13} /> {action}
      </button>
    </div>
  );
}

// ── Activity Feed ───────────────────────────────────────────────────────────────
const feedItems = [
  { time: "2m ago", user: "AI System", action: "flagged CLM-2024-008 for fraud review", icon: Shield, color: "var(--destructive)" },
  { time: "8m ago", user: "Sarah J.", action: "approved settlement for CLM-2024-003", icon: CheckCircle, color: "var(--success)" },
  { time: "22m ago", user: "Mike R.", action: "uploaded 3 documents to CLM-2024-007", icon: Upload, color: "var(--primary)" },
  { time: "1h ago", user: "AI System", action: "completed analysis — 91% confidence", icon: Zap, color: "var(--violet)" },
];

// ── Main Export ──────────────────────────────────────────────────────────────────
export function ComponentsSection() {
  return (
    <div className="space-y-6">

      {/* ── Buttons ── */}
      <SectionCard title="Button Library" desc="All variants, sizes, and states. Touch targets ≥ 44px.">
        <SubLabel>Variants</SubLabel>
        <div className="flex flex-wrap gap-3 items-center">
          <BtnPrimary label="Primary" />
          <BtnSecondary label="Secondary" />
          <BtnGhost label="Ghost" icon={<ArrowRight size={14} />} />
          <BtnDanger label="Delete Claim" />
          <BtnIcon icon={<Edit size={14} />} />
          <BtnIcon icon={<Trash2 size={14} />} variant="danger" />
          <BtnIcon icon={<ExternalLink size={14} />} variant="primary" />
        </div>
        <SubLabel>States</SubLabel>
        <div className="flex flex-wrap gap-3 items-center">
          <BtnPrimary label="Default" />
          <BtnPrimary label="Loading…" loading />
          <BtnPrimary label="Disabled" disabled />
          <BtnPrimary label="With Icon" icon={<Check size={14} />} />
          <BtnPrimary label="With Icon" icon={<Plus size={14} />} />
        </div>
        <SubLabel>Sizes</SubLabel>
        <div className="flex flex-wrap gap-3 items-end">
          <BtnSize label="Small" size="sm" />
          <BtnSize label="Medium" size="md" />
          <BtnSize label="Large" size="lg" />
        </div>
      </SectionCard>

      {/* ── Inputs ── */}
      <SectionCard title="Form Controls" desc="All input types with validation states and accessibility.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Default Input" placeholder="Enter claimant name…" />
          <InputField label="With Icon" placeholder="Search claims…" icon={<Search size={14} />} />
          <InputField label="Success State" placeholder="john.doe@example.com" state="success" hint="Email verified successfully" />
          <InputField label="Error State" placeholder="Enter amount…" state="error" hint="Amount must be greater than $0" />
          <InputField label="Password" placeholder="Enter password…" type="password" />
          <SelectField label="Claim Type" />
        </div>
        <SubLabel>Selection Controls</SubLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Checkboxes</p>
            <CheckBox label="Auto accident damage" checked />
            <CheckBox label="Property loss" />
            <CheckBox label="Medical expenses" checked />
            <CheckBox label="Third party liability" />
          </div>
          <div>
            <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Radio Group</p>
            <RadioGroup />
          </div>
          <div>
            <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Toggle Switches</p>
            <ToggleSwitch label="Email notifications" defaultOn />
            <ToggleSwitch label="SMS alerts" />
            <ToggleSwitch label="AI auto-processing" defaultOn />
            <ToggleSwitch label="SLA warnings" defaultOn />
          </div>
        </div>
        <SubLabel>Textarea</SubLabel>
        <textarea className="w-full rounded-xl text-sm p-3 outline-none transition-all resize-none"
          rows={4} placeholder="Describe the incident in detail. Include date, time, location, and any witnesses…"
          style={{ border: "1.5px solid var(--border)", color: "var(--foreground)", background: "var(--card)" }} />
      </SectionCard>

      {/* ── Navigation ── */}
      <SectionCard title="Navigation Patterns" desc="Tabs, breadcrumbs, pagination — consistent navigation components.">
        <SubLabel>Tabs</SubLabel>
        <TabDemo />
        <SubLabel>Breadcrumbs</SubLabel>
        <Breadcrumb />
        <SubLabel>Pagination</SubLabel>
        <Pagination />
      </SectionCard>

      {/* ── Badges & Chips ── */}
      <SectionCard title="Badges & Status Chips" desc="Semantic color-coded labels for claim status, risk levels, and system states.">
        <div className="flex flex-wrap gap-2">
          {BADGE_VARIANTS.map(b => <Chip key={b.label} label={b.label} color={b.color} />)}
        </div>
        <SubLabel>Dot Indicators</SubLabel>
        <div className="flex flex-wrap gap-4">
          {[{ label: "Active", color: "var(--success)" }, { label: "Pending", color: "var(--warning)" }, { label: "Offline", color: "var(--outline)" }, { label: "Critical", color: "var(--destructive)" }].map(d => (
            <div key={d.label} className="flex items-center gap-1.5">
              <div className="rounded-full animate-pulse" style={{ width: 8, height: 8, background: d.color }} />
              <span className="text-xs" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>{d.label}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── Avatars ── */}
      <SectionCard title="Avatars & User Representation" desc="Initials-based avatars with gradient backgrounds and size variants.">
        <div className="flex items-end gap-4 flex-wrap py-2">
          {[
            { name: "Sarah Johnson", size: 48, gradient: "var(--success)" },
            { name: "Mike Rivera", size: 40, gradient: "var(--violet)" },
            { name: "Amy Chen", size: 36, gradient: "var(--warning)" },
            { name: "Tom Park", size: 32, gradient: "var(--primary)" },
            { name: "Lisa Wu", size: 28, gradient: "var(--info)" },
          ].map(a => <Avatar key={a.name} {...a} />)}
        </div>
        <SubLabel>Avatar Group</SubLabel>
        <div className="flex items-center">
          {["SJ", "MR", "AC", "TP", "LW"].map((i, idx) => (
            <div key={i} className="flex items-center justify-center rounded-full text-primary-foreground text-xs"
              style={{ width: 32, height: 32, background: ["var(--success)", "var(--violet)", "var(--warning)", "var(--primary)", "var(--outline)"][idx], fontWeight: "var(--font-weight-medium)", marginLeft: idx > 0 ? -10 : 0, border: "2px solid #fff", fontSize: "var(--fs-label-sm)" }}>
              {i}
            </div>
          ))}
          <span className="ml-3 text-xs" style={{ color: "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" }}>+24 team members</span>
        </div>
      </SectionCard>

      {/* ── Alerts ── */}
      <SectionCard title="Alerts & Notifications" desc="Contextual feedback with semantic color coding and dismiss actions.">
        <div className="space-y-3">
          <Alert type="info" title="AI Analysis Complete" desc="The model reviewed 847 data points with 94.7% confidence score." />
          <Alert type="success" title="Claim Approved" desc="CLM-2024-003 has been approved for $12,400. Settlement processing." />
          <Alert type="warning" title="SLA Deadline Approaching" desc="CLM-2024-007 must be resolved by 5:00 PM today or breach SLA." />
          <Alert type="error" title="Fraud Pattern Detected" desc="Unusual activity detected. This claim requires immediate manual review." />
        </div>
      </SectionCard>

      {/* ── Toasts ── */}
      <SectionCard title="Toast Notifications" desc="Non-blocking feedback positioned at screen edges. Auto-dismiss after 4s.">
        <div className="flex flex-wrap gap-3">
          <ToastDemo type="success" />
          <ToastDemo type="error" />
          <ToastDemo type="warning" />
          <ToastDemo type="info" />
        </div>
      </SectionCard>

      {/* ── Progress & Skeleton ── */}
      <SectionCard title="Progress & Loading States" desc="Visual feedback for async operations and content loading.">
        <SubLabel>Progress Bars</SubLabel>
        <div className="space-y-3">
          <ProgressBar label="AI Confidence Score" value={94} color="var(--success)" />
          <ProgressBar label="Claims Processed" value={72} color="var(--primary)" />
          <ProgressBar label="Fraud Risk Level" value={38} color="var(--warning)" />
          <ProgressBar label="SLA Compliance" value={61} color="var(--violet)" />
        </div>
        <SubLabel>Skeleton Loaders</SubLabel>
        <div className="space-y-3 p-4 rounded-xl" style={{ background: "var(--surface-container-low)" }}>
          <div className="flex items-center gap-3">
            <Skeleton w="40px" h={40} />
            <div className="flex-1 space-y-2">
              <Skeleton w="60%" h={12} />
              <Skeleton w="40%" h={10} />
            </div>
          </div>
          <Skeleton w="100%" h={12} />
          <Skeleton w="85%" h={12} />
          <Skeleton w="70%" h={12} />
        </div>
      </SectionCard>

      {/* ── Cards ── */}
      <SectionCard title="Card Variants" desc="Surface-level containers for grouped content and KPI metrics.">
        <SubLabel>Stat Cards</SubLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Total Claims" value="2,847" change="+8.2%" icon={FileText} color="var(--primary)" bg="var(--accent)" />
          <StatCard label="Fraud Detected" value="47" change="+12%" icon={Shield} color="var(--destructive)" bg="var(--destructive-container)" />
          <StatCard label="AI Accuracy" value="94.7%" change="+2.1%" icon={Zap} color="var(--violet)" bg="var(--violet-container)" />
          <StatCard label="Avg. Settlement" value="$8,240" change="-5.3%" icon={BarChart3} color="var(--success)" bg="var(--success-container)" />
        </div>
        <SubLabel>Content Card</SubLabel>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
          <div className="p-5" style={{ background: "var(--sidebar)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Shield size={14} style={{ color: "var(--inverse-primary)" }} />
              <span className="text-xs" style={{ color: "var(--inverse-primary)", fontWeight: "var(--font-weight-medium)" }}>HIGH RISK · AI FLAGGED</span>
            </div>
            <p className="text-primary-foreground text-sm" style={{ fontWeight: "var(--font-weight-medium)" }}>CLM-2024-008 — Property Damage</p>
            <p className="text-xs mt-0.5" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>Reviewed by AI Model v3.2 · 2 hours ago</p>
          </div>
          <div className="p-5 bg-card">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[{ label: "Amount", value: "$48,200" }, { label: "Risk Score", value: "87/100" }, { label: "AI Confidence", value: "91%" }].map(s => (
                <div key={s.label}>
                  <p className="text-xs" style={{ color: "var(--outline)" }}>{s.label}</p>
                  <p className="text-sm mt-0.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ── Tooltip ── */}
      <SectionCard title="Tooltips & Popovers" desc="Contextual help and additional information on hover/focus.">
        <div className="flex items-center gap-4 flex-wrap py-2">
          <TooltipDemo />
          <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg" style={{ background: "var(--surface-container-low)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
            <Info size={12} style={{ color: "var(--outline)" }} />
            <span>Keyboard shortcut: <kbd className="px-1.5 py-0.5 rounded" style={{ background: "var(--border)", fontFamily: "var(--font-mono)", fontSize: "var(--fs-label-sm)" }}>Ctrl+K</kbd></span>
          </div>
        </div>
      </SectionCard>

      {/* ── Accordion & Activity ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionCard title="Accordion / FAQ" desc="Expandable content sections for complex information.">
          <AccordionItem title="What is the AI risk scoring system?">
            The AI analyzes 847+ data points including historical claims, geolocation, medical codes, and behavior patterns to assign a risk score from 0–100.
          </AccordionItem>
          <AccordionItem title="How does fraud detection work?">
            Machine learning models cross-reference claims against known fraud patterns, flagging suspicious activity for manual review with 94.7% accuracy.
          </AccordionItem>
          <AccordionItem title="What happens during settlement?">
            Settlement involves validation, adjuster review, approval workflow, and automated payment processing — typically completed within 3–7 business days.
          </AccordionItem>
        </SectionCard>

        <SectionCard title="Activity Feed" desc="Real-time log of system and user actions.">
          <div className="space-y-3">
            {feedItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                    style={{ width: 28, height: 28, background: `color-mix(in srgb, ${item.color} 8%, transparent)` }}>
                    <Icon size={13} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs" style={{ color: "var(--foreground)" }}>
                      <strong style={{ fontWeight: "var(--font-weight-medium)" }}>{item.user}</strong> {item.action}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--outline)" }}>{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>

      {/* ── Empty State ── */}
      <SectionCard title="Empty States" desc="Helpful placeholders with clear calls to action when no content exists.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmptyState icon={FileText} title="No Claims Found" desc="Try adjusting your filters or search query." action="Add New Claim" />
          <EmptyState icon={Bell} title="No Alerts" desc="All systems are operating normally. No fraud activity detected." action="Configure Alerts" />
        </div>
      </SectionCard>

    </div>
  );
}
