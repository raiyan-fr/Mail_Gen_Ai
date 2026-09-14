import { useEffect, useState } from "react";
import {
  ClipboardIcon,
  ClockIcon,
  EnvelopeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { emailHistory } from "../services/aiService";

const EmailHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const response = await emailHistory();

      setHistory(response.data.sort().reverse() || []);

      if (response.data?.length > 0) {
        setSelectedEmail(response.data[0]);
      }
    } catch (error) {
      console.error("History error:", error);

      toast.error(
        error.response?.data?.message || "Failed to load email history",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <ArrowPathIcon className="h-7 w-7 animate-spin text-red-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-red-400">
          <ClockIcon className="h-5 w-5" />

          <span className="text-sm font-medium">Your Outreach</span>
        </div>

        <h1 className="mt-2 text-3xl font-bold text-white">Email History</h1>

        <p className="mt-2 text-slate-400">
          Access your previous AI-generated outreach messages.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/50 p-12 text-center">
          <EnvelopeIcon className="mx-auto h-10 w-10 text-slate-600" />

          <h2 className="mt-4 text-lg font-semibold text-white">
            No generated emails yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your generated outreach will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
          {/* History list */}
          <div className="h-fit rounded-2xl border border-white/10 bg-slate-900 p-3">
            <div className="mb-2 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Generations
              </p>
            </div>

            <div className="space-y-1">
              {history.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setSelectedEmail(item)}
                  className={`w-full rounded-xl p-4 text-left transition ${
                    selectedEmail?._id === item._id
                      ? "bg-red-500/10"
                      : "hover:bg-slate-800"
                  }`}
                >
                  <p className="truncate text-sm font-medium text-white">
                    {item.subject || "Untitled email"}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {item.prompt}
                  </p>

                  <p className="mt-2 text-[11px] text-slate-600">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected email */}
          {selectedEmail && (
            <div className="space-y-5">
              {/* Email */}
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-semibold text-white">Cold Email</h2>

                  <button
                    onClick={() =>
                      handleCopy(
                        `Subject: ${selectedEmail.subject}\n\n${selectedEmail.emailBody}`,
                      )
                    }
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <ClipboardIcon className="h-4 w-4" />
                    Copy
                  </button>
                </div>

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Subject
                </p>

                <p className="mt-2 font-medium text-white">
                  {selectedEmail.subject}
                </p>

                <div className="my-5 border-t border-white/10" />

                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {selectedEmail.emailBody}
                </p>
              </div>

              {/* LinkedIn */}
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-semibold text-white">LinkedIn Message</h2>

                  <button
                    onClick={() => handleCopy(selectedEmail.linkedinDM)}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <ClipboardIcon className="h-4 w-4" />
                    Copy
                  </button>
                </div>

                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {selectedEmail.linkedinDM}
                </p>
              </div>

              {/* Follow-up */}
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-semibold text-white">Follow-up Email</h2>

                  <button
                    onClick={() => handleCopy(selectedEmail.followUpEmail)}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <ClipboardIcon className="h-4 w-4" />
                    Copy
                  </button>
                </div>

                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {selectedEmail.followUpEmail}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailHistory;
