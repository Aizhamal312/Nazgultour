import React, { useMemo, useState } from 'react';
import {
  BedDouble,
  CalendarDays,
  Car,
  CircleCheck,
  Compass,
  ExternalLink,
  Mail,
  MapPinned,
  Mountain,
  Phone,
  Send,
  TriangleAlert,
  UserRound,
  Users,
} from 'lucide-react';
import { pickLang, useI18n } from '../i18n';
import {
  buildWhatsAppUrl,
  CONTACT_CONFIG,
  MAP_CONFIG,
  ROOMS,
  SITE_INFO,
  TRAVEL_ROUTES,
  WHATSAPP_TEMPLATES,
} from '../data/siteData';
import {
  ButtonLink,
  PageHero,
  PlaceholderBadge,
  Reveal,
  SectionHeader,
  usePageMeta,
  WhatsAppIcon,
} from './Primitives';

const ROUTE_ICONS = {
  car: Car,
  compass: Compass,
  mountain: Mountain,
} as const;

export function KyzartMapCard() {
  const { t, lang } = useI18n();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[1.8rem] bg-cream-50 shadow-[0_30px_70px_-35px_rgba(67,51,31,0.55)] ring-1 ring-bark-500/20">
      <div className="relative min-h-[22rem] flex-1 bg-cream-200 sm:min-h-[26rem]">
        <iframe
          title={`${t.loc.mapTitle} — Google Maps`}
          src={MAP_CONFIG.embedSrc(lang)}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute top-4 left-4 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full bg-forest-950/85 px-3.5 py-2 text-cream-50 shadow-lg backdrop-blur-sm">
          <MapPinned className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
          <span className="truncate text-[0.68rem] font-extrabold uppercase tracking-[0.16em]">
            {t.loc.mapTitle}
          </span>
        </div>
      </div>

      <div className="border-t border-cream-200 bg-cream-50 p-5 sm:p-6">
        <p className="flex items-start gap-2 font-display text-[1rem] font-semibold text-forest-950">
          <MapPinned className="mt-0.5 h-4.5 w-4.5 shrink-0 text-bronze-600" aria-hidden="true" />
          <span>{pickLang(SITE_INFO.address, lang)}</span>
        </p>
        <p className="mt-2.5 text-[0.87rem] leading-relaxed text-ink-500">{t.loc.mapText}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href={MAP_CONFIG.openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.8rem] font-extrabold tracking-wide text-forest-700 underline decoration-gold-500 decoration-2 underline-offset-4 transition-colors hover:text-forest-900"
          >
            {t.loc.mapOpen}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <a
            href={buildWhatsAppUrl(WHATSAPP_TEMPLATES.stay(lang))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.8rem] font-extrabold tracking-wide text-whats-700 transition-colors hover:text-whats-600"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {t.loc.mapAsk}
          </a>
        </div>
      </div>
    </div>
  );
}

export function LocationSection() {
  const { t, lang } = useI18n();

  return (
    <section id="location" className="bg-cream-100 pattern-topo py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader
            eyebrow={t.loc.label}
            title={t.loc.title}
            intro={t.loc.intro}
            center
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="h-full lg:col-span-6">
            <KyzartMapCard />
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <h3 className="flex items-center gap-3 font-display text-2xl font-medium text-forest-950">
                <Compass className="h-6 w-6 text-bronze-600" aria-hidden="true" />
                {t.loc.travelTitle}
              </h3>
            </Reveal>

            <div className="mt-6 space-y-4">
              {TRAVEL_ROUTES.map((routeItem, idx) => {
                const Icon = ROUTE_ICONS[routeItem.icon];
                return (
                  <Reveal key={routeItem.id} delay={160 + idx * 100}>
                    <article className="flex gap-4 rounded-2xl border-[1.5px] border-dashed border-bark-500/35 bg-white/60 p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-800 text-gold-300">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h4 className="font-display text-lg font-semibold text-forest-950">
                          {pickLang(routeItem.title, lang)}
                        </h4>
                        <p className="mt-1 text-[0.87rem] leading-relaxed text-ink-500 italic">
                          {pickLang(routeItem.text, lang)}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={520}>
              <p className="mt-6 flex flex-wrap items-center gap-2 text-[0.78rem] font-bold tracking-wide text-ink-400">
                <PlaceholderBadge>{t.loc.placeholder}</PlaceholderBadge>
                <span>{t.loc.travelNote}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

interface InquiryFormState {
  name: string;
  email: string;
  arrival: string;
  departure: string;
  guests: string;
  room: string;
  message: string;
}

const INITIAL_FORM: InquiryFormState = {
  name: '',
  email: '',
  arrival: '',
  departure: '',
  guests: '2',
  room: '',
  message: '',
};

type FormField = keyof InquiryFormState;

export function ContactSection() {
  const { t, lang } = useI18n();
  const [form, setForm] = useState<InquiryFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const updateField = (field: FormField) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const resolveRoomName = (roomId: string) => {
    const found = ROOMS.find((r) => r.id === roomId);
    return found ? pickLang(found.name, lang) : t.contact.roomAny;
  };

  const validate = () => {
    const nextErrors: Partial<Record<FormField, string>> = {};
    if (!form.name.trim()) nextErrors.name = t.contact.errName;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) {
      nextErrors.email = t.contact.errEmail;
    }
    if (!form.arrival) nextErrors.arrival = t.contact.errArrival;
    if (!form.departure) nextErrors.departure = t.contact.errDeparture;
    if (form.arrival && form.departure && form.departure <= form.arrival) {
      nextErrors.departure = t.contact.errDates;
    }
    const guestCount = Number(form.guests);
    if (!guestCount || guestCount < 1 || guestCount > 12) {
      nextErrors.guests = t.contact.errGuests;
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const whatsappSummaryMessage = useMemo(() => {
    const lines = [
      WHATSAPP_TEMPLATES.stay(lang),
      '',
      `${t.contact.name}: ${form.name}`,
      `${t.contact.sumDates}: ${form.arrival} → ${form.departure}`,
      `${t.contact.sumGuests}: ${form.guests}`,
      `${t.contact.sumRoom}: ${resolveRoomName(form.room)}`,
    ];
    if (form.email) {
      lines.push(`${t.contact.emailOptional.split(' (')[0]}: ${form.email}`);
    }
    if (form.message.trim()) {
      lines.push(`${t.contact.message.split(' (')[0]}: ${form.message.trim()}`);
    }
    return lines.join('\n');
  }, [form, lang, t]);

  const renderError = (field: FormField) =>
    errors[field] ? (
      <p className="mt-1.5 text-[0.76rem] font-bold text-[#a03d2a]">{errors[field]}</p>
    ) : null;

  const contactCards = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: CONTACT_CONFIG.phoneDisplay,
      href: CONTACT_CONFIG.phoneHref,
      external: false,
    },
    {
      icon: MapPinned,
      label: t.contact.address,
      value: pickLang(SITE_INFO.address, lang),
      href: MAP_CONFIG.openUrl,
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative bg-cream-50 py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader
            eyebrow={t.contact.label}
            title={t.contact.title}
            intro={t.contact.intro}
            center
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <Reveal delay={80}>
              <a
                href={buildWhatsAppUrl(WHATSAPP_TEMPLATES.stay(lang))}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-3xl bg-forest-900 p-6 text-cream-50 shadow-[0_30px_60px_-30px_rgba(18,34,26,0.7)] transition-all duration-500 hover:-translate-y-1 hover:bg-forest-800"
              >
                <span className="pulse-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-whats-600 text-white">
                  <WhatsAppIcon className="h-7 w-7" />
                </span>
                <span>
                  <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-gold-300">
                    {t.contact.whatsapp}
                  </span>
                  <span className="mt-1 block font-display text-xl font-semibold tabular-nums">
                    {CONTACT_CONFIG.whatsappDisplay}
                  </span>
                </span>
              </a>
            </Reveal>

            {contactCards.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={150 + idx * 90}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-5 rounded-3xl border border-cream-300/70 bg-white/70 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/70 hover:bg-white"
                  >
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-cream-200 text-forest-800">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.22em] text-ink-400">
                        {item.label}
                      </p>
                      <p className="mt-0.5 font-display text-lg font-semibold leading-snug text-forest-950 tabular-nums">
                        {item.value}
                      </p>
                    </div>
                  </a>
                </Reveal>
              );
            })}

            <Reveal delay={330}>
              <ul className="space-y-2.5 rounded-3xl bg-gold-300/15 p-6 ring-1 ring-gold-500/30">
                {[t.contact.trust1, t.contact.trust2, t.contact.trust3].map((trust) => (
                  <li
                    key={trust}
                    className="flex items-start gap-2.5 text-[0.85rem] font-semibold text-bark-700"
                  >
                    <CircleCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-forest-700"
                      aria-hidden="true"
                    />
                    {trust}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:col-span-7">
            <div className="relative h-full overflow-hidden rounded-[1.8rem] bg-white p-6 shadow-[0_35px_80px_-40px_rgba(67,51,31,0.5)] ring-1 ring-cream-300/70 sm:p-9">
              {submitted ? (
                <div className="flex h-full flex-col justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest-700/10">
                    <CircleCheck className="h-8 w-8 text-forest-600" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-3xl font-medium text-forest-950">
                    {t.contact.successTitle}
                  </h3>

                  <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      { k: t.contact.sumName, v: form.name },
                      { k: t.contact.sumDates, v: `${form.arrival} → ${form.departure}` },
                      { k: t.contact.sumGuests, v: form.guests },
                      { k: t.contact.sumRoom, v: resolveRoomName(form.room) },
                    ].map((row) => (
                      <div key={row.k} className="rounded-2xl bg-cream-100 px-4 py-3">
                        <dt className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-ink-400">
                          {row.k}
                        </dt>
                        <dd className="mt-0.5 font-bold text-forest-950">{row.v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border-[1.5px] border-dashed border-bronze-600/45 bg-gold-300/10 p-4">
                    <TriangleAlert
                      className="mt-0.5 h-5 w-5 shrink-0 text-bronze-600"
                      aria-hidden="true"
                    />
                    <p className="text-[0.84rem] leading-relaxed text-ink-600">
                      {t.contact.successDemo}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <ButtonLink
                      href={buildWhatsAppUrl(whatsappSummaryMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="whats"
                      size="lg"
                    >
                      <WhatsAppIcon className="h-4.5 w-4.5" />
                      {t.contact.successCta}
                    </ButtonLink>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="cursor-pointer text-[0.85rem] font-extrabold tracking-wide text-forest-700 underline decoration-gold-500 decoration-2 underline-offset-4 transition-colors hover:text-forest-900"
                    >
                      {t.contact.successEdit}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="font-display text-2xl font-medium text-forest-950">
                    {t.contact.formTitle}
                  </h3>
                  <p className="mt-1.5 text-[0.82rem] text-ink-400">
                    {SITE_INFO.name} · {pickLang(SITE_INFO.village, lang)}
                  </p>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ink-500">
                        <UserRound className="h-3.5 w-3.5 text-bronze-600" aria-hidden="true" />{' '}
                        {t.contact.name} *
                      </span>
                      <input
                        type="text"
                        className="field"
                        placeholder={t.contact.namePh}
                        value={form.name}
                        onChange={(e) => updateField('name')(e.target.value)}
                        aria-invalid={!!errors.name}
                        autoComplete="name"
                      />
                      {renderError('name')}
                    </label>

                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ink-500">
                        <Mail className="h-3.5 w-3.5 text-bronze-600" aria-hidden="true" />{' '}
                        {t.contact.emailOptional}
                      </span>
                      <input
                        type="email"
                        className="field"
                        placeholder={t.contact.emailPh}
                        value={form.email}
                        onChange={(e) => updateField('email')(e.target.value)}
                        aria-invalid={!!errors.email}
                        autoComplete="email"
                      />
                      {renderError('email')}
                    </label>

                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ink-500">
                        <CalendarDays
                          className="h-3.5 w-3.5 text-bronze-600"
                          aria-hidden="true"
                        />{' '}
                        {t.contact.arrival} *
                      </span>
                      <input
                        type="date"
                        className="field"
                        min={todayStr}
                        value={form.arrival}
                        onChange={(e) => updateField('arrival')(e.target.value)}
                        aria-invalid={!!errors.arrival}
                      />
                      {renderError('arrival')}
                    </label>

                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ink-500">
                        <CalendarDays
                          className="h-3.5 w-3.5 text-bronze-600"
                          aria-hidden="true"
                        />{' '}
                        {t.contact.departure} *
                      </span>
                      <input
                        type="date"
                        className="field"
                        min={form.arrival || todayStr}
                        value={form.departure}
                        onChange={(e) => updateField('departure')(e.target.value)}
                        aria-invalid={!!errors.departure}
                      />
                      {renderError('departure')}
                    </label>

                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ink-500">
                        <Users className="h-3.5 w-3.5 text-bronze-600" aria-hidden="true" />{' '}
                        {t.contact.guestsLabel} *
                      </span>
                      <input
                        type="number"
                        className="field"
                        min={1}
                        max={12}
                        value={form.guests}
                        onChange={(e) => updateField('guests')(e.target.value)}
                        aria-invalid={!!errors.guests}
                      />
                      {renderError('guests')}
                    </label>

                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ink-500">
                        <BedDouble className="h-3.5 w-3.5 text-bronze-600" aria-hidden="true" />{' '}
                        {t.contact.room}
                      </span>
                      <select
                        className="field cursor-pointer"
                        value={form.room}
                        onChange={(e) => updateField('room')(e.target.value)}
                      >
                        <option value="">{t.contact.roomAny}</option>
                        {ROOMS.map((room) => (
                          <option key={room.id} value={room.id}>
                            {pickLang(room.name, lang)}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="mb-1.5 block text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-ink-500">
                        {t.contact.message}
                      </span>
                      <textarea
                        className="field min-h-28 resize-y"
                        placeholder={t.contact.messagePh}
                        value={form.message}
                        onChange={(e) => updateField('message')(e.target.value)}
                        maxLength={600}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-forest-800 px-7 py-4 text-[0.92rem] font-bold tracking-wide text-cream-50 shadow-lg shadow-forest-900/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 sm:w-auto"
                  >
                    <Send className="h-4.5 w-4.5" aria-hidden="true" />
                    {t.contact.submit}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function VisitPage() {
  const { t, lang } = useI18n();
  usePageMeta(t.pages.seo.visit.title, t.pages.seo.visit.desc);

  return (
    <>
      <PageHero
        image="/images/village.jpg"
        alt={
          lang === 'ru'
            ? 'Село Кызарт в Нарынской области на фоне гор'
            : lang === 'ky'
              ? 'Тоолордун фонундагы Кызарт айылы'
              : 'Kyzart village in the Naryn Region beneath the mountains'
        }
        eyebrow={t.pages.visit.eyebrow}
        title={t.pages.visit.title}
        italic={t.pages.visit.italic}
        intro={t.pages.visit.intro}
        crumb={t.nav.visit}
      />
      <LocationSection />
      <ContactSection />
    </>
  );
}
