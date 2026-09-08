import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame, User, LogOut, ShoppingBag, Clock, CheckCircle2, Package,
  TrendingUp, Plus, Loader2, UtensilsCrossed, ArrowRight,
} from 'lucide-react';
import { supabase, type Profile, type Order } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const quickMenu = [
  { name: 'Signature Smash Burger', price: 14 },
  { name: 'Wood-Fired Margherita', price: 16 },
  { name: 'Garden Power Bowl', price: 12 },
  { name: 'Artisan Dessert Platter', price: 10 },
];

const statusStyles: Record<string, { bg: string; text: string; icon: typeof Clock }> = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-600', icon: Clock },
  preparing: { bg: 'bg-blue-50', text: 'text-blue-600', icon: Package },
  delivered: { bg: 'bg-green-50', text: 'text-green-600', icon: CheckCircle2 },
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(quickMenu[0]);
  const [quantity, setQuantity] = useState(1);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, full_name, phone, created_at')
        .eq('id', user.id)
        .maybeSingle();

      setProfile(profileData as Profile | null);

      const { data: ordersData } = await supabase
        .from('orders')
        .select('id, user_id, item_name, quantity, total_price, status, created_at')
        .order('created_at', { ascending: false });

      setOrders((ordersData as Order[]) ?? []);
      setFetching(false);
    })();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const placeOrder = async () => {
    if (!user) return;
    setPlacing(true);

    const { data, error } = await supabase
      .from('orders')
      .insert({
        item_name: selectedItem.name,
        quantity,
        total_price: selectedItem.price * quantity,
        status: 'pending',
      })
      .select('id, user_id, item_name, quantity, total_price, status, created_at')
      .single();

    if (!error && data) {
      setOrders([data as Order, ...orders]);
      setShowOrderModal(false);
      setQuantity(1);
    }

    setPlacing(false);
  };

  if (loading || fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-50">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total_price), 0);
  const activeOrders = orders.filter((o) => o.status !== 'delivered').length;

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
              <Flame className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-ink-900">Flame & Forge</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <User className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-ink-700">
                {profile?.full_name ?? user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-red-200 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Welcome */}
        <div className="animate-fade-up">
          <h1 className="font-display text-3xl font-bold text-ink-900">
            Welcome back, {profile?.full_name?.split(' ')[0] ?? 'Chef'}!
          </h1>
          <p className="mt-1 text-ink-500">Here's what's cooking in your account.</p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { icon: ShoppingBag, label: 'Total Orders', value: orders.length, color: 'bg-brand-50 text-brand-600' },
            { icon: Clock, label: 'Active Orders', value: activeOrders, color: 'bg-amber-50 text-amber-600' },
            { icon: TrendingUp, label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, color: 'bg-green-50 text-green-600' },
          ].map((stat) => (
            <div key={stat.label} className="card p-6">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm text-ink-500">{stat.label}</div>
                  <div className="font-display text-2xl font-bold text-ink-900">{stat.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Orders */}
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-ink-900">Your Orders</h2>
              <button
                onClick={() => setShowOrderModal(true)}
                className="btn-primary"
              >
                <Plus className="h-4 w-4" />
                New Order
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100">
                  <UtensilsCrossed className="h-8 w-8 text-ink-400" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">No orders yet</h3>
                <p className="mt-1 text-sm text-ink-500">Place your first order and track it here in real time.</p>
                <button onClick={() => setShowOrderModal(true)} className="btn-primary mt-6">
                  <Plus className="h-4 w-4" />
                  Place Your First Order
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const style = statusStyles[order.status] ?? statusStyles.pending;
                  return (
                    <div key={order.id} className="card flex items-center justify-between p-5 transition-all hover:shadow-md">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.bg}`}>
                          <style.icon className={`h-6 w-6 ${style.text}`} />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-ink-900">{order.item_name}</h3>
                          <p className="mt-0.5 text-sm text-ink-500">
                            Qty: {order.quantity} · {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-lg font-bold text-ink-900">
                          ${Number(order.total_price).toFixed(2)}
                        </div>
                        <span className={`mt-1 inline-block rounded-full px-3 py-0.5 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile sidebar */}
          <div>
            <h2 className="mb-5 font-display text-xl font-bold text-ink-900">Your Profile</h2>
            <div className="card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700">
                  <span className="font-display text-2xl font-bold text-white">
                    {(profile?.full_name ?? user?.email ?? '?').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-ink-900">{profile?.full_name ?? 'Member'}</div>
                  <div className="text-sm text-ink-500">{user?.email}</div>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-ink-100 pt-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-400">Phone</div>
                  <div className="mt-1 text-sm text-ink-700">{profile?.phone ?? 'Not set'}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-400">Member Since</div>
                  <div className="mt-1 text-sm text-ink-700">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                      : 'Recently'}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-400">Account ID</div>
                  <div className="mt-1 truncate text-xs text-ink-400">{user?.id}</div>
                </div>
              </div>

              <Link
                to="/"
                className="mt-6 flex items-center justify-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                Back to Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* New Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/50 p-4 backdrop-blur-sm animate-fade-in" onClick={() => setShowOrderModal(false)}>
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-2xl font-bold text-ink-900">Place a New Order</h3>
            <p className="mt-1 text-sm text-ink-500">Pick a dish and quantity — we'll start cooking.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-700">Menu Item</label>
                <div className="grid grid-cols-2 gap-3">
                  {quickMenu.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => setSelectedItem(item)}
                      className={`rounded-2xl border p-3 text-left transition-all ${
                        selectedItem.name === item.name
                          ? 'border-brand-400 bg-brand-50 ring-2 ring-brand-100'
                          : 'border-ink-200 hover:border-brand-200'
                      }`}
                    >
                      <div className="text-sm font-semibold text-ink-900">{item.name}</div>
                      <div className="mt-1 text-sm font-bold text-brand-500">${item.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ink-700">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 text-lg font-bold text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    −
                  </button>
                  <span className="font-display text-xl font-bold text-ink-900 w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 text-lg font-bold text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-ink-50 px-4 py-3">
                <span className="text-sm font-medium text-ink-600">Total</span>
                <span className="font-display text-2xl font-bold text-ink-900">
                  ${(selectedItem.price * quantity).toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="btn-ghost flex-1 justify-center"
                >
                  Cancel
                </button>
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="btn-primary flex-1 justify-center disabled:opacity-60"
                >
                  {placing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Placing...
                    </>
                  ) : (
                    <>
                      Place Order
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
