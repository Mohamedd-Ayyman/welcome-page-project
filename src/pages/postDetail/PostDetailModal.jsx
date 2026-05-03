import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostDetailView from "./PostDetailView.jsx";

export default function PostDetailModal() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const isModal = location.state?.modal;
  const postId = params.postId;

  if (!isModal || !postId) return null;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeModal}>
      <div className="bg-background rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <PostDetailView postId={postId} onClose={closeModal} />
      </div>
    </div>
  );
}
