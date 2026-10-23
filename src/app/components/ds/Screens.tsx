import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  LayoutDashboard, FileText, Shield, BarChart3, Settings, Bell, Search,
  ChevronRight, ArrowRight, TrendingUp, TrendingDown, Activity, AlertTriangle,
  CheckCircle, Clock, Zap, Sparkles, AlertCircle, Plus, Filter, Download,
  Eye, Edit, Trash2, User, Lock, Globe, CreditCard, MoreHorizontal,
  ChevronLeft, ChevronDown, Home, Check, X, Star, RefreshCw
} from "lucide-react";

// ─── Shared Mini Components ────────────────────────────────────────────────────
const areaData = [
  { m: "Nov", s: 42, r: 28 }, { m: "Dec", s: 58, r: 38 }, { m: "Jan", s: 71, r: 52 },
  { m: "Feb", s: 64, r: 48 }, { m: "Mar", s: 89, r: 67 }, { m: "Apr", s: 95, r: 78 },
];
const barData = [
  { w: "W1", d: 18 }, { w: "W2", d: 14 }, { w: "W3", d: 11 }, { w: "W4", d: 8 },
];
const pieData = [
  { name: "Auto", value: 42, color: "var(--primary)" },
  { name: "Property", value: 28, color: "var(--violet)" },
  { name: "Medical", value: 18, color: "var(--success)" },
  { name: "Travel", value: 12, color: "var(--warning)" },
];

const claims = [
  { id: "CLM-001", name: "James Wilson", type: "Auto", amount: "$24,200", risk: "High", status: "Investigation", ai: 87 },
  { id: "CLM-002", name: "Maria Santos", type: "Medical", amount: "$8,750", risk: "Low", status: "Approved", ai: 96 },
  { id: "CLM-003", name: "Robert Kim", type: "Property", amount: "$52,000", risk: "Critical", status: "New", ai: 42 },
  { id: "CLM-004", name: "Linda Park", type: "Travel", amount: "$3,400", risk: "Low", status: "Settled", ai: 98 },
];

const statusColors: Record<string, string> = {
  "New": "var(--primary)", "Under Review": "var(--warning)", "Approved": "var(--success)",
  "Rejected": "var(--destructive)", "Settled": "var(--muted-foreground)", "Investigation": "var(--violet)",
};
const riskColors: Record<string, string> = { Low: "var(--success)", Medium: "var(--warning)", High: "var(--destructive)", Critical: "var(--on-destructive-container)" };

function ScreenFrame({ title, desc, children, device = "desktop" }: {
  title: string; desc: string; children: React.ReactNode; device?: "desktop" | "mobile";
}) {
  return (
    <div className="mb-10">
      <div className="mb-4">
        <h4 className="text-base" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{title}</h4>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
      </div>
      <div className={`relative ${device === "mobile" ? "max-w-sm mx-auto" : "w-full"}`}>
        {/* Browser chrome for desktop */}
        {device === "desktop" && (
          <div className="rounded-t-2xl px-4 py-3 flex items-center gap-3"
            style={{ background: "var(--foreground)", borderTop: "1px solid var(--foreground)", borderLeft: "1px solid var(--foreground)", borderRight: "1px solid var(--foreground)" }}>
            <div className="flex gap-1.5">
              {["var(--destructive)", "var(--warning)", "var(--success)"].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
            </div>
            <div className="flex-1 rounded-lg px-3 py-1 text-xs" style={{ background: "var(--sidebar)", color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>
              app.claimai.io/dashboard
            </div>
            <RefreshCw size={12} style={{ color: "var(--on-surface-variant)" }} />
          </div>
        )}
        {/* Mobile frame */}
        {device === "mobile" && (
          <div className="rounded-t-3xl px-4 py-2 flex items-center justify-center"
            style={{ background: "var(--sidebar)", borderTop: "3px solid var(--foreground)", borderLeft: "3px solid var(--foreground)", borderRight: "3px solid var(--foreground)" }}>
            <div className="w-16 h-1 rounded-full" style={{ background: "var(--foreground)" }} />
          </div>
        )}
        {/* Screen content */}
        <div className={`overflow-hidden ${device === "mobile" ? "rounded-b-3xl" : "rounded-b-2xl"}`}
          style={{ border: `${device === "mobile" ? 3 : 1}px solid var(--foreground)`, borderTop: "none" }}>
          {children}
        </div>
        {device === "mobile" && (
          <div className="flex justify-center mt-3">
            <div className="w-24 h-1.5 rounded-full" style={{ background: "var(--foreground)" }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Screen 1: Dashboard ────────────────────────────────────────────────────────
function DashboardScreen() {
  return (
    <div className="flex" style={{ background: "var(--background)", minHeight: 480 }}>
      {/* Sidebar */}
      <div className="w-14 flex flex-col items-center py-4 gap-3 shrink-0" style={{ background: "var(--sidebar)" }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "var(--primary)" }}>
          <Zap size={14} className="text-primary-foreground" />
        </div>
        <div className="mt-2 space-y-1.5">
          {[LayoutDashboard, FileText, Shield, BarChart3, Settings].map((Icon, i) => (
            <div key={i} className={`w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all ${i === 0 ? "bg-primary/20" : "hover:bg-card/5"}`}>
              <Icon size={14} style={{ color: i === 0 ? "var(--inverse-primary)" : "var(--on-surface-variant)" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Dashboard</p>
            <p className="text-xs" style={{ color: "var(--outline)" }}>Good morning, Sarah 👋</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "color-mix(in srgb, var(--primary) 10%, transparent)", border: "1px solid var(--primary-container)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--primary)" }} />
              <span className="text-xs" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>AI Active</span>
            </div>
            <div className="flex items-center justify-center rounded-xl" style={{ width: 32, height: 32, background: "var(--card)", border: "1px solid var(--border)" }}>
              <Bell size={13} style={{ color: "var(--muted-foreground)" }} />
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { label: "Total Claims", value: "2,847", change: "+8%", icon: FileText, color: "var(--primary)", bg: "var(--accent)" },
            { label: "Active", value: "347", change: "+3%", icon: Activity, color: "var(--violet)", bg: "var(--violet-container)" },
            { label: "Fraud Alerts", value: "47", change: "+12%", icon: Shield, color: "var(--destructive)", bg: "var(--destructive-container)" },
            { label: "Settled", value: "28", change: "+24%", icon: CheckCircle, color: "var(--success)", bg: "var(--success-container)" },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-xl p-3" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                    <Icon size={12} style={{ color: s.color }} />
                  </div>
                  <span className="text-xs" style={{ color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>{s.change}</span>
                </div>
                <p style={{ fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-lg)", color: "var(--foreground)" }}>{s.value}</p>
                <p className="text-xs" style={{ color: "var(--outline)" }}>{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="col-span-2 rounded-xl p-3" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
            <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claims Volume</p>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={areaData}>
                <defs key="defs-154">
                  <linearGradient id="ds-blue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ds-green" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--success)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis key="XAxis-164" dataKey="m" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
                <Tooltip key="Tooltip-165" contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: "var(--fs-label-sm)" }} />
                <Area key="Area-166" type="monotone" dataKey="s" stroke="var(--primary)" strokeWidth={1.5} fill="url(#ds-blue)" />
                <Area key="Area-167" type="monotone" dataKey="r" stroke="var(--success)" strokeWidth={1.5} fill="url(#ds-green)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl p-3" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
            <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>By Type</p>
            <ResponsiveContainer width="100%" height={80}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={22} outerRadius={38} dataKey="value" paddingAngle={2}>
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-1">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} /><span style={{ fontSize: "var(--fs-label-sm)", color: "var(--muted-foreground)" }}>{d.name}</span></div>
                  <span style={{ fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Claims */}
        <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--surface-container-low)" }}>
            <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Recent Claims</p>
            <span className="text-xs" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>View all →</span>
          </div>
          <table className="w-full text-xs">
            <tbody>
              {claims.slice(0, 3).map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid var(--surface-container-low)" }}>
                  <td className="px-4 py-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)" }}>{c.id}</td>
                  <td className="px-2 py-2" style={{ color: "var(--foreground)" }}>{c.name}</td>
                  <td className="px-2 py-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{c.amount}</td>
                  <td className="px-2 py-2">
                    <span className="px-1.5 py-0.5 rounded-full" style={{ background: `color-mix(in srgb, ${statusColors[c.status]} 8%, transparent)`, color: statusColors[c.status], fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-label-sm)" }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2: Claims List ──────────────────────────────────────────────────────
function ClaimsListScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div style={{ background: "var(--background)", minHeight: 420 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ background: "var(--card)", borderBottom: "1px solid var(--surface-container-high)" }}>
        <div>
          <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claims Management</p>
          <p className="text-xs" style={{ color: "var(--outline)" }}>2,847 total · 347 active · 47 fraud alerts</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-primary-foreground"
          style={{ background: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>
          <Plus size={12} /> New Claim
        </button>
      </div>

      <div className="p-6">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-48">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--outline)" }} />
            <input placeholder="Search claims…" className="w-full rounded-xl text-xs pl-8 pr-3 outline-none"
              style={{ height: 34, border: "1.5px solid var(--border)", background: "var(--card)", color: "var(--foreground)" }} />
          </div>
          {["All Status", "Risk Level", "Date Range"].map(f => (
            <button key={f} className="flex items-center gap-1 px-3 rounded-xl text-xs"
              style={{ height: 34, border: "1px solid var(--border)", background: "var(--card)", color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>
              {f} <ChevronDown size={10} />
            </button>
          ))}
          <button className="flex items-center gap-1 px-3 rounded-xl text-xs ml-auto"
            style={{ height: 34, border: "1px solid var(--border)", background: "var(--card)", color: "var(--on-surface-variant)" }}>
            <Download size={11} /> Export
          </button>
        </div>

        {/* Filter tags */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {[{ label: "Status: Active", color: "var(--primary)" }, { label: "Risk: High", color: "var(--destructive)" }, { label: "Type: Auto", color: "var(--violet)" }].map(t => (
            <span key={t.label} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
              style={{ background: `color-mix(in srgb, ${t.color} 7%, transparent)`, color: t.color, fontWeight: "var(--font-weight-medium)" }}>
              {t.label} <X size={9} />
            </span>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
          <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--surface-container)" }}>
            {["", "Claim #", "Claimant", "Type", "Amount", "AI Score", "Risk", "Status", "Actions"].map((h, i) => (
              <div key={i} className="text-xs" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)", flex: i === 0 ? "0 0 20px" : 1, minWidth: i === 0 ? 20 : 60 }}>{h}</div>
            ))}
          </div>
          {claims.map((c, i) => {
            const sel = selected.includes(c.id);
            return (
              <div key={c.id} className="flex items-center px-4 py-3 transition-colors hover:bg-accent/20 cursor-pointer"
                style={{ borderBottom: i < claims.length - 1 ? "1px solid var(--surface-container-low)" : "none", background: sel ? "var(--accent)" : "transparent" }}>
                <div className="flex-shrink-0 mr-3" style={{ width: 16 }}>
                  <div onClick={() => setSelected(s => sel ? s.filter(x => x !== c.id) : [...s, c.id])}
                    className="flex items-center justify-center rounded cursor-pointer"
                    style={{ width: 14, height: 14, background: sel ? "var(--primary)" : "var(--primary-foreground)", border: sel ? "none" : "1.5px solid var(--outline-variant)" }}>
                    {sel && <Check size={9} className="text-primary-foreground" />}
                  </div>
                </div>
                <div className="flex-1 text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)" }}>{c.id}</div>
                <div className="flex-1 text-xs" style={{ color: "var(--foreground)" }}>{c.name}</div>
                <div className="flex-1"><span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "var(--surface-container)", color: "var(--muted-foreground)" }}>{c.type}</span></div>
                <div className="flex-1 text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{c.amount}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <div className="rounded-full overflow-hidden" style={{ width: 36, height: 3, background: "var(--surface-container)" }}>
                      <div className="h-full" style={{ width: `${c.ai}%`, background: c.ai >= 80 ? "var(--success)" : "var(--warning)" }} />
                    </div>
                    <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--muted-foreground)" }}>{c.ai}%</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-xs" style={{ color: riskColors[c.risk], fontWeight: "var(--font-weight-medium)" }}>{c.risk}</span>
                </div>
                <div className="flex-1">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `color-mix(in srgb, ${statusColors[c.status]} 8%, transparent)`, color: statusColors[c.status], fontWeight: "var(--font-weight-medium)" }}>{c.status}</span>
                </div>
                <div className="flex-1 flex gap-1">
                  <button className="p-1 rounded hover:bg-accent transition-colors" style={{ color: "var(--primary)" }}><Eye size={11} /></button>
                  <button className="p-1 rounded hover:bg-surface-container transition-colors" style={{ color: "var(--muted-foreground)" }}><Edit size={11} /></button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs" style={{ color: "var(--outline)" }}>Showing 1–25 of 2,847 claims</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 114].map((p, i) => (
              <button key={i} className="text-xs rounded-lg px-2"
                style={{ height: 28, background: p === 1 ? "var(--primary)" : "var(--primary-foreground)", color: p === 1 ? "var(--primary-foreground)" : "var(--muted-foreground)", border: "1px solid var(--border)" }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3: Claim Detail ─────────────────────────────────────────────────────
function ClaimDetailScreen() {
  const [tab, setTab] = useState("overview");
  return (
    <div style={{ background: "var(--background)", minHeight: 500 }}>
      {/* Top bar */}
      <div className="px-6 py-3 flex items-center gap-2" style={{ background: "var(--card)", borderBottom: "1px solid var(--surface-container-high)" }}>
        <span className="text-xs" style={{ color: "var(--outline)" }}>Claims</span>
        <ChevronRight size={10} style={{ color: "var(--outline-variant)" }} />
        <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>CLM-2024-001</span>
      </div>

      <div className="p-5 space-y-4">
        {/* AI Banner */}
        <div className="rounded-2xl p-4" style={{ background: "var(--sidebar)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={13} style={{ color: "var(--violet-soft)" }} />
            <span className="text-xs" style={{ color: "var(--violet-soft)", fontWeight: "var(--font-weight-medium)" }}>AI RISK ASSESSMENT · 94.7% confidence</span>
          </div>
          <p className="text-sm text-primary-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>High-risk claim detected. Multiple fraud indicators present.</p>
          <div className="flex items-center gap-4 mt-3">
            <div>
              <p className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>Risk Score</p>
              <p style={{ color: "var(--destructive-soft)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-lg)" }}>87/100</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>Suggested Action</p>
              <p style={{ color: "var(--inverse-primary)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-sm)" }}>Manual Investigation</p>
            </div>
            <button className="ml-auto px-3 py-1.5 rounded-xl text-xs"
              style={{ background: "color-mix(in srgb, var(--card) 10%, transparent)", color: "var(--primary-foreground)", fontWeight: "var(--font-weight-medium)" }}>
              View Analysis →
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
            <div className="border-b pb-3 mb-3" style={{ borderColor: "var(--surface-container)" }}>
              <div className="flex gap-1">
                {["overview", "documents", "timeline"].map(t => (
                  <button key={t} onClick={() => setTab(t)} className="text-xs px-3 py-1.5 rounded-lg capitalize transition-all"
                    style={{ background: tab === t ? "var(--accent)" : "transparent", color: tab === t ? "var(--primary)" : "var(--outline)", fontWeight: tab === t ? 700 : 400 }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            {tab === "overview" && (
              <div className="grid grid-cols-2 gap-2">
                {[["Claimant", "James Wilson"], ["Policy", "POL-2024-00421"], ["Type", "Auto Accident"], ["Amount", "$24,200"], ["Location", "Miami, FL"], ["Date Filed", "Apr 14, 2024"]].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-xs" style={{ color: "var(--outline)" }}>{k}</p>
                    <p className="text-xs mt-0.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{v}</p>
                  </div>
                ))}
              </div>
            )}
            {tab === "documents" && (
              <div className="space-y-2">
                {["Police Report.pdf", "Damage Photos.zip", "Medical Records.pdf"].map(f => (
                  <div key={f} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: "var(--surface-container-low)" }}>
                    <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "var(--accent)" }}>
                      <FileText size={10} style={{ color: "var(--primary)" }} />
                    </div>
                    <span className="text-xs flex-1" style={{ color: "var(--foreground)" }}>{f}</span>
                    <Eye size={10} style={{ color: "var(--outline)" }} />
                  </div>
                ))}
              </div>
            )}
            {tab === "timeline" && (
              <div className="space-y-3">
                {[{ t: "Apr 16", e: "Documents Received", c: "var(--success)" }, { t: "Apr 15", e: "AI Analysis: High Risk", c: "var(--destructive)" }, { t: "Apr 14", e: "Claim Submitted", c: "var(--primary)" }].map((e, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-2 h-2 rounded-full mt-1" style={{ background: e.c }} />
                    <div><p className="text-xs" style={{ color: "var(--outline)" }}>{e.t}</p><p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{e.e}</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
              <p className="text-xs mb-3" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Actions</p>
              {[
                { label: "Approve Claim", color: "var(--success)" },
                { label: "Request Info", color: "var(--primary)" },
                { label: "Reject Claim", color: "var(--destructive)" },
              ].map(a => (
                <button key={a.label} className="w-full text-xs rounded-xl py-2 mb-2 text-primary-foreground"
                  style={{ background: a.color, fontWeight: "var(--font-weight-medium)" }}>{a.label}</button>
              ))}
            </div>
            <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
              <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Adjuster</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-primary-foreground" style={{ background: "var(--success)", fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}>SJ</div>
                <div><p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Sarah Johnson</p><p style={{ fontSize: "var(--fs-label-sm)", color: "var(--outline)" }}>Sr. Adjuster</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: Settings ─────────────────────────────────────────────────────────
function SettingsScreen() {
  return (
    <div style={{ background: "var(--background)", minHeight: 420 }}>
      <div className="px-6 py-4" style={{ background: "var(--card)", borderBottom: "1px solid var(--surface-container-high)" }}>
        <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Settings</p>
        <p className="text-xs" style={{ color: "var(--outline)" }}>Manage your account preferences and security</p>
      </div>
      <div className="flex p-5 gap-5">
        {/* Settings nav */}
        <div className="w-40 shrink-0">
          <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
            {[
              { icon: User, label: "Profile", active: true },
              { icon: Bell, label: "Notifications", active: false },
              { icon: Lock, label: "Security", active: false },
              { icon: Globe, label: "Integrations", active: false },
              { icon: CreditCard, label: "Billing", active: false },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5 px-4 py-3 cursor-pointer transition-colors"
                  style={{ background: item.active ? "var(--accent)" : "transparent", borderLeft: `2px solid ${item.active ? "var(--primary)" : "transparent"}`, borderBottom: "1px solid var(--surface-container-low)" }}>
                  <Icon size={13} style={{ color: item.active ? "var(--primary)" : "var(--outline)" }} />
                  <span className="text-xs" style={{ color: item.active ? "var(--primary)" : "var(--muted-foreground)", fontWeight: item.active ? 700 : 400 }}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* Settings content */}
        <div className="flex-1 space-y-4">
          <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
            <p className="text-xs mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Profile Information</p>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-primary-foreground"
                style={{ background: "var(--success)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-lg)" }}>SJ</div>
              <div>
                <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Sarah Johnson</p>
                <p className="text-xs" style={{ color: "var(--outline)" }}>Senior Claims Adjuster · InsureCorp Global</p>
              </div>
              <button className="ml-auto text-xs px-3 py-1.5 rounded-xl" style={{ border: "1px solid var(--border)", color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Edit</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: "Full Name", value: "Sarah Johnson" }, { label: "Email", value: "sarah.j@insurecorp.com" }, { label: "Department", value: "Claims Operations" }, { label: "Team", value: "East Coast Squad" }].map(f => (
                <div key={f.label}>
                  <label className="block text-xs mb-1" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--outline)" }}>{f.label}</label>
                  <input defaultValue={f.value} className="w-full rounded-xl text-xs p-2.5 outline-none"
                    style={{ border: "1.5px solid var(--border)", color: "var(--foreground)", height: 36 }} />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Security</p>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--success-container)", color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>All Secure ✓</span>
            </div>
            <div className="space-y-2">
              {[{ label: "Two-Factor Authentication", value: "Enabled", color: "var(--success)" }, { label: "Password Last Changed", value: "14 days ago", color: "var(--muted-foreground)" }, { label: "Active Sessions", value: "2 devices", color: "var(--muted-foreground)" }].map(s => (
                <div key={s.label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--surface-container-low)" }}>
                  <span className="text-xs" style={{ color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>{s.label}</span>
                  <span className="text-xs" style={{ color: s.color, fontWeight: "var(--font-weight-medium)" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 5: Mobile ──────────────────────────────────────────────────────────
function MobileScreen() {
  const [tab, setTab] = useState("dashboard");
  return (
    <div style={{ background: "var(--background)", minHeight: 580 }}>
      {/* Mobile Header */}
      <div className="px-4 pt-5 pb-3" style={{ background: "var(--sidebar)" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "var(--primary)" }}>
            <Zap size={12} className="text-primary-foreground" />
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: "color-mix(in srgb, var(--primary) 20%, transparent)" }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--inverse-primary)" }} />
            <span className="text-xs" style={{ color: "var(--inverse-primary)", fontWeight: "var(--font-weight-medium)" }}>AI Active</span>
          </div>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-primary-foreground" style={{ background: "var(--success)", fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}>SJ</div>
        </div>
        <p className="text-xs text-primary-foreground mb-0.5" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>Good morning,</p>
        <p className="text-base text-primary-foreground mb-3" style={{ fontWeight: "var(--font-weight-medium)" }}>Sarah Johnson 👋</p>
        {/* Quick KPIs */}
        <div className="grid grid-cols-3 gap-2">
          {[{ label: "Active", value: "347" }, { label: "Alerts", value: "12" }, { label: "Due Today", value: "8" }].map(k => (
            <div key={k.label} className="rounded-xl p-2.5 text-center" style={{ background: "color-mix(in srgb, var(--card) 8%, transparent)" }}>
              <p className="text-base text-primary-foreground" style={{ fontWeight: "var(--font-weight-medium)" }}>{k.value}</p>
              <p style={{ fontSize: "var(--fs-label-sm)", color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>{k.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Fraud Alert Card */}
        <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--destructive-container)", boxShadow: "0 2px 12px color-mix(in srgb, var(--destructive) 8%, transparent)" }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={13} style={{ color: "var(--destructive)" }} />
            <span className="text-xs" style={{ color: "var(--destructive)", fontWeight: "var(--font-weight-medium)" }}>FRAUD ALERT</span>
          </div>
          <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>CLM-2024-003 — Critical Risk</p>
          <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Multiple fraud indicators: duplicate policy, IP mismatch, unusual claim pattern.</p>
          <button className="mt-3 w-full py-2 rounded-xl text-xs text-primary-foreground" style={{ background: "var(--destructive)", fontWeight: "var(--font-weight-medium)" }}>Review Immediately →</button>
        </div>

        {/* Recent Claims */}
        <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Recent Claims</p>
        {claims.slice(0, 3).map(c => (
          <div key={c.id} className="rounded-xl p-3.5" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)" }}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)" }}>{c.id}</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `color-mix(in srgb, ${statusColors[c.status]} 8%, transparent)`, color: statusColors[c.status], fontWeight: "var(--font-weight-medium)" }}>{c.status}</span>
            </div>
            <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{c.name}</p>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{c.amount}</span>
              <div className="flex items-center gap-1">
                <div className="rounded-full overflow-hidden" style={{ width: 28, height: 3, background: "var(--surface-container)" }}>
                  <div className="h-full" style={{ width: `${c.ai}%`, background: c.ai >= 80 ? "var(--success)" : "var(--warning)" }} />
                </div>
                <span style={{ fontSize: "var(--fs-label-sm)", color: "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" }}>AI {c.ai}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Tab Bar */}
      <div className="sticky bottom-0 flex items-center justify-around py-3 px-2"
        style={{ background: "var(--card)", borderTop: "1px solid var(--surface-container)", boxShadow: "0 -4px 16px color-mix(in srgb, var(--foreground) 6%, transparent)" }}>
        {[{ icon: LayoutDashboard, label: "Home", id: "dashboard" }, { icon: FileText, label: "Claims", id: "claims" }, { icon: Shield, label: "Fraud", id: "fraud" }, { icon: Bell, label: "Alerts", id: "alerts" }, { icon: User, label: "Profile", id: "profile" }].map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className="flex flex-col items-center gap-1 px-2 transition-all">
              <Icon size={16} style={{ color: tab === t.id ? "var(--primary)" : "var(--outline)" }} />
              <span style={{ fontSize: "var(--fs-label-sm)", color: tab === t.id ? "var(--primary)" : "var(--outline)", fontWeight: tab === t.id ? 700 : 400 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Export ────────────────────────────────────────────────────────────────
export function ScreensSection() {
  return (
    <div>
      <ScreenFrame title="Screen 1 — Dashboard" desc="KPI overview with charts, activity feed, and quick actions. Desktop layout.">
        <DashboardScreen />
      </ScreenFrame>
      <ScreenFrame title="Screen 2 — Claims Management List" desc="Searchable, filterable data table with bulk actions and pagination.">
        <ClaimsListScreen />
      </ScreenFrame>
      <ScreenFrame title="Screen 3 — Claim Detail View" desc="AI risk banner, tabbed detail panel, actions sidebar, and timeline.">
        <ClaimDetailScreen />
      </ScreenFrame>
      <ScreenFrame title="Screen 4 — Settings Page" desc="Sidebar navigation settings with profile, security, and notifications.">
        <SettingsScreen />
      </ScreenFrame>
      <ScreenFrame title="Screen 5 — Mobile App" desc="Responsive mobile layout with bottom tab navigation. iOS-style design." device="mobile">
        <MobileScreen />
      </ScreenFrame>
    </div>
  );
}
