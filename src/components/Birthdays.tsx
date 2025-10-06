import { useMemo } from "react";

type Birthday = {
  id: string;
  name: string;
  month: number; // 1–12
  day: number;   // 1–31
  emoji?: string;
};

export default function Birthdays({
  birthdays,
  daysAhead = 30,
}: {
  birthdays: Birthday[];
  daysAhead?: number;
}) {
  const upcoming = useMemo(() => {
    const now = new Date();
    const soon = new Date();
    soon.setDate(now.getDate() + daysAhead);

    return birthdays
      .map(b => {
        const thisYear = new Date(now.getFullYear(), b.month - 1, b.day);
        const nextYear = new Date(now.getFullYear() + 1, b.month - 1, b.day);
        const date = thisYear >= now ? thisYear : nextYear;
        return { ...b, date };
      })
      .filter(b => b.date <= soon)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [birthdays, daysAhead]);

  if (!upcoming.length) return null;

  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>🎂 Upcoming Birthdays</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {upcoming.map(b => (
          <li key={b.id} style={{ padding: "8px 0", borderTop: "1px solid var(--card-border)" }}>
            <strong>{b.name}</strong> — {b.emoji ?? "🎈"}{" "}
            <span className="meta">
              {b.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
