import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../../components/appLayout.jsx";
import { getLoggedUser, getUserById } from "../../apiCalls/users.js";
import { getUserPosts } from "../../apiCalls/post.js";
import { getFollowers, getFollowing, followUser, unfollowUser, getFollowStatus } from "../../apiCalls/follow.js";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user } = useSelector((s) => s.userReducer);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [tab, setTab] = useState("posts");
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const targetId = userId || user?._id;
  const isOwnProfile = !userId || userId === user?._id;

  useEffect(() => {
    if (!targetId) return;
    let cancelled = false;

    const loadProfile = async () => {
      setLoading(true);
      const [profileRes, postsRes, followersRes, followingRes] = await Promise.all([
        isOwnProfile ? getLoggedUser() : getUserById(targetId),
        getUserPosts(targetId),
        getFollowers(targetId),
        getFollowing(targetId),
      ]);

      if (cancelled) return;

      if (profileRes.success) {
        setProfile(profileRes.data);
      }

      if (postsRes.success) setPosts(postsRes.data || []);
      if (followersRes.success) setFollowers(followersRes.data || []);
      if (followingRes.success) setFollowing(followingRes.data || []);

      if (!isOwnProfile) {
        const statusRes = await getFollowStatus(targetId);
        if (!cancelled && statusRes.success) setIsFollowing(statusRes.data.isFollowing);
      }

      setLoading(false);
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [targetId, isOwnProfile]);

  const toggleFollow = async () => {
    if (!targetId || isOwnProfile) return;
    setFollowLoading(true);
    const res = isFollowing ? await unfollowUser(targetId) : await followUser(targetId);
    if (res.success) {
      setIsFollowing(!isFollowing);
      if (isFollowing) {
        setFollowers((prev) => prev.filter((f) => f._id !== user?._id));
      } else if (user) {
        setFollowers((prev) => [{ ...user }, ...prev]);
      }
    }
    setFollowLoading(false);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-4 py-6 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-glass rounded-2xl p-4 border border-glass-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-glass-hover flex items-center justify-center text-xl font-bold">
              {profile?.firstname?.[0]}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">{profile?.firstname} {profile?.lastname}</h1>
              <p className="text-sm text-muted-foreground">{profile?.bio || "No bio yet"}</p>
            </div>
            {!isOwnProfile && (
              <button
                onClick={toggleFollow}
                disabled={followLoading}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>

          <div className="flex space-x-6 mt-4 text-sm text-muted-foreground">
            <span><strong className="text-foreground">{posts.length}</strong> Posts</span>
            <span><strong className="text-foreground">{followers.length}</strong> Followers</span>
            <span><strong className="text-foreground">{following.length}</strong> Following</span>
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <button onClick={() => setTab("posts")} className={`text-sm ${tab === "posts" ? "text-primary" : "text-muted-foreground"}`}>Posts</button>
          <button onClick={() => setTab("followers")} className={`text-sm ${tab === "followers" ? "text-primary" : "text-muted-foreground"}`}>Followers</button>
          <button onClick={() => setTab("following")} className={`text-sm ${tab === "following" ? "text-primary" : "text-muted-foreground"}`}>Following</button>
        </div>

        <div className="mt-4 space-y-3">
          {tab === "posts" && (
            <>
              {posts.length === 0 && <p className="text-muted-foreground">No posts yet.</p>}
              {posts.map((p) => (
                <div key={p._id} className="bg-glass rounded-2xl p-4 border border-glass-border">
                  <p className="text-sm text-foreground">{p.text}</p>
                </div>
              ))}
            </>
          )}
          {tab === "followers" && (
            <>
              {followers.length === 0 && <p className="text-muted-foreground">No followers yet.</p>}
              {followers.map((f) => (
                <div key={f._id} className="flex items-center space-x-3 bg-glass rounded-2xl p-3 border border-glass-border">
                  <div className="w-8 h-8 rounded-full bg-glass-hover flex items-center justify-center text-xs font-bold">
                    {f.firstname?.[0]}
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{f.firstname} {f.lastname}</p>
                  </div>
                </div>
              ))}
            </>
          )}
          {tab === "following" && (
            <>
              {following.length === 0 && <p className="text-muted-foreground">Not following anyone yet.</p>}
              {following.map((f) => (
                <div key={f._id} className="flex items-center space-x-3 bg-glass rounded-2xl p-3 border border-glass-border">
                  <div className="w-8 h-8 rounded-full bg-glass-hover flex items-center justify-center text-xs font-bold">
                    {f.firstname?.[0]}
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{f.firstname} {f.lastname}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
