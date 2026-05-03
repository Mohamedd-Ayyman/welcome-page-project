import React, { useState } from "react";
import { createPost } from "../../apiCalls/post.js";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function CreatePost({ user, onPostCreated }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    const res = await createPost({ text: content });
    setLoading(false);
    if (res.success) {
      setContent("");
      onPostCreated(res.data);
      toast.success("Post created!");
    }
  };

  return (
    <div className="bg-glass rounded-2xl p-4 border border-glass-border">
      <div className="flex space-x-3">
        <div className="w-9 h-9 rounded-full bg-glass-hover flex items-center justify-center text-sm font-bold">
          {user?.firstname?.[0]}
        </div>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none text-sm"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSubmit}
              disabled={loading || !content.trim()}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 flex items-center space-x-1"
            >
              {loading ? <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" /> : <Plus className="w-4 h-4" />}
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
