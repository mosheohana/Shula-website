import { motion } from "framer-motion";
import Button from "./Button.jsx";
import { useCart } from "../hooks/useCart.jsx";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { formatCurrency } from "../utils/format.js";

const MotionArticle = motion.article;

export default function ProductCard({ product }) {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  return (
    <MotionArticle
      layout
      className="group overflow-hidden rounded-lg border border-moss/10 bg-white/58 shadow-soft"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name[language]}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="grid gap-4 p-5">
        <div>
          <p className="text-sm font-bold uppercase text-clay">
            {product.category[language]}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-moss">
            {product.name[language]}
          </h3>
          <p className="mt-2 min-h-12 text-ink/70">{product.short[language]}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.notes[language].map((note) => (
            <span key={note} className="rounded-full bg-oat/70 px-3 py-1 text-sm text-moss">
              {note}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="font-bold text-moss">{formatCurrency(product.price, language)}</span>
          <div className="flex gap-2">
            <Button to={`/products/${product.id}`} variant="secondary" className="px-4">
              {t.viewProduct}
            </Button>
            <Button onClick={() => addToCart(product)} variant="clay" className="px-4">
              {t.addToCart}
            </Button>
          </div>
        </div>
      </div>
    </MotionArticle>
  );
}
