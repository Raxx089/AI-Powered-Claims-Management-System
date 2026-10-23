import { useNavigate } from "react-router";
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, DollarSign,
  FileText, Shield, Users, Sparkles, ArrowRight, ChevronRight, Activity,
  Zap, AlertCircle, Target, Bot, Play, BarChart3
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { motion } from "motion/react";
import {
  dashboardStats, claimsOverTimeData, claimsByTypeData,
  settlementTimeData, aiInsights, claims
} from "../data/mockData";

const statusColor: Record<string, string> = {
  "New": "var(--primary)", "Under Review": "var(--warning)", "Investigation": "var(--violet)",
  "Pending Approval": "var(--info)", "Approved": "var(--success)", "Rejected": "var(--destructive)",
  "Settled": "var(--muted-foreground)", "Closed": "var(--outline)",
};
const riskColor: Record<string, string> = {
  Low: "var(--success)", Medium: "var(--warning)", High: "var(--destructive)", Critical: "var(--on-destructive-container)",
};

const workflowStages = [
  { label: "Submitted", count: 45, color: "var(--primary)" },
  { label: "AI Review", count: 38, color: "var(--violet)" },
  { label: "Adjuster", count: 61, color: "var(--warning)" },
  { label: "Pending", count: 22, color: "var(--info)" },
  { label: "Decision", count: 148, color: "var(--success)" },
];

export function DashboardPage() {
  const navigate = useNavigate();

  const stats = [
    { label: "Total Claims", value: dashboardStats.totalClaims.toLocaleString(), icon: FileText, color: "var(--primary)", bg: "var(--accent)", change: "+8.2%", up: true },
    { label: "Active Claims", value: dashboardStats.activeClaims.toLocaleString(), icon: Activity, color: "var(--violet)", bg: "var(--violet-container)", change: "+3.1%", up: true },
    { label: "Pending Review", value: dashboardStats.pendingReview.toLocaleString(), icon: Clock, color: "var(--warning)", bg: "var(--warning-container)", change: "-12.4%", up: false },
    { label: "Settled Today", value: dashboardStats.settledToday.toLocaleString(), icon: CheckCircle, color: "var(--success)", bg: "var(--success-container)", change: "+24.8%", up: true },
    { label: "SLA Breaches", value: "12", icon: AlertCircle, color: "var(--destructive)", bg: "var(--destructive-container)", change: "+5", up: true },
    { label: "Fraud Detected", value: dashboardStats.fraudDetected.toLocaleString(), icon: Shield, color: "var(--destructive)", bg: "var(--destructive-container)", change: "+41.2%", up: true },
  ];

  const recentClaims = claims.slice(0, 5);

  return (
    <div className="p-6 space-y-5">
      {/* Welcome Banner */}
      <div className="rounded-2xl px-6 py-5 flex items-center justify-between overflow-hidden relative"
        style={{ background: "var(--sidebar)", boxShadow: "0 4px 20px color-mix(in srgb, var(--foreground) 15%, transparent)" }}>
        {/* Decorative circles */}
        <div className="absolute top-0 right-40 w-40 h-40 rounded-full opacity-10" style={{ background: "var(--primary)", transform: "translate(40%, -40%)" }} />
        <div className="absolute bottom-0 right-20 w-24 h-24 rounded-full opacity-10" style={{ background: "var(--violet)", transform: "translate(20%, 50%)" }} />

        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "color-mix(in srgb, var(--primary) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--inverse-primary)" }} />
              <span className="text-xs" style={{ color: "var(--inverse-primary)", fontWeight: "var(--font-weight-medium)" }}>AI System Active · 94.7% accuracy</span>
            </div>
          </div>
          <h2 className="text-primary-foreground mb-1" style={{ fontWeight: "var(--font-weight-medium)", fontSize: "var(--fs-title-lg)" }}>Good morning, Sarah 👋</h2>
          <p className="text-sm" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>
            You have <span style={{ color: "var(--inverse-primary)", fontWeight: "var(--font-weight-medium)" }}>89 claims</span> pending review,{" "}
            <span style={{ color: "var(--destructive-soft)", fontWeight: "var(--font-weight-medium)" }}>2 critical fraud alerts</span>, and{" "}
            <span style={{ color: "var(--warning-soft)", fontWeight: "var(--font-weight-medium)" }}>12 SLA breaches</span> today.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button onClick={() => navigate("/app/claims")} className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-primary-foreground transition-all hover:opacity-90 hidden md:flex"
            style={{ background: "color-mix(in srgb, var(--primary) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 40%, transparent)", fontWeight: "var(--font-weight-medium)" }}>
            View Queue <ArrowRight size={14} />
          </button>
          <button onClick={() => navigate("/app/fraud")} className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-primary-foreground transition-all hover:opacity-90 hidden md:flex"
            style={{ background: "color-mix(in srgb, var(--destructive) 20%, transparent)", border: "1px solid color-mix(in srgb, var(--destructive) 30%, transparent)", fontWeight: "var(--font-weight-medium)" }}>
            <AlertTriangle size={14} />Fraud Alerts
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-4 transition-all hover:shadow-md hover:-translate-y-0.5 cursor-default"
              style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center rounded-xl" style={{ width: 36, height: 36, background: s.bg }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                <div className="flex items-center gap-1">
                  {s.up ? <TrendingUp size={12} style={{ color: s.label === "Fraud Detected" || s.label === "SLA Breaches" ? "var(--destructive)" : "var(--success)" }} />
                    : <TrendingDown size={12} style={{ color: "var(--success)" }} />}
                  <span className="text-xs" style={{ color: s.label === "Fraud Detected" || s.label === "SLA Breaches" ? (s.up ? "var(--destructive)" : "var(--success)") : (s.up ? "var(--success)" : "var(--destructive)"), fontWeight: "var(--font-weight-medium)" }}>
                    {s.change}
                  </span>
                </div>
              </div>
              <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)", fontSize: "var(--fs-title-lg)" }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Workflow Pipeline Strip */}
      <div className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--surface-container)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={14} style={{ color: "var(--primary)" }} />
            <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claims Pipeline</h3>
          </div>
          <button onClick={() => navigate("/app/workflow")} className="flex items-center gap-1 text-xs hover:opacity-80" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>
            View Workflow <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {workflowStages.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-2 flex-shrink-0">
              <div className="flex flex-col items-center min-w-[90px]">
                <div className="w-full rounded-full overflow-hidden mb-1" style={{ height: 8, background: "var(--surface-container)" }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(stage.count / 200) * 100}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full" style={{ background: stage.color }} />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs" style={{ color: "var(--outline)" }}>{stage.label}</span>
                  <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: stage.color }}>{stage.count}</span>
                </div>
              </div>
              {i < workflowStages.length - 1 && <ChevronRight size={12} style={{ color: "var(--outline-variant)", flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "47 Auto-Settle Eligible", sub: "Low-risk travel claims", icon: Zap, color: "var(--success)", bg: "var(--success-container)", border: "var(--success-border)", action: () => {} },
          { label: "12 Documents Queued", sub: "Pending OCR processing", icon: FileText, color: "var(--violet)", bg: "var(--violet-container)", border: "var(--violet-border)", action: () => navigate("/app/claims") },
          { label: "3 Fraud Alerts", sub: "Requires immediate review", icon: Shield, color: "var(--destructive)", bg: "var(--destructive-container)", border: "var(--destructive-container)", action: () => navigate("/app/fraud") },
          { label: "Run AI Batch Analysis", sub: "Process 89 pending claims", icon: Bot, color: "var(--primary)", bg: "var(--accent)", border: "var(--primary-container)", action: () => {} },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button key={action.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
              onClick={action.action}
              className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-98"
              style={{ background: action.bg, border: `1px solid ${action.border}` }}>
              <div className="flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: 36, height: 36, background: "color-mix(in srgb, var(--card) 70%, transparent)" }}>
                <Icon size={16} style={{ color: action.color }} />
              </div>
              <div>
                <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)", lineHeight: 1.3 }}>{action.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{action.sub}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Main Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Claims Over Time */}
        <div className="xl:col-span-2 rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claims Volume</h3>
              <p className="text-xs" style={{ color: "var(--outline)" }}>Last 6 months · submitted vs. settled</p>
            </div>
            <div className="flex gap-4 text-xs">
              {[["Submitted", "var(--primary)"], ["Settled", "var(--success)"], ["Rejected", "var(--destructive)"]].map(([k, c]) => (
                <div key={k} className="flex items-center gap-1.5">
                  <div className="rounded-full w-2 h-2" style={{ background: c }} />
                  <span style={{ color: "var(--muted-foreground)" }}>{k}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={claimsOverTimeData}>
              <defs key="defs-187">
                <linearGradient id="colorSubmitted2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSettled2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--success)" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid key="CartesianGrid-197" strokeDasharray="3 3" stroke="var(--surface-container)" />
              <XAxis key="XAxis-198" dataKey="month" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
              <YAxis key="YAxis-199" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
              <Tooltip key="Tooltip-200" contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: "var(--fs-body-sm)", boxShadow: "0 4px 12px color-mix(in srgb, var(--foreground) 8%, transparent)" }} />
              <Area key="Area-201" type="monotone" dataKey="submitted" stroke="var(--primary)" strokeWidth={2} fill="url(#colorSubmitted2)" />
              <Area key="Area-202" type="monotone" dataKey="settled" stroke="var(--success)" strokeWidth={2} fill="url(#colorSettled2)" />
              <Area key="Area-203" type="monotone" dataKey="rejected" stroke="var(--destructive)" strokeWidth={2} fill="transparent" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Claims by Type */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claims by Type</h3>
              <p className="text-xs" style={{ color: "var(--outline)" }}>Distribution</p>
            </div>
            <BarChart3 size={14} style={{ color: "var(--outline)" }} />
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={claimsByTypeData} cx="50%" cy="50%" innerRadius={38} outerRadius={62} dataKey="count" paddingAngle={3}>
                {claimsByTypeData.map((entry, i) => (
                  <Cell key={`cell-type-${entry.type}-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip key="Tooltip-224" contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: "var(--fs-label-sm)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {claimsByTypeData.map(d => (
              <div key={d.type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-2 h-2" style={{ background: d.color }} />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{d.type}</span>
                </div>
                <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{d.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights + Recent Claims */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* AI Insights */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
          <div className="flex items-center justify-between px-5 py-4"
            style={{ background: "var(--sidebar)", borderBottom: "1px solid color-mix(in srgb, var(--card) 5%, transparent)" }}>
            <div className="flex items-center gap-2">
              <Sparkles size={15} style={{ color: "var(--violet-soft)" }} />
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary-foreground)" }}>AI Insights</h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "color-mix(in srgb, var(--violet) 25%, transparent)", color: "var(--violet-soft)", fontWeight: "var(--font-weight-medium)" }}>
              {aiInsights.length} active
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--surface-container-low)" }}>
            {aiInsights.map(insight => (
              <div key={insight.id} className="px-5 py-4 cursor-pointer transition-colors hover:bg-surface-container-low" onClick={() => navigate("/app/fraud")}>
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center rounded-xl flex-shrink-0 mt-0.5"
                    style={{ width: 30, height: 30, background: insight.severity === "critical" ? "var(--destructive-container)" : insight.severity === "warning" ? "var(--warning-container)" : "var(--accent)" }}>
                    {insight.severity === "critical" ? <AlertTriangle size={13} style={{ color: "var(--destructive)" }} />
                      : insight.severity === "warning" ? <AlertTriangle size={13} style={{ color: "var(--warning)" }} />
                        : <Sparkles size={13} style={{ color: "var(--primary)" }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{insight.title}</p>
                      {insight.severity === "critical" && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: "var(--destructive-container)", color: "var(--destructive)", fontWeight: "var(--font-weight-medium)" }}>CRITICAL</span>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{insight.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs" style={{ color: "var(--outline)" }}>{insight.timestamp}</span>
                      <span className="text-xs" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>{insight.action} →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Claims */}
        <div className="xl:col-span-2 rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--surface-container)" }}>
            <div>
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Recent Claims</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--outline)" }}>Latest activity across your queue</p>
            </div>
            <button onClick={() => navigate("/app/claims")} className="flex items-center gap-1 text-xs transition-colors hover:opacity-80" style={{ color: "var(--primary)", fontWeight: "var(--font-weight-medium)" }}>
              View all <ChevronRight size={12} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "var(--surface-container-low)" }}>
                  {["Claim #", "Claimant", "Type", "Amount", "AI Score", "Risk", "Status"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentClaims.map(claim => (
                  <tr key={claim.id} className="border-t cursor-pointer transition-colors hover:bg-accent/30"
                    style={{ borderColor: "var(--surface-container-low)" }} onClick={() => navigate(`/app/claims/${claim.id}`)}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {claim.priority === "Urgent" && <Zap size={10} style={{ color: "var(--destructive)", flexShrink: 0 }} />}
                        <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)" }}>{claim.claimNumber}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs" style={{ color: "var(--foreground)", fontWeight: "var(--font-weight-medium)" }}>{claim.claimant}</span></td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--surface-container)", color: "var(--muted-foreground)" }}>{claim.type}</span></td>
                    <td className="px-4 py-3"><span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>${claim.amount.toLocaleString()}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full overflow-hidden" style={{ height: 4, width: 50, background: "var(--surface-container)" }}>
                          <div className="h-full rounded-full" style={{ width: `${claim.aiConfidence}%`, background: claim.aiConfidence >= 80 ? "var(--success)" : claim.aiConfidence >= 60 ? "var(--warning)" : "var(--destructive)" }} />
                        </div>
                        <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--muted-foreground)" }}>{claim.aiConfidence}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="rounded-full" style={{ width: 6, height: 6, background: riskColor[claim.riskLevel] }} />
                        <span className="text-xs" style={{ color: riskColor[claim.riskLevel], fontWeight: "var(--font-weight-medium)" }}>{claim.riskLevel}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: `color-mix(in srgb, ${statusColor[claim.status]} 8%, transparent)`, color: statusColor[claim.status], fontWeight: "var(--font-weight-medium)" }}>
                        {claim.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Settlement Time Trend */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Settlement Time Trend</h3>
              <p className="text-xs" style={{ color: "var(--outline)" }}>Average days to settle — AI improvement</p>
            </div>
            <div className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--success-container)", color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>↓ 42% faster</div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={settlementTimeData}>
              <CartesianGrid key="CartesianGrid-357" strokeDasharray="3 3" stroke="var(--surface-container)" />
              <XAxis key="XAxis-358" dataKey="week" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
              <YAxis key="YAxis-359" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
              <Tooltip key="Tooltip-360" contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: "var(--fs-body-sm)" }} />
              <Bar key="Bar-361" dataKey="avgDays" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Business Impact */}
        <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container-high)", boxShadow: "0 1px 4px color-mix(in srgb, var(--foreground) 4%, transparent)" }}>
          <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Business Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Total Payouts", value: `$${(dashboardStats.totalPayout / 1e6).toFixed(1)}M`, icon: DollarSign, color: "var(--primary)", bg: "var(--accent)", sub: "This month" },
              { label: "Cost Savings", value: `$${(dashboardStats.costSavings / 1e6).toFixed(1)}M`, icon: TrendingDown, color: "var(--success)", bg: "var(--success-container)", sub: "vs. last year" },
              { label: "Fraud Prevented", value: "$680K", icon: Shield, color: "var(--violet)", bg: "var(--violet-container)", sub: "March 2024" },
              { label: "Adj. Productivity", value: "+40%", icon: TrendingUp, color: "var(--warning)", bg: "var(--warning-container)", sub: "Year over year" },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="p-4 rounded-2xl transition-all hover:-translate-y-0.5" style={{ background: item.bg }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={15} style={{ color: item.color }} />
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{item.label}</span>
                  </div>
                  <p style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{item.value}</p>
                  <p className="text-xs" style={{ color: "var(--outline)" }}>{item.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}