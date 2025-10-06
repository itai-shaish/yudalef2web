import { useEffect, useState } from "react";
import UpcomingEvents from "./components/UpcomingEvents";
import Birthdays from "./components/Birthdays";
import ImageCarousel from "./components/ImageCarousel";

export default function App() {
  // --- Dark mode ---
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) return saved;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  // --- Demo data ---
  const events = [
    { id: "e1", title: "Vienna Delegation – Flight", date: "2025-10-17T03:15:00", location: "Ben Gurion Airport" },
    { id: "e2", title: "Parent Meeting", date: "2025-10-12T18:30:00", location: "Room 203" },
    { id: "e3", title: "Antigone Podcast Showcase", date: "2025-11-05T12:00:00", location: "Auditorium" },
  ];

  const birthdays = [
    { id: "b1", name: "Noa", month: 10, day: 7, emoji: "🎉" },
    { id: "b2", name: "Yonatan", month: 10, day: 21 },
    { id: "b3", name: "Maya", month: 11, day: 2, emoji: "🎂" },
  ];

  const images = [
    { src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop", caption: "Class trip" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop", caption: "Project time" },
    { src: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=1600&auto=format&fit=crop", caption: "Team spirit" },
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container header-row">
          <div className="brand">
            <span className="dot" />
            <span>YudAlef2 Web</span>
          </div>
          <button className="btn-ghost" onClick={toggleTheme}>
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
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


        {/* Optional scrollable space below */}
        <div className="content-placeholder">
          <p>Scroll here for more content if needed...</p>
        </div>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} YudAlef2 · Built with ❤️
      </footer>
    </div>
  );
}
