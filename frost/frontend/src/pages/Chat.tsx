import { ChatWindow } from "../features/chat/components/ChatWindow";
import { ConversationList } from "../features/chat/components/ConversationList";

export function ChatPage() {
  return (
    <div className="flex h-full min-h-0 animate-fadeIn">
      <div className="w-[320px] shrink-0">
        <ConversationList />
      </div>
      <ChatWindow />
    </div>
  );
}
