import React from "react";

const SKELETON_HEIGHT = 16;

export function PostSkeleton() {
  return (
    <div className="bg-glass rounded-xl p-4 space-y-3 animate-pulse">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full skeleton" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-24 skeleton rounded" />
          <div className="h-2.5 w-16 skeleton rounded" />
        </div>
      </div>
      <div className="space-y-1.5 pl-12">
        <div className="h-3 w-full skeleton rounded" />
        <div className="h-3 w-4/5 skeleton rounded" />
      </div>
      <div className="flex items-center space-x-6 pl-12">
        <div className="h-3 w-12 skeleton rounded" />
        <div className="h-3 w-12 skeleton rounded" />
        <div className="h-3 w-12 skeleton rounded" />
      </div>
    </div>
  );
}

export function ChatListSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3 rounded-xl">
          <div className="w-10 h-10 rounded-full skeleton" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3.5 w-28 skeleton rounded" />
            <div className="h-2.5 w-40 skeleton rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function UserCardSkeleton() {
  return (
    <div className="flex items-center justify-between bg-glass rounded-xl p-3">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full skeleton" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 skeleton rounded" />
          <div className="h-2.5 w-32 skeleton rounded" />
        </div>
      </div>
      <div className="h-7 w-16 skeleton rounded-full" />
    </div>
  );
}

export function NotificationSkeleton() {
  return (
    <div className="flex items-start space-x-3 p-4">
      <div className="w-8 h-8 rounded-full skeleton flex-shrink-0" />
      <div className="flex-1 space-y-1.5 pt-1">
        <div className="h-3 w-48 skeleton rounded" />
        <div className="h-2.5 w-24 skeleton rounded" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-32 skeleton rounded-xl" />
      <div className="flex items-end space-x-4 px-4 -mt-10">
        <div className="w-20 h-20 rounded-full skeleton border-4 border-background" />
        <div className="flex-1 h-8 skeleton rounded" />
      </div>
      <div className="px-4 space-y-2">
        <div className="h-4 w-64 skeleton rounded" />
        <div className="h-4 w-48 skeleton rounded" />
      </div>
    </div>
  );
}

export function InputSkeleton() {
  return <div className="h-24 w-full skeleton rounded-2xl" />;
}

export function ImageSkeleton({ className = "" }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}