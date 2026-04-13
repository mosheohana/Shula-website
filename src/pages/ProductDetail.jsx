import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { useCart } from "../hooks/useCart.jsx";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { api } from "../services/api.js";
import { formatCurrency } from "../utils/format.js";

export default function ProductDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Product fetch is isolated in the API service.
    api.getProduct(id).then(setProduct);
  }, [id]);

  if (!product) {
    return (
      <PageTransition>
        <section className="section-shell py-20 text-moss">{t.emptyCart}</section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="section-shell grid gap-12 py-16 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name[language]}
            className="h-full max-h-[680px] min-h-[420px] w-full object-cover"
          />
        </div>
        <div className="self-center">
          <Link to="/shop" className="text-sm font-bold text-clay hover:text-ember">
            {t.backToShop}
          </Link>
          <p className="mt-8 text-sm font-bold text-clay">{product.category[language]}</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-moss md:text-6xl">
            {product.name[language]}
          </h1>
          <p className="mt-5 text-xl font-bold text-moss">
            {formatCurrency(product.price, language)}
          </p>
          <p className="mt-6 text-lg leading-8 text-ink/70">{product.description[language]}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.notes[language].map((note) => (
              <span key={note} className="rounded-full bg-oat/70 px-3 py-1 text-sm text-moss">
                {note}
              </span>
            ))}
          </div>
          <Button className="mt-9" variant="clay" onClick={() => addToCart(product)}>
            {t.addToCart}
          </Button>
        </div>
      </section>
    </PageTransition>
  );
}
