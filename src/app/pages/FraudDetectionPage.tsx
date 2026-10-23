import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Shield, AlertTriangle, TrendingUp, Eye, Sparkles, Filter,
  BarChart2, Activity, CheckCircle, XCircle
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area
} from "recharts";
import { motion } from "motion/react";
import { claims, fraudTrendData, riskDistributionData } from "../data/mockData";

const suspiciousClaims = claims.filter((c) => c.riskLevel === "High" || c.riskLevel === "Critical");

const fraudPatterns = [
  { factor: "Policy Age", score: 85 },
  { factor: "Claim Frequency", score: 72 },
  { factor: "Network Links", score: 68 },
  { factor: "Doc Consistency", score: 45 },
  { factor: "Behavioral", score: 78 },
  { factor: "Location Risk", score: 55 },
];

const modelMetrics = [
  { label: "Model Accuracy", value: "94.7%", icon: Activity, color: "var(--success)", bg: "var(--success-container)" },
  { label: "Fraud Detected", value: "47", icon: Shield, color: "var(--destructive)", bg: "var(--destructive-container)" },
  { label: "False Positives", value: "3.2%", icon: XCircle, color: "var(--warning)", bg: "var(--warning-container)" },
  { label: "Savings This Month", value: "$680K", icon: TrendingUp, color: "var(--violet)", bg: "var(--violet-container)" },
];

export function FraudDetectionPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Critical", "High", "Investigating", "Confirmed Fraud"];

  const riskColors = {
    Low: "var(--success)",
    Medium: "var(--warning)",
    High: "var(--destructive)",
    Critical: "var(--on-destructive-container)",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Model Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {modelMetrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl p-4"
              style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, background: m.bg }}>
                  <Icon size={16} style={{ color: m.color }} />
                </div>
              </div>
              <p style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{m.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{m.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Fraud Trends */}
        <div className="xl:col-span-2 rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Fraud Detection Trends</h3>
              <p className="text-xs" style={{ color: "var(--outline)" }}>Detected vs. prevented cases over 6 months</p>
            </div>
            <div className="flex gap-4">
              {[
                { label: "Detected", color: "var(--destructive)" },
                { label: "Prevented", color: "var(--success)" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="rounded-full w-2 h-2" style={{ background: color }} />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={fraudTrendData}>
              <defs key="defs-95">
                <linearGradient id="colorDetected" x1="0" y1="0" x2="0" y2="1">
                  <stop key="detected-start" offset="5%" stopColor="var(--destructive)" stopOpacity={0.15} />
                  <stop key="detected-end" offset="95%" stopColor="var(--destructive)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPrevented" x1="0" y1="0" x2="0" y2="1">
                  <stop key="prevented-start" offset="5%" stopColor="var(--success)" stopOpacity={0.15} />
                  <stop key="prevented-end" offset="95%" stopColor="var(--success)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid key="CartesianGrid-105" strokeDasharray="3 3" stroke="var(--surface-container)" />
              <XAxis key="XAxis-106" dataKey="month" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
              <YAxis key="YAxis-107" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
              <Tooltip key="Tooltip-108" contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: "var(--fs-body-sm)" }} />
              <Area key="Area-109" type="monotone" dataKey="detected" stroke="var(--destructive)" strokeWidth={2} fill="url(#colorDetected)" />
              <Area key="Area-110" type="monotone" dataKey="prevented" stroke="var(--success)" strokeWidth={2} fill="url(#colorPrevented)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Fraud Pattern Radar */}
        <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={14} style={{ color: "var(--violet)" }} />
            <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Risk Pattern Analysis</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={fraudPatterns}>
              <PolarGrid key="PolarGrid-123" stroke="var(--surface-container)" />
              <PolarAngleAxis key="PolarAngleAxis-124" dataKey="factor" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} />
              <Radar key="Radar-125" dataKey="score" stroke="var(--violet)" fill="var(--violet)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-1">
            {fraudPatterns.map(({ factor, score }) => (
              <div key={factor} className="flex items-center justify-between text-xs px-2 py-1 rounded" style={{ background: "var(--surface-container-low)" }}>
                <span style={{ color: "var(--muted-foreground)" }}>{factor}</span>
                <span style={{ fontWeight: "var(--font-weight-medium)", color: score > 70 ? "var(--destructive)" : score > 50 ? "var(--warning)" : "var(--success)" }}>{score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
          <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Risk Distribution</h3>
          <div className="space-y-3">
            {riskDistributionData.map((d) => (
              <div key={d.level}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-full"
                      style={{
                        width: 8,
                        height: 8,
                        background:
                          d.level === "Low" ? "var(--success)" :
                          d.level === "Medium" ? "var(--warning)" :
                          d.level === "High" ? "var(--destructive)" : "var(--on-destructive-container)",
                      }}
                    />
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{d.level} Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{d.count}</span>
                    <span className="text-xs" style={{ color: "var(--outline)" }}>({d.percentage}%)</span>
                  </div>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 6, background: "var(--surface-container)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.percentage}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{
                      background:
                        d.level === "Low" ? "var(--success)" :
                        d.level === "Medium" ? "var(--warning)" :
                        d.level === "High" ? "var(--destructive)" : "var(--on-destructive-container)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Risk Claims */}
        <div className="xl:col-span-2 rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ background: "var(--sidebar-deep)", borderBottom: "1px solid color-mix(in srgb, var(--card) 5%, transparent)" }}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} style={{ color: "var(--destructive-container)" }} />
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary-foreground)" }}>High-Risk Flagged Claims</h3>
            </div>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "color-mix(in srgb, var(--destructive) 30%, transparent)", color: "var(--destructive-container)", fontWeight: "var(--font-weight-medium)" }}
            >
              {suspiciousClaims.length} flagged
            </span>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--surface-container-low)" }}>
            {suspiciousClaims.map((claim) => (
              <div
                key={claim.id}
                className="px-5 py-4 hover:bg-destructive-container/30 cursor-pointer transition-colors"
                onClick={() => navigate(`/app/claims/${claim.id}`)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                      style={{
                        width: 32,
                        height: 32,
                        background: claim.riskLevel === "Critical" ? "var(--on-destructive-container)" : "var(--destructive-container)",
                      }}
                    >
                      <Shield size={14} style={{ color: claim.riskLevel === "Critical" ? "var(--destructive-container)" : "var(--destructive)" }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)" }}>{claim.claimNumber}</p>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: claim.riskLevel === "Critical" ? "var(--on-destructive-container)" : "var(--destructive-container)",
                            color: claim.riskLevel === "Critical" ? "var(--destructive-container)" : "var(--destructive)",
                            fontWeight: "var(--font-weight-medium)",
                          }}
                        >
                          {claim.riskLevel}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--warning-container)", color: "var(--warning)", fontWeight: "var(--font-weight-medium)" }}>
                          {claim.priority} Priority
                        </span>
                      </div>
                      <p className="text-xs mb-1" style={{ color: "var(--on-surface-variant)" }}>
                        {claim.claimant} · {claim.type} · ${claim.amount.toLocaleString()}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {claim.fraudFlags.slice(0, 2).map((flag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: "var(--destructive-container)", color: "var(--destructive)", border: "1px solid var(--destructive-container)" }}
                          >
                            {flag}
                          </span>
                        ))}
                        {claim.fraudFlags.length > 2 && (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--surface-container)", color: "var(--outline)" }}>
                            +{claim.fraudFlags.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-xs mb-0.5" style={{ color: "var(--outline)" }}>Risk Score</p>
                      <p style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--destructive)" }}>{claim.riskScore}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="rounded-full overflow-hidden" style={{ height: 3, width: 50, background: "var(--surface-container)" }}>
                          <div className="h-full rounded-full" style={{ width: `${claim.aiConfidence}%`, background: "var(--destructive)" }} />
                        </div>
                        <span className="text-xs" style={{ color: "var(--outline)" }}>{claim.aiConfidence}% conf.</span>
                      </div>
                    </div>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-primary-foreground"
                      style={{ background: "var(--primary)" }}
                    >
                      <Eye size={11} />
                      Review
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Fraud Intelligence */}
      <div
        className="rounded-xl p-6"
        style={{ background: "var(--sidebar)", border: "1px solid color-mix(in srgb, var(--violet) 20%, transparent)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} style={{ color: "var(--violet-soft)" }} />
          <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary-foreground)" }}>AI Fraud Intelligence Summary</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Fraud Ring Detected",
              desc: "3 claims from Miami region share IP addresses and similar damage pattern descriptors. Attorney representation cross-reference matches 2 prior fraudulent claims.",
              severity: "critical",
            },
            {
              title: "Unusual Claim Spike",
              desc: "34% increase in high-value property claims from Pacific Northwest. Correlates with reported hail event but volume exceeds historical norms by 2.8 standard deviations.",
              severity: "warning",
            },
            {
              title: "Policy Stacking Pattern",
              desc: "AI has identified 5 policyholders with overlapping coverage across 3+ carriers, a common fraud indicator. Recommend coordination with other insurers.",
              severity: "warning",
            },
          ].map(({ title, desc, severity }) => (
            <div
              key={title}
              className="rounded-xl p-4"
              style={{
                background: severity === "critical" ? "color-mix(in srgb, var(--destructive) 10%, transparent)" : "color-mix(in srgb, var(--warning) 10%, transparent)",
                border: `1px solid ${severity === "critical" ? "color-mix(in srgb, var(--destructive) 30%, transparent)" : "color-mix(in srgb, var(--warning) 30%, transparent)"}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={13} style={{ color: severity === "critical" ? "var(--destructive-container)" : "var(--warning-soft)" }} />
                <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: severity === "critical" ? "var(--destructive-container)" : "var(--warning-soft)" }}>
                  {title}
                </p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}