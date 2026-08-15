// Purely decorative - a scattered field of small twinkling sparkles.
// aria-hidden since it carries no content, and pointer-events: none in CSS
// so it never blocks clicks on the real hero content beneath it.
const SPARKLES = [
  { top: "6%", left: "10%", size: "sm", delay: "0s", color: "rose" },
  { top: "14%", left: "88%", size: "md", delay: "1.1s", color: "gold" },
  { top: "38%", left: "4%", size: "lg", delay: "2.3s", color: "rose" },
  { top: "58%", left: "94%", size: "sm", delay: "0.6s", color: "gold" },
  { top: "82%", left: "18%", size: "md", delay: "3s", color: "rose" },
  { top: "22%", left: "48%", size: "sm", delay: "1.7s", color: "gold" },
  { top: "72%", left: "58%", size: "lg", delay: "0.3s", color: "rose" },
  { top: "4%", left: "62%", size: "sm", delay: "2.1s", color: "gold" },
  { top: "90%", left: "78%", size: "md", delay: "1.4s", color: "rose" },
  { top: "48%", left: "14%", size: "sm", delay: "3.4s", color: "gold" },
  { top: "30%", left: "78%", size: "sm", delay: "2.7s", color: "rose" },
  { top: "66%", left: "30%", size: "sm", delay: "0.9s", color: "gold" },
];

export default function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className={`sparkle sparkle--${s.size} sparkle--${s.color}`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C12 6 14 10 20 12C14 14 12 18 12 24C12 18 10 14 4 12C10 10 12 6 12 0Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}