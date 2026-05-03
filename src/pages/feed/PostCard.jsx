import React, { useState } from "react";
import { useSelector } from "react-redux";
import { likePost, addComment, getComments, sharePost } from "../../apiCalls/post.js";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../lib/constants.js";

export default function PostCard({ post, currentUserId }) {
  const [liked, setLiked] = useState(post.likes?.includes(currentUserId));
  const [likesCount, setLikesCount] = useState(post.likeCount ?? post.likes?.length || 0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [shareCount, setShareCount] = useState(post.shareCount || 0);
  const { user } = useSelector((s) => s.userReducer);
  const navigate = useNavigate();

  const handleLike = async () => {
    const res = await likePost(post._id);
    if (res.success) {
      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    const res = await addComment(post._id, comment);
    if (res.success) {
      setComments([...comments, res.data]);
      setCommentsLoaded(true);
      setComment("");
      toast.success("Comment added!");
    }
  };

  const loadComments = async () => {
    if (commentsLoaded) return;
    const res = await getComments(post._id);
    if (res.success) {
      setComments(res.data);
      setCommentsLoaded(true);
    }
  };

  const handleShare = async () => {
    const res = await sharePost(post._id);
    if (res.success) {
      setShareCount((prev) => prev + 1);
      toast.success("Post shared!");
    } else {
      toast.error(res.message || "Share failed");
    }
  };

  const openDetail = () => {
    navigate(ROUTES.POST_DETAIL(post._id), { state: { modal: true } });
  };

  return (
    <div className="bg-glass rounded-2xl p-4 border border-glass-border">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-glass-hover flex items-center justify-center text-sm font-bold">
          {post.author?.firstname?.[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{post.author?.firstname} {post.author?.lastname}</p>
        </div>
      </div>
      <button onClick={openDetail} className="text-left w-full">
        <p className="text-foreground text-sm mb-4">{post.text}</p>
        {post.image && <img src={post.image} alt="" className="rounded-xl mb-4 max-h-96 w-full object-cover" />}
      </button>
      <div className="flex items-center space-x-6 text-muted-foreground">
        <button onClick={handleLike} className={`flex items-center space-x-1 ${liked ? "text-red-500" : ""}`}>
          <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
          <span className="text-xs">{likesCount}</span>
        </button>
        <button onClick={loadComments} className="flex items-center space-x-1">
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs">{post.commentCount ?? comments.length}</span>
        </button>
        <button onClick={handleShare} className="flex items-center space-x-1">
          <Share2 className="w-5 h-5" />
          <span className="text-xs">{shareCount}</span>
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
      {post.commentsPreview?.length > 0 && (
        <div className="mt-4 space-y-3">
          {post.commentsPreview.map((c) => (
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
        </div>
      )}
      {commentsLoaded && comments.length > 0 && (
        <div className="mt-4 space-y-3">
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
        </div>
      )}
    </div>
  );
}
