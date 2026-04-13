import { useEffect, useState } from "react";
import PageTransition from "../components/PageTransition.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { api } from "../services/api.js";

export default function Shop() {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // This can later be replaced with a real backend call.
    api.getProducts().then(setProducts);
  }, []);

  return (
    <PageTransition>
      <section className="section-shell py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-clay">{t.heroEyebrow}</p>
          <h1 className="mt-3 font-display text-5xl font-bold text-moss md:text-6xl">
            {t.shopTitle}
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">{t.shopIntro}</p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
