import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { Button } from "../../../components/ui/Button";
import {
  useSendMessageMutation,
  useGetConversationQuery,
} from "../chatApi";

export function ChatWindow() {
  const selectedId = useAppSelector((state) => state.chat.selectedConversationId);
  const { data: conversation, isFetching, isError } = useGetConversationQuery(
    selectedId ?? "",
    { skip: !selectedId }
  );
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages?.length, selectedId]);

  async function handleSubmit(event?: FormEvent) {
    event?.preventDefault();
  
    if (!selectedId || !draft.trim() || isSending) return;
  
    const content = draft.trim();
  
    setDraft("");
  
    try {
      await sendMessage({
        conversationId: selectedId,
        content,
      }).unwrap();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  }

  if (!selectedId) {
    return (
      <div className="flex h-full flex-1 items-center justify-center px-8">
        <div className="animate-fadeUp max-w-md text-center">
          <p className="font-display text-3xl font-semibold text-frost-900">
            Ready when you are
          </p>
          <p className="mt-3 text-base leading-relaxed text-frost-600">
            Select a conversation or create a new one to start capturing decisions,
            fixes, and accomplishments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <header className="border-b border-frost-200/70 bg-white/45 px-8 py-5 backdrop-blur-md">
        <h2 className="font-display text-2xl font-semibold text-frost-900">
          {conversation?.title ?? "Loading…"}
        </h2>
        <p className="mt-1 text-sm text-frost-500">
          Notes sync to PostgreSQL through your Frost backend
        </p>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-8 py-6">
        {isFetching && !conversation && (
          <p className="text-sm text-frost-500">Loading messages…</p>
        )}
        {isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Failed to load this conversation.
          </div>
        )}
        {conversation?.messages?.length === 0 && (
          <div className="rounded-xl border border-dashed border-frost-300 bg-white/50 px-5 py-8 text-sm leading-relaxed text-frost-600">
            No messages yet. Try: “Fixed flaky auth test by isolating JWT middleware.”
          </div>
        )}

        {conversation?.messages?.map((message) => (
          
          <article
            key={message.id}
            className={`animate-fadeIn max-w-2xl rounded-2xl px-5 py-4 shadow-soft ${
              message.role === "user"
                ? "ml-auto bg-frost-800 text-white"
                : "bg-white/90 text-frost-900"
            }`}
          >
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] opacity-65">
              {message.role}
            </p>
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed">
              {message.content}
            </p>
          </article>
        ))}

        {isSending && (
            <article className="animate-fadeIn max-w-2xl rounded-2xl bg-white/90 px-5 py-4 text-frost-900 shadow-soft">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-frost-500">
                Frost
              </p>

              <div className="flex items-center gap-2">
                <span className="text-sm text-frost-500">
                  Thinking
                </span>

                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-frost-400" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-frost-400 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-frost-400 [animation-delay:300ms]" />
                </div>
              </div>
            </article>
          )}
        
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-frost-200/70 bg-white/55 px-8 py-5 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-3xl items-end gap-3">
          <label htmlFor="draft" className="sr-only">
            Message
          </label>
          <textarea
            id="draft"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="Log a decision, bug fix, or win… (Enter to send, Shift+Enter for newline)"
            className="min-h-[92px] flex-1 resize-y rounded-xl border border-frost-200/90 bg-white/95 px-4 py-3 text-[15px] text-frost-900 outline-none transition placeholder:text-frost-400 focus:border-frost-400 focus:ring-2 focus:ring-frost-300/60"
          />
          <Button
            type="submit"
            size="lg"
            disabled={isSending || !draft.trim()}
            className="shrink-0"
          >
            {isSending ? "Sending…" : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
}
