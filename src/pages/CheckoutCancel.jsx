import Button from "../components/Button.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { useLanguage } from "../hooks/useLanguage.jsx";

export default function CheckoutCancel() {
  const { language } = useLanguage();

  return (
    <PageTransition>
      <section className="section-shell py-16">
        <div className="mx-auto max-w-3xl rounded-lg border border-moss/10 bg-white/60 p-8 shadow-soft md:p-12">
          <p className="text-sm font-bold text-clay">
            {language === "he" ? "התשלום בוטל" : "Checkout canceled"}
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold text-moss md:text-6xl">
            {language === "he" ? "לא בוצע חיוב" : "No charge was made"}
          </h1>
          <p className="mt-6 text-lg leading-8 text-ink/70">
            {language === "he"
              ? "ההזמנה לא הושלמה והפריטים עדיין מחכים לך בסל. אפשר לחזור לעגלה ולנסות שוב מתי שנוח."
              : "The order was not completed and your items are still in the cart. You can return to the cart and try again whenever you like."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/cart">{language === "he" ? "חזרה לסל" : "Back to cart"}</Button>
            <Button to="/shop" variant="secondary">
              {language === "he" ? "להמשך קנייה" : "Continue shopping"}
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
