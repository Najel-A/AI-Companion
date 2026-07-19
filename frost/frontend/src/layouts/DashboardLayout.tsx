import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", description: "Overview", end: true },
  { to: "/chat", label: "Chat", description: "Capture work", end: false },
  { to: "/memories", label: "Memories", description: "Search history", end: false },
];

export function DashboardLayout() {
  return (
    <div className="flex h-full min-h-0">
      <aside className="flex w-[280px] shrink-0 flex-col border-r border-frost-200/70 bg-white/55 px-5 py-7 backdrop-blur-xl">
        <div className="mb-10 animate-fadeUp">
          <p className="font-display text-4xl font-bold tracking-tight text-frost-900">
            Frost
          </p>
          <p className="mt-2 text-sm leading-relaxed text-frost-600">
            AI-powered memory assistant
          </p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={{ animationDelay: `${80 + index * 60}ms` }}
              className={({ isActive }) =>
                `animate-fadeUp block rounded-xl px-4 py-3.5 transition duration-200 ${
                  isActive
                    ? "bg-frost-800 text-white shadow-soft"
                    : "text-frost-800 hover:bg-frost-100/90"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="block text-base font-semibold">{item.label}</span>
                  <span
                    className={`mt-0.5 block text-sm ${
                      isActive ? "text-frost-100/85" : "text-frost-500"
                    }`}
                  >
                    {item.description}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-xl border border-frost-200/80 bg-frost-50/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-frost-500">
            Personal AI
          </p>
          <p className="mt-2 text-sm leading-relaxed text-frost-700">
            Runs on your hardware. Conversations sync to your Frost backend.
          </p>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
