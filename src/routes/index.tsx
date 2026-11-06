import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Award, Leaf, Maximize, Play, Search, Settings, Trophy, Volume2 } from "lucide-react";
import {
  BIN_INFO,
  HAZARD_SUB_INFO,
  SAMPLE_PILLS,
  TIERS,
  WASTE_ITEMS,
  badgeFor,
  nextTier,
  type Bin,
  type WasteItem,
} from "@/lib/waste-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EcoSort — Sort Waste Right, Earn Eco Points" },
      { name: "description", content: "Search any household item to find the right bin — dry, wet or hazardous — and earn badges as you learn." },
      { property: "og:title", content: "EcoSort — Sort Waste Right" },
      { property: "og:description", content: "Instant waste classifier with eco points, badges and a leaderboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STORE = "ecosort-state";
const binClass: Record<Bin, string> = { dry: "bin-dry", wet: "bin-wet", hazard: "bin-hazard" };
const subClass = { red: "bin-red", black: "bin-black" } as const;

function chipLabel(item: WasteItem) {
  return item.sub ? HAZARD_SUB_INFO[item.sub].short : BIN_INFO[item.bin].short;
}

function chipClass(item: WasteItem) {
  return item.sub ? subClass[item.sub] : binClass[item.bin];
}

function Index() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<WasteItem | null>(null);
  const [points, setPoints] = useState(0);
  const [searched, setSearched] = useState<string[]>([]);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORE) || "{}");
      setPoints(s.points ?? 0);
      setSearched(s.searched ?? []);
    } catch {}
  }, []);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return WASTE_ITEMS.filter((i) => i.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  function pick(item: WasteItem) {
    setSelected(item);
    setQuery(item.name);
    if (searched.includes(item.name)) {
      toast("Already sorted!", { description: "Search new items to earn more points." });
      return;
    }
    const np = points + 10;
    const ns = [...searched, item.name];
    const before = badgeFor(points);
    const after = badgeFor(np);
    setPoints(np);
    setSearched(ns);
    localStorage.setItem(STORE, JSON.stringify({ points: np, searched: ns }));
    if (before !== after) toast.success(`🏆 Badge unlocked: ${after}!`, { description: "Keep sorting to make a difference." });
    else toast.success("+10 Eco Points 🌱", { description: `${item.name} sorted correctly.` });
  }

  const badge = badgeFor(points);
  const next = nextTier(points);
  const prevMin = [...TIERS].reverse().find((t) => t.min <= points)?.min ?? 0;
  const pct = next ? ((points - prevMin) / (next.min - prevMin)) * 100 : 100;

  const leaders = [
    { name: "Aarav S.", pts: 420 },
    { name: "Meera K.", pts: 310 },
    { name: "Rohan P.", pts: 180 },
    { name: "You", pts: points },
    { name: "Isha T.", pts: 90 },
  ].sort((a, b) => b.pts - a.pts);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><Leaf className="h-5 w-5" /></span>
            <span className="truncate font-display text-xl font-bold">EcoSort</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">🌱 {points} pts</span>
            <span className={`hidden rounded-full border px-3 py-1 text-sm font-medium sm:inline ${badge === "Upcoming Reformer" ? "badge-gold" : "border-border"}`}>{badge}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-10">
        <section className="grid items-center gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Sort smarter. Live greener.</p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Every item has a right bin.</h1>
            <p className="mt-4 text-lg text-muted-foreground">Look up any household item, learn where it goes, and earn Eco Points along the way.</p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-video shadow-soft">
            <div className="absolute inset-0 grid place-items-center">
              <button aria-label="Play video" className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition hover:scale-110">
                <Play className="ml-1 h-9 w-9" />
              </button>
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">Introductory Video Coming Soon</span>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-video-overlay to-transparent p-4 text-video-foreground">
              <div className="mb-2 h-1 rounded-full bg-video-foreground/30"><div className="h-1 w-0 rounded-full bg-primary" /></div>
              <div className="flex items-center gap-3 text-sm">
                <Play className="h-4 w-4" /><Volume2 className="h-4 w-4" />
                <span>00:00 / 03:00</span>
                <span className="ml-auto flex gap-3"><Settings className="h-4 w-4" /><Maximize className="h-4 w-4" /></span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-center font-display text-3xl font-bold">Where does it go?</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
              onKeyDown={(e) => { if (e.key === "Enter" && matches[0]) pick(matches[0]); }}
              placeholder="Search an item, e.g. battery, peel, bottle…"
              className="w-full rounded-2xl border-2 border-input bg-card py-4 pl-12 pr-4 text-lg shadow-soft outline-none transition focus:border-primary"
            />
            {!selected && matches.length > 0 && (
              <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-soft">
                {matches.map((m) => (
                  <li key={m.name}>
                    <button onClick={() => pick(m)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted">
                      <span className="text-xl">{m.emoji}</span>
                      <span className="flex-1">{m.name}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${chipClass(m)}`}>{chipLabel(m)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {!selected && query.trim() && matches.length === 0 && (
              <p className="mt-3 text-center text-sm text-muted-foreground">No match yet — try a simpler word.</p>
            )}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SAMPLE_PILLS.map((p) => (
              <button key={p} onClick={() => pick(WASTE_ITEMS.find((i) => i.name === p)!)} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                {p}
              </button>
            ))}
          </div>
          {selected && (
            <div key={selected.name} className="mt-6 flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft animate-in fade-in zoom-in-95 duration-300">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-muted text-5xl">{selected.emoji}</div>
              <div className="min-w-0">
                <h3 className="font-display text-2xl font-bold">{selected.name}</h3>
                <span className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${chipClass(selected)}`}>
                  {selected.sub ? HAZARD_SUB_INFO[selected.sub].label : BIN_INFO[selected.bin].label}
                </span>
                <p className="mt-3 text-muted-foreground">{selected.tip}</p>
                {selected.sub && <p className="mt-2 text-sm font-medium">{HAZARD_SUB_INFO[selected.sub].rule}</p>}
              </div>
            </div>
          )}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className={`rounded-2xl border bg-card p-6 shadow-soft ${badge === "Upcoming Reformer" ? "badge-gold" : "border-border"}`}>
            <div className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /><h2 className="font-display text-xl font-bold">Your Eco Progress</h2></div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <Stat label="Searches" value={searched.length} />
              <Stat label="Eco Points" value={points} />
            </div>
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm"><span className="font-semibold">{badge}</span><span className="text-muted-foreground">{next ? `${next.min - points} pts to ${next.name}` : "Top tier reached!"}</span></div>
              <div className="h-3 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} /></div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {TIERS.map((t) => {
                const on = points >= t.min;
                const gold = t.name === "Upcoming Reformer" && on;
                return <span key={t.name} className={`rounded-full border px-3 py-1 text-sm ${gold ? "badge-gold font-semibold" : on ? "border-primary bg-secondary text-secondary-foreground" : "border-border text-muted-foreground opacity-60"}`}>{t.name}</span>;
              })}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center gap-2"><Trophy className="h-5 w-5 text-primary" /><h2 className="font-display text-xl font-bold">Leaderboard</h2></div>
            <ol className="mt-4 space-y-2">
              {leaders.map((l, i) => (
                <li key={l.name} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${l.name === "You" ? "bg-secondary" : ""}`}>
                  <span className="w-6 font-bold text-muted-foreground">{i + 1}</span>
                  <span className="flex-1 font-medium">{l.name}</span>
                  <span className="text-sm text-muted-foreground">{badgeFor(l.pts)}</span>
                  <span className="w-14 text-right font-semibold">{l.pts}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-center font-display text-3xl font-bold">Know your bins</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {([
              ["bin-dry", "♻️", "Dry Waste (Blue Bin)", "Paper, plastic, metals, glass", "Keep items clean and dry so they can be recycled."],
              ["bin-wet", "🌿", "Wet Waste (Green Bin)", "Food scraps, peels, garden waste", "Organic waste turns into compost and biogas."],
              ["bin-red", "🟥", HAZARD_SUB_INFO.red.label, "Diapers, sanitary pads, tampons, condoms, syringes", HAZARD_SUB_INFO.red.rule],
              ["bin-black", "⬛", HAZARD_SUB_INFO.black.label, "Paint cans, batteries, bulbs, thermometers, expired medicines, broken glass", HAZARD_SUB_INFO.black.rule],
            ] as const).map(([cls, emoji, label, items, rule]) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1">
                <div className="text-4xl">{emoji}</div>
                <span className={`mt-4 inline-block rounded-full px-3 py-1 text-sm font-semibold ${cls}`}>{label}</span>
                <p className="mt-3 font-medium">{items}</p>
                <p className="mt-1 text-sm text-muted-foreground">{rule}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">EcoSort · Sort right, every day.</footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-muted p-4">
      <div className="font-display text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
