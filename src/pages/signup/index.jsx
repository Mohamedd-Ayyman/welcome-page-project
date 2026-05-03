import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../apiCalls/auth.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/usersSlice.js";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signup(form);
    setLoading(false);
    if (res.success) {
      dispatch(setUser(res.data.user));
      localStorage.setItem("token", res.data.token);
      toast.success("Account created!");
      navigate("/");
    } else toast.error(res.message || "Signup failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Nuvora</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="First Name"
            value={form.firstname}
            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-glass border border-glass-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 text-sm"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastname}
            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-glass border border-glass-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 text-sm"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-glass border border-glass-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 text-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-glass border border-glass-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-primary font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}
