"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, Bell, Home, Search, ShoppingBag, Sparkles, User } from "lucide-react";
import { BrandLogo, type SampleBrandId } from "@/components/home/SampleBrands";

// ---------- Phone + app chrome (sample brands, white-label) ----------

function Phone({ brand, color, children }: { brand: SampleBrandId; color: string; children: React.ReactNode }) {
  return (
    <div className="w-[248px] shrink-0 overflow-hidden rounded-[34px] border-[7px] border-ink bg-white shadow-[0_40px_70px_-30px_rgba(29,29,31,0.75)]">
      <div className="flex items-center justify-between px-5 pb-1 pt-2.5 text-[10px] font-semibold text-ink">
        <span className="tabular-nums">9:41</span>
        <span className="h-[18px] w-20 rounded-full bg-ink" />
        <span>5G</span>
      </div>
      <div className="flex items-center justify-between px-4 pb-2 pt-1">
        <span style={{ ["--brand-cut" as string]: "#ffffff" } as React.CSSProperties}>
          <BrandLogo id={brand} color={color} size={15} />
        </span>
        <ShoppingBag className="h-4 w-4 text-ink" strokeWidth={1.75} />
      </div>
      <div className="h-[392px] space-y-2.5 overflow-hidden bg-[#f6f5f2] px-3 py-3">{children}</div>
      <div className="flex items-center justify-around border-t border-black/5 bg-white px-2 py-2.5">
        {[Home, Search, Sparkles, User].map((Icon, i) => (
          <Icon key={i} className="h-[18px] w-[18px]" strokeWidth={1.75} style={{ color: i === 2 ? color : "#8a8a8f" }} />
        ))}
      </div>
    </div>
  );
}

const Q = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-end">
    <p className="max-w-[88%] rounded-[14px] rounded-br-sm bg-ink px-2.5 py-1.5 text-[11px] leading-snug text-white">{children}</p>
  </div>
);
const A = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-start">
    <p className="max-w-[92%] rounded-[14px] rounded-bl-sm bg-white px-2.5 py-1.5 text-[11px] leading-snug text-ink shadow-sm">{children}</p>
  </div>
);
const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-[10px] bg-white/70 px-2.5 py-1.5 text-[9.5px] leading-snug text-[#5b5b60]">{children}</p>
);

function Product({ name, meta, price, color, cta, img }: { name: string; meta: string; price: string; color: string; cta: string; img: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[14px] bg-white p-2 shadow-sm">
      <Image src={img} alt="" width={96} height={96} className="h-12 w-12 shrink-0 rounded-[10px] object-cover" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11.5px] font-semibold text-ink">{name}</div>
        <div className="truncate text-[10px] text-[#6b6b70]">{meta}</div>
        <div className="mt-0.5 text-[11.5px] font-semibold tabular-nums text-ink">{price}</div>
      </div>
      <span className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white" style={{ background: color }}>
        {cta}
      </span>
    </div>
  );
}

function Chips({ items, on, color }: { items: string[]; on: number; color: string }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((c, i) => (
        <span
          key={c}
          className="rounded-full border px-2.5 py-1 text-[10px] font-medium"
          style={i === on ? { background: color, borderColor: color, color: "#fff" } : { borderColor: "#e3e1dc", color: "#3a3a3e", background: "#fff" }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

// ---------- The four lifestyles ----------

type Life = {
  id: string;
  title: string;
  body: string;
  image: { src: string; alt: string; position: string };
  screen: React.ReactNode;
};

const GYM = "#1f3b5c";
const MOM = "#5f8a6b";
const WOMEN = "#8a4a68";
const FOOD = "#6b7a2e";

const LIVES: Life[] = [
  {
    id: "sports",
    title: "Gym and sports nutrition",
    body: "Protein and creatine run out on a schedule. The app puts the usual order one tap away, and the assistant answers serving, flavor and mixing questions from the label.",
    image: { src: "/home/gym.webp", alt: "A man on a gym bench with a shaker and a protein tub, using his phone", position: "object-[30%_center]" },
    screen: (
      <Phone brand="forge" color={GYM}>
        <div className="rounded-[14px] p-3 text-white" style={{ background: GYM }}>
          <div className="flex items-center gap-2.5">
            <Image src="/home/products/whey.webp" alt="" width={96} height={96} className="h-11 w-11 rounded-[10px] object-cover" />
            <div>
              <div className="text-[10px] opacity-80">Your usual</div>
              <div className="text-[13px] font-bold leading-tight">Whey Isolate, Vanilla 2 kg</div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[12px] font-semibold tabular-nums">€54.90</span>
            <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold" style={{ color: GYM }}>
              Buy again
            </span>
          </div>
        </div>
        <Q>How much creatine per day?</Q>
        <A>The label suggests one 5 g scoop a day, mixed with water or your shake.</A>
        <Product name="Creatine Monohydrate 500 g" meta="Unflavoured, 100 servings" price="€24.00" color={GYM} cta="Add" img="/home/products/creatine.webp" />
        <div className="flex items-center gap-2 rounded-[12px] bg-white px-2.5 py-2 shadow-sm">
          <Bell className="h-3.5 w-3.5" style={{ color: GYM }} strokeWidth={2} />
          <span className="text-[10px] text-ink">Your order shipped. Arriving Thursday.</span>
        </div>
      </Phone>
    ),
  },
  {
    id: "infant",
    title: "Mothers and infant formula",
    body: "Parents ask about stages, switching and sensitive tummies. The assistant answers from your guides, keeps subscriptions simple, and points them to their pediatrician when it should.",
    image: { src: "/home/mother.webp", alt: "A mother holding her baby and checking her phone next to a formula tin", position: "object-[65%_center]" },
    screen: (
      <Phone brand="littleoat" color={MOM}>
        <div className="rounded-[14px] bg-white p-3 shadow-sm">
          <div className="text-[12px] font-bold text-ink">Find the right formula</div>
          <div className="mt-1 text-[10px] text-[#6b6b70]">How old is your baby?</div>
          <div className="mt-2">
            <Chips items={["0-6 months", "6-12 months", "12 months+"]} on={1} color={MOM} />
          </div>
        </div>
        <A>For 6 to 12 months, most parents choose Stage 2. This one is organic and made with whole milk.</A>
        <Product name="Organic Stage 2, 800 g" meta="Every 4 weeks, save 10%" price="€29.70" color={MOM} cta="Subscribe" img="/home/products/formula.webp" />
        <Q>Is it gentle on tummies?</Q>
        <A>It has no added palm oil, which some parents prefer. Every baby is different.</A>
        <Note>Not medical advice. For tummy troubles, check with your pediatrician.</Note>
      </Phone>
    ),
  },
  {
    id: "women",
    title: "Women's health and vitamins",
    body: "Prenatal, iron and menopause questions deserve careful answers. The assistant uses your approved wording and refers anything medical to a midwife, doctor or pharmacist.",
    image: { src: "/home/women.webp", alt: "A woman on a yoga mat holding a vitamin bottle and her phone", position: "object-[45%_center]" },
    screen: (
      <Phone brand="verra" color={WOMEN}>
        <Q>Which prenatal has folate, not folic acid?</Q>
        <A>Two of our prenatals use methylfolate. Both are vegan and in stock.</A>
        <Product name="Prenatal Daily" meta="Methylfolate, iron, D3" price="€27.50" color={WOMEN} cta="Add" img="/home/products/prenatal.webp" />
        <Product name="Prenatal + DHA" meta="Methylfolate, algae DHA" price="€34.00" color={WOMEN} cta="Add" img="/home/products/prenatal.webp" />
        <Note>Pregnant or planning? Check new supplements with your midwife or doctor.</Note>
        <div className="rounded-[12px] p-2.5 text-white" style={{ background: WOMEN }}>
          <div className="text-[10px] opacity-80">Subscribe and save</div>
          <div className="text-[11.5px] font-semibold">Delivered every 30 days, skip anytime</div>
        </div>
      </Phone>
    ),
  },
  {
    id: "food",
    title: "Healthy food and snacks",
    body: "Allergen, macro and ingredient questions answered from your product data, from granola and nut butter to smoothie mixes, with a safer swap when something isn't a fit.",
    image: { src: "/home/food.webp", alt: "A couple preparing a healthy breakfast and checking ingredients on a phone", position: "object-[40%_center]" },
    screen: (
      <Phone brand="goodfield" color={FOOD}>
        <div className="rounded-[14px] bg-white p-3 shadow-sm">
          <Image src="/home/products/granola.webp" alt="" width={320} height={320} className="h-24 w-full rounded-[10px] object-cover" />
          <div className="mt-2 text-[12px] font-bold text-ink">Blueberry Almond Granola</div>
          <div className="text-[10px] text-[#6b6b70]">400 g, 9 g protein per serving</div>
          <div className="mt-2">
            <Chips items={["Vegan", "Gluten free", "Contains nuts"]} on={-1} color={FOOD} />
          </div>
        </div>
        <Q>Is it nut free?</Q>
        <A>No, it contains almonds. The Oat & Seed Granola has no nuts in the recipe.</A>
        <Product name="Oat & Seed Granola" meta="Vegan, no nuts in recipe" price="€6.90" color={FOOD} cta="Add" img="/home/products/oatseed.webp" />
      </Phone>
    ),
  },
];

/** Horizontal, snap-scrolling stories: each lifestyle with a photo and a sample branded app screen. */
export function Lifestyles() {
  const track = useRef<HTMLDivElement>(null);
  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-life]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? el.clientWidth) + 20), behavior: "smooth" });
  };

  return (
    <div>
      <div className="mx-auto mb-6 flex max-w-7xl justify-end gap-2 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous story"
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-card text-ink shadow-sm transition-all hover:bg-white active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next story"
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-card text-ink shadow-sm transition-all hover:bg-white active:scale-95"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:scroll-px-6 sm:px-6 lg:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {LIVES.map((l) => (
          <article
            key={l.id}
            data-life
            className="relative flex min-h-[560px] w-[88vw] max-w-[1120px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[32px] bg-ink sm:min-h-[600px] lg:w-[min(1120px,82vw)]"
          >
            <Image src={l.image.src} alt={l.image.alt} fill sizes="(min-width: 1024px) 1120px, 88vw" className={`object-cover ${l.image.position}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f]/90 via-[#1d1d1f]/35 to-transparent lg:bg-gradient-to-r lg:from-[#1d1d1f]/85 lg:via-[#1d1d1f]/30 lg:to-transparent" />
            <div className="relative grid items-end gap-6 p-6 sm:gap-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
              <div className="max-w-md lg:self-end">
                <h3 className="display text-[2rem] font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl">{l.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/85 sm:mt-4 sm:text-[17px]">{l.body}</p>
              </div>
              <div className="order-first -mb-16 origin-top scale-[0.82] justify-self-center sm:order-none sm:mb-0 sm:scale-100 sm:justify-self-end">{l.screen}</div>
            </div>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-4 max-w-7xl px-4 text-[13px] text-ink-2 sm:px-6 lg:px-8">
        App screens show sample brands and products, built on the same platform as live Tapmerce apps.
      </p>
    </div>
  );
}
