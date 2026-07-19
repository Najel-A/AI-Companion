import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const pathways = [
  {
    to: "/chat",
    title: "Chat",
    body: "Log decisions, progress at work, and wins as they happen.",
    cta: "Open chat",
    primary: true,
  },
  {
    to: "/memories",
    title: "Memories",
    body: "Search past work for self-reviews, resume bullets, and more.", // Maybe change this later
    cta: "Browse memories",
    primary: false, // Changes color of the button for UX purposes
  },
];

export function HomePage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-center px-8 py-12 lg:px-14">
        <div className="animate-fadeUp max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-frost-500">
            Who needs ChatGPT? {/* Change this later */}
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[1.08] tracking-tight text-frost-900 md:text-6xl">
            Capture the work that usually disappears.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-frost-600 md:text-xl">
            {/* Helps you remember technical progress, then turn it into resume
            bullets, interview stories, and promotion-ready narratives.
            
            Maybe change this later
            */}
            Helps you remember technical progress, then turn it into resume
            bullets, interview stories, and promotion-ready narratives.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {pathways.map((item, index) => (
            <Card
              key={item.to}
              style={{ animationDelay: `${140 + index * 80}ms` }}
              className="animate-fadeUp flex flex-col justify-between transition duration-300 hover:-translate-y-0.5 hover:border-frost-300"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold text-frost-900">
                  {item.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-frost-600">
                  {item.body}
                </p>
              </div>
              <Link to={item.to} className="mt-8 inline-flex">
                <Button variant={item.primary ? "primary" : "secondary"} size="lg">
                  {item.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
