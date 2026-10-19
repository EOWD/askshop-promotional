"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { mailto } from "@/lib/site";

const field =
  "w-full rounded-[14px] border border-line bg-card px-4 py-3.5 text-[16px] text-ink placeholder:text-ink-3 transition-colors focus:border-ink focus:outline-none";

// Until a form backend exists, submitting opens a pre-filled email to the site
// contact (src/lib/site.ts) so nothing is silently dropped.
export function DemoRequestForm() {
  const [email, setEmail] = useState("");
  const [store, setStore] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address so we can reply.");
      return;
    }
    setError("");
    window.location.href = mailto(
      "Tapmerce demo request",
      `I'd like to see the Tapmerce AI assistant on my store.\n\nEmail: ${email}\nStore: ${store}\nWhat I sell: `
    );
  };

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="demo-email" className="text-[14px] font-medium text-ink">
            Work email
          </label>
          <input
            id="demo-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourbrand.com"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "demo-error" : undefined}
            className={field}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="demo-store" className="text-[14px] font-medium text-ink">
            Store URL
          </label>
          <input
            id="demo-store"
            type="text"
            autoComplete="url"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            placeholder="yourbrand.com"
            className={field}
          />
        </div>
      </div>
      {error && (
        <p id="demo-error" role="alert" className="mt-2 text-[14px] font-medium text-[#b3260a]">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="group mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-action px-7 py-4 text-[17px] font-semibold text-ink shadow-[0_14px_28px_-14px_rgba(240,74,16,0.9)] transition-all duration-200 hover:bg-action-press active:scale-[0.98] sm:w-auto"
      >
        Book a demo
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
      </button>
    </form>
  );
}
