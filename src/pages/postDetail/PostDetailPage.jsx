import React from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../../components/appLayout.jsx";
import PostDetailView from "./PostDetailView.jsx";

export default function PostDetailPage() {
  const { postId } = useParams();

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <PostDetailView postId={postId} />
      </div>
    </AppLayout>
  );
}
