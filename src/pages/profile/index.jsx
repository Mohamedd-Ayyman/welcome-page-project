import React from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../../components/appLayout.jsx";

export default function ProfilePage() {
  const { userId } = useParams();
  return (
    <AppLayout>
      <div className="max-w-xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-foreground mb-4">Profile</h1>
        <p className="text-muted-foreground">{userId ? `User ID: ${userId}` : "Your Profile"}</p>
      </div>
    </AppLayout>
  );
}
