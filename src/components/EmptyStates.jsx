import React from "react";
import { MessageSquare, Users, Bell } from "lucide-react";

export function EmptyFeedState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-glass flex items-center justify-center mb-4">
        <MessageSquare className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">Your feed is empty</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Follow people to see their posts here. Or share something to get started.
      </p>
    </div>
  );
}

export function EmptyChatsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      <div className="w-16 h-16 rounded-full bg-glass flex items-center justify-center mb-4">
        <Users className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">No conversations yet</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Start a chat by visiting someone's profile and sending them a message.
      </p>
    </div>
  );
}

export function EmptyNotificationsState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      <div className="w-16 h-16 rounded-full bg-glass flex items-center justify-center mb-4">
        <Bell className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">All caught up</h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        When someone likes, comments, or follows you, it'll show up here.
      </p>
    </div>
  );
}

export function EmptySearchState({ query }) {
  return (
    <div className="text-center py-12">
      <p className="text-foreground font-semibold">No results for "{query}"</p>
      <p className="text-muted-foreground text-sm mt-1">Try different keywords</p>
    </div>
  );
}

export function EmptyCommentsState() {
  return (
    <p className="text-center text-muted-foreground text-sm py-6">
      No comments yet. Be the first to share your thoughts.
    </p>
  );
}