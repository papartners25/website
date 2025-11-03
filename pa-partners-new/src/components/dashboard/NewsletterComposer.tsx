"use client";

import { useState } from "react";
import { Mail, Send, Loader2, Users } from "lucide-react";

export default function NewsletterComposer() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState(false);

  const loadSubscriberCount = async () => {
    setLoadingCount(true);
    try {
      const res = await fetch("/api/newsletter/subscribers");
      if (res.ok) {
        const data = await res.json();
        setSubscriberCount(data.count);
      }
    } catch (error) {
      console.error("Failed to load subscriber count:", error);
    } finally {
      setLoadingCount(false);
    }
  };

  const handleSend = async () => {
    if (!subject.trim() || !content.trim()) {
      setMessage({ type: "error", text: "Subject and content are required" });
      return;
    }

    setSending(true);
    setMessage(null);

    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: `Newsletter sent to ${data.success} subscriber(s)!`,
        });
        setSubject("");
        setContent("");
        setSubscriberCount(null);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to send newsletter" });
      }
    } catch (error) {
      console.error("Send error:", error);
      setMessage({ type: "error", text: "An unexpected error occurred" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Subscriber count */}
      {subscriberCount === null ? (
        <button
          onClick={loadSubscriberCount}
          disabled={loadingCount}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-slate-300 hover:text-white hover:border-white/20 transition-colors disabled:opacity-50"
        >
          {loadingCount ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Users size={12} />
          )}
          {loadingCount ? "Loading..." : "Load Subscriber Count"}
        </button>
      ) : (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-400/10 border border-blue-400/20 text-xs text-blue-300">
          <Users size={12} />
          {subscriberCount} active subscriber{subscriberCount !== 1 ? "s" : ""}
        </div>
      )}

      {/* Subject */}
      <div>
        <label htmlFor="newsletter-subject" className="block text-xs text-slate-400 mb-1">
          Subject Line
        </label>
        <input
          id="newsletter-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="New Opportunities Available – Summit Flats & More"
          className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          disabled={sending}
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="newsletter-content" className="block text-xs text-slate-400 mb-1">
          Message Content
        </label>
        <textarea
          id="newsletter-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="We're pleased to announce new value-add multifamily opportunities now available for investment. Summit Flats (32 units) in Columbus's Weinland Park offers strong returns and a walkable urban location. Visit our opportunities page to learn more and review detailed investment materials."
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none"
          disabled={sending}
        />
        <p className="text-xs text-slate-500 mt-1">
          Emails automatically link to /opportunities page
        </p>
      </div>

      {/* Message feedback */}
      {message && (
        <div
          className={`px-3 py-2 rounded-lg text-xs ${
            message.type === "success"
              ? "bg-green-400/10 border border-green-400/20 text-green-300"
              : "bg-red-400/10 border border-red-400/20 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Send button */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSend}
          disabled={sending || !subject.trim() || !content.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={14} />
              Send Newsletter
            </>
          )}
        </button>
        {sending && (
          <span className="text-xs text-slate-400">
            This may take a moment for large lists...
          </span>
        )}
      </div>
    </div>
  );
}

