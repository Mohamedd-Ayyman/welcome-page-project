import React from "react";
import AppLayout from "../../components/appLayout.jsx";

export default function Home() {
  return (
    <AppLayout>
      <div className="max-w-xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-4">Home</h1>
        <p className="text-muted-foreground">Welcome to Nuvora!</p>
      </div>
    </AppLayout>
  );
}
