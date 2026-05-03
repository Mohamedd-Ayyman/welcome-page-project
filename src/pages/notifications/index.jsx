import React, { useState, useEffect } from "react";
import AppLayout from "../../components/appLayout.jsx";
import { getNotifications, markAllRead } from "../../apiCalls/notification.js";
import { Bell, MessageCircle, Heart, UserPlus, Check } from "lucide-react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getNotifications();
      if (res.success) setNotifications(res.data);
      setLoading(false);
    })();
  }, []);

  const handleMarkAllRead = async () => {
    const res = await markAllRead();
    if (res.success) {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
      toast.success("All marked as read");
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "message": return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case "like": return <Heart className="w-4 h-4 text-red-500" />;
      case "follow": return <UserPlus className="w-4 h-4 text-green-500" />;
      default: return <Bell className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Notifications</h1>
          <button
            onClick={handleMarkAllRead}
            className="text-xs text-primary font-semibold flex items-center space-x-1"
          >
            <Check className="w-3 h-3" /><span>Mark all read</span>
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <div key={n._id} className={`flex items-start space-x-3 p-3 rounded-xl bg-glass border border-glass-border ${n.read ? "" : "border-primary/30"}`}>
                <div className="mt-0.5">{getIcon(n.type)}</div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{n.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No notifications yet</p>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
