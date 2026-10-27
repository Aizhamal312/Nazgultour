import React from 'react';
import {
  ArrowUpRight,
  BedDouble,
  Check,
  House,
  MapPin,
  Mountain,
  PencilLine,
  Quote,
} from 'lucide-react';
import { useI18n } from '../i18n';
import { NavLink, ROUTES, useRouter } from '../router';
import {
  buildWhatsAppUrl,
  JOURNEY_CARDS,
  WHATSAPP_TEMPLATES,
} from '../data/siteData';
import {
  ButtonLink,
  DiamondDivider,
  PlaceholderBadge,
  ResilientImage,
  Reveal,
  SectionHeader,
  TundukEmblem,
  usePageMeta,
  WhatsAppIcon,
} from './Primitives';

export function HeroSection() {
  const { t, lang } = useI18n();
  const { navigate } = useRouter();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] min-h-[620px] items-center overflow-hidden bg-forest-950"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <ResilientImage
          src="/images/hero.jpg"
          alt=""
          className="kenburns h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/78 via-forest-950/25 to-forest-950/72" />
        <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_42%,transparent_30%,rgba(18,34,26,0.5)_100%)]" />
      </div>

      <div className="wrap relative z-10 pt-28 pb-24 text-center">
        <p className="flex items-center justify-center gap-3 text-[0.68rem] font-extrabold uppercase tracking-[0.34em] text-gold-300">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {t.hero.overline}
        </p>

        <div className="mx-auto mt-6 flex justify-center">
          <DiamondDivider className="text-gold-300/70" />
        </div>

        <h1 className="mx-auto mt-6 max-w-5xl font-display text-[clamp(2.7rem,7.4vw,5.9rem)] leading-[1.02] font-medium tracking-tight text-cream-50 text-balance">
          {t.hero.titleA}{' '}
          <em className="font-light text-gold-300 italic">{t.hero.titleB}</em>{' '}
          {t.hero.titleC}
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-[1.05rem] leading-relaxed text-cream-100/85 sm:text-lg">
          {t.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:flex-wrap">
          <ButtonLink
            href="#/visit?focus=contact"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                navigate('visit', 'contact');
              }
            }}
            variant="gold"
            size="lg"
            className="w-full sm:w-auto"
          >
            {t.hero.book}
          </ButtonLink>

          <ButtonLink
            href="#/tours"
            onClick={(e) => {
              if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                e.preventDefault();
                navigate('tours');
              }
            }}
            variant="outlineLight"
            size="lg"
            className="w-full sm:w-auto"
          >
            {t.hero.tours}
          </ButtonLink>

          <ButtonLink
            href={buildWhatsAppUrl(WHATSAPP_TEMPLATES.stay(lang))}
            target="_blank"
            rel="noopener noreferrer"
            variant="whats"
            size="lg"
            className="w-full sm:w-auto"
          >
            <WhatsAppIcon className="h-4.5 w-4.5" />
            {t.hero.whatsapp}
          </ButtonLink>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-cream-100/60">
          {[t.contact.trust1, t.contact.trust2].map((trustItem) => (
            <li key={trustItem} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold-400" aria-hidden="true" />
              {trustItem}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#/?focus=intro"
        onClick={(e) => {
          if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
            e.preventDefault();
            navigate('home', 'intro');
          }
        }}
        aria-label={t.hero.scroll}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-cream-50/40 p-1.5">
          <span className="scroll-dot h-2 w-1 rounded-full bg-gold-300" />
        </span>
      </a>

      <div
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-cream-50/0"
        aria-hidden="true"
      />
    </section>
  );
}

export function IntroSection() {
  const { t } = useI18n();
  const features = [
    { icon: House, title: t.intro.f1t, desc: t.intro.f1d },
    { icon: Mountain, title: t.intro.f2t, desc: t.intro.f2d },
    { icon: BedDouble, title: t.intro.f3t, desc: t.intro.f3d },
  ];

  return (
    <>
      <section id="intro" className="pattern-topo relative bg-cream-50 py-24 sm:py-32">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionHeader eyebrow={t.intro.label} title={t.intro.title} />
            </Reveal>
            <Reveal delay={150} className="lg:col-span-7">
              <p className="max-w-xl text-[1.05rem] leading-relaxed text-ink-600 sm:text-lg lg:mt-14">
                {t.intro.p1}
              </p>
              <p className="mt-5 max-w-xl text-[1.05rem] font-semibold leading-relaxed text-forest-800 sm:text-lg">
                {t.intro.p2}
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Reveal key={feat.title} delay={idx * 120}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-cream-300/70 bg-white/70 p-7 shadow-[0_18px_50px_-32px_rgba(67,51,31,0.45)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(67,51,31,0.5)]">
                    <span
                      className="absolute -right-5 -top-6 font-display text-[6.5rem] leading-none text-forest-800/5 transition-colors duration-500 group-hover:text-forest-800/10"
                      aria-hidden="true"
                    >
                      0{idx + 1}
                    </span>
                    <span className="relative inline-flex h-13 w-13 items-center justify-center rounded-2xl bg-forest-800 text-gold-300 shadow-lg shadow-forest-900/25 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="relative mt-5 font-display text-2xl font-medium text-forest-950">
                      {feat.title}
                    </h3>
                    <p className="relative mt-2.5 text-[0.95rem] leading-relaxed text-ink-500">
                      {feat.desc}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <div
        className="relative overflow-hidden bg-forest-900 py-5 pattern-tunduk"
        aria-hidden="true"
      >
        <div className="animate-marquee flex w-max items-center gap-8 pr-8">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8">
              {t.marquee.map((word) => (
                <span key={`${dup}-${word}`} className="flex items-center gap-8 whitespace-nowrap">
                  <span className="font-display text-lg font-light tracking-wide text-cream-100/85 italic sm:text-xl">
                    {word}
                  </span>
                  <TundukEmblem className="h-5 w-5 text-gold-400/70" ring={false} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function AboutSection() {
  const { t, lang } = useI18n();
  const checkItems = [t.about.c1, t.about.c2, t.about.c3, t.about.c4];

  return (
    <section id="about" className="relative overflow-hidden bg-cream-100 py-24 sm:py-32">
      <div className="wrap">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="relative lg:col-span-6">
            <div className="relative pb-6">
              <div
                className="absolute -inset-4 rounded-[2.2rem] border border-gold-500/35 sm:-inset-6"
                aria-hidden="true"
              />
              <div className="img-frame relative overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(18,34,26,0.55)]">
                <ResilientImage
                  src="/images/village.jpg"
                  alt={
                    lang === 'ru'
                      ? 'Село Кызарт в Нарынской области Кыргызстана на фоне гор'
                      : lang === 'ky'
                        ? 'Тоолордун фонундагы Кызарт айылы'
                        : 'Kyzart village in the Naryn Region of Kyrgyzstan beneath mountain ridges'
                  }
                  className="aspect-[4/3.4] w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="img-frame absolute -bottom-10 -right-3 w-[46%] overflow-hidden rounded-2xl border-[6px] border-cream-100 shadow-[0_30px_60px_-30px_rgba(18,34,26,0.6)] sm:-right-8">
                <ResilientImage
                  src="/images/yurt-interior.jpg"
                  alt={
                    lang === 'ru'
                      ? 'Интерьер традиционной кыргызской юрты с войлочными коврами'
                      : lang === 'ky'
                        ? 'Салттуу кыргыз юртасынын ички көрүнүшү'
                        : 'Interior of a traditional Kyrgyz yurt with colorful felt rugs'
                  }
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
              </div>

              <figure className="absolute -bottom-8 left-4 max-w-[62%] rounded-2xl bg-forest-900 p-5 text-cream-50 shadow-xl sm:left-8 sm:p-6">
                <Quote className="h-5 w-5 text-gold-400" aria-hidden="true" />
                <blockquote className="mt-2 font-display text-[1.05rem] leading-snug font-light italic sm:text-lg">
                  “{t.about.quote}”
                </blockquote>
                <figcaption className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gold-300/80">
                  — {t.about.quoteBy}
                </figcaption>
              </figure>
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <SectionHeader eyebrow={t.about.label} title={t.about.title} />
              <p className="mt-6 leading-relaxed text-ink-600">{t.about.p1}</p>
              <p className="mt-4 leading-relaxed text-ink-600">{t.about.p2}</p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {checkItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white/60 px-4 py-3 ring-1 ring-cream-300/70"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-700 text-cream-50">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-[0.9rem] font-semibold text-ink-600">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border-[1.5px] border-dashed border-bronze-600/45 bg-cream-50/70 p-5">
                <div className="flex items-center gap-3">
                  <PencilLine className="h-4.5 w-4.5 text-bronze-600" aria-hidden="true" />
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.22em] text-bronze-600">
                    {t.about.noteTitle}
                  </p>
                  <PlaceholderBadge>TODO</PlaceholderBadge>
                </div>
                <p className="mt-2.5 text-[0.85rem] leading-relaxed text-ink-500 italic">
                  {t.about.noteText}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  const { t, lang } = useI18n();
  const { navigate } = useRouter();

  return (
    <section className="relative overflow-hidden bg-cream-100 pattern-topo py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader
            eyebrow={t.journey.label}
            title={t.journey.title}
            italic={t.journey.italic}
            intro={t.journey.intro}
            center
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {JOURNEY_CARDS.map((card, idx) => {
            const copy = t.journey.cards[card.key];
            return (
              <Reveal key={card.key} delay={idx * 120} className="h-full">
                <NavLink
                  to={card.to}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.7rem] bg-white shadow-[0_24px_60px_-34px_rgba(67,51,31,0.45)] ring-1 ring-cream-300/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-36px_rgba(67,51,31,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-700"
                >
                  <div className="img-frame relative h-52 overflow-hidden">
                    <ResilientImage
                      src={card.img}
                      alt={copy.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-cream-50/90 px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-forest-900 backdrop-blur-sm">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-[1.5rem] leading-tight font-medium text-forest-950">
                      {copy.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-ink-500">
                      {copy.text}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.8rem] font-extrabold tracking-wide text-forest-700 transition-colors group-hover:text-bronze-600">
                      {copy.cta}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </NavLink>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="pattern-tunduk mt-16 overflow-hidden rounded-[2rem] bg-forest-950 px-7 py-10 text-cream-50 shadow-[0_40px_90px_-45px_rgba(18,34,26,0.9)] sm:px-12 sm:py-14">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <DiamondDivider className="text-gold-400/70" />
                <h3 className="mt-5 font-display text-3xl leading-tight font-medium sm:text-[2.4rem]">
                  {t.journey.bandTitle}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-cream-100/70">
                  {t.journey.bandText}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <ButtonLink
                  href={`#${ROUTES.visit}?focus=contact`}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                      e.preventDefault();
                      navigate('visit', 'contact');
                    }
                  }}
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {t.hero.book}
                </ButtonLink>
                <ButtonLink
                  href={buildWhatsAppUrl(WHATSAPP_TEMPLATES.stay(lang))}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whats"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                  {t.hero.whatsapp}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HomePage() {
  const { t } = useI18n();
  usePageMeta(t.pages.seo.home.title, t.pages.seo.home.desc);

  return (
    <>
      <HeroSection />
      <IntroSection />
      <AboutSection />
      <JourneySection />
    </>
  );
}
