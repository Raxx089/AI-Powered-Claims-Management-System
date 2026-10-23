import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, ArrowRight, CheckCircle, Upload, FileText,
  Car, Home, Heart, Shield, Plane, Briefcase, Sparkles, X, AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const claimTypes = [
  { id: "auto", label: "Auto", icon: Car, color: "var(--primary)", bg: "var(--accent)", desc: "Vehicle accidents, theft, damage" },
  { id: "property", label: "Property", icon: Home, color: "var(--success)", bg: "var(--success-container)", desc: "Home, fire, flood, theft" },
  { id: "health", label: "Health", icon: Heart, color: "var(--destructive)", bg: "var(--destructive-container)", desc: "Medical bills, surgery, treatment" },
  { id: "liability", label: "Liability", icon: Shield, color: "var(--violet)", bg: "var(--violet-container)", desc: "Third-party injuries, property damage" },
  { id: "travel", label: "Travel", icon: Plane, color: "var(--info)", bg: "var(--info-container)", desc: "Cancellations, delays, lost baggage" },
  { id: "life", label: "Life", icon: Briefcase, color: "var(--warning)", bg: "var(--warning-container)", desc: "Life insurance claims" },
];

const steps = [
  { id: 1, label: "Claim Type" },
  { id: 2, label: "Claimant Info" },
  { id: 3, label: "Incident Details" },
  { id: 4, label: "Documents" },
  { id: 5, label: "Review & Submit" },
];

interface FormData {
  claimType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  policyNumber: string;
  incidentDate: string;
  incidentLocation: string;
  description: string;
  estimatedAmount: string;
  files: File[];
}

export function ClaimIntakePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [aiProcessed, setAiProcessed] = useState(false);
  const [form, setForm] = useState<FormData>({
    claimType: "",
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.r@email.com",
    phone: "+1 (555) 123-4567",
    policyNumber: "POL-2024-99012",
    incidentDate: "2024-03-22",
    incidentLocation: "Portland, OR",
    description: "",
    estimatedAmount: "",
    files: [],
  });

  const selectedType = claimTypes.find((t) => t.id === form.claimType);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setAiProcessed(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
  };

  const canNext =
    step === 1 ? !!form.claimType :
    step === 2 ? !!(form.firstName && form.lastName && form.email && form.policyNumber) :
    step === 3 ? !!(form.incidentDate && form.incidentLocation && form.description) :
    step === 4 ? true : true;

  if (submitted) {
    return (
      <div className="p-6 flex items-center justify-center min-h-96">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="flex items-center justify-center rounded-full"
              style={{ width: 80, height: 80, background: "var(--success)" }}
            >
              <CheckCircle size={40} className="text-primary-foreground" />
            </motion.div>
          </div>
          <h2 className="mb-2" style={{ fontSize: "var(--fs-headline-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claim Submitted!</h2>
          <p className="mb-2" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>
            Your claim has been received and assigned number
          </p>
          <p className="mb-6" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--primary)", fontSize: "var(--fs-body-lg)" }}>
            CLM-2024-001903
          </p>

          <div
            className="rounded-xl p-4 mb-6 text-left"
            style={{ background: "var(--sidebar)", border: "1px solid color-mix(in srgb, var(--violet) 30%, transparent)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} style={{ color: "var(--violet-soft)" }} />
              <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--violet-soft)" }}>AI Processing Complete</p>
            </div>
            <p className="text-xs" style={{ color: "var(--outline-variant)", lineHeight: 1.6 }}>
              Claim classified as <strong style={{ color: "var(--primary-foreground)" }}>{selectedType?.label}</strong> · Risk Score:{" "}
              <strong style={{ color: "var(--success)" }}>Low (12)</strong> · Assigned to{" "}
              <strong style={{ color: "var(--primary-foreground)" }}>Sarah Mitchell</strong> · Est. processing: 2-3 business days
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/app/claims")}
              className="px-6 py-2 rounded-xl text-sm text-primary-foreground"
              style={{ background: "var(--primary)" }}
            >
              View Claims
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ ...form, claimType: "" }); }}
              className="px-6 py-2 rounded-xl text-sm"
              style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
            >
              New Claim
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
          {steps.map((s, i) => {
            const isDone = s.id < step;
            const isActive = s.id === step;
            return (
              <div key={s.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className="flex items-center justify-center rounded-full mb-1 transition-all"
                    style={{
                      width: 32,
                      height: 32,
                      background: isDone ? "var(--success)" : isActive ? "var(--primary)" : "var(--border)",
                    }}
                  >
                    {isDone ? (
                      <CheckCircle size={14} className="text-primary-foreground" />
                    ) : (
                      <span style={{ fontSize: "var(--fs-body-sm)", fontWeight: "var(--font-weight-medium)", color: isActive ? "var(--primary-foreground)" : "var(--outline)" }}>
                        {s.id}
                      </span>
                    )}
                  </div>
                  <span className="text-xs whitespace-nowrap" style={{ color: isActive ? "var(--primary)" : isDone ? "var(--success)" : "var(--outline)", fontWeight: isActive ? 600 : 400 }}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="h-px mx-2"
                    style={{ width: 40, background: isDone ? "var(--success)" : "var(--border)", marginBottom: 18 }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <AnimatePresence mode="wait">
            {/* Step 1: Claim Type */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
                <h2 className="mb-1" style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>What type of claim are you filing?</h2>
                <p className="mb-6" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>Select the category that best describes your claim</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {claimTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = form.claimType === type.id;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setForm({ ...form, claimType: type.id })}
                        className="p-4 rounded-xl text-left transition-all"
                        style={{
                          border: isSelected ? `2px solid ${type.color}` : "2px solid var(--surface-container)",
                          background: isSelected ? type.bg : "var(--surface-container-low)",
                        }}
                      >
                        <div
                          className="flex items-center justify-center rounded-xl mb-3"
                          style={{ width: 44, height: 44, background: type.bg }}
                        >
                          <Icon size={20} style={{ color: type.color }} />
                        </div>
                        <p className="text-sm mb-0.5" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>{type.label}</p>
                        <p style={{ fontSize: "var(--fs-label-sm)", color: "var(--outline)" }}>{type.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Claimant Info */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
                <h2 className="mb-1" style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Claimant Information</h2>
                <p className="mb-6" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>Enter the details of the person filing the claim</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "firstName", label: "First Name", placeholder: "John" },
                    { key: "lastName", label: "Last Name", placeholder: "Smith" },
                    { key: "email", label: "Email Address", placeholder: "john@email.com", span: 2 },
                    { key: "phone", label: "Phone Number", placeholder: "+1 (555) 000-0000" },
                    { key: "policyNumber", label: "Policy Number", placeholder: "POL-XXXX-XXXXX" },
                  ].map(({ key, label, placeholder, span }) => (
                    <div key={key} className={span === 2 ? "col-span-2" : ""}>
                      <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>{label}</label>
                      <input
                        value={form[key as keyof FormData] as string}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full rounded-xl px-4 text-sm outline-none"
                        style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Incident Details */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
                <h2 className="mb-1" style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Incident Details</h2>
                <p className="mb-6" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>Tell us what happened</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Incident Date</label>
                      <input
                        type="date"
                        value={form.incidentDate}
                        onChange={(e) => setForm({ ...form, incidentDate: e.target.value })}
                        className="w-full rounded-xl px-4 text-sm outline-none"
                        style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Location</label>
                      <input
                        value={form.incidentLocation}
                        onChange={(e) => setForm({ ...form, incidentLocation: e.target.value })}
                        placeholder="City, State"
                        className="w-full rounded-xl px-4 text-sm outline-none"
                        style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Description of Incident</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Please describe what happened in detail. Include relevant dates, parties involved, and extent of damage or loss..."
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                      style={{ border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)", minHeight: 120 }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "var(--on-surface-variant)", fontWeight: "var(--font-weight-medium)" }}>Estimated Claim Amount ($)</label>
                    <input
                      value={form.estimatedAmount}
                      onChange={(e) => setForm({ ...form, estimatedAmount: e.target.value })}
                      placeholder="e.g. 15000"
                      className="w-full rounded-xl px-4 text-sm outline-none"
                      style={{ height: 42, border: "1.5px solid var(--border)", background: "var(--surface-container-low)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Documents */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
                <h2 className="mb-1" style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Upload Supporting Documents</h2>
                <p className="mb-6" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>Add photos, reports, invoices, or any relevant documentation</p>

                {/* Upload Zone */}
                <div
                  className="rounded-2xl p-8 text-center mb-5 cursor-pointer transition-all hover:bg-accent/50"
                  style={{ border: "2px dashed var(--outline-variant)" }}
                  onClick={() => {}}
                >
                  <div
                    className="flex items-center justify-center rounded-full mx-auto mb-3"
                    style={{ width: 56, height: 56, background: "var(--accent)" }}
                  >
                    <Upload size={24} style={{ color: "var(--primary)" }} />
                  </div>
                  <p className="text-sm mb-1" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>Click to upload or drag and drop</p>
                  <p className="text-xs" style={{ color: "var(--outline)" }}>PDF, PNG, JPG, ZIP up to 50MB</p>
                </div>

                {/* Suggested Documents */}
                <div>
                  <p className="text-xs mb-2" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>
                    Suggested documents for {selectedType?.label} claims:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {(form.claimType === "auto"
                      ? ["Police report", "Vehicle photos", "Repair estimate", "Driver's license copy"]
                      : form.claimType === "property"
                      ? ["Fire/police report", "Damage photos", "Contractor estimate", "Proof of ownership"]
                      : form.claimType === "health"
                      ? ["Medical records", "Hospital bills", "Doctor's note", "Prescription receipts"]
                      : ["Supporting documentation", "Evidence photos", "Official reports", "Receipts/invoices"]
                    ).map((doc) => (
                      <div
                        key={doc}
                        className="flex items-center gap-2 p-2.5 rounded-xl"
                        style={{ background: "var(--surface-container-low)", border: "1px solid var(--surface-container)" }}
                      >
                        <FileText size={13} style={{ color: "var(--primary)", flexShrink: 0 }} />
                        <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 p-3 rounded-xl mt-4"
                  style={{ background: "var(--violet-container)", border: "1px solid var(--violet-border)" }}
                >
                  <Sparkles size={13} style={{ color: "var(--violet)", flexShrink: 0 }} />
                  <p className="text-xs" style={{ color: "var(--violet)" }}>
                    AI will automatically extract and verify key information from your uploaded documents using OCR technology.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
                <h2 className="mb-1" style={{ fontSize: "var(--fs-title-lg)", fontWeight: "var(--font-weight-medium)", color: "var(--foreground)" }}>Review & Submit</h2>
                <p className="mb-6" style={{ color: "var(--muted-foreground)", fontSize: "var(--fs-body-md)" }}>Please review your claim details before submitting</p>

                <div className="space-y-4">
                  {[
                    {
                      title: "Claim Type",
                      data: [{ label: "Type", value: selectedType?.label || "—" }],
                    },
                    {
                      title: "Claimant Information",
                      data: [
                        { label: "Name", value: `${form.firstName} ${form.lastName}` },
                        { label: "Email", value: form.email },
                        { label: "Phone", value: form.phone },
                        { label: "Policy #", value: form.policyNumber },
                      ],
                    },
                    {
                      title: "Incident Details",
                      data: [
                        { label: "Date", value: form.incidentDate },
                        { label: "Location", value: form.incidentLocation },
                        { label: "Est. Amount", value: form.estimatedAmount ? `$${parseInt(form.estimatedAmount).toLocaleString()}` : "Not provided" },
                      ],
                    },
                  ].map(({ title, data }) => (
                    <div key={title} className="rounded-xl p-4" style={{ background: "var(--surface-container-low)", border: "1px solid var(--surface-container)" }}>
                      <p className="text-xs mb-3" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {title}
                      </p>
                      <div className="space-y-2">
                        {data.map(({ label, value }) => (
                          <div key={label} className="flex justify-between">
                            <span className="text-xs" style={{ color: "var(--outline)" }}>{label}</span>
                            <span className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--on-surface-variant)" }}>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {processing && (
                  <div className="mt-4 rounded-xl p-4" style={{ background: "var(--violet-container)", border: "1px solid var(--violet-border)" }}>
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full flex-shrink-0" style={{ width: 20, height: 20, border: "2px solid var(--violet-border)", borderTopColor: "var(--violet)" }} />
                      <div>
                        <p className="text-xs" style={{ fontWeight: "var(--font-weight-medium)", color: "var(--violet)" }}>AI Processing...</p>
                        <p className="text-xs" style={{ color: "var(--violet)" }}>Classifying claim, analyzing documents, calculating risk score</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div
            className="flex items-center justify-between px-8 py-4"
            style={{ borderTop: "1px solid var(--surface-container)", background: "var(--surface-container-low)" }}
          >
            <button
              onClick={() => step > 1 ? setStep(step - 1) : navigate("/app/claims")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors"
              style={{ color: "var(--muted-foreground)", border: "1px solid var(--border)", background: "var(--card)" }}
            >
              <ArrowLeft size={14} />
              {step === 1 ? "Cancel" : "Back"}
            </button>
            <span className="text-xs" style={{ color: "var(--outline)" }}>Step {step} of {steps.length}</span>
            <button
              onClick={handleNext}
              disabled={!canNext || processing}
              className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm text-primary-foreground transition-all hover:opacity-90"
              style={{
                background: canNext && !processing ? "var(--primary)" : "var(--outline-variant)",
                cursor: canNext && !processing ? "pointer" : "not-allowed",
              }}
            >
              {processing ? "Processing..." : step === 5 ? "Submit Claim" : "Continue"}
              {!processing && <ArrowRight size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}