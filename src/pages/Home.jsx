import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sprout, Volume2, VolumeX } from "lucide-react";
import Button from "../components/Button.jsx";
import PageTransition from "../components/PageTransition.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useLanguage } from "../hooks/useLanguage.jsx";
import { api } from "../services/api.js";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

export default function Home() {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef(null);
  const philosophyParagraphs = t.philosophyText.split("\n\n").filter(Boolean);

  useEffect(() => {
    // Fetch products from API layer.
    api.getProducts().then(setProducts);
  }, []);

  async function toggleHeroSound() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isSoundOn) {
      audio.pause();
      setIsSoundOn(false);
      return;
    }

    // Browsers allow sound only after a user click.
    await audio.play();
    setIsSoundOn(true);
  }

  return (
    <PageTransition>
      <section id="home" className="relative min-h-[78vh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/dead-sea-hero.jpg"
          aria-label={language === "he" ? "סרטון פרחים וציפורים" : "Flowers and birds video"}
        >
          <source src="/media/hero-flowers-birds.mp4" type="video/mp4" />
        </video>
        <audio ref={audioRef} src="/media/birds-ambiance.mp3" loop preload="none" />
        <button
          className="absolute end-6 top-6 z-20 inline-flex min-h-11 items-center gap-2 rounded-lg border border-linen/35 bg-moss/40 px-4 py-2 text-sm font-bold text-linen backdrop-blur-md transition hover:border-oat hover:text-oat"
          onClick={toggleHeroSound}
          type="button"
        >
          {isSoundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          {isSoundOn
            ? language === "he"
              ? "כיבוי צליל"
              : "Sound off"
            : language === "he"
              ? "הפעלת צליל"
              : "Sound on"}
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-moss/85 via-moss/30 to-moss/10" />
        <div className="section-shell relative z-10 flex min-h-[78vh] items-center py-16 text-linen">
          <div className="max-w-2xl">
            <MotionP
              className="mb-4 text-sm font-bold text-oat"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t.heroEyebrow}
            </MotionP>
            <MotionH1
              className="font-display text-5xl font-bold leading-tight md:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              {t.heroTitle}
            </MotionH1>
            <MotionP
              className="mt-6 max-w-xl text-lg leading-8 text-linen/80"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
            >
              {t.heroText}
            </MotionP>
            <MotionDiv
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
            >
              <Button href="#shop">{t.heroCta}</Button>
              <Button href="#about" variant="light">
                {t.secondaryCta}
              </Button>
            </MotionDiv>
          </div>
        </div>
        <a
          href="#about"
          className="absolute bottom-8 start-1/2 z-10 flex -translate-x-1/2 items-center gap-3 text-linen"
          aria-label={language === "he" ? "גלילה לתוכן הבא" : "Scroll to next section"}
        >
          <Sprout size={24} />
          <ArrowDown size={24} />
        </a>
      </section>

      <section
        id="about"
        className="section-shell grid scroll-mt-28 gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div>
          <p className="text-sm font-bold text-clay">{t.secondaryCta}</p>
          <h2 className="mt-3 font-display text-5xl font-bold leading-tight text-moss md:text-6xl">
            {t.aboutTitle}
          </h2>
          <p className="mt-6 whitespace-pre-line text-lg leading-8 text-ink/70">{t.aboutBody}</p>
        </div>
        <MotionDiv
          className="grid gap-5"
          initial={{ opacity: 0, x: language === "he" ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/images/about-herbs.jpg"
            alt={language === "he" ? "צמחי מרפא טריים" : "Fresh medicinal herbs"}
            className="h-[420px] w-full rounded-lg object-cover"
          />
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-lg bg-moss p-6 text-linen">
              <p className="font-display text-3xl font-bold">01</p>
              <p className="mt-4 text-linen/80">{t.heroText}</p>
            </div>
            <div className="rounded-lg border border-moss/10 bg-white/58 p-6">
              <p className="font-display text-3xl font-bold text-clay">02</p>
              <p className="mt-4 text-ink/70">{t.shopIntro}</p>
            </div>
          </div>
        </MotionDiv>
      </section>

      <section id="shop" className="section-shell scroll-mt-28 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-clay">{t.heroEyebrow}</p>
          <h2 className="mt-3 font-display text-5xl font-bold text-moss md:text-6xl">
            {t.shopTitle}
          </h2>
          <p className="mt-5 text-lg leading-8 text-ink/70">{t.shopIntro}</p>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="philosophy" className="story-grid scroll-mt-28 py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-sm font-bold text-clay">{t.ritualTitle}</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-moss md:text-5xl">
              {t.philosophyTitle}
            </h2>
            <ol className="mt-8 grid gap-4">
              {t.ritualSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-4 rounded-lg border border-moss/10 bg-linen/75 p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-olive text-linen">
                    {index + 1}
                  </span>
                  <span className="font-bold text-moss">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-moss/10 bg-linen/80 p-6 shadow-soft md:p-8">
            {philosophyParagraphs.map((paragraph) => (
              <p key={paragraph} className="mb-5 text-lg leading-9 text-ink/75 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
