import { useMemo } from "react";

/** Local type just for this file */
type EventItem = {
  id: string;
  title: string;
  date: string;    // ISO string, e.g. "2025-10-17T03:15:00"
  location?: string;
  link?: string;
};

function formatDate(d: Date) {
  return d.toLocaleString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** DEFAULT export */
export default function UpcomingEvents({
  events,
  limit = 5,
}: {
  events: EventItem[];
  limit?: number;
}) {
  const items = useMemo(() => {
    const now = new Date();
    return [...events]
      .map((e) => ({ ...e, d: new Date(e.date) }))
      .filter((e) => e.d >= now)
      .sort((a, b) => a.d.getTime() - b.d.getTime())
      .slice(0, limit);
  }, [events, limit]);

  if (!items.length) return null;

  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Upcoming Events</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((e) => (
          <li
            key={e.id}
            style={{
              display: "flex",
              gap: 12,
              padding: "10px 0",
              borderTop: "1px solid var(--card-border)",
            }}
          >
            <div style={{ minWidth: 140, fontWeight: 600 }}>
              {formatDate(e.d)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{e.title}</div>
              {e.location && <div className="meta">📍 {e.location}</div>}
              {e.link && (
                <a className="meta" href={e.link} target="_blank">
                  More
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
