import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Zap, CheckCircle, Clock, AlertTriangle, Play, Pause, Edit,
  ChevronRight, ArrowRight, Bell, Shield, FileText, Users, Bot,
  Activity, TrendingUp, Filter, Eye, Settings
} from "lucide-react";
import { motion } from "motion/react";
import { claims } from "../data/mockData";

const pipelineStages = [
  {
    id: "submitted",
    label: "Submitted",
    count: 45,
    color: "var(--primary)",
    bg: "var(--accent)",
    icon: FileText,
    avgTime: "< 1 hr",
    description: "New claims awaiting initial triage",
  },
  {
    id: "documents",
    label: "Documents",
    count: 38,
    color: "var(--violet)",
    bg: "var(--violet-container)",
    icon: FileText,
    avgTime: "2–4 hrs",
    description: "Awaiting document upload or OCR processing",
  },
  {
    id: "ai_review",
    label: "AI Review",
    count: 28,
    color: "var(--info)",
    bg: "var(--info-container)",
    icon: Bot,
    avgTime: "Auto",
    description: "GPT-4 analysis & risk scoring in progress",
  },
  {
    id: "adjuster",
    label: "Adjuster Review",
    count: 61,
    color: "var(--warning)",
    bg: "var(--warning-container)",
    icon: Users,
    avgTime: "1–2 days",
    description: "Assigned to claims handler for manual review",
  },
  {
    id: "pending",
    label: "Pending Approval",
    count: 22,
    color: "var(--success)",
    bg: "var(--success-container)",
    icon: Clock,
    avgTime: "< 24 hrs",
    description: "Awaiting manager or senior adjuster approval",
  },
  {
    id: "decision",
    label: "Decision",
    count: 148,
    color: "var(--on-surface-variant)",
    bg: "var(--surface-container-low)",
    icon: CheckCircle,
    avgTime: "Completed",
    description: "Approved, rejected, or settled claims",
  },
];

const automationRules = [
  {
    id: "r1",
    name: "Auto-Approve Low Risk Claims",
    trigger: "AI risk score < 20 AND all documents verified",
    action: "Auto-approve claim and notify claimant via email",
    icon: CheckCircle,
    color: "var(--success)",
    bg: "var(--success-container)",
    enabled: true,
    executions: 47,
    lastRun: "18 min ago",
  },
  {
    id: "r2",
    name: "Fraud Alert Escalation",
    trigger: "AI risk score > 75 OR fraud flags detected",
    action: "Escalate to SIU team + notify fraud manager via Slack",
    icon: Shield,
    color: "var(--destructive)",
    bg: "var(--destructive-container)",
    enabled: true,
    executions: 12,
    lastRun: "2 hrs ago",
  },
  {
    id: "r3",
    name: "Document Missing Reminder",
    trigger: "48 hours after submission, docs still missing",
    action: "Send automated email reminder to claimant",
    icon: Bell,
    color: "var(--warning)",
    bg: "var(--warning-container)",
    enabled: true,
    executions: 31,
    lastRun: "4 hrs ago",
  },
  {
    id: "r4",
    name: "Manager Approval Required",
    trigger: "Claim amount > $50,000",
    action: "Route to Senior Adjuster + Manager approval required",
    icon: Users,
    color: "var(--violet)",
    bg: "var(--violet-container)",
    enabled: false,
    executions: 8,
    lastRun: "1 day ago",
  },
  {
    id: "r5",
    name: "Fast-Track Travel Claims",
    trigger: "Travel claim + AI risk score < 15 + all docs verified",
    action: "Auto-process and settle within 24 hours",
    icon: Zap,
    color: "var(--info)",
    bg: "var(--info-container)",
    enabled: true,
    executions: 23,
    lastRun: "1 hr ago",
  },
  {
    id: "r6",
    name: "SLA Breach Alert",
    trigger: "Claim pending review for > 5 business days",
    action: "Alert adjuster + escalate to operations manager",
    icon: Clock,
    color: "var(--destructive)",
    bg: "var(--destructive-container)",
    enabled: true,
    executions: 4,
    lastRun: "3 hrs ago",
  },
];

const recentAutomations = [
  { id: "a1", claim: "CLM-2024-001773", claimant: "Anna Kowalski", action: "Auto-settled: low risk travel claim", rule: "Fast-Track Travel Claims", time: "18 min ago", type: "settled", amount: "$4,200" },
  { id: "a2", claim: "CLM-2024-001847", claimant: "James Patterson", action: "Fraud escalation triggered", rule: "Fraud Alert Escalation", time: "2 hrs ago", type: "fraud", amount: "$45,200" },
  { id: "a3", claim: "CLM-2024-001819", claimant: "Robert Williams", action: "Auto-approved: low risk health claim", rule: "Auto-Approve Low Risk", time: "3 hrs ago", type: "approved", amount: "$8,750" },
  { id: "a4", claim: "CLM-2024-001800", claimant: "Maria Lopez", action: "Document reminder sent to claimant", rule: "Document Missing Reminder", time: "5 hrs ago", type: "reminder", amount: "$12,100" },
  { id: "a5", claim: "CLM-2024-001795", claimant: "Steve Chen", action: "Auto-settled: low risk property claim", rule: "Auto-Approve Low Risk", time: "6 hrs ago", type: "settled", amount: "$3,400" },
  { id: "a6", claim: "CLM-2024-001785", claimant: "David Thompson", action: "SLA breach alert sent to manager", rule: "SLA Breach Alert", time: "8 hrs ago", type: "alert", amount: "$187,000" },
];

const automationTypeConfig: Record<string, { color: string; bg: string }> = {
  settled: { color: "var(--success)", bg: "var(--success-container)" },
  fraud: { color: "var(--destructive)", bg: "var(--destructive-container)" },
  approved: { color: "var(--success)", bg: "var(--success-container)" },
  reminder: { color: "var(--warning)", bg: "var(--warning-container)" },
  alert: { color: "var(--destructive)", bg: "var(--destructive-container)" },
};

export function WorkflowPage() {
  const navigate = useNavigate();
  const [ruleStates, setRuleStates] = useState(
    automationRules.reduce<Record<string, boolean>>((acc, r) => ({ ...acc, [r.id]: r.enabled }), {})
  );
  const [activeView, setActiveView] = useState<"pipeline" | "automation" | "history">("pipeline");

  const totalAutomated = automationRules.reduce((s, r) => s + r.executions, 0);
  const activeRules = Object.values(ruleStates).filter(Boolean).length;

  return (
    <div className="p-6 space-y-6">
      {/* View Toggle */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { id: "pipeline", label: "Claims Pipeline", icon: Activity },
          { id: "automation", label: "Automation Rules", icon: Zap },
          { id: "history", label: "Automation Log", icon: Clock },
        ].map(view => {
          const Icon = view.icon;
          const isActive = activeView === view.id;
          return (
            <button key={view.id} onClick={() => setActiveView(view.id as any)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all"
              style={{
                background: isActive ? "var(--sidebar)" : "var(--primary-foreground)",
                color: isActive ? "var(--primary-foreground)" : "var(--muted-foreground)",
                border: "1px solid var(--border)",
                fontWeight: isActive ? 600 : 400,
              }}>
              <Icon size={14} />{view.label}
            </button>
          );
        })}
        <div className="flex-1" />
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all hover:bg-surface-container-low"
          style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
          <Settings size={14} />Configure
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-primary-foreground"
          style={{ background: "var(--primary)" }}>
          <Zap size={14} />New Automation
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Claims in Pipeline", value: pipelineStages.reduce((s, p) => s + p.count, 0).toString(), icon: Activity, color: "var(--primary)", bg: "var(--accent)" },
          { label: "Active Rules", value: `${activeRules}/${automationRules.length}`, icon: Zap, color: "var(--success)", bg: "var(--success-container)" },
          { label: "Auto-Processed Today", value: totalAutomated.toString(), icon: Bot, color: "var(--violet)", bg: "var(--violet-container)" },
          { label: "Time Saved (hrs)", value: "18.4", icon: TrendingUp, color: "var(--warning)", bg: "var(--warning-container)" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--surface-container)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: stat.bg }}>
                  <Icon size={16} style={{ color: stat.color }} />
                </div>
              </div>
              <p style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{stat.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Pipeline View */}
      {activeView === "pipeline" && (
        <div className="space-y-5">
          {/* Pipeline Funnel */}
          <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--surface-container)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Live Claims Pipeline</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--outline)" }}>Real-time view of all claims across workflow stages</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--success)" }} />
                <span className="text-xs" style={{ color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>Live</span>
              </div>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
              {pipelineStages.map((stage, i) => {
                const Icon = stage.icon;
                const maxCount = Math.max(...pipelineStages.map(s => s.count));
                const heightPct = (stage.count / maxCount) * 100;
                return (
                  <motion.div key={stage.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="flex flex-col items-center cursor-pointer group">
                    <div className="w-full rounded-xl p-3 mb-2 transition-all group-hover:shadow-md"
                      style={{ background: stage.bg, border: `1px solid color-mix(in srgb, ${stage.color} 13%, transparent)` }}>
                      <div className="flex items-center justify-center rounded-xl mb-2 mx-auto"
                        style={{ width: 36, height: 36, background: "var(--card)" }}>
                        <Icon size={16} style={{ color: stage.color }} />
                      </div>
                      <div className="text-center">
                        <p style={{ fontSize: "var(--fs-headline-sm)", fontWeight: "var(--font-weight-medium)", color: stage.color, lineHeight: 1 }}>{stage.count}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>claims</p>
                      </div>
                    </div>
                    <p className="text-xs text-center" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{stage.label}</p>
                    <p className="text-xs text-center mt-0.5" style={{ color: "var(--outline)" }}>{stage.avgTime}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-5 pt-5 border-t" style={{ borderColor: "var(--surface-container)" }}>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 rounded-full overflow-hidden flex">
                  {pipelineStages.map(stage => {
                    const total = pipelineStages.reduce((s, p) => s + p.count, 0);
                    return (
                      <motion.div key={stage.id}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stage.count / total) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        style={{ background: stage.color }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-3 mt-2">
                {pipelineStages.map(stage => {
                  const total = pipelineStages.reduce((s, p) => s + p.count, 0);
                  return (
                    <div key={stage.id} className="flex items-center gap-1.5">
                      <div className="rounded-full w-2 h-2" style={{ background: stage.color }} />
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{stage.label} ({Math.round((stage.count / total) * 100)}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Claims in Each Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {pipelineStages.slice(2, 5).map(stage => {
              const stageClaims = claims.filter(c => c.workflowStage.toLowerCase().includes(stage.label.toLowerCase().split(" ")[0]));
              const Icon = stage.icon;
              return (
                <div key={stage.id} className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                  <div className="flex items-center justify-between px-4 py-3.5" style={{ background: stage.bg, borderBottom: `1px solid color-mix(in srgb, ${stage.color} 13%, transparent)` }}>
                    <div className="flex items-center gap-2">
                      <Icon size={14} style={{ color: stage.color }} />
                      <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{stage.label}</h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--card)", color: stage.color, fontWeight: "var(--font-weight-medium)" }}>
                      {stage.count} claims
                    </span>
                  </div>
                  <div className="divide-y" style={{ borderColor: "var(--surface-container-low)" }}>
                    {(stageClaims.length > 0 ? stageClaims : claims.slice(0, 2)).slice(0, 3).map(claim => (
                      <div key={claim.id} className="flex items-center justify-between px-4 py-3 hover:bg-surface-container-low cursor-pointer transition-colors"
                        onClick={() => navigate(`/app/claims/${claim.id}`)}>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center rounded-full text-primary-foreground flex-shrink-0"
                            style={{ width: 28, height: 28, background: `color-mix(in srgb, ${stage.color} 13%, transparent)`, color: stage.color, fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}>
                            {claim.type[0]}
                          </div>
                          <div>
                            <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)" }}>{claim.claimNumber}</p>
                            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{claim.claimant} · {claim.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>${claim.amount.toLocaleString()}</p>
                            <p className="text-xs" style={{ color: claim.riskScore > 60 ? "var(--destructive)" : "var(--outline)" }}>Risk: {claim.riskScore}</p>
                          </div>
                          <ChevronRight size={12} style={{ color: "var(--outline-variant)" }} />
                        </div>
                      </div>
                    ))}
                    {(stageClaims.length > 3 || stage.count > 3) && (
                      <div className="px-4 py-2.5 flex items-center justify-center">
                        <button className="text-xs" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>
                          +{stage.count - 3} more claims →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Automation Rules View */}
      {activeView === "automation" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: "var(--accent)", border: "1px solid var(--primary-container)" }}>
            <Bot size={16} style={{ color: "var(--primary)", marginTop: 2, flexShrink: 0 }} />
            <div>
              <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--sidebar-mid)" }}>Smart Workflow Automation</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--on-primary-container)" }}>
                {activeRules} of {automationRules.length} rules are active. Automation has processed {totalAutomated} claims today, saving an estimated 18.4 adjuster-hours.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {automationRules.map((rule, i) => {
              const Icon = rule.icon;
              const isActive = ruleStates[rule.id];
              return (
                <motion.div key={rule.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="rounded-2xl p-5 transition-all"
                  style={{ background: "var(--card)", border: `1px solid ${isActive ? `color-mix(in srgb, ${rule.color} 15%, transparent)` : "var(--surface-container)"}` }}>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                      style={{ width: 40, height: 40, background: isActive ? rule.bg : "var(--surface-container-low)" }}>
                      <Icon size={18} style={{ color: isActive ? rule.color : "var(--outline)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{rule.name}</p>
                        {isActive && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--success-container)", color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>Active</span>}
                      </div>
                      <div className="flex items-start gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded flex-shrink-0" style={{ background: "var(--surface-container)", color: "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" }}>IF</span>
                        <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>{rule.trigger}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs px-2 py-0.5 rounded flex-shrink-0" style={{ background: isActive ? rule.bg : "var(--surface-container)", color: isActive ? rule.color : "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" }}>THEN</span>
                        <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>{rule.action}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{rule.executions}</p>
                        <p className="text-xs" style={{ color: "var(--outline)" }}>executions</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--outline)" }}>Last: {rule.lastRun}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setRuleStates(prev => ({ ...prev, [rule.id]: !prev[rule.id] }))}
                          className="rounded-full transition-all flex-shrink-0 relative"
                          style={{ width: 44, height: 24, background: isActive ? rule.color : "var(--outline-variant)" }}>
                          <span className="absolute top-0.5 rounded-full bg-card transition-all"
                            style={{ width: 20, height: 20, left: isActive ? "22px" : "2px" }} />
                        </button>
                        <button className="flex items-center justify-center rounded-lg transition-colors hover:bg-surface-container"
                          style={{ width: 32, height: 32 }}>
                          <Edit size={13} style={{ color: "var(--outline)" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Automation History / Log */}
      {activeView === "history" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: "var(--outline)" }}>Showing {recentAutomations.length} recent automation events</p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-surface-container-low"
                style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
                <Filter size={11} />Filter
              </button>
              <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-surface-container-low"
                style={{ border: "1px solid var(--border)", color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>
                Export Log
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--surface-container-low)", background: "var(--surface-container-low)" }}>
              <div className="grid grid-cols-12 gap-4 text-xs" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>
                <div className="col-span-3">Claim</div>
                <div className="col-span-3">Action</div>
                <div className="col-span-3">Rule Triggered</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-1">Time</div>
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--surface-container-low)" }}>
              {recentAutomations.map((event, i) => {
                const tc = automationTypeConfig[event.type] || { color: "var(--muted-foreground)", bg: "var(--surface-container-low)" };
                return (
                  <motion.div key={event.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className="px-5 py-3.5 hover:bg-surface-container-low cursor-pointer transition-colors"
                    onClick={() => navigate(`/app/claims/${event.id}`)}>
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: tc.color }} />
                          <div>
                            <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)" }}>{event.claim}</p>
                            <p className="text-xs" style={{ color: "var(--outline)" }}>{event.claimant}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: tc.bg, color: tc.color, fontWeight: "var(--font-weight-medium)" }}>
                          {event.action}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <div className="flex items-center gap-1.5">
                          <Zap size={10} style={{ color: "var(--violet-soft)" }} />
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{event.rule}</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{event.amount}</span>
                      </div>
                      <div className="col-span-1">
                        <span className="text-xs" style={{ color: "var(--outline)" }}>{event.time}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
