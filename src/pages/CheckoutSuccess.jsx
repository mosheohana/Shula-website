import { useEffect } from "react";
import Button from "../components/Button.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { useCart } from "../hooks/useCart.jsx";
import { useLanguage } from "../hooks/useLanguage.jsx";

export default function CheckoutSuccess() {
  const { clearCart } = useCart();
  const { language } = useLanguage();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <PageTransition>
      <section className="section-shell py-16">
        <div className="mx-auto max-w-3xl rounded-lg border border-moss/10 bg-white/60 p-8 shadow-soft md:p-12">
          <p className="text-sm font-bold text-clay">
            {language === "he" ? "התשלום הושלם" : "Payment complete"}
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold text-moss md:text-6xl">
            {language === "he" ? "תודה רבה על ההזמנה" : "Thank you for your order"}
          </h1>
          <p className="mt-6 text-lg leading-8 text-ink/70">
            {language === "he"
              ? "קיבלנו את התשלום ב־Stripe Test Mode והסל נוקה מהאתר. בשלב הבא נוכל גם להוסיף שמירת הזמנה ו־webhook."
              : "Your Stripe test payment was completed and the cart has been cleared. Next we can also add order persistence and a webhook."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/shop">{language === "he" ? "חזרה לחנות" : "Back to shop"}</Button>
            <Button to="/" variant="secondary">
              {language === "he" ? "חזרה לדף הבית" : "Return home"}
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
