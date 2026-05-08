import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Usmania Vision Co." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Welcome back!");
      navigate({ to: "/" });
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 sm:px-6 pt-14 pb-16">
        <div className="bg-card text-card-foreground rounded-3xl p-8">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm text-navy/60 mt-1">Welcome back to Usmania Vision Co.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 focus:outline-none focus:border-gold" />
            </div>
            <button disabled={loading} className="w-full py-3 rounded-full bg-navy text-white font-semibold hover:bg-gold hover:text-gold-foreground transition-colors disabled:opacity-60">
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
          <p className="mt-5 text-sm text-center text-navy/70">
            No account? <Link to="/signup" className="text-gold font-medium">Sign up</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
