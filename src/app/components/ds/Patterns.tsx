import { useState } from "react";
import {
  Search, Filter, Download, ChevronDown, Check, MoreHorizontal, ArrowUpDown,
  Zap, Shield, Eye, Edit, Trash2, ChevronLeft, ChevronRight, Plus, X,
  AlertCircle, CheckCircle, Upload, Lock, Bell, Globe, CreditCard, User, Palette
} from "lucide-react";

// ─── Shared ────────────────────────────────────────────────────────────────────
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

const statusColors: Record<string, string> = {
  "New": "var(--primary)", "Under Review": "var(--warning)", "Approved": "var(--success)", "Rejected": "var(--destructive)",
  "Settled": "var(--muted-foreground)", "Investigation": "var(--violet)", "Pending": "var(--info)",
};
const riskColors: Record<string, string> = { Low: "var(--success)", Medium: "var(--warning)", High: "var(--destructive)", Critical: "var(--on-destructive-container)" };

const tableData = [
  { id: "CLM-001", claimant: "James Wilson", type: "Auto", amount: "$24,200", risk: "High", status: "Investigation", ai: 87, date: "Apr 14" },
  { id: "CLM-002", claimant: "Maria Santos", type: "Medical", amount: "$8,750", risk: "Low", status: "Approved", ai: 96, date: "Apr 13" },
  { id: "CLM-003", claimant: "Robert Kim", type: "Property", amount: "$52,000", risk: "Critical", status: "New", ai: 42, date: "Apr 12" },
  { id: "CLM-004", claimant: "Linda Park", type: "Travel", amount: "$3,400", risk: "Low", status: "Settled", ai: 98, date: "Apr 11" },
  { id: "CLM-005", claimant: "David Chen", type: "Auto", amount: "$18,900", risk: "Medium", status: "Under Review", ai: 71, date: "Apr 10" },
];

// ─── 1. Data Table Pattern ─────────────────────────────────────────────────────
export function DataTablePattern() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ col: string; dir: "asc" | "desc" }>({ col: "id", dir: "asc" });

  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const all = selected.length === tableData.length;
  const toggleAll = () => setSelected(all ? [] : tableData.map(r => r.id));

  const filtered = tableData.filter(r =>
    r.claimant.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SectionCard title="Data Table Pattern" desc="Sortable, filterable table with bulk actions, search, and row selection.">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-48">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--outline)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search claims, claimants…"
            className="w-full rounded-xl text-xs pl-8 pr-3 outline-none transition-all"
            style={{ height: 36, border: "1.5px solid var(--border)", color: "var(--foreground)", background: "var(--surface-container-low)" }} />
        </div>
        <button className="flex items-center gap-1.5 px-3 rounded-xl text-xs transition-all hover:bg-accent"
          style={{ height: 36, border: "1px solid var(--border)", background: "var(--card)", color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>
          <Filter size={12} /> Filter
          <span className="px-1.5 py-0.5 rounded-full text-primary-foreground" style={{ background: "var(--primary)", fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}>2</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 rounded-xl text-xs transition-all hover:bg-accent"
          style={{ height: 36, border: "1px solid var(--border)", background: "var(--card)", color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>
          <Download size={12} /> Export
        </button>
        {selected.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl ml-auto"
            style={{ background: "var(--accent)", border: "1px solid var(--primary-container)" }}>
            <span className="text-xs" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>{selected.length} selected</span>
            <button className="text-xs px-2.5 py-1 rounded-lg text-primary-foreground" style={{ background: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>Approve</button>
            <button className="text-xs px-2.5 py-1 rounded-lg text-primary-foreground" style={{ background: "var(--destructive)", fontWeight: "var(--font-weight-medium)" }}>Reject</button>
            <button onClick={() => setSelected([])} style={{ color: "var(--outline)" }}><X size={12} /></button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--surface-container)" }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--surface-container)" }}>
              <th className="px-4 py-3 text-left">
                <div onClick={toggleAll} className="flex items-center justify-center rounded cursor-pointer transition-all"
                  style={{ width: 16, height: 16, background: all ? "var(--primary)" : "var(--primary-foreground)", border: all ? "none" : "1.5px solid var(--outline-variant)" }}>
                  {all && <Check size={10} className="text-primary-foreground" />}
                </div>
              </th>
              {[["Claim #", "id"], ["Claimant", "claimant"], ["Type", "type"], ["Amount", "amount"], ["AI Score", "ai"], ["Risk", "risk"], ["Status", "status"], ["Date", "date"]].map(([label, col]) => (
                <th key={col} className="px-3 py-3 text-left" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>
                  <button className="flex items-center gap-1" onClick={() => setSort(s => ({ col, dir: s.col === col && s.dir === "asc" ? "desc" : "asc" }))}>
                    {label}
                    <ArrowUpDown size={10} style={{ color: sort.col === col ? "var(--primary)" : "var(--outline-variant)" }} />
                  </button>
                </th>
              ))}
              <th className="px-3 py-3 text-left" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => {
              const isSelected = selected.includes(row.id);
              return (
                <tr key={row.id} style={{ background: isSelected ? "var(--accent)" : i % 2 === 0 ? "var(--primary-foreground)" : "var(--surface-container-low)", borderBottom: "1px solid var(--surface-container-low)" }}
                  className="transition-colors hover:bg-accent/30 cursor-pointer">
                  <td className="px-4 py-3">
                    <div onClick={() => toggle(row.id)} className="flex items-center justify-center rounded cursor-pointer"
                      style={{ width: 16, height: 16, background: isSelected ? "var(--primary)" : "var(--primary-foreground)", border: isSelected ? "none" : "1.5px solid var(--outline-variant)" }}>
                      {isSelected && <Check size={10} className="text-primary-foreground" />}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      {row.risk === "Critical" && <Zap size={10} style={{ color: "var(--destructive)" }} />}
                      <span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)" }}>{row.id}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3" style={{ color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>{row.claimant}</td>
                  <td className="px-3 py-3">
                    <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--surface-container)", color: "var(--muted-foreground)" }}>{row.type}</span>
                  </td>
                  <td className="px-3 py-3" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{row.amount}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full overflow-hidden" style={{ width: 40, height: 4, background: "var(--surface-container)" }}>
                        <div className="h-full rounded-full" style={{ width: `${row.ai}%`, background: row.ai >= 80 ? "var(--success)" : row.ai >= 60 ? "var(--warning)" : "var(--destructive)" }} />
                      </div>
                      <span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--muted-foreground)" }}>{row.ai}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="rounded-full" style={{ width: 6, height: 6, background: riskColors[row.risk] }} />
                      <span style={{ color: riskColors[row.risk], fontWeight: "var(--font-weight-medium)" }}>{row.risk}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="px-2.5 py-1 rounded-full" style={{ background: `color-mix(in srgb, ${statusColors[row.status]} 8%, transparent)`, color: statusColors[row.status], fontWeight: "var(--font-weight-medium)" }}>{row.status}</span>
                  </td>
                  <td className="px-3 py-3" style={{ color: "var(--outline)" }}>{row.date}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-accent transition-colors" style={{ color: "var(--primary)" }}><Eye size={12} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors" style={{ color: "var(--muted-foreground)" }}><Edit size={12} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-destructive-container transition-colors" style={{ color: "var(--destructive)" }}><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs" style={{ color: "var(--outline)" }}>Showing {filtered.length} of {tableData.length} claims</p>
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1 px-3 rounded-lg text-xs"
            style={{ height: 30, border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)" }}>
            <ChevronLeft size={10} /> Prev
          </button>
          {[1, 2, 3].map(p => (
            <button key={p} className="rounded-lg text-xs font-semibold"
              style={{ width: 30, height: 30, background: p === 1 ? "var(--primary)" : "var(--primary-foreground)", color: p === 1 ? "var(--primary-foreground)" : "var(--muted-foreground)", border: "1px solid var(--border)" }}>{p}</button>
          ))}
          <button className="flex items-center gap-1 px-3 rounded-lg text-xs"
            style={{ height: 30, border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)" }}>
            Next <ChevronRight size={10} />
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

// ─── 2. Form Pattern ───────────────────────────────────────────────────────────
export function FormPattern() {
  const [step, setStep] = useState(1);
  const steps = ["Claim Info", "Incident Details", "Documents", "Review"];

  return (
    <SectionCard title="Multi-Step Form Pattern" desc="Guided multi-step wizard with progress indicator and validation.">
      {/* Step Progress */}
      <div className="flex items-center mb-6">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <button onClick={() => setStep(i + 1)}
                className="flex items-center justify-center rounded-full text-xs transition-all"
                style={{ width: 28, height: 28, background: i + 1 < step ? "var(--success)" : i + 1 === step ? "var(--primary)" : "var(--surface-container)", color: i + 1 <= step ? "var(--primary-foreground)" : "var(--outline)", fontWeight: "var(--font-weight-medium)", boxShadow: i + 1 === step ? "0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent)" : "none" }}>
                {i + 1 < step ? <Check size={12} /> : i + 1}
              </button>
              <span className="text-xs mt-1 whitespace-nowrap hidden sm:block" style={{ color: i + 1 === step ? "var(--primary)" : "var(--outline)", fontWeight: i + 1 === step ? 700 : 400, fontSize: "var(--fs-label-sm)" }}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 mx-1" style={{ height: 2, background: i + 1 < step ? "var(--success)" : "var(--surface-container)", transition: "background 300ms" }} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="p-5 rounded-xl mb-4" style={{ background: "var(--surface-container-low)", border: "1px solid var(--surface-container)" }}>
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Claimant Full Name", ph: "Enter full legal name…" },
              { label: "Policy Number", ph: "POL-XXXX-XXXX" },
              { label: "Claim Type", ph: "" },
              { label: "Date of Incident", ph: "MM / DD / YYYY" },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-xs mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{f.label}</label>
                <input placeholder={f.ph} className="w-full rounded-xl text-xs p-3 outline-none"
                  style={{ border: "1.5px solid var(--border)", background: "var(--card)", color: "var(--foreground)", height: 40 }} />
              </div>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Incident Description</label>
              <textarea rows={4} placeholder="Describe what happened, when and where it occurred, and any witnesses present…"
                className="w-full rounded-xl text-xs p-3 outline-none resize-none"
                style={{ border: "1.5px solid var(--border)", background: "var(--card)", color: "var(--foreground)" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Estimated Loss Amount</label>
                <input placeholder="$0.00" className="w-full rounded-xl text-xs p-3 outline-none"
                  style={{ border: "1.5px solid var(--border)", background: "var(--card)", color: "var(--foreground)", height: 40 }} />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Location of Incident</label>
                <input placeholder="City, State, Country" className="w-full rounded-xl text-xs p-3 outline-none"
                  style={{ border: "1.5px solid var(--border)", background: "var(--card)", color: "var(--foreground)", height: 40 }} />
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center"
              style={{ borderColor: "var(--primary-container)", background: "var(--accent)" }}>
              <Upload size={24} style={{ color: "var(--primary)" }} className="mb-3" />
              <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Drop files here or click to upload</p>
              <p className="text-xs mt-1" style={{ color: "var(--outline)" }}>PNG, JPG, PDF up to 25MB · Max 10 files</p>
              <button className="mt-3 px-4 py-2 rounded-xl text-xs text-primary-foreground" style={{ background: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>Browse Files</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--success-container)", border: "1px solid var(--success-border)" }}>
              <CheckCircle size={16} style={{ color: "var(--success)" }} />
              <p className="text-xs" style={{ color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>All required fields completed. Ready to submit.</p>
            </div>
            {[["Claimant", "James Wilson"], ["Policy", "POL-2024-00421"], ["Type", "Auto Accident"], ["Amount", "$24,200"]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs py-2 border-b" style={{ borderColor: "var(--surface-container)" }}>
                <span style={{ color: "var(--outline)" }}>{k}</span>
                <span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button disabled={step === 1} onClick={() => setStep(s => s - 1)}
          className="flex items-center gap-1.5 px-4 rounded-xl text-xs transition-all disabled:opacity-40"
          style={{ height: 36, border: "1px solid var(--border)", background: "var(--card)", color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>
          <ChevronLeft size={12} /> Back
        </button>
        <button onClick={() => setStep(s => Math.min(steps.length, s + 1))}
          className="flex items-center gap-1.5 px-4 rounded-xl text-xs text-primary-foreground transition-all hover:-translate-y-0.5"
          style={{ height: 36, background: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>
          {step === steps.length ? "Submit Claim" : "Continue"} <ChevronRight size={12} />
        </button>
      </div>
    </SectionCard>
  );
}

// ─── 3. Settings Pattern ───────────────────────────────────────────────────────
export function SettingsPattern() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifState, setNotifState] = useState({
    email: true,
    sms: true,
    digest: false,
    sla: true,
    ai: false,
  });
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const notifItems = [
    { key: "email" as const, label: "Email notifications for new claims" },
    { key: "sms" as const, label: "SMS alerts for fraud detection" },
    { key: "digest" as const, label: "Daily digest summary" },
    { key: "sla" as const, label: "SLA breach warnings" },
    { key: "ai" as const, label: "AI analysis complete" },
  ];

  return (
    <SectionCard title="Settings Page Pattern" desc="Sidebar-nav settings layout with grouped preference sections.">
      <div className="flex gap-6" style={{ minHeight: 300 }}>
        {/* Settings Sidebar */}
        <div className="w-40 shrink-0">
          <nav className="space-y-1">
            {tabs.map(t => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className="flex items-center gap-2 w-full rounded-xl px-3 py-2.5 text-xs text-left transition-all"
                  style={{ background: activeTab === t.id ? "var(--accent)" : "transparent", color: activeTab === t.id ? "var(--primary)" : "var(--muted-foreground)", fontWeight: activeTab === t.id ? 700 : 400, borderLeft: `2px solid ${activeTab === t.id ? "var(--primary)" : "transparent"}` }}>
                  <Icon size={13} />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-4">
          {activeTab === "profile" && (
            <>
              <div className="flex items-center gap-3 pb-4" style={{ borderBottom: "1px solid var(--surface-container)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-primary-foreground"
                  style={{ background: "var(--success)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-lg)" }}>SJ</div>
                <div>
                  <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Sarah Johnson</p>
                  <p className="text-xs" style={{ color: "var(--outline)" }}>Senior Claims Adjuster</p>
                </div>
                <button className="ml-auto text-xs px-3 py-1.5 rounded-lg" style={{ border: "1px solid var(--border)", color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Edit Photo</button>
              </div>
              {[{ label: "Full Name", value: "Sarah Johnson" }, { label: "Email", value: "sarah.j@insurecorp.com" }, { label: "Department", value: "Claims Operations" }].map(f => (
                <div key={f.label}>
                  <label className="block text-xs mb-1" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{f.label}</label>
                  <input defaultValue={f.value} className="w-full rounded-lg text-xs p-2.5 outline-none"
                    style={{ border: "1.5px solid var(--border)", color: "var(--foreground)", height: 36 }} />
                </div>
              ))}
            </>
          )}
          {activeTab === "notifications" && (
            <div className="space-y-3">
              {notifItems.map(item => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--surface-container-low)" }}>
                  <span className="text-xs" style={{ color: "var(--foreground)" }}>{item.label}</span>
                  <button onClick={() => setNotifState(s => ({ ...s, [item.key]: !s[item.key] }))}
                    className="relative rounded-full transition-all"
                    style={{ width: 36, height: 20, background: notifState[item.key] ? "var(--primary)" : "var(--outline-variant)" }}>
                    <div className="absolute top-0.5 rounded-full bg-card transition-all"
                      style={{ width: 16, height: 16, left: notifState[item.key] ? 18 : 2 }} />
                  </button>
                </div>
              ))}
            </div>
          )}
          {activeTab === "security" && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl" style={{ background: "var(--success-container)", border: "1px solid var(--success-border)" }}>
                <div className="flex items-center gap-2">
                  <CheckCircle size={13} style={{ color: "var(--success)" }} />
                  <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--success)" }}>2FA Enabled — Account Secured</p>
                </div>
              </div>
              {[{ label: "Change Password", icon: Lock }, { label: "Active Sessions", icon: Globe }, { label: "API Keys", icon: CreditCard }].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-xl" style={{ border: "1px solid var(--surface-container)" }}>
                    <div className="flex items-center gap-2">
                      <Icon size={13} style={{ color: "var(--muted-foreground)" }} />
                      <span className="text-xs" style={{ color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>{item.label}</span>
                    </div>
                    <ChevronRight size={12} style={{ color: "var(--outline)" }} />
                  </div>
                );
              })}
            </div>
          )}
          {activeTab === "appearance" && (
            <div className="space-y-4">
              <div>
                <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Theme</p>
                <div className="grid grid-cols-3 gap-2">
                  {["Light", "Dark", "System"].map(t => (
                    <button key={t} className="py-2 rounded-xl text-xs transition-all"
                      style={{ border: t === "Light" ? "2px solid var(--primary)" : "1px solid var(--border)", color: t === "Light" ? "var(--primary)" : "var(--muted-foreground)", fontWeight: t === "Light" ? 700 : 400 }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Accent Color</p>
                <div className="flex gap-2">
                  {["var(--primary)", "var(--violet)", "var(--success)", "var(--warning)", "var(--destructive)"].map(c => (
                    <div key={c} className="w-7 h-7 rounded-full cursor-pointer transition-all hover:scale-110"
                      style={{ background: c, boxShadow: c === "var(--primary)" ? `0 0 0 3px white, 0 0 0 5px ${c}` : "none" }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}

// ─── 4. Detail Panel Pattern ───────────────────────────────────────────────────
export function DetailPanelPattern() {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <SectionCard title="Detail Panel Pattern" desc="Profile/info header with tabbed content sections for drill-down views.">
      {/* Header */}
      <div className="rounded-xl p-5 mb-4" style={{ background: "var(--sidebar)", position: "relative", overflow: "hidden" }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ background: "var(--primary)", transform: "translate(40%, -40%)" }} />
        <div className="flex items-start gap-4 relative">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-primary-foreground shrink-0"
            style={{ background: "var(--success)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-lg)" }}>JW</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-primary-foreground text-sm" style={{ fontWeight: "var(--font-weight-medium)" }}>CLM-2024-001</p>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "color-mix(in srgb, var(--destructive) 20%, transparent)", color: "var(--destructive-container)", fontWeight: "var(--font-weight-medium)" }}>High Risk</span>
            </div>
            <p className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>James Wilson · Auto Accident · Filed Apr 14, 2024</p>
            <div className="flex items-center gap-4 mt-3">
              <div><p className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>Amount</p><p className="text-primary-foreground text-sm" style={{ fontWeight: "var(--font-weight-medium)" }}>$24,200</p></div>
              <div><p className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>AI Score</p><p style={{ color: "var(--success)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-md)" }}>87%</p></div>
              <div><p className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>Status</p><p style={{ color: "var(--warning)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-body-md)" }}>Under Review</p></div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-xl text-xs text-primary-foreground" style={{ background: "color-mix(in srgb, var(--card) 10%, transparent)", fontWeight: "var(--font-weight-medium)" }}>Approve</button>
            <button className="px-3 py-1.5 rounded-xl text-xs text-primary-foreground" style={{ background: "color-mix(in srgb, var(--destructive) 30%, transparent)", fontWeight: "var(--font-weight-medium)" }}>Reject</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-4" style={{ borderColor: "var(--surface-container)" }}>
        <div className="flex gap-1">
          {["overview", "documents", "timeline", "notes"].map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className="px-4 py-2.5 text-xs capitalize transition-all relative"
              style={{ color: activeTab === t ? "var(--primary)" : "var(--outline)", fontWeight: activeTab === t ? 700 : 400 }}>
              {t}
              {activeTab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "var(--primary)" }} />}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Policy Number", "POL-2024-00421"],
            ["Incident Location", "Miami, FL"],
            ["Adjuster", "Sarah Johnson"],
            ["SLA Deadline", "Apr 20, 2024"],
            ["Last Updated", "2 hours ago"],
            ["Documents", "7 files uploaded"],
          ].map(([k, v]) => (
            <div key={k} className="p-3 rounded-xl" style={{ background: "var(--surface-container-low)" }}>
              <p className="text-xs" style={{ color: "var(--outline)" }}>{k}</p>
              <p className="text-xs mt-0.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{v}</p>
            </div>
          ))}
        </div>
      )}
      {activeTab === "documents" && (
        <div className="space-y-2">
          {[{ name: "Police Report.pdf", size: "2.4 MB", type: "PDF" }, { name: "Damage Photos.zip", size: "18.7 MB", type: "ZIP" }, { name: "Medical Records.pdf", size: "5.1 MB", type: "PDF" }].map(f => (
            <div key={f.name} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--surface-container-low)", border: "1px solid var(--surface-container)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)" }}>
                <span className="text-xs" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-label-sm)" }}>{f.type}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{f.name}</p>
                <p className="text-xs" style={{ color: "var(--outline)" }}>{f.size}</p>
              </div>
              <button style={{ color: "var(--primary)" }}><Download size={12} /></button>
            </div>
          ))}
        </div>
      )}
      {activeTab === "timeline" && (
        <div className="space-y-4">
          {[
            { time: "Apr 14, 2024 — 9:15 AM", event: "Claim Submitted", desc: "Initial claim filed via web portal", color: "var(--primary)" },
            { time: "Apr 14, 2024 — 9:17 AM", event: "AI Analysis Complete", desc: "87% confidence · High risk flagged", color: "var(--violet)" },
            { time: "Apr 15, 2024 — 11:30 AM", event: "Documents Requested", desc: "Police report and medical records", color: "var(--warning)" },
            { time: "Apr 16, 2024 — 2:00 PM", event: "Documents Received", desc: "7 of 7 documents verified", color: "var(--success)" },
          ].map((t, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: t.color, marginTop: 2 }} />
                {i < 3 && <div className="flex-1 w-px mt-1" style={{ background: "var(--surface-container)", minHeight: 24 }} />}
              </div>
              <div className="pb-2">
                <p className="text-xs" style={{ color: "var(--outline)" }}>{t.time}</p>
                <p className="text-xs mt-0.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{t.event}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === "notes" && (
        <div>
          <textarea rows={4} className="w-full rounded-xl text-xs p-3 outline-none resize-none mb-3"
            placeholder="Add internal notes about this claim…"
            style={{ border: "1.5px solid var(--border)", color: "var(--foreground)", background: "var(--card)" }} />
          <button className="px-3 py-1.5 rounded-xl text-xs text-primary-foreground" style={{ background: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>Add Note</button>
        </div>
      )}
    </SectionCard>
  );
}

// ─── Export All ────────────────────────────────────────────────────────────────
export function PatternsSection() {
  return (
    <div className="space-y-6">
      <DataTablePattern />
      <FormPattern />
      <DetailPanelPattern />
      <SettingsPattern />
    </div>
  );
}