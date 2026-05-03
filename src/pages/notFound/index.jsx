import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="text-center max-w-md">
        <p className="text-[80px] font-black text-glass-border leading-none mb-4">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors"
        >
          Back to Nuvora
        </Link>
      </div>
    </div>
  );
}