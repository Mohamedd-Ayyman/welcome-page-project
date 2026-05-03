import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../../components/appLayout.jsx";
import { getFeed } from "../../apiCalls/post.js";
import PostCard from "./PostCard.jsx";
import CreatePost from "./CreatePost.jsx";
import { Loader2 } from "lucide-react";
import PostDetailModal from "../postDetail/PostDetailModal.jsx";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((s) => s.userReducer);

  useEffect(() => {
    (async () => {
      const res = await getFeed();
      if (res.success) setPosts(res.data);
      setLoading(false);
    })();
  }, []);

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-foreground mb-4">Feed</h1>
        <CreatePost user={user} onPostCreated={(post) => setPosts([post, ...posts])} />
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="space-y-4 mt-4">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                currentUserId={user?._id}
                onShare={(sharedPost) => setPosts([sharedPost, ...posts])}
              />
            ))}
            {posts.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No posts yet. Follow users to see their posts!</p>
            )}
          </div>
        )}
      </div>
      <PostDetailModal />
    </AppLayout>
  );
}
