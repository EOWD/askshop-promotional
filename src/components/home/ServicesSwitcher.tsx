"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

export type Service = {
  id: string;
  tab: string;
  title: string;
  body: string;
  points: readonly string[];
};

/** Segmented control over the three services. Every panel stays in the DOM for search engines. */
export function ServicesSwitcher({
  services,
  visuals,
}: {
  services: readonly Service[];
  visuals: Record<string, React.ReactNode>;
}) {
  const [active, setActive] = useState(services[0].id);
  const reduce = useReducedMotion();

  return (
    <div className="rounded-[28px] bg-card p-3 shadow-[0_30px_60px_-45px_rgba(60,40,20,0.5)] sm:p-4">
      <div role="tablist" aria-label="Tapmerce services" className="relative grid grid-cols-3 gap-1 rounded-[20px] bg-stone p-1.5">
        {services.map((s) => {
          const on = s.id === active;
          return (
            <button
              key={s.id}
              id={`tab-${s.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`panel-${s.id}`}
              onClick={() => setActive(s.id)}
              className="relative min-h-11 cursor-pointer rounded-[16px] px-1.5 py-2.5 text-[13px] font-semibold sm:px-2 sm:py-3 text-ink transition-colors sm:text-[16px]"
            >
              {on && (
                <motion.span
                  layoutId="service-pill"
                  className="absolute inset-0 rounded-[16px] bg-action shadow-[0_6px_14px_-8px_rgba(240,74,16,0.8)]"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{s.tab}</span>
            </button>
          );
        })}
      </div>

      {services.map((s) => (
        <div
          key={s.id}
          id={`panel-${s.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${s.id}`}
          hidden={s.id !== active}
          className="px-2 pb-3 pt-6 sm:px-8 sm:pb-8 sm:pt-12"
        >
          <AnimatePresence mode="wait">
            {s.id === active && (
              <motion.div
                key={s.id}
                initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 [&>*]:min-w-0"
              >
                <div>
                  <h3 className="display text-3xl font-bold leading-[1.06] tracking-[-0.018em] text-ink sm:text-[2.6rem]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[34rem] text-[16px] leading-relaxed text-ink-2 sm:mt-5 sm:text-[17px]">{s.body}</p>
                  <ul className="mt-7 space-y-3.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[16px] text-ink">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink">
                          <Check className="h-3 w-3 text-card" strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>{visuals[s.id]}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
