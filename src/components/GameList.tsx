import { useMemo, useState } from "react";
import { games } from "./games";
import type { Game, GameCategory } from "./types";
import { Link } from "react-router-dom";

const categories: GameCategory[] = ["Vse", "Sloti", "Vživo", "Originali", "Miza", "Novo"];

function matchesCategory(game: Game, cat: GameCategory): boolean {
  if (cat === "Vse") return true;
  if (cat === "Novo") return Boolean(game.isNew);
  return game.category === cat;
}

export function GameList() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<GameCategory>("Vse");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return games.filter((g) => {
      const okText =
        q.length === 0 ||
        g.title.toLowerCase().includes(q) ||
        g.provider.toLowerCase().includes(q);

      const okCat = matchesCategory(g, activeCategory);

      return okText && okCat;
    });
  }, [query, activeCategory]);

  return (
    <div className="bg-[#1A2C38] text-white">
      {/* Top header */}
      <div className="border-t border-white/10 bg-[#1A2C38] backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-lg font-semibold leading-tight">Igre</div>
                <div className="text-xs text-white/60">
                  Poišči svojo igro in začni igrati
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-80">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Išči igre ali ponudnike ..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none placeholder:text-white/40 focus:border-white/20"
                />
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50">
                  ⌘K
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-start">
                <span className="text-xs text-white/60">
                  Prikazujem <span className="text-white">{filtered.length}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = c === activeCategory;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={[
                    "rounded-full px-3.5 py-1.5 text-sm transition",
                    active
                      ? "bg-white text-black"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10",
                  ].join(" ")}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Quick section header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-white/70">
            Priljubljene izbire
          </div>
          <button className="text-sm text-white/70 hover:text-white transition">
            Prikaži vse
          </button>
        </div>

        {/* Game grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="text-base font-semibold">Ne najdem te igre</div>
            <div className="mt-1 text-sm text-white/60">
              Poskusi drugo igro ali kategorijo.
            </div>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("Vse");
              }}
              className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20">
      {/* “Thumbnail” area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
  <img
    src={game.image}
    alt={game.title}
    className="absolute inset-0 h-full w-full object-cover"
  />
  <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-black/30" />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {game.isHot && (
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-black">
              HOT
            </span>
          )}
          {game.isNew && (
            <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white">
              NOVO
            </span>
          )}
        </div>

        {/* Play overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <Link to={`/${game.link}`}>
          <button className="pointer-events-auto rounded-xl bg-white px-4 py-2 text-sm font-semibold hover:cursor-pointer text-black">
            Igraj
          </button></Link>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="truncate text-sm font-semibold">{game.title}</div>
        <div className="truncate text-xs text-white/60">{game.provider}</div>
      </div>
    </div>
  );
}
