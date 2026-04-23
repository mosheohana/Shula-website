import { useState } from "react";
import Button from "../components/Button.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { useCart } from "../hooks/useCart.jsx";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { api } from "../services/api.js";
import { formatCurrency } from "../utils/format.js";

export default function Cart() {
  const { items, total, removeFromCart } = useCart();
  const { language, t } = useLanguage();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleCheckout() {
    try {
      setIsRedirecting(true);
      setErrorMessage("");

      const session = await api.createCheckoutSession(items);

      if (!session?.url) {
        throw new Error("Missing checkout URL");
      }

      window.location.href = session.url;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not start checkout right now"
      );
      setIsRedirecting(false);
    }
  }

  return (
    <PageTransition>
      <section className="section-shell py-16">
        <h1 className="font-display text-5xl font-bold text-moss md:text-6xl">{t.cartTitle}</h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-lg border border-moss/10 bg-white/58 p-8">
            <p className="text-lg text-ink/70">{t.emptyCart}</p>
            <Button to="/shop" className="mt-6">
              {t.backToShop}
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 rounded-lg border border-moss/10 bg-white/58 p-4 md:grid-cols-[140px_1fr_auto]"
                >
                  <img
                    src={item.image}
                    alt={item.name[language]}
                    className="h-36 w-full rounded-lg object-cover md:w-36"
                  />
                  <div>
                    <p className="font-display text-2xl font-bold text-moss">
                      {item.name[language]}
                    </p>
                    <p className="mt-2 text-ink/70">{item.short[language]}</p>
                    <p className="mt-3 font-bold text-moss">
                      {formatCurrency(item.price, language)} x {item.quantity}
                    </p>
                  </div>
                  <button
                    className="self-start rounded-lg border border-moss/20 px-4 py-2 text-sm font-bold text-moss hover:text-clay"
                    onClick={() => removeFromCart(item.id)}
                  >
                    {language === "he" ? "הסרה" : "Remove"}
                  </button>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-lg bg-moss p-6 text-linen">
              <p className="text-linen/70">{t.total}</p>
              <p className="mt-2 font-display text-4xl font-bold">
                {formatCurrency(total, language)}
              </p>
              {errorMessage ? (
                <p className="mt-4 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white">
                  {errorMessage}
                </p>
              ) : null}
              <Button
                variant="clay"
                className="mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
                onClick={handleCheckout}
                disabled={isRedirecting}
              >
                {isRedirecting
                  ? language === "he"
                    ? "מעביר לתשלום..."
                    : "Redirecting..."
                  : t.checkout}
              </Button>
            </aside>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
