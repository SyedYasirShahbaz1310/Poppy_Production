"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/data";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Commercial / Advertising",
    budgetRange: "$25,000 - $75,000",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFeedback(data.message || "Inquiry sent successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "Commercial / Advertising",
          budgetRange: "$25,000 - $75,000",
          message: "",
        });
      } else {
        setStatus("error");
        setFeedback(data.error || "Failed to submit inquiry. Please review the form.");
      }
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again or email us directly.");
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Inquiries Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center space-x-2 rounded-full border border-[#cc0000]/40 bg-[#cc0000]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#cc0000]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START A COLLABORATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              BRING YOUR STORY TO LIFE WITH <span className="text-[#cc0000]">POPPY.</span>
            </h2>

            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              We collaborate with visionary brands, agencies, and directors globally.
              Whether crafting high-end commercials, feature films, or digital
              narratives, our team delivers world-class cinematic excellence.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
              <div>
                <span className="text-xs uppercase tracking-widest text-white/40 block">
                  Production Inquiries
                </span>
                <a
                  href={`mailto:${BRAND_CONFIG.contact.inquiries}`}
                  className="text-white font-medium hover:text-poppy transition-colors"
                >
                  {BRAND_CONFIG.contact.inquiries}
                </a>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-white/40 block">
                  Studio Phone
                </span>
                <a
                  href={`tel:${BRAND_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-white font-medium hover:text-poppy transition-colors"
                >
                  {BRAND_CONFIG.contact.phone}
                </a>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-white/40 block">
                  Studio Location
                </span>
                <span className="text-white/80">{BRAND_CONFIG.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#121212] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-poppy/10 blur-[100px] pointer-events-none rounded-full" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rachel Adams"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-poppy focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rachel@studio.com"
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-poppy focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm text-white focus:border-poppy focus:outline-none transition-colors"
                  >
                    <option value="Commercial / Advertising">Commercial / Advertising</option>
                    <option value="Feature Film / Drama">Feature Film / Drama</option>
                    <option value="Brand Documentary">Brand Documentary</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Post-Production & VFX">Post-Production & VFX</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                    Estimated Budget
                  </label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm text-white focus:border-poppy focus:outline-none transition-colors"
                  >
                    <option value="Under $25,000">Under $25,000</option>
                    <option value="$25,000 - $75,000">$25,000 - $75,000</option>
                    <option value="$75,000 - $150,000">$75,000 - $150,000</option>
                    <option value="$150,000+">$150,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/70 mb-2 font-medium">
                  Project Brief &amp; Details *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share a brief overview of your vision, timeline, and key requirements..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-poppy focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative inline-flex items-center space-x-3 rounded-full bg-[#cc0000] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#b30000] hover:shadow-[0_0_30px_rgba(204,0,0,0.6)] disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT BRIEF</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {status === "success" && (
                  <div className="flex items-center space-x-2 text-xs text-green-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{feedback}</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center space-x-2 text-xs text-poppy">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{feedback}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
