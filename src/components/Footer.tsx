import { Flame, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Flame <span className="text-brand-500">& Forge</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-400">
              Premium meals crafted in our cloud kitchen and delivered hot to your door.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-800 transition-colors hover:bg-brand-500">
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-800 transition-colors hover:bg-brand-500">
                <Twitter className="h-4 w-4 text-white" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-800 transition-colors hover:bg-brand-500">
                <Facebook className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#about" className="transition-colors hover:text-brand-500">About Us</a></li>
              <li><a href="#how" className="transition-colors hover:text-brand-500">How It Works</a></li>
              <li><a href="#menu" className="transition-colors hover:text-brand-500">Our Menu</a></li>
              <li><a href="#" className="transition-colors hover:text-brand-500">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="transition-colors hover:text-brand-500">Help Center</a></li>
              <li><a href="#" className="transition-colors hover:text-brand-500">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors hover:text-brand-500">Terms of Service</a></li>
              <li><a href="#" className="transition-colors hover:text-brand-500">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-500" />
                hello@flameandforge.co
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-500" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-500" />
                210 Kitchen Way, Food District
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-800 pt-6 text-center text-sm text-ink-500">
          &copy; {new Date().getFullYear()} Flame & Forge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
