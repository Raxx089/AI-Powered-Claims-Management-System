import { useState } from "react";
import {
  FileBarChart, Download, Plus, Calendar, Filter,
  BarChart3, Shield, Clock, DollarSign, CheckCircle, FileText
} from "lucide-react";
import { motion } from "motion/react";

const reportTemplates = [
  {
    id: "r1",
    name: "Monthly Claims Summary",
    description: "Overview of all claims submitted, settled, and rejected this month",
    icon: FileBarChart,
    color: "var(--primary)",
    bg: "var(--accent)",
    lastGenerated: "Mar 22, 2024",
    format: "PDF",
  },
  {
    id: "r2",
    name: "Fraud Detection Report",
    description: "AI-detected fraud indicators, flagged claims, and savings analysis",
    icon: Shield,
    color: "var(--destructive)",
    bg: "var(--destructive-container)",
    lastGenerated: "Mar 21, 2024",
    format: "PDF",
  },
  {
    id: "r3",
    name: "Operational Efficiency",
    description: "Adjuster performance metrics, processing times, and workflow bottlenecks",
    icon: BarChart3,
    color: "var(--violet)",
    bg: "var(--violet-container)",
    lastGenerated: "Mar 20, 2024",
    format: "Excel",
  },
  {
    id: "r4",
    name: "Settlement Analysis",
    description: "Breakdown of settled claims, payout amounts, and timeline analysis",
    icon: DollarSign,
    color: "var(--success)",
    bg: "var(--success-container)",
    lastGenerated: "Mar 19, 2024",
    format: "PDF",
  },
  {
    id: "r5",
    name: "Processing Time Report",
    description: "Average claim lifecycle stages and time-to-resolution metrics",
    icon: Clock,
    color: "var(--warning)",
    bg: "var(--warning-container)",
    lastGenerated: "Mar 18, 2024",
    format: "PDF",
  },
  {
    id: "r6",
    name: "Regulatory Compliance",
    description: "Compliance documentation for regulatory bodies and audit purposes",
    icon: CheckCircle,
    color: "var(--info)",
    bg: "var(--info-container)",
    lastGenerated: "Mar 15, 2024",
    format: "PDF",
  },
];

const recentReports = [
  { name: "March 2024 Claims Summary.pdf", size: "2.4 MB", date: "Mar 22, 2024", status: "Ready" },
  { name: "Q1 Fraud Detection Report.pdf", size: "1.8 MB", date: "Mar 21, 2024", status: "Ready" },
  { name: "Adjuster Performance Q1.xlsx", size: "890 KB", date: "Mar 20, 2024", status: "Ready" },
  { name: "Settlement Analysis Feb 2024.pdf", size: "3.1 MB", date: "Feb 28, 2024", status: "Ready" },
];

export function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string[]>([]);
  const [showCustom, setShowCustom] = useState(false);

  const handleGenerate = async (id: string) => {
    setGenerating(id);
    await new Promise((r) => setTimeout(r, 2000));
    setGenerating(null);
    setGenerated((prev) => [...prev, id]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Generate, download, and schedule reports for your organization</p>
        </div>
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors hover:bg-surface-container"
            style={{ border: "1px solid var(--border)", color: "var(--on-surface-variant)", background: "var(--card)" }}
          >
            <Calendar size={14} />
            Schedule
          </button>
          <button
            onClick={() => setShowCustom(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-primary-foreground"
            style={{ background: "var(--primary)" }}
          >
            <Plus size={14} />
            Custom Report
          </button>
        </div>
      </div>

      {/* Report Templates */}
      <div>
        <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Report Templates</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {reportTemplates.map((report, i) => {
            const Icon = report.icon;
            const isGenerating = generating === report.id;
            const isDone = generated.includes(report.id);
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl p-5 transition-shadow hover:shadow-md"
                style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{ width: 44, height: 44, background: report.bg }}
                  >
                    <Icon size={20} style={{ color: report.color }} />
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "var(--surface-container)", color: "var(--muted-foreground)", fontWeight: "var(--font-weight-medium)" }}
                  >
                    {report.format}
                  </span>
                </div>
                <h4 className="text-sm mb-1" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{report.name}</h4>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{report.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: "var(--outline)" }}>Last: {report.lastGenerated}</p>
                  <button
                    onClick={() => handleGenerate(report.id)}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-90"
                    style={{
                      background: isDone ? "var(--success-container)" : "var(--primary)",
                      color: isDone ? "var(--success)" : "var(--primary-foreground)",
                    }}
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full" style={{ width: 10, height: 10, border: "1.5px solid color-mix(in srgb, var(--card) 30%, transparent)", borderTopColor: "var(--primary-foreground)" }} />
                        Generating...
                      </>
                    ) : isDone ? (
                      <>
                        <Download size={11} />
                        Download
                      </>
                    ) : (
                      <>
                        <FileText size={11} />
                        Generate
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h3 className="text-sm mb-4" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Recent Reports</h3>
        <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--surface-container)" }}>
                {["Report Name", "Size", "Generated", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => (
                <tr key={report.name} className="border-t hover:bg-surface-container-low transition-colors" style={{ borderColor: "var(--surface-container-low)" }}>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <FileText size={14} style={{ color: "var(--primary)" }} />
                      <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{report.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{report.size}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{report.date}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--success-container)", color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-surface-container"
                      style={{ color: "var(--primary)", border: "1px solid var(--border)" }}
                    >
                      <Download size={12} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Report Modal */}
      {showCustom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--foreground) 40%, transparent)" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: "var(--card)", margin: "0 16px" }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--surface-container)" }}>
              <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Create Custom Report</h3>
              <button onClick={() => setShowCustom(false)} className="p-1 rounded-lg hover:bg-surface-container">
                <span style={{ color: "var(--outline)", fontSize: "var(--fs-body-lg)" }}>×</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Report Name</label>
                <input className="w-full rounded-xl px-4 text-sm outline-none" style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }} placeholder="My Custom Report" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Date From</label>
                  <input type="date" className="w-full rounded-xl px-4 text-sm outline-none" style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }} />
                </div>
                <div>
                  <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Date To</label>
                  <input type="date" className="w-full rounded-xl px-4 text-sm outline-none" style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }} />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Include Sections</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Claims Summary", "Fraud Analysis", "Settlement Data", "Adjuster Metrics", "Financial Overview", "Risk Distribution"].map((s) => (
                    <label key={s} className="flex items-center gap-2 text-xs cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span style={{ color: "var(--on-surface-variant)" }}>{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowCustom(false)} className="px-4 py-2 rounded-xl text-sm" style={{ color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>Cancel</button>
                <button onClick={() => setShowCustom(false)} className="px-6 py-2 rounded-xl text-sm text-primary-foreground" style={{ background: "var(--primary)" }}>Generate Report</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
