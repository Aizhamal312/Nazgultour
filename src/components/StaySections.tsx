import React, { useCallback, useEffect, useState } from 'react';
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  Expand,
  Info,
  Star,
  Tag,
  Users,
  X,
} from 'lucide-react';
import { pickLang, useI18n } from '../i18n';
import {
  buildWhatsAppUrl,
  GALLERY_PHOTOS,
  ROOMS,
  WHATSAPP_TEMPLATES,
} from '../data/siteData';
import {
  AmenityPill,
  ButtonLink,
  cn,
  PageHero,
  ResilientImage,
  Reveal,
  SectionHeader,
  usePageMeta,
  WhatsAppIcon,
} from './Primitives';

export function RoomsSection() {
  const { t, lang } = useI18n();

  const buildRoomInquiry = (roomId: string, roomName: string) => {
    const prefix =
      lang === 'en' ? 'Interested in' : lang === 'ky' ? 'Керектүү бөлмө' : 'Интересует';
    return buildWhatsAppUrl(`${WHATSAPP_TEMPLATES.stay(lang)}\n\n${prefix}: ${roomName} (#${roomId})`);
  };

  return (
    <section id="stay" className="relative bg-cream-50 py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader
            eyebrow={t.rooms.label}
            title={t.rooms.title}
            intro={t.rooms.intro}
            center
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-9 flex max-w-3xl items-start gap-3.5 rounded-2xl border border-gold-500/40 bg-gold-300/15 px-5 py-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-bronze-600" aria-hidden="true" />
            <p className="text-[0.9rem] leading-relaxed font-semibold text-bark-700">
              {t.rooms.banner}
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink-400">
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-forest-600" aria-hidden="true" />{' '}
              {t.rooms.legendSolid}
            </span>
            <span className="flex items-center gap-1.5">
              <CircleDashed className="h-3.5 w-3.5 text-bronze-600" aria-hidden="true" />{' '}
              {t.rooms.legendDashed}
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {ROOMS.map((room, idx) => {
            const roomName = pickLang(room.name, lang);
            return (
              <Reveal key={room.id} delay={idx * 120} className="h-full">
                <article
                  className={cn(
                    'group flex h-full flex-col overflow-hidden rounded-[1.8rem] bg-white shadow-[0_24px_60px_-30px_rgba(67,51,31,0.4)] ring-1 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_44px_80px_-36px_rgba(67,51,31,0.55)]',
                    room.featured ? 'ring-2 ring-gold-500/70' : 'ring-cream-300/60',
                  )}
                >
                  <div className="img-frame relative h-60 overflow-hidden">
                    <ResilientImage
                      src={room.img}
                      alt={pickLang(room.alt, lang)}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-forest-950/55 via-transparent to-transparent"
                      aria-hidden="true"
                    />

                    {room.featured && (
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3.5 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-forest-950 shadow-lg">
                        <Star className="h-3 w-3" fill="currentColor" aria-hidden="true" />
                        {lang === 'en' ? 'Popular' : lang === 'ky' ? 'Тандалма' : 'Хит'}
                      </span>
                    )}

                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-forest-950/70 px-3.5 py-1.5 text-[0.72rem] font-bold tracking-wide text-cream-50 backdrop-blur-sm">
                      <Users className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
                      {t.rooms.sleeps} {room.guests} {t.rooms.guests}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-[1.55rem] leading-tight font-medium text-forest-950">
                      {roomName}
                    </h3>
                    <p className="mt-3 flex-none text-[0.9rem] leading-relaxed text-ink-500">
                      {pickLang(room.desc, lang)}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => {
                        const label = pickLang(amenity.label, lang);
                        return (
                          <AmenityPill key={label} dashed={!amenity.confirmed}>
                            {amenity.confirmed ? (
                              <BadgeCheck
                                className="h-3 w-3 text-forest-600"
                                aria-hidden="true"
                              />
                            ) : (
                              <CircleDashed className="h-3 w-3" aria-hidden="true" />
                            )}
                            {label}
                          </AmenityPill>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex flex-1 items-end justify-between gap-4 border-t border-cream-200 pt-5">
                      <div>
                        {room.price !== null ? (
                          <>
                            <p className="flex items-center gap-1.5 font-display text-2xl font-semibold text-forest-900">
                              <Tag className="h-4 w-4 text-bronze-600" aria-hidden="true" />
                              {room.price} {room.currency}
                            </p>
                            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-400">
                              {pickLang(room.pricePer, lang)}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-display text-[1.15rem] font-semibold text-bronze-700">
                              {t.rooms.onRequest}
                            </p>
                            <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink-400">
                              {pickLang(room.pricePer, lang)}
                            </p>
                          </>
                        )}
                      </div>

                      <ButtonLink
                        href={buildRoomInquiry(room.id, roomName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="whats"
                        size="sm"
                        className="shrink-0 whitespace-nowrap"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        {t.rooms.inquire}
                      </ButtonLink>
                    </div>
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

export function GallerySection() {
  const { t, lang } = useI18n();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const stepPhoto = useCallback((delta: number) => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev + delta + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length,
    );
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') stepPhoto(1);
      if (e.key === 'ArrowLeft') stepPhoto(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeIndex, closeLightbox, stepPhoto]);

  const activePhoto = activeIndex !== null ? GALLERY_PHOTOS[activeIndex] : null;

  return (
    <section id="gallery" className="bg-cream-50 py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader
            eyebrow={t.gallery.label}
            title={t.gallery.title}
            intro={t.gallery.intro}
            center
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid auto-rows-[10.5rem] grid-cols-2 gap-3.5 [grid-auto-flow:dense] sm:auto-rows-[12.5rem] md:grid-cols-4 md:gap-4">
          {GALLERY_PHOTOS.map((photo, idx) => {
            const caption = pickLang(photo.caption, lang);
            return (
              <Reveal
                key={photo.src}
                delay={(idx % 4) * 80}
                className={cn(
                  photo.tall && 'row-span-2',
                  idx === 0 && 'col-span-2 row-span-2 sm:col-span-2',
                )}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`${t.gallery.open}: ${caption}`}
                  className="group img-frame relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-700"
                >
                  <ResilientImage
                    src={photo.src}
                    alt={caption}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span
                    className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span className="absolute right-3.5 bottom-3.5 flex items-center gap-2 text-cream-50 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <span className="max-w-[12rem] truncate text-[0.75rem] font-bold">
                      {caption}
                    </span>
                    <Expand className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-[80] flex items-center justify-center bg-forest-950/95 p-4 backdrop-blur-md transition-all duration-400 sm:p-8',
          activePhoto ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none',
        )}
        role="dialog"
        aria-modal="true"
        aria-label={activePhoto ? pickLang(activePhoto.caption, lang) : undefined}
        onClick={closeLightbox}
      >
        {activePhoto && (
          <>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label={t.gallery.close}
              className="absolute top-5 right-5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition-colors hover:bg-cream-50/10"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                stepPhoto(-1);
              }}
              aria-label={t.gallery.prev}
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition-colors hover:bg-cream-50/10 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                stepPhoto(1);
              }}
              aria-label={t.gallery.next}
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cream-50/30 text-cream-50 transition-colors hover:bg-cream-50/10 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <figure
              className="max-h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ResilientImage
                key={activePhoto.src}
                src={activePhoto.src}
                alt={pickLang(activePhoto.caption, lang)}
                className="max-h-[78vh] w-full rounded-xl object-contain shadow-2xl"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-cream-100">
                <span className="font-display text-lg italic">
                  {pickLang(activePhoto.caption, lang)}
                </span>
                <span className="text-[0.8rem] font-bold tracking-[0.2em] text-gold-300 tabular-nums">
                  {(activeIndex ?? 0) + 1} / {GALLERY_PHOTOS.length}
                </span>
              </figcaption>
            </figure>
          </>
        )}
      </div>
    </section>
  );
}

export function StayPage() {
  const { t, lang } = useI18n();
  usePageMeta(t.pages.seo.stay.title, t.pages.seo.stay.desc);

  return (
    <>
      <PageHero
        image="/images/interior.jpg"
        alt={
          lang === 'ru'
            ? 'Уютная гостиная кыргызского гостевого дома с шырдаками'
            : lang === 'ky'
              ? 'Шырдактар менен жайлуу кыргыз конок үйү'
              : 'Cozy Kyrgyz guesthouse sitting room with shyrdak felt carpets'
        }
        eyebrow={t.pages.stay.eyebrow}
        title={t.pages.stay.title}
        italic={t.pages.stay.italic}
        intro={t.pages.stay.intro}
        crumb={t.nav.stay}
      />
      <RoomsSection />
      <GallerySection />
    </>
  );
}
