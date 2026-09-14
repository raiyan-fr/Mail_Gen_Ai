import { useState, useRef } from "react";
import { ClipboardIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { generateEmail } from "..//services/aiService";

const Dashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe the outreach you want to generate.");
      return;
    }

    try {
      setLoading(true);

      const response = await generateEmail(prompt);
      setResult(response.data);

      toast.success(response.message || "Email generated successfully");

      // Scroll to generated result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error("Generate email error:", error);

      toast.error(error.response?.data?.message || "Failed to generate email");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-red-400">
          <SparklesIcon className="h-5 w-5" />

          <span className="text-sm font-medium">AI Outreach Generator</span>
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Create personalized outreach
        </h1>

        <p className="mt-2 max-w-5xl text-slate-400">
          Describe your target recipient, company, role, and what you want to
          say. Make sure to give a context about you to get better results.
          <br />
          MailGen AI will create your email, LinkedIn message, and follow-up.
        </p>
      </div>

      {/* Prompt Card */}
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Tell us what you want to send
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Be specific for better personalization.
            </p>
          </div>

          <span className="text-xs text-slate-500">{prompt.length} / 2000</span>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => {
            if (e.target.value.length <= 2000) {
              setPrompt(e.target.value);
            }
          }}
          placeholder="Example: I want to reach out to the CTO of a SaaS startup for a frontend developer opportunity. I have experience with React, Next.js and TypeScript..."
          rows={7}
          className="mt-5 w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-4 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20"
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SparklesIcon className="h-5 w-5" />

            {loading ? "Generating..." : "Generate Outreach"}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <section ref={resultRef} className="mt-8 scroll-mt-24 space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Generated Outreach
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and customize the generated content before sending.
            </p>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-white">Cold Email</h3>

              <button
                onClick={() =>
                  handleCopy(
                    `Subject: ${result.subject}\n\n${result.emailBody}`,
                  )
                }
                className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <ClipboardIcon className="h-4 w-4" />
                Copy
              </button>
            </div>

            <div className="border-b border-white/10 pb-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Subject
              </p>

              <p className="mt-2 font-medium text-white">{result.subject}</p>
            </div>

            <div className="pt-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {result.emailBody}
              </p>
            </div>
          </div>

          {/* LinkedIn + Follow Up */}
          <div className="grid gap-5 lg:grid-cols-2">
            {/* LinkedIn */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold text-white">LinkedIn Message</h3>

                <button
                  onClick={() => handleCopy(result.linkedinDM)}
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <ClipboardIcon className="h-4 w-4" />
                  Copy
                </button>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {result.linkedinDM}
              </p>
            </div>

            {/* Follow-up */}
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold text-white">Follow-up Email</h3>

                <button
                  onClick={() => handleCopy(result.followUpEmail)}
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <ClipboardIcon className="h-4 w-4" />
                  Copy
                </button>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {result.followUpEmail}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
