import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Search, TrendingUp, Globe, Loader2, UserX } from "lucide-react";
import AppLayout from "../../components/appLayout.jsx";
import { searchPosts } from "../../apiCalls/post.js";
import { searchUsers } from "../../apiCalls/users.js";
import { followUser, unfollowUser, getFollowStatus } from "../../apiCalls/follow.js";
import PostCard from "../feed/PostCard.jsx";
import toast from "react-hot-toast";
import { useDebouncedSearch } from "../../hooks/use-debounce.js";

const ExplorePage = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [followingMap, setFollowingMap] = useState({});
  const { user } = useSelector((s) => s.userReducer);

  // Debounced search — cancels in-flight request on new keystroke
  const { search } = useDebouncedSearch(async (q) => {
    const [postRes, usersRes] = await Promise.all([searchPosts(q), searchUsers(q)]);
    return { postRes, usersRes };
  });

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    const result = await search(query.trim());

    setLoading(false);
    if (result?.postRes?.success) setPosts(result.postRes.data);
    if (result?.usersRes?.success) {
      const filtered = result.usersRes.data.filter((u) => String(u._id) !== String(user?._id));
      setUsers(filtered);

      // Batch follow-status lookups
      await Promise.all(
        filtered.map(async (u) => {
          const status = await getFollowStatus(u._id);
          if (status.success) {
            setFollowingMap((prev) => ({ ...prev, [u._id]: status.data.isFollowing }));
          }
        })
      );
    }
  };

  const handleFollowToggle = async (userId) => {
    const isFollowing = followingMap[userId];
    const res = isFollowing ? await unfollowUser(userId) : await followUser(userId);
    if (res.success) {
      setFollowingMap((prev) => ({ ...prev, [userId]: !isFollowing }));
      toast.success(isFollowing ? "Unfollowed" : "Following");
    } else toast.error(res.message || "Action failed");
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              placeholder="Search posts and people..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-glass border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-5 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : searched && posts.length === 0 && users.length === 0 ? (
          <div className="text-center py-12">
            <UserX className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-semibold">No results for "{query}"</p>
            <p className="text-muted-foreground text-sm mt-1">Try different keywords</p>
          </div>
        ) : (
          <>
            {users.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>People</span>
                </h3>
                <div className="space-y-2">
                  {users.map((u) => (
                    <div key={u._id} className="flex items-center justify-between bg-glass rounded-xl p-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          {u.profilepic ? (
                            <img src={u.profilepic} alt="" className="w-9 h-9 rounded-full object-cover" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-glass-hover flex items-center justify-center text-foreground text-sm font-bold">
                              {u.firstname?.[0]}
                            </div>
                          )}
                          {u.isOnline && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{u.firstname} {u.lastname}</p>
                          {u.bio && <p className="text-xs text-muted-foreground line-clamp-1">{u.bio}</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => handleFollowToggle(u._id)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                          followingMap[u._id]
                            ? "bg-glass-hover text-muted-foreground hover:bg-red-500/20 hover:text-red-400"
                            : "bg-primary text-primary-foreground hover:bg-primary-hover"
                        }`}
                      >
                        {followingMap[u._id] ? "Following" : "Follow"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {posts.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Posts</span>
                </h3>
                {posts.map((post) => (
                  <div key={post._id} className="mb-5">
                    <PostCard post={post} currentUserId={user?._id} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default ExplorePage;