import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft, AlertTriangle, CheckCircle, Clock, FileText, Shield,
  Download, Eye, Sparkles, ChevronRight, User, MapPin, Calendar,
  Phone, Mail, Send, DollarSign, XCircle, CheckSquare, Info,
  ChevronDown, ChevronUp, Upload, Search, ExternalLink,
  TrendingUp, Zap, Star, Activity, Edit3, Save, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { claims, type DocumentItem } from "../data/mockData";

const statusColor: Record<string, { bg: string; text: string; dot: string }> = {
  "New": { bg: "var(--accent)", text: "var(--primary)", dot: "var(--primary)" },
  "Under Review": { bg: "var(--warning-container)", text: "var(--warning)", dot: "var(--warning)" },
  "Investigation": { bg: "var(--violet-container)", text: "var(--violet)", dot: "var(--violet)" },
  "Pending Approval": { bg: "var(--info-container)", text: "var(--info)", dot: "var(--info)" },
  "Approved": { bg: "var(--success-container)", text: "var(--success)", dot: "var(--success)" },
  "Rejected": { bg: "var(--destructive-container)", text: "var(--destructive)", dot: "var(--destructive)" },
  "Settled": { bg: "var(--surface-container-low)", text: "var(--on-surface-variant)", dot: "var(--muted-foreground)" },
  "Closed": { bg: "var(--surface-container-low)", text: "var(--outline)", dot: "var(--outline-variant)" },
};

const riskColor: Record<string, string> = {
  Low: "var(--success)", Medium: "var(--warning)", High: "var(--destructive)", Critical: "var(--on-destructive-container)",
};
const riskBg: Record<string, string> = {
  Low: "var(--success-container)", Medium: "var(--warning-container)", High: "var(--destructive-container)", Critical: "var(--destructive-container)",
};

const actionConfig: Record<string, { color: string; bg: string; border: string; label: string; icon: any }> = {
  Approve: { color: "var(--success)", bg: "var(--success-container)", border: "var(--success-border)", label: "APPROVE", icon: CheckCircle },
  Reject: { color: "var(--destructive)", bg: "var(--destructive-container)", border: "var(--destructive-container)", label: "REJECT", icon: XCircle },
  Investigate: { color: "var(--warning)", bg: "var(--warning-container)", border: "var(--warning-border)", label: "INVESTIGATE", icon: Search },
  Review: { color: "var(--info)", bg: "var(--info-container)", border: "var(--info-container)", label: "REVIEW REQUIRED", icon: Eye },
};

const timelineIcon = (type: string) => {
  const icons: Record<string, any> = {
    submitted: FileText, ai: Sparkles, document: FileText,
    reviewed: Eye, approved: CheckCircle, rejected: XCircle,
    settled: DollarSign, payment: DollarSign,
  };
  const Icon = icons[type] || Clock;
  return <Icon size={12} className="text-primary-foreground" />;
};

const timelineColor = (type: string) => ({
  submitted: "var(--primary)", ai: "var(--violet)", document: "var(--info)",
  reviewed: "var(--warning)", approved: "var(--success)", rejected: "var(--destructive)",
  settled: "var(--success)", payment: "var(--success)",
}[type] || "var(--outline)");

const WORKFLOW_STAGES = ["Submitted", "Documents", "AI Analysis", "Adjuster Review", "Pending Approval", "Decision", "Settlement"];

export function ClaimDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAIReason, setShowAIReason] = useState(false);
  const [actionModal, setActionModal] = useState<null | "approve" | "reject" | "flag">(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [comment, setComment] = useState("");
  const [timelineFilter, setTimelineFilter] = useState("All");
  const [showSettlement, setShowSettlement] = useState(false);

  const claim = claims.find((c) => c.id === id) || claims[0];
  const sc = statusColor[claim.status] || { bg: "var(--surface-container-low)", text: "var(--muted-foreground)", dot: "var(--outline)" };
  const ac = actionConfig[claim.aiSuggestedAction];
  const ActionIcon = ac.icon;

  const currentStageIndex = WORKFLOW_STAGES.findIndex(s =>
    s.toLowerCase() === claim.workflowStage.toLowerCase()
  );

  const [formValues, setFormValues] = useState({
    description: claim.description,
    amount: claim.amount.toString(),
    notes: claim.notes,
    assignedTo: claim.assignedTo,
  });

  if (showSettlement) {
    return <SettlementPanel claim={claim} onBack={() => setShowSettlement(false)} onSettle={() => { setShowSettlement(false); navigate("/app/claims"); }} />;
  }

  const tabs = [
    { id: "overview", label: "Overview", count: null },
    { id: "documents", label: "Documents", count: claim.documents.length },
    { id: "ai", label: "AI Analysis", count: claim.fraudFlags.length > 0 ? claim.fraudFlags.length : null },
    { id: "activity", label: "Activity", count: claim.timeline.length },
  ];

  const filteredTimeline = timelineFilter === "All"
    ? claim.timeline
    : claim.timeline.filter(e => e.type === timelineFilter.toLowerCase() || (timelineFilter === "AI" && e.type === "ai"));

  return (
    <div className="p-6 space-y-4 min-h-screen" style={{ background: "var(--background)" }}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <button onClick={() => navigate("/app/claims")} className="flex items-center gap-1 text-xs transition-colors hover:text-primary" style={{ color: "var(--muted-foreground)" }}>
          <ArrowLeft size={14} />
          Claims
        </button>
        <ChevronRight size={12} style={{ color: "var(--outline-variant)" }} />
        <span className="text-xs" style={{ color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>{claim.claimNumber}</span>
        <span className="text-xs" style={{ color: "var(--outline)" }}>·</span>
        <span className="text-xs" style={{ color: "var(--outline)" }}>{claim.claimant}</span>
      </div>

      {/* Claim Header Card */}
      <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h1 style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)", margin: 0 }}>{claim.claimNumber}</h1>
              <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.text, fontWeight: "var(--font-weight-medium)" }}>
                <div className="rounded-full" style={{ width: 6, height: 6, background: sc.dot }} />
                {claim.status}
              </span>
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                style={{ background: riskBg[claim.riskLevel], color: riskColor[claim.riskLevel], fontWeight: "var(--font-weight-medium)" }}>
                {claim.riskLevel === "Critical" || claim.riskLevel === "High" ? <AlertTriangle size={10} /> : <CheckCircle size={10} />}
                {claim.riskLevel} Risk
              </span>
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: claim.priority === "Urgent" ? "var(--destructive-container)" : claim.priority === "High" ? "var(--warning-container)" : "var(--surface-container-low)",
                  color: claim.priority === "Urgent" ? "var(--destructive)" : claim.priority === "High" ? "var(--warning)" : "var(--muted-foreground)",
                  fontWeight: "var(--font-weight-medium)",
                }}>
                <Zap size={10} />
                {claim.priority} Priority
              </span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5"><User size={12} style={{ color: "var(--outline)" }} /><span className="text-sm" style={{ color: "var(--on-surface-variant)" }}>{claim.claimant}</span></div>
              <div className="flex items-center gap-1.5"><FileText size={12} style={{ color: "var(--outline)" }} /><span className="text-sm" style={{ color: "var(--on-surface-variant)" }}>{claim.type} Insurance</span></div>
              <div className="flex items-center gap-1.5"><MapPin size={12} style={{ color: "var(--outline)" }} /><span className="text-sm" style={{ color: "var(--on-surface-variant)" }}>{claim.location}</span></div>
              <div className="flex items-center gap-1.5"><Calendar size={12} style={{ color: "var(--outline)" }} /><span className="text-sm" style={{ color: "var(--on-surface-variant)" }}>Incident: {claim.incidentDate}</span></div>
              <div className="flex items-center gap-1.5"><Clock size={12} style={{ color: "var(--outline)" }} />
                <span className="text-sm" style={{ color: "var(--on-surface-variant)" }}>SLA: {claim.slaDeadline}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-right">
              <p className="text-xs" style={{ color: "var(--outline)" }}>Claim Amount</p>
              <p style={{ fontSize: "var(--fs-headline-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>${claim.amount.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              {(claim.status === "Under Review" || claim.status === "Investigation" || claim.status === "New") && (
                <>
                  <button onClick={() => setActionModal("approve")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-primary-foreground transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "var(--success)" }}>
                    <CheckCircle size={13} />Approve
                  </button>
                  <button onClick={() => setActionModal("reject")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-primary-foreground transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "var(--destructive)" }}>
                    <XCircle size={13} />Reject
                  </button>
                </>
              )}
              <button onClick={() => setActionModal("flag")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all hover:opacity-90 active:scale-95"
                style={{ background: "var(--warning-container)", color: "var(--warning)", border: "1px solid var(--warning-border)" }}>
                <AlertTriangle size={13} />Flag
              </button>
              {(claim.status === "Pending Approval" || claim.status === "Approved") && (
                <button onClick={() => setShowSettlement(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-primary-foreground transition-all hover:opacity-90"
                  style={{ background: "var(--success)" }}>
                  <CheckSquare size={13} />Settle Claim
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--sidebar)", border: "1px solid color-mix(in srgb, var(--violet) 20%, transparent)" }}
      >
        <div className="p-5">
          <div className="flex flex-wrap gap-5 items-start">
            {/* Confidence Gauge */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="relative" style={{ width: 80, height: 80 }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="color-mix(in srgb, var(--card) 10%, transparent)" strokeWidth="7" />
                  <motion.circle
                    cx="40" cy="40" r="32" fill="none"
                    stroke={claim.aiConfidence >= 80 ? "var(--success)" : claim.aiConfidence >= 60 ? "var(--warning)" : "var(--destructive)"}
                    strokeWidth="7" strokeLinecap="round"
                    strokeDasharray={`${(claim.aiConfidence / 100) * 201} 201`}
                    transform="rotate(-90 40 40)"
                    initial={{ strokeDasharray: "0 201" }}
                    animate={{ strokeDasharray: `${(claim.aiConfidence / 100) * 201} 201` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span style={{ fontSize: "var(--fs-body-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--primary-foreground)", lineHeight: 1 }}>{claim.aiConfidence}%</span>
                  <span className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>conf.</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={13} style={{ color: "var(--violet-soft)" }} />
                  <span className="text-xs uppercase tracking-wide" style={{ color: "var(--violet-soft)", fontWeight: "var(--font-weight-medium)" }}>AI Recommendation</span>
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl mb-1"
                  style={{ background: ac.bg, border: `1px solid ${ac.border}`, display: "inline-flex" }}
                >
                  <ActionIcon size={15} style={{ color: ac.color }} />
                  <span style={{ fontSize: "var(--fs-body-md)", fontWeight: "var(--font-weight-medium)", color: ac.color, letterSpacing: "0.04em" }}>{ac.label}</span>
                </div>
                <p className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>GPT-4 Analysis · Mar 20, 2024 · 09:15 AM</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block flex-shrink-0 self-stretch w-px" style={{ background: "color-mix(in srgb, var(--card) 8%, transparent)" }} />

            {/* Reasoning Tags */}
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wide mb-2" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)", fontWeight: "var(--font-weight-medium)" }}>AI Reasoning Factors</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {claim.aiReasoningTags.map((tag, i) => {
                  const isNeg = tag.toLowerCase().includes("claim") || tag.toLowerCase().includes("age") || tag.toLowerCase().includes("fraud") || tag.toLowerCase().includes("flagged") || tag.toLowerCase().includes("inconsistency") || tag.toLowerCase().includes("attorney") || tag.toLowerCase().includes("limited") || tag.toLowerCase().includes("prior");
                  return (
                    <span key={i} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: isNeg ? "color-mix(in srgb, var(--destructive) 15%, transparent)" : "color-mix(in srgb, var(--success) 15%, transparent)",
                        color: isNeg ? "var(--destructive-container)" : "var(--success-soft)",
                        border: `1px solid ${isNeg ? "color-mix(in srgb, var(--destructive) 25%, transparent)" : "color-mix(in srgb, var(--success) 25%, transparent)"}`,
                      }}>
                      {isNeg ? <AlertTriangle size={10} /> : <CheckCircle size={10} />}
                      {tag}
                    </span>
                  );
                })}
              </div>
              <button
                onClick={() => setShowAIReason(!showAIReason)}
                className="flex items-center gap-1.5 text-xs transition-colors hover:text-inverse-primary"
                style={{ color: "var(--violet-soft)", fontWeight: "var(--font-weight-medium)" }}
              >
                {showAIReason ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                {showAIReason ? "Hide" : "Show"} full AI explanation
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showAIReason && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t" style={{ borderColor: "color-mix(in srgb, var(--card) 8%, transparent)" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--outline-variant)" }}>
                    {claim.aiSummary}
                  </p>
                  <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { label: "Policy History", score: Math.min(claim.riskScore + 10, 100) },
                      { label: "Document Match", score: Math.max(claim.riskScore - 15, 5) },
                      { label: "Behavioral Pattern", score: claim.riskScore },
                      { label: "Network Analysis", score: Math.max(claim.riskScore - 22, 5) },
                    ].map(({ label, score }) => (
                      <div key={label} className="rounded-xl p-3" style={{ background: "color-mix(in srgb, var(--card) 5%, transparent)" }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>{label}</span>
                          <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: score > 60 ? "var(--destructive-soft)" : "var(--success-soft)" }}>{score}</span>
                        </div>
                        <div className="rounded-full overflow-hidden" style={{ height: 4, background: "color-mix(in srgb, var(--card) 8%, transparent)" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{ background: score > 60 ? "var(--destructive)" : "var(--success)" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Workflow Stage Tracker */}
      <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--surface-container)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {WORKFLOW_STAGES.map((stage, i) => {
            const isDone = i < currentStageIndex;
            const isCurrent = i === currentStageIndex;
            return (
              <div key={stage} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: 24, height: 24,
                      background: isDone ? "var(--success)" : isCurrent ? "var(--primary)" : "var(--surface-container)",
                      border: isCurrent ? "2px solid var(--primary)" : "none",
                    }}>
                    {isDone ? <CheckCircle size={12} className="text-primary-foreground" /> :
                      <span className="text-xs" style={{ color: isCurrent ? "var(--primary-foreground)" : "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>{i + 1}</span>}
                  </div>
                  <span className="text-xs" style={{
                    fontWeight: isCurrent ? 700 : isDone ? 500 : 400,
                    color: isCurrent ? "var(--primary)" : isDone ? "var(--success)" : "var(--outline)",
                    whiteSpace: "nowrap",
                  }}>
                    {stage}
                  </span>
                </div>
                {i < WORKFLOW_STAGES.length - 1 && (
                  <div className="w-8 h-px flex-shrink-0" style={{ background: isDone ? "var(--success)" : "var(--surface-container)" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left: Tabs */}
        <div className="xl:col-span-2 space-y-4">
          {/* Tab Navigation */}
          <div className="flex items-center gap-0 overflow-x-auto rounded-t-none" style={{ borderBottom: "2px solid var(--border)" }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm whitespace-nowrap transition-all"
                style={{
                  color: activeTab === tab.id ? "var(--primary)" : "var(--muted-foreground)",
                  borderBottom: activeTab === tab.id ? "2px solid var(--primary)" : "2px solid transparent",
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  background: "transparent",
                  marginBottom: -2,
                }}>
                {tab.label}
                {tab.count !== null && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{
                      background: activeTab === tab.id ? "var(--accent)" : "var(--surface-container)",
                      color: activeTab === tab.id ? "var(--primary)" : "var(--outline)",
                      fontWeight: "var(--font-weight-medium)",
                    }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              {/* Description */}
              <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claim Description</h3>
                  <button onClick={() => setEditMode(!editMode)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-surface-container-low"
                    style={{ color: "var(--primary)", border: "1px solid var(--primary-container)" }}>
                    {editMode ? <><Save size={12} /> Save</> : <><Edit3 size={12} /> Edit</>}
                  </button>
                </div>
                {editMode ? (
                  <textarea
                    value={formValues.description}
                    onChange={e => setFormValues({ ...formValues, description: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                    style={{ border: "1.5px solid var(--primary)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                    rows={3}
                  />
                ) : (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>{formValues.description}</p>
                )}
              </div>

              {/* Claimant + Claim Info Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                  <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claimant Information</h3>
                  <div className="space-y-3">
                    {[
                      { icon: User, label: "Full Name", value: claim.claimant },
                      { icon: Mail, label: "Email", value: claim.email },
                      { icon: Phone, label: "Phone", value: claim.phone },
                      { icon: FileText, label: "Policy Number", value: claim.policyNumber },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5" style={{ width: 28, height: 28, background: "var(--surface-container)" }}>
                          <Icon size={12} style={{ color: "var(--muted-foreground)" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs" style={{ color: "var(--outline)" }}>{label}</p>
                          {editMode && (label === "Full Name" || label === "Policy Number") ? (
                            <input defaultValue={value} className="w-full rounded-lg px-2 py-1 text-sm outline-none mt-0.5"
                              style={{ border: "1.5px solid var(--primary-container)", background: "var(--surface-container-low)", color: "var(--foreground)" }} />
                          ) : (
                            <p className="text-sm truncate" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                  <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Incident Details</h3>
                  <div className="space-y-3">
                    {[
                      { icon: MapPin, label: "Location", value: claim.location },
                      { icon: Calendar, label: "Incident Date", value: claim.incidentDate },
                      { icon: Calendar, label: "Date Submitted", value: claim.dateSubmitted },
                      { icon: Clock, label: "SLA Deadline", value: claim.slaDeadline },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5" style={{ width: 28, height: 28, background: "var(--surface-container)" }}>
                          <Icon size={12} style={{ color: "var(--muted-foreground)" }} />
                        </div>
                        <div>
                          <p className="text-xs" style={{ color: "var(--outline)" }}>{label}</p>
                          {editMode && label === "SLA Deadline" ? (
                            <input type="date" defaultValue={value} className="rounded-lg px-2 py-1 text-sm outline-none mt-0.5"
                              style={{ border: "1.5px solid var(--primary-container)", background: "var(--surface-container-low)", color: "var(--foreground)" }} />
                          ) : (
                            <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: label === "SLA Deadline" ? "var(--warning)" : "var(--foreground)" }}>{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                <h3 className="text-sm mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Adjuster Notes</h3>
                {editMode ? (
                  <textarea
                    value={formValues.notes}
                    onChange={e => setFormValues({ ...formValues, notes: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                    style={{ border: "1.5px solid var(--primary)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                    rows={2}
                  />
                ) : (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>{formValues.notes}</p>
                )}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--surface-container-low)" }}>
                  <div>
                    <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Documents ({claim.documents.length})</h3>
                    <p className="text-xs mt-0.5" style={{ color: "var(--outline)" }}>
                      {claim.documents.filter(d => d.status === "Verified").length} verified · {claim.documents.filter(d => d.status === "Processing").length} processing
                    </p>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-primary-foreground" style={{ background: "var(--primary)" }}>
                    <Upload size={12} />Upload Document
                  </button>
                </div>

                {/* OCR Alert */}
                <div className="mx-5 mt-4 flex items-start gap-3 p-3 rounded-xl" style={{ background: "var(--violet-container)", border: "1px solid var(--violet-border)" }}>
                  <Sparkles size={14} style={{ color: "var(--violet)", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--violet)" }}>AI Document Processing Active</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--violet)" }}>
                      OCR extracted data from {claim.documents.filter(d => d.extractedData).length} documents.
                      {claim.documents.filter(d => d.status === "Processing").length > 0 && ` ${claim.documents.filter(d => d.status === "Processing").length} still processing.`}
                      {claim.documents.filter(d => d.status === "Pending Review").length > 0 && ` ${claim.documents.filter(d => d.status === "Pending Review").length} flagged for manual review.`}
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  {claim.documents.map(doc => (
                    <div key={doc.id}>
                      <div
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-surface-container-low"
                        style={{ border: selectedDoc?.id === doc.id ? "1.5px solid var(--primary)" : "1px solid var(--surface-container)" }}
                        onClick={() => setSelectedDoc(selectedDoc?.id === doc.id ? null : doc)}
                      >
                        <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                          style={{ width: 40, height: 40, background: doc.type === "PDF" ? "var(--accent)" : doc.type === "ZIP" ? "var(--violet-container)" : "var(--warning-container)" }}>
                          <FileText size={16} style={{ color: doc.type === "PDF" ? "var(--primary)" : doc.type === "ZIP" ? "var(--violet)" : "var(--warning)" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm truncate" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{doc.name}</p>
                          <p className="text-xs" style={{ color: "var(--outline)" }}>{doc.type} · {doc.size} · Uploaded {doc.uploadedAt}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              background: doc.status === "Verified" ? "var(--success-container)" : doc.status === "Processing" ? "var(--warning-container)" : doc.status === "Rejected" ? "var(--destructive-container)" : "var(--surface-container-low)",
                              color: doc.status === "Verified" ? "var(--success)" : doc.status === "Processing" ? "var(--warning)" : doc.status === "Rejected" ? "var(--destructive)" : "var(--muted-foreground)",
                              fontWeight: "var(--font-weight-medium)",
                            }}>
                            {doc.status}
                          </span>
                          {doc.extractedData && <Star size={12} style={{ color: "var(--violet-soft)" }} title="OCR data available" />}
                          <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors"><Download size={13} style={{ color: "var(--muted-foreground)" }} /></button>
                        </div>
                      </div>

                      {/* Extracted Data Panel */}
                      <AnimatePresence>
                        {selectedDoc?.id === doc.id && doc.extractedData && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mx-2 mt-1 p-4 rounded-xl" style={{ background: "var(--surface-container-low)", border: "1px solid var(--surface-container)" }}>
                              <div className="flex items-center gap-2 mb-3">
                                <Sparkles size={12} style={{ color: "var(--violet)" }} />
                                <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--violet)" }}>AI-Extracted Data (OCR)</p>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {Object.entries(doc.extractedData).map(([key, val]) => (
                                  <div key={key} className="flex flex-col gap-0.5">
                                    <span className="text-xs" style={{ color: "var(--outline)" }}>{key}</span>
                                    <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{val}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Documents */}
              {claim.documents.filter(d => d.status === "Pending Review").length > 0 && (
                <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "var(--warning-container)", border: "1px solid var(--warning-border)" }}>
                  <AlertTriangle size={16} style={{ color: "var(--warning)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-warning-container)" }}>Documents Pending Review</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--on-warning-container)" }}>
                      {claim.documents.filter(d => d.status === "Pending Review").length} document(s) require manual verification before proceeding.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AI Analysis Tab */}
          {activeTab === "ai" && (
            <div className="space-y-4">
              {/* Full AI Summary */}
              <div className="rounded-2xl p-5" style={{ background: "var(--sidebar)", border: "1px solid color-mix(in srgb, var(--violet) 30%, transparent)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} style={{ color: "var(--violet-soft)" }} />
                  <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary-foreground)" }}>Full AI Claims Analysis</h3>
                  <span className="ml-auto text-xs px-2.5 py-1 rounded-full" style={{ background: "color-mix(in srgb, var(--violet) 20%, transparent)", color: "var(--violet-soft)", fontWeight: "var(--font-weight-medium)" }}>GPT-4 Powered</span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--outline-variant)" }}>{claim.aiSummary}</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: "Policy History", score: Math.min(claim.riskScore + 10, 100) },
                    { label: "Doc Consistency", score: Math.max(claim.riskScore - 15, 5) },
                    { label: "Behavioral", score: claim.riskScore },
                    { label: "Network Analysis", score: Math.max(claim.riskScore - 22, 5) },
                  ].map(({ label, score }) => {
                    const color = score > 70 ? "var(--destructive)" : score > 40 ? "var(--warning)" : "var(--success)";
                    return (
                      <div key={label} className="p-3 rounded-xl" style={{ background: "color-mix(in srgb, var(--card) 5%, transparent)" }}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>{label}</span>
                          <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color }}>{score}</span>
                        </div>
                        <div className="rounded-full overflow-hidden" style={{ height: 5, background: "color-mix(in srgb, var(--card) 8%, transparent)" }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.8 }}
                            className="h-full rounded-full" style={{ background: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fraud Indicators */}
              {claim.fraudFlags.length > 0 && (
                <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1.5px solid var(--destructive-container)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center justify-center rounded-xl" style={{ width: 32, height: 32, background: "var(--destructive-container)" }}>
                      <Shield size={15} style={{ color: "var(--destructive)" }} />
                    </div>
                    <div>
                      <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--destructive)" }}>Fraud Risk Indicators</h3>
                      <p className="text-xs" style={{ color: "var(--outline)" }}>{claim.fraudFlags.length} flag{claim.fraudFlags.length > 1 ? "s" : ""} detected by AI</p>
                    </div>
                    <span className="ml-auto text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--destructive-container)", color: "var(--destructive)", fontWeight: "var(--font-weight-medium)" }}>
                      {claim.fraudFlags.length} FLAGS
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {claim.fraudFlags.map((flag, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "var(--destructive-container)", border: "1px solid var(--destructive-container)" }}>
                        <div className="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                          style={{ width: 20, height: 20, background: "var(--destructive)" }}>
                          <AlertTriangle size={10} className="text-primary-foreground" />
                        </div>
                        <p className="text-sm" style={{ color: "var(--on-destructive-container)" }}>{flag}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social/Behavioral Signals */}
              <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Behavioral & Network Signals</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "IP Address Match", result: claim.riskScore > 70 ? "Flagged" : "Clean", ok: claim.riskScore <= 70 },
                    { label: "Device Fingerprint", result: "Verified", ok: true },
                    { label: "Network Clustering", result: claim.fraudFlags.length > 2 ? "2 linked claims" : "No links", ok: claim.fraudFlags.length <= 2 },
                    { label: "Social Media Check", result: claim.fraudFlags.some(f => f.includes("Social")) ? "Inconsistency" : "Clear", ok: !claim.fraudFlags.some(f => f.includes("Social")) },
                    { label: "Prior Attorney Activity", result: claim.fraudFlags.some(f => f.includes("attorney")) ? "Flagged" : "No record", ok: !claim.fraudFlags.some(f => f.includes("attorney")) },
                    { label: "Policy Stacking", result: claim.fraudFlags.some(f => f.includes("Duplicate")) ? "Detected" : "Not detected", ok: !claim.fraudFlags.some(f => f.includes("Duplicate")) },
                  ].map(({ label, result, ok }) => (
                    <div key={label} className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--surface-container-low)" }}>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</span>
                      <span className="flex items-center gap-1.5 text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: ok ? "var(--success)" : "var(--destructive)" }}>
                        {ok ? <CheckCircle size={11} /> : <AlertTriangle size={11} />}
                        {result}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--surface-container-low)" }}>
                <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Activity Timeline</h3>
                <div className="flex items-center gap-2">
                  {["All", "AI", "Document", "Reviewed"].map(f => (
                    <button key={f} onClick={() => setTimelineFilter(f)}
                      className="text-xs px-3 py-1 rounded-lg transition-colors"
                      style={{ background: timelineFilter === f ? "var(--sidebar)" : "var(--surface-container-low)", color: timelineFilter === f ? "var(--primary-foreground)" : "var(--muted-foreground)", fontWeight: timelineFilter === f ? 600 : 400 }}>
                      {f}
                    </button>
                  ))}
                  <button className="text-xs px-3 py-1 rounded-lg transition-colors hover:bg-surface-container-low"
                    style={{ color: "var(--primary)", border: "1px solid var(--primary-container)" }}>
                    <Download size={11} className="inline mr-1" />Export
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="relative">
                  <div className="absolute left-3.5 top-0 bottom-0 w-px" style={{ background: "var(--surface-container)" }} />
                  <div className="space-y-5">
                    {filteredTimeline.map(event => (
                      <div key={event.id} className="flex items-start gap-4 relative">
                        <div className="flex items-center justify-center rounded-full flex-shrink-0 z-10"
                          style={{ width: 28, height: 28, background: timelineColor(event.type) }}>
                          {timelineIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0 pb-2">
                          <div className="flex items-start justify-between gap-2 mb-0.5">
                            <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{event.event}</p>
                            <span className="text-xs flex-shrink-0" style={{ color: "var(--outline)" }}>{event.date} · {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center rounded-full text-primary-foreground flex-shrink-0"
                              style={{ width: 16, height: 16, background: timelineColor(event.type), fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}>
                              {event.user[0]}
                            </div>
                            <p className="text-xs" style={{ color: "var(--outline)" }}>{event.user}</p>
                            {event.type === "ai" && (
                              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "var(--violet-container)", color: "var(--violet)", fontWeight: "var(--font-weight-medium)" }}>AI</span>
                            )}
                          </div>
                          {event.details && (
                            <div className="mt-2 p-2.5 rounded-xl" style={{ background: "var(--surface-container-low)", border: "1px solid var(--surface-container)" }}>
                              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{event.details}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Comment */}
                <div className="mt-5 pt-5 border-t" style={{ borderColor: "var(--surface-container)" }}>
                  <p className="text-xs mb-3" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Add Comment</p>
                  <div className="flex gap-3">
                    <div className="flex items-center justify-center rounded-full flex-shrink-0 text-primary-foreground text-xs"
                      style={{ width: 30, height: 30, background: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>
                      SM
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Add a comment, note, or escalation reason..."
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                        style={{ border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                        rows={2}
                      />
                      <div className="flex justify-end mt-2">
                        <button disabled={!comment.trim()} className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
                          style={{ background: "var(--primary)" }}>
                          <Send size={12} />Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Risk Score Widget */}
          <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>AI Risk Score</h3>
              <Shield size={14} style={{ color: riskColor[claim.riskLevel] }} />
            </div>
            <div className="flex flex-col items-center mb-4">
              <div className="relative" style={{ width: 120, height: 120 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface-container)" strokeWidth="10" />
                  <motion.circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke={riskColor[claim.riskLevel]}
                    strokeWidth="10" strokeLinecap="round"
                    initial={{ strokeDasharray: "0 314" }}
                    animate={{ strokeDasharray: `${(claim.riskScore / 100) * 314} 314` }}
                    transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span style={{ fontSize: "var(--fs-headline-md)", fontWeight: "var(--font-weight-medium)", color: riskColor[claim.riskLevel], lineHeight: 1 }}>{claim.riskScore}</span>
                  <span className="text-xs" style={{ color: "var(--outline)" }}>/ 100</span>
                </div>
              </div>
              <div className="mt-2 px-4 py-1.5 rounded-full text-sm"
                style={{ background: riskBg[claim.riskLevel], color: riskColor[claim.riskLevel], fontWeight: "var(--font-weight-medium)" }}>
                {claim.riskLevel} Risk
              </div>
            </div>

            {/* Risk bars */}
            <div className="space-y-2.5">
              {[
                { label: "Policy History", score: Math.min(claim.riskScore + 10, 100) },
                { label: "Doc Consistency", score: Math.max(claim.riskScore - 15, 5) },
                { label: "Behavioral", score: claim.riskScore },
                { label: "Network", score: Math.max(claim.riskScore - 22, 5) },
              ].map(({ label, score }) => {
                const c = score > 70 ? "var(--destructive)" : score > 40 ? "var(--warning)" : "var(--success)";
                return (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</span>
                      <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: c }}>{score}</span>
                    </div>
                    <div className="rounded-full overflow-hidden" style={{ height: 5, background: "var(--surface-container)" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 0.8 }}
                        className="h-full rounded-full" style={{ background: c }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fraud Indicators */}
          {claim.fraudFlags.length > 0 && (
            <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1.5px solid var(--destructive-container)" }}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={13} style={{ color: "var(--destructive)" }} />
                <h3 className="text-xs uppercase tracking-wide" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--destructive)" }}>Fraud Indicators ({claim.fraudFlags.length})</h3>
              </div>
              <div className="space-y-2">
                {claim.fraudFlags.map((flag, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: "var(--destructive)" }} />
                    <p className="text-xs leading-relaxed" style={{ color: "var(--on-destructive-container)" }}>{flag}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendation */}
          <div className="rounded-2xl p-4" style={{ background: "var(--sidebar)", border: "1px solid color-mix(in srgb, var(--violet) 30%, transparent)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={13} style={{ color: "var(--violet-soft)" }} />
              <p className="text-xs uppercase tracking-wide" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--violet-soft)" }}>AI Recommendation</p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>
              {claim.riskScore >= 70 ? "Full investigation required before any decision. Multiple fraud indicators detected. Refer to SIU team immediately."
                : claim.riskScore >= 40 ? "Proceed with standard verification. Review all flagged items before settling. Adjuster sign-off required."
                  : "Eligible for fast-track settlement. All indicators confirm a legitimate, low-risk claim."}
            </p>
            <div className="mt-3 flex items-center gap-2 p-2 rounded-xl" style={{ background: "color-mix(in srgb, var(--card) 5%, transparent)" }}>
              <Activity size={12} style={{ color: "var(--violet-soft)" }} />
              <span className="text-xs" style={{ color: "var(--violet-soft)" }}>Confidence: {claim.aiConfidence}%</span>
            </div>
          </div>

          {/* Claim Metadata */}
          <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
            <h3 className="text-xs uppercase tracking-wide mb-3" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--outline)" }}>Claim Metadata</h3>
            <div className="space-y-2.5">
              {[
                { label: "Assigned To", value: claim.assignedTo },
                { label: "Submitted", value: claim.dateSubmitted },
                { label: "Last Updated", value: claim.dateUpdated },
                { label: "Documents", value: `${claim.documents.length} files` },
                { label: "Workflow Stage", value: claim.workflowStage },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--outline)" }}>{label}</span>
                  <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      <AnimatePresence>
        {actionModal && (
          <ActionModal
            type={actionModal}
            claim={claim}
            onClose={() => setActionModal(null)}
            onSuccess={() => { setActionModal(null); navigate("/app/claims"); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Action Confirmation Modal
function ActionModal({ type, claim, onClose, onSuccess }: {
  type: "approve" | "reject" | "flag";
  claim: any;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState(claim.amount.toString());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const config = {
    approve: { color: "var(--success)", bg: "var(--success-container)", label: "Approve Claim", icon: CheckCircle, desc: "This claim will be approved and moved to settlement processing." },
    reject: { color: "var(--destructive)", bg: "var(--destructive-container)", label: "Reject Claim", icon: XCircle, desc: "This claim will be rejected. The claimant will be notified with the reason provided." },
    flag: { color: "var(--warning)", bg: "var(--warning-container)", label: "Flag for Review", icon: AlertTriangle, desc: "This claim will be escalated for special review by the fraud/SIU team." },
  }[type];

  const Icon = config.icon;

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setSuccess(true);
    await new Promise(r => setTimeout(r, 1500));
    onSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "color-mix(in srgb, var(--foreground) 60%, transparent)", backdropFilter: "blur(4px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "var(--card)", margin: "0 16px", boxShadow: "0 25px 60px color-mix(in srgb, var(--foreground) 20%, transparent)" }}
      >
        {success ? (
          <div className="p-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex items-center justify-center rounded-full mb-4"
              style={{ width: 72, height: 72, background: config.bg }}
            >
              <Icon size={36} style={{ color: config.color }} />
            </motion.div>
            <h3 className="text-lg mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>
              {type === "approve" ? "Claim Approved!" : type === "reject" ? "Claim Rejected" : "Flagged for Review"}
            </h3>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {type === "approve" ? "The claim has been approved and queued for settlement processing."
                : type === "reject" ? "The claimant will be notified with your rejection reason."
                  : "The claim has been escalated to the SIU/fraud review team."}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--surface-container)" }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: config.bg }}>
                  <Icon size={16} style={{ color: config.color }} />
                </div>
                <div>
                  <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{config.label}</h3>
                  <p className="text-xs" style={{ color: "var(--outline)" }}>{claim.claimNumber} · {claim.claimant}</p>
                </div>
              </div>
              <button onClick={onClose} className="flex items-center justify-center rounded-xl transition-colors hover:bg-surface-container" style={{ width: 32, height: 32 }}>
                <X size={15} style={{ color: "var(--outline)" }} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 rounded-xl" style={{ background: config.bg }}>
                <p className="text-xs" style={{ color: config.color }}>{config.desc}</p>
              </div>

              {type === "approve" && (
                <div>
                  <label className="block text-sm mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Settlement Amount</label>
                  <div className="relative">
                    <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--outline)" }} />
                    <input
                      type="number"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="w-full pl-9 pr-3 rounded-xl text-sm outline-none"
                      style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>
                  {type === "reject" ? "Rejection Reason" : type === "flag" ? "Escalation Notes" : "Approval Notes"}
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={type === "reject" ? "Provide a clear reason for rejection..." : type === "flag" ? "Describe the reason for escalation..." : "Any additional notes for this approval..."}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  style={{ border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm transition-colors hover:bg-surface-container-low"
                  style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>Cancel</button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || (type === "reject" && !notes.trim())}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-primary-foreground transition-all hover:opacity-90 active:scale-98 disabled:opacity-50"
                  style={{ background: config.color }}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full" style={{ width: 14, height: 14, border: "2px solid color-mix(in srgb, var(--card) 30%, transparent)", borderTopColor: "var(--primary-foreground)" }} />
                      Processing...
                    </>
                  ) : (
                    <><Icon size={14} />Confirm {config.label.split(" ")[0]}</>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// Settlement Panel
function SettlementPanel({ claim, onBack, onSettle }: { claim: any; onBack: () => void; onSettle: () => void }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [amount, setAmount] = useState(claim.amount.toString());
  const [notes, setNotes] = useState("");
  const [settling, setSettling] = useState(false);

  const handleSettle = async () => {
    setSettling(true);
    await new Promise(r => setTimeout(r, 2500));
    onSettle();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
          <ArrowLeft size={14} />Back to Claim
        </button>
        <ChevronRight size={12} style={{ color: "var(--outline-variant)" }} />
        <span className="text-xs" style={{ color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>Settle Claim</span>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, background: s <= step ? "var(--primary)" : "var(--surface-container)" }}>
                {s < step ? <CheckCircle size={16} className="text-primary-foreground" /> : <span className="text-xs text-primary-foreground" style={{ color: s <= step ? "var(--primary-foreground)" : "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>{s}</span>}
              </div>
              <span className="text-sm" style={{ color: s <= step ? "var(--foreground)" : "var(--outline)", fontWeight: s === step ? 600 : 400 }}>
                {s === 1 ? "Settlement Details" : s === 2 ? "Payment Method" : "Confirm & Process"}
              </span>
              {s < 3 && <ChevronRight size={14} style={{ color: "var(--outline-variant)" }} />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container)", boxShadow: "0 4px 20px color-mix(in srgb, var(--foreground) 6%, transparent)" }}>
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Settlement Amount</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--outline)" }} />
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full pl-10 pr-4 rounded-xl outline-none text-lg" style={{ height: 52, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Settlement Notes</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Settlement justification..." className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none" style={{ border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }} rows={3} />
                </div>
                <button onClick={() => setStep(2)} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm text-primary-foreground" style={{ background: "var(--primary)" }}>
                  Continue <ChevronRight size={14} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Select Payment Method</h3>
                {[
                  { id: "bank_transfer", label: "Bank Transfer (ACH)", sub: "2-3 business days", icon: "🏦" },
                  { id: "check", label: "Paper Check", sub: "5-7 business days", icon: "📃" },
                  { id: "wire", label: "Wire Transfer", sub: "Same day", icon: "⚡" },
                ].map(pm => (
                  <button key={pm.id} onClick={() => setPaymentMethod(pm.id)} className="w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all"
                    style={{ border: paymentMethod === pm.id ? "1.5px solid var(--primary)" : "1.5px solid var(--border)", background: paymentMethod === pm.id ? "var(--accent)" : "var(--primary-foreground)" }}>
                    <span style={{ fontSize: "var(--fs-headline-sm)" }}>{pm.icon}</span>
                    <div>
                      <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{pm.label}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{pm.sub}</p>
                    </div>
                    {paymentMethod === pm.id && <CheckCircle size={18} style={{ color: "var(--primary)", marginLeft: "auto" }} />}
                  </button>
                ))}
                <div className="flex gap-3 mt-2">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl text-sm" style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>Back</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-3 rounded-xl text-sm text-primary-foreground" style={{ background: "var(--primary)" }}>Review Settlement</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl" style={{ background: "var(--success-container)", border: "1px solid var(--success-border)" }}>
                  <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-success-container)" }}>Settlement Summary</p>
                  {[
                    { label: "Claimant", value: claim.claimant },
                    { label: "Amount", value: `$${parseInt(amount).toLocaleString()}` },
                    { label: "Method", value: paymentMethod.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()) },
                    { label: "Claim #", value: claim.claimNumber },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between mt-2">
                      <span className="text-xs" style={{ color: "var(--on-success-container)" }}>{label}</span>
                      <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-success-container)" }}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl text-sm" style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>Back</button>
                  <button onClick={handleSettle} disabled={settling} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm text-primary-foreground" style={{ background: "var(--success)" }}>
                    {settling ? (
                      <><div className="animate-spin rounded-full" style={{ width: 14, height: 14, border: "2px solid color-mix(in srgb, var(--card) 30%, transparent)", borderTopColor: "var(--primary-foreground)" }} />Processing...</>
                    ) : (
                      <><CheckSquare size={14} />Process Settlement</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
