"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type PlanSummary = { id: string; name: string; blurb: string; price: string; conversations: string };

/** AI plan selector; the price changes digit by digit in fixed tabular positions. */
export function PlanPicker({ plans, initial }: { plans: PlanSummary[]; initial: string }) {
  const [id, setId] = useState(initial);
  const reduce = useReducedMotion();
  const plan = plans.find((p) => p.id === id) ?? plans[0];

  return (
    <div>
      <div role="radiogroup" aria-label="AI assistant plan" className="inline-grid grid-cols-3 gap-1 rounded-full bg-stone p-1">
        {plans.map((p) => {
          const on = p.id === id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setId(p.id)}
              className="relative cursor-pointer rounded-full px-4 py-2 text-[14px] font-semibold text-ink sm:px-6"
            >
              {on && (
                <motion.span
                  layoutId="plan-pill"
                  className="absolute inset-0 rounded-full bg-action"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{p.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-end gap-3">
        <div className="display flex text-[4.5rem] font-bold leading-none tracking-[-0.04em] tabular-nums text-ink sm:text-[6rem]" aria-live="polite">
          {plan.price.split("").map((ch, i) => (
            <span key={i} className="relative inline-block overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`${i}-${ch}`}
                  className="inline-block"
                  initial={reduce ? false : { y: "60%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { y: "-60%", opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 }}
                >
                  {ch}
                </motion.span>
              </AnimatePresence>
            </span>
          ))}
        </div>
        <span className="pb-3 text-[17px] text-ink-2">/month</span>
      </div>
      <p className="mt-3 text-[16px] text-ink-2">
        <span className="font-semibold tabular-nums text-ink">{plan.conversations}</span> shopper conversations a month.{" "}
        {plan.blurb}
      </p>
    </div>
  );
}
