import React from 'react';
import {
  BadgeCheck,
  CalendarRange,
  CircleDashed,
  Clock3,
  Flag,
  MessageCircleQuestion,
  Route,
  Sun,
  Tag,
  Users,
} from 'lucide-react';
import { pickLang, useI18n } from '../i18n';
import {
  buildWhatsAppUrl,
  EXPERIENCES,
  ExperienceStatus,
  TOUR_IMAGES,
  TOURS,
  TRAIL_STOPS,
  WHATSAPP_TEMPLATES,
} from '../data/siteData';
import {
  AmenityPill,
  ButtonLink,
  cn,
  DiamondDivider,
  PageHero,
  PlaceholderBadge,
  ResilientImage,
  Reveal,
  SectionHeader,
  usePageMeta,
  WhatsAppIcon,
} from './Primitives';

export function ToursSection() {
  const { t, lang } = useI18n();

  return (
    <section
      id="tours"
      className="pattern-tunduk relative overflow-hidden bg-forest-950 py-24 text-cream-50 sm:py-32"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(212,175,94,0.08),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="wrap relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <SectionHeader
              light
              eyebrow={t.tours.label}
              title={t.tours.title}
              italic={t.tours.titleItalic}
              intro={t.tours.intro}
            />
          </Reveal>
          <Reveal delay={140} className="lg:col-span-4 lg:justify-self-end">
            <ButtonLink
              href={buildWhatsAppUrl(WHATSAPP_TEMPLATES.tour(lang))}
              target="_blank"
              rel="noopener noreferrer"
              variant="whats"
              size="lg"
            >
              <WhatsAppIcon className="h-4.5 w-4.5" />
              {t.tours.cta}
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="mt-14 rounded-3xl border border-cream-50/10 bg-forest-900/60 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2.5 text-[0.72rem] font-extrabold uppercase tracking-[0.24em] text-gold-300">
                <Route className="h-4 w-4" aria-hidden="true" />
                {t.tours.routeTitle}
              </p>
              <PlaceholderBadge light>{t.tours.routeNote}</PlaceholderBadge>
            </div>

            <ol className="mt-7 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
              {TRAIL_STOPS.map((stop, idx) => {
                const isEndpoint = idx === 0 || idx === TRAIL_STOPS.length - 1;
                return (
                  <li
                    key={idx}
                    className="relative flex items-center gap-3 sm:flex-col sm:items-start"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[0.75rem] font-extrabold tabular-nums',
                          isEndpoint
                            ? 'border-gold-400 bg-gold-400 text-forest-950'
                            : 'border-cream-50/25 bg-forest-800 text-cream-100',
                        )}
                      >
                        {idx + 1}
                      </span>
                      {isEndpoint && (
                        <Flag className="h-3.5 w-3.5 text-gold-300 sm:hidden" aria-hidden="true" />
                      )}
                    </div>

                    {idx < TRAIL_STOPS.length - 1 && (
                      <span
                        className="absolute left-[1.1rem] top-9 h-5 w-px bg-gradient-to-b from-cream-50/30 to-transparent sm:left-9 sm:top-1/2 sm:h-px sm:w-[calc(100%-3rem)] sm:bg-gradient-to-r"
                        aria-hidden="true"
                      />
                    )}

                    <p className="text-[0.92rem] font-bold text-cream-100 sm:mt-2.5">
                      {pickLang(stop, lang)}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {TOURS.map((tour, idx) => {
            const media = TOUR_IMAGES[tour.id];
            const specs = [
              { icon: Clock3, k: t.tours.duration, v: pickLang(tour.duration, lang) },
              { icon: Users, k: t.tours.level, v: pickLang(tour.level, lang) },
              { icon: CalendarRange, k: t.tours.season, v: pickLang(tour.season, lang) },
              {
                icon: Tag,
                k: t.tours.price,
                v: tour.price !== null ? `${tour.price} USD` : t.tours.tbc,
              },
            ];

            return (
              <Reveal key={tour.id} delay={idx * 140} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-cream-50/10 bg-forest-900/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40">
                  <div className="img-frame relative h-52 overflow-hidden">
                    <ResilientImage
                      src={media.src}
                      alt={media.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-950/25 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-display text-3xl font-medium text-cream-50">
                          {pickLang(tour.name, lang)}
                        </h3>
                        <p className="mt-1 text-[0.72rem] font-extrabold uppercase tracking-[0.24em] text-gold-300">
                          {pickLang(tour.tagline, lang)}
                        </p>
                      </div>
                      {tour.price === null && (
                        <PlaceholderBadge light>{t.tours.tbc}</PlaceholderBadge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="text-[0.93rem] leading-relaxed text-cream-100/75">
                      {pickLang(tour.desc, lang)}
                    </p>

                    <dl className="mt-6 grid grid-cols-2 gap-3">
                      {specs.map((spec) => {
                        const Icon = spec.icon;
                        return (
                          <div
                            key={spec.k}
                            className="rounded-2xl bg-forest-950/60 px-4 py-3 ring-1 ring-cream-50/8"
                          >
                            <dt className="flex items-center gap-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-gold-300/85">
                              <Icon className="h-3 w-3" aria-hidden="true" />
                              {spec.k}
                            </dt>
                            <dd className="mt-1 text-[0.85rem] font-bold text-cream-50">
                              {spec.v}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>

                    <div className="mt-6">
                      <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-cream-100/60">
                        {t.tours.itinerary}
                      </p>
                      <ol className="mt-3 space-y-3">
                        {tour.itinerary.map((step, sIdx) => (
                          <li key={sIdx} className="flex gap-3.5">
                            <span className="mt-0.5 flex h-6 min-w-11 shrink-0 items-center justify-center rounded-full bg-gold-400/15 px-2 text-[0.62rem] font-extrabold uppercase tracking-wider text-gold-300 ring-1 ring-gold-400/30">
                              {pickLang(step.day, lang)}
                            </span>
                            <p className="text-[0.86rem] leading-relaxed text-cream-100/70">
                              {pickLang(step.text, lang)}
                            </p>
                          </li>
                        ))}
                      </ol>
                      <p className="mt-3 text-[0.72rem] italic text-cream-100/45">
                        {t.tours.itineraryNote}
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-cream-100/60">
                        {t.tours.includes}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tour.includes.map((inc) => {
                          const label = pickLang(inc.label, lang);
                          return (
                            <AmenityPill key={label} dashed={!inc.confirmed} light>
                              <CircleDashed className="h-3 w-3" aria-hidden="true" />
                              {label}
                            </AmenityPill>
                          );
                        })}
                      </div>
                      <p className="mt-3 text-[0.72rem] italic text-cream-100/45">
                        {t.tours.includesNote}
                      </p>
                    </div>

                    <div className="mt-7 flex flex-1 items-end">
                      <ButtonLink
                        href={buildWhatsAppUrl(WHATSAPP_TEMPLATES.tour(lang))}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="gold"
                        className="w-full sm:w-auto"
                      >
                        <WhatsAppIcon className="h-4.5 w-4.5" />
                        {t.tours.cta}
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <DiamondDivider className="mx-auto text-gold-400/60" />
            <h3 className="mt-5 font-display text-2xl font-medium text-cream-50 italic sm:text-[1.7rem]">
              {t.tours.ridersTitle}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-cream-100/70">
              {t.tours.ridersText}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ExperiencesSection() {
  const { t, lang } = useI18n();

  const statusMeta: Record<
    ExperienceStatus,
    { label: string; icon: React.ComponentType<{ className?: string }>; cls: string }
  > = {
    available: {
      label: t.exp.available,
      icon: BadgeCheck,
      cls: 'bg-forest-800 text-cream-50',
    },
    seasonal: {
      label: t.exp.seasonal,
      icon: Sun,
      cls: 'bg-gold-400 text-forest-950',
    },
    'on-request': {
      label: t.exp['on-request'],
      icon: MessageCircleQuestion,
      cls: 'border border-dashed border-bark-700/60 bg-cream-50/85 text-bark-700',
    },
  };

  return (
    <section id="experiences" className="relative bg-cream-100 pattern-topo py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader
            eyebrow={t.exp.label}
            title={t.exp.title}
            intro={t.exp.intro}
            center
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {EXPERIENCES.map((exp, idx) => {
            const meta = statusMeta[exp.status];
            const StatusIcon = meta.icon;
            return (
              <Reveal key={exp.id} delay={(idx % 3) * 110} className="h-full">
                <article className="group img-frame relative flex h-full min-h-[21rem] flex-col justify-end overflow-hidden rounded-[1.6rem] text-cream-50 shadow-[0_24px_60px_-32px_rgba(18,34,26,0.6)] transition-all duration-500 hover:-translate-y-1.5">
                  <ResilientImage
                    src={exp.img}
                    alt={pickLang(exp.alt, lang)}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-forest-950/92 via-forest-950/30 to-forest-950/5 transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  <span
                    className={cn(
                      'absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] shadow-md',
                      meta.cls,
                    )}
                  >
                    <StatusIcon className="h-3 w-3" aria-hidden="true" />
                    {meta.label}
                  </span>

                  <div className="relative p-6">
                    <h3 className="font-display text-[1.45rem] leading-tight font-medium">
                      {pickLang(exp.title, lang)}
                    </h3>
                    <p className="mt-2 max-w-sm text-[0.86rem] leading-relaxed text-cream-100/80 opacity-90 transition-all duration-500 group-hover:opacity-100">
                      {pickLang(exp.text, lang)}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ToursPage() {
  const { t, lang } = useI18n();
  usePageMeta(t.pages.seo.tours.title, t.pages.seo.tours.desc);

  return (
    <>
      <PageHero
        image="/images/pass.jpg"
        alt={
          lang === 'ru'
            ? 'Всадники на горном перевале над озером Сон-Куль'
            : lang === 'ky'
              ? 'Соң-Көлдүн үстүндөгү ашуудагы атчандар'
              : 'Horseback riders on a mountain pass above Son-Kul Lake'
        }
        eyebrow={t.pages.tours.eyebrow}
        title={t.pages.tours.title}
        italic={t.pages.tours.italic}
        intro={t.pages.tours.intro}
        crumb={t.nav.tours}
      />
      <ToursSection />
      <ExperiencesSection />
    </>
  );
}
