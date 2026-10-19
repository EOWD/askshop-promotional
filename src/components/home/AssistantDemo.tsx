"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUp, Check, FileText, Pill, ShoppingBag, Sparkles, Truck } from "lucide-react";
import { PULSE_EVENT } from "@/components/home/pulse";

type Product = { name: string; detail: string; price: string };
type Exchange = {
  id: string;
  chip: string;
  question: string;
  answer: string;
  products?: Product[];
  tracking?: { carrier: string; status: string; eta: string };
  note?: string;
  source: string;
};

// Sample store and products. The demo is labeled as such on the page.
const EXCHANGES: Exchange[] = [
  {
    id: "magnesium",
    chip: "Best magnesium for evenings?",
    question: "I'm vegan. Which magnesium is best for the evening?",
    answer: "Most customers choose glycinate for evenings because it's gentle on the stomach. Both of these are vegan and in stock.",
    products: [
      { name: "Magnesium Glycinate 400", detail: "90 vegan capsules", price: "€24.90" },
      { name: "Calm Night Blend", detail: "Magnesium, L-theanine", price: "€31.00" },
    ],
    note: "Taking any medication? Check with your pharmacist first.",
    source: "Product data and ingredient lists",
  },
  {
    id: "d3",
    chip: "Is your D3 vegan?",
    question: "Is your vitamin D3 vegan?",
    answer: "Yes. The D3 + K2 drops use vitamin D3 from lichen, not lanolin, so they're suitable for vegans.",
    products: [{ name: "Vitamin D3 + K2 Drops", detail: "Lichen D3, 30 ml", price: "€19.50" }],
    source: "Ingredient metafield: source",
  },
  {
    id: "iron",
    chip: "Iron and magnesium together?",
    question: "Can I take iron and magnesium at the same time?",
    answer: "The product pages suggest taking iron and magnesium at different times of day. For advice on your own needs, your doctor or pharmacist is the right person to ask.",
    source: "Product usage notes",
  },
  {
    id: "order",
    chip: "Where's my order?",
    question: "Where is my order?",
    answer: "Order 4821 shipped on Tuesday and is due on Thursday.",
    tracking: { carrier: "DHL Express", status: "In transit", eta: "Thursday" },
    source: "Your store's orders",
  },
];

function pulse() {
  window.dispatchEvent(new Event(PULSE_EVENT));
}

function StreamedText({ text, instant }: { text: string; instant: boolean }) {
  const words = text.split(" ");
  return (
    <span>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={instant ? false : { opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.25, delay: instant ? 0 : i * 0.035 }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

export function AssistantDemo() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [active, setActive] = useState<Exchange | null>(null);
  const [phase, setPhase] = useState<"idle" | "typing" | "answer">("idle");
  const [cart, setCart] = useState(0);
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ask = useCallback(
    (ex: Exchange) => {
      if (timer.current) clearTimeout(timer.current);
      setActive(ex);
      setPhase(reduce ? "answer" : "typing");
      if (!reduce) {
        timer.current = setTimeout(() => {
          setPhase("answer");
          pulse();
        }, 900);
      }
    },
    [reduce]
  );

  // First answer plays itself once the widget scrolls into view; the timer keeps state updates out of the effect body.
  useEffect(() => {
    if (!inView || active) return;
    const t = setTimeout(() => ask(EXCHANGES[0]), 350);
    return () => clearTimeout(t);
  }, [inView, active, ask]);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const add = (p: Product) => {
    if (added[p.name]) return;
    setAdded((a) => ({ ...a, [p.name]: true }));
    setCart((c) => c + 1);
    pulse();
  };

  const wordCount = active ? active.answer.split(" ").length : 0;
  const after = reduce ? 0 : wordCount * 0.035 + 0.15;

  return (
    <div ref={ref} className="relative">
      {/* Stacked cards behind give the widget physical depth */}
      <div className="absolute inset-x-8 -bottom-3 h-full rounded-[28px] bg-card/60 shadow-[0_20px_40px_-30px_rgba(60,40,20,0.4)]" aria-hidden />
      <div className="absolute inset-x-4 -bottom-1.5 h-full rounded-[28px] bg-card/80" aria-hidden />

      <div className="relative overflow-hidden rounded-[28px] bg-card shadow-[0_40px_80px_-40px_rgba(60,40,20,0.45),0_2px_6px_rgba(60,40,20,0.06)]">
        {/* Widget header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink">
              <Sparkles className="h-5 w-5 text-card" strokeWidth={1.75} />
            </div>
            <div className="text-left">
              <div className="text-[15px] font-semibold text-ink">Ask our nutrition guide</div>
              <div className="text-[13px] text-ink-3">Demo store with sample products</div>
            </div>
          </div>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-stone" aria-label={`Cart, ${cart} items`}>
            <ShoppingBag className="h-5 w-5 text-ink" strokeWidth={1.75} />
            <AnimatePresence>
              {cart > 0 && (
                <motion.span
                  key={cart}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 14 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] font-bold tabular-nums text-card"
                >
                  {cart}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Question chips */}
        <div className="border-b border-line px-5 py-3.5 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap" role="group" aria-label="Try a question">
            {EXCHANGES.map((ex) => {
              const on = active?.id === ex.id;
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => ask(ex)}
                  aria-pressed={on}
                  className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-[14px] font-medium transition-all duration-200 active:scale-[0.97] ${
                    on ? "border-action bg-action text-ink" : "border-line bg-card text-ink hover:border-ink/30 hover:bg-stone"
                  }`}
                >
                  {ex.chip}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation */}
        <div className="min-h-[320px] px-5 py-6 text-left sm:min-h-[290px] sm:px-6" aria-live="polite">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex justify-end">
                  <p className="max-w-[80%] rounded-[20px] rounded-br-md bg-ink px-4 py-2.5 text-[15px] leading-snug text-card">
                    {active.question}
                  </p>
                </div>

                {phase === "typing" && (
                  <div className="flex gap-1.5 rounded-[20px] rounded-bl-md bg-stone px-4 py-3.5 w-fit" aria-label="Assistant is typing">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-ink-3"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
                      />
                    ))}
                  </div>
                )}

                {phase === "answer" && (
                  <>
                    <p className="max-w-[88%] rounded-[20px] rounded-bl-md bg-stone px-4 py-3 text-[15px] leading-relaxed text-ink">
                      <StreamedText text={active.answer} instant={reduce} />
                    </p>

                    {active.products && (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 22, delay: after }}
                        className="flex gap-3 overflow-x-auto pb-1"
                      >
                        {active.products.map((p) => (
                          <div key={p.name} className="flex w-[236px] shrink-0 items-start gap-3 rounded-2xl border border-line bg-card p-3">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-stone">
                              <Pill className="h-6 w-6 text-ink-2" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-[14px] font-semibold text-ink">{p.name}</div>
                              <div className="truncate text-[12px] text-ink-3">{p.detail}</div>
                              <div className="mt-0.5 text-[14px] font-semibold tabular-nums text-ink">{p.price}</div>
                              <div className="mt-2">
                                <button
                                  type="button"
                                  onClick={() => add(p)}
                                  className={`w-full cursor-pointer whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-semibold transition-all duration-200 active:scale-95 ${
                                    added[p.name] ? "bg-stone text-ink-2" : "bg-action text-ink hover:bg-action-press"
                                  }`}
                                >
                                  {added[p.name] ? (
                                    <span className="inline-flex items-center gap-1">
                                      <Check className="h-3.5 w-3.5" strokeWidth={2.25} /> Added
                                    </span>
                                  ) : (
                                    "Add to cart"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {active.tracking && (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 220, damping: 22, delay: after }}
                        className="flex max-w-sm items-center gap-3 rounded-2xl border border-line p-3"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone">
                          <Truck className="h-5 w-5 text-ink" strokeWidth={1.75} />
                        </div>
                        <div className="text-[14px]">
                          <div className="font-semibold text-ink">{active.tracking.status}</div>
                          <div className="text-ink-3">
                            {active.tracking.carrier}, arriving {active.tracking.eta}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {active.note && (
                      <motion.p
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: after + 0.2 }}
                        className="max-w-[88%] rounded-[20px] rounded-bl-md bg-stone px-4 py-3 text-[15px] leading-relaxed text-ink"
                      >
                        {active.note}
                      </motion.p>
                    )}

                    <motion.p
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: after + 0.3 }}
                      className="inline-flex items-center gap-1.5 text-[12px] text-ink-3"
                    >
                      <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
                      Source: {active.source}
                    </motion.p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Composer */}
        <div className="border-t border-line px-5 pb-5 pt-4 sm:px-6">
          <div className="flex items-center gap-2 rounded-full bg-stone py-1.5 pl-4 pr-1.5">
            <span className="flex-1 truncate text-[14px] text-ink-3">Tap a question. On your store, shoppers type their own.</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink" aria-hidden>
              <ArrowUp className="h-4 w-4 text-card" strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
