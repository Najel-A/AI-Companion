import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  useCreateConversationMutation,
  useDeleteConversationMutation,
  useListConversationsQuery,
} from "../chatApi";
import { setSelectedConversationId } from "../chatSlice";
import { Button } from "../../../components/ui/Button";

export function ConversationList() {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector((state) => state.chat.selectedConversationId);
  const { data: conversations = [], isLoading, isError } =
    useListConversationsQuery();
  const [createConversation, { isLoading: isCreating }] =
    useCreateConversationMutation();
  const [deleteConversation] = useDeleteConversationMutation();

  async function handleCreate() {
    const created = await createConversation({
      title: `Conversation ${conversations.length + 1}`,
    }).unwrap();
    dispatch(setSelectedConversationId(created.id));
  }

  async function handleDelete(id: string) {
    await deleteConversation(id).unwrap();
    if (selectedId === id) {
      dispatch(setSelectedConversationId(null));
    }
  }

  return (
    <div className="flex h-full flex-col border-r border-frost-200/70 bg-white/50 backdrop-blur-md">
      <div className="space-y-4 border-b border-frost-200/70 px-5 py-5">
        <div>
          <h2 className="font-display text-xl font-semibold text-frost-900">
            Conversations
          </h2>
          <p className="mt-1 text-sm text-frost-500">
            Capture progress as it happens
          </p>
        </div>
        <Button onClick={handleCreate} disabled={isCreating} className="w-full">
          {isCreating ? "Creating…" : "New conversation"}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        {isLoading && (
          <p className="px-2 py-3 text-sm text-frost-500">Loading…</p>
        )}
        {isError && (
          <div className="m-1 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700">
            Could not load conversations. Start the backend on port 3000.
          </div>
        )}
        {!isLoading && !isError && conversations.length === 0 && (
          <div className="m-1 rounded-lg border border-dashed border-frost-300 bg-frost-50/70 px-4 py-6 text-sm leading-relaxed text-frost-600">
            No conversations yet. Create one to start logging engineering work.
          </div>
        )}

        <ul className="space-y-1.5">
          {conversations.map((conversation) => {
            const active = conversation.id === selectedId;
            return (
              <li key={conversation.id}>
                <div
                  className={`group flex items-center gap-2 rounded-xl px-3 py-3 transition ${
                    active
                      ? "bg-frost-800 text-white shadow-soft"
                      : "text-frost-800 hover:bg-frost-100/90"
                  }`}
                >
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left"
                    onClick={() =>
                      dispatch(setSelectedConversationId(conversation.id))
                    }
                  >
                    <span className="block truncate text-[15px] font-semibold">
                      {conversation.title}
                    </span>
                    <span
                      className={`mt-0.5 block text-xs ${
                        active ? "text-frost-200" : "text-frost-500"
                      }`}
                    >
                      {new Date(conversation.updatedAt).toLocaleString()}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${conversation.title}`}
                    className={`rounded-md px-2 py-1 text-xs font-medium opacity-0 transition group-hover:opacity-100 ${
                      active
                        ? "hover:bg-white/15"
                        : "text-frost-600 hover:bg-white/80"
                    }`}
                    onClick={() => handleDelete(conversation.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
