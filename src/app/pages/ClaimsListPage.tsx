import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search, SlidersHorizontal, Plus, ChevronDown, ArrowUpDown,
  Eye, AlertTriangle, CheckCircle, X, Zap, Shield, Sparkles,
  Filter, Clock, ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import { claims } from "../data/mockData";

const statusColor: Record<string, { bg: string; text: string }> = {
  "New": { bg: "var(--accent)", text: "var(--primary)" },
  "Under Review": { bg: "var(--warning-container)", text: "var(--warning)" },
  "Investigation": { bg: "var(--violet-container)", text: "var(--violet)" },
  "Pending Approval": { bg: "var(--info-container)", text: "var(--info)" },
  "Approved": { bg: "var(--success-container)", text: "var(--success)" },
  "Rejected": { bg: "var(--destructive-container)", text: "var(--destructive)" },
  "Settled": { bg: "var(--surface-container-low)", text: "var(--on-surface-variant)" },
  "Closed": { bg: "var(--surface-container-low)", text: "var(--outline)" },
};

const riskColor: Record<string, string> = {
  Low: "var(--success)", Medium: "var(--warning)", High: "var(--destructive)", Critical: "var(--on-destructive-container)",
};

const priorityConfig: Record<string, { bg: string; text: string; dot: string }> = {
  Urgent: { bg: "var(--destructive-container)", text: "var(--destructive)", dot: "var(--destructive)" },
  High: { bg: "var(--warning-container)", text: "var(--warning)", dot: "var(--warning)" },
  Normal: { bg: "var(--accent)", text: "var(--primary)", dot: "var(--primary)" },
  Low: { bg: "var(--surface-container-low)", text: "var(--muted-foreground)", dot: "var(--outline)" },
};

const aiActionConfig: Record<string, { bg: string; text: string }> = {
  Approve: { bg: "var(--success-container)", text: "var(--success)" },
  Reject: { bg: "var(--destructive-container)", text: "var(--destructive)" },
  Investigate: { bg: "var(--warning-container)", text: "var(--warning)" },
  Review: { bg: "var(--info-container)", text: "var(--info)" },
};

export function ClaimsListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortField, setSortField] = useState("dateSubmitted");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  const statuses = ["All", "New", "Under Review", "Investigation", "Pending Approval", "Approved", "Rejected", "Settled"];
  const types = ["All", "Auto", "Property", "Health", "Liability", "Life", "Travel"];
  const risks = ["All", "Low", "Medium", "High", "Critical"];
  const priorities = ["All", "Urgent", "High", "Normal", "Low"];

  const filtered = claims.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.claimNumber.toLowerCase().includes(q) || c.claimant.toLowerCase().includes(q) || c.type.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const matchType = typeFilter === "All" || c.type === typeFilter;
    const matchRisk = riskFilter === "All" || c.riskLevel === riskFilter;
    const matchPriority = priorityFilter === "All" || c.priority === priorityFilter;
    return matchSearch && matchStatus && matchType && matchRisk && matchPriority;
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const counts = {
    all: claims.length,
    urgent: claims.filter(c => c.priority === "Urgent").length,
    review: claims.filter(c => c.status === "Under Review" || c.status === "Investigation").length,
    pending: claims.filter(c => c.status === "Pending Approval").length,
    critical: claims.filter(c => c.riskLevel === "Critical").length,
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs" style={{ color: "var(--outline)" }}>
            {claims.length} total claims · {claims.filter(c => c.riskLevel === "High" || c.riskLevel === "Critical").length} high risk · {claims.filter(c => c.priority === "Urgent").length} urgent
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/app/intake")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-primary-foreground transition-all hover:opacity-90"
            style={{ background: "var(--primary)" }}>
            <Plus size={14} />New Claim
          </button>
        </div>
      </div>

      {/* Top Tabs */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {[
          { label: "All Claims", count: counts.all, filter: "All", type: "status" },
          { label: "Urgent", count: counts.urgent, filter: "Urgent", type: "priority" },
          { label: "Under Review", count: counts.review, filter: "Under Review", type: "status" },
          { label: "Pending Approval", count: counts.pending, filter: "Pending Approval", type: "status" },
          { label: "Critical Risk", count: counts.critical, filter: "Critical", type: "risk" },
        ].map(tab => {
          const isActive = (tab.type === "status" && statusFilter === tab.filter) ||
            (tab.type === "priority" && priorityFilter === tab.filter) ||
            (tab.type === "risk" && riskFilter === tab.filter);
          return (
            <button key={tab.label} onClick={() => {
              if (tab.type === "status") { setStatusFilter(tab.filter); setPriorityFilter("All"); setRiskFilter("All"); }
              else if (tab.type === "priority") { setPriorityFilter(tab.filter); setStatusFilter("All"); setRiskFilter("All"); }
              else { setRiskFilter(tab.filter); setStatusFilter("All"); setPriorityFilter("All"); }
            }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
              style={{
                background: isActive ? "var(--sidebar)" : "var(--primary-foreground)",
                color: isActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                border: "1px solid var(--border)",
              }}>
              {tab.label === "Urgent" && <Zap size={12} style={{ color: isActive ? "var(--warning-soft)" : "var(--warning)" }} />}
              {tab.label === "Critical Risk" && <Shield size={12} style={{ color: isActive ? "var(--destructive-container)" : "var(--destructive)" }} />}
              {tab.label}
              <span className="px-1.5 py-0.5 rounded-full text-xs"
                style={{ background: isActive ? "color-mix(in srgb, var(--card) 20%, transparent)" : "var(--surface-container)", color: isActive ? "var(--primary-foreground)" : "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1" style={{ minWidth: 220 }}>
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--outline)" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search claim #, claimant, type..."
            className="w-full pl-9 pr-3 rounded-xl text-sm outline-none"
            style={{ height: 38, border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)" }} />
          {search && <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setSearch("")}><X size={12} style={{ color: "var(--outline)" }} /></button>}
        </div>

        {[
          { label: "Type", options: types, value: typeFilter, onChange: setTypeFilter },
          { label: "Risk", options: risks, value: riskFilter, onChange: setRiskFilter },
          { label: "Priority", options: priorities, value: priorityFilter, onChange: setPriorityFilter },
        ].map(({ label, options, value, onChange }) => (
          <div key={label} className="relative">
            <select value={value} onChange={e => onChange(e.target.value)}
              className="appearance-none pl-3 pr-8 rounded-xl text-sm cursor-pointer outline-none"
              style={{ height: 38, border: "1px solid var(--border)", background: "var(--card)", color: "var(--on-surface-variant)" }}>
              {options.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--outline)" }} />
          </div>
        ))}

        <button className="flex items-center gap-2 px-3 rounded-xl text-sm transition-colors hover:bg-surface-container-low"
          style={{ height: 38, border: "1px solid var(--border)", background: "var(--card)", color: "var(--muted-foreground)" }}>
          <SlidersHorizontal size={14} />More Filters
        </button>

        {selected.size > 0 && (
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm" style={{ background: "var(--accent)", border: "1px solid var(--primary-container)" }}>
            <span style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>{selected.size} selected</span>
            <button className="text-xs px-2.5 py-1 rounded-lg" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>Bulk Assign</button>
            <button className="text-xs px-2.5 py-1 rounded-lg" style={{ background: "var(--destructive)", color: "var(--primary-foreground)" }}>Reject</button>
            <button onClick={() => setSelected(new Set())} className="text-xs" style={{ color: "var(--muted-foreground)" }}><X size={12} /></button>
          </div>
        )}
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs" style={{ color: "var(--outline)" }}>
          Showing <span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{filtered.length}</span> of{" "}
          <span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{claims.length}</span> claims
        </p>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--surface-container)" }}>
                <th className="px-4 py-3 text-left w-10">
                  <div className="rounded flex items-center justify-center cursor-pointer"
                    style={{ width: 16, height: 16, border: selected.size === filtered.length && filtered.length > 0 ? "none" : "1.5px solid var(--outline-variant)", background: selected.size === filtered.length && filtered.length > 0 ? "var(--primary)" : "transparent" }}
                    onClick={() => { if (selected.size === filtered.length) setSelected(new Set()); else setSelected(new Set(filtered.map(c => c.id))); }}>
                    {selected.size === filtered.length && filtered.length > 0 && <CheckCircle size={10} className="text-primary-foreground" />}
                  </div>
                </th>
                {[
                  { label: "Claim #", key: "claimNumber" },
                  { label: "Claimant", key: "claimant" },
                  { label: "Type", key: "type" },
                  { label: "Submitted", key: "dateSubmitted" },
                  { label: "Amount", key: "amount" },
                  { label: "Priority", key: "priority" },
                  { label: "AI Score", key: "aiConfidence" },
                  { label: "AI Action", key: "aiSuggestedAction" },
                  { label: "Risk", key: "riskScore" },
                  { label: "Status", key: "status" },
                  { label: "", key: "" },
                ].map(col => (
                  <th key={col.label} className="px-4 py-3 text-left text-xs" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>
                    {col.label && (
                      <button className="flex items-center gap-1 hover:text-muted-foreground transition-colors"
                        onClick={() => col.key && setSortField(col.key)}>
                        {col.label}
                        {col.key && <ArrowUpDown size={10} />}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((claim, i) => {
                const sc = statusColor[claim.status] || { bg: "var(--surface-container-low)", text: "var(--muted-foreground)" };
                const pc = priorityConfig[claim.priority];
                const ac = aiActionConfig[claim.aiSuggestedAction];
                const isSelected = selected.has(claim.id);
                return (
                  <motion.tr key={claim.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-t transition-colors cursor-pointer"
                    style={{ borderColor: "var(--surface-container-low)", background: isSelected ? "var(--accent)" : claim.riskLevel === "Critical" ? "color-mix(in srgb, var(--destructive) 2%, transparent)" : undefined }}
                    onClick={() => navigate(`/app/claims/${claim.id}`)}>
                    <td className="px-4 py-3.5" onClick={e => { e.stopPropagation(); toggleSelect(claim.id); }}>
                      <div className="rounded flex items-center justify-center"
                        style={{ width: 16, height: 16, border: isSelected ? "none" : "1.5px solid var(--outline-variant)", background: isSelected ? "var(--primary)" : "transparent" }}>
                        {isSelected && <CheckCircle size={10} className="text-primary-foreground" />}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {claim.fraudFlags.length > 0 && <AlertTriangle size={11} style={{ color: riskColor[claim.riskLevel], flexShrink: 0 }} />}
                        <div>
                          <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)" }}>{claim.claimNumber}</p>
                          <p className="text-xs" style={{ color: "var(--outline)" }}>{claim.policyNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{claim.claimant}</p>
                        <p className="text-xs" style={{ color: "var(--outline)" }}>{claim.email.split("@")[0]}@...</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--surface-container)", color: "var(--muted-foreground)" }}>{claim.type}</span>
                    </td>
                    <td className="px-4 py-3.5"><p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{claim.dateSubmitted}</p></td>
                    <td className="px-4 py-3.5"><span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>${claim.amount.toLocaleString()}</span></td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full w-fit"
                        style={{ background: pc.bg, color: pc.text, fontWeight: "var(--font-weight-medium)" }}>
                        {claim.priority === "Urgent" && <Zap size={9} />}
                        {claim.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full overflow-hidden" style={{ height: 5, width: 50, background: "var(--surface-container)", flexShrink: 0 }}>
                          <div className="h-full rounded-full" style={{
                            width: `${claim.aiConfidence}%`,
                            background: claim.aiConfidence >= 80 ? "var(--success)" : claim.aiConfidence >= 60 ? "var(--warning)" : "var(--destructive)"
                          }} />
                        </div>
                        <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{claim.aiConfidence}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full w-fit"
                        style={{ background: ac.bg, color: ac.text, fontWeight: "var(--font-weight-medium)" }}>
                        <Sparkles size={9} />{claim.aiSuggestedAction}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full overflow-hidden" style={{ height: 4, background: "var(--surface-container)", width: 50 }}>
                          <div className="h-full rounded-full" style={{ width: `${claim.riskScore}%`, background: riskColor[claim.riskLevel] }} />
                        </div>
                        <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: riskColor[claim.riskLevel], minWidth: 20 }}>{claim.riskScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.text, fontWeight: "var(--font-weight-medium)" }}>{claim.status}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="flex items-center justify-center rounded-lg transition-colors hover:bg-surface-container"
                        style={{ width: 28, height: 28 }}
                        onClick={e => { e.stopPropagation(); navigate(`/app/claims/${claim.id}`); }}>
                        <ArrowRight size={13} style={{ color: "var(--outline)" }} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex items-center justify-center rounded-full mb-4" style={{ width: 56, height: 56, background: "var(--surface-container)" }}>
              <Search size={24} style={{ color: "var(--outline)" }} />
            </div>
            <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>No claims found</p>
            <p className="text-xs mt-1" style={{ color: "var(--outline)" }}>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: "var(--surface-container)" }}>
          <p className="text-xs" style={{ color: "var(--outline)" }}>Showing {filtered.length} results · Page 1 of 1</p>
          <div className="flex gap-1">
            <button className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
