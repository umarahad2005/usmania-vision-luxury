import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { signupFn } from "@/routes/api/auth/signup";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — Usmania Vision Co." }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signupFn({ data: { name, email, password } });
      setAuth(result.user, result.token);
      toast.success("Account created! Welcome to Usmania Vision Co.");
      navigate({ to: "/" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-md px-4 sm:px-6 pt-14 pb-16">
        <div className="bg-card text-card-foreground rounded-3xl p-8">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-sm text-navy/60 mt-1">Join Usmania Vision Co.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-navy/10 focus:outline-none focus:border-gold" />
            </div>
            <button disabled={loading} className="w-full py-3 rounded-full bg-navy text-white font-semibold hover:bg-gold hover:text-gold-foreground transition-colors disabled:opacity-60">
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-5 text-sm text-center text-navy/70">
            Already have an account? <Link to="/login" className="text-gold font-medium">Login</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
