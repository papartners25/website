"use client";

import { useState } from "react";

type Service = "quickbooks" | "appfolio" | "stripe" | "docusign" | "gdrive" | "snowflake";

export default function IntegrationConnectModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [accountId, setAccountId] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const titles: Record<Service, string> = {
    quickbooks: "QuickBooks",
    appfolio: "AppFolio",
    stripe: "Stripe",
    docusign: "DocuSign",
    gdrive: "Google Drive",
    snowflake: "Snowflake",
  };

  async function handleConnect() {
    try {
      setLoading(true);
      setMessage(null);
      if (service === 'quickbooks') {
        window.location.href = '/api/integrations/quickbooks/start';
        return;
      }
      const res = await fetch(`/api/integrations/${service}/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, accountId }),
      });
      if (!res.ok) throw new Error(await res.text());
      setMessage("Connected successfully (stub)");
    } catch (e: any) {
      setMessage(e?.message || "Failed to connect");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <button aria-label="Close modal overlay" className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 surface w-full max-w-md rounded-2xl p-5 shadow-card border border-white/10 backdrop-blur-2xl saturate-150" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white font-semibold text-lg mb-1">Connect {titles[service]}</h3>
        <p className="text-sm text-slate-400 mb-4">Enter temporary credentials to simulate a connection. Replace with OAuth later.</p>

        <div className="grid gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">API Key / Token</label>
            <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Account / Tenant ID (optional)</label>
            <input value={accountId} onChange={(e) => setAccountId(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-white" />
          </div>
        </div>

        {message && <p className="mt-3 text-sm text-slate-300">{message}</p>}

        <div className="mt-5 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded-lg border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20">Close</button>
          <button onClick={handleConnect} disabled={loading} className="px-3 py-2 rounded-lg bg-white text-slate-900 text-sm font-medium hover:bg-slate-100 disabled:opacity-50">{loading ? "Connecting..." : "Connect"}</button>
        </div>
      </div>
    </div>
  );
}


