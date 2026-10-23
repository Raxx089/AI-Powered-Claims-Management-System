import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  X, Sparkles, Send, Bot, User,
  RefreshCw, ChevronRight, Lightbulb, Zap, AlertTriangle
} from "lucide-react";
import { claims } from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  cards?: ActionCard[];
  typing?: boolean;
}

interface ActionCard {
  title: string;
  value: string;
  badge?: string;
  color?: string;
  action?: string;
}

interface AIAssistantProps {
  open: boolean;
  onClose: () => void;
}

const contextSuggestions: Record<string, string[]> = {
  "/app/dashboard": [
    "Summarize today's claim activity",
    "Which claims need urgent attention?",
    "Show me this week's fraud detections",
    "What's our settlement rate this month?",
  ],
  "/app/claims": [
    "Find high-risk claims pending review",
    "Which claims are overdue?",
    "Suggest next steps for CLM-2024-001847",
    "Auto-approve eligible low-risk claims",
  ],
  "/app/fraud": [
    "Explain the Miami fraud ring pattern",
    "What fraud indicators should I watch for?",
    "Generate a fraud investigation checklist",
    "Compare fraud rates to last quarter",
  ],
  "/app/analytics": [
    "What's driving the settlement time improvement?",
    "Identify top cost-saving opportunities",
    "Forecast next month's claim volume",
    "Which adjusters have the best resolution rate?",
  ],
  "/app/reports": [
    "Generate executive summary for March",
    "Create a fraud report for leadership",
    "Export claims data for audit review",
    "Compare quarterly performance metrics",
  ],
  "/app/settings": [
    "What AI thresholds should I configure?",
    "How do I set up automated approvals?",
    "Explain the fraud score weightings",
    "Help me configure notification rules",
  ],
  "/app/intake": [
    "What documents are required for an auto claim?",
    "How long does claim processing take?",
    "What information do I need from the claimant?",
    "Flag high-risk intake indicators",
  ],
};

const defaultSuggestions = [
  "Give me a daily briefing",
  "Show critical alerts",
  "How can AI help me today?",
  "Explain the claims workflow",
];

function generateResponse(
  input: string,
  location: string
): Omit<Message, "id" | "role" | "timestamp"> {
  const q = input.toLowerCase();

  if (q.includes("briefing") || q.includes("summary") || q.includes("today")) {
    return {
      content: `Good day! Here's your **AI Daily Briefing** for today:\n\n📊 **Claims Overview**\nYou have **342 active claims**, with 89 pending review and 24 settled today — a 24.8% increase over yesterday.\n\n⚠️ **Urgent Items**\n• Claim CLM-2024-001847 (James Patterson) — Critical fraud flags detected. SIU review recommended.\n• Claim CLM-2024-001785 (David Thompson) — Social media inconsistency confirmed by fraud team.\n\n🤖 **AI Recommendations**\n• 47 low-risk travel claims are eligible for automated settlement, saving ~18 adjuster hours.\n• Settlement time dropped to 4.2 days avg — 42% faster than 6 weeks ago!\n\nWould you like me to prioritize your work queue or auto-settle the eligible claims?`,
      suggestions: [
        "Prioritize my work queue",
        "Auto-settle eligible claims",
        "Show fraud alerts",
      ],
    };
  }

  if (q.includes("urgent") || q.includes("attention") || q.includes("critical") || q.includes("priority")) {
    const criticalClaims = claims.filter((c) => c.riskLevel === "Critical" || c.riskScore > 70);
    return {
      content: `I've identified **${criticalClaims.length} high-priority claims** requiring your immediate attention:`,
      cards: criticalClaims.map((c) => ({
        title: c.claimNumber,
        value: `${c.claimant} — $${c.amount.toLocaleString()}`,
        badge: `Risk Score: ${c.riskScore}`,
        color: c.riskLevel === "Critical" ? "var(--destructive)" : "var(--warning)",
        action: `/app/claims/${c.id}`,
      })),
      suggestions: [
        "Review CLM-2024-001847",
        "Escalate to SIU team",
        "Schedule investigation",
      ],
    };
  }

  if (q.includes("fraud") && (q.includes("detect") || q.includes("ring") || q.includes("miami") || q.includes("pattern"))) {
    return {
      content: `🔍 **Fraud Ring Analysis — Miami Region**\n\nOur AI has detected a **coordinated fraud ring** involving 3 claims with the following patterns:\n\n**Indicators:**\n• Linked IP addresses across all 3 submissions (same VPN subnet)\n• Near-identical damage patterns described (parking lot rear-end)\n• Policy inception dates all within 45 days of claims\n• Same body repair shop quoted on all claims\n\n**Estimated Fraud Value:** $127,400\n\n**AI Confidence:** 94% fraud probability\n\n**Recommended Actions:**\n1. Refer all 3 claims to SIU immediately\n2. Place 90-day hold on payouts\n3. Notify law enforcement liaison\n4. Cross-check policy underwriting records\n\nShall I generate the full SIU referral report?`,
      suggestions: [
        "Generate SIU referral",
        "View all 3 claims",
        "Add to fraud watchlist",
        "Notify law enforcement",
      ],
    };
  }

  if (q.includes("fraud") && (q.includes("indicator") || q.includes("watch") || q.includes("check"))) {
    return {
      content: `📋 **Key Fraud Indicators to Watch**\n\nOur AI monitors **47 fraud signals**. Here are the top indicators currently flagging:\n\n🔴 **High Alert**\n• Policy inception < 30 days before claim\n• Multiple claims in 12 months (same claimant)\n• Attorney-represented high-value claims with limited evidence\n\n🟡 **Medium Alert**\n• Whiplash/soft-tissue injuries without initial medical records\n• Hit-and-run with no witnesses or camera evidence\n• Items added to policy schedule within 7 days of claim\n\n🟢 **Standard Monitoring**\n• Claim submitted on weekends/holidays\n• Round-dollar claim amounts\n• Geographic clustering of similar claims\n\n💡 **Pro Tip:** Enable the AI Social Media Scanner for automated inconsistency detection on liability claims over $50K.`,
      suggestions: [
        "Enable social media scanner",
        "View all fraud flags",
        "Adjust fraud thresholds",
      ],
    };
  }

  if (q.includes("settlement") || q.includes("settle") || q.includes("time") || q.includes("speed")) {
    return {
      content: `⚡ **Settlement Performance Analysis**\n\nYour team has made **exceptional progress** this cycle:\n\n📈 **Current Status**\n• Average settlement time: **4.2 days** (down from 7.2 days, 6 weeks ago)\n• This represents a **42% improvement** in processing speed\n• 24 claims settled today — a 24.8% increase over yesterday\n\n🤖 **AI Contributions**\n• Automated document extraction saved 3.2 hrs per claim\n• AI triage reduced mis-categorization by 89%\n• Auto-approval for low-risk claims processed 128 claims this month\n\n💡 **Next Opportunity**\nIf we enable auto-approval for travel claims under $5K, we could settle **47 additional claims** automatically this week, saving an estimated **18 adjuster hours**.`,
      suggestions: [
        "Enable travel auto-approval",
        "View settlement trends",
        "Compare to industry benchmark",
      ],
    };
  }

  if (q.includes("auto") || q.includes("automat") || q.includes("approve") || q.includes("eligible")) {
    const eligible = claims.filter((c) => c.riskScore < 20 && c.status === "Pending Approval");
    return {
      content: `🤖 **Auto-Settlement Eligibility Review**\n\nI've scanned your pending claims and found **${eligible.length > 0 ? eligible.length : "47"} claims** eligible for automated settlement:\n\n✅ **Eligibility Criteria Met:**\n• Risk score < 20 (low fraud probability)\n• All documents verified by AI OCR\n• Claim amount within policy limits\n• No active fraud flags\n\n**Estimated savings:** 18 adjuster hours\n**Total payout if approved:** ~$196,400\n\n⚡ These claims can be settled in **minutes** with one-click batch approval. Your manager approval threshold is currently set to $25,000.\n\nShall I proceed with the batch settlement, or would you like to review each claim first?`,
      suggestions: [
        "Review each claim first",
        "Proceed with batch settlement",
        "Adjust approval threshold",
      ],
    };
  }

  if (q.includes("clm-2024-001847") || q.includes("patterson") || q.includes("james")) {
    const claim = claims.find((c) => c.claimant === "James Patterson");
    return {
      content: `🔍 **Claim Analysis: ${claim?.claimNumber ?? "CLM-2024-001847"}**\n\n**Claimant:** James Patterson\n**Type:** Auto | **Amount:** $45,200\n**Risk Score:** 78/100 (High)\n\n⚠️ **AI Fraud Assessment:**\n${claim?.fraudFlags.map((f) => `• ${f}`).join("\n") ?? "Multiple flags detected"}\n\n📋 **AI Recommendation:**\nThis claim has a **78% fraud probability**. The policy was issued only 28 days before the incident, and the claimant has 2 prior claims in 12 months. I strongly recommend:\n\n1. Request independent vehicle inspection\n2. Pull claimant's full claim history across all insurers\n3. Contact police department to verify report #2024-11847\n4. Delay any payout pending full investigation\n\n**Estimated investigation time:** 5-7 business days`,
      suggestions: [
        "Open claim detail",
        "Assign to SIU",
        "Request inspection",
        "View full claim history",
      ],
    };
  }

  if (q.includes("checklist") || q.includes("investigate") || q.includes("steps") || q.includes("workflow")) {
    return {
      content: `📋 **Fraud Investigation Checklist**\n\nHere's your AI-generated investigation workflow:\n\n**Phase 1: Initial Review (Day 1)**\n☐ Verify claimant identity and policy status\n☐ Cross-reference prior claims database\n☐ Validate incident date vs. policy inception\n☐ Run AI fraud score analysis\n\n**Phase 2: Documentation (Days 1-3)**\n☐ Request police/incident reports\n☐ Order independent damage assessment\n☐ Collect all medical records (if applicable)\n☐ AI OCR verification of all documents\n\n**Phase 3: Investigation (Days 3-7)**\n☐ Social media scan for inconsistencies\n☐ Contact witnesses or third parties\n☐ Verify repair shop credentials\n☐ Run IP/device analysis on submission\n\n**Phase 4: Decision (Day 7+)**\n☐ SIU review meeting\n☐ Legal team notification if warranted\n☐ Document final determination\n☐ Update fraud registry if confirmed`,
      suggestions: [
        "Download as PDF",
        "Assign to investigator",
        "Set reminder for Day 3",
      ],
    };
  }

  if (q.includes("document") || q.includes("required") || q.includes("need")) {
    return {
      content: `📄 **Required Documents by Claim Type**\n\n🚗 **Auto Claims**\n• Police report (if applicable)\n• Photos of all vehicle damage\n• Repair estimate from certified shop\n• Driver's license and registration\n• Insurance declaration page\n\n🏠 **Property Claims**\n• Photos/video of damage\n• Fire/police department report\n• Contractor repair estimate (2 minimum)\n• Proof of ownership for claimed items\n• Previous inspection records\n\n🏥 **Health Claims**\n• Hospital/clinic medical records\n• Itemized billing statement\n• Doctor's notes and diagnosis\n• Prescription records\n• Employer incident report (workplace)\n\n✈️ **Travel Claims**\n• Cancellation confirmation\n• Receipts for additional expenses\n• Weather/delay documentation\n• Airline/hotel correspondence\n\n💡 **AI Tip:** Our OCR system auto-extracts data from PDFs — just ensure documents are high-quality scans.`,
      suggestions: [
        "Start new claim intake",
        "Upload documents",
        "Check document status",
      ],
    };
  }

  if (q.includes("forecast") || q.includes("predict") || q.includes("next month") || q.includes("trend")) {
    return {
      content: `📈 **AI Claims Forecast — April 2024**\n\nBased on 6-month trend analysis and seasonal patterns:\n\n**Volume Prediction:** 340-360 claims\n(+9-15% vs. March, driven by spring auto incidents)\n\n**Risk Distribution Forecast:**\n• Low Risk: 47% (↑ from 48% — slight increase in auto)\n• Medium Risk: 34% (stable)\n• High Risk: 15% (↑ from 14%)\n• Critical: 4% (stable)\n\n**Settlement Speed:** 3.8-4.0 days avg\n(Continued AI efficiency gains)\n\n**Fraud Prediction:** 26-29 cases\n(↑ from 24 — seasonal increase typical)\n\n**Staffing Recommendation:**\nConsider assigning 1 additional fraud analyst for the April surge. AI automation will absorb ~35% of volume increase.\n\n🎯 **Confidence Level:** 87%`,
      suggestions: [
        "View detailed forecast",
        "Adjust staffing plan",
        "Set April targets",
      ],
    };
  }

  if (q.includes("adjuster") || q.includes("team") || q.includes("performance") || q.includes("productivity")) {
    return {
      content: `👥 **Team Performance Analysis**\n\n**Top Performer This Month:**\n🏆 Jennifer Kim — 55/61 claims resolved (90.2% rate)\n\n**Full Team Overview:**\n• Sarah Mitchell — 38/47 resolved (80.9%) ⚡ Your account\n• Michael Torres — 44/52 resolved (84.6%)\n• Jennifer Kim — 55/61 resolved (90.2%) 🏆\n• Ahmed Hassan — 35/41 resolved (85.4%)\n• David Chen — 28/33 resolved (84.8%)\n\n**AI Insights:**\n• Team avg resolution rate: 84.4% (+12% vs. last quarter)\n• Automated AI triage saved each adjuster ~8 hours/week\n• Fraud detection workload reduced by 61% due to AI pre-screening\n\n💡 **Recommendation:** Share Jennifer Kim's workflow practices — her claim note templates and document checklist have contributed to her high efficiency.`,
      suggestions: [
        "Share best practices",
        "View individual details",
        "Schedule team review",
      ],
    };
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("help") || q.includes("what can")) {
    return {
      content: `👋 **Hello! I'm your ClaimAI Assistant.**\n\nI'm powered by advanced AI trained on insurance claims data. Here's what I can help you with:\n\n🔍 **Claim Analysis**\nAnalyze specific claims, detect fraud patterns, and recommend actions\n\n📊 **Insights & Reporting**\nSummarize performance metrics, generate reports, and forecast trends\n\n⚡ **Automation**\nIdentify claims eligible for auto-settlement, batch process low-risk claims\n\n📋 **Guidance**\nWalk you through investigation workflows, document requirements, and best practices\n\n🛡️ **Fraud Detection**\nExplain fraud indicators, analyze patterns, and recommend escalation steps\n\nJust ask me anything about your claims — I'm here to help!`,
      suggestions: [
        "Give me a daily briefing",
        "Show urgent claims",
        "Explain fraud indicators",
        "How do I process a claim?",
      ],
    };
  }

  if (q.includes("report") || q.includes("executive") || q.includes("export")) {
    return {
      content: `📊 **Report Generation**\n\nI can generate the following reports instantly:\n\n**Executive Reports**\n• Monthly Claims Summary (PDF/Excel)\n• Fraud Detection ROI Report\n• Settlement Performance Dashboard\n• AI Automation Impact Report\n\n**Operational Reports**\n• Claims Aging Report (overdue claims)\n• Adjuster Productivity Report\n• Document Processing Status\n• Risk Distribution Analysis\n\n**Compliance Reports**\n• SIU Referral Log\n• Regulatory Filing Summary\n• Audit Trail Export\n\n💡 Which report would you like me to prepare? I can have it ready for download in approximately 30 seconds.`,
      suggestions: [
        "Generate executive summary",
        "Create fraud ROI report",
        "Export claims for audit",
        "Monthly performance report",
      ],
    };
  }

  // Default response
  return {
    content: `I understand you're asking about: **"${input}"**\n\nLet me help you with that. Based on your current context in the ClaimAI platform, here are some relevant insights:\n\n• Your team currently has **342 active claims** across all categories\n• **47 fraud cases** have been detected this month by AI\n• Average settlement time is at an all-time low of **4.2 days**\n• AI automation has saved **$1.24M** in operational costs this year\n\nCould you be more specific about what you'd like to know? I can analyze individual claims, explain workflows, detect patterns, or generate reports.`,
    suggestions: [
      "Show active claims",
      "Analyze fraud patterns",
      "Generate a report",
      "Prioritize my workload",
    ],
  };
}

export function AIAssistant({ open, onClose }: AIAssistantProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      timestamp: new Date(),
      content:
        "👋 Hello! I'm your **ClaimAI Assistant** — powered by advanced AI trained on insurance claims data.\n\nI can help you analyze claims, detect fraud patterns, generate reports, automate approvals, and guide you through complex workflows.\n\nWhat can I help you with today?",
      suggestions: [
        "Give me a daily briefing",
        "Show urgent claims",
        "Detect fraud patterns",
        "How can AI help me?",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentSuggestions =
    contextSuggestions[location.pathname] ?? defaultSuggestions;

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    const delay = 800 + Math.random() * 800;
    await new Promise((r) => setTimeout(r, delay));

    const response = generateResponse(text, location.pathname);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      timestamp: new Date(),
      ...response,
    };
    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const boldLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return (
        <span key={i} className="block" style={{ minHeight: line === "" ? "8px" : undefined }}>
          <span dangerouslySetInnerHTML={{ __html: boldLine }} />
        </span>
      );
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "color-mix(in srgb, var(--foreground) 30%, transparent)", backdropFilter: "blur(2px)" }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
            style={{
              width: 420,
              background: "var(--card)",
              boxShadow: "-8px 0 40px color-mix(in srgb, var(--foreground) 12%, transparent)",
              borderLeft: "1px solid var(--border)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{
                background: "var(--sidebar)",
                borderBottom: "1px solid color-mix(in srgb, var(--card) 8%, transparent)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--violet)",
                  }}
                >
                  <Sparkles size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground text-sm" style={{ fontWeight: "var(--font-weight-medium)" }}>
                    ClaimAI Assistant
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="rounded-full"
                      style={{ width: 6, height: 6, background: "var(--success)" }}
                    />
                    <p className="text-xs" style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }}>
                      AI Online · GPT-4 Powered
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessages([{
                    id: "welcome",
                    role: "assistant",
                    timestamp: new Date(),
                    content: "Chat cleared. How can I help you?",
                    suggestions: defaultSuggestions,
                  }])}
                  className="flex items-center justify-center rounded-lg transition-colors hover:bg-card/10"
                  style={{ width: 32, height: 32 }}
                  title="Clear chat"
                >
                  <RefreshCw size={14} style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }} />
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center rounded-lg transition-colors hover:bg-card/10"
                  style={{ width: 32, height: 32 }}
                >
                  <X size={16} style={{ color: "color-mix(in srgb, var(--sidebar-foreground) 65%, transparent)" }} />
                </button>
              </div>
            </div>

            {/* Context Bar */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
              style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--border)" }}
            >
              <Lightbulb size={12} style={{ color: "var(--warning)" }} />
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Contextual suggestions for{" "}
                <span style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>
                  {location.pathname.replace("/app/", "").replace("/", " › ") || "Dashboard"}
                </span>
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {/* Avatar */}
                  <div
                    className="flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{
                      width: 32,
                      height: 32,
                      background:
                        msg.role === "assistant"
                          ? "var(--violet)"
                          : "var(--success)",
                      alignSelf: "flex-start",
                      marginTop: 2,
                    }}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={16} className="text-primary-foreground" />
                    ) : (
                      <User size={16} className="text-primary-foreground" />
                    )}
                  </div>

                  <div className={`flex-1 min-w-0 ${msg.role === "user" ? "flex flex-col items-end" : ""}`}>
                    {/* Bubble */}
                    <div
                      className="rounded-2xl px-4 py-3 text-xs leading-relaxed"
                      style={
                        msg.role === "user"
                          ? {
                              background: "var(--primary)",
                              color: "var(--primary-foreground)",
                              maxWidth: "85%",
                              borderBottomRightRadius: 4,
                            }
                          : {
                              background: "var(--surface-container)",
                              color: "var(--foreground)",
                              borderBottomLeftRadius: 4,
                            }
                      }
                    >
                      {formatContent(msg.content)}
                    </div>

                    {/* Action Cards */}
                    {msg.cards && msg.cards.length > 0 && (
                      <div className="mt-2 space-y-2 w-full">
                        {msg.cards.map((card, i) => (
                          <button
                            key={i}
                            onClick={() => card.action && navigate(card.action)}
                            className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all hover:shadow-sm"
                            style={{
                              background: "var(--card)",
                              border: `1px solid color-mix(in srgb, ${card.color ?? "var(--border)"} 13%, transparent)`,
                              borderLeft: `3px solid ${card.color ?? "var(--primary)"}`,
                            }}
                          >
                            <div>
                              <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>
                                {card.title}
                              </p>
                              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                                {card.value}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {card.badge && (
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{
                                    background: `color-mix(in srgb, ${card.color ?? "var(--primary)"} 8%, transparent)`,
                                    color: card.color ?? "var(--primary)",
                                    fontWeight: "var(--font-weight-medium)",
                                  }}
                                >
                                  {card.badge}
                                </span>
                              )}
                              <ChevronRight size={12} style={{ color: "var(--outline)" }} />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Suggestions */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => sendMessage(s)}
                            className="text-xs rounded-full px-3 py-1.5 transition-all hover:shadow-sm active:scale-95"
                            style={{
                              background: "var(--accent)",
                              color: "var(--primary)",
                              border: "1px solid var(--primary-container)",
                              fontWeight: "var(--font-weight-medium)",
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <p className="text-xs mt-1 px-1" style={{ color: "var(--outline)" }}>
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div
                    className="flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{
                      width: 32,
                      height: 32,
                      background: "var(--violet)",
                      alignSelf: "flex-start",
                      marginTop: 2,
                    }}
                  >
                    <Bot size={16} className="text-primary-foreground" />
                  </div>
                  <div
                    className="flex items-center gap-1.5 rounded-2xl px-4 py-3"
                    style={{ background: "var(--surface-container)", borderBottomLeftRadius: 4 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="rounded-full"
                        style={{ width: 6, height: 6, background: "var(--outline)" }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div
              className="px-4 py-3 flex-shrink-0"
              style={{ borderTop: "1px solid var(--surface-container)", background: "var(--surface-container-low)" }}
            >
              <p className="text-xs mb-2" style={{ color: "var(--outline)", fontWeight: "var(--font-weight-medium)" }}>
                QUICK ACTIONS
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {currentSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    className="text-left text-xs rounded-lg px-3 py-2 transition-all hover:bg-accent hover:border-primary-container active:scale-95"
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      color: "var(--on-surface-variant)",
                      lineHeight: 1.4,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-3 px-4 py-4 flex-shrink-0"
              style={{ borderTop: "1px solid var(--border)", background: "var(--card)" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about claims..."
                className="flex-1 rounded-xl px-4 text-sm outline-none transition-all"
                style={{
                  height: 40,
                  background: "var(--surface-container)",
                  border: "1.5px solid var(--border)",
                  color: "var(--foreground)",
                  fontSize: "var(--fs-body-sm)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="flex items-center justify-center rounded-xl transition-all active:scale-95"
                style={{
                  width: 40,
                  height: 40,
                  background:
                    !input.trim() || isTyping
                      ? "var(--border)"
                      : "var(--primary)",
                  flexShrink: 0,
                }}
              >
                <Send
                  size={16}
                  style={{ color: !input.trim() || isTyping ? "var(--outline)" : "var(--primary-foreground)" }}
                />
              </button>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-center gap-1.5 py-2 flex-shrink-0"
              style={{ background: "var(--surface-container-low)", borderTop: "1px solid var(--surface-container)" }}
            >
              <Zap size={10} style={{ color: "var(--outline)" }} />
              <p style={{ color: "var(--outline)", fontSize: "var(--fs-label-sm)" }}>
                ClaimAI · Powered by GPT-4 · Responses are AI-generated suggestions
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}