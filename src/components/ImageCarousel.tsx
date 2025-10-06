import { useState, useEffect } from "react";

type ImageItem = {
  src: string;
  caption?: string;
};

export default function ImageCarousel({ images }: { images: ImageItem[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex(i => (i + 1) % images.length),
      4000 // change every 4 seconds
    );
    return () => clearInterval(timer);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <section className="card" style={{ textAlign: "center" }}>
      <h3 style={{ marginTop: 0 }}>📸 Class Moments</h3>
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 12 }}>
        <img
          src={images[index].src}
          alt={images[index].caption || `Slide ${index + 1}`}
          style={{
            width: "100%",
            maxHeight: 350,
            objectFit: "cover",
            borderRadius: 12,
            transition: "opacity 0.5s ease",
          }}
        />
      </div>
      {images[index].caption && (
        <p className="meta" style={{ marginTop: 8 }}>
          {images[index].caption}
        </p>
      )}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "none",
              background: i === index ? "var(--accent, #007bff)" : "#ccc",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
  );
}
