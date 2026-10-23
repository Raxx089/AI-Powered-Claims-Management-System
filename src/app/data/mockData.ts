// Mock Data for AI-Powered Claims Management Platform

export const currentUser = {
  id: "usr_001",
  name: "Sarah Mitchell",
  email: "sarah.mitchell@insurecorp.com",
  role: "Claims Adjuster",
  avatar: "SM",
  department: "Property Claims",
  joined: "2022-03-15",
};

export const workspaces = [
  {
    id: "ws_001",
    name: "InsureCorp Global",
    plan: "Enterprise",
    members: 248,
    claimsThisMonth: 1847,
    logo: "IC",
    color: "var(--primary)",
    lastAccessed: "2 hours ago",
    industry: "Property & Casualty",
    region: "North America",
    aiAccuracy: 94,
    avgSettlement: 4.2,
    openClaims: 342,
    fraudSaved: 680000,
    settlementRate: 87,
    status: "active" as const,
  },
  {
    id: "ws_002",
    name: "Pacific Shield Insurance",
    plan: "Professional",
    members: 87,
    claimsThisMonth: 432,
    logo: "PS",
    color: "var(--violet)",
    lastAccessed: "Yesterday",
    industry: "Auto & Life",
    region: "West Coast",
    aiAccuracy: 88,
    avgSettlement: 5.8,
    openClaims: 98,
    fraudSaved: 142000,
    settlementRate: 81,
    status: "active" as const,
  },
  {
    id: "ws_003",
    name: "Atlas Risk Partners",
    plan: "Professional",
    members: 124,
    claimsThisMonth: 689,
    logo: "AR",
    color: "var(--success)",
    lastAccessed: "3 days ago",
    industry: "Commercial & Liability",
    region: "Southeast",
    aiAccuracy: 91,
    avgSettlement: 5.1,
    openClaims: 176,
    fraudSaved: 310000,
    settlementRate: 84,
    status: "active" as const,
  },
];

export const workspaceActivity: Record<string, Array<{ id: string; event: string; user: string; time: string; type: string }>> = {
  ws_001: [
    { id: "a1", event: "CLM-2024-001847 flagged for fraud", user: "AI System", time: "2 min ago", type: "fraud" },
    { id: "a2", event: "47 low-risk claims auto-settled", user: "AI System", time: "18 min ago", type: "ai" },
    { id: "a3", event: "Sarah Mitchell approved CLM-001832", user: "Sarah Mitchell", time: "1 hr ago", type: "approved" },
    { id: "a4", event: "New batch of 12 claims ingested", user: "System", time: "2 hrs ago", type: "submitted" },
    { id: "a5", event: "Monthly analytics report generated", user: "System", time: "3 hrs ago", type: "document" },
  ],
  ws_002: [
    { id: "a1", event: "CLM-PS-00423 settled for $18,400", user: "Michael Torres", time: "35 min ago", type: "settled" },
    { id: "a2", event: "New fraud pattern detected — Auto ring", user: "AI System", time: "2 hrs ago", type: "fraud" },
    { id: "a3", event: "5 new claims submitted via portal", user: "System", time: "4 hrs ago", type: "submitted" },
    { id: "a4", event: "Jennifer Kim reviewed 8 claims", user: "Jennifer Kim", time: "5 hrs ago", type: "reviewed" },
  ],
  ws_003: [
    { id: "a1", event: "Liability claim CLM-AR-00289 escalated", user: "AI System", time: "1 hr ago", type: "fraud" },
    { id: "a2", event: "14 documents processed by OCR", user: "AI System", time: "3 hrs ago", type: "document" },
    { id: "a3", event: "CLM-AR-00281 approved for $42,000", user: "David Chen", time: "5 hrs ago", type: "approved" },
    { id: "a4", event: "Q1 performance review completed", user: "Lisa Park", time: "1 day ago", type: "ai" },
  ],
};

export const workspaceTeams: Record<string, Array<{ name: string; avatar: string; role: string; status: string; claims: number }>> = {
  ws_001: [
    { name: "Sarah Mitchell", avatar: "SM", role: "Claims Adjuster", status: "online", claims: 47 },
    { name: "Michael Torres", avatar: "MT", role: "Claims Adjuster", status: "online", claims: 52 },
    { name: "Jennifer Kim", avatar: "JK", role: "Senior Adjuster", status: "away", claims: 61 },
    { name: "David Chen", avatar: "DC", role: "Fraud Analyst", status: "online", claims: 33 },
    { name: "Lisa Park", avatar: "LP", role: "Ops Manager", status: "offline", claims: 0 },
    { name: "Ahmed Hassan", avatar: "AH", role: "Claims Adjuster", status: "online", claims: 41 },
  ],
  ws_002: [
    { name: "Rachel Nguyen", avatar: "RN", role: "Senior Adjuster", status: "online", claims: 38 },
    { name: "Tom Bradley", avatar: "TB", role: "Claims Adjuster", status: "online", claims: 29 },
    { name: "Priya Sharma", avatar: "PS", role: "Fraud Analyst", status: "away", claims: 21 },
    { name: "Carlos Reyes", avatar: "CR", role: "Claims Adjuster", status: "offline", claims: 17 },
  ],
  ws_003: [
    { name: "Nina Wallace", avatar: "NW", role: "Operations Manager", status: "online", claims: 0 },
    { name: "James Park", avatar: "JP", role: "Senior Adjuster", status: "online", claims: 44 },
    { name: "Aisha Thompson", avatar: "AT", role: "Fraud Analyst", status: "online", claims: 31 },
    { name: "Marco Silva", avatar: "MS", role: "Claims Adjuster", status: "away", claims: 26 },
    { name: "Elena Kovacs", avatar: "EK", role: "Claims Adjuster", status: "offline", claims: 22 },
  ],
};

export type ClaimStatus = "New" | "Under Review" | "Investigation" | "Pending Approval" | "Approved" | "Rejected" | "Settled" | "Closed";
export type ClaimType = "Auto" | "Property" | "Health" | "Life" | "Liability" | "Travel";
export type RiskLevel = "Low" | "Medium" | "High" | "Critical";
export type ClaimPriority = "Urgent" | "High" | "Normal" | "Low";
export type AIAction = "Approve" | "Reject" | "Investigate" | "Review";

export interface Claim {
  id: string;
  claimNumber: string;
  type: ClaimType;
  claimant: string;
  email: string;
  phone: string;
  dateSubmitted: string;
  dateUpdated: string;
  status: ClaimStatus;
  riskLevel: RiskLevel;
  riskScore: number;
  amount: number;
  assignedTo: string;
  description: string;
  fraudFlags: string[];
  aiSummary: string;
  documents: DocumentItem[];
  timeline: TimelineEvent[];
  notes: string;
  policyNumber: string;
  location: string;
  incidentDate: string;
  aiConfidence: number;
  priority: ClaimPriority;
  slaDeadline: string;
  aiSuggestedAction: AIAction;
  workflowStage: string;
  aiReasoningTags: string[];
}

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: "Processing" | "Verified" | "Rejected" | "Pending Review";
  extractedData?: Record<string, string>;
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  event: string;
  user: string;
  type: "submitted" | "reviewed" | "document" | "ai" | "approved" | "rejected" | "comment" | "settled" | "payment";
  details?: string;
}

export const claims: Claim[] = [
  {
    id: "clm_001",
    claimNumber: "CLM-2024-001847",
    type: "Auto",
    claimant: "James Patterson",
    email: "james.patterson@email.com",
    phone: "+1 (555) 234-5678",
    dateSubmitted: "2024-03-18",
    dateUpdated: "2024-03-20",
    status: "Investigation",
    riskLevel: "High",
    riskScore: 78,
    amount: 45200,
    assignedTo: "Sarah Mitchell",
    description: "Collision at intersection on Highway 101. Multiple vehicles involved. Claimant reports total loss.",
    fraudFlags: ["Duplicate policy detected", "Claim submitted within 30 days of policy start", "Multiple claims in 12 months"],
    aiSummary: "High-risk claim flagged for potential fraud. Policy was issued 28 days before incident. Claimant has 2 prior claims in the past 12 months. Recommend thorough investigation before approval.",
    policyNumber: "POL-2024-88432",
    location: "San Francisco, CA",
    incidentDate: "2024-03-17",
    notes: "Awaiting police report and witness statements",
    aiConfidence: 78,
    priority: "Urgent",
    slaDeadline: "2024-03-25",
    aiSuggestedAction: "Investigate",
    workflowStage: "Adjuster Review",
    aiReasoningTags: ["Policy age 28 days", "2 prior claims", "Duplicate policy detected", "High-value auto claim", "Filed day of incident"],
    documents: [
      { id: "doc_001", name: "Police Report #2024-11847.pdf", type: "PDF", size: "2.4 MB", uploadedAt: "2024-03-18", status: "Verified", extractedData: { "Incident Date": "March 17, 2024", "Location": "Hwy 101 & Oak St", "Officer ID": "Badge #4421", "Vehicles": "2 involved", "Fault": "Under investigation" } },
      { id: "doc_002", name: "Vehicle Damage Photos.zip", type: "ZIP", size: "18.7 MB", uploadedAt: "2024-03-18", status: "Verified" },
      { id: "doc_003", name: "Repair Estimate - AutoFix Pro.pdf", type: "PDF", size: "1.1 MB", uploadedAt: "2024-03-19", status: "Processing", extractedData: { "Repair Cost": "$45,200", "Labor": "$8,400", "Parts": "$36,800", "Shop": "AutoFix Pro" } },
      { id: "doc_004", name: "Driver License Copy.jpg", type: "JPG", size: "340 KB", uploadedAt: "2024-03-18", status: "Verified" },
    ],
    timeline: [
      { id: "t1", date: "Mar 18", time: "09:12 AM", event: "Claim submitted by claimant", user: "James Patterson", type: "submitted" },
      { id: "t2", date: "Mar 18", time: "09:15 AM", event: "AI classification complete — Auto, High Risk", user: "AI System", type: "ai", details: "Risk score: 78/100. Fraud indicators detected." },
      { id: "t3", date: "Mar 18", time: "09:20 AM", event: "Documents uploaded (4 files)", user: "James Patterson", type: "document" },
      { id: "t4", date: "Mar 18", time: "10:05 AM", event: "Assigned to Sarah Mitchell", user: "System", type: "reviewed" },
      { id: "t5", date: "Mar 19", time: "02:30 PM", event: "Repair estimate added", user: "James Patterson", type: "document" },
      { id: "t6", date: "Mar 20", time: "11:00 AM", event: "Fraud investigation initiated", user: "Sarah Mitchell", type: "reviewed", details: "Multiple risk flags require investigation before proceeding." },
    ],
  },
  {
    id: "clm_002",
    claimNumber: "CLM-2024-001832",
    type: "Property",
    claimant: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "+1 (555) 345-6789",
    dateSubmitted: "2024-03-17",
    dateUpdated: "2024-03-21",
    status: "Pending Approval",
    riskLevel: "Low",
    riskScore: 18,
    amount: 12400,
    assignedTo: "Michael Torres",
    description: "Kitchen fire caused damage to cabinets, appliances, and ceiling. Fire department report attached.",
    fraudFlags: [],
    aiSummary: "Low-risk property claim. All documents verified and consistent with reported incident. Recommended for approval. Estimated settlement: $12,400.",
    policyNumber: "POL-2023-44291",
    location: "Austin, TX",
    incidentDate: "2024-03-15",
    notes: "All documentation complete. Ready for manager approval.",
    aiConfidence: 95,
    priority: "Normal",
    slaDeadline: "2024-03-28",
    aiSuggestedAction: "Approve",
    workflowStage: "Pending Approval",
    aiReasoningTags: ["All docs verified", "No fraud flags", "Policy in good standing", "Fire dept. report confirmed", "Consistent claim history"],
    documents: [
      { id: "doc_005", name: "Fire Department Report.pdf", type: "PDF", size: "1.8 MB", uploadedAt: "2024-03-17", status: "Verified", extractedData: { "Incident": "Kitchen fire", "Date": "March 15, 2024", "Cause": "Electrical fault", "Damage Level": "Moderate" } },
      { id: "doc_006", name: "Property Damage Assessment.pdf", type: "PDF", size: "3.2 MB", uploadedAt: "2024-03-18", status: "Verified" },
      { id: "doc_007", name: "Contractor Repair Quote.pdf", type: "PDF", size: "980 KB", uploadedAt: "2024-03-19", status: "Verified", extractedData: { "Total Quote": "$12,400", "Contractor": "FixRight LLC", "Timeline": "2 weeks", "Materials": "$7,200" } },
    ],
    timeline: [
      { id: "t1", date: "Mar 17", time: "08:45 AM", event: "Claim submitted", user: "Emily Chen", type: "submitted" },
      { id: "t2", date: "Mar 17", time: "08:47 AM", event: "AI classification complete — Property, Low Risk", user: "AI System", type: "ai" },
      { id: "t3", date: "Mar 18", time: "03:15 PM", event: "Assessment report submitted", user: "Emily Chen", type: "document" },
      { id: "t4", date: "Mar 21", time: "10:00 AM", event: "Submitted for manager approval", user: "Michael Torres", type: "reviewed" },
    ],
  },
  {
    id: "clm_003",
    claimNumber: "CLM-2024-001819",
    type: "Health",
    claimant: "Robert Williams",
    email: "r.williams@email.com",
    phone: "+1 (555) 456-7890",
    dateSubmitted: "2024-03-16",
    dateUpdated: "2024-03-22",
    status: "Approved",
    riskLevel: "Low",
    riskScore: 12,
    amount: 8750,
    assignedTo: "Sarah Mitchell",
    description: "Emergency surgery following workplace accident. Hospital bills and rehabilitation costs.",
    fraudFlags: [],
    aiSummary: "Straightforward health claim with verified medical documentation. All records consistent. Recommend immediate approval.",
    policyNumber: "POL-2023-77123",
    location: "Chicago, IL",
    incidentDate: "2024-03-14",
    notes: "Approved. Payment processing.",
    aiConfidence: 98,
    priority: "Low",
    slaDeadline: "2024-03-30",
    aiSuggestedAction: "Approve",
    workflowStage: "Settlement",
    aiReasoningTags: ["Medical records verified", "Workplace incident confirmed", "Policy covers emergency surgery", "Clean claim history"],
    documents: [
      { id: "doc_008", name: "Hospital Medical Records.pdf", type: "PDF", size: "4.1 MB", uploadedAt: "2024-03-16", status: "Verified" },
      { id: "doc_009", name: "Surgery Bill.pdf", type: "PDF", size: "890 KB", uploadedAt: "2024-03-16", status: "Verified" },
    ],
    timeline: [
      { id: "t1", date: "Mar 16", time: "11:20 AM", event: "Claim submitted", user: "Robert Williams", type: "submitted" },
      { id: "t2", date: "Mar 16", time: "11:22 AM", event: "AI auto-approved (low risk)", user: "AI System", type: "ai" },
      { id: "t3", date: "Mar 22", time: "09:00 AM", event: "Claim approved", user: "Sarah Mitchell", type: "approved" },
    ],
  },
  {
    id: "clm_004",
    claimNumber: "CLM-2024-001798",
    type: "Auto",
    claimant: "Maria Garcia",
    email: "maria.garcia@email.com",
    phone: "+1 (555) 567-8901",
    dateSubmitted: "2024-03-14",
    dateUpdated: "2024-03-23",
    status: "Settled",
    riskLevel: "Medium",
    riskScore: 42,
    amount: 23600,
    assignedTo: "Jennifer Kim",
    description: "Rear-end collision on I-90. Vehicle requires significant repairs. Rental car requested.",
    fraudFlags: ["Whiplash injury reported without medical documentation"],
    aiSummary: "Medium-risk auto claim. Whiplash injury flagged without initial medical documentation. Documentation later submitted and verified. Settlement recommended at agreed amount.",
    policyNumber: "POL-2023-55812",
    location: "Seattle, WA",
    incidentDate: "2024-03-12",
    notes: "Settled. Payment of $23,600 issued.",
    aiConfidence: 82,
    priority: "Normal",
    slaDeadline: "2024-03-27",
    aiSuggestedAction: "Review",
    workflowStage: "Settled",
    aiReasoningTags: ["Whiplash flagged", "Late medical docs", "Vehicle damage consistent", "Fault established"],
    documents: [
      { id: "doc_010", name: "Accident Report.pdf", type: "PDF", size: "2.1 MB", uploadedAt: "2024-03-14", status: "Verified" },
      { id: "doc_011", name: "Medical Report - Whiplash.pdf", type: "PDF", size: "1.4 MB", uploadedAt: "2024-03-17", status: "Verified" },
      { id: "doc_012", name: "Vehicle Repair Invoice.pdf", type: "PDF", size: "760 KB", uploadedAt: "2024-03-18", status: "Verified" },
    ],
    timeline: [
      { id: "t1", date: "Mar 14", time: "02:30 PM", event: "Claim submitted", user: "Maria Garcia", type: "submitted" },
      { id: "t2", date: "Mar 14", time: "02:32 PM", event: "AI flagged: Missing medical documentation", user: "AI System", type: "ai" },
      { id: "t3", date: "Mar 17", time: "04:15 PM", event: "Medical documentation submitted", user: "Maria Garcia", type: "document" },
      { id: "t4", date: "Mar 21", time: "11:00 AM", event: "Claim approved", user: "Jennifer Kim", type: "approved" },
      { id: "t5", date: "Mar 23", time: "10:30 AM", event: "Settlement of $23,600 processed", user: "System", type: "settled" },
      { id: "t6", date: "Mar 23", time: "10:35 AM", event: "Payment sent to claimant", user: "System", type: "payment" },
    ],
  },
  {
    id: "clm_005",
    claimNumber: "CLM-2024-001785",
    type: "Liability",
    claimant: "David Thompson",
    email: "d.thompson@email.com",
    phone: "+1 (555) 678-9012",
    dateSubmitted: "2024-03-13",
    dateUpdated: "2024-03-20",
    status: "Under Review",
    riskLevel: "Critical",
    riskScore: 91,
    amount: 187000,
    assignedTo: "Sarah Mitchell",
    description: "Business liability claim for premises injury. Third-party claimant seeking damages for slip-and-fall.",
    fraudFlags: ["Attorney-represented claim", "High-value injury with limited evidence", "Prior claims by same attorney", "Social media inconsistency detected"],
    aiSummary: "Critical risk liability claim. Multiple red flags including prior fraudulent claims by representing attorney. Social media analysis shows claimant engaging in physical activities inconsistent with reported injuries. Strongly recommend full investigation.",
    policyNumber: "POL-2022-11904",
    location: "Miami, FL",
    incidentDate: "2024-03-10",
    notes: "Under SIU investigation. Legal team notified.",
    aiConfidence: 91,
    priority: "Urgent",
    slaDeadline: "2024-03-22",
    aiSuggestedAction: "Investigate",
    workflowStage: "SIU Investigation",
    aiReasoningTags: ["Attorney-represented", "4 fraud indicators", "Social media inconsistency", "Prior fraud attorney", "High-value limited evidence"],
    documents: [
      { id: "doc_013", name: "Attorney Letter of Representation.pdf", type: "PDF", size: "420 KB", uploadedAt: "2024-03-13", status: "Verified" },
      { id: "doc_014", name: "Incident Report.pdf", type: "PDF", size: "1.9 MB", uploadedAt: "2024-03-14", status: "Pending Review" },
      { id: "doc_015", name: "Medical Bills.pdf", type: "PDF", size: "3.8 MB", uploadedAt: "2024-03-15", status: "Pending Review" },
    ],
    timeline: [
      { id: "t1", date: "Mar 13", time: "03:45 PM", event: "Claim submitted via attorney", user: "Attorney Office", type: "submitted" },
      { id: "t2", date: "Mar 13", time: "03:47 PM", event: "AI flagged CRITICAL risk — 4 fraud indicators", user: "AI System", type: "ai", details: "Risk score 91/100. Immediate human review required." },
      { id: "t3", date: "Mar 14", time: "09:00 AM", event: "Escalated to SIU team", user: "System", type: "reviewed" },
      { id: "t4", date: "Mar 20", time: "02:15 PM", event: "Social media analysis completed", user: "Fraud Team", type: "ai", details: "3 posts show physical activities inconsistent with injury claim." },
    ],
  },
  {
    id: "clm_006",
    claimNumber: "CLM-2024-001773",
    type: "Travel",
    claimant: "Anna Kowalski",
    email: "anna.kowalski@email.com",
    phone: "+1 (555) 789-0123",
    dateSubmitted: "2024-03-12",
    dateUpdated: "2024-03-19",
    status: "Settled",
    riskLevel: "Low",
    riskScore: 8,
    amount: 4200,
    assignedTo: "Michael Torres",
    description: "Flight cancellation and hotel accommodation during severe weather event in NYC.",
    fraudFlags: [],
    aiSummary: "Very low risk travel claim. Weather event verified through public records. Hotel receipts and flight cancellation confirmed. Fast-track settlement recommended.",
    policyNumber: "POL-2024-22019",
    location: "New York, NY",
    incidentDate: "2024-03-08",
    notes: "Settled via fast-track. Payment processed.",
    aiConfidence: 99,
    priority: "Low",
    slaDeadline: "2024-03-22",
    aiSuggestedAction: "Approve",
    workflowStage: "Settled",
    aiReasoningTags: ["Weather event verified", "Receipts confirmed", "Policy covers cancellation", "Clean claim history"],
    documents: [
      { id: "doc_016", name: "Flight Cancellation Confirmation.pdf", type: "PDF", size: "230 KB", uploadedAt: "2024-03-12", status: "Verified" },
      { id: "doc_017", name: "Hotel Receipts.pdf", type: "PDF", size: "880 KB", uploadedAt: "2024-03-12", status: "Verified" },
    ],
    timeline: [
      { id: "t1", date: "Mar 12", time: "10:00 AM", event: "Claim submitted", user: "Anna Kowalski", type: "submitted" },
      { id: "t2", date: "Mar 12", time: "10:02 AM", event: "AI fast-tracked for settlement", user: "AI System", type: "ai" },
      { id: "t3", date: "Mar 19", time: "09:30 AM", event: "Settlement of $4,200 processed", user: "System", type: "settled" },
    ],
  },
  {
    id: "clm_007",
    claimNumber: "CLM-2024-001761",
    type: "Property",
    claimant: "Kevin Johnson",
    email: "k.johnson@email.com",
    phone: "+1 (555) 890-1234",
    dateSubmitted: "2024-03-11",
    dateUpdated: "2024-03-21",
    status: "Rejected",
    riskLevel: "High",
    riskScore: 72,
    amount: 34500,
    assignedTo: "Jennifer Kim",
    description: "Alleged burglary with theft of electronics and jewelry. No forced entry evidence.",
    fraudFlags: ["No forced entry evidence", "Items not on original policy schedule", "Claim filed after policy lapse notice"],
    aiSummary: "High risk claim. No evidence of forced entry. Claimed items were added to policy schedule just 3 days before incident. Claim filed 5 days after lapse notice issued. Recommend rejection.",
    policyNumber: "POL-2022-33741",
    location: "Las Vegas, NV",
    incidentDate: "2024-03-09",
    notes: "Rejected due to policy violations and insufficient evidence.",
    aiConfidence: 88,
    priority: "High",
    slaDeadline: "2024-03-24",
    aiSuggestedAction: "Reject",
    workflowStage: "Decision",
    aiReasoningTags: ["No forced entry", "Items added 3 days prior", "Post-lapse notice filing", "Policy schedule mismatch"],
    documents: [
      { id: "doc_018", name: "Police Report.pdf", type: "PDF", size: "1.5 MB", uploadedAt: "2024-03-11", status: "Verified" },
      { id: "doc_019", name: "Item List.pdf", type: "PDF", size: "340 KB", uploadedAt: "2024-03-11", status: "Rejected" },
    ],
    timeline: [
      { id: "t1", date: "Mar 11", time: "04:30 PM", event: "Claim submitted", user: "Kevin Johnson", type: "submitted" },
      { id: "t2", date: "Mar 11", time: "04:32 PM", event: "AI flagged: High risk, policy issues", user: "AI System", type: "ai" },
      { id: "t3", date: "Mar 21", time: "03:00 PM", event: "Claim rejected", user: "Jennifer Kim", type: "rejected", details: "Insufficient evidence, policy schedule discrepancies." },
    ],
  },
  {
    id: "clm_008",
    claimNumber: "CLM-2024-001749",
    type: "Auto",
    claimant: "Sophia Martinez",
    email: "sophia.m@email.com",
    phone: "+1 (555) 901-2345",
    dateSubmitted: "2024-03-10",
    dateUpdated: "2024-03-22",
    status: "Pending Approval",
    riskLevel: "Medium",
    riskScore: 35,
    amount: 15800,
    assignedTo: "Sarah Mitchell",
    description: "Hit and run incident in parking lot. Side panel and door damage.",
    fraudFlags: ["Limited witness evidence"],
    aiSummary: "Medium risk hit and run claim. Damage consistent with described incident. Security camera footage partially corroborates claim. Recommend approval with standard verification.",
    policyNumber: "POL-2023-66147",
    location: "Denver, CO",
    incidentDate: "2024-03-09",
    notes: "Security footage obtained. Review in progress.",
    aiConfidence: 74,
    priority: "Normal",
    slaDeadline: "2024-03-26",
    aiSuggestedAction: "Review",
    workflowStage: "Adjuster Review",
    aiReasoningTags: ["Partial CCTV corroboration", "Limited witnesses", "Damage pattern consistent", "Policy active and valid"],
    documents: [
      { id: "doc_020", name: "Damage Photos.zip", type: "ZIP", size: "22.1 MB", uploadedAt: "2024-03-10", status: "Verified" },
      { id: "doc_021", name: "Parking Lot Security Footage Note.pdf", type: "PDF", size: "210 KB", uploadedAt: "2024-03-14", status: "Verified" },
    ],
    timeline: [
      { id: "t1", date: "Mar 10", time: "08:15 AM", event: "Claim submitted", user: "Sophia Martinez", type: "submitted" },
      { id: "t2", date: "Mar 10", time: "08:17 AM", event: "AI classification: Auto, Medium Risk", user: "AI System", type: "ai" },
      { id: "t3", date: "Mar 22", time: "01:00 PM", event: "Submitted for approval", user: "Sarah Mitchell", type: "reviewed" },
    ],
  },
];

export const dashboardStats = {
  totalClaims: 1847,
  activeClaims: 342,
  pendingReview: 89,
  settledToday: 24,
  avgProcessingTime: "4.2 days",
  fraudDetected: 47,
  totalPayout: 8420000,
  costSavings: 1240000,
};

export const claimsOverTimeData = [
  { month: "Oct", submitted: 180, settled: 155, rejected: 18 },
  { month: "Nov", submitted: 210, settled: 180, rejected: 22 },
  { month: "Dec", submitted: 195, settled: 170, rejected: 19 },
  { month: "Jan", submitted: 240, settled: 198, rejected: 28 },
  { month: "Feb", submitted: 268, settled: 220, rejected: 31 },
  { month: "Mar", submitted: 312, settled: 265, rejected: 38 },
];

export const settlementTimeData = [
  { week: "W1", avgDays: 7.2 },
  { week: "W2", avgDays: 6.8 },
  { week: "W3", avgDays: 5.9 },
  { week: "W4", avgDays: 5.4 },
  { week: "W5", avgDays: 4.8 },
  { week: "W6", avgDays: 4.2 },
];

export const claimsByTypeData = [
  { type: "Auto", count: 742, color: "var(--primary)" },
  { type: "Property", count: 489, color: "var(--success)" },
  { type: "Health", count: 334, color: "var(--violet)" },
  { type: "Liability", count: 178, color: "var(--warning)" },
  { type: "Life", count: 67, color: "var(--destructive)" },
  { type: "Travel", count: 37, color: "var(--info)" },
];

export const fraudTrendData = [
  { month: "Oct", detected: 12, prevented: 9, saved: 280000 },
  { month: "Nov", detected: 15, prevented: 12, saved: 340000 },
  { month: "Dec", detected: 11, prevented: 9, saved: 210000 },
  { month: "Jan", detected: 18, prevented: 15, saved: 420000 },
  { month: "Feb", detected: 21, prevented: 18, saved: 510000 },
  { month: "Mar", detected: 24, prevented: 21, saved: 680000 },
];

export const riskDistributionData = [
  { level: "Low", count: 892, percentage: 48 },
  { level: "Medium", count: 614, percentage: 33 },
  { level: "High", count: 267, percentage: 14 },
  { level: "Critical", count: 74, percentage: 4 },
];

export const teamMembers = [
  { id: "usr_001", name: "Sarah Mitchell", role: "Claims Adjuster", avatar: "SM", claims: 47, resolved: 38 },
  { id: "usr_002", name: "Michael Torres", role: "Claims Adjuster", avatar: "MT", claims: 52, resolved: 44 },
  { id: "usr_003", name: "Jennifer Kim", role: "Senior Adjuster", avatar: "JK", claims: 61, resolved: 55 },
  { id: "usr_004", name: "David Chen", role: "Fraud Analyst", avatar: "DC", claims: 33, resolved: 28 },
  { id: "usr_005", name: "Lisa Park", role: "Operations Manager", avatar: "LP", claims: 0, resolved: 0 },
  { id: "usr_006", name: "Ahmed Hassan", role: "Claims Adjuster", avatar: "AH", claims: 41, resolved: 35 },
];

export const aiInsights = [
  {
    id: "ins_001",
    type: "fraud",
    severity: "critical",
    title: "Fraud Ring Detected",
    description: "AI has identified a potential fraud ring involving 3 claims with linked IP addresses and similar damage patterns in the Miami region.",
    action: "Review Claims",
    claimsAffected: 3,
    timestamp: "2 hours ago",
  },
  {
    id: "ins_002",
    type: "efficiency",
    severity: "info",
    title: "Automation Opportunity",
    description: "47 low-risk travel claims are eligible for automated settlement, potentially saving 18 adjuster-hours.",
    action: "Auto-Settle",
    claimsAffected: 47,
    timestamp: "4 hours ago",
  },
  {
    id: "ins_003",
    type: "risk",
    severity: "warning",
    title: "High-Value Claims Spike",
    description: "Unusual 34% spike in high-value property claims from the Pacific Northwest. Weather event correlation detected.",
    action: "View Analysis",
    claimsAffected: 28,
    timestamp: "6 hours ago",
  },
  {
    id: "ins_004",
    type: "document",
    severity: "info",
    title: "Document Processing Complete",
    description: "AI OCR has processed 124 documents across 89 claims. 12 documents flagged for manual review.",
    action: "Review Flags",
    claimsAffected: 89,
    timestamp: "1 day ago",
  },
];