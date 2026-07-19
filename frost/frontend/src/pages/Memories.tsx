import { FormEvent, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useLazySearchMemoriesQuery } from "../features/memories/memoryApi";

export function MemoriesPage() {
  const [query, setQuery] = useState("");
  const [searchMemories, { data, isFetching, isError }] =
    useLazySearchMemoriesQuery();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    void searchMemories(query.trim());
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-8 py-12 lg:px-12">
        <div className="animate-fadeUp">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-frost-500">
            Knowledge base
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-frost-900 md:text-5xl">
            Memories
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-frost-600">
            Search your engineering history once RAG and pgvector are connected.
            The endpoint is stubbed today so the UI flow is ready.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="animate-fadeUp mt-8 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "100ms" }}
        >
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search accomplishments, decisions, bugs…"
            className="flex-1"
          />
          <Button
            type="submit"
            size="lg"
            disabled={isFetching || !query.trim()}
            className="sm:w-auto"
          >
            {isFetching ? "Searching…" : "Search"}
          </Button>
        </form>

        <Card
          className="animate-fadeUp mt-8 min-h-[220px]"
          style={{ animationDelay: "180ms" }}
        >
          {isError && (
            <p className="text-sm text-red-700">
              Search failed. Make sure the backend is running.
            </p>
          )}
          {!data && !isError && (
            <div className="flex h-full min-h-[160px] flex-col justify-center">
              <p className="font-display text-xl font-semibold text-frost-900">
                Nothing searched yet
              </p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-frost-600">
                Try a query like “auth migration” or “performance regression” once
                memory indexing is live.
              </p>
            </div>
          )}
          {data && (
            <div className="space-y-3">
              <p className="font-semibold text-frost-900">{data.message}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-frost-500">
                Status: {data.status}
              </p>
              {data.results.length === 0 ? (
                <p className="text-sm text-frost-600">No results returned.</p>
              ) : (
                <ul className="space-y-3">
                  {data.results.map((memory) => (
                    <li
                      key={memory.id}
                      className="rounded-lg border border-frost-100 bg-frost-50/80 px-4 py-3 text-sm text-frost-900"
                    >
                      {memory.content}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
