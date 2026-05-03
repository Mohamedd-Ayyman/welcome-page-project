import React, { useEffect, useState } from "react";
import { getPost, getComments, addComment, likePost, sharePost } from "../../apiCalls/post.js";
import { Heart, MessageCircle, Share2, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function PostDetailView({ postId, onClose }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const { user } = useSelector((s) => s.userReducer);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const [postRes, commentsRes] = await Promise.all([
        getPost(postId),
        getComments(postId, 1, 5),
      ]);

      if (cancelled) return;
      if (postRes.success) setPost(postRes.data);
      if (commentsRes.success) {
        const initialComments = commentsRes.data || [];
        setComments(initialComments);
        setHasMoreComments(initialComments.length === 5);
        setCommentsPage(1);
      }
      setLoading(false);
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [postId]);

  const handleComment = async () => {
    if (!comment.trim()) return;
    const res = await addComment(postId, comment);
    if (res.success) {
      setComments([res.data, ...comments]);
      setComment("");
      toast.success("Comment added!");
    }
  };

  const loadMoreComments = async () => {
    if (commentsLoading || !hasMoreComments) return;
    setCommentsLoading(true);
    const nextPage = commentsPage + 1;
    const res = await getComments(postId, nextPage, 5);
    if (res.success) {
      const nextComments = res.data || [];
      setComments([...comments, ...nextComments]);
      setCommentsPage(nextPage);
      if (nextComments.length < 5) setHasMoreComments(false);
    }
    setCommentsLoading(false);
  };

  const handleLike = async () => {
    if (!post) return;
    const res = await likePost(post._id);
    if (res.success) {
      setPost({
        ...post,
        likeCount: res.data.likeCount,
      });
    }
  };

  const handleShare = async () => {
    if (!post) return;
    const res = await sharePost(post._id);
    if (res.success) {
      setPost({
        ...post,
        shareCount: (post.shareCount || 0) + 1,
      });
      toast.success("Post shared!");
    } else {
      toast.error(res.message || "Share failed");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Post</h2>
          {onClose && (
            <button onClick={onClose} className="text-muted-foreground">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Post</h2>
          {onClose && (
            <button onClick={onClose} className="text-muted-foreground">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <p className="text-muted-foreground">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Post</h2>
        {onClose && (
          <button onClick={onClose} className="text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex items-center space-x-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-glass-hover flex items-center justify-center text-sm font-bold">
          {post.author?.firstname?.[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{post.author?.firstname} {post.author?.lastname}</p>
        </div>
      </div>

      <p className="text-foreground text-sm mb-4">{post.text}</p>
      {post.image && <img src={post.image} alt="" className="rounded-xl mb-4 max-h-96 w-full object-cover" />}

      <div className="flex items-center space-x-6 text-muted-foreground">
        <button onClick={handleLike} className="flex items-center space-x-1">
          <Heart className="w-5 h-5" />
          <span className="text-xs">{post.likeCount || 0}</span>
        </button>
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs">{post.commentCount || comments.length}</span>
        </div>
        <button onClick={handleShare} className="flex items-center space-x-1">
          <Share2 className="w-5 h-5" />
          <span className="text-xs">{post.shareCount || 0}</span>
        </button>
      </div>

      <div className="mt-3 flex space-x-2">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleComment()}
          placeholder="Write a comment..."
          className="flex-1 bg-glass-hover rounded-full px-4 py-2 text-sm outline-none text-foreground placeholder:text-muted-foreground"
        />
        <button onClick={handleComment} className="text-primary"><Send className="w-4 h-4" /></button>
      </div>

      <div className="mt-4 space-y-3">
        {comments.length === 0 && (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}
        {comments.map((c) => (
          <div key={c._id} className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-glass-hover flex items-center justify-center text-xs font-bold">
              {c.author?.firstname?.[0]}
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">
                {c.author?.firstname} {c.author?.lastname}
              </p>
              <p className="text-sm text-foreground">{c.text}</p>
            </div>
          </div>
        ))}
        ))}
        {hasMoreComments && (
          <div className="pt-2">
            <button
              onClick={loadMoreComments}
              disabled={commentsLoading}
              className="text-sm text-primary disabled:opacity-50"
            >
              {commentsLoading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
