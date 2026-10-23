import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import { motion } from "motion/react";
import { TrendingUp, TrendingDown, Users, DollarSign, Clock, CheckCircle } from "lucide-react";
import {
  claimsOverTimeData, fraudTrendData, settlementTimeData,
  claimsByTypeData, riskDistributionData, teamMembers
} from "../data/mockData";

const efficiencyData = [
  { month: "Oct", adjuster: 72, target: 80 },
  { month: "Nov", adjuster: 75, target: 80 },
  { month: "Dec", adjuster: 71, target: 80 },
  { month: "Jan", adjuster: 78, target: 80 },
  { month: "Feb", adjuster: 83, target: 80 },
  { month: "Mar", adjuster: 89, target: 80 },
];

const kpis = [
  { label: "Avg. Claim Lifecycle", value: "4.2 days", change: "-42%", up: false, good: true, icon: Clock, color: "var(--primary)", bg: "var(--accent)" },
  { label: "Auto-Settlement Rate", value: "38%", change: "+18%", up: true, good: true, icon: CheckCircle, color: "var(--success)", bg: "var(--success-container)" },
  { label: "Cost Per Claim", value: "$124", change: "-31%", up: false, good: true, icon: DollarSign, color: "var(--violet)", bg: "var(--violet-container)" },
  { label: "Adjuster Capacity", value: "89%", change: "+40%", up: true, good: true, icon: Users, color: "var(--warning)", bg: "var(--warning-container)" },
];

export function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl p-4"
              style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, background: kpi.bg }}>
                  <Icon size={16} style={{ color: kpi.color }} />
                </div>
                <div className="flex items-center gap-1">
                  {kpi.up ? <TrendingUp size={12} style={{ color: kpi.good ? "var(--success)" : "var(--destructive)" }} /> : <TrendingDown size={12} style={{ color: kpi.good ? "var(--success)" : "var(--destructive)" }} />}
                  <span className="text-xs" style={{ color: kpi.good ? "var(--success)" : "var(--destructive)", fontWeight: "var(--font-weight-medium)" }}>{kpi.change}</span>
                </div>
              </div>
              <p style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{kpi.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{kpi.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Claims Volume Trend */}
        <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claims Volume Analysis</h3>
              <p className="text-xs" style={{ color: "var(--outline)" }}>Monthly submitted vs. settled</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={claimsOverTimeData} barGap={4}>
              <CartesianGrid key="CartesianGrid-72" strokeDasharray="3 3" stroke="var(--surface-container)" />
              <XAxis key="XAxis-73" dataKey="month" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
              <YAxis key="YAxis-74" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
              <Tooltip key="Tooltip-75" contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: "var(--fs-body-sm)" }} />
              <Bar key="Bar-76" dataKey="submitted" fill="var(--primary)" radius={[3, 3, 0, 0]} name="Submitted" />
              <Bar key="Bar-77" dataKey="settled" fill="var(--success)" radius={[3, 3, 0, 0]} name="Settled" />
              <Bar key="Bar-78" dataKey="rejected" fill="var(--destructive)" radius={[3, 3, 0, 0]} name="Rejected" />
              <Legend key="Legend-79" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "var(--fs-label-sm)" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Settlement Time */}
        <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Avg. Settlement Time</h3>
              <p className="text-xs" style={{ color: "var(--outline)" }}>Weeks — improving with AI automation</p>
            </div>
            <div className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--success-container)", color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>
              ↓ 42% faster
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={settlementTimeData}>
              <CartesianGrid key="CartesianGrid-97" strokeDasharray="3 3" stroke="var(--surface-container)" />
              <XAxis key="XAxis-98" dataKey="week" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
              <YAxis key="YAxis-99" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} domain={[3, 8]} />
              <Tooltip key="Tooltip-100"
                contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: "var(--fs-body-sm)" }}
                formatter={(v: any) => [`${v} days`, "Avg Settlement"]}
              />
              <Line type="monotone" dataKey="avgDays" stroke="var(--primary)" strokeWidth={2.5} dot={{ fill: "var(--primary)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Claims by Type Distribution */}
        <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
          <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claims by Type</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={claimsByTypeData} cx="50%" cy="50%" outerRadius={70} dataKey="count" paddingAngle={3}>
                {claimsByTypeData.map((entry, i) => (
                  <Cell key={`cell-analytics-${entry.type}-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip key="Tooltip-122" contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: "var(--fs-label-sm)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {claimsByTypeData.map((d) => (
              <div key={d.type} className="flex items-center justify-between text-xs px-2 py-1 rounded" style={{ background: "var(--surface-container-low)" }}>
                <div className="flex items-center gap-1.5">
                  <div className="rounded-full w-2 h-2" style={{ background: d.color }} />
                  <span style={{ color: "var(--muted-foreground)" }}>{d.type}</span>
                </div>
                <span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Adjuster Efficiency */}
        <div className="xl:col-span-2 rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Adjuster Efficiency Score</h3>
              <p className="text-xs" style={{ color: "var(--outline)" }}>Performance vs. target (80)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={efficiencyData}>
              <defs key="defs-148">
                <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--violet)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--violet)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid key="CartesianGrid-154" strokeDasharray="3 3" stroke="var(--surface-container)" />
              <XAxis key="XAxis-155" dataKey="month" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
              <YAxis key="YAxis-156" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip key="Tooltip-157" contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: "var(--fs-body-sm)" }} />
              <Area key="Area-158" type="monotone" dataKey="adjuster" stroke="var(--violet)" strokeWidth={2} fill="url(#colorEff)" name="Efficiency" />
              <Line type="monotone" dataKey="target" stroke="var(--destructive)" strokeWidth={1.5} strokeDasharray="5 5" name="Target" dot={false} />
            </AreaChart>
          </ResponsiveContainer>

          {/* Team Table */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {["Adjuster", "Role", "Active Claims", "Resolved", "Efficiency"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-xs" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teamMembers.filter(m => m.claims > 0).map((member) => {
                  const eff = Math.round((member.resolved / Math.max(member.claims, 1)) * 100);
                  return (
                    <tr key={member.id} className="border-t" style={{ borderColor: "var(--surface-container-low)" }}>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="flex items-center justify-center rounded-full text-primary-foreground flex-shrink-0"
                            style={{ width: 26, height: 26, background: "var(--border)", color: "var(--muted-foreground)", fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}
                          >
                            {member.avatar}
                          </div>
                          <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{member.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5"><span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{member.role}</span></td>
                      <td className="px-3 py-2.5"><span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{member.claims}</span></td>
                      <td className="px-3 py-2.5"><span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--success)" }}>{member.resolved}</span></td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 rounded-full overflow-hidden" style={{ height: 4, background: "var(--surface-container)", width: 50 }}>
                            <div className="h-full rounded-full" style={{ width: `${eff}%`, background: eff >= 80 ? "var(--success)" : "var(--warning)" }} />
                          </div>
                          <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: eff >= 80 ? "var(--success)" : "var(--warning)" }}>{eff}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fraud Savings Impact */}
      <div className="rounded-xl p-5" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Fraud Savings Impact</h3>
            <p className="text-xs" style={{ color: "var(--outline)" }}>Monthly cost savings from AI fraud prevention</p>
          </div>
          <div className="text-xs px-3 py-1 rounded-full" style={{ background: "var(--violet-container)", color: "var(--violet)", fontWeight: "var(--font-weight-medium)" }}>
            $2.44M saved YTD
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={fraudTrendData}>
            <CartesianGrid key="CartesianGrid-224" strokeDasharray="3 3" stroke="var(--surface-container)" />
            <XAxis key="XAxis-225" dataKey="month" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} />
            <YAxis key="YAxis-226" tick={{ fontSize: 12, style: { fontSize: "var(--fs-label-sm)" }, fill: "var(--outline)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
            <Tooltip key="Tooltip-227"
              contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: "var(--fs-body-sm)" }}
              formatter={(v: any) => [`$${(v / 1000).toFixed(0)}K`, "Savings"]}
            />
            <Bar key="Bar-231" dataKey="saved" fill="var(--violet)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}