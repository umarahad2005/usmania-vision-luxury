import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/lib/auth-context";
import { getAllProductsFn, deleteProductFn } from "@/routes/api/products";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Package, TrendingUp, Star, Eye } from "lucide-react";
import type { ProductPublic } from "@/integrations/mongodb/models/product";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Usmania Vision Co." }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, token } = useAuth();
  const [products, setProducts] = useState<ProductPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"products" | "overview">("overview");

  useEffect(() => {
    if (!user) return;
    getAllProductsFn()
      .then(setProducts)
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy">
        <div className="text-center">
          <p className="text-white/60">You must be logged in as admin.</p>
          <Link to="/login" className="mt-4 inline-block text-gold hover:underline">Login</Link>
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteProductFn({ data: { id } });
      setProducts((p) => p.filter((x) => x.id !== id));
      toast.success(`"${name}" deleted.`);
    } catch {
      toast.error("Delete failed.");
    }
  };

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-blue-400" },
    { label: "Featured", value: products.filter((p) => p.featured).length, icon: Star, color: "text-gold" },
    { label: "In Stock", value: products.filter((p) => p.inStock).length, icon: TrendingUp, color: "text-green-400" },
    { label: "Watches", value: products.filter((p) => p.type === "watches").length, icon: Eye, color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-navy">
      {/* Sidebar + Header */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen border-r border-white/8 p-6 gap-2"
          style={{ background: "rgba(17,24,39,0.8)" }}>
          <div className="mb-8">
            <span className="text-gold font-bold text-lg">Admin Panel</span>
            <p className="text-white/40 text-xs mt-1">Usmania Vision Co.</p>
          </div>
          {[
            { key: "overview", label: "Overview", icon: TrendingUp },
            { key: "products", label: "Products", icon: Package },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key as typeof tab)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                tab === key
                  ? "bg-gold/10 border border-gold/20 text-gold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
          <div className="mt-auto pt-8 border-t border-white/8">
            <Link to="/" className="text-white/50 text-xs hover:text-white">← Back to site</Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 lg:p-10">
          {tab === "overview" && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
              <p className="text-white/50 text-sm mb-8">Welcome back, {user.name}</p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((s) => (
                  <div key={s.label} className="p-5 rounded-2xl"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <s.icon className={`h-5 w-5 ${s.color} mb-3`} />
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-white/50 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)" }}>
                <h2 className="text-gold font-semibold mb-3">🚀 Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setTab("products")}
                    className="px-4 py-2 rounded-xl bg-gold text-navy text-sm font-semibold hover:brightness-110 transition">
                    Manage Products
                  </button>
                  <Link to="/watches"
                    className="px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-white text-sm hover:bg-white/15 transition">
                    View Store
                  </Link>
                </div>
              </div>
            </div>
          )}

          {tab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-white">Products</h1>
                  <p className="text-white/50 text-sm mt-1">{products.length} total products</p>
                </div>
                <Link
                  to="/admin/product/new"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-navy font-semibold text-sm hover:brightness-110 transition"
                >
                  <Plus className="h-4 w-4" /> Add Product
                </Link>
              </div>

              {loading ? (
                <div className="text-white/40 text-center py-20">Loading products...</div>
              ) : (
                <div className="space-y-3">
                  {products.map((p) => (
                    <div key={p.id}
                      className="flex items-center gap-4 p-4 rounded-2xl"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <img src={p.image} alt={p.name}
                        className="h-14 w-14 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium truncate">{p.name}</span>
                          {p.featured && (
                            <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold text-[10px] font-bold">Featured</span>
                          )}
                          {!p.inStock && (
                            <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 text-[10px] font-bold">Out of Stock</span>
                          )}
                        </div>
                        <div className="text-white/50 text-sm mt-0.5">{p.category} · Rs.{p.price.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link to={`/admin/product/${p.id}`}
                          className="p-2 rounded-lg bg-white/8 text-white/70 hover:text-white hover:bg-white/15 transition">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button onClick={() => handleDelete(p.id, p.name)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <div className="text-center py-20 text-white/40">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>No products yet. Add your first product!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
