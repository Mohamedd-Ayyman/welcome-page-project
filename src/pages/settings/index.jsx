import React, { useEffect, useState } from "react";
import AppLayout from "../../components/appLayout.jsx";
import { useSelector } from "react-redux";
import { updateProfile, uploadAvatar } from "../../apiCalls/users.js";
import { changePassword, logoutUser } from "../../apiCalls/auth.js";
import toast from "react-hot-toast";

const initialNotifications = {
  messages: true,
  comments: true,
  follows: true,
  marketing: false,
};

export default function SettingsPage() {
  const { user } = useSelector((s) => s.userReducer);
  const [profile, setProfile] = useState({ firstname: "", lastname: "", bio: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    if (user) {
      setProfile({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const saveProfile = async () => {
    setSaving(true);
    const res = await updateProfile(profile);
    if (res.success) {
      toast.success("Profile updated");
      if (avatarFile) {
        const uploadRes = await uploadAvatar(avatarFile);
        if (uploadRes.success) toast.success("Avatar updated");
      }
    } else {
      toast.error(res.message || "Update failed");
    }
    setSaving(false);
  };

  const submitPassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    const res = await changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });
    if (res.success) {
      toast.success("Password updated");
      setPasswordForm({ currentPassword: "", newPassword: "", confirm: "" });
    } else {
      toast.error(res.message || "Password update failed");
    }
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-xl font-bold text-foreground">Settings</h1>

        <div className="bg-glass rounded-2xl p-4 border border-glass-border space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Profile</h2>
          <div className="grid grid-cols-1 gap-3">
            <input
              value={profile.firstname}
              onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
              placeholder="First name"
              className="px-4 py-2 rounded-xl bg-glass-hover text-sm outline-none"
            />
            <input
              value={profile.lastname}
              onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
              placeholder="Last name"
              className="px-4 py-2 rounded-xl bg-glass-hover text-sm outline-none"
            />
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Bio"
              className="px-4 py-2 rounded-xl bg-glass-hover text-sm outline-none resize-none"
              rows={3}
            />
            <input type="file" onChange={(e) => setAvatarFile(e.target.files?.[0] || null)} />
          </div>
          <button
            onClick={saveProfile}
            disabled={saving}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save profile"}
          </button>
        </div>

        <div className="bg-glass rounded-2xl p-4 border border-glass-border space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Password</h2>
          <input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            placeholder="Current password"
            className="px-4 py-2 rounded-xl bg-glass-hover text-sm outline-none"
          />
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            placeholder="New password"
            className="px-4 py-2 rounded-xl bg-glass-hover text-sm outline-none"
          />
          <input
            type="password"
            value={passwordForm.confirm}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
            placeholder="Confirm password"
            className="px-4 py-2 rounded-xl bg-glass-hover text-sm outline-none"
          />
          <button
            onClick={submitPassword}
            className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold"
          >
            Update password
          </button>
        </div>

        <div className="bg-glass rounded-2xl p-4 border border-glass-border space-y-4">
          <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
          {Object.keys(notifications).map((key) => (
            <label key={key} className="flex items-center justify-between text-sm text-foreground">
              <span className="capitalize">{key}</span>
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={() => toggleNotification(key)}
              />
            </label>
          ))}
        </div>

        <div className="bg-glass rounded-2xl p-4 border border-glass-border">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
