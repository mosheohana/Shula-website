import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { useCart } from "../hooks/useCart.jsx";
import logo from "../assets/shula-logo-circle.jpg";

export default function Header() {
  const { language, t, toggleLanguage } = useLanguage();
  const { count } = useCart();

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/#about", label: t.nav.about },
    { href: "/#shop", label: t.nav.shop }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-moss/10 bg-linen/88 backdrop-blur-xl">
      <div className="section-shell flex min-h-24 items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3 text-moss">
          <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full border border-moss/15 bg-linen shadow-sm">
            <img
              src={logo}
              alt="שולה - רפואה מסורתית"
              className="h-full w-full scale-110 object-cover object-center"
            />
          </span>
          <span className="font-display text-2xl font-bold">שולה</span>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-2 text-sm font-bold text-moss transition hover:bg-oat/50"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border border-moss/20 px-3 py-2 text-sm font-bold text-moss transition hover:border-clay hover:text-clay"
            onClick={toggleLanguage}
          >
            {language === "he" ? "EN" : "עברית"}
          </button>
          <Link
            to="/cart"
            className="relative grid h-11 w-11 place-items-center rounded-lg bg-moss text-linen transition hover:bg-olive"
            aria-label={t.nav.cart}
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -end-2 grid h-6 min-w-6 place-items-center rounded-full bg-clay px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
