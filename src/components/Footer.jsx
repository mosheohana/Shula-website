import Button from "./Button.jsx";
import { useLanguage } from "../hooks/useLanguage.jsx";
import logo from "../assets/shula-logo-circle.jpg";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 border-t border-moss/10 bg-moss text-linen">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className="font-display text-3xl font-bold">שולה - רפואה מסורתית</p>
          <p className="mt-4 max-w-xl text-linen/75">{t.heroText}</p>
        </div>

        <a
          href="/"
          className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border border-linen/25 bg-linen shadow-soft"
          aria-label="שולה - רפואה מסורתית"
        >
          <img
            src={logo}
            alt="שולה - רפואה מסורתית"
            className="h-full w-full scale-125 object-cover [object-position:center_47%]"
          />
        </a>

        <form className="grid gap-3">
          <label className="font-display text-2xl font-bold" htmlFor="email">
            {t.newsletter}
          </label>
          <p className="text-linen/75">{t.newsletterText}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="email"
              type="email"
              placeholder={t.emailPlaceholder}
              className="min-h-11 flex-1 rounded-lg border border-linen/20 bg-linen/10 px-4 text-linen outline-none placeholder:text-linen/50 focus:border-oat"
            />
            <Button type="submit" variant="clay">
              {t.join}
            </Button>
          </div>
        </form>
      </div>
    </footer>
  );
}
