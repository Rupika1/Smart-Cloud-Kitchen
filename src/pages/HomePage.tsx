import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Truck, ShieldCheck, Star, ChefHat, UtensilsCrossed, Heart, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const menuItems = [
  {
    name: 'Signature Smash Burger',
    desc: 'Double patty, aged cheddar, house sauce, brioche bun.',
    price: '$14',
    image: 'https://images.pexels.com/photos/5488052/pexels-photo-5488052.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Bestseller',
  },
  {
    name: 'Wood-Fired Margherita',
    desc: 'San Marzano tomato, fresh mozzarella, basil, olive oil.',
    price: '$16',
    image: 'https://images.pexels.com/photos/9978408/pexels-photo-9978408.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'New',
  },
  {
    name: 'Garden Power Bowl',
    desc: 'Grilled chicken, quinoa, avocado, citrus vinaigrette.',
    price: '$12',
    image: 'https://images.pexels.com/photos/842545/pexels-photo-842545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Healthy',
  },
  {
    name: 'Artisan Dessert Platter',
    desc: 'Selection of mini cakes: matcha, chocolate, berry.',
    price: '$10',
    image: 'https://images.pexels.com/photos/39240989/pexels-photo-39240989.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tag: 'Sweet',
  },
];

const stats = [
  { value: '50K+', label: 'Meals Delivered' },
  { value: '4.9', label: 'Average Rating' },
  { value: '25 min', label: 'Avg Delivery' },
  { value: '100%', label: 'Fresh Ingredients' },
];

const steps = [
  { icon: UtensilsCrossed, title: 'Browse & Order', desc: 'Pick your favorites from our daily-crafted menu.' },
  { icon: ChefHat, title: 'We Cook Fresh', desc: 'Our chefs prepare every dish to order — no shortcuts.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Hot at your door in 25 minutes or less, guaranteed.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar />

      {/* Section 1 — Hero */}
      <section id="home" className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-ink-50 to-white" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-brand-100/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="section-label">
              <Zap className="h-3.5 w-3.5" />
              Cloud Kitchen Redefined
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] text-ink-900 text-balance lg:text-6xl">
              Restaurant-quality meals, <span className="text-brand-500">delivered hot</span> to your door.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-600">
              No tips, no dining room, no compromise. Just exceptional food crafted by professional chefs and rushed to you in minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary">
                Start Your Order
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#menu" className="btn-ghost">
                Explore Menu
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-ink-900">{s.value}</div>
                  <div className="mt-1 text-xs font-medium text-ink-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up animate-delay-200">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-ink-900/20">
              <img
                src="https://images.pexels.com/photos/4253300/pexels-photo-4253300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Chefs cooking in a cloud kitchen"
                className="h-[520px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl animate-float">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                <Clock className="h-6 w-6 text-brand-500" />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-ink-900">25 min</div>
                <div className="text-xs text-ink-500">avg delivery time</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                <Star className="h-6 w-6 fill-brand-500 text-brand-500" />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-ink-900">4.9 / 5</div>
                <div className="text-xs text-ink-500">12,000+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Menu Highlights */}
      <section id="menu" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="section-label mx-auto">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              Crafted Menu
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold text-ink-900 lg:text-5xl">
              Crowd favorites this week
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-600">
              Every dish is made-to-order with locally sourced ingredients. Here's what our customers keep coming back for.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {menuItems.map((item, i) => (
              <div
                key={item.name}
                className={`card group overflow-hidden transition-all hover:shadow-xl animate-fade-up animate-delay-${(i + 1) * 100}`}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-600 shadow-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-ink-900">{item.name}</h3>
                    <span className="font-display text-lg font-bold text-brand-500">{item.price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — How It Works */}
      <section id="how" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="section-label">
                <ChefHat className="h-3.5 w-3.5" />
                Simple Process
              </div>
              <h2 className="mt-6 font-display text-4xl font-bold text-ink-900 lg:text-5xl">
                From kitchen to door in three steps
              </h2>
              <p className="mt-4 text-ink-600">
                We've stripped away the friction of traditional food delivery. No reservations, no waiting tables — just great food, fast.
              </p>

              <div className="mt-10 space-y-6">
                {steps.map((step, i) => (
                  <div key={step.title} className="flex gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
                        <step.icon className="h-6 w-6" />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="absolute left-1/2 top-14 h-8 w-px -translate-x-1/2 bg-ink-200" />
                      )}
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold text-brand-500">Step {i + 1}</span>
                        <h3 className="font-display text-lg font-bold text-ink-900">{step.title}</h3>
                      </div>
                      <p className="mt-1 text-sm text-ink-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-ink-900/10">
                <img
                  src="https://images.pexels.com/photos/8629103/pexels-photo-8629103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Chef preparing food"
                  className="h-[480px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 right-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                  <ShieldCheck className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-ink-900">Food Safety Certified</div>
                  <div className="text-xs text-ink-500">Kitchen inspected weekly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — About / Why Us */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="section-label mx-auto">
              <Heart className="h-3.5 w-3.5" />
              Why Flame & Forge
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold text-ink-900 lg:text-5xl">
              Built different, tastes better
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { icon: ChefHat, title: 'Chef-Driven Menu', desc: 'Every recipe is designed and cooked by classically trained chefs — not assembled from packets.' },
              { icon: Truck, title: 'Delivery-First Kitchen', desc: 'Our entire kitchen is optimized for delivery. Food arrives hot, fresh, and beautifully plated.' },
              { icon: ShieldCheck, title: 'Quality You Can Trust', desc: 'Locally sourced ingredients, zero artificial preservatives, and weekly health inspections.' },
            ].map((f) => (
              <div key={f.title} className="card p-8 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-ink-900">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-500 to-brand-700 px-8 py-20 text-center shadow-2xl shadow-brand-500/30">
          <h2 className="font-display text-4xl font-bold text-white lg:text-5xl text-balance">
            Hungry? Your next great meal is one click away.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-50">
            Create your free account and get $10 off your first order.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-600 shadow-lg transition-all hover:bg-brand-50 active:scale-95">
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95">
              Log In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
