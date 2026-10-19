"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Layers, MessageCircle, ShieldCheck, Smartphone, Tag, Users } from "lucide-react";

const ITEMS = [
  { id: "try", label: "Try it", icon: MessageCircle },
  { id: "services", label: "Services", icon: Layers },
  { id: "lifestyles", label: "Shoppers", icon: Users, wide: true },
  { id: "safety", label: "Safety", icon: ShieldCheck, wide: true },
  { id: "case-study", label: "Case study", icon: Smartphone },
  { id: "pricing", label: "Pricing", icon: Tag },
];

/** Thumb-reachable bottom bar that appears once the hero is behind you. */
export function SectionDock() {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState("try");
  const [atEnd, setAtEnd] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const heroIo = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0));
    if (hero) heroIo.observe(hero);

    const sectionIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionIo.observe(el);
    });

    // The booking form and the footer already carry the action; get out of their way.
    const endIo = new IntersectionObserver(([e]) => setAtEnd(e.isIntersecting), { rootMargin: "0px 0px -30% 0px" });
    const form = document.getElementById("demo");
    if (form) endIo.observe(form);
    return () => {
      heroIo.disconnect();
      sectionIo.disconnect();
      endIo.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && !atEnd && (
        <motion.nav
          aria-label="On this page"
          initial={reduce ? false : { y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3"
        >
          <div className="flex items-center gap-1 rounded-full bg-ink/95 p-1.5 shadow-[0_20px_40px_-12px_rgba(29,29,31,0.55)] backdrop-blur">
            {ITEMS.map(({ id, label, icon: Icon, ...rest }) => {
              const on = current === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={on ? "true" : undefined}
                  aria-label={label}
                  className={`${"wide" in rest ? "hidden sm:flex" : "flex"} h-11 items-center gap-2 rounded-full px-2.5 text-[14px] font-medium sm:px-3 transition-colors duration-200 lg:px-4 ${
                    on ? "bg-card text-ink" : "text-card/70 hover:text-card"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  <span className="hidden lg:inline">{label}</span>
                </a>
              );
            })}
            <a
              href="#demo"
              className="ml-1 flex h-11 items-center whitespace-nowrap rounded-full bg-action px-4 text-[14px] font-semibold text-ink transition-all duration-200 hover:bg-action-press active:scale-[0.97]"
            >
              Book a demo
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
