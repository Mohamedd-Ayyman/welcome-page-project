import React from "react";
import AppLayout from "../../components/appLayout.jsx";

export default function ChatPage() {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 py-6 h-[calc(100vh-4rem)] flex flex-col">
        <h1 className="text-xl font-bold text-foreground mb-4">Chat</h1>
        <div className="flex-1 bg-glass rounded-2xl border border-glass-border flex items-center justify-center">
          <p className="text-muted-foreground">Select a chat to start messaging</p>
        </div>
      </div>
    </AppLayout>
  );
}
