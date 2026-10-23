import { useState } from "react";
import {
  Users, Shield, Zap, Bell, Link, Lock,
  Plus, Trash2, Edit, Check, X, Settings
} from "lucide-react";
import { teamMembers } from "../data/mockData";

const settingsTabs = [
  { id: "users", label: "Users & Roles", icon: Users },
  { id: "workflows", label: "Workflows", icon: Zap },
  { id: "integrations", label: "Integrations", icon: Link },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];

const integrations = [
  { id: "salesforce", name: "Salesforce CRM", desc: "Sync policy and customer data", status: "Connected", logo: "SF", color: "#1D9BD1" },
  { id: "docusign", name: "DocuSign", desc: "Digital signatures for settlements", status: "Connected", logo: "DS", color: "#FFB900" },
  { id: "stripe", name: "Stripe Payments", desc: "Process settlement payments", status: "Connected", logo: "SP", color: "#635BFF" },
  { id: "slack", name: "Slack", desc: "Team notifications and alerts", status: "Disconnected", logo: "SL", color: "#4A154B" },
  { id: "twilio", name: "Twilio SMS", desc: "SMS notifications to claimants", status: "Disconnected", logo: "TW", color: "#F22F46" },
  { id: "aws-textract", name: "AWS Textract", desc: "AI document OCR processing", status: "Connected", logo: "AT", color: "#FF9900" },
];

const workflows = [
  { id: "w1", name: "Auto-Approve Low Risk Claims", trigger: "Risk score < 20", action: "Auto-approve and notify claimant", enabled: true },
  { id: "w2", name: "Fraud Alert Escalation", trigger: "Risk score > 75", action: "Escalate to fraud team + SIU notification", enabled: true },
  { id: "w3", name: "Document Missing Reminder", trigger: "48hrs after submission, docs missing", action: "Send email reminder to claimant", enabled: true },
  { id: "w4", name: "Manager Approval Required", trigger: "Claim amount > $50,000", action: "Route to senior adjuster + manager", enabled: false },
  { id: "w5", name: "Fast-Track Travel Claims", trigger: "Travel claim + risk score < 15", action: "Auto-process within 24 hours", enabled: true },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [workflowStates, setWorkflowStates] = useState(
    workflows.reduce<Record<string, boolean>>((acc, w) => ({ ...acc, [w.id]: w.enabled }), {})
  );

  return (
    <div className="p-6">
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="flex-shrink-0" style={{ width: 200 }}>
          <nav className="space-y-1">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all"
                  style={{
                    background: isActive ? "var(--accent)" : "transparent",
                    color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                    fontWeight: isActive ? 600 : 400,
                    borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent",
                  }}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Users & Roles */}
          {activeTab === "users" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Team Members</h3>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Manage users and their access levels</p>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-primary-foreground"
                  style={{ background: "var(--primary)" }}
                >
                  <Plus size={14} />
                  Invite User
                </button>
              </div>

              <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--surface-container)" }}>
                      {["Member", "Role", "Active Claims", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-t hover:bg-surface-container-low transition-colors" style={{ borderColor: "var(--surface-container-low)" }}>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex items-center justify-center rounded-full text-primary-foreground flex-shrink-0"
                              style={{ width: 32, height: 32, background: "var(--primary)", fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}
                            >
                              {member.avatar}
                            </div>
                            <div>
                              <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{member.name}</p>
                              <p className="text-xs" style={{ color: "var(--outline)" }}>sarah@insurecorp.com</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              background:
                                member.role.includes("Manager") ? "var(--success-container)" :
                                member.role.includes("Fraud") ? "var(--destructive-container)" : "var(--accent)",
                              color:
                                member.role.includes("Manager") ? "var(--success)" :
                                member.role.includes("Fraud") ? "var(--destructive)" : "var(--primary)",
                              fontWeight: "var(--font-weight-medium)",
                            }}
                          >
                            {member.role}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{member.claims}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <div className="rounded-full" style={{ width: 6, height: 6, background: "var(--success)" }} />
                            <span className="text-xs" style={{ color: "var(--success)", fontWeight: "var(--font-weight-medium)" }}>Active</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-surface-container transition-colors">
                              <Edit size={13} style={{ color: "var(--muted-foreground)" }} />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-destructive-container transition-colors">
                              <Trash2 size={13} style={{ color: "var(--destructive)" }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Roles */}
              <div>
                <h3 className="text-sm mb-3" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Role Permissions</h3>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { role: "Claims Adjuster", permissions: ["View claims", "Update claim status", "Upload documents", "Add comments"], color: "var(--primary)" },
                    { role: "Senior Adjuster", permissions: ["All adjuster permissions", "Approve claims up to $50K", "Assign to team members"], color: "var(--violet)" },
                    { role: "Operations Manager", permissions: ["All adjuster permissions", "Approve all claims", "Access analytics", "Manage team"], color: "var(--success)" },
                    { role: "Fraud Analyst", permissions: ["View all claims", "Flag fraud", "Access SIU tools", "Fraud reports"], color: "var(--destructive)" },
                  ].map(({ role, permissions, color }) => (
                    <div key={role} className="rounded-xl p-4" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ background: `color-mix(in srgb, ${color} 8%, transparent)`, color, fontWeight: "var(--font-weight-medium)" }}
                        >
                          {role}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {permissions.map((p) => (
                          <div key={p} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--on-surface-variant)" }}>
                            <Check size={10} style={{ color: "var(--success)" }} />
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Workflows */}
          {activeTab === "workflows" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Automation Workflows</h3>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Configure automated claim processing rules</p>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-primary-foreground"
                  style={{ background: "var(--primary)" }}
                >
                  <Plus size={14} />
                  New Workflow
                </button>
              </div>

              <div className="space-y-3">
                {workflows.map((wf) => (
                  <div
                    key={wf.id}
                    className="rounded-xl p-4"
                    style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{wf.name}</p>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--surface-container)", color: "var(--muted-foreground)" }}>
                            Trigger:
                          </span>
                          <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>{wf.trigger}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--surface-container)", color: "var(--muted-foreground)" }}>
                            Action:
                          </span>
                          <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>{wf.action}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button
                          onClick={() => setWorkflowStates((prev) => ({ ...prev, [wf.id]: !prev[wf.id] }))}
                          className="rounded-full transition-all"
                          style={{
                            width: 44,
                            height: 24,
                            background: workflowStates[wf.id] ? "var(--primary)" : "var(--outline-variant)",
                            position: "relative",
                          }}
                        >
                          <span
                            className="absolute top-0.5 rounded-full bg-card transition-all"
                            style={{
                              width: 20,
                              height: 20,
                              left: workflowStates[wf.id] ? "22px" : "2px",
                            }}
                          />
                        </button>
                        <span className="text-xs" style={{ color: workflowStates[wf.id] ? "var(--success)" : "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>
                          {workflowStates[wf.id] ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Connected Integrations</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Manage external system connections</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {integrations.map((intg) => (
                  <div
                    key={intg.id}
                    className="rounded-xl p-4"
                    style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex items-center justify-center rounded-xl text-primary-foreground flex-shrink-0"
                        style={{ width: 40, height: 40, background: intg.color, fontSize: "var(--fs-label-sm)", fontWeight: "var(--font-weight-medium)" }}
                      >
                        {intg.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{intg.name}</p>
                        <p className="text-xs" style={{ color: "var(--outline)" }}>{intg.desc}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div
                          className="rounded-full"
                          style={{ width: 6, height: 6, background: intg.status === "Connected" ? "var(--success)" : "var(--outline-variant)" }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: intg.status === "Connected" ? "var(--success)" : "var(--outline)", fontWeight: "var(--font-weight-medium)" }}
                        >
                          {intg.status}
                        </span>
                      </div>
                    </div>
                    <button
                      className="w-full py-2 rounded-lg text-xs transition-colors"
                      style={{
                        background: intg.status === "Connected" ? "var(--destructive-container)" : "var(--accent)",
                        color: intg.status === "Connected" ? "var(--destructive)" : "var(--primary)",
                        fontWeight: "var(--font-weight-medium)",
                      }}
                    >
                      {intg.status === "Connected" ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Notification Settings</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Configure system-wide notification preferences</p>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                {[
                  { category: "Claims", items: [
                    { label: "New claim submitted", email: true, slack: true, sms: false },
                    { label: "Claim status updated", email: true, slack: false, sms: true },
                    { label: "Claim approved/rejected", email: true, slack: true, sms: true },
                  ]},
                  { category: "Fraud & Risk", items: [
                    { label: "High-risk claim detected", email: true, slack: true, sms: true },
                    { label: "Fraud pattern identified", email: true, slack: true, sms: false },
                  ]},
                  { category: "System", items: [
                    { label: "Weekly performance report", email: true, slack: false, sms: false },
                    { label: "System maintenance alerts", email: true, slack: true, sms: false },
                  ]},
                ].map(({ category, items }) => (
                  <div key={category}>
                    <div className="px-4 py-2" style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--surface-container)" }}>
                      <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{category}</p>
                    </div>
                    {items.map((item) => (
                      <div key={item.label} className="flex items-center justify-between px-4 py-3.5 border-b" style={{ borderColor: "var(--surface-container-low)" }}>
                        <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>{item.label}</p>
                        <div className="flex items-center gap-6">
                          {[
                            { label: "Email", key: "email", val: item.email },
                            { label: "Slack", key: "slack", val: item.slack },
                            { label: "SMS", key: "sms", val: item.sms },
                          ].map(({ label, val }) => (
                            <div key={label} className="flex items-center gap-1.5">
                              <span className="text-xs" style={{ color: "var(--outline)" }}>{label}</span>
                              <button
                                className="rounded-full transition-all"
                                style={{
                                  width: 36,
                                  height: 20,
                                  background: val ? "var(--primary)" : "var(--outline-variant)",
                                  position: "relative",
                                  flexShrink: 0,
                                }}
                              >
                                <span
                                  className="absolute top-0.5 rounded-full bg-card"
                                  style={{ width: 16, height: 16, left: val ? "18px" : "2px" }}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Security Settings</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Manage authentication and security policies</p>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Two-Factor Authentication", desc: "Require 2FA for all users", enabled: true },
                  { title: "Single Sign-On (SSO)", desc: "SAML 2.0 / OAuth integration", enabled: true },
                  { title: "Session Timeout", desc: "Auto-logout after 8 hours of inactivity", enabled: true },
                  { title: "IP Allowlisting", desc: "Restrict access to approved IP ranges", enabled: false },
                  { title: "Audit Logging", desc: "Log all user actions for compliance", enabled: true },
                ].map(({ title, desc, enabled }) => (
                  <div key={title} className="flex items-center justify-between p-4 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--surface-container)" }}>
                    <div>
                      <p className="text-sm" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
                    </div>
                    <button
                      className="rounded-full transition-all flex-shrink-0"
                      style={{
                        width: 44,
                        height: 24,
                        background: enabled ? "var(--primary)" : "var(--outline-variant)",
                        position: "relative",
                        marginLeft: 16,
                      }}
                    >
                      <span
                        className="absolute top-0.5 rounded-full bg-card transition-all"
                        style={{ width: 20, height: 20, left: enabled ? "22px" : "2px" }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
