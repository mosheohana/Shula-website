import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition.jsx";
import { useLanguage } from "../hooks/useLanguage.jsx";

const MotionDiv = motion.div;

export default function About() {
  const { language, t } = useLanguage();

  return (
    <PageTransition>
      <section className="section-shell grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold text-clay">{t.secondaryCta}</p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-tight text-moss md:text-6xl">
            {t.aboutTitle}
          </h1>
          <p className="mt-6 text-lg leading-8 text-ink/70">{t.aboutBody}</p>
        </div>
        <MotionDiv
          className="grid gap-5"
          initial={{ opacity: 0, x: language === "he" ? -24 : 24 }}
          animate={{ opacity: 1, x: 0 }}
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
              <p className="mt-4 text-linen/78">{t.philosophyText}</p>
            </div>
            <div className="rounded-lg border border-moss/10 bg-white/58 p-6">
              <p className="font-display text-3xl font-bold text-clay">02</p>
              <p className="mt-4 text-ink/70">{t.heroText}</p>
            </div>
          </div>
        </MotionDiv>
      </section>
    </PageTransition>
  );
}
