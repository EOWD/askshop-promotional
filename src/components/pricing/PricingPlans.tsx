"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Smartphone, Store } from "lucide-react";

export type PlanCard = {
  id: string;
  name: string;
  blurb: string;
  monthly: number;
  conversations: number;
  perConversation: string;
  features: string[];
  highlighted: boolean;
};

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

/** Plan cards and the app add-on with a monthly / annual switch. Annual shows the per-month equivalent. */
export function PricingPlans({
  plans,
  freeMonths,
  overage,
  app,
}: {
  plans: PlanCard[];
  freeMonths: number;
  overage: string;
  app: { monthly: number; setup: number; includes: readonly string[] };
}) {
  const [annual, setAnnual] = useState(true);
  const reduce = useReducedMotion();
  const perMonth = (m: number) => (annual ? Math.round((m * (12 - freeMonths)) / 12) : m);

  return (
    <div>
      {/* Billing switch */}
      <div className="flex justify-center">
        <div role="radiogroup" aria-label="Billing period" className="inline-grid grid-cols-2 gap-1 rounded-full bg-card p-1.5 shadow-[0_10px_30px_-20px_rgba(60,40,20,0.5)]">
          {[
            { v: false, label: "Monthly" },
            { v: true, label: `Annual, ${freeMonths} months free` },
          ].map((o) => (
            <button
              key={String(o.v)}
              type="button"
              role="radio"
              aria-checked={annual === o.v}
              onClick={() => setAnnual(o.v)}
              className="relative min-h-11 cursor-pointer whitespace-nowrap rounded-full px-4 text-[14px] font-semibold text-ink sm:px-6"
            >
              {annual === o.v && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-full bg-action"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI assistant plans */}
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {plans.map((p) => (
          <article
            key={p.id}
            className={`flex flex-col rounded-[28px] p-7 sm:p-8 ${
              p.highlighted ? "bg-ink text-card shadow-[0_40px_70px_-40px_rgba(29,29,31,0.8)] lg:-translate-y-3" : "bg-card text-ink"
            }`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="display text-[1.7rem] font-bold tracking-[-0.02em]">{p.name}</h3>
              {p.highlighted && <span className="text-[13px] font-medium text-card/70">Most brands start here</span>}
            </div>
            <p className={`mt-2 text-[15px] ${p.highlighted ? "text-card/75" : "text-ink-2"}`}>{p.blurb}</p>

            <div className="mt-7 flex items-end gap-2">
              <span className="display text-[3.5rem] font-bold leading-none tracking-[-0.04em] tabular-nums">{eur.format(perMonth(p.monthly))}</span>
              <span className={`pb-1.5 text-[16px] ${p.highlighted ? "text-card/75" : "text-ink-2"}`}>/month</span>
            </div>
            <p className={`mt-2 min-h-5 text-[13px] ${p.highlighted ? "text-card/70" : "text-ink-2"}`}>
              {annual ? `${eur.format(p.monthly * (12 - freeMonths))} billed yearly` : "Billed monthly, cancel anytime"}
            </p>

            <div className={`mt-6 rounded-[16px] px-4 py-3 ${p.highlighted ? "bg-white/10" : "bg-stone"}`}>
              <div className="text-[16px] font-semibold tabular-nums">{p.conversations.toLocaleString("en-US")} shopper conversations</div>
              <div className={`text-[13px] ${p.highlighted ? "text-card/70" : "text-ink-2"}`}>
                About {p.perConversation} each, then {overage} per extra conversation
              </div>
            </div>

            <ul className="mt-7 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px]">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.highlighted ? "text-action" : "text-ink"}`} strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <Link
                href="/#demo"
                className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-[16px] font-semibold transition-all duration-200 active:scale-[0.98] ${
                  p.highlighted ? "bg-action text-ink hover:bg-action-press" : "bg-ink text-card hover:bg-black"
                }`}
              >
                Book a demo
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Add-ons */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <article className="rounded-[28px] bg-card p-7 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[15px] font-semibold text-ink-2">
                <Smartphone className="h-5 w-5" strokeWidth={1.75} /> Add to any plan
              </div>
              <h3 className="display mt-2 text-[2rem] font-bold leading-tight tracking-[-0.02em]">Your branded app, AI built in</h3>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-2">
            <div className="flex items-end gap-2">
              <span className="display text-[3rem] font-bold leading-none tracking-[-0.04em] tabular-nums">+{eur.format(perMonth(app.monthly))}</span>
              <span className="pb-1 text-[16px] text-ink-2">/month</span>
            </div>
            <p className="pb-1 text-[15px] text-ink-2">
              {annual ? (
                <>
                  Setup <s className="tabular-nums">{eur.format(app.setup)}</s> <span className="font-semibold text-ink">waived</span> on annual billing
                </>
              ) : (
                <>
                  Plus <span className="font-semibold tabular-nums text-ink">{eur.format(app.setup)}</span> one-time setup
                </>
              )}
            </p>
          </div>
          <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {app.includes.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" strokeWidth={2.5} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14px] text-ink-2">
            Example: Growth plus your app is{" "}
            <span className="font-semibold tabular-nums text-ink">{eur.format(perMonth(plans[1].monthly) + perMonth(app.monthly))}</span>{" "}
            a month, with the same assistant on your website and in your app. Live in three weeks or the setup fee back.
          </p>
        </article>

        <article className="flex flex-col rounded-[28px] bg-stone-deep p-7 sm:p-10">
          <div className="flex items-center gap-2 text-[15px] font-semibold text-ink-2">
            <Store className="h-5 w-5" strokeWidth={1.75} /> Included with every plan
          </div>
          <h3 className="display mt-2 text-[2rem] font-bold leading-tight tracking-[-0.02em]">AI marketplace listing</h3>
          <div className="mt-5 flex items-end gap-2">
            <span className="display text-[3rem] font-bold leading-none tracking-[-0.04em]">€0</span>
            <span className="pb-1 text-[16px] text-ink-2">and 0% commission</span>
          </div>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
            A branded store page in the Tapmerce AI marketplace, where shoppers describe what they need and get your
            products. Checkout stays on your store.
          </p>
        </article>
      </div>
    </div>
  );
}
