import { useEffect, useState } from "react";
import UpcomingEvents from "./components/UpcomingEvents";
import Birthdays from "./components/Birthdays";
import ImageCarousel from "./components/ImageCarousel";

export default function App() {
  // --- Dark mode ---
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) return saved;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- Demo data ---
  const events = [
    { id: "e1", title: "Vienna Delegation – Flight", date: "2025-10-17T03:15:00", location: "Ben Gurion Airport" },
    { id: "e2", title: "Parent Meeting",            date: "2025-10-12T18:30:00", location: "Room 203" },
    { id: "e3", title: "Antigone Podcast Showcase",  date: "2025-11-05T12:00:00", location: "Auditorium" },
  ];

  const birthdays = [
    { id: "b1", name: "Noa",  month: 10, day: 8,  emoji: "🎉" },
    { id: "b2", name: "ori",  month: 10, day: 21 },
    { id: "b3", name: "Maya", month: 11, day: 2,  emoji: "🎂" },
  ];

  const images = [
    { src: "imagesclass/20250206_192800.jpg", caption: "Class trip" },
        { src: "imagesclass/20250318_104948.jpg", caption: "Class trip" },
            { src: "imagesclass/20250319_101013.jpg", caption: "Class trip" },
                { src: "imagesclass/20250319_101046.jpg", caption: "Class trip" },
                    { src: "imagesclass/20250319_101134.jpg", caption: "Class trip" },
                        { src: "imagesclass/20250611_113216.jpg", caption: "Class trip" },
                            { src: "imagesclass/20250612_123144.jpg", caption: "Class trip" },
                             { src: "imagesclass/20250612_123151.jpg", caption: "Class trip" },







  ];

  return (
    <div className="app">
      {/* Header (updated) */}
      <header className="header">
        <div className="container header-row">
          <div className="brand">
            <span className="brand-dot" />
            <span>YudAlef2 Web</span>
          </div>

          {/* pretty toggle switch */}
          <label className="theme-toggle" aria-label="Toggle dark mode">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
            />
            <span className="knob" />
          </label>
        </div>
      </header>

      {/* Title */}
      <main className="container">
        <h1 className="title">YudAlef2 — Class Dashboard</h1>

        <section className="fixed-cards" dir="rtl">
          <div className="card"><UpcomingEvents events={events} /></div>
          <div className="card"><Birthdays birthdays={birthdays} daysAhead={40} /></div>
          <div className="card"><ImageCarousel images={images} /></div>
        </section>

        <div className="content-placeholder">
          <p>Scroll here for more content if needed...</p>
        </div>
      </main>

      <footer className="footer">© {new Date().getFullYear()} YudAlef2 · Built with ❤️</footer>
    </div>
  );
}
